import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ModuleInputForm from "../components/ModuleInputForm";
import Pageheader from "../components/Pageheader";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";

export default function EditModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [formData, setFormData] = useState();

  useEffect(() => {
    API.get("ladapi", `/modules/${moduleId}`, {})
      .then((result) => {
        const modules = JSON.parse(result.body);
        setFormData(modules);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put("ladapi", `/modules`, {
      body: formData,
    })
      .then((result) => {
        const modules = JSON.parse(result.body);
        console.log(modules)
      })
      .catch((err) => {
        console.log(err);
      });

    //Nav to next step
    setSearchParams("");
    navigate("/manage-modules/enrol-students");
  };

  const handleReturn = () => {
    setSearchParams("");
    navigate("/manage-modules");
  };

  console.log(formData);

  return (
    <>
      <Pageheader
        breadCrumbItems={["Home", "Manage Module Workspaces", "Edit Module"]}
        heading={"Editing Module"}
        description={"Edit module"}
        buttonText={"Manage Student List"}
        buttonRoute={"/"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <ModuleInputForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
        />
      </section>
    </>
  );
}
