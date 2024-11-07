import React from "react";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div>
      <div className=" me-2 mt-1 flex-column d-none d-md-flex">
        <div className="px-2 py-1 mb-1 SidebarElem ThreeDElem">
          <i className="ri-box-3-fill ViewerIcon"></i>
          <span className="tooltip-text">Meshes</span>
        </div>
        <div className="px-2 py-1 mb-1 SidebarElem ThreeDElem">
          <i className="ri-box-3-fill ViewerIcon"></i>
          <span className="tooltip-text">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
