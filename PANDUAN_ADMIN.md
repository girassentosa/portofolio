# 📚 PANDUAN LENGKAP SISTEM ADMIN PORTOFOLIO

## 🚀 CARA MENJALANKAN

### ❗ PENTING: TIDAK PERLU XAMPP/DATABASE!

Sistem ini menggunakan **JSON Database**, jadi:
- ❌ **TIDAK PERLU** XAMPP
- ❌ **TIDAK PERLU** phpMyAdmin  
- ❌ **TIDAK PERLU** membuat database MySQL
- ✅ **HANYA PERLU** Node.js & npm (sudah terinstall)

---

## 📋 LANGKAH MENJALANKAN (SANGAT MUDAH!)

### 1️⃣ Buka Terminal/CMD di folder project
```bash
cd C:\xampp\htdocs\portofolio-diri
```

### 2️⃣ Jalankan development server
```bash
npm run dev
```

### 3️⃣ Tunggu sampai muncul pesan:
```
✓ Ready in 2.5s
○ Local:    http://localhost:3000
○ Network:  http://192.168.x.x:3000
```

### 4️⃣ Buka browser dan akses:
- **Portofolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login

---

## 🔐 LOGIN PERTAMA KALI

### Akun Default:
```
Username: admin
Password: password
```

**⚠️ PENTING:** Setelah login pertama, segera buat akun baru atau ganti password!

---

## 🎯 CARA MENGGUNAKAN ADMIN PANEL

### A. LOGIN
1. Buka: http://localhost:3000/admin/login
2. Masukkan username: `admin`
3. Masukkan password: `password`
4. Klik **"Masuk"**
5. Otomatis redirect ke Dashboard

### B. KELOLA HOME SECTION
**URL**: http://localhost:3000/admin/dashboard/home

**Yang bisa diubah:**
- ✏️ Subtitle (Text "Halo, saya")
- ✏️ Nama Lengkap (Title utama)
- ✏️ Deskripsi/Bio
- 🖼️ Foto Profil (URL gambar)
- 📊 4 Statistik Cards (2 Tahun, JavaScript, dll)

**Cara:**
1. Edit form yang tersedia
2. Klik **"Simpan Perubahan"**
3. Data otomatis tersimpan & tampil di halaman utama

### C. KELOLA ABOUT SECTION
**URL**: http://localhost:3000/admin/dashboard/about

**Yang bisa diubah:**
- ✏️ Who Am I (Paragraf perkenalan)
- ✏️ My Approach (Pendekatan kerja)
- ✏️ Personal Info:
  - Nama Lengkap
  - Lokasi
  - Email
  - Phone
  - Pendidikan
- 🖼️ Foto About

**Cara:**
1. Edit textarea/input fields
2. Klik **"Simpan Perubahan"**
3. Langsung update di halaman About

### D. KELOLA SKILLS
**URL**: http://localhost:3000/admin/dashboard/skills

**Fitur:**
- ➕ **Tambah Skill Baru** (Klik tombol hijau)
- ✏️ **Edit Skill** (Hover → Klik icon pensil)
- 🗑️ **Hapus Skill** (Hover → Klik icon trash)

**Cara Tambah Skill:**
1. Klik tombol **"+ Tambah Skill"**
2. Isi form:
   - **Nama Skill**: e.g., "Python"
   - **Kategori**: e.g., "Programming Language"
   - **Icon URL**: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg
   - **Warna**: Pilih dari color picker atau ketik hex (#3776AB)
3. Klik **"Tambah"**
4. Skill langsung muncul di halaman Skills!

**📌 Tips Icon:**
- Gunakan Devicons: https://devicons.github.io/devicon/
- Format: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/[nama]/[nama]-original.svg`

### E. KELOLA PROJECTS
**URL**: http://localhost:3000/admin/dashboard/projects

**Fitur:**
- ➕ **Tambah Project Baru**
- ✏️ **Edit Project**
- 🗑️ **Hapus Project**

**Cara Tambah Project:**
1. Klik tombol **"+ Tambah Project"**
2. Isi form:
   - **Judul Project**: e.g., "E-Commerce Website"
   - **Subtitle**: e.g., "Full Stack Application"
   - **Tech Stack**: e.g., "React + Node.js + MongoDB"
   - **Image URL**: Link gambar project
   - **Project URL**: Link ke GitHub/Demo
   - **Border Color**: Warna border (#3B82F6)
   - **Gradient CSS**: linear-gradient(145deg, #3B82F6, #000)
3. Klik **"Tambah"**
4. Project langsung tampil di halaman Projects!

---

## 🖼️ CARA UPLOAD GAMBAR

### Opsi 1: Upload ke Folder Public (RECOMMENDED)
```bash
1. Taruh gambar di: public/images/
2. Nama file: misalnya profile-baru.jpg
3. Di admin, isi URL: /images/profile-baru.jpg
```

### Opsi 2: Gunakan URL Eksternal
```bash
1. Upload ke: imgur.com, cloudinary, dll
2. Copy link gambar
3. Paste di form admin
```

**📌 Tips:**
- Format: JPG, PNG, WEBP
- Ukuran: Max 1MB
- Dimensi: 500x500px untuk optimal

---

## 🔄 CARA GANTI PASSWORD

### Cara 1: Buat Akun Baru (MUDAH)
1. Logout dari admin
2. Buka: http://localhost:3000/admin/register
3. Daftar dengan username & password baru
4. Login dengan akun baru

### Cara 2: Edit Manual di Database
1. Buka file: `lib/db.json`
2. Cari bagian `"users"`
3. Generate MD5 dari password baru di: https://www.md5hashgenerator.com/
4. Ganti value `"password"` dengan hash MD5
5. Save file

**Contoh:**
```json
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "5f4dcc3b5aa765d61d8327deb882cf99",  // ← Ganti ini (MD5 hash)
      "email": "admin@example.com"
    }
  ]
}
```

---

## 💾 BACKUP DATA

### Cara Backup:
```bash
1. Copy file: lib/db.json
2. Paste ke folder lain dengan nama: db-backup-[tanggal].json
3. Simpan dengan aman
```

### Cara Restore:
```bash
1. Copy file backup
2. Ganti file lib/db.json dengan file backup
3. Restart server (npm run dev)
```

---

## 🛠️ TROUBLESHOOTING

### ❌ Error: Port 3000 already in use
**Solusi:**
```bash
# Windows:
taskkill /F /IM node.exe

# Lalu jalankan ulang:
npm run dev
```

### ❌ Error: Cannot find module
**Solusi:**
```bash
npm install
npm run dev
```

### ❌ Login tidak berhasil
**Solusi:**
```bash
1. Cek username & password (case sensitive!)
2. Default: admin / password
3. Atau buat akun baru di /admin/register
```

### ❌ Data tidak tersimpan
**Solusi:**
```bash
1. Cek file lib/db.json ada & tidak read-only
2. Restart server: Ctrl+C lalu npm run dev
3. Clear browser cache (Ctrl+Shift+Delete)
```

### ❌ Gambar tidak muncul
**Solusi:**
```bash
1. Cek URL gambar benar
2. Jika file lokal, taruh di public/images/
3. Gunakan path: /images/namafile.jpg
```

---

## 🌐 DEPLOY KE PRODUCTION

### Sebelum Deploy:
1. ✅ Backup database (lib/db.json)
2. ✅ Ganti password default
3. ✅ Test semua fitur di local
4. ✅ Optimasi gambar (compress)

### Platform Deploy (Pilih salah satu):

#### Vercel (RECOMMENDED - GRATIS)
```bash
1. Install Vercel CLI:
   npm i -g vercel

2. Login:
   vercel login

3. Deploy:
   vercel

4. Follow instruksi
```

#### Netlify
```bash
1. Push ke GitHub
2. Connect di netlify.com
3. Deploy otomatis
```

---

## 📞 SUPPORT

Jika ada masalah:
1. Cek console browser (F12)
2. Cek terminal untuk error
3. Restart server
4. Clear cache browser

---

## 🎉 SELAMAT MENGGUNAKAN!

**Tips:**
- 💾 Backup database secara berkala
- 🔐 Ganti password default
- 📸 Gunakan gambar berkualitas
- 🎨 Sesuaikan warna dengan brand Anda
- ⚡ Test perubahan sebelum deploy

**Happy Managing! 🚀**

