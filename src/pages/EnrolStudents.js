import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pageheader from "../components/Pageheader";
import ModuleCreationSteps from "../components/LabCreationSteps";
import EnrolTable from "../components/EnrolTable";
import { listStudents } from "../api";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";

export default function CreateModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [moduleData, setModuleData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchModule = async () => {
      API.get("ladapi", `/modules/${moduleId}`, {})
        .then((result) => {
          const modules = JSON.parse(result.body);
          setModuleData(modules);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchModule();
    listStudents(10)
      .then((result) => {
        const users = result.Users; // Extract the Users array from the result object
        setStudentData(users); // Set the Users array as the value of studentData
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Pageheader
        breadCrumbItems={["Home", "Manage Module Workspaces", `${moduleData.code}`, "Enrol Students"]}
        heading={"Enrol students to the new lab"}
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
