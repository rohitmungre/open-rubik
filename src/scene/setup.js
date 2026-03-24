import * as THREE from 'three';

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(5, 5, 7);
camera.lookAt(0, 0, 0);

export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 0.8);
dirLight1.position.set(5, 8, 5);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xff00e5, 0.4);
dirLight2.position.set(-5, -3, -5);
scene.add(dirLight2);

export const pointLight = new THREE.PointLight(0x00f0ff, 0.5, 20);
pointLight.position.set(0, 0, 8);
scene.add(pointLight);

export const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

export const raycaster = new THREE.Raycaster();

export function mountRenderer(container) {
  container.appendChild(renderer.domElement);
}

export function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
