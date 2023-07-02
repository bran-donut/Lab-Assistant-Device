import React from "react";

const LabCreationSteps = ({ step }) => {
  return (
    <div className="flex items-center justify-center w-full gap-20 p-4">
      <div className={`flex ${step === "1" ? " text-black" : "text-black/40"}`}>
        <span
          className={`flex items-center justify-center w-8 h-8 mr-2 border-2 border-[#1E293B] rounded-full ${
            step == "1" ? "bg-[#1E293B]" : "bg-[#f1f1f1]  opacity-50"
          }`}
        >
          <span
            className={`text-xl ${
              step === "1" ? "text-white font-semibold" : "text-black"
            }`}
          >
            1
          </span>
        </span>
        <div>
          <span>Creating Lab</span>
          <p>Code and Name</p>
        </div>
      </div>
      <div className={`flex ${step === "2" ? " text-black" : "text-black/40"}`}>
        <span
          className={`flex items-center justify-center w-8 h-8 mr-2 border-2 border-[#1E293B] rounded-full  ${
            step == "2" ? "bg-[#1E293B]" : "bg-[#f1f1f1] opacity-50"
          }`}
        >
          <span
            className={`text-xl ${
              step === "2" ? "text-white font-semibold" : "text-black"
            }`}
          >
            2
          </span>
        </span>
        <div>
          <span>Enrol Students</span>
          <p>Add students to lab</p>
        </div>
      </div>
      <div className={`flex ${step === "3" ? " text-black" : "text-black/40"}`}>
        <span
          className={`flex items-center justify-center w-8 h-8 mr-2 border-2 border-[#1E293B] rounded-full  ${
            step == "3" ? "bg-[#1E293B]" : "bg-[#f1f1f1] opacity-50"
          }`}
        >
          <span
            className={`text-xl ${
              step === "3" ? "text-white font-semibold" : "text-black"
            }`}
          >
            3
          </span>
        </span>
        <div>
          <span>Finish</span>
          <p>Finalise</p>
        </div>
      </div>
    </div>
  );
};

export default LabCreationSteps;
