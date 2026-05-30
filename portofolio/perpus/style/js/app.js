'use strict';

// ── Toast ──────────────────────────────────────────────────────
function showToast(msg, type = 'success', ms = 3200) {
  document.querySelector('.toast')?.remove();
  const icons = { success: 'check-circle', error: 'exclamation-circle', warning: 'exclamation-triangle', info: 'info-circle' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas fa-${icons[type] || 'info-circle'}"></i> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, ms);
}

// ── Modal ──────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id)?.classList.add('on'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('on'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-bg')) e.target.classList.remove('on');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-bg.on').forEach(m => m.classList.remove('on'));
    closeLogoutConfirm();
  }
});

// ── Logout Confirm ─────────────────────────────────────────────
function openLogoutConfirm()  { document.getElementById('logoutConfirm')?.classList.add('on'); }
function closeLogoutConfirm() { document.getElementById('logoutConfirm')?.classList.remove('on'); }

// ── Sidebar ────────────────────────────────────────────────────
const menuBtn  = document.getElementById('menuBtn');
const sidebar  = document.getElementById('sidebar');
const sideOver = document.getElementById('sideOverlay');
if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (sideOver) sideOver.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
  });
}

// ── Auto-dismiss messages ──────────────────────────────────────
document.querySelectorAll('.msg-item').forEach(el => {
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 400); }, 4500);
});

// ── Table live search ──────────────────────────────────────────
function liveSearch(inputId, tableId) {
  const inp = document.getElementById(inputId);
  const tbl = document.getElementById(tableId);
  if (!inp || !tbl) return;
  inp.addEventListener('input', () => {
    const q = inp.value.toLowerCase();
    tbl.querySelectorAll('tbody tr').forEach(r => {
      r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── Set current date ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.getElementById('topbarDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
});
