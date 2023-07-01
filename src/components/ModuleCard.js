import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function ModuleCard({ moduleData, editRoute, deleteModule }) {
  if (moduleData) {

    const handleDelete = () => {
      deleteModule(moduleData.code);
    };

    return (
      <div className="flex flex-col items-start p-5 m-2 bg-white rounded-md shadow-md h-fit">
        <div className="w-full">
          <div className="flex items-center justify-between gap-5 2xl:gap-5">
            <div className="flex flex-row">
              <span
                className={
                  moduleData.color != undefined
                    ? `inline-flex w-full p-2 m-2 text-xl font-bold whitespace-nowrap bg-${moduleData.color}-700 rounded-md text-white`
                    : ` font-bold inline-flex w-full p-2 m-2 text-xl whitespace-nowrap bg-${moduleData.color}-700 rounded-md text-black`
                }
                
              >
                {moduleData.code}
              </span>
              <span className="inline-flex w-full py-4 font-semibold text-md whitespace-nowrap">
                {moduleData.name}
              </span>
            </div>

            <div className="flex items-center">
              <NavLink to={editRoute} exact activeClassName="text-white">
                <button className="flex items-center px-3 py-1 text-sm font-medium text-black hover:text-blue-600 focus:outline-none">
                  <PencilIcon className="w-5 h-5 mr-1" />
                  Edit
                </button>
              </NavLink>
              <button className="flex items-center px-3 py-1 text-sm font-medium text-black hover:text-red-600 focus:outline-none"
              onClick={handleDelete}>
                <TrashIcon className="w-5 h-5 mr-1" />
                Delete
              </button>
            </div>
          </div>
          <span className="pl-2 pr-5 text-gray-500 ">
            Number of lab: {moduleData.labs}
          </span>
          <span className="pr-5 text-gray-500 ">
            {/* Student Enrolled: {students.length} */}
          </span>
          <span className="pr-5 text-gray-500">Lab Status: Active</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-between min-w-full p-5 bg-white rounded-md shadow-2xl h-fit">
        <div className="flex flex-col min-w-full gap-5 animate-pulse">
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
        </div>
      </div>
    );
  }
}
