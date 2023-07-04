import React, { useState } from "react";
import { TrashIcon, SearchIcon } from "@heroicons/react/outline";

export default function EnrolTable({ studentData, currentStudents, handleReturn }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of rows to display per page
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

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

  const handleAddStudent = (student) => {
    // if (!selectedStudents.includes(student)) {
    //   setSelectedStudents((prevStudents) => [...prevStudents, student]);
    // }
    setSelectedStudents((prevStudents) => [...prevStudents, student]);
  };

  const handleRemoveStudent = (student) => {
    setSelectedStudents((prevStudents) =>
      prevStudents.filter((s) => s !== student)
    );
  };

  return (
    <section className="flex gap-5">
      <div className="flex flex-col w-2/3">
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
              {/* Table header */}
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
                    className="px-6 py-3 font-semibold text-sm bg-[#0f172A] whitespace-nowrap"
                  >
                    STUDENT ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-sm bg-[#0f172A]"
                  >
                    STUDENT EMAIL
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 font-semibold text-sm bg-[#0f172A]"
                  >
                    TAGS
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-sm font-semibold text-right bg-[#0f172A]"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              {/* Table body */}
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
                      {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {account["tags"].map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 mr-1 text-xs font-medium text-white bg-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </td> */}
                      <td className="flex justify-end gap-5 px-6 py-4">
                        <button
                          className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-lg whitespace-nowrap"
                          onClick={() => handleAddStudent(student)}
                        >
                          Enrol Student
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No data found</td>
                  </tr>
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
      </div>
      <div className="flex flex-col w-1/3 mt-3">
        <h2 className="mb-4 text-2xl font-semibold text-center">Selected Students</h2>
        <div className="flex flex-col gap-2 ">
          {selectedStudents.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500 bg-white rounded-md">

              <tbody>
                {selectedStudents.map((student) => (
                  <tr key={student["Username"]}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {student["Attributes"][2].Value}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {student["Username"]}
                    </td>
                    <td className="flex justify-end gap-5 px-6 py-4">
                      <button
                        className="px-4 py-2 text-white bg-red-500 rounded-lg"
                        onClick={() => handleRemoveStudent(student)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="py-4">No students selected</p>
          )}
        </div>
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleReturn}
            className="flex-1 px-5 py-2 text-black transition-colors duration-150 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="button"
            className="flex-1 px-5 py-2 text-white transition-colors duration-150 bg-black rounded-md hover:bg-black/70"
          >
            Next Step
          </button>
        </div>
      </div>
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
