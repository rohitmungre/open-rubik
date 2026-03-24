import * as THREE from 'three';
import { cubeGroup } from './setup.js';
import { createCubie } from './Cubie.js';
import { gameState, CONSTANTS } from '../state/GameState.js';

export function getCubieLogicalPos(cubie) {
  const pos = new THREE.Vector3();
  cubie.getWorldPosition(pos);
  return {
    x: Math.round(pos.x / CONSTANTS.GAP),
    y: Math.round(pos.y / CONSTANTS.GAP),
    z: Math.round(pos.z / CONSTANTS.GAP),
  };
}

export function getLayerCubies(axis, layer) {
  return gameState.cubies.filter(c => {
    const pos = getCubieLogicalPos(c);
    return Math.round(pos[axis]) === layer;
  });
}

export function buildCube() {
  gameState.cubies.forEach(c => cubeGroup.remove(c));
  gameState.cubies = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const cubie = createCubie(x, y, z);
        gameState.cubies.push(cubie);
        cubeGroup.add(cubie);
      }
    }
  }
}

export function checkSolved() {
  const faces = [
    { axis: 'x', layer: 1, stickerDir: [1, 0, 0] },
    { axis: 'x', layer: -1, stickerDir: [-1, 0, 0] },
    { axis: 'y', layer: 1, stickerDir: [0, 1, 0] },
    { axis: 'y', layer: -1, stickerDir: [0, -1, 0] },
    { axis: 'z', layer: 1, stickerDir: [0, 0, 1] },
    { axis: 'z', layer: -1, stickerDir: [0, 0, -1] },
  ];

  for (const face of faces) {
    const layerCubies = getLayerCubies(face.axis, face.layer);
    const colors = [];

    for (const cubie of layerCubies) {
      const worldDir = new THREE.Vector3(...face.stickerDir);
      let foundColor = null;

      cubie.traverse(child => {
        if (!child.isMesh || child.geometry.type !== 'PlaneGeometry') return;

        const normal = new THREE.Vector3(0, 0, 1);
        normal.applyQuaternion(child.getWorldQuaternion(new THREE.Quaternion()));

        if (normal.dot(worldDir) > 0.9) {
          foundColor = child.material.color.getHex();
        }
      });

      if (foundColor !== null) colors.push(foundColor);
    }

    if (colors.length < 9) return false;
    if (!colors.every(c => c === colors[0])) return false;
  }

  return true;
}
