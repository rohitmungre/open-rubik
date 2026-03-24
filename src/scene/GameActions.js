import { gameState, setAnimSpeed, CONSTANTS } from '../state/GameState.js';
import { buildCube } from './CubeManager.js';
import { getMoveData, processQueue } from './MoveSystem.js';
import { celebrationEffect } from './Celebration.js';

export function scrambleCube() {
  if (gameState.isAnimating || gameState.moveQueue.length > 0) return;

  resetCube();
  gameState.scrambled = false;

  setTimeout(() => {
    const moves = ['U', "U'", 'D', "D'", 'L', "L'", 'R', "R'", 'F', "F'", 'B', "B'"];
    const scrambleMoves = [];
    let lastAxis = '';

    for (let i = 0; i < 20; i++) {
      let move;
      let axis;
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
        axis = getMoveData(move).axis;
      } while (axis === lastAxis);
      lastAxis = axis;
      scrambleMoves.push(move);
    }

    gameState.isScrambling = true;
    gameState.isTiming = false;
    gameState.moveCount = 0;
    gameState.scrambleMovesRemaining = scrambleMoves.length;
    setAnimSpeed(CONSTANTS.ANIM_SPEED_SCRAMBLE);
    document.getElementById('move-count').textContent = '0';
    document.getElementById('timer').textContent = '00:00';

    scrambleMoves.forEach(m => {
      gameState.moveQueue.push(m);
    });
    processQueue();
  }, 100);
}

export function resetCube() {
  if (gameState.isAnimating) return;

  gameState.moveQueue = [];
  clearInterval(gameState.timerInterval);
  gameState.isTiming = false;
  gameState.scrambled = true;
  gameState.isScrambling = false;
  gameState.isSolved = false;
  gameState.moveCount = 0;
  gameState.timerStart = null;
  setAnimSpeed(CONSTANTS.ANIM_SPEED_NORMAL);

  document.getElementById('move-count').textContent = '0';
  document.getElementById('timer').textContent = '00:00';
  document.getElementById('solved-overlay').classList.remove('active');

  buildCube();
}

export function onSolved() {
  gameState.isSolved = true;
  gameState.scrambled = false;
  clearInterval(gameState.timerInterval);

  const elapsed = gameState.timerStart ? Math.floor((Date.now() - gameState.timerStart) / 1000) : 0;
  const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const secs = (elapsed % 60).toString().padStart(2, '0');

  document.getElementById('solved-stats').textContent = `${gameState.moveCount} MOVES · ${mins}:${secs}`;
  document.getElementById('solved-overlay').classList.add('active');

  celebrationEffect();
}

export function closeSolved() {
  document.getElementById('solved-overlay').classList.remove('active');
  gameState.isSolved = false;
  scrambleCube();
}
