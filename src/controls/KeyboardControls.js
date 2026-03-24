import { doMove } from '../scene/MoveSystem.js';
import { scrambleCube } from '../scene/GameActions.js';
import { arrowModeState } from '../state/GameState.js';

function updateIndicators() {
  const rowEl = document.getElementById('row-indicator');
  const colEl = document.getElementById('col-indicator');
  if (rowEl) {
    rowEl.textContent = arrowModeState.rowNames[arrowModeState.currentRow];
    rowEl.classList.add('active');
    setTimeout(() => rowEl.classList.remove('active'), 300);
  }
  if (colEl) {
    colEl.textContent = arrowModeState.colNames[arrowModeState.currentCol];
    colEl.classList.add('active');
    setTimeout(() => colEl.classList.remove('active'), 300);
  }
}

export function initKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    const shift = e.shiftKey;
    const lower = key.toLowerCase();

    // Classic mode
    const classicMap = {
      'u': shift ? "U'" : 'U',
      'd': shift ? "D'" : 'D',
      'l': shift ? "L'" : 'L',
      'r': shift ? "R'" : 'R',
      'f': shift ? "F'" : 'F',
      'b': shift ? "B'" : 'B',
    };

    if (classicMap[lower]) {
      doMove(classicMap[lower]);
      return;
    }

    // Arrow mode
    if (key === 'ArrowLeft') {
      e.preventDefault();
      if (shift) {
        arrowModeState.currentCol = (arrowModeState.currentCol + 2) % 3;
        updateIndicators();
      } else {
        const rowMoves = ['U', "E'", "D'"];
        doMove(rowMoves[arrowModeState.currentRow]);
      }
      return;
    }

    if (key === 'ArrowRight') {
      e.preventDefault();
      if (shift) {
        arrowModeState.currentCol = (arrowModeState.currentCol + 1) % 3;
        updateIndicators();
      } else {
        const rowMoves = ["U'", 'E', 'D'];
        doMove(rowMoves[arrowModeState.currentRow]);
      }
      return;
    }

    if (key === 'ArrowUp') {
      e.preventDefault();
      if (shift) {
        arrowModeState.currentRow = (arrowModeState.currentRow + 2) % 3;
        updateIndicators();
      } else {
        const colMoves = ["L'", "M'", 'R'];
        doMove(colMoves[arrowModeState.currentCol]);
      }
      return;
    }

    if (key === 'ArrowDown') {
      e.preventDefault();
      if (shift) {
        arrowModeState.currentRow = (arrowModeState.currentRow + 1) % 3;
        updateIndicators();
      } else {
        const colMoves = ['L', 'M', "R'"];
        doMove(colMoves[arrowModeState.currentCol]);
      }
      return;
    }

    if (lower === 'z') { doMove('F'); return; }
    if (lower === 'x') { doMove("F'"); return; }

    if (lower === 's' || key === 'Escape') {
      scrambleCube();
    }
  });
}
