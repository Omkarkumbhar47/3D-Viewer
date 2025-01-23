import React from "react";

const Footer = () => {
  return (
    <div className="d-flex justify-content-center gap-3 gap-md-4 flex-wrap py-3">
      <div className="ThreeDElem">
        <a
          href="https://github.com/Omkarkumbhar47/3D-Viewer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset d-flex align-items-center gap-2"
        >
          <i className="ri-github-fill fs-4 text-primary"></i>
          <span className="d-none d-sm-inline">GitHub</span>
        </a>
      </div>
      <div className="ThreeDElem">
        <a
          href="https://threejs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset d-flex align-items-center gap-2"
        >
          <i className="ri-triangle-line fs-4 text-warning"></i>
          <span className="d-none d-sm-inline">Three JS</span>
        </a>
      </div>
      <div className="ThreeDElem">
        <a
          href="https://docs.pmnd.rs/react-three-fiber/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset d-flex align-items-center gap-2"
        >
          <i className="ri-reactjs-line fs-4 text-info"></i>
          <span className="d-none d-sm-inline">React Three Fiber</span>
        </a>
      </div>
      <div className="ThreeDElem">
        <a
          href="https://drei.pmnd.rs/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset d-flex align-items-center gap-2"
        >
          <i className="ri-medal-fill fs-4 text-success"></i>
          <span className="d-none d-sm-inline">Drei</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
