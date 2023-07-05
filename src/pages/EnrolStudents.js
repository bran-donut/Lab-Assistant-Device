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

  const updateDatabase = async (data) => {
    API.put("ladappapi", `/modules/${moduleCode}/${lab}`, {
      body: data,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    updateDatabase(formData)
  };

  const handleReturn = () => {
    navigate(`/manage-modules/${moduleCode}`);
  };

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

    const fetchModule = async () => {
      API.get("ladappapi", `/modules/${moduleCode}`, {})
        .then((result) => {
          setModuleData(result.body);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchModuleLabData();
    fetchModule();
    listStudents()
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
        breadCrumbItems={[
          "Home",
          "Manage Module Workspaces",
          `${moduleCode}`,
          "Enrol Students",
        ]}
        heading={"Enrol students to the new lab"}
        description={"Select students to enrol them to the new lab"}
        buttonText={"Manage Student List"}
        buttonRoute={"/"}
      />
      <ModuleCreationSteps step="1" />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <EnrolTable
          studentData={studentData}
          setFormData={setFormData}
          formData={formData}
        />
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleReturn}
            className="flex-1 px-5 py-2 text-black transition-colors duration-150 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="button"
            className="flex-1 px-5 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
            onClick={handleSubmit}
          >
            Next Step
          </button>
        </div>
      </section>
    </>
  );
}
