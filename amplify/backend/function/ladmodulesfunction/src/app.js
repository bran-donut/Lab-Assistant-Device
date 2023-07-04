/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require("aws-sdk");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "ladmodulesdb";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "code";
const partitionKeyType = "S";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/modules";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

// Get modules for manage modules page
app.get("/modules", function (request, response) {
  const params = {
    TableName: tableName,
    ProjectionExpression: "code, #name, lab, #color",
    ExpressionAttributeNames: {
      "#name": "name",
      "#color": "color",
    },
  };

  dynamodb.scan(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message });
    } else {
      const modules = {};

      result.Items.forEach((item) => {
        const code = item.code;
        const name = item.name;
        const color = item.color;
        const lab = item.lab;

        if (!modules[code]) {
          modules[code] = {
            code,
            name,
            color,
            labs: [],
          };
        }

        modules[code].labs.push(lab);
      });

      response.json({
        statusCode: 200,
        url: request.url,
        body: Object.values(modules),
      });
    }
  });
});

// get moduleData by module code
app.get("/modules/:code", function (request, response) {
  let params = {
    TableName: tableName,
    KeyConditionExpression: "#code = :code",
    ExpressionAttributeNames: {
      "#code": "code",
      "#n": "name", // Rename "name" to a different attribute name, e.g., "#n"
    },
    ExpressionAttributeValues: {
      ":code": request.params.code,
    },
    ProjectionExpression: "lab, #n, color", // Use the renamed attribute name
  };

  dynamodb.query(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message });
    } else {
      const labs = result.Items.map((item) => item.lab);
      const moduleInfo = {
        name: result.Items[0].name,
        color: result.Items[0].color,
        lab: labs,
      };

      response.json({
        statusCode: 200,
        url: request.url,
        body: moduleInfo,
      });
    }
  });
});

// get lab data by module code and lab
app.get("/modules/:code/:lab", function (request, response) {
  let params = {
    TableName: tableName,
    Key: {
      code: request.params.code,
      lab: request.params.lab,
    },
  };
  dynamodb.get(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(result.Item),
      });
    }
  });
});

// create module
app.post("/modules", function (request, response) {
  const timestamp = new Date().toISOString();
  let params = {
    TableName: tableName,
    Item: {
      ...request.body,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  dynamodb.put(params, (error, result) => {
    if (error) {
      response.json({
        statusCode: 500,
        error: error.message,
        url: request.url,
      });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(params.Item),
      });
    }
  });
});

// upodate module
app.put("/modules/:code/:lab", function (request, response) {
  const timestamp = new Date().toISOString();
  const { name, color, students } = request.body;

  const updateExpressionParts = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  if (name) {
    updateExpressionParts.push("#name = :name");
    expressionAttributeValues[":name"] = name;
    expressionAttributeNames["#name"] = "name";
  }

  if (color) {
    updateExpressionParts.push("#color = :color");
    expressionAttributeValues[":color"] = color;
    expressionAttributeNames["#color"] = "color";
  }

  updateExpressionParts.push("updatedAt = :updatedAt");
  expressionAttributeValues[":updatedAt"] = timestamp;

  const updateExpression = "SET " + updateExpressionParts.join(", ");

  const params = {
    TableName: tableName,
    Key: { code: request.params.code, lab: request.params.lab },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "ALL_NEW",
  };

  dynamodb.update(params, (error, result) => {
    if (error) {
      response.json({
        statusCode: 500,
        error: error.message,
        url: request.url,
      });
    } else {
      response.json({
        statusCode: 200,
        url: request.url,
        body: JSON.stringify(result.Attributes),
      });
    }
  });
});

// delete module
app.delete("/modules/:code", function (request, response) {
  const higherLevelCode = request.params.code;

  const scanParams = {
    TableName: tableName,
    FilterExpression: "#code = :code",
    ExpressionAttributeNames: {
      "#code": "code",
    },
    ExpressionAttributeValues: {
      ":code": higherLevelCode,
    },
  };

  dynamodb.scan(scanParams, (error, result) => {
    if (error) {
      response.json({
        statusCode: 500,
        error: error.message,
        url: request.url,
      });
    } else {
      // Delete each lab and code
      const deletePromises = result.Items.map((item) => {
        const deleteParams = {
          TableName: tableName,
          Key: {
            code: item.code,
            lab: item.lab,
          },
        };
        return dynamodb.delete(deleteParams).promise();
      });

      // Execute all delete operations
      Promise.all(deletePromises)
        .then(() => {
          response.json({
            statusCode: 200,
            message: "Items deleted successfully",
            url: request.url,
          });
        })
        .catch((error) => {
          response.json({
            statusCode: 500,
            error: error.message,
            url: request.url,
          });
        });
    }
  });
});

// delete lab
app.delete("/modules/:code/:lab", function (request, response) {
  const code = request.params.code;
  const lab = request.params.lab;

  const deleteParams = {
    TableName: tableName,
    Key: {
      code: code,
      lab: lab,
    },
  };

  dynamodb.delete(deleteParams, (error) => {
    if (error) {
      response.json({
        statusCode: 500,
        error: error.message,
        url: request.url,
      });
    } else {
      response.json({
        statusCode: 200,
        message: "Item deleted successfully",
        url: request.url,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
