import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar/>
      </header>
      <div className="flex ">
        <main className="flex-grow">{children}</main>
      </div>
      <footer className="relative">
        <Footer/>
      </footer>
    </>
  );
};

export default Layout;