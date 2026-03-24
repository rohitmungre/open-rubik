export function createSolvedOverlay(onPlayAgain) {
  const overlay = document.createElement('div');
  overlay.className = 'solved-overlay';
  overlay.id = 'solved-overlay';

  overlay.innerHTML = `
    <div class="solved-content">
      <div class="solved-emoji">🎉</div>
      <div class="solved-title">CONGRATULATIONS!</div>
      <div class="solved-subtitle">You solved the cube!</div>
      <div class="solved-stats" id="solved-stats"></div>
      <button class="solved-btn">PLAY AGAIN</button>
    </div>
  `;

  overlay.querySelector('.solved-btn').addEventListener('click', onPlayAgain);

  return overlay;
}
