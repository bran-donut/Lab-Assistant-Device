import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pageheader from "../components/Pageheader";
import LabCreationSteps from "../components/LabCreationSteps";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";
import LabInputForm from "../components/LabInputForm";

export default function EditLab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { moduleCode } = useParams();
  const { lab } = useParams();
  const navigate = useNavigate();
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

  const editLab = async (data) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    editLab(formData);

    setSearchParams("");
    navigate(`/manage-modules/${moduleCode}/${lab}/enrol-students`);
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
          `Edit ${lab}`,
        ]}
        heading={`Edit ${lab}`}
        description={`Editing lab ${lab} for module ${moduleCode}`}
        buttonText={null}
        buttonRoute={"/"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <form
          className="flex flex-col flex-grow w-1/2 h-full gap-3 p-10 mx-auto bg-white border-2 rounded-lg"
          onSubmit={handleSubmit}
        >
          <LabInputForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handleReturn={handleReturn}
            lab={lab}
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
        </form>
      </section>
    </>
  );
}
