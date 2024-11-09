import React, { useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ModelViewer from "./ModelViewer";
import Sidebar from "./Sidebar.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modelParts, setModelParts] = useState([]); // Store extracted parts

  // Function called when a model loads and extracts its parts
  const handleModelLoad = (parts) => {
    setIsSidebarOpen(true); // Open sidebar when model loads
    setModelParts(parts);   // Pass parts to sidebar
  };

  const handlePartClick = (part) => {
    // Highlight logic for clicked part
    part.material.color.set("lightblue");
    part.material.opacity = 0.6;
    part.material.transparent = true;
  };

  const handleToggleVisibility = (part) => {
    part.visible = !part.visible;
    setModelParts([...modelParts]); // Trigger re-render
  };

  return (
    <div className="d-flex flex-column vh-100">
      <header className="text-center py-2 px-4">
        <Header />
      </header>
      <div className="d-flex flex-grow-1 px-2">
        {/* Sidebar only shows when model is loaded */}
        {isSidebarOpen && (
          <Sidebar
            modelParts={modelParts}
            onPartClick={(part) => console.log("Selected part:", part)}
            toggleVisibility={(part) => console.log("Toggled visibility for:", part)}
          />
        )}
        <ModelViewer onModelLoad={handleModelLoad} />
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
