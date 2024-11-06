import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ModelViewer from "./ModelViewer";
import "bootstrap/dist/css/bootstrap.min.css";

function Layout({ children }) {
  return (
    <div className=" d-flex flex-column vh-100 ">
      <header
        className=" text-center py-2 px-5"
        // style={{ height: "55px" }}
      >
        <Header />
      </header>
      <div className="flex-grow-1 px-2">
        <ModelViewer />
        {/* <main className="flex-grow-1">{children}</main> */}
      </div>
      <footer
        className="d-flex justify-content-center align-items-center px-5"
        style={{ height: "50px" }}
      >
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
