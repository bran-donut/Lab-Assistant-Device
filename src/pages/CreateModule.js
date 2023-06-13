import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/layout";
import ModuleInputForm from "../components/ModuleInputForm";
import Pageheader from "../components/Pageheader";
import ModuleCreationSteps from "../components/ModuleCreationSteps";

export default function CreateModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([
    {
      // DUMMY DATA
      moduleName: "",
      moduleColor: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleReturn = () => {
    setSearchParams("");
    navigate("/manage-modules");
  };

  return (
    <Layout>
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
      <ModuleCreationSteps step="1"/>
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <ModuleInputForm formData={formData} handleSubmit={handleSubmit} handleReturn={handleReturn}/>
      </section>
    </Layout>
  );
}
