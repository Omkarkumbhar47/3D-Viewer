import React from "react";
import { useProgress } from "@react-three/drei";
import "./Loader.css";

const Loader = () => {
  const { active, progress } = useProgress();

  return (
    active && (
      <div className="loader-container">
        <div className="loader">
          <p>Loading... {Math.floor(progress)}%</p>
        </div>
      </div>
    )
  );
};

export default Loader;
