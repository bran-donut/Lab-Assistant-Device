import React from "react";

export default function LabInputForm({
  formData,
  setFormData,
  lab,
  handleSubmit,
  handleReturn,
}) {
  if (formData) {
    return (
      <form
        className="flex flex-col flex-grow w-1/2 h-full gap-3 p-10 mx-auto bg-white border-2 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold">
          {lab ? `Editing ${lab}` : "Create lab"}
        </h1>
        <p className="font-normal text-gray-600">
          Input the lab code and name
        </p>
        <p className="font-semibold text-gray-800">Lab Code</p>
        <input
          id="labnCode"
          type="text"
          placeholder="Input lab code Ex. P1"
          defaultValue={formData.lab ? formData.lab : ""}
          onChange={(e) => {
            setFormData({ ...formData, lab: e.target.value });
          }}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <p className="font-semibold text-gray-800">Lab Name</p>
        <input
          id="labName"
          type="text"
          placeholder="Provide lab name Ex. Fauzi's lesson"
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleReturn}
            className="flex-1 px-5 py-2 text-black transition-colors duration-150 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 px-5 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
          >
            Next Step
          </button>
        </div>
      </form>
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
