import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pageheader from "../components/Pageheader";
import ModuleCreationSteps from "../components/ModuleCreationSteps";
import EnrolTable from "../components/EnrolTable";
import { Auth, API } from "aws-amplify";

export default function CreateModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    let nextToken;

    async function listStudents(limit) {
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
    }

    listStudents(10)
      .then((result) => {
        const users = result.Users; // Extract the Users array from the result object
        setStudentData(users); // Set the Users array as the value of studentData
        console.log("studentData array", studentData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(formData);
  //   };

  //   const handleReturn = () => {
  //     setSearchParams("");
  //     navigate("/manage-modules");
  //   };

  return (
    <>
      <Pageheader
        breadCrumbItems={[
          "Home",
          "Manage Module Workspaces",
          "Create New Module",
        ]}
        heading={"Create New Module"}
        description={"Creating a new module"}
        buttonText={"Manage Student List"}
        buttonRoute={"/"}
      />
      <ModuleCreationSteps step="2" />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <EnrolTable studentData={studentData} />
      </section>
    </>
  );
}
