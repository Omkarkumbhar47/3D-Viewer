import React, { useState } from "react";
import "./Sidebar.css";
import church from "./assets/image/laufenurg_church-min.jpg";
import studio1 from "./assets/image/studio_small_08-min.jpg";
import studio2 from "./assets/image/photo_studio_01-min.jpg";
import depot from "./assets/image/old_depot-min.jpg";

import Terrain from "./assets/image/hilly_terrain_01.jpg";
import Lakes from "./assets/image/lakes.jpg";
import Limehouse from "./assets/image/limehouse.jpg";
import Harbor from "./assets/image/small_harbor_01.jpg";
import Sunflowers from "./assets/image/sunflowers.jpg";
import rogland from "./assets/image/rogland_moonlit_night-min.jpg";
import ScreenshotControls from "./ScreenshotControls";
import { hover } from "@testing-library/user-event/dist/hover";
import { div } from "three/webgpu";
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
  // {
  //   name: "Clarens Night",
  //   thumbnail: Clarens,
  //   url: "/environment/clarens_night_01_4k.hdr",
  // },
  {
    name: "Hilly Terrain",
    thumbnail: Terrain,
    url: "/environment/hilly_terrain_01_4k.hdr",
  },
  {
    name: "Terrain",
    thumbnail: Lakes,
    url: "/environment/lakes_4k.hdr",
  },
  {
    name: "Limehouse",
    thumbnail: Limehouse,
    url: "/environment/limehouse_4k.hdr",
  },
  {
    name: "Small Harbor",
    thumbnail: Harbor,
    url: "/environment/small_harbor_01_4k.hdr",
  },
  // {
  //   name: "Sunflowers",
  //   thumbnail: Sunflowers,
  //   url: "/environment/sunflowers_4k.hdr",
  // },
];

const Sidebar = ({
  modelParts,
  toggleVisibility,
  setBackgroundColor,
  setEnvironment,
  setSelectedHDRI,
  setSelectedSidebarPart, // Set selected part for syncing with ModelViewer
  selectedSidebarPart,
  autoRotate,
  setAutoRotate,
  autoRotateSpeed,
  setAutoRotateSpeed,
  showGrid,
  setShowGrid,

  modelDetails, //to get the details like vertices etc.
}) => {
  const [isMeshesOpen, setIsMeshesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDetailsOpen, setisDetailsOpen] = useState(false);
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(null);

  const handleMeshesClick = () => {
    setIsMeshesOpen((prev) => !prev);
    setIsSettingsOpen(false);
    setisDetailsOpen(false);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen((prev) => !prev);
    setIsMeshesOpen(false);
    setisDetailsOpen(false);
  };

  const handleDetailsClick = () => {
    setisDetailsOpen((prev) => !prev);
    setIsMeshesOpen(false);
    setIsSettingsOpen(false);
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
    // setSelectedSidebarPart((part.mesh) => !part.mesh);
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
        className={`mb-1 gap-2 d-flex align-items-center  p-1 rounded-2 pointer ${
          isMeshesOpen === true ? "SidebarElem1" : "SidebarElem"
        }`}
        onClick={handleMeshesClick}
      >
        <i className="ri-box-3-fill ViewerIcon"></i>
        <span>Meshes</span>
      </div>

      {isMeshesOpen && (
        <div
          className="d-flex flex-column mt-2 overflow-y-scroll sidebarScroller"
          style={{ height: "calc(100vh -100px)", maxHeight: "450px" }}
        >
          <div>
            {modelParts.map((part) => (
              <div
                key={part.mesh.name}
                className={`d-flex justify-content-between align-items-center mb-1 p-1 meshesElem ${
                  selectedSidebarPart === part.mesh ? "highlighted" : ""
                }`}
                onClick={() => handleVisibilityToggle(part)} // Set selected part on click
              >
                <div className="text-truncate">{part.name}</div>
                <div>
                  <span onClick={() => toggleVisibility(part.mesh)}>
                    {part.mesh.visible ? (
                      <i className="ri-eye-line"></i>
                    ) : (
                      <i className="ri-eye-off-line"></i>
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
        className={`mb-1 gap-2 d-flex align-items-center  p-1 rounded-2 pointer ${
          isSettingsOpen === true ? "SidebarElem1" : "SidebarElem"
        }`}
        onClick={handleSettingsClick}
      >
        <i className="ri-settings-3-fill ViewerIcon"></i>
        <span>Settings</span>
      </div>

      {isSettingsOpen && (
        <div>
          <div className="d-flex w-100 text-center py-1">
            <div className="w-50">
              <label>
                Background
                <br />
                Color
              </label>
              <input
                type="color"
                onChange={handleBackgroundColorChange}
                className="inputSidebar w-75 text-center border-0 mt-1"
              />
            </div>
            <div className="border-start w-50 p-0">
              <label>
                Environment
                <br />
                Preset
              </label>
              <select
                onChange={handleEnvironmentChange}
                className="w-75 text-center inputSidebar outline mt-1"
              >
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="city">City</option>
                <option value="dawn">Dawn</option>
                <option value="forest">Forest</option>
                <option value="lobby">Lobby</option>
                <option value="night">Night</option>
                <option value="park">Park</option>
                <option value="sunset">Sunset</option>
                <option value="warehouse">Warehouse</option>
              </select>
            </div>
          </div>

          <div className="py-1">
            <label>Background Environment</label>
            <div className="inputSidebar border-0 py-1 overflow-hidden row w-100 h-auto text-center">
              {hdriOptions.map((hdri) => (
                <div
                  className="pointer col-4 p-1 m-0 "
                  key={hdri.url}
                  onClick={() => handleHDRISelection(hdri.url)}
                  role="button"
                  tabIndex="0"
                  aria-label={`Select HDRI: ${hdri.name}`}
                >
                  <div>
                    <img
                      src={hdri.thumbnail}
                      alt={hdri.name}
                      style={{
                        height: "50px",
                        width: "-webkit-fill-available",
                        objectFit: "cover",
                        borderRadius: "2px",
                      }}
                    />
                    <div style={{ fontSize: "0.8rem" }}>{hdri.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex py-1">
            <div className="d-flex align-items-center col-6 p-0 m-0 gap-3">
              <span className="">Auto Rotate</span>
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => setAutoRotate(e.target.checked)}
              />
            </div>

            <div className="d-flex align-items-center col-6 p-0 m-0 gap-3">
              <span className="">Grid</span>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
            </div>
          </div>

          {autoRotate && (
            <div className=" ps-2">
              <label className="d-block">
                Rotate Speed: {autoRotateSpeed.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={autoRotateSpeed}
                onChange={(e) => setAutoRotateSpeed(parseFloat(e.target.value))}
                className=" win10-thumb "
              />
            </div>
          )}

          {/* <div className="mb-2">
              <ScreenshotControls/>
          </div> */}
        </div>
      )}

      <div
        className={`gap-2 d-flex align-items-center  p-1 rounded-2 pointer ${
          isDetailsOpen === true ? "SidebarElem1" : "SidebarElem"
        }`}
        onClick={handleDetailsClick}
      >
        <i className="ri-info-card-fill ViewerIcon"></i>
        <span>Details</span>
      </div>
      {isDetailsOpen && (
        <div
          className="p-1 overflow-y-scroll overflow-x-hidden sidebarScroller "
          style={{ height: "calc(100vh -100px)", maxHeight: "455px" }}
        >
          <ul className="list-unstyled">
            <li>
              <strong>File Name:</strong> {modelDetails.fileName || "N/A"}
            </li>
            <li>
              <strong>File Size:</strong> {modelDetails.fileSize || "N/A"}
            </li>
            <li>
              <strong>Vertices:</strong> {modelDetails.vertices}
            </li>
            <li>
              <strong>Triangles:</strong> {modelDetails.triangles}
            </li>
            <li>
              <div className="row">
                <div className="col-6">
                  <strong>Size:</strong>
                </div>
                <div className="col-6">X: {modelDetails.sizeX}m,</div>
                <div className="col-6">Y: {modelDetails.sizeY}m,</div>
                <div className="col-6">Z: {modelDetails.sizeZ}m</div>
              </div>
            </li>

            <li>
              <strong>Volume:</strong> {modelDetails.volume}m³
            </li>
            <li>
              <strong>Surface Area:</strong> {modelDetails.surfaceArea}m²
            </li>
            <li>
              <strong>Materials:</strong>
              <br />
              {modelDetails.materials.length > 0 ? (
                <div className="row m-1">
                  {modelDetails.materials.map((material, index) => (
                    <div key={index} className="col-6  p-0 m-0 border">
                      <div className="">
                        {material?.trim() ? material : "No Name"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                "None"
              )}
            </li>

            <li>
              <strong>Generator:</strong> {modelDetails.generator}
            </li>
            <li>
              <strong>Version:</strong> {modelDetails.version}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
