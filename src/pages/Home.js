import { useState } from "react";
import Layout from "../layouts/layout";
import Pageheader from "../components/Pageheader";

export default function Home({user}) {
  console.log(user)
  const [moduleData, setModuleData] = useState([
    {
        // DUMMY DATA
      moduleId: "ICT2103",
      moduleName: "Embedded Systems",
      labs: ["lab1", "lab2"],
      students: ["brandon", "james"],
    },
  ]);

  return (
    <>
      <Pageheader
        breadCrumbItems={["Home"]}
        heading={`Welcome" ${user.username}`}
        description={"Welcome to Lab Assistant Device!"}
        buttonText={"Manage Modules"}
        buttonRoute={"/manage-modules"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">

      </section>
    </>
  );
}
