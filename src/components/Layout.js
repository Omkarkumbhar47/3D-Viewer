import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ModelViewer from "./ModelViewer";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar.js";

function Layout({ children }) {
  return (
    <div className=" d-flex flex-column vh-100 ">
      <header
        className=" text-center py-2 px-4"
        // style={{ height: "55px" }}
      >
        <Header />
      </header>
      <div className=" d-flex flex-grow-1 px-2">
        
          {/* <Sidebar /> */}
       
        <ModelViewer />
        {/* <main className="flex-grow-1">{children}</main> */}
      </div>
      <footer
        className="d-flex justify-content-center align-items-center px-sm-5"
        style={{ height: "50px" }}
      >
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
