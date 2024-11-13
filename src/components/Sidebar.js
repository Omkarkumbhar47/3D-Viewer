import React, { useState } from "react";
import "./Sidebar.css";
import stdioImg from "./image/3dimage.jpg";
const hdriOptions = [
  {
    name: "Outdoor",
    thumbnail: "/environment/rogland_moonlit_night_4k.hdr",
    url: "/environment/rogland_moonlit_night_4k.hdr",
  },
  {
    name: "Studio 02",
    thumbnail: "./image/studio_small_08-min.jpg",
    url: "/environment/studio_small_08_4k.hdr",
  },
  {
    name: "Studio 01",
    thumbnail: "./image/photo_studio_01-min.jpg",
    url: "/environment/photo_studio_01_4k.hdr",
  },
  {
    name: "Depot",
    thumbnail: "./image/old_depot-min.jpg",
    url: "/environment/old_depot_4k.hdr",
  },
  {
    name: "Night",
    thumbnail: "./image/laufenurg_church-min.jpg",
    url: "/environment/laufenurg_church_4k.hdr",
  },
];

const Sidebar = ({
  modelParts,
  onPartClick,
  toggleVisibility,
  setBackgroundColor,
  setEnvironment,
  setEnvironmentImage,
  setSelectedHDRI,
  setBackgroundImage,
}) => {
  const [isMeshesOpen, setIsMeshesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState("");

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
    if (toggleVisibility) {
      toggleVisibility(part);
    }
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
                className="d-flex justify-content-between align-items-center mb-1  p-1"
              >
                <div className="text-truncate">{part.name}</div>
                <div>
                  <span onClick={() => handleVisibilityToggle(part)}>
                    <span onClick={() => toggleVisibility(part.mesh)}>
                      {part.mesh.visible ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </span>
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

          <div>
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

          <div>
            <label>Background Environment</label>
            <div
              className="form-control form-control-sm mt-1 inputSidebar d-flex flex-wrap  gap-2"
              style={{
                height: "180px",
                overflowY: "auto", // Enables vertical scroll if content overflows
                padding: "8px",
              }}
            >
              {hdriOptions.map((hdri) => (
                <div
                  key={hdri.name}
                  className=" d-flex flex-column align-items-center pointer border"
                  onClick={() => handleHDRISelection(hdri.url)}
                  style={{
                    height: "70px",
                    width: "70px",
                    // backgroundColor: "#060606",

                    borderRadius: "8px",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={stdioImg} // Replace with actual thumbnail path if needed
                    alt={hdri.name}
                    className=""
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                    }}
                  />
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
