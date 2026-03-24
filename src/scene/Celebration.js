import * as THREE from 'three';
import { scene } from './setup.js';

export function celebrationEffect() {
  const particles = [];
  const particleGeo = new THREE.SphereGeometry(0.05, 8, 8);
  const colors = [0x00f0ff, 0xff00e5, 0x39ff14, 0xffff00, 0xff3030, 0x0066ff];

  for (let i = 0; i < 60; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: colors[i % colors.length],
      transparent: true,
      opacity: 1,
    });
    const p = new THREE.Mesh(particleGeo, mat);
    p.position.set(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    p.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      Math.random() * 0.2 + 0.1,
      (Math.random() - 0.5) * 0.3
    );
    scene.add(p);
    particles.push(p);
  }

  let frame = 0;
  function animParticles() {
    frame++;
    particles.forEach(p => {
      p.position.add(p.userData.velocity);
      p.userData.velocity.y -= 0.003;
      p.material.opacity = Math.max(0, 1 - frame / 80);
    });
    if (frame < 80) {
      requestAnimationFrame(animParticles);
    } else {
      particles.forEach(p => scene.remove(p));
    }
  }
  animParticles();
}
