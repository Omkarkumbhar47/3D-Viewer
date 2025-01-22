import React from "react";

export default function ControlsBar({
  onFlip,
  onFlip1,
  onRotate,
  onDownload,
  onScreenshot,
}) {
  return (
    <div className="controls-bar z-2 d-flex justify-content-between  text-white top-0 position-absolute ">
      <button className="btn btn-primary p-1 m-1 mt-1 mt-1" onClick={onFlip}>
        Flip Model Y{/* <i className="ri-arrow-up-down-line iconsCan"></i> */}
      </button>
      <button className="btn btn-primary p-1 m-1 mt-1" onClick={onFlip1}>
        Flip Model X
        {/* <i className="ri-arrow-left-right-line iconsCan"></i> */}
      </button>
      <button
        className="btn btn-secondary p-1 m-1 mt-1"
        onClick={() => onRotate("x")}
      >
        Rotate X
      </button>
      <button
        className="btn btn-secondary p-1 m-1 mt-1"
        onClick={() => onRotate("y")}
      >
        Rotate Y
      </button>
      <button
        className="btn btn-secondary p-1 m-1 mt-1"
        onClick={() => onRotate("z")}
      >
        Rotate Z
      </button>
      <button className="btn btn-success p-1 m-1 mt-1" onClick={onDownload}>
        Download Model
      </button>
      {/* <button className="btn btn-warning p-1 m-1 mt-1" onClick={onScreenshot}>
        Take Screenshot
      </button> */}
    </div>
  );
}
