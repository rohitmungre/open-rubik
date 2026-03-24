export function createDecorations() {
  const container = document.createDocumentFragment();

  // Background canvas
  const bgCanvas = document.createElement('canvas');
  bgCanvas.id = 'bg-canvas';
  container.appendChild(bgCanvas);

  // Scanlines
  const scanlines = document.createElement('div');
  scanlines.className = 'scanlines';
  container.appendChild(scanlines);

  // Vignette
  const vignette = document.createElement('div');
  vignette.className = 'vignette';
  container.appendChild(vignette);

  // Canvas container for Three.js
  const canvasContainer = document.createElement('div');
  canvasContainer.id = 'canvas-container';
  container.appendChild(canvasContainer);

  // Corner decorations
  const corners = [
    { cls: 'tl', lines: [[0,0,40,0],[0,0,0,40]] },
    { cls: 'tr', lines: [[0,0,40,0],[40,0,40,40]] },
    { cls: 'bl', lines: [[0,40,40,40],[0,0,0,40]] },
    { cls: 'br', lines: [[0,40,40,40],[40,0,40,40]] },
  ];

  corners.forEach(({ cls, lines }) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', `corner-decor ${cls}`);
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');
    lines.forEach(([x1, y1, x2, y2]) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'corner-line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      svg.appendChild(line);
    });
    container.appendChild(svg);
  });

  return container;
}
