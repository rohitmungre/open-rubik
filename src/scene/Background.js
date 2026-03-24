let bgCanvas;
let bgCtx;
const stars = [];

export function initBackground() {
  bgCanvas = document.getElementById('bg-canvas');
  bgCtx = bgCanvas.getContext('2d');
  resizeBgCanvas();

  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.3,
    });
  }
}

export function resizeBgCanvas() {
  if (!bgCanvas) return;
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

export function drawBackground(time) {
  const w = bgCanvas.width;
  const h = bgCanvas.height;
  const ctx = bgCtx;
  const t = time * 0.001;

  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, w, h);

  const drawGlow = (cx, cy, r, color, phase) => {
    const x = cx + Math.sin(t * 0.05 + phase) * 30;
    const y = cy + Math.cos(t * 0.04 + phase) * 25;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  };

  drawGlow(w * 0.2, h * 0.3, w * 0.5, 'rgba(0, 40, 100, 0.03)', 0);
  drawGlow(w * 0.8, h * 0.7, w * 0.5, 'rgba(60, 0, 80, 0.025)', 2.5);
  drawGlow(w * 0.5, h * 0.2, w * 0.3, 'rgba(0, 80, 70, 0.015)', 5);

  for (const s of stars) {
    const twinkle = 0.3 + 0.7 * (Math.sin(t * s.speed + s.phase) * 0.5 + 0.5);
    const alpha = twinkle * 0.4;
    ctx.beginPath();
    ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
    ctx.fill();
  }
}
