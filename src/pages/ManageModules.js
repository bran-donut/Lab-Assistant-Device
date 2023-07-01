import { useState, useEffect } from "react";
import ModuleCard from "../components/ModuleCard";
import Pageheader from "../components/Pageheader";
import { API } from "aws-amplify";

export default function ManageModules() {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    API.get("ladapi", "/modules/code", {})
      .then((result) => {
        setModuleData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteModule = (code) => {
    API.del("ladapi", `/modules/code/${code}`, {
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Pageheader
        breadCrumbItems={["Home", "Manage Module Workspaces"]}
        heading={"Manage Module Workspaces"}
        description={"Displaying all module workspaces"}
        buttonText={"Create New Module"}
        buttonRoute={"/manage-modules/create"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        {moduleData.map((e, i) => (
          <ModuleCard
            key={i}
            moduleData={moduleData[i]}
            editRoute={`/manage-modules/edit/${moduleData[i].code}`}
            deleteModule={deleteModule}
          />
        ))}
      </section>
    </>
  );
}
