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

  const currentDate = currentTime.toLocaleDateString();
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
    <div className="d-flex justify-content-between align-items-center ">  
      <Link to="/" className="fs-3 ">
        <div className="ThreeDElem">3D Viewer</div>
      </Link>

      <div className="date-time d-none d-md-block">
        <span>{currentDate}</span> | <span>{currentTimeString}</span>
      </div>

      {/* <div className="navigation">
        <Link to="/" className="btn btn-outline-light mx-2">
          Home
        </Link>
        <Link to="/settings" className="btn btn-outline-light mx-2">
          Settings
        </Link>
        <Link to="/models" className="btn btn-outline-light mx-2">
          Manage Models
        </Link>
      </div> */}
      <div className="controls d-none d-md-block">
        {fullScreenOn ? (
          <button className=" ThreeDButton ThreeDElem" onClick={toggleFullScreen}>
            <i className="ri-fullscreen-exit-line ViewerIcon"> </i>
            <div className="ms-2">Minimize</div>
          </button>
        ) : (
          <button className=" ThreeDButton ThreeDElem" onClick={toggleFullScreen}>
            <i className="ri-fullscreen-line ViewerIcon"> </i>
            <div className="ms-2">Fullscreen</div>
          </button>
         
        )}
      </div>
    </div>
  );
}

export default Header;
