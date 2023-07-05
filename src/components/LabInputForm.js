import React from "react";

export default function LabInputForm({
  formData,
  setFormData,
  lab,
}) {
  if (formData) {
    return (
      <>
        <h1 className="text-xl font-semibold">
          {lab ? `Editing ${lab}` : "Create lab"}
        </h1>
        <p className="font-normal text-gray-600">
          {lab ? `Edit the lab code and name` : "Input the lab code and name"}
        </p>
        <p className="font-semibold text-gray-800">Lab Code</p>
        {lab ? (
          <input
            id="labCode"
            type="text"
            placeholder="Input lab code Ex. P1"
            defaultValue={lab ? lab : ""}
            onChange={(e) => {
              setFormData({ ...formData, lab: e.target.value });
            }}
            className="p-2 border border-gray-300 rounded-lg"
            disabled
          />
        ) : (
          <input
            id="labCode"
            type="text"
            placeholder="Input lab code Ex. P1"
            defaultValue={lab ? lab : ""}
            onChange={(e) => {
              setFormData({ ...formData, lab: e.target.value });
            }}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        )}

        <p className="font-semibold text-gray-800">Lab Name</p>
        <input
          id="labName"
          type="text"
          placeholder="Provide lab name Ex. Fauzi's lesson"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
      </>
    );
  } else {
    return (
      <div className="flex flex-col flex-grow w-1/2 h-full gap-3 p-10 mx-auto bg-white border-2 rounded-lg">
        <div className="flex flex-col min-w-full gap-5 animate-pulse">
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
        </div>
      </div>
    );
  }
}
