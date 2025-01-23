import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [fullScreenOn, setFullScreenOn] = useState(false);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);


  const date = new Date();
  const longDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // timeZoneName: "short",
    // timeZoneOffset: "UTC"
  }).replace("at" ,"|");
  const currentTimeString = currentTime.toLocaleTimeString();

  const toggleFullScreen = () => {
    setFullScreenOn(!fullScreenOn);
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // Enter fullscreen mode
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center w-100">
    {/* Logo / Title */}
    <Link to="/" className="fs-3">
      <div className="ThreeDElem">3D Viewer</div>
    </Link>

    {/* Date-Time Display */}
    <div className="date-time ">
      <span>{longDate}</span>
    </div>

    {/* Navigation Links */}
    {/* <div className="navigation d-none d-md-flex">
      <Link
        to="/"
        className="btn btn-outline-light mx-2"
        aria-label="Go to Home"
      >
        Home
      </Link>
      <Link
        to="/settings"
        className="btn btn-outline-light mx-2"
        aria-label="Go to Settings"
      >
        Settings
      </Link>
      <Link
        to="/models"
        className="btn btn-outline-light mx-2"
        aria-label="Manage Models"
      >
        Manage Models
      </Link>
    </div> */}

    {/* Fullscreen Controls */}
    <div className="controls d-none d-sm-block">
      {fullScreenOn ? (
        <button
          className="ThreeDButton ThreeDElem"
          onClick={toggleFullScreen}
          aria-label="Exit Fullscreen"
        >
          <i className="ri-fullscreen-exit-line ViewerIcon"></i>
          <div className="ms-2">Minimize</div>
        </button>
      ) : (
        <button
          className="ThreeDButton ThreeDElem"
          onClick={toggleFullScreen}
          aria-label="Enter Fullscreen"
        >
          <i className="ri-fullscreen-line ViewerIcon"></i>
          <div className="ms-2">Fullscreen</div>
        </button>
      )}
    </div>
  </div>
  );
}

export default Header;
