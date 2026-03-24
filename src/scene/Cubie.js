import * as THREE from 'three';
import { CONSTANTS } from '../state/GameState.js';

const { CUBIE_SIZE, FACE_COLORS, INNER_COLOR } = CONSTANTS;

export function createCubie(x, y, z) {
  const group = new THREE.Group();

  const innerGeo = new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE);
  const innerMat = new THREE.MeshStandardMaterial({
    color: INNER_COLOR,
    metalness: 0.8,
    roughness: 0.2,
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  group.add(innerMesh);

  const stickerSize = CUBIE_SIZE * 0.85;
  const stickerOffset = CUBIE_SIZE / 2 + 0.01;

  const faces = [
    { dir: 'right',  pos: [stickerOffset, 0, 0], rot: [0, Math.PI/2, 0], condition: x === 1 },
    { dir: 'left',   pos: [-stickerOffset, 0, 0], rot: [0, -Math.PI/2, 0], condition: x === -1 },
    { dir: 'top',    pos: [0, stickerOffset, 0], rot: [-Math.PI/2, 0, 0], condition: y === 1 },
    { dir: 'bottom', pos: [0, -stickerOffset, 0], rot: [Math.PI/2, 0, 0], condition: y === -1 },
    { dir: 'front',  pos: [0, 0, stickerOffset], rot: [0, 0, 0], condition: z === 1 },
    { dir: 'back',   pos: [0, 0, -stickerOffset], rot: [0, Math.PI, 0], condition: z === -1 },
  ];

  faces.forEach(f => {
    if (!f.condition) return;
    const stickerGeo = new THREE.PlaneGeometry(stickerSize, stickerSize);
    const color = new THREE.Color(FACE_COLORS[f.dir]);
    const stickerMat = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.1,
      roughness: 0.3,
      emissive: color.clone().multiplyScalar(0.15),
    });
    const sticker = new THREE.Mesh(stickerGeo, stickerMat);
    sticker.position.set(...f.pos);
    sticker.rotation.set(...f.rot);
    group.add(sticker);
  });

  const edgesGeo = new THREE.EdgesGeometry(
    new THREE.BoxGeometry(CUBIE_SIZE + 0.01, CUBIE_SIZE + 0.01, CUBIE_SIZE + 0.01)
  );
  const edgesMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.15 });
  const edges = new THREE.LineSegments(edgesGeo, edgesMat);
  group.add(edges);

  group.position.set(x * CONSTANTS.GAP, y * CONSTANTS.GAP, z * CONSTANTS.GAP);
  group.userData = { logicalPos: { x, y, z } };

  return group;
}
