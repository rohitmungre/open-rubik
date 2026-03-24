export const gameState = {
  cubies: [],
  isAnimating: false,
  moveQueue: [],
  moveCount: 0,
  timerStart: null,
  timerInterval: null,
  isTiming: false,
  isSolved: false,
  scrambled: false,
  isScrambling: false,
  scrambleMovesRemaining: 0,
};

export const orbitState = {
  down: false,
  start: { x: 0, y: 0 },
  spherical: { theta: Math.PI / 4, phi: Math.PI / 4, radius: 10 },
};

export const arrowModeState = {
  rowNames: ['TOP', 'MID', 'BOT'],
  colNames: ['LEFT', 'MID', 'RIGHT'],
  currentRow: 0,
  currentCol: 0,
};

export const CONSTANTS = {
  CUBIE_SIZE: 0.95,
  GAP: 1.02,
  ANIM_SPEED_NORMAL: 0.14,
  ANIM_SPEED_SCRAMBLE: 0.50,
  FACE_COLORS: {
    right:  0xff3030,
    left:   0xff8c00,
    top:    0xffffff,
    bottom: 0xffff00,
    front:  0x00cc44,
    back:   0x0066ff,
  },
  INNER_COLOR: 0x111122,
};

export let animSpeed = CONSTANTS.ANIM_SPEED_NORMAL;

export function setAnimSpeed(speed) {
  animSpeed = speed;
}
