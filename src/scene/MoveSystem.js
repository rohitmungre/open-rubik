import * as THREE from 'three';
import { scene } from './setup.js';
import { cubeGroup } from './setup.js';
import { getLayerCubies, checkSolved } from './CubeManager.js';
import { gameState, animSpeed, setAnimSpeed, CONSTANTS } from '../state/GameState.js';
import { onSolved } from './GameActions.js';

const MOVE_DATA = {
  'U':  { axis: 'y', layer:  1, angle: -Math.PI/2 },
  "U'": { axis: 'y', layer:  1, angle:  Math.PI/2 },
  'D':  { axis: 'y', layer: -1, angle:  Math.PI/2 },
  "D'": { axis: 'y', layer: -1, angle: -Math.PI/2 },
  'R':  { axis: 'x', layer:  1, angle: -Math.PI/2 },
  "R'": { axis: 'x', layer:  1, angle:  Math.PI/2 },
  'L':  { axis: 'x', layer: -1, angle:  Math.PI/2 },
  "L'": { axis: 'x', layer: -1, angle: -Math.PI/2 },
  'F':  { axis: 'z', layer:  1, angle: -Math.PI/2 },
  "F'": { axis: 'z', layer:  1, angle:  Math.PI/2 },
  'B':  { axis: 'z', layer: -1, angle:  Math.PI/2 },
  "B'": { axis: 'z', layer: -1, angle: -Math.PI/2 },
  'M':  { axis: 'x', layer:  0, angle:  Math.PI/2 },
  "M'": { axis: 'x', layer:  0, angle: -Math.PI/2 },
  'E':  { axis: 'y', layer:  0, angle:  Math.PI/2 },
  "E'": { axis: 'y', layer:  0, angle: -Math.PI/2 },
  'S':  { axis: 'z', layer:  0, angle: -Math.PI/2 },
  "S'": { axis: 'z', layer:  0, angle:  Math.PI/2 },
};

export function getMoveData(notation) {
  return MOVE_DATA[notation];
}

function animateMove(notation, callback) {
  const data = getMoveData(notation);
  if (!data) { callback && callback(); return; }

  gameState.isAnimating = true;
  const layerCubies = getLayerCubies(data.axis, data.layer);

  const pivot = new THREE.Group();
  scene.add(pivot);

  layerCubies.forEach(c => {
    cubeGroup.remove(c);
    pivot.add(c);
  });

  let currentAngle = 0;
  const targetAngle = data.angle;
  const axisVec = new THREE.Vector3(
    data.axis === 'x' ? 1 : 0,
    data.axis === 'y' ? 1 : 0,
    data.axis === 'z' ? 1 : 0
  );

  function step() {
    const remaining = targetAngle - currentAngle;
    const delta = remaining * animSpeed;

    if (Math.abs(remaining) < 0.001) {
      pivot.rotation.set(0, 0, 0);
      pivot.rotateOnAxis(axisVec, targetAngle);
      pivot.updateMatrixWorld(true);

      layerCubies.forEach(c => {
        const worldPos = new THREE.Vector3();
        const worldQuat = new THREE.Quaternion();
        c.getWorldPosition(worldPos);
        c.getWorldQuaternion(worldQuat);

        pivot.remove(c);
        cubeGroup.add(c);

        c.position.copy(worldPos);
        c.quaternion.copy(worldQuat);

        c.position.x = Math.round(c.position.x / CONSTANTS.GAP) * CONSTANTS.GAP;
        c.position.y = Math.round(c.position.y / CONSTANTS.GAP) * CONSTANTS.GAP;
        c.position.z = Math.round(c.position.z / CONSTANTS.GAP) * CONSTANTS.GAP;
      });

      scene.remove(pivot);
      gameState.isAnimating = false;
      callback && callback();
      return;
    }

    currentAngle += delta;
    pivot.rotation.set(0, 0, 0);
    pivot.rotateOnAxis(axisVec, currentAngle);

    requestAnimationFrame(step);
  }

  step();
}

export function processQueue() {
  if (gameState.isAnimating || gameState.moveQueue.length === 0) return;

  const move = gameState.moveQueue.shift();

  if (gameState.scrambled && !gameState.isScrambling) {
    if (!gameState.isTiming) {
      gameState.isTiming = true;
      gameState.timerStart = Date.now();
      gameState.timerInterval = setInterval(updateTimerDisplay, 100);
      gameState.moveCount = 1;
      document.getElementById('move-count').textContent = gameState.moveCount;
    } else {
      gameState.moveCount++;
      document.getElementById('move-count').textContent = gameState.moveCount;
    }
  }

  animateMove(move, () => {
    if (gameState.isScrambling) {
      gameState.scrambleMovesRemaining--;
      if (gameState.scrambleMovesRemaining <= 0) {
        gameState.isScrambling = false;
        gameState.scrambled = true;
        setAnimSpeed(CONSTANTS.ANIM_SPEED_NORMAL);
      }
    } else if (gameState.scrambled) {
      if (checkSolved()) {
        onSolved();
      }
    }

    processQueue();
  });
}

export function doMove(notation) {
  if (gameState.isSolved) return;
  gameState.moveQueue.push(notation);
  processQueue();
}

function updateTimerDisplay() {
  if (!gameState.timerStart) return;
  const elapsed = Math.floor((Date.now() - gameState.timerStart) / 1000);
  const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const secs = (elapsed % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${mins}:${secs}`;
}
