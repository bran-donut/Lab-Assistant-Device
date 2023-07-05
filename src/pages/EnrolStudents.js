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
  const { moduleCode } = useParams();
  const { lab } = useParams();
  const [moduleData, setModuleData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    color: "",
    lab: "",
    students: [],
  });

  useEffect(() => {
    const fetchModuleLabData = async () => {
      API.get("ladappapi", `/modules/${moduleCode}/${lab}`, {})
        .then((result) => {
          const labData = JSON.parse(result.body);
          setFormData({
            ...formData,
            code: labData.code,
            name: labData.name,
            color: labData.color,
            lab: labData.lab,
            students: labData.students,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchModuleLabData();
  }, []);

  const updateStudentList = async (data) => {
    API.put("ladappapi", `/modules/${moduleCode}/${lab}`, {
      body: data,
    })
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReturn = () => {
    navigate(`/modules/${moduleCode}/${lab}`);
  };

  useEffect(() => {
    const fetchModule = async () => {
      API.get("ladappapi", `/modules/${moduleCode}`, {})
        .then((result) => {
          setModuleData(result.body);
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

  console.log(studentData)

  return (
    <>
      <Pageheader
        breadCrumbItems={["Home", "Manage Module Workspaces", `${moduleCode}`, "Enrol Students"]}
        heading={"Enrol students to the new lab"}
        description={"Creating a new module"}
        buttonText={"Manage Student List"}
        buttonRoute={"/"}
      />
      <ModuleCreationSteps step="2" />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <EnrolTable studentData={studentData} currentStudents={formData.students} handleReturn={handleReturn}/>
      </section>
    </>
  );
}
