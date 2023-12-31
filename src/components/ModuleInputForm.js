import React from "react";
import { DropdownInput } from "./DropdownInput";

export default function ModuleInputForm({ formData, setFormData, module }) {
  if (formData) {
    return (
      <>
        <h1 className="text-xl font-semibold">
          {module ? `Editing ${module}` : "Create module"}
        </h1>
        <p className="font-normal text-gray-600">
          Pick a name and an optional colour tag
        </p>
        <p className="font-semibold text-gray-800">Module Code</p>
        <input
          id="moduleCode"
          type="text"
          placeholder="Input module code Ex. ICT1001"
          defaultValue={formData.code ? formData.code : ""}
          onChange={(e) => {
            setFormData({ ...formData, code: e.target.value });
          }}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <p className="font-semibold text-gray-800">Module Name</p>
        <input
          id="moduleName"
          type="text"
          placeholder="Input module name Ex. Introduction to Computing"
          defaultValue={formData.name ? formData.name : ""}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <p className="font-semibold text-gray-800">Module Title Highlight</p>
        <DropdownInput
          options={["None", "Red", "Blue", "Green"]}
          onChange={(e) => {
            setFormData({ ...formData, color: e.target.value.toLowerCase() });
          }}
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
