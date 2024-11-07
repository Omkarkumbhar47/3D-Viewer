import React from "react";

const Footer = () => {
  return (
    <div className="d-flex justify-content-around gap-2 gap-md-5">
      <div className="ThreeDElem">
        <a
          href="https://github.com/Omkarkumbhar47/3D-Viewer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset"
        >
          <i className="ri-github-fill"></i> Github
        </a>
      </div>
      <div className="ThreeDElem">
        <a
          href="https://threejs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset"
        >
          <i className="ri-triangle-line"></i> Three JS
        </a>
      </div>
      <div className="ThreeDElem">
        <a
          href="https://docs.pmnd.rs/react-three-fiber/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset"
        >
          <i className="ri-reactjs-line"></i> React Three Fiber
        </a>
      </div>
      <div className="ThreeDElem">
        <a
          href="https://drei.pmnd.rs/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-reset"
        >
          <i className="ri-medal-fill"></i> Drei
        </a>
      </div>
    </div>
  );
};

export default Footer;
