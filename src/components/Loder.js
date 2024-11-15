import React from "react";
import { Html, useProgress } from "@react-three/drei";

const Loder = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    active && (
      <Html>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            position: "absolute",
          }}
        >
          <h1>Loading Model...</h1>
          <p>
            Loaded: {loaded} / {total}
          </p>
          <p>Current Item: {item}</p>
          <p>Progress: {progress.toFixed(2)}%</p>
        </div>
       </Html>
    )
  );
};

export default Loder;
