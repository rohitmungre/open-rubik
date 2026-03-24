import { showToast } from './Toast.js';

export function createBottomNav(onShowAbout) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  nav.innerHTML = `
    <div class="bottom-nav-left">
      <button class="nav-link" data-action="skins">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <span class="nav-link-text">Skins</span>
      </button>
      <button class="nav-link" data-action="backgrounds">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        <span class="nav-link-text">Backgrounds</span>
      </button>
    </div>
    <div class="bottom-nav-right">
      <button class="nav-link" data-action="about">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span class="nav-link-text">About</span>
      </button>
    </div>
  `;

  nav.querySelector('[data-action="skins"]').addEventListener('click', () => {
    showToast('Skins coming soon!');
  });
  nav.querySelector('[data-action="backgrounds"]').addEventListener('click', () => {
    showToast('Backgrounds coming soon!');
  });
  nav.querySelector('[data-action="about"]').addEventListener('click', onShowAbout);

  return nav;
}
