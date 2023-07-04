import { useState, useEffect } from "react";
import ModuleCard from "../components/ModuleCard";
import Pageheader from "../components/Pageheader";
import { API } from "aws-amplify";

export default function ManageModules() {
  const [moduleData, setModuleData] = useState([]);

  const fetchModule = async () => {
    API.get('ladappapi', '/modules', {}).then(result => {
      const modules = result.body;
      setModuleData(modules);
     }).catch(err => {
      console.log(err);
     })
  };

  const removeModule = async (code) => {
    API.del('ladappapi', `/modules/${code}`, {}).then(result => {
      console.log(result);
      fetchModule();
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
            deleteModule={removeModule}
            viewRoute={`/manage-modules/${moduleData[i].code}`}
          />
        ))}
      </section>
    </>
  );
}
