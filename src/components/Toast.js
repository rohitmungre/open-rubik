let toastTimer = null;

export function createToast() {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.id = 'toast';
  return toast;
}

export function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}
