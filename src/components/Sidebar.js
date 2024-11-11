import React, { useState } from "react";

const Sidebar = ({
  modelParts,
  onPartClick,
  toggleVisibility,
  setBackground,
  setEnvironment,
}) => {
  const [isMeshesOpen, setIsMeshesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const handlePartClick = (part) => {
    if (onPartClick) {
      onPartClick(part);
    }
  };

  const handleVisibilityToggle = (part) => {
    if (toggleVisibility) {
      toggleVisibility(part);
    }
  };

  const handleMeshesClick = () => {
    setIsMeshesOpen(true);
    setIsSettingsOpen(false);
  };

  const handleSettingsClick = () => {
    // Show all model parts and switch to settings view
    modelParts.forEach((part) => toggleVisibility(part, true));
    setIsMeshesOpen(false);
    setIsSettingsOpen(true);
  };

  return (
    <div
      className="p-2 overflow-hidden "
      style={{ height: "calc(100vh - 107px)", minWidth: "250px" }}
    >
      <div
        className=" mb-1 gap-2 d-flex align-items-center SidebarElem"
        onClick={() => setIsMeshesOpen(!isMeshesOpen)}
      >
        <i className="ri-box-3-fill ViewerIcon"></i>
        <span>Meshes</span>
      </div>

      {isMeshesOpen && (
        <div
          className="d-flex flex-column mt-2 overflow-y-scroll sidebarScroller"
          style={{ height: "calc(100vh -100px)", maxHeight: "545px" }}
        >
          <div>
            {modelParts.map((part, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-1  p-1"
              >
                <div
                  // onClick={() => handlePartClick(part)}
                  // style={{
                  //   cursor: "pointer",
                  //   color: highlightedPart === part ? "lightblue" : "white",
                  //   flex: 1,
                  // }}
                  className="text-truncate"
                >
                  {part.name}
                </div>
                <div>
                  <span onClick={() => handleVisibilityToggle(part)}>
                    <span onClick={() => toggleVisibility(part.mesh)}>
                      {part.mesh.visible ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </span>
                    {/* {visibleParts.has(part) ? "Hide" : "Show"} */}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Toggle */}
      <div
        className="mt-3 gap-2 d-flex align-items-center SidebarElem"
        onClick={handleSettingsClick}
      >
        <i className="ri-settings-3-fill ViewerIcon"></i>
        <span>Settings</span>
      </div>

      {isSettingsOpen && (
        <div className="d-flex flex-column mt-2">
          <div className="mb-2">
            <label>Background Color</label>
            <input
              type="color"
              onChange={(e) => setBackground(e.target.value)}
              className="form-control form-control-sm mt-1 "
            />
          </div>
          <div>
            <label>Environment</label>
            <select
              onChange={(e) => setEnvironment(e.target.value)}
              className="form-control form-control-sm mt-1"
            >
              <option value="studio">Studio</option>
              <option value="outdoor">Outdoor</option>
              <option value="sunset">Sunset</option>
              <option value="city">City</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
