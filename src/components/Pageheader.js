import { PlusIcon } from "@heroicons/react/outline";
import React from "react";
import { NavLink } from "react-router-dom";

export default function PageHeader({
  breadCrumbItems,
  heading,
  description,
  buttonText,
  buttonRoute
}) {
  return (
    <section className="p-4 px-32 text-black from-[#ffffff] to-[#f2f7ff] bg-gradient-to-br">
      <div className="text-black">
        <div className="py-3">
          <div className="flex gap-3 pb-2">
            {breadCrumbItems.map((item, i, arr) => (
              <React.Fragment key={i}>
                <div
                  className={`${arr.length - 1 === i ? "text-black" : "text-gray-400"} `}
                >
                  {item}
                </div>
                {arr.length - 1 !== i && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
          <h2 className="text-[40px] font-semibold">{heading}</h2>
        </div>
        <div className="flex flex-col justify-between mt-2 gap-14 sm:gap-20 sm:flex-row">
          <div>
            <p className="text-[#828282] text-sm">{description}</p>
          </div>
          <div>
            {buttonText === null || buttonText === "" ? null : (
              <NavLink
                to={buttonRoute}
                exact
                activeClassName="text-white"
                className="flex items-center px-4 py-2 text-sm font-normal text-white bg-black border-2 rounded-md hover:text-blue-600 focus:outline-none"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                {buttonText}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}