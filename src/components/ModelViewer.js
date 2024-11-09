import React, { Suspense, useState, useCallback, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import Sidebar from "./Sidebar";

function Model({ model, onClickPart }) {
  const { camera } = useThree();
  const modelRef = useRef();

  useEffect(() => { 
    if (model && modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      camera.position.set(center.x, center.y, size * 1.5);
      camera.lookAt(center);
    }
  }, [model, camera]);

  return model ? (
    <Center>
      <primitive
        object={model}
        ref={modelRef}
        onClick={(event) => onClickPart(event.object)} // Handle part click
      />
    </Center>
  ) : null;
}

export default function ModelViewer({ onModelLoad, onPartClick, toggleVisibility }) {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMeshesSectionOpen, setIsMeshesSectionOpen] = useState(false); // Track if "Meshes" section is open

  const loadModel = (file) => {
    setError(null);
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const url = URL.createObjectURL(file);

    let loader;
    switch (fileExtension) {
      case "glb":
      case "gltf":
        loader = new GLTFLoader();
        break;
      case "obj":
        loader = new OBJLoader();
        break;
      case "fbx":
        loader = new FBXLoader();
        break;
      default:
        setError("Unsupported file format. Please use .glb, .gltf, .obj, or .fbx.");
        return;
    }

    loader
      .loadAsync(url)
      .then((loadedModel) => {
        setModel(loadedModel.scene || loadedModel);
        URL.revokeObjectURL(url);

        setIsSidebarOpen(true);
        extractParts(loadedModel.scene || loadedModel); // Extract parts for the sidebar
      })
      .catch(() => {
        setError("Failed to load model. Please try a different file.");
      });
  };

  const extractParts = (model) => {
    const partsArray = [];
    model.traverse((child) => {
      if (child.isMesh) {
        partsArray.push({ name: child.name || "Unnamed Part", mesh: child });
      }
    });
    setParts(partsArray);
    onModelLoad(partsArray); // Pass parts to layout
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) loadModel(file);
  }, []);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) loadModel(file);
  };
// 

// 
// 
// 
  const handlePartToggle = (mesh) => {
    mesh.visible = !mesh.visible;
    setParts([...parts]); // Update state to reflect visibility changes
  };

  const handlePartClick = (part) => {
    if (!isMeshesSectionOpen) return; // Only allow selection if "Meshes" section is open

    // Reset previously selected part material
    if (selectedPart && selectedPart.mesh) {
      selectedPart.mesh.material.color.set("white");
      selectedPart.mesh.material.opacity = 1.0;
      selectedPart.mesh.material.transparent = false;
    }

    // Highlight new selected part
    setSelectedPart(part);
    part.mesh.material.color.set("lightblue");
    part.mesh.material.opacity = 0.6;
    part.mesh.material.transparent = true;
  };

  const handleSidebarToggle = (section) => {
    if (section === "Meshes") {
      setIsMeshesSectionOpen(!isMeshesSectionOpen);
    }
  };

  return (
    <div
      className="model-viewer CustomBorder rounded p-2 d-flex align-items-center justify-content-center"
      onDrop={onDrop}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      
      {model ? (
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[0, 20, 0]} intensity={1.5} />
          <directionalLight position={[0, -20, 0]} intensity={1.5} />
          <directionalLight position={[-20, 0, 0]} intensity={1.5} />
          <directionalLight position={[20, 0, 0]} intensity={1.5} />
          <directionalLight position={[0, 0, 20]} intensity={1.5} />
          <directionalLight position={[0, 0, -20]} intensity={1.5} />
          <Suspense fallback={null}>
            <Model model={model} onClickPart={handlePartClick} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      ) : (
        <div className="d-flex text-center">
          {isDragActive ? (
            <div className="fs-1">Release to view your file...</div>
          ) : (
            <label>
              <div className="fs-1"> Drag & Drop Files Here</div>
              <div className="fs-3"> Or </div>
              <div className="d-flex w-100 justify-content-center align-items-center">
                <input
                  type="file"
                  id="file-upload"
                  accept=".glb,.gltf,.obj,.fbx"
                  onChange={onFileChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="file-upload"
                  className="ThreeDButton ThreeDElem fs-2"
                >
                  Browse Model
                </label>
              </div>
            </label>
          )}
        </div>
      )}
    </div>
  );
}
