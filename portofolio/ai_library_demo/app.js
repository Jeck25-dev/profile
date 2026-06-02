'use strict';

// ── Data Statis ──────────────────────────────────────────────────
const USERS = [
  { username: 'superadmin', password: 'super12345', role: 'superuser', name: 'Dr. Hendra Kusuma', email: 'superadmin@khadijah.sch.id', avatar: 'HK' },
  { username: 'admin',      password: 'admin12345', role: 'admin',     name: 'Sari Indrawati',   email: 'admin@khadijah.sch.id',      avatar: 'SI' },
  { username: 'andi',       password: 'library12345', role: 'member',  name: 'Andi Firmansyah', email: 'andi@email.com',             avatar: 'AF', member_id: 'M-2026-001' },
  { username: 'siti',       password: 'library12345', role: 'member',  name: 'Siti Nurhaliza',  email: 'siti@email.com',             avatar: 'SN', member_id: 'M-2026-002' },
];

let currentUser = null;

// ── Auth ─────────────────────────────────────────────────────────
function login(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) return false;
  currentUser = user;
  localStorage.setItem('ailib_user', JSON.stringify(user));
  return true;
}

function logout() {
  currentUser = null;
  localStorage.removeItem('ailib_user');
  showPage('login');
}

function checkAuth() {
  const saved = localStorage.getItem('ailib_user');
  if (saved) currentUser = JSON.parse(saved);
}

// ── Page Router ──────────────────────────────────────────────────
function showPage(pageId, updateNav = true) {
  // Sembunyikan semua halaman
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Tampilkan halaman target
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Update active nav
  if (updateNav) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
  }

  // Update page title di topbar
  const titles = {
    'dashboard-admin' : 'Dashboard',
    'books'           : 'Koleksi Buku',
    'members'         : 'Manajemen Anggota',
    'loans'           : 'Peminjaman',
    'fines'           : 'Denda',
    'analytics'       : 'Analitik & Laporan',
    'ebooks'          : 'E-Book',
    'settings'        : 'Pengaturan',
    'logs'            : 'Log Aktivitas',
    'admin-profile'   : 'Profil Admin',
    'superuser-admins': 'Kelola Administrator',
    'dashboard-member': 'Dashboard Anggota',
    'catalog'         : 'Katalog Buku',
    'history'         : 'Riwayat Peminjaman',
    'notifications'   : 'Notifikasi',
    'member-profile'  : 'Profil Saya',
    'ai-chat'         : 'Asisten AI',
    'landing'         : 'Beranda',
  };
  const titleEl = document.getElementById('pageTitle');
  if (titleEl && titles[pageId]) titleEl.textContent = titles[pageId];

  window.scrollTo(0,0);
}

// ── Toast ────────────────────────────────────────────────────────
function showToast(msg, type = 'success', ms = 3000) {
  document.querySelector('.toast')?.remove();
  const icons = { success:'check-circle', error:'exclamation-circle', warning:'exclamation-triangle', info:'info-circle' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas fa-${icons[type]||'info-circle'}"></i> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, ms);
}

// ── Modal ────────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id)?.classList.add('on'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('on'); }
document.addEventListener('click', e => { if (e.target.classList.contains('modal-bg')) e.target.classList.remove('on'); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-bg.on, .logout-overlay.on').forEach(m => m.classList.remove('on'));
    closeProfileMenu();
  }
});

// ── Profile Dropdown ─────────────────────────────────────────────
function toggleProfileMenu() {
  const m = document.getElementById('profileMenu');
  const c = document.getElementById('profileCaret');
  if (!m) return;
  m.classList.toggle('open');
  c?.classList.toggle('open');
}
function closeProfileMenu() {
  document.getElementById('profileMenu')?.classList.remove('open');
  document.getElementById('profileCaret')?.classList.remove('open');
}
document.addEventListener('click', e => {
  const dd = document.getElementById('profileDropdown');
  if (dd && !dd.contains(e.target)) closeProfileMenu();
});

// ── Logout Confirm ───────────────────────────────────────────────
function openLogout()  { document.getElementById('logoutOverlay')?.classList.add('on'); }
function closeLogout() { document.getElementById('logoutOverlay')?.classList.remove('on'); }
function confirmLogout() { closeLogout(); logout(); }

// ── Sidebar ──────────────────────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sideOverlay');
  sb?.classList.toggle('open');
  ov && (ov.style.display = sb.classList.contains('open') ? 'block' : 'none');
}

// ── Set current date ─────────────────────────────────────────────
function setDate() {
  const el = document.getElementById('topbarDate');
  if (el) el.textContent = new Date().toLocaleDateString('id-ID',
    {weekday:'long',day:'numeric',month:'long',year:'numeric'});
}

// ── Init ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setDate();

  // Login form
  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (login(username, password)) {
      document.getElementById('loginError')?.classList.add('hidden');
      // Tampilkan app sesuai role
      document.getElementById('loginPage').style.display = 'none';
      if (currentUser.role === 'member') {
        document.getElementById('memberApp').style.display = 'flex';
        initMemberUI();
        showPage('dashboard-member');
      } else {
        document.getElementById('adminApp').style.display = 'flex';
        initAdminUI();
        showPage('dashboard-admin');
      }
    } else {
      const err = document.getElementById('loginError');
      if (err) { err.classList.remove('hidden'); err.textContent = '❌ Username atau password salah.'; }
    }
  });

  // Tab register
  document.getElementById('tabLogin')?.addEventListener('click', () => switchTab('login'));
  document.getElementById('tabReg')?.addEventListener('click',   () => switchTab('register'));

  // Register form
  document.getElementById('registerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Akun berhasil dibuat! Silakan masuk.', 'success');
    switchTab('login');
  });

  // Jika sudah login, langsung masuk
  if (currentUser) {
    document.getElementById('loginPage').style.display = 'none';
    if (currentUser.role === 'member') {
      document.getElementById('memberApp').style.display = 'flex';
      initMemberUI();
      showPage('dashboard-member');
    } else {
      document.getElementById('adminApp').style.display = 'flex';
      initAdminUI();
      showPage('dashboard-admin');
    }
  }
});

function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('panelLogin').style.display = isLogin ? '' : 'none';
  document.getElementById('panelReg').style.display   = isLogin ? 'none' : '';
  document.getElementById('tabLogin').classList.toggle('active', isLogin);
  document.getElementById('tabReg').classList.toggle('active', !isLogin);
}

// ── Init Admin UI ────────────────────────────────────────────────
function initAdminUI() {
  const u = currentUser;
  // Set nama user di topbar & sidebar
  document.querySelectorAll('.user-display-name').forEach(el => el.textContent = u.name);
  document.querySelectorAll('.user-display-role').forEach(el => {
    el.textContent = u.role === 'superuser' ? 'Superuser' : 'Administrator';
  });
  document.querySelectorAll('.user-display-email').forEach(el => el.textContent = u.email);
  document.querySelectorAll('.user-av-initials').forEach(el => el.textContent = u.avatar);

  // Superuser menu
  if (u.role === 'superuser') {
    document.querySelectorAll('.superuser-only').forEach(el => el.style.display = '');
  }

  // Nav items
  document.querySelectorAll('#adminApp .nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => showPage(item.dataset.page));
  });

  // Logout
  document.getElementById('adminLogoutBtn')?.addEventListener('click', openLogout);
  document.getElementById('sidebarLogoutBtn')?.addEventListener('click', openLogout);
}

// ── Init Member UI ───────────────────────────────────────────────
function initMemberUI() {
  const u = currentUser;
  document.querySelectorAll('.member-display-name').forEach(el => el.textContent = u.name);
  document.querySelectorAll('.member-display-id').forEach(el => el.textContent = u.member_id || 'M-2026-001');
  document.querySelectorAll('.user-av-initials').forEach(el => el.textContent = u.avatar);

  document.querySelectorAll('#memberApp .nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => showPage(item.dataset.page));
  });

  document.getElementById('memberLogoutBtn')?.addEventListener('click', openLogout);
}

// ── AI Chat ──────────────────────────────────────────────────────
const CHAT_HISTORY = [];
const BOT_RESPONSES = {
  greet: 'Halo! Saya asisten AI Perpustakaan SMA Khadijah. Ada yang bisa saya bantu? 😊',
  cari: `Berikut hasil pencarian buku:<br><br>
    <div style="background:var(--bg-input);border-radius:8px;padding:10px;margin-bottom:6px;"><strong>Laskar Pelangi</strong> — Andrea Hirata<br><small style="color:var(--tx-2);">Novel · Stok: 4 ✅</small></div>
    <div style="background:var(--bg-input);border-radius:8px;padding:10px;margin-bottom:6px;"><strong>Sang Pemimpi</strong> — Andrea Hirata<br><small style="color:var(--tx-2);">Novel · Stok: 2 ⚠️</small></div>`,
  rekomendasi: `⭐ Rekomendasi buku terbaik saat ini:<br><br>
    <div style="background:var(--bg-input);border-radius:8px;padding:10px;margin-bottom:6px;"><strong>Sapiens</strong> — Skor AI: 9.6 🔥<br><small style="color:var(--tx-2);">Sejarah · Stok tersedia</small></div>
    <div style="background:var(--bg-input);border-radius:8px;padding:10px;margin-bottom:6px;"><strong>Atomic Habits</strong> — Skor AI: 9.4<br><small style="color:var(--tx-2);">Self-Help · E-Book tersedia</small></div>
    <div style="background:var(--bg-input);border-radius:8px;padding:10px;"><strong>Bumi Manusia</strong> — Skor AI: 9.5<br><small style="color:var(--tx-2);">Novel · Stok: 3</small></div>`,
  pinjaman: `📋 Pinjaman aktif Anda:<br><br>
    <div style="background:rgba(14,165,233,.08);border:1px solid rgba(14,165,233,.2);border-radius:8px;padding:10px;margin-bottom:6px;"><strong>Laskar Pelangi</strong><br><small>Tenggat: 5 Juni 2026 · Sisa 6 hari</small></div>`,
  denda: '💰 <strong>Denda keterlambatan</strong>: Rp 1.000 per hari per buku.<br>Contoh: terlambat 3 hari = Rp 3.000/buku.',
  durasi: '📅 <strong>Durasi pinjam</strong>: 7 hari kalender. Maksimal pinjam 3 buku sekaligus.',
  jam: '🕐 <strong>Jam buka perpustakaan:</strong><br>Senin–Kamis: 07.00–15.30<br>Jumat: 07.00–11.30<br>Sabtu: 07.00–12.00<br>Minggu: Tutup',
  default: 'Maaf, saya belum memahami pertanyaan tersebut. Coba ketik <strong>"bantuan"</strong> untuk melihat perintah yang tersedia, atau ajukan dengan cara berbeda 🤔',
};

function chatGetReply(msg) {
  const t = msg.toLowerCase();
  if (/halo|hai|hi|hello|selamat/.test(t)) return BOT_RESPONSES.greet;
  if (/cari|ada buku|stok/.test(t))         return BOT_RESPONSES.cari;
  if (/rekomendasi|terbaik|populer/.test(t)) return BOT_RESPONSES.rekomendasi;
  if (/pinjaman|pinjam saya/.test(t))        return BOT_RESPONSES.pinjaman;
  if (/denda|sanksi/.test(t))                return BOT_RESPONSES.denda;
  if (/durasi|lama pinjam|berapa hari/.test(t)) return BOT_RESPONSES.durasi;
  if (/jam buka|operasional|jadwal/.test(t)) return BOT_RESPONSES.jam;
  return BOT_RESPONSES.default;
}

function chatAddBubble(html, isUser, containerId = 'chatMessages') {
  const box = document.getElementById(containerId);
  if (!box) return;
  const row = document.createElement('div');
  row.className = `chat-row ${isUser ? 'user-row' : 'bot-row'} mb-4`;
  row.style.marginBottom = '14px';
  row.innerHTML = `
    <div class="chat-av ${isUser ? 'user' : 'bot'}">
      <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
    </div>
    <div class="chat-bbl ${isUser ? 'user-bbl' : 'bot-bbl'}">${html}</div>`;
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}

function chatTyping(containerId = 'chatMessages') {
  const box = document.getElementById(containerId);
  if (!box) return;
  const el = document.createElement('div');
  el.className = 'chat-row bot-row'; el.id = 'typing-' + containerId;
  el.style.marginBottom = '14px';
  el.innerHTML = `<div class="chat-av bot"><i class="fas fa-robot"></i></div><div class="typing-dots"><span></span><span></span><span></span></div>`;
  box.appendChild(el); box.scrollTop = box.scrollHeight;
}

function chatSend(inputId = 'chatInput', containerId = 'chatMessages') {
  const inp = document.getElementById(inputId);
  const msg = inp?.value.trim();
  if (!msg) return;
  document.getElementById('suggestionWrap')?.remove();
  chatAddBubble(msg, true, containerId);
  inp.value = ''; inp.style.height = 'auto';
  chatTyping(containerId);
  setTimeout(() => {
    document.getElementById('typing-' + containerId)?.remove();
    chatAddBubble(chatGetReply(msg), false, containerId);
  }, 900 + Math.random() * 400);
}

function chatQuick(text, containerId = 'chatMessages') {
  const inp = document.getElementById('chatInput') || document.getElementById('chatInputAdmin');
  if (inp) { inp.value = text; chatSend(inp.id, containerId); }
}
