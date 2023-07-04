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
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    editLab(formData);

    setSearchParams("");
    navigate(`/manage-modules/${moduleCode}/enrol-students`);
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
        <LabInputForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
          lab={lab}
        />
      </section>
    </>
  );
}
