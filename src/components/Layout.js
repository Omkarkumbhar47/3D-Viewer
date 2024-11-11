// import React, { useState } from "react";
// import Header from "../components/Header.js";
// import Footer from "../components/Footer.js";
// import ModelViewer from "./ModelViewer";
// import Sidebar from "./Sidebar.js";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Layout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [modelParts, setModelParts] = useState([]); // Store extracted parts

//   // Function called when a model loads and extracts its parts
//   const handleModelLoad = (parts) => {
//     setIsSidebarOpen(true); // Open sidebar when model loads
//     setModelParts(parts);   // Pass parts to sidebar
//   };

//   const handlePartClick = (part) => {
//     // Highlight logic for clicked part
//     part.material.color.set("lightblue");
//     part.material.opacity = 0.6;
//     part.material.transparent = true;
//   };

//   const handleToggleVisibility = (part) => {
//     part.visible = !part.visible;
//     setModelParts([...modelParts]); // Trigger re-render
//   };

//   return (
//     <div className="d-flex flex-column vh-100">
//       <header className="text-center py-2 px-4">
//         <Header />
//       </header>
//       <div className="d-flex flex-grow-1 px-2">
//         {/* Sidebar only shows when model is loaded */}
//         {isSidebarOpen && (
//           <Sidebar
//             modelParts={modelParts}
//             onPartClick={(part) => console.log("Selected part:", part)}
//             toggleVisibility={(part) => console.log("Toggled visibility for:", part)}
//           />
//         )}
//         <ModelViewer onModelLoad={handleModelLoad} />
//       </div>
//       <footer
//         className="d-flex justify-content-center align-items-center px-sm-5"
//         style={{ height: "50px" }}
//       >
//         <Footer />
//       </footer>
//     </div>
//   );
// }

// export default Layout;

import React, { useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ModelViewer from "./ModelViewer";
import Sidebar from "./Sidebar.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modelParts, setModelParts] = useState([]); // Store extracted parts
  const [background, setBackground] = useState("#ffffff"); // Default background color
  const [environment, setEnvironment] = useState("studio"); // Default environment

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

    // const handlePartClick = (clickedPart) => {
    //   const updatedParts = modelParts.map((part) =>
    //     part === clickedPart
    //       ? {
    //           ...part,
    //           highlighted: true,
    //           material: {
    //             ...part.material,
    //             color: "lightblue",
    //             opacity: 0.6,
    //             transparent: true,
    //           },
    //         }
    //       : part
    //   );
    //   setModelParts(updatedParts); // Trigger re-render
    // };

  const handleToggleVisibility = (part) => {
    part.visible = !part.visible;
    setModelParts([...modelParts]); // Trigger re-render
  };

  // const handleToggleVisibility = (partToToggle) => {
  //   const updatedParts = modelParts.map((part) =>
  //     part === partToToggle ? { ...part, visible: !part.visible } : part
  //   );
  //   setModelParts(updatedParts); // Trigger re-render
  // };

  return (
    <div className="d-flex flex-column vh-100">
      <header className="text-center py-2 px-4">
        <Header />
      </header>
      <div className="d-flex flex-grow-1 px-2">
        {isSidebarOpen && (
          <Sidebar
            modelParts={modelParts}
            onPartClick={handlePartClick} // Pass function to handle part click
            toggleVisibility={handleToggleVisibility} // Pass function to toggle visibility
            setBackground={setBackground} 
            setEnvironment={setEnvironment} 
          />
        )}
        <ModelViewer
          onModelLoad={handleModelLoad}
          background={background}
          environment={environment}
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
