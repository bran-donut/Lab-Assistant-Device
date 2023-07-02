import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ModuleInputForm from "../components/ModuleInputForm";
import Pageheader from "../components/Pageheader";
import ModuleCreationSteps from "../components/LabCreationSteps";
import { API } from "aws-amplify";

export default function CreateModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
      code: "",
      name: "",
      color: "",
      labs: [],
    },
  );

  const createNewModule = async (data) => {
    API.post('ladapi', '/modules', {
      body: data,
    }).then(result => {
      this.module = JSON.parse(result.body);
    }).catch(err => {
      console.log(err);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewModule(formData);

    setSearchParams("");
    navigate("/manage-modules");
  };

  const handleReturn = () => {
    setSearchParams("");
    navigate("/manage-modules");
  };

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
        buttonText={null}
        buttonRoute={"/"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <ModuleInputForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleReturn={handleReturn}/>
      </section>
    </>
  );
}
