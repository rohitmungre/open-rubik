export function createHudTop(onScramble) {
  const hud = document.createElement('div');
  hud.className = 'hud hud-top';

  hud.innerHTML = `
    <div class="logo">OPEN RUBIK</div>
    <div class="stats-panel">
      <div class="stat-item">
        <div class="stat-label">Moves</div>
        <div class="stat-value" id="move-count">0</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-label">Time</div>
        <div class="stat-value" id="timer">00:00</div>
      </div>
    </div>
    <button class="scramble-btn">SCRAMBLE</button>
  `;

  hud.querySelector('.scramble-btn').addEventListener('click', onScramble);

  return hud;
}

export function createInstructions() {
  const el = document.createElement('div');
  el.className = 'instructions';
  el.textContent = 'Click & drag on a face to rotate';
  return el;
}
