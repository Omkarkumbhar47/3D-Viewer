import React, { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ScreenshotControls = () => {
  const { gl, scene, camera } = useThree();
  const [size, setSize] = useState('Medium');
  const [customWidth, setCustomWidth] = useState(1000);
  const [customHeight, setCustomHeight] = useState(1000);
  const [transparent, setTransparent] = useState(true);

  const takeScreenshot = () => {
    const dimensions = {
      Small: [1280, 720],
      Medium: [1920, 1080],
      Large: [2560, 1440],
    };

    const [width, height] = size === 'Custom'
      ? [customWidth, customHeight]
      : dimensions[size];

    const originalSize = gl.getSize(new THREE.Vector2());
    const originalPixelRatio = gl.getPixelRatio();

    gl.setClearColor(transparent ? 0x000000 : 0xffffff, transparent ? 0 : 1);
    gl.setSize(width, height);
    gl.setPixelRatio(1);
    gl.render(scene, camera);

    const dataUrl = gl.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = dataUrl;
    link.click();

    gl.setSize(originalSize.x, originalSize.y);
    gl.setPixelRatio(originalPixelRatio);
  };

  return (
    <div>
      <h3>Screenshot Settings</h3>
      <div>
        <label>
          <input
            type="radio"
            value="Small"
            checked={size === 'Small'}
            onChange={() => setSize('Small')}
          />
          Small (1280x720)
        </label>
        <label>
          <input
            type="radio"
            value="Medium"
            checked={size === 'Medium'}
            onChange={() => setSize('Medium')}
          />
          Medium (1920x1080)
        </label>
        <label>
          <input
            type="radio"
            value="Large"
            checked={size === 'Large'}
            onChange={() => setSize('Large')}
          />
          Large (2560x1440)
        </label>
        <label>
          <input
            type="radio"
            value="Custom"
            checked={size === 'Custom'}
            onChange={() => setSize('Custom')}
          />
          Custom
        </label>
        {size === 'Custom' && (
          <>
            <input
              type="number"
              placeholder="Width"
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Height"
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value))}
            />
          </>
        )}
      </div>
      <label>
        <input
          type="checkbox"
          checked={transparent}
          onChange={(e) => setTransparent(e.target.checked)}
        />
        Transparent Background
      </label>
      <button onClick={takeScreenshot}>Take Screenshot</button>
    </div>
  );
};

const App = () => {
  return (
    <Canvas>
      {/* Add your 3D model viewer components here */}
      <ScreenshotControls />
    </Canvas>
  );
};

export default App;
