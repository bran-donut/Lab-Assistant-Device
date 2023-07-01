import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pageheader from "../components/Pageheader";
import ModuleCreationSteps from "../components/ModuleCreationSteps";
import EnrolTable from "../components/EnrolTable";
import { listStudents } from "../api";

export default function CreateModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {

    listStudents(10)
      .then((result) => {
        const users = result.Users; // Extract the Users array from the result object
        setStudentData(users); // Set the Users array as the value of studentData
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(formData);
  //   };

  //   const handleReturn = () => {
  //     setSearchParams("");
  //     navigate("/manage-modules");
  //   };

  return (
    <>
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
      <ModuleCreationSteps step="2" />
      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <EnrolTable studentData={studentData} />
      </section>
    </>
  );
}
