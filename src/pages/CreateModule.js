import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ModuleInputForm from "../components/ModuleInputForm";
import Pageheader from "../components/Pageheader";
import LabInputForm from "../components/LabInputForm";
import { API } from "aws-amplify";
import EnrolTable from "../components/EnrolTable";
import { listStudents } from "../api";
import ModuleCreationSteps from "../components/ModuleCreationSteps";

export default function CreateModule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    color: "",
    lab: "",
    students: [],
  });

  useEffect(() => {
    listStudents()
      .then((result) => {
        const users = result.Users; // Extract the Users array from the result object
        setStudentData(users); // Set the Users array as the value of studentData
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pageheaderInfo = [
    ["Create New Module", "Creating a new module"],
    ["Create new Lab", "Creating a new lab"],
    ["Enrol Students", "Enrol students to the new lab"],
  ];

  const createNewModule = async (data) => {
    API.post("ladappapi", "/modules", {
      body: data,
    })
      .then((result) => {
        console.log(result);
        handleReturn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    // Validate the current page's fields
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Proceed to the next page or perform additional actions
    if (page < pageheaderInfo.length - 1) {
      setPage((currPage) => currPage + 1);
    } else {
      createNewModule(formData);
    }
  };

  const handleReturn = () => {
    setSearchParams("");
    navigate("/manage-modules");
  };

  const PageDisplay = () => {
    switch (page) {
      case 0:
        return (
          <ModuleInputForm formData={formData} setFormData={setFormData} />
        );
      case 1:
        return <LabInputForm formData={formData} setFormData={setFormData} />;
      case 2:
        return (
          <EnrolTable
            studentData={studentData}
            setFormData={setFormData}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Pageheader
        breadCrumbItems={[
          "Home",
          "Manage Module Workspaces",
          `${pageheaderInfo[page][0]}`,
        ]}
        heading={`${pageheaderInfo[page][0]}`}
        description={`${pageheaderInfo[page][1]}`}
        buttonText={null}
        buttonRoute={"/"}
      />

      <section className="grid grid-cols-1 gap-0.5 px-8 py-5 mx-20">
        <ModuleCreationSteps step={page} />
        <form
          className={`${
            page === 2
              ? "w-full"
              : "flex flex-col flex-grow h-full gap-3 p-10 mx-auto bg-white border-2 rounded-lg  w-1/2"
          }`}
          onSubmit={handleSubmit}
        >
          {PageDisplay()}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => {
                if (page === 0) {
                  handleReturn();
                } else {
                  setPage((currPage) => currPage - 1);
                }
              }}
              className="flex-1 px-5 py-2 text-black transition-colors duration-150 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-5 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
            >
              {page === 2 ? "Submit" : "Next Step"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
