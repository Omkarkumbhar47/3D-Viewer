import React, { useState } from "react";
import "./Sidebar.css";
import church from "./assets/image/laufenurg_church-min.jpg";
import studio1 from "./assets/image/studio_small_08-min.jpg";
import studio2 from "./assets/image/photo_studio_01-min.jpg";
import depot from "./assets/image/old_depot-min.jpg";
import rogland from "./assets/image/rogland_moonlit_night-min.jpg";
const hdriOptions = [
  {
    name: "Outdoor",
    thumbnail: rogland,
    url: "/environment/rogland_moonlit_night_4k.hdr",
  },
  {
    name: "Studio 02",
    thumbnail: studio2,
    url: "/environment/studio_small_08_4k.hdr",
  },
  {
    name: "Studio 01",
    thumbnail: studio1,
    url: "/environment/photo_studio_01_4k.hdr",
  },
  {
    name: "Depot",
    thumbnail: depot,
    url: "/environment/old_depot_4k.hdr",
  },
  {
    name: "Night",
    thumbnail: church,
    url: "/environment/laufenurg_church_4k.hdr",
  },
];

const Sidebar = ({
  modelParts,
  toggleVisibility,
  setBackgroundColor,
  setEnvironment,
  setSelectedHDRI,
  setSelectedSidebarPart, // Set selected part for syncing with ModelViewer
  selectedSidebarPart,
}) => {
  const [isMeshesOpen, setIsMeshesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(null);

  const handleMeshesClick = () => {
    setIsMeshesOpen((prev) => !prev);
    setIsSettingsOpen(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen((prev) => !prev);
    setIsMeshesOpen(false);
  };

  const handleBackgroundColorChange = (e) => {
    const color = e.target.value;
    setBackgroundColor(color);
    setSelectedBackgroundType("color");
    // Reset other background settings
    // setEnvironment(null);
    setSelectedHDRI(null);
  };

  const handleVisibilityToggle = (part) => {
    setSelectedSidebarPart(part.mesh); // Select part in ModelViewer
  };

  const handleEnvironmentChange = (e) => {
    const value = e.target.value;
    setEnvironment(value);
    setSelectedBackgroundType("preset");
    // setBackgroundColor(null);
    setSelectedHDRI(null);
  };
  const handleHDRISelection = (url) => {
    setSelectedHDRI(url);
    setSelectedBackgroundType("hdri");
    setBackgroundColor(null);
    setEnvironment(null);
  };

  return (
    <div
      className="overflow-hidden px-1 pt-1 "
      style={{ height: "calc(100vh - 109px)", minWidth: "250px" }}
    >
      <div
        className=" mb-1 gap-2 d-flex align-items-center SidebarElem p-1 rounded-2 pointer"
        onClick={handleMeshesClick}
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
                className={`d-flex justify-content-between align-items-center mb-1 p-1 ${
                  selectedSidebarPart === part.mesh ? "highlighted" : ""
                }`}
                onClick={() => handleVisibilityToggle(part)} // Set selected part on click
              >
                <div className="text-truncate">{part.name}</div>
                <div>
                  <span onClick={() => toggleVisibility(part.mesh)}>
                    {part.mesh.visible ? (
                      <i className="ri-eye-off-line"></i>
                    ) : (
                      <i className="ri-eye-line"></i>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Toggle */}
      <div
        className="gap-2 d-flex align-items-center SidebarElem p-1 rounded-2 pointer"
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
              onChange={handleBackgroundColorChange}
              className="form-control form-control-sm mt-1 border-0 inputSidebar"
            />
          </div>

          <div className="mb-2">
            <label>Environment Preset</label>
            <select
              onChange={handleEnvironmentChange}
              className="form-control form-control-sm mt-1 "
            >
              <option value="">Select a Preset</option>
              <option value="apartment">Apartment</option>
              <option value="city">City</option>
              <option value="dawn">Dawn</option>
              <option value="forest">Forest</option>
              <option value="lobby">Lobby</option>
              <option value="night">Night</option>
              <option value="park">Park</option>
              <option value="studio">Studio</option>
              <option value="sunset">Sunset</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>

          <div className="mb-2">
            <label>Background Environment</label>
            <div
              className="form-control form-control-sm mt-1 inputSidebar d-flex flex-wrap  gap-2"
              style={{
                height: "190px",
                overflowY: "auto", // Enables vertical scroll if content overflows
                padding: "8px",
              }}
            >
              {hdriOptions.map((hdri) => (
                <div className=" d-flex flex-column align-items-center pointer">
                  <div
                    key={hdri.name}
                    className=" d-flex flex-column align-items-center pointer  overflow-hidden"
                    onClick={() => handleHDRISelection(hdri.url)}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "2px",
                    }}
                  >
                    <img
                      src={hdri.thumbnail}
                      alt={hdri.name}
                      className=""
                      style={{
                        height: "60px",
                        width: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div
                    className="text-center"
                    style={{ color: "white", fontSize: "0.8rem" }}
                  >
                    {hdri.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
