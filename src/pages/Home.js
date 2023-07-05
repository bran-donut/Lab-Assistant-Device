import { useState, useEffect } from "react";
import Pageheader from "../components/Pageheader";
import { addToGroup, createUserAction } from "../api";

export default function Home({ user }) {
  useEffect(() => {
    // testing user creation api for adding students

    // createUserAction("1000000", "kevin@example.com", "brandonut", "Kevin")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    //   addToGroup("1000000", "Students")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    //   addToGroup()
    //   createUserAction()
  }, []);

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
        heading={`Welcome ${user.username}`}
        description={"Welcome to Lab Assistant Device!"}
        buttonText={"Manage Modules"}
        buttonRoute={"/manage-modules"}
      />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20"></section>
    </>
  );
}
