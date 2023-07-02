import { useState, useEffect } from "react";
import ModuleCard from "../components/ModuleCard";
import Pageheader from "../components/Pageheader";
import { API } from "aws-amplify";

export default function ManageModules() {
  const [moduleData, setModuleData] = useState([]);

  const fetchModule = async () => {
    API.get('ladapi', '/modules', {}).then(result => {
      const modules = JSON.parse(result.body);
      setModuleData(modules);
     }).catch(err => {
      console.log(err);
     })
  };

  const removeModule = async (id) => {
    API.del('ladapi', `/modules/${id}`, {}).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  };

  useEffect(() => {
    fetchModule();
  }, []);

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
            editRoute={`/manage-modules/edit/${moduleData[i].id}`}
            deleteModule={removeModule}
            viewRoute={`/manage-modules/${moduleData[i].id}`}
          />
        ))}
      </section>
    </>
  );
}
