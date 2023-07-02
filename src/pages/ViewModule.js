import { useState, useEffect } from "react";
import LabCard from "../components/LabCard";
import Pageheader from "../components/Pageheader";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";

export default function ViewModule() {
  const { moduleId } = useParams();
  const [moduleData, setModuleData] = useState([]);

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

  return (
    <>
      <Pageheader
        breadCrumbItems={[
          "Home",
          "Manage Module Workspaces",
          `${moduleData.code}`,
        ]}
        heading={`Manage Module ${moduleData.code}`}
        description={"Displaying all module workspaces"}
        buttonText={"Create New Lab"}
        buttonRoute={`/manage-modules/${moduleData.id}/create`}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <LabCard labData={moduleData.labs} />
      </section>
    </>
  );
}
