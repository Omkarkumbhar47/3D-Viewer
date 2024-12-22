import React from "react";

const FileUploader = ({ onFileLoad }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) onFileLoad(file);
  };

  return (
    <div className="">
      <label>
        <div className="fs-1"> Drag & Drop Files Here</div>
        <div className="fs-3"> Or </div>
        <div className="d-flex  justify-content-center align-items-center">
          <input
            type="file"
            id="file-upload"
            accept=".glb,.gltf,.obj,.fbx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload" className="ThreeDButton ThreeDElem fs-2">
            Browse Model
          </label>
        </div>
      </label>
    </div>
  );
};

export default FileUploader;
