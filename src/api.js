import { Amplify, Auth, API } from "aws-amplify";

// AWS Amplify AdminQueries API

export const addToGroup = async () => {
  let apiName = "AdminQueries";
  let path = "/addUserToGroup";
  let myInit = {
    body: {
      username: "richard",
      groupname: "Editors",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  console.log(Auth.currentSession());
  return await API.post(apiName, path, myInit);
};

let nextToken;

export const listStudents = async (limit) => {
  let apiName = "AdminQueries";
  let path = "/listUsersInGroup";
  let myInit = {
    queryStringParameters: {
      groupname: "Students",
      limit: limit,
      token: nextToken,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`,
    },
  };
  const { NextToken, ...rest } = await API.get(apiName, path, myInit);
  nextToken = NextToken;
  return rest;
};

// DYNAMODB API

export const getModule = async () => {
  API.get("ladapi", "/modules/code", {})
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getModuleByCode = async (code) => {
  return API.get("ladapi", `/modules/object/${code}`, {})
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};



export const createModule = async (data) => {
  API.post("ladapi", "/modules", {
    body: data,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
