import React, { useState } from "react";
import { PencilIcon, TrashIcon, SearchIcon } from "@heroicons/react/outline";

export default function EnrolTable({ studentData }) {
  const [showModal, setShowModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of rows to display per page
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (index) => {
    setShowModal(true);
    setAccountSelected(index);
  };

  const closeModal = () => {
    setShowModal(false);
    setAccountSelected(null);
  };

  // Calculate the start and end indexes of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentPageData = studentData
    .filter((student) =>
      student["Attributes"][2].Value.toLowerCase().includes(
        searchQuery.toLowerCase()
      )
    )
    .slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSaveChanges = () => {
    const account = currentPageData[accountSelected];

    //json data format probably is wrong and needs editing
    const data = {
      _id: account._id,
      name: document.getElementById("name").value,
      id: document.getElementById("id").value,
      email: document.getElementById("email").value,
      //   tag: {
      //     tag: tag,
      //   },
    };

    console.log(data);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="relative w-48">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full py-2 pl-10 pr-4 border-gray-300 rounded-lg"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-5 py-5">
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead className="text-xs text-white uppercase">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold text-sm bg-[#0f172A]"
                >
                  FULL NAME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold text-sm bg-[#0f172A]"
                >
                  STUDENT ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold text-sm bg-[#0f172A]"
                >
                  STUDENT EMAIL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-semibold text-sm bg-[#0f172A]"
                >
                  TAGS
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-semibold text-right bg-[#0f172A]"
                >
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPageData ? (
                currentPageData.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {student["Attributes"][2].Value}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {student["Username"]}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {student["Attributes"][3].Value}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {/* {account["tags"].map((tag, index) => (
                    
                    <span
                      key={index}
                        className="px-2 py-1 mr-1 text-xs font-medium text-white bg-gray-600 rounded-full"
                        >
                        {tag}
                        </span>
                        ))} */}
                    </td>
                    <td className="flex justify-end gap-5 px-6 py-4">
                      <button
                        className="flex items-center px-1 py-1 text-sm font-medium text-black hover:text-blue-600 focus:outline-none"
                        onClick={() => openModal(index)}
                      >
                        <PencilIcon className="w-5 h-5 " />
                      </button>
                      <button className="flex items-center px-1 py-1 text-sm font-medium text-black hover:text-red-600 focus:outline-none">
                        <TrashIcon className="w-5 h-5 " />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td>No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(studentData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative min-w-[480px] max-w-xs mx-auto my-6">
              <div className="relative flex flex-col bg-white border-0 rounded-md shadow-lg outline-none w-fullm-12 focus:outline-none">
                <div className="relative flex-auto px-5 py-6">
                  <div className="flex items-start justify-center">
                    <div className="flex flex-col gap-2.5">
                      <span className="px-6 text-2xl font-medium leading-relaxed text-black">
                        Editing{" "}
                        {currentPageData[accountSelected]["studentName"]}
                      </span>
                      <div className="p-2 px-6">
                        <p>Email:</p>
                        <input
                          id="email"
                          type="email"
                          placeholder="Email"
                          defaultValue={
                            currentPageData[accountSelected]["studentEmail"]
                          }
                          className="w-64 p-2 border border-gray-300 rounded-lg"
                        />
                        <div className="flex-1">
                          <p>Name:</p>
                          <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            defaultValue={
                              currentPageData[accountSelected]["studentName"]
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pb-6 px-11">
                  <button
                    type="button"
                    className="flex h-full px-5 py-2 text-black transition-colors duration-150 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-200"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex h-full px-8 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </section>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav>
      <ul className="flex gap-2">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`px-2 py-1 rounded-md cursor-pointer ${
              pageNumber === currentPage
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </nav>
  );
}
