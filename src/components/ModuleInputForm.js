import React from "react";
import { DropdownInput } from "./DropdownInput";

export default function ModuleInputForm({
  formData,
  setFormData,
  module,
  handleSubmit,
  handleReturn,
}) {
  return (
    <form
      className="flex flex-col flex-grow w-1/2 h-full gap-3 p-10 mx-auto bg-white border-2 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-semibold">
        {module ? `Editing ${module}` : "Create module"}
      </h1>
      <p className="font-normal text-gray-600">
        Pick a name and an optional colour tag
      </p>
      <p className="font-semibold text-gray-800">Module Name</p>
      <input
        id="moduleName"
        type="text"
        placeholder="Input module name"
        defaultValue={formData.name ? formData.name : ""}
        onChange={(e) => {
          setFormData({ ...formData, moduleName: e.target.value });
        }}
        className="p-2 border border-gray-300 rounded-lg"
        required
      />
      <p className="font-semibold text-gray-800">Module Title Highlight</p>
      <DropdownInput
        options={["None", "Red", "Blue", "Green"]}
        onChange={(e) => {
          setFormData({ ...formData, moduleColor: e.target.value });
        }}
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
}
