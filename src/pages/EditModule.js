import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ModuleInputForm from "../components/ModuleInputForm";
import Pageheader from "../components/Pageheader";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { getModuleByCode } from "../api";

export default function EditModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [formData, setFormData] = useState([
    {
      code: "",
      name: "",
      color: "",
      labs: [],
    },
  ]);

  useEffect(() => {
    API.get(`ladapi`, `/modules/code/${moduleId}`, {})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
      getModuleByCode("ICT2103");
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();

    //Nav to next step
    setSearchParams("");
    navigate("/manage-modules/enrol-students");
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
          "Edit Module",
        ]}
        heading={"Editing Module"}
        description={"Edit module"}
        buttonText={"Manage Student List"}
        buttonRoute={"/"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        {/* <ModuleInputForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleReturn={handleReturn}/> */}
      </section>
    </>
  );
}
