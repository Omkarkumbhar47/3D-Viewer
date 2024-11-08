import React, {
  Suspense,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
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
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

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
  const [isDragActive, setIsDragActive] = useState(false);

  // Light settings
  const [ambientIntensity, setAmbientIntensity] = useState(3.0);
  const [directionalIntensity, setDirectionalIntensity] = useState(4.0);
  const [lightPosition, setLightPosition] = useState([10, 10, 10]);



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
      })
      .catch(() => {
        setError("Failed to load model. Please try a different file.");
      });
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

  return (
    <div
      className="model-viewer CustomBorder rounded p-2 d-flex align-items-center justify-content-center"
      onDrop={onDrop}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {model ? (
        <>
          <Canvas
            camera={{ position: [0, 1, 5], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={ambientIntensity} />
            <directionalLight
              position={lightPosition}
              intensity={directionalIntensity}
            />
            <Suspense fallback={null}>
              <Model model={model} />
            </Suspense>
            <OrbitControls />
          </Canvas>

          <div className="light-controls">
            <div>
              Ambient Light Intensity:
              <input
                type="range"
                min="2"
                max="5"
                step="0.1"
                value={ambientIntensity}
                onChange={(e) =>
                  setAmbientIntensity(parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              Directional Light Intensity:
              <input
                type="range"
                min="3"
                max="7"
                step="0.1"
                value={directionalIntensity}
                onChange={(e) =>
                  setDirectionalIntensity(parseFloat(e.target.value))
                }
              />
            </div>
            <label>
              Light Position X:
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={lightPosition[0]}
                onChange={(e) =>
                  setLightPosition([
                    parseFloat(e.target.value),
                    lightPosition[1],
                    lightPosition[2],
                  ])
                }
              />
            </label>
            <label>
              Light Position Y:
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={lightPosition[1]}
                onChange={(e) =>
                  setLightPosition([
                    lightPosition[0],
                    parseFloat(e.target.value),
                    lightPosition[2],
                  ])
                }
              />
            </label>
            <label>
              Light Position Z:
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={lightPosition[2]}
                onChange={(e) =>
                  setLightPosition([
                    lightPosition[0],
                    lightPosition[1],
                    parseFloat(e.target.value),
                  ])
                }
              />
            </label>
          </div>
        </>
      ) : (
        <div className="d-flex text-center">
          {isDragActive ? (
            <div className="fs-1">Release to view your file...</div>
          ) : (
            <div className="d-flex text-center">
              {isDragActive ? (
                <div className="fs-1">Release to view your file...</div>
              ) : (
                <label>
                  <div className="fs-1"> Drag & Drop Files Here</div>
                  <div className="fs-3"> Or </div>

                  <div className="d-flex w-100  justify-content-center align-items-center">
                    {!model && (
                      <div className="d-flex justify-content-center align-items-center w-75">
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
                    )}
                  </div>
                </label>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
