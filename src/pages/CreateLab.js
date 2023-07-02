import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pageheader from "../components/Pageheader";
import LabCreationSteps from "../components/LabCreationSteps";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";
import LabInputForm from "../components/LabInputForm";

export default function CreateLab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [moduleData, setModuleData] = useState([]);
  const [formData, setFormData] = useState(
    {
      code: "",
      name: "",
      color: "",
      labs: [],
    },
  );

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
  }, []);

  const createNewLab = async (data) => {

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchParams("");
    navigate(`/manage-modules/${moduleId}/enrol-students`);
  };

  const handleReturn = () => {
    setSearchParams("");
    navigate(`/manage-modules/${moduleId}`);
  };

  return (
    <>
      <Pageheader
        breadCrumbItems={["Home", "Manage Module Workspaces", `${moduleData.code}`, "Create New Lab"]}
        heading={"Create New Lab"}
        description={"Creating a new lab"}
        buttonText={null}
        buttonRoute={"/"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <LabCreationSteps step="1"/>
        <LabInputForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleReturn={handleReturn}/>
      </section>
    </>
  );
}
