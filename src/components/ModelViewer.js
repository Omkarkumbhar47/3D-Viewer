import React, { Suspense, useState, useCallback, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

function Model({ model }) {
  const { camera } = useThree();
  const modelRef = useRef();

  useEffect(() => {
    if (model && modelRef.current) {
      // Compute the model's bounding box
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      // Adjust the camera position and focus on the model's center
      camera.position.set(center.x, center.y, size * 1.5);
      camera.lookAt(center);
    }
  }, [model, camera]);

  return model ? (
    <Center>
      <primitive object={model} ref={modelRef} />
    </Center>
  ) : null;
}

export default function ModelViewer() {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  const loadModel = (file) => {
    setError(null);
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const url = URL.createObjectURL(file);

    let loader;

    // Select the appropriate loader based on the file extension
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
        setModel(loadedModel.scene || loadedModel); // Handle different model formats
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        setError("Failed to load model. Please try a different file.");
      });
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      loadModel(file);
    } else {
      setError("Please drop a valid 3D file.");
    }
  }, []);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      loadModel(file);
    } else {
      setError("Please select a valid 3D file.");
    }
  };

  const onDragOver = (event) => event.preventDefault();

  return (
    <div
      className="model-viewer CustomBorder rounded p-2 d-flex align-items-center justify-content-center"
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {/* File Input */}
      <input
        type="file"
        accept=".glb,.gltf,.obj,.fbx"
        onChange={onFileChange}
        style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}
      />

      {/* 3D Canvas or Message */}
      {model ? (
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={2.0} /> {/* Increased ambient light */}
          <directionalLight position={[10, 10, 10]} intensity={1.2} /> {/* Adjusted directional light */}
          <Suspense fallback={null}>
            <Model model={model} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      ) : (
        <div className="text-center">
          {error || "Drag and drop a .glb, .gltf, .obj, or .fbx file here or use the file input"}
        </div>
      )}
    </div>
  );
}
