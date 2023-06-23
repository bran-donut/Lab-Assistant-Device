import React from "react";
import { SearchIcon, UserIcon } from '@heroicons/react/solid';
import Logo from "../assets/lad-logo.png";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";

const handleSignOut = () => {
    try {
      Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
};


const Navbar = () => {
  return (
    <nav className="bg-[#0F172A]">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/Home">
                <img className="h-10 w-17" src={Logo} alt="Logo" />
              </NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 text-sm text-gray-300 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-white"
              />
              <SearchIcon className="w-6 h-6 ml-2 text-gray-300 cursor-pointer hover:text-white" />
              <UserIcon
                className="w-6 h-6 ml-2 text-gray-300 cursor-pointer hover:text-white"
                onClick={handleSignOut}
              />
              {/* temp log out button */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;