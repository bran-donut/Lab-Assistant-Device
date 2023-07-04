import React from "react";
import { useState, useEffect } from "react";
import { TrashIcon, EyeIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function ModuleCard({ moduleData, viewRoute, deleteModule }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bgColor, setBgColor] = useState("");

  console.log(moduleData)

  useEffect(() => {
    switch (moduleData.color) {
      case "red":
        setBgColor("bg-red-700");
        break;
      case "blue":
        setBgColor("bg-blue-700");
        break;
      case "green":
        setBgColor("bg-green-700");
        break;
      default:
        setBgColor("bg-gray-700");
    }
  }, [moduleData.color]);

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  if (moduleData) {
    const handleDelete = () => {
      deleteModule(moduleData.code);
      setShowDeleteModal(false);
    };

    return (
      <div className="flex flex-col items-start p-5 m-2 bg-white rounded-md shadow-md h-fit">
        <div className="w-full">
          <div className="flex items-center justify-between gap-5 2xl:gap-5">
            <div className="flex flex-row">
              <span
                className={`inline-flex w-full p-2 m-2 text-xl font-bold whitespace-nowrap ${bgColor} rounded-md text-white`}
              >
                {moduleData.code}
              </span>
              <span className="inline-flex w-full py-4 font-semibold text-md whitespace-nowrap">
                {moduleData.name}
              </span>
            </div>

            <div className="flex items-center">
            <NavLink to={viewRoute} exact activeClassName="text-white">
                <button className="flex items-center px-3 py-1 text-sm font-medium text-black hover:text-green-600 focus:outline-none">
                  <EyeIcon className="w-5 h-5 mr-1" />
                  View
                </button>
              </NavLink>
              <button
                className="flex items-center px-3 py-1 text-sm font-medium text-black hover:text-red-600 focus:outline-none"
                onClick={toggleDeleteModal}
              >
                <TrashIcon className="w-5 h-5 mr-1" />
                Delete
              </button>
            </div>
          </div>
          <span className="pl-2 pr-5 text-gray-500 ">
            Number of labs: {moduleData.labs.length}
          </span>
          <span className="pr-5 text-gray-500">Lab Names: {moduleData.labs.map((lab, i) => (<span>{lab} </span>))}</span>
        </div>
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative w-full max-w-sm mx-auto my-6">
                <div className="relative flex flex-col bg-white border border-gray-300 rounded-md shadow-lg outline-none">
                  <div className="flex-auto px-6 py-6">
                    <div className="flex items-start justify-center">
                      <div className="flex flex-col gap-2.5">
                        <h2 className="text-2xl font-medium leading-relaxed text-black">
                          Delete {moduleData.code}?
                        </h2>
                        <div>
                          <p>Are you sure? This action is irreversible.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end px-6 py-4">
                    <button
                      type="button"
                      className="px-4 py-2 mr-2 text-black transition-colors duration-150 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-200"
                      onClick={toggleDeleteModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white transition-colors duration-150 bg-red-500 rounded-md hover:bg-red-600"
                      onClick={handleDelete}
                    >
                      Delete Module
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        )}
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
