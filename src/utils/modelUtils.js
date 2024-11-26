import * as THREE from 'three';

export const calculateModelDetails = (model) => {
  let vertices = 0;
  let triangles = 0;
  let materials = new Set();
  let files = []; // Adjust based on your file-handling logic

  const boundingBox = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  let surfaceArea = 0;
  let volume = 0;

  model.traverse((child) => {
    if (child.isMesh) {
      const geometry = child.geometry;

      if (geometry.isBufferGeometry) {
        // Vertices
        vertices += geometry.attributes.position.count;

        // Triangles
        triangles += geometry.index
          ? geometry.index.count / 3
          : geometry.attributes.position.count / 3;

        // Materials
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) =>
              materials.add(mat.name || 'Unnamed Material')
            );
          } else {
            materials.add(child.material.name || 'Unnamed Material');
          }
        }

        // Surface Area and Volume Calculation
        const position = geometry.attributes.position.array;
        for (let i = 0; i < position.length; i += 9) {
          const v0 = new THREE.Vector3(position[i], position[i + 1], position[i + 2]);
          const v1 = new THREE.Vector3(position[i + 3], position[i + 4], position[i + 5]);
          const v2 = new THREE.Vector3(position[i + 6], position[i + 7], position[i + 8]);

          surfaceArea += THREE.Triangle.getArea(v0, v1, v2);
          volume += v0.dot(v1.cross(v2)) / 6; // Signed volume of a tetrahedron
        }
      }
    }
  });

  return {
    vertices,
    triangles,
    size: { x: size.x, y: size.y, z: size.z },
    surfaceArea: Math.abs(surfaceArea),
    volume: Math.abs(volume),
    materials: Array.from(materials),
    files,
  };
};
