import React, { useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ModelViewer from "./ModelViewer";
import Sidebar from "./Sidebar.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modelParts, setModelParts] = useState([]); // Store extracted parts
  const [backgroundColor, setBackgroundColor] = useState("#222222");
  const [environment, setEnvironment] = useState(null);
  const [selectedHDRI, setSelectedHDRI] = useState(null);
  

  // Function called when a model loads and extracts its parts
  const handleModelLoad = (parts) => {
    setIsSidebarOpen(true); // Open sidebar when model loads
    setModelParts(parts); // Pass parts to sidebar
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
      <div className="d-flex flex-grow-1">
        {isSidebarOpen && (
          <Sidebar
            modelParts={modelParts}
            onPartClick={handlePartClick} // Pass function to handle part click
            toggleVisibility={handleToggleVisibility} // Pass function to toggle visibility
            setBackgroundColor={setBackgroundColor}
            setEnvironment={setEnvironment}
            setSelectedHDRI={setSelectedHDRI}
          />
        )}
        <ModelViewer
          onModelLoad={handleModelLoad}
          backgroundColor={backgroundColor}
          environment={environment}
          selectedHDRI={selectedHDRI}
        />
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
