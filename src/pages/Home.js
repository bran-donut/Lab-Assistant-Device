import { useState } from "react";
import Layout from "../layouts/layout";
import ModuleCard from "../components/ModuleCard";
import Pageheader from "../components/Pageheader";

export default function Home() {
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
    <Layout>
      <Pageheader
        breadCrumbItems={["Home", "Not Home"]}
        heading={"Hello Janice!"}
        description={"Welcome to Lab Assistant Device!"}
        buttonText={"Create New Module"}
        buttonRoute={"/"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        {moduleData.map((e, i) => (
          <ModuleCard key={i} moduleData={moduleData[i]} editRoute={"/"} />
        ))}
      </section>
    </Layout>
  );
}
