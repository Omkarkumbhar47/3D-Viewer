import React, { useState } from "react";

const Sidebar = ({ modelParts, onPartClick, toggleVisibility }) => {
  const [isMeshesOpen, setIsMeshesOpen] = useState(false);

  // const handlePartClick = (part) => {
  //   if (onPartClick) {
  //     onPartClick(part);
  //   }
  // };

  // const handleVisibilityToggle = (part) => {
  //   if (toggleVisibility) {
  //     toggleVisibility(part);
  //   }
  // };

  return (
    <div className="bg-dark text-white p-2" style={{ width: "200px" }}>
      <div className="sidebar">
        <h5>Meshes</h5>
        <ul>
          {modelParts.map((part, index) => (
            <li key={index}>
              <span onClick={() => onPartClick(part.mesh)}>{part.name}</span>
              <button onClick={() => toggleVisibility(part.mesh)}>
                {part.mesh.visible ? "Hide" : "Show"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="me-2 mt-1 d-flex flex-column">
        <div
          className="px-2 py-1 mb-1 SidebarElem"
          onClick={() => setIsMeshesOpen(!isMeshesOpen)}
          style={{ cursor: "pointer", color: "lightgray" }}
        >
          <i className="ri-box-3-fill ViewerIcon"></i>
          <span>Meshes</span>
        </div>
      </div>

      {isMeshesOpen && (
        <div className="d-flex flex-column mt-2">
          <div>
            {modelParts.map((part, index) => (
              <div key={index} className="d-flex align-items-center mb-1">
                <span
                  onClick={() => handlePartClick(part)}
                  style={{
                    cursor: "pointer",
                    color: highlightedPart === part ? "lightblue" : "white",
                    flex: 1,
                  }}
                >
                  {part.name}
                </span>
                <button
                  onClick={() => handleVisibilityToggle(part)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {visibleParts.has(part) ? "Hide" : "Show"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Sidebar;
