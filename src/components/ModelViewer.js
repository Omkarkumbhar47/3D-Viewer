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
  showWireframe,
}) {
  // const { camera } = useThree();
  const { camera, controls } = useThree();
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
  useEffect(() => {
    // Toggle wireframe
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.material) {
          child.material.wireframe = showWireframe;
        }
      });
    }
  }, [showWireframe]);

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
  autoRotate,
  autoRotateSpeed,
  showGrid,
}) {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [parts, setParts] = useState([]);
  const [isMeshesSectionOpen, setIsMeshesSectionOpen] = useState(false); // Track if "Meshes" section is open
  const [selectedPart, setSelectedPart] = useState(null); // Track selected part

  const modelRef = useRef();
  const gridHelperRef = useRef();


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

  // const handleModelAction = (action) => {
  //   if (!modelRef.current) return;

  //   const { current: model } = modelRef;
  //   const rotationStep = Math.PI / 4;

  //   switch (action) {
  //     case "flipX":
  //       model.scale.x *= -1;
  //       break;
  //     case "flipY":
  //       model.scale.y *= -1;
  //       break;
  //     case "rotateX":
  //       model.rotation.x += rotationStep;
  //       break;
  //     case "rotateY":
  //       model.rotation.y += rotationStep;
  //       break;
  //     case "fitToScreen":
  //       fitModelToScreen();
  //       break;
  //     default:
  //       console.warn("Unknown action:", action);
  //   }
  // };

  // const fitModelToScreen = () => {
  //   if (!modelRef.current || !camera || !controls) return;

  //   const box = new THREE.Box3().setFromObject(modelRef.current);
  //   const size = box.getSize(new THREE.Vector3());
  //   const center = box.getCenter(new THREE.Vector3());

  //   const maxDim = Math.max(size.x, size.y, size.z);
  //   const fov = camera.fov * (Math.PI / 180);
  //   const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
  //   const minZ = box.min.z;
  //   const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ;

  //   camera.position.set(center.x, center.y, cameraToFarEdge * 1.5);
  //   camera.lookAt(center);

  //   if (controls) controls.target.set(center.x, center.y, center.z);
  // };

  // Update selected part when part is clicked in Sidebar
  useEffect(() => {
    if (selectedSidebarPart) {
      setSelectedPart(selectedSidebarPart);
    }
  }, [selectedSidebarPart]);

  useEffect(() => {
    // Toggle grid helper
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  return (
    // <div className="">
    <div
      id="model-viewer-container"
      className="model-viewer CustomBorder rounded  d-flex align-items-center justify-content-center position-relative"
      style={{ width: "100%", height: "100%" }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragActive(false);
        const file = event.dataTransfer.files[0];
        if (file) loadModel(file);
      }}
    >
      {model ? (
        <div
          className="top-0 position-absolute p-1 w-100 canvasNavBar d-flex gap-3"
          style={{ height: "40px" }}
        >
          {/* <span onClick={() => handleModelAction("flipX")}>
            <i className="ri-arrow-left-right-line iconsCan"></i>
          </span>
          <span onClick={() => handleModelAction("flipY")}>
            <i className="ri-arrow-up-down-line iconsCan"></i>
          </span>
          <span onClick={() => handleModelAction("rotateX")}>
            <i className="ri-rotate-left-line iconsCan"></i>
          </span>
          <span onClick={() => handleModelAction("rotateY")}>
            <i className="ri-rotate-right-line iconsCan"></i>
          </span>
          <span onClick={() => handleModelAction("fitToScreen")}>
            <i className="ri-expand-line iconsCan"></i>
          </span> */}
        </div>
      ) : null}
      {model ? (
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          className=""
          style={{
            width: "100%",
            top: "20px",
            height: "calc(100% - 40px)",
            background: backgroundColor,
          }}
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
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
          {environment && <Environment preset={environment} />}
          {selectedHDRI && <Environment files={selectedHDRI} />}
          {/* <axesHelper args={[5]} /> */}
          {/* <Stats /> */}
          {/* Grid Helper */}
          {showGrid && (
            <primitive
              object={new THREE.GridHelper(10, 10)}
              ref={gridHelperRef}
              position={[0, -0.5, 0]}
            />
          )}
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
    // </div>
  );
}
