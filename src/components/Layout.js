import React, { useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ModelViewer from "./ModelViewer";
import Sidebar from "./Sidebar.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children }) {
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
  const [modelDetails, setModelDetails] = useState({
    fileName: "",
    fileSize: "",
    vertices: 0,
    triangles: 0,
    sizeX: 0,
    sizeY: 0,
    sizeZ: 0,
    volume: 0,
    surfaceArea: 0,
    materials: [],
    generator: "",
    version: "",
  });

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
    {/* Header */}
    <header
      className="d-flex align-items-center px-3"
      style={{ height: "50px" }}
    >
      <Header />
    </header>

    {/* Main Content */}
    <div className="d-flex flex-grow-1 overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside
          className="d-none d-md-flex flex-column overflow-auto"
          style={{ width: "250px" }}
        >
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
            modelDetails={modelDetails}
          />
        </aside>
      )}

      {/* ModelViewer */}
      <main
        className={`flex-grow-1 overflow-hidden ${
          isSidebarOpen ? "ms-md-3" : ""
        }`}
      >
         {children}
        <ModelViewer
          onModelLoad={handleModelLoad}
          backgroundColor={backgroundColor}
          environment={environment}
          selectedHDRI={selectedHDRI}
          selectedPart={selectedPart}
          onSelectPart={handleSelectPart}
          setSelectedSidebarPart={setSelectedSidebarPart}
          selectedSidebarPart={selectedSidebarPart}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          showGrid={showGrid}
          setModelDetails={setModelDetails}
        />
      </main>
    </div>

    {/* Footer */}
    <footer
      className="d-flex align-items-center px-3 justify-content-center"
      style={{ height: "50px" }}
    >
      <Footer />
    </footer>
  </div>
  );
}
