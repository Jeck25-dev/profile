# EduGate — PPDB Online Website (Demo)

## Struktur File

```
ppdb-website/
│
├── index.html                  ← Landing Page (Beranda Publik)
├── login.html                  ← Login & Register (Siswa / Admin / Operator)
│
├── dashboard-siswa.html        ← Dashboard Pendaftar/Siswa
├── form-pendaftaran.html       ← Form Pendaftaran Online (Multi-step)
├── status-pendaftaran.html     ← Cek Status (Publik, tanpa login)
│
├── dashboard-admin.html        ← Dashboard Administrator
├── admin-data-pendaftar.html   ← Kelola Data Pendaftar (CRUD)
│
└── css/
    ├── global.css              ← Variabel, komponen, utilitas bersama
    ├── index.css               ← Gaya halaman Landing Page
    ├── login.css               ← Gaya halaman Login/Register
    ├── dashboard-siswa.css     ← Layout sidebar + dashboard siswa
    ├── form-pendaftaran.css    ← Form multi-step pendaftaran
    ├── status-pendaftaran.css  ← Halaman cek status publik
    ├── dashboard-admin.css     ← Dashboard admin (statistik, chart)
    └── admin-data-pendaftar.css← Tabel data, filter, modal detail
```

## Akun Demo Login (Statis)

| Role        | Username / Email    | Password  | Tujuan Halaman         |
|-------------|---------------------|-----------|------------------------|
| Pendaftar   | siswa@demo.com      | demo123   | dashboard-siswa.html   |
| Admin       | admin               | admin123  | dashboard-admin.html   |
| Operator    | operator01          | op123     | dashboard-admin.html   |

## Fitur per Halaman

### 🌐 Landing Page (index.html)
- Hero section dengan statistik real
- Marquee info berjalan
- Fitur unggulan platform
- Timeline jadwal PPDB
- Jalur penerimaan (Zonasi, Prestasi, Afirmasi, Mutasi)
- Persyaratan dokumen
- FAQ interaktif (accordion)
- CTA & Footer lengkap

### 🔑 Login (login.html)
- 3 tab role: Pendaftar / Admin / Operator
- Form Register akun baru
- Demo credentials untuk presentasi
- Toggle show/hide password

### 👤 Dashboard Siswa (dashboard-siswa.html)
- Progress pendaftaran step-by-step
- Status card dengan nomor pendaftaran
- Info cards (jalur, dokumen, batas upload, kelengkapan)
- Quick actions
- Status dokumen per file
- Riwayat aktivitas
- Ringkasan data pendaftaran

### 📝 Form Pendaftaran (form-pendaftaran.html)
- Stepper 6 langkah
- Pilihan sekolah & jalur (radio card interaktif)
- Data pribadi + upload foto
- Data orang tua
- Nilai rapor per mapel
- Form prestasi dinamis (tambah/hapus)

### 🔍 Status Pendaftaran (status-pendaftaran.html)
- Pencarian via No. Pendaftaran / NIK / NISN
- Hasil status real-time
- Ranking posisi sementara
- Progress tahapan seleksi
- Status per dokumen
- Tabel pendaftar publik
- Papan pengumuman

### 📊 Dashboard Admin (dashboard-admin.html)
- 4 stat cards utama
- Bar chart pendaftar per hari (CSS-only)
- Donut chart distribusi jalur
- Tabel pendaftar perlu tindakan (approve/reject)
- Task list harian
- Quick access grid
- Monitoring kuota jalur

### 👥 Data Pendaftar Admin (admin-data-pendaftar.html)
- Mini stat cards filter by status
- Filter bar: cari, jalur, status, gender
- Tabel lengkap dengan sortable headers
- Bulk action (pilih banyak)
- Approve / Reject per baris
- Modal detail pendaftar lengkap
- Status dokumen per berkas
- Kirim reminder notifikasi
- Ekspor Excel (demo)
- Pagination

## Cara Pakai Demo
1. Buka `index.html` di browser
2. Klik **"Daftar Sekarang"** atau **"Masuk"**
3. Di halaman login, klik kredensial demo untuk auto-fill
4. Pilih role dan klik tombol masuk
