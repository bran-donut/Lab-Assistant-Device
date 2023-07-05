import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pageheader from "../components/Pageheader";
import LabCreationSteps from "../components/LabCreationSteps";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";
import LabInputForm from "../components/LabInputForm";

export default function CreateLab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { moduleCode } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: moduleCode,
    name: "",
    color: "",
    lab: "",
    students: [],
  });

  useEffect(() => {
    const fetchModuleData = async () => {
      API.get("ladappapi", `/modules/${moduleCode}`, {})
        .then((result) => {
          setFormData({
            ...formData,
            name: result.body.name,
            color: result.body.color,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchModuleData();
  }, []);

  const createNewLab = async (data) => {
    API.post("ladappapi", "/modules", {
      body: data,
    })
      .then((result) => {
        const labData = JSON.parse(result.body);
        setSearchParams("");
        navigate(`/manage-modules/${moduleCode}/${labData.lab}/enrol-students`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewLab(formData);
  };

  const handleReturn = () => {
    setSearchParams("");
    navigate(`/manage-modules/${moduleCode}`);
  };

  return (
    <>
      <Pageheader
        breadCrumbItems={[
          "Home",
          "Manage Module Workspaces",
          `${moduleCode}`,
          "Create New Lab",
        ]}
        heading={"Create New Lab"}
        description={"Creating a new lab"}
        buttonText={null}
        buttonRoute={"/"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <LabCreationSteps step="0" />
        <form
          className="flex flex-col flex-grow w-1/2 h-full gap-3 p-10 mx-auto bg-white border-2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <LabInputForm
            formData={formData}
            setFormData={setFormData}
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
              type="submit"
              className="flex-1 px-5 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
            >
              Next Step
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
