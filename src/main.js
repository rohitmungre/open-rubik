import './styles/index.css';

import { scene, camera, renderer, pointLight, mountRenderer, handleResize } from './scene/setup.js';
import { updateCamera } from './scene/OrbitControls.js';
import { buildCube } from './scene/CubeManager.js';
import { initDragControls } from './scene/DragControls.js';
import { initBackground, resizeBgCanvas, drawBackground } from './scene/Background.js';
import { scrambleCube, closeSolved } from './scene/GameActions.js';
import { initKeyboardControls } from './controls/KeyboardControls.js';

import { createDecorations } from './components/Decorations.js';
import { createHudTop, createInstructions } from './components/HudTop.js';
import { createKeyHints } from './components/KeyHints.js';
import { createBottomNav } from './components/BottomNav.js';
import { createSolvedOverlay } from './components/SolvedOverlay.js';
import { createAboutOverlay, showAbout } from './components/AboutOverlay.js';
import { createToast } from './components/Toast.js';

// Build DOM
const body = document.body;
body.appendChild(createDecorations());
body.appendChild(createHudTop(scrambleCube));
body.appendChild(createInstructions());
body.appendChild(createKeyHints());
body.appendChild(createBottomNav(showAbout));
body.appendChild(createSolvedOverlay(closeSolved));
body.appendChild(createToast());
body.appendChild(createAboutOverlay());

// Mount Three.js renderer
const container = document.getElementById('canvas-container');
mountRenderer(container);

// Initialize systems
updateCamera();
initBackground();
initDragControls();
initKeyboardControls();

// Build cube
buildCube();

// Render loop
function animate() {
  requestAnimationFrame(animate);

  const t = Date.now() * 0.001;
  drawBackground(Date.now());

  pointLight.position.x = Math.sin(t * 0.3) * 4;
  pointLight.position.z = Math.cos(t * 0.3) * 6;

  renderer.render(scene, camera);
}

animate();

// Auto-scramble on load
setTimeout(() => scrambleCube(), 500);

// Handle resize
window.addEventListener('resize', () => {
  handleResize();
  resizeBgCanvas();
});
