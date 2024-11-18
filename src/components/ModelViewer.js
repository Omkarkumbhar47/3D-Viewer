import React, {
  Suspense,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  Environment,
  Stats,
  Html,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

function Model({
  model,
  selectedPart,
  setSelectedPart,
  setSelectedSidebarPart,
}) {
  const { camera } = useThree();
  const modelRef = useRef();
  const [originalMaterials, setOriginalMaterials] = useState([]);

  // Store original material properties when the model is loaded
  useEffect(() => {
    if (model) {
      const materials = [];
      model.traverse((child) => {
        if (child.isMesh) {
          // Store the original material properties
          materials.push({
            mesh: child,
            originalColor: child.material.color.getHex(),
            originalOpacity: child.material.opacity,
          });
        }
      });
      setOriginalMaterials(materials);
    }
  }, [model]);

  // Update the camera position based on the model's size and center
  useEffect(() => {
    if (model && modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
      camera.position.set(center.x, center.y, size * 1.5);
      camera.lookAt(center);
    }
  }, [model, camera]);
  useEffect(() => {
    // Add double-click event listener to clear the selected part
    const handleDoubleClick = () => {
      setSelectedPart(null); // Deselect all parts
      setSelectedSidebarPart(null); // Clear the sidebar selection
    };

    // Add the event listener to the canvas or viewer container
    const viewerContainer = document.getElementById("model-viewer-container");
    viewerContainer.addEventListener("dblclick", handleDoubleClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      viewerContainer.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [setSelectedPart, setSelectedSidebarPart]);

  // Apply highlighting or restore the original material properties
  useEffect(() => {
    if (model && originalMaterials.length > 0) {
      model.traverse((child) => {
        if (child.isMesh) {
          const materialData = originalMaterials.find(
            (data) => data.mesh === child
          );

          if (materialData) {
            if (selectedPart && selectedPart === child) {
              // Highlight the selected part
              child.material.color.setHex(0x00aaff); // Highlight color
              child.material.opacity = 0.6;
              // child.material.transparent = true;
            } else {
              // Restore original material properties
              child.material.color.setHex(materialData.originalColor);
              child.material.opacity = 1;
              // child.material.transparent = false;
            }
          }
        }
      });
    }
  }, [model, selectedPart, originalMaterials]);

  return model ? (
    <group
      ref={modelRef}
      onClick={(event) => {
        event.stopPropagation();
        const clickedPart = event.object;
        setSelectedPart(clickedPart); // Highlight the clicked part
        setSelectedSidebarPart(clickedPart); // Sync with Sidebar
      }}
    >
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  ) : null;
}

export default function ModelViewer({
  onModelLoad,
  backgroundColor,
  environment,
  selectedHDRI,
  selectedSidebarPart, // Add this prop for selected part from the sidebar
  setSelectedSidebarPart, // Function to set the selected part in the sidebar
}) {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [parts, setParts] = useState([]);
  const [isMeshesSectionOpen, setIsMeshesSectionOpen] = useState(false); // Track if "Meshes" section is open
  const [selectedPart, setSelectedPart] = useState(null); // Track selected part

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
        setError(
          "Unsupported file format. Please use .glb, .gltf, .obj, or .fbx."
        );
        return;
    }

    loader
      .loadAsync(url)
      .then((loadedModel) => {
        setModel(loadedModel.scene || loadedModel);
        URL.revokeObjectURL(url);
        extractParts(loadedModel.scene || loadedModel); // Extract parts and sen to the sidebar
      })
      .catch(() => {
        setError("Failed to load model. Please try a different file.");
      });
  };
  const Loder = () => {
    return (
      <Html center>
        <div style={{ color: "#fff" }}>Loading...</div>
      </Html>
    );
  };

  const extractParts = (model) => {
    const partsArray = [];

    model.traverse((child) => {
      if (child.isMesh) {
        partsArray.push({ name: child.name || "Unnamed Part", mesh: child });
      }
    });
    setParts(partsArray);
    onModelLoad(partsArray); // Pass parts to layout then sidebar
  };
  const handleClickPart = (part) => {
    console.log("Clicked part:", part); // Debugging line to confirm clicks
    setSelectedPart(part); // Update selected part
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

  // Update selected part when part is clicked in Sidebar
  useEffect(() => {
    if (selectedSidebarPart) {
      setSelectedPart(selectedSidebarPart);
    }
  }, [selectedSidebarPart]);

  return (
    <div
      id="model-viewer-container"
      className="model-viewer CustomBorder rounded p-2 d-flex align-items-center justify-content-center"
      // onDrop={onDrop}
      style={{ width: "100%", height: "100%", position: "relative" }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragActive(false);
        const file = event.dataTransfer.files[0];
        if (file) loadModel(file);
      }}
    >
      {model ? (
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          style={{ width: "100%", height: "100%", background: backgroundColor }}
        >
          {backgroundColor && (
            <color attach="background" args={[backgroundColor]} />
          )}

          {selectedHDRI && (
            <Environment
              files={selectedHDRI}
              background
              // backgroundBlurriness={0.5}
            />
          )}
          <ambientLight intensity={1.0} />
          <directionalLight position={[0, 20, 0]} intensity={1.0} />
          <directionalLight position={[0, -20, 0]} intensity={1.0} />
          <directionalLight position={[-20, 0, 0]} intensity={1.0} />
          <directionalLight position={[20, 0, 0]} intensity={1.0} />
          <directionalLight position={[0, 0, 20]} intensity={1.0} />
          <directionalLight position={[0, 0, -20]} intensity={1.0} />
          <Suspense fallback={<Loder />}>
            <Model
              model={model}
              onClickPart={handleClickPart}
              selectedPart={selectedPart} // Pass selected part
              setSelectedPart={setSelectedPart} // Pass function to update selected part
              setSelectedSidebarPart={setSelectedSidebarPart} // Sync selected part to sidebar
            />
          </Suspense>
          <OrbitControls />
          {environment && <Environment preset={environment} />}
          {selectedHDRI && <Environment files={selectedHDRI} />}
          {/* <axesHelper args={[5]} /> */}
          {/* <Stats /> */}
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
