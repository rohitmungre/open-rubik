import * as THREE from 'three';
import { renderer, camera, raycaster } from './setup.js';
import { gameState, orbitState } from '../state/GameState.js';
import { getCubieLogicalPos } from './CubeManager.js';
import { doMove } from './MoveSystem.js';
import { handleOrbitMove, handleZoom } from './OrbitControls.js';

let dragState = null;

function getMouseNDC(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
    y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
  };
}

function getFaceNormal(intersection) {
  const n = intersection.face.normal.clone();
  n.transformDirection(intersection.object.matrixWorld);
  const abs = [Math.abs(n.x), Math.abs(n.y), Math.abs(n.z)];
  const maxI = abs.indexOf(Math.max(...abs));
  const snapped = new THREE.Vector3();
  if (maxI === 0) snapped.x = Math.sign(n.x);
  else if (maxI === 1) snapped.y = Math.sign(n.y);
  else snapped.z = Math.sign(n.z);
  return snapped;
}

function determineMoveFromDrag(faceNormal, dragDir, cubiePos) {
  const cross = new THREE.Vector3().crossVectors(dragDir, faceNormal).normalize();
  const absCross = [Math.abs(cross.x), Math.abs(cross.y), Math.abs(cross.z)];
  const maxI = absCross.indexOf(Math.max(...absCross));

  let axis, layer, prime;

  if (maxI === 0) {
    axis = 'x'; layer = cubiePos.x; prime = cross.x < 0;
  } else if (maxI === 1) {
    axis = 'y'; layer = cubiePos.y; prime = cross.y < 0;
  } else {
    axis = 'z'; layer = cubiePos.z; prime = cross.z < 0;
  }

  let move = '';
  if (axis === 'x') {
    if (layer === 1) move = prime ? "R'" : 'R';
    else if (layer === -1) move = prime ? 'L' : "L'";
    else move = prime ? 'M' : "M'";
  } else if (axis === 'y') {
    if (layer === 1) move = prime ? "U'" : 'U';
    else if (layer === -1) move = prime ? 'D' : "D'";
    else move = prime ? 'E' : "E'";
  } else {
    if (layer === 1) move = prime ? "F'" : 'F';
    else if (layer === -1) move = prime ? 'B' : "B'";
    else move = prime ? "S'" : 'S';
  }

  return move;
}

function getAllMeshes() {
  const allMeshes = [];
  gameState.cubies.forEach(c => c.traverse(child => {
    if (child.isMesh) allMeshes.push(child);
  }));
  return allMeshes;
}

function handleDragMove(clientX, clientY) {
  if (!dragState || dragState.moved || gameState.isAnimating) return;

  const dx = clientX - dragState.startMouse.x;
  const dy = clientY - dragState.startMouse.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > 20) {
    dragState.moved = true;

    const ndc1 = getMouseNDC({ clientX: dragState.startMouse.x, clientY: dragState.startMouse.y });
    const ndc2 = getMouseNDC({ clientX, clientY });

    raycaster.setFromCamera(new THREE.Vector2(ndc1.x, ndc1.y), camera);
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()).negate(),
      dragState.startPoint
    );

    const p1 = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, p1);

    raycaster.setFromCamera(new THREE.Vector2(ndc2.x, ndc2.y), camera);
    const p2 = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, p2);

    const dragDir3D = p2.sub(p1).normalize();
    const cubiePos = getCubieLogicalPos(dragState.cubie);
    const move = determineMoveFromDrag(dragState.faceNormal, dragDir3D, cubiePos);

    if (move) doMove(move);
    dragState = null;
  }
}

export function initDragControls() {
  const el = renderer.domElement;

  // Mouse events
  el.addEventListener('mousedown', (e) => {
    if (e.button === 2 || e.button === 1) {
      orbitState.down = true;
      orbitState.start = { x: e.clientX, y: e.clientY };
      return;
    }

    if (gameState.isAnimating) return;

    const ndc = getMouseNDC(e);
    raycaster.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), camera);

    const hits = raycaster.intersectObjects(getAllMeshes(), false);
    if (hits.length > 0) {
      const hit = hits[0];
      dragState = {
        cubie: hit.object.parent,
        faceNormal: getFaceNormal(hit),
        startPoint: hit.point.clone(),
        startMouse: { x: e.clientX, y: e.clientY },
        moved: false,
      };
    } else {
      orbitState.down = true;
      orbitState.start = { x: e.clientX, y: e.clientY };
    }
  });

  el.addEventListener('mousemove', (e) => {
    if (orbitState.down) {
      handleOrbitMove(e.clientX, e.clientY);
      return;
    }
    handleDragMove(e.clientX, e.clientY);
  });

  el.addEventListener('mouseup', () => {
    orbitState.down = false;
    dragState = null;
  });

  el.addEventListener('contextmenu', e => e.preventDefault());

  // Touch events
  el.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && !gameState.isAnimating) {
      const t = e.touches[0];
      const ndc = getMouseNDC(t);
      raycaster.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), camera);

      const hits = raycaster.intersectObjects(getAllMeshes(), false);
      if (hits.length > 0) {
        const hit = hits[0];
        dragState = {
          cubie: hit.object.parent,
          faceNormal: getFaceNormal(hit),
          startPoint: hit.point.clone(),
          startMouse: { x: t.clientX, y: t.clientY },
          moved: false,
        };
      } else {
        orbitState.down = true;
        orbitState.start = { x: t.clientX, y: t.clientY };
      }
    } else if (e.touches.length === 2) {
      orbitState.down = true;
      orbitState.start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const t = e.touches[0];

    if (orbitState.down) {
      handleOrbitMove(t.clientX, t.clientY);
      return;
    }
    handleDragMove(t.clientX, t.clientY);
  }, { passive: false });

  el.addEventListener('touchend', () => {
    orbitState.down = false;
    dragState = null;
  });

  // Scroll to zoom
  el.addEventListener('wheel', (e) => {
    handleZoom(e.deltaY);
  }, { passive: true });
}
