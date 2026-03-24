import { camera } from './setup.js';
import { orbitState } from '../state/GameState.js';

export function updateCamera() {
  const { theta, phi, radius } = orbitState.spherical;
  camera.position.set(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
  camera.lookAt(0, 0, 0);
}

export function handleOrbitMove(clientX, clientY) {
  const dx = clientX - orbitState.start.x;
  const dy = clientY - orbitState.start.y;
  orbitState.spherical.theta += dx * 0.008;
  orbitState.spherical.phi = Math.max(
    0.2, Math.min(Math.PI - 0.2, orbitState.spherical.phi - dy * 0.008)
  );
  orbitState.start = { x: clientX, y: clientY };
  updateCamera();
}

export function handleZoom(deltaY) {
  orbitState.spherical.radius = Math.max(
    6, Math.min(18, orbitState.spherical.radius + deltaY * 0.01)
  );
  updateCamera();
}
