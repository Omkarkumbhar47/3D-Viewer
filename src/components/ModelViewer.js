import React, {
  Suspense,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import FileUploader from "./FileUploader";
import ControlsBar from "./ControlsBar";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import calculateVolume from "../utils/calculateVolume.js";
import calculateSurfaceArea from "../utils/calculateSurfaceArea.js";
import { Box3, Vector3 } from "three";

function CameraAdjuster({ model }) {
  const { camera } = useThree();

  useEffect(() => {
    if (model) {
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
      camera.position.set(center.x, center.y, size * 1.5);
      camera.lookAt(center);
    }
  }, [model, camera]);

  return null; // This component does not render anything
}

export default function ModelViewer({
  onModelLoad,
  backgroundColor,
  environment,
  selectedHDRI,
  selectedSidebarPart,
  setSelectedSidebarPart,
  autoRotate,
  autoRotateSpeed,
  showGrid,
  setModelDetails, // Add this prop to update model details
}) {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [originalMaterials, setOriginalMaterials] = useState([]);
  const gridHelperRef = useRef();
  const modelRef = useRef();

  // Demo models
  const demoModels = [
    { name: "Merc car.glb", demoFile: "/Merc car.glb" },
    { name: "Iphone 13.glb", demoFile: "/Iphone 13.glb" },
    { name: "Cabin.glb", demoFile: "/Cabin.glb" },
    { name: "Poly Tree.glb", demoFile: "/Poly Tree Scence.glb" },
    { name: "House2.glb", demoFile: "/house2.glb" },
    { name: "Zuk 3d Model.glb", demoFile: "/Zuk 3d Model.glb" },
  ];

  const loadModel = (file) => {
    setError(null); // Clear previous errors

    let fileExtension;
    let url;

    if (file instanceof File) {
      // For uploaded files
      fileExtension = file.name.split(".").pop().toLowerCase(); // Extract file extension from File
      url = URL.createObjectURL(file); // Create a URL for the file

      // Add logic to load the model using the `url`
    } else if (typeof file === "string") {
      // For demo models
      fileExtension = file.split(".").pop().toLowerCase(); // Extract file extension from string path
      url = file; // Use the string as the URL
      // Add logic to load the model directly using `url`
    } else {
      console.error("Invalid file type:", file);
      setError("Invalid file type.");
      return;
    }

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
        const scene = loadedModel.scene || loadedModel;
        setModel(scene);
        URL.revokeObjectURL(url);
        extractParts(scene);
        storeOriginalMaterials(scene);
        calculateModelDetails(scene, loadedModel, file); // Add this to calculate model details
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
    onModelLoad(partsArray); // Pass parts to parent component
  };
  const centerModel = (model) => {
    const box = new Box3().setFromObject(model);
    const center = new Vector3();
    box.getCenter(center);

    model.position.sub(center); // Reposition the model to center it
  };

  const flipModel = () => {
    if (model) {
      model.scale.y *= -1;
      centerModel(model); // Center the model after rotation
    }
  };

  const flipModel1 = () => {
    if (model) {
      model.scale.x *= -1;
      centerModel(model);
    }
  };

  const rotateModel = (axis) => {
    if (model) {
      const rotationAmount = Math.PI / 2; // 90 degrees
      model.rotation[axis] += rotationAmount;
      centerModel(model);
    }
  };

  const downloadModel = () => {
    if (model) {
      const exporter = new GLTFExporter();
      exporter.parse(
        model,
        (gltf) => {
          const blob = new Blob([JSON.stringify(gltf)], {
            type: "application/json",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "model.gltf";
          link.click();
        },
        { binary: false }
      );
    }
  };

  const takeScreenshot = () => {
    const screenSnap = document.querySelector("model-viewer-container");
    screenSnap.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "screenshot.png";
      link.click();
    });
  };

  const storeOriginalMaterials = (model) => {
    const materials = [];
    model.traverse((child) => {
      if (child.isMesh) {
        materials.push({
          mesh: child,
          originalColor: child.material.color.getHex(),
          originalOpacity: child.material.opacity,
        });
      }
    });
    setOriginalMaterials(materials);
  };

  const handleHighlighting = useCallback(() => {
    if (model && originalMaterials.length > 0) {
      model.traverse((child) => {
        if (child.isMesh) {
          const materialData = originalMaterials.find(
            (data) => data.mesh === child
          );
          if (materialData) {
            if (selectedPart && selectedPart === child) {
              child.material.color.setHex(0x00aaff); // Highlight color
              child.material.opacity = 0.6;
            } else {
              child.material.color.setHex(materialData.originalColor);
              child.material.opacity = 1;
            }
          }
        }
      });
    }
  }, [model, originalMaterials, selectedPart]);

  useEffect(() => {
    handleHighlighting();
    if (selectedSidebarPart) {
      setSelectedPart(selectedSidebarPart);
    }
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }

    const handleDoubleClick = () => {
      setSelectedPart(null);
      setSelectedSidebarPart(null);
    };

    const viewerContainer = document.getElementById("model-viewer-container");

    if (viewerContainer) {
      viewerContainer.addEventListener("dblclick", handleDoubleClick);
    }

    return () => {
      if (viewerContainer) {
        viewerContainer.removeEventListener("dblclick", handleDoubleClick);
      }
    };
  }, [
    selectedSidebarPart,
    showGrid,
    setSelectedPart,
    setSelectedSidebarPart,
    selectedPart,
    handleHighlighting,
  ]);

  const calculateModelDetails = (scene, loadedModel, file) => {
    let vertices = 0;
    let triangles = 0;
    let volume = 0;
    let surfaceArea = 0;
    const materials = new Set();
    const boundingBox = new THREE.Box3().setFromObject(scene);
    const size = boundingBox.getSize(new THREE.Vector3());
    var assetGenerator = "Unknown";
    var assetVersion = "Unknown";
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const geometry = child.geometry;

        // Count vertices and triangles
        vertices += geometry.attributes.position.count;
        if (geometry.index !== null) {
          triangles += geometry.index.count / 3;
        } else {
          triangles += geometry.attributes.position.count / 3;
        }

        // Collect materials
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => materials.add(mat.name));
          } else {
            materials.add(child.material.name);
          }
        }

        // Calculate volume and surface area
        volume += calculateVolume(geometry);
        surfaceArea += calculateSurfaceArea(geometry);

        // Extract asset properties if available

        if (loadedModel.parser && loadedModel.parser.json) {
          const asset = loadedModel.parser.json.asset || {};
          assetGenerator = asset.generator || "Unknown";
          assetVersion = asset.version || "Unknown";
        }
      }
    });

    // Update model details via parent state
    setModelDetails({
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB", // Convert bytes to MB
      vertices,
      triangles,
      sizeX: size.x.toFixed(2),
      sizeY: size.y.toFixed(2),
      sizeZ: size.z.toFixed(2),
      volume: volume.toFixed(2),
      surfaceArea: surfaceArea.toFixed(2),
      materials: Array.from(materials),
      generator: assetGenerator,
      version: assetVersion,
    });
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) loadModel(file);
  }, []);

  return (
    <div
      id="model-viewer-container"
      className="model-viewer CustomBorder rounded d-flex align-items-center justify-content-center position-relative "
      style={{ width: "100%", height: "100%" }}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={() => setIsDragActive(true)}
      onDragLeave={() => setIsDragActive(false)}
    >
      {model ? (
        <>
          <ControlsBar
            onFlip1={flipModel1}
            onFlip={flipModel}
            onRotate={rotateModel}
            onDownload={downloadModel}
            onScreenshot={takeScreenshot}
          />
          <Canvas
            camera={{ position: [0, 1, 5], fov: 50 }}
            style={{
              width: "100%",
              height: "calc(100% - 40px)",
              top: "20px",
              background: backgroundColor,
            }}
          >
            {selectedHDRI && <Environment files={selectedHDRI} background />}
            <ambientLight intensity={1.0} />
            <directionalLight position={[0, 20, 0]} intensity={1.0} />
            <Suspense fallback={<div>Loading...</div>}>
              {backgroundColor && (
                <color attach="background" args={[backgroundColor]} />
              )}

              <group
                onClick={(event) => {
                  event.stopPropagation();
                  const clickedPart = event.object;
                  setSelectedPart(clickedPart);
                  setSelectedSidebarPart(clickedPart);
                }}
              >
                <Center>
                  <primitive object={model} />
                </Center>
              </group>
              <CameraAdjuster model={model} />
            </Suspense>
            <OrbitControls
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
            />
            {environment && <Environment preset={environment} />}
            {showGrid && (
              <primitive
                object={new THREE.GridHelper(10, 10)}
                ref={gridHelperRef}
                position={[0, -0.5, 0]}
              />
            )}
          </Canvas>
        </>
      ) : (
        <>
          <div className="text-center ">
            {isDragActive ? (
              <div className="fs-1">Release to view your file...</div>
            ) : (
              <div className="container text-center my-4">
                {/* File Uploader */}
                <div className="w-100 mx-auto">
                  <FileUploader onFileLoad={loadModel} />
                </div>

                {/* Demo Models Section */}
                <div className="row justify-content-center pt-4">
                  {demoModels.map((dem) => (
                    <div
                      key={dem.name}
                      className="col-6 col-sm-6 col-md-3 col-lg-3 d-flex justify-content-center mb-3"
                    >
                      <button
                        className="btn btn-outline-info w-100 fw-bold"
                        onClick={() => loadModel(dem.demoFile)}
                      >
                        {dem.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
