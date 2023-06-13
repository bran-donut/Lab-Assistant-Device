import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/layout";
import Pageheader from "../components/Pageheader";
import ModuleCreationSteps from "../components/ModuleCreationSteps";
import EnrolTable from "../components/EnrolTable";

export default function CreateModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // DUMMY DATA
  const [accountData, setAccountData] = useState([
    {
      studentName: "brandon chan",
      studentId: "2101339",
      studentEmail: "2101339@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
    {
      studentName: "brandon lim",
      studentId: "12312",
      studentEmail: "1231@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
    {
      studentName: "kevin thom",
      studentId: "32131",
      studentEmail: "12312@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
    {
      studentName: "chai hong",
      studentId: "421",
      studentEmail: "41214@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
    {
      studentName: "chun guan",
      studentId: "31231",
      studentEmail: "12@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
    {
      studentName: "alford chong",
      studentId: "412412",
      studentEmail: "421@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
    {
      studentName: "prof fauzi",
      studentId: "32131",
      studentEmail: "3123@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
    {
      studentName: "wen jun",
      studentId: "41241",
      studentEmail: "42414121@sit.singaporetech.edu.sg",
      tags: ["Tag1", "Tag2", "P1"],
    },
  ]);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(formData);
  //   };

  //   const handleReturn = () => {
  //     setSearchParams("");
  //     navigate("/manage-modules");
  //   };

  return (
    <Layout>
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
        <EnrolTable accountData={accountData} />
      </section>
    </Layout>
  );
}
