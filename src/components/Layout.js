import React, { useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ModelViewer from "./ModelViewer";
import Sidebar from "./Sidebar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./Loder";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modelParts, setModelParts] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#222222");
  const [environment, setEnvironment] = useState("studio");
  const [selectedHDRI, setSelectedHDRI] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedSidebarPart, setSelectedSidebarPart] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(2);
  const [showGrid, setShowGrid] = useState(false);

  // Handle selecting a part from the sidebar
  const handleSelectPart = (part) => {
    if (selectedPart && selectedPart !== part) {
      // Deselect the previous part
      setSelectedPart(null);
    }
    // Select the new part
    setSelectedPart(part);
  };

  // Function called when a model loads and extracts its parts
  const handleModelLoad = (parts) => {
    setIsSidebarOpen(true); // Open sidebar when model loads
    setModelParts(parts); // Pass parts to sidebar
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
            toggleVisibility={handleToggleVisibility}
            setBackgroundColor={setBackgroundColor}
            setEnvironment={setEnvironment}
            setSelectedHDRI={setSelectedHDRI}
            onSelectPart={handleSelectPart}
            selectedPart={selectedPart}
            setSelectedSidebarPart={setSelectedSidebarPart}
            selectedSidebarPart={selectedSidebarPart}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            autoRotateSpeed={autoRotateSpeed}
            setAutoRotateSpeed={setAutoRotateSpeed}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
          />
        )}
        <Loader />
        <ModelViewer
          onModelLoad={handleModelLoad}
          backgroundColor={backgroundColor}
          environment={environment}
          selectedHDRI={selectedHDRI}
          selectedPart={selectedPart}
          onSelectPart={handleSelectPart}
          setSelectedSidebarPart={setSelectedSidebarPart} // Pass this down
          selectedSidebarPart={selectedSidebarPart} // Track selected part
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          showGrid={showGrid}
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
