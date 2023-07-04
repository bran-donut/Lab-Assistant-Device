import { useState, useEffect } from "react";
import LabCard from "../components/LabCard";
import Pageheader from "../components/Pageheader";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";

export default function ViewModule() {
  const { moduleCode } = useParams();
  const [moduleData, setModuleData] = useState();

  const fetchModuleData = async () => {
    API.get("ladappapi", `/modules/${moduleCode}`, {})
      .then((result) => {
        setModuleData(result.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeLab = async (code, lab) => {
    API.del("ladappapi", `/modules/${code}/${lab}`, {})
      .then((result) => {
        console.log(result);
        fetchModuleData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchModuleData();
  }, []);

  return (
    <>
      <Pageheader
        breadCrumbItems={[
          "Home",
          "Manage Module Workspaces",
          `${moduleCode ? moduleCode : ""}`,
        ]}
        heading={`Manage Module ${moduleCode ? moduleCode : ""}`}
        description={"Displaying all module workspaces"}
        buttonText={"Create New Lab"}
        buttonRoute={`/manage-modules/${moduleCode ? moduleCode : ""}/create`}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        {moduleData
          ? moduleData.lab.map((e, i) => (
              <LabCard
                moduleCode={moduleCode}
                labCode={moduleData.lab[i]}
                viewRoute={`/manage-modules/${moduleCode}/${moduleData.lab[i]}`}
                deleteLab={removeLab}
              />
            ))
          : "No labs found"}
      </section>
    </>
  );
}
