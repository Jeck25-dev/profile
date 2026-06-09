/* ============================================================
   DATA PENGGUNA DEMO
============================================================ */
const USERS = {
  'admin@myhr.id': {
    password: 'admin123',
    role: 'Admin',
    name: 'Rina Kusuma',
    jabatan: 'HR & System Administrator',
    nik: '3578012501890001',
    lahir: '25 Januari 1989',
    gender: 'Perempuan',
    agama: 'Islam',
    status: 'Menikah',
    hp: '+62 812-1100-0001',
    email: 'rina.kusuma@gmail.com',
    alamat: 'Jl. Rungkut Asri No. 22, Surabaya',
    id: 'EMP001',
    divisi: 'Human Resources',
    pos: 'System Administrator',
    atasan: 'Ahmad Fauzi',
    join: '2 Januari 2020',
    kerja: 'Karyawan Tetap',
    lokasi: 'Kantor Pusat, Surabaya',
    emailKantor: 'admin@myhr.id',
    avatarBg: '#F59E0B',
    avatarInitial: 'RK',
  },
  'manager@myhr.id': {
    password: 'manager123',
    role: 'Manager',
    name: 'Budi Santoso',
    jabatan: 'IT Manager',
    nik: '3578011503880002',
    lahir: '15 Maret 1988',
    gender: 'Laki-laki',
    agama: 'Kristen',
    status: 'Menikah',
    hp: '+62 812-2200-0002',
    email: 'budi.santoso@gmail.com',
    alamat: 'Jl. Ketintang Baru No. 8, Surabaya',
    id: 'EMP003',
    divisi: 'Teknologi Informasi',
    pos: 'IT Manager',
    atasan: 'Ahmad Fauzi',
    join: '10 Juni 2021',
    kerja: 'Karyawan Tetap',
    lokasi: 'Kantor Pusat, Surabaya',
    emailKantor: 'manager@myhr.id',
    avatarBg: '#8B5CF6',
    avatarInitial: 'BS',
  },
  'karyawan@myhr.id': {
    password: 'karyawan123',
    role: 'Employee',
    name: 'Eko Prasetyo',
    jabatan: 'Senior Developer',
    nik: '3578012202930003',
    lahir: '22 Februari 1993',
    gender: 'Laki-laki',
    agama: 'Islam',
    status: 'Menikah',
    hp: '+62 812-3300-0003',
    email: 'eko.prasetyo@gmail.com',
    alamat: 'Jl. Nginden Semolo No. 15, Surabaya',
    id: 'EMP005',
    divisi: 'Teknologi Informasi',
    pos: 'Senior Developer',
    atasan: 'Budi Santoso',
    join: '15 Februari 2022',
    kerja: 'Karyawan Tetap',
    lokasi: 'Kantor Pusat, Surabaya',
    emailKantor: 'karyawan@myhr.id',
    avatarBg: '#EF4444',
    avatarInitial: 'EP',
  }
};

let currentUser = null;

/* ============================================================
   LOGIN
============================================================ */
function fillLogin(email, pass, role) {
  document.getElementById('login-email').value = email;
  document.getElementById('login-pass').value  = pass;
  document.getElementById('login-error').classList.add('hidden');
}

function togglePass() {
  const inp = document.getElementById('login-pass');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');

  const user = USERS[email];
  if (!user || user.password !== pass) {
    errEl.classList.remove('hidden');
    return;
  }

  errEl.classList.add('hidden');
  currentUser = { email, ...user };
  loadApp();
}

function doLogout() {
  currentUser = null;
  document.getElementById('page-login').classList.add('active');
  document.getElementById('page-app').classList.remove('active');
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value  = '';

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

/* ============================================================
   LOAD APP
============================================================ */
function loadApp() {
  const u = currentUser;

  // Show pages
  document.getElementById('page-login').classList.remove('active');
  document.getElementById('page-app').classList.add('active');

  // Set avatar helper
  function setAvatar(el, bg, initials) {
    el.style.background = bg;
    el.textContent = initials;
  }

  // Sidebar user
  setAvatar(document.getElementById('sb-avatar'), u.avatarBg, u.avatarInitial);
  document.getElementById('sb-name').textContent = u.name;

  const sbBadge = document.getElementById('sb-role-badge');
  sbBadge.textContent = u.role;
  sbBadge.className = 'role-badge ' + u.role.toLowerCase();

  // Topbar
  setAvatar(document.getElementById('top-avatar'), u.avatarBg, u.avatarInitial);
  document.getElementById('top-name').textContent = u.name;

  // Profil page
  setAvatar(document.getElementById('profil-avatar'), u.avatarBg, u.avatarInitial);
  document.getElementById('profil-name').textContent    = u.name;
  document.getElementById('profil-jabatan').textContent = u.jabatan;
  const prBadge = document.getElementById('profil-role-badge');
  prBadge.textContent = u.role;
  prBadge.className = 'role-badge ' + u.role.toLowerCase();

  document.getElementById('pf-nama').textContent = u.name;
  document.getElementById('pf-nik').textContent  = u.nik;
  document.getElementById('pf-lahir').textContent = u.lahir;
  document.getElementById('pf-gender').textContent = u.gender;
  document.getElementById('pf-agama').textContent  = u.agama;
  document.getElementById('pf-status').textContent = u.status;
  document.getElementById('pf-hp').textContent    = u.hp;
  document.getElementById('pf-email').textContent = u.email;
  document.getElementById('pf-alamat').textContent = u.alamat;
  document.getElementById('pf-id').textContent    = u.id;
  document.getElementById('pf-divisi').textContent = u.divisi;
  document.getElementById('pf-pos').textContent   = u.pos;
  document.getElementById('pf-atasan').textContent = u.atasan;
  document.getElementById('pf-join').textContent  = u.join;
  document.getElementById('pf-kerja').textContent  = u.kerja;
  document.getElementById('pf-lokasi').textContent = u.lokasi;
  document.getElementById('pf-email-kantor').textContent = u.emailKantor;

  // Role-specific nav & sections
  document.getElementById('nav-admin-section').classList.toggle('hidden', u.role !== 'Admin');
  document.getElementById('nav-manager-section').classList.toggle('hidden', u.role !== 'Manager');

  // Admin extras on dashboard
  document.getElementById('admin-stats').classList.toggle('hidden', u.role !== 'Admin');
  document.getElementById('admin-announce-btn').classList.toggle('hidden', u.role !== 'Admin');

  // Greeting
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';
  document.getElementById('greet-text').textContent = greet + ', ' + u.name.split(' ')[0] + '! 👋';

  // Start clock
  startClock();
  navigate('dashboard');
}

/* ============================================================
   NAVIGATION
============================================================ */
const PAGE_TITLES = {
  dashboard: 'Dashboard',
  profil: 'Profil Saya',
  absensi: 'Absensi',
  cuti: 'Pengajuan Cuti',
  payroll: 'Slip Gaji',
  pengumuman: 'Pengumuman',
  direktori: 'Direktori Karyawan',
  'kelola-karyawan': 'Kelola Karyawan',
  laporan: 'Laporan & Analitik',
  pengaturan: 'Pengaturan Sistem',
  tim: 'Tim Saya',
  approval: 'Persetujuan Cuti',
};

function navigate(page) {
  // Sections
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('sec-' + page);
  if (target) target.classList.add('active');

  // Nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const activeNav = document.querySelector('[data-page="' + page + '"]');
  if (activeNav) activeNav.classList.add('active');

  // Title
  document.getElementById('page-title').textContent = PAGE_TITLES[page] || page;

  // Close mobile sidebar
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
  }

  // Scroll top
  document.querySelector('.content-area').scrollTop = 0;
}

/* ============================================================
   SIDEBAR TOGGLE
============================================================ */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('overlay');
  sb.classList.toggle('open');
  ov.classList.toggle('show');
}

/* ============================================================
   CLOCK
============================================================ */
let clockInterval = null;

function startClock() {
  if (clockInterval) clearInterval(clockInterval);
  updateClock();
  clockInterval = setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  const clockEl = document.getElementById('live-clock');
  const dateEl  = document.getElementById('live-date');
  if (clockEl) clockEl.textContent = hh + ':' + mm + ':' + ss;

  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  if (dateEl) {
    dateEl.textContent = days[now.getDay()] + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
  }
}

/* ============================================================
   ABSENSI ACTIONS
============================================================ */
let checkedIn = false;
let checkedOut = false;

function doCheckIn() {
  if (checkedIn) { showToast('Anda sudah melakukan Check-In hari ini.'); return; }
  checkedIn = true;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  document.querySelector('.checkin-status').innerHTML =
    '<span class="status-dot green" style="background:var(--green)"></span> Check-In berhasil pukul ' + hh + ':' + mm;
  showToast('✅ Check-In berhasil! Pukul ' + hh + ':' + mm + ' WIB');
}

function doCheckOut() {
  if (!checkedIn) { showToast('Anda belum melakukan Check-In.'); return; }
  if (checkedOut) { showToast('Anda sudah melakukan Check-Out hari ini.'); return; }
  checkedOut = true;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  document.querySelector('.checkin-status').innerHTML =
    '<span class="status-dot" style="background:var(--orange)"></span> Check-Out berhasil pukul ' + hh + ':' + mm;
  showToast('✅ Check-Out berhasil! Pukul ' + hh + ':' + mm + ' WIB. Selamat beristirahat!');
}

/* ============================================================
   TOAST
============================================================ */
let toastTimeout = null;

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.add('hidden'), 3500);
}

/* ============================================================
   KEYBOARD: Enter on login
============================================================ */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const loginPage = document.getElementById('page-login');
    if (loginPage.classList.contains('active')) doLogin();
  }
});
