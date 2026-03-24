export function createKeyHints() {
  const hints = document.createElement('div');
  hints.className = 'key-hints';

  hints.innerHTML = `
    <div class="key-hint-panel">
      <div class="key-hint-title">CLASSIC MODE</div>
      <div class="key-hint-row"><kbd>U</kbd> <kbd>D</kbd> — up / down</div>
      <div class="key-hint-row"><kbd>L</kbd> <kbd>R</kbd> — left / right</div>
      <div class="key-hint-row"><kbd>F</kbd> <kbd>B</kbd> — front / back</div>
      <div class="key-hint-row"><kbd>Shift</kbd> + key = reverse</div>
    </div>
    <div class="key-hint-panel">
      <div class="key-hint-title">ARROW MODE</div>
      <div class="key-hint-row"><kbd>←</kbd><kbd>→</kbd> row · <kbd>↑</kbd><kbd>↓</kbd> column</div>
      <div class="key-hint-row"><kbd>Shift</kbd>+<kbd>↑</kbd><kbd>↓</kbd> switch row</div>
      <div class="key-hint-row"><kbd>Shift</kbd>+<kbd>←</kbd><kbd>→</kbd> switch col</div>
      <div class="key-hint-row"><kbd>Z</kbd> front CW · <kbd>X</kbd> front CCW</div>
      <div class="key-hint-sep"></div>
      <div class="key-hint-row">
        Row: <span class="key-indicator" id="row-indicator">TOP</span>
        Col: <span class="key-indicator" id="col-indicator">LEFT</span>
      </div>
    </div>
  `;

  return hints;
}
