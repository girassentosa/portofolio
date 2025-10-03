# 📥 Cara Import Database ke InfinityFree

## 📁 File yang Harus Di-Import:

**File:** `database/portfolio_complete.sql`

File ini sudah berisi:
- ✅ Struktur tabel (CREATE TABLE)
- ✅ Data lengkap (semua data dari db.json)
- ✅ Siap langsung dipakai

---

## 🔧 Langkah-Langkah Import:

### **STEP 1: Login ke InfinityFree cPanel**
1. Buka dashboard InfinityFree
2. Klik **Control Panel** atau **cPanel**

---

### **STEP 2: Buat Database MySQL**
1. Di cPanel, cari **MySQL Databases**
2. Klik **Create Database**
3. Buat nama database, contoh:
   ```
   id12345_portfolio
   ```
4. Klik **Create Database**
5. **CATAT NAMA DATABASE INI!**

---

### **STEP 3: Buat User Database**
1. Masih di halaman yang sama, scroll ke **MySQL Users**
2. Klik **Create User**
3. Isi:
   - **Username:** `portfolio_user` (atau terserah)
   - **Password:** (buat password kuat)
4. Klik **Create User**
5. **CATAT USERNAME & PASSWORD INI!**

---

### **STEP 4: Hubungkan User ke Database**
1. Scroll ke **Add User to Database**
2. Pilih:
   - **User:** user yang baru dibuat
   - **Database:** database yang baru dibuat
3. Klik **Add**
4. Di halaman berikutnya, centang **ALL PRIVILEGES**
5. Klik **Make Changes**

---

### **STEP 5: Import File SQL**
1. Kembali ke cPanel
2. Cari dan klik **phpMyAdmin**
3. Di phpMyAdmin:
   - Klik nama database Anda di sidebar kiri (contoh: `id12345_portfolio`)
   - Klik tab **Import** di menu atas
   - Klik **Choose File** atau **Browse**
   - Pilih file: `database/portfolio_complete.sql`
   - Scroll ke bawah
   - Klik **Go** atau **Import**

4. Tunggu proses import selesai
5. Jika berhasil, akan muncul pesan:
   ```
   Import has been successfully finished
   ```

---

### **STEP 6: Verifikasi Data**
1. Di phpMyAdmin, klik database Anda
2. Anda akan melihat 6 tabel:
   - ✅ `users` (1 row)
   - ✅ `home` (1 row)
   - ✅ `home_stats` (4 rows)
   - ✅ `about` (1 row)
   - ✅ `skills` (14 rows)
   - ✅ `projects` (6 rows)

3. Klik salah satu tabel, lalu klik **Browse** untuk melihat data
4. Data harus sudah terisi lengkap!

---

### **STEP 7: Konfigurasi Environment Variables**

Setelah database berhasil di-import, buat file `.env.local` di server:

1. Buka **File Manager** di cPanel InfinityFree
2. Navigate ke folder project Anda (biasanya `htdocs` atau `public_html`)
3. Klik **+ File** untuk buat file baru
4. Nama file: `.env.local`
5. Edit file tersebut dan isi dengan:

```env
DB_HOST=localhost
DB_USER=id12345_portfolio_user
DB_PASSWORD=password_anda
DB_NAME=id12345_portfolio
```

**⚠️ PENTING:** Ganti dengan kredensial yang Anda catat di STEP 2-4!

---

## ✅ Selesai!

Database Anda sudah siap digunakan dengan data lengkap:

### Data yang Sudah Terisi:
- 👤 **Admin User**
  - Username: `admin`
  - Password: `admin123` (MD5: `5f4dcc3b5aa765d61d8327deb882cf99`)

- 🏠 **Home Section** (sudah terisi)
- 📊 **4 Stats** (Pengalaman, Bahasa Utama, Total Proyek, IPK)
- 👨‍💻 **About Section** (Who Am I, My Approach, Personal Info)
- 💡 **14 Skills** (VSCode, React, Next.js, Tailwind, dll)
- 🚀 **6 Projects** (Dashboard, E-Commerce, Task Management, dll)

---

## 🔐 Login Admin Panel

Setelah deploy:
1. Buka website Anda
2. Navigate ke: `https://yoursite.com/admin/login`
3. Login dengan:
   - **Username:** `admin`
   - **Password:** `admin123`
4. ⚠️ **GANTI PASSWORD** setelah login pertama kali!

---

## 🐛 Troubleshooting

### Error: "Access Denied"
- Cek kredensial di `.env.local`
- Pastikan user sudah di-assign ke database dengan ALL PRIVILEGES

### Error: "Table doesn't exist"
- Import ulang file `portfolio_complete.sql`
- Pastikan tidak ada error saat import

### Error: "Unknown database"
- Cek nama database di `.env.local`
- Pastikan nama database sesuai dengan yang dibuat di STEP 2

---

## 📞 Catatan Penting

1. **Backup Database** secara berkala:
   - Di phpMyAdmin → Export → Go

2. **Ganti Password Admin** setelah deploy:
   - Login → Dashboard → Edit password

3. **Jangan share** kredensial database ke siapapun

---

**Status:** ✅ Ready to Import
**File:** `database/portfolio_complete.sql`
**Total Data:** 27 records (1 user + 1 home + 4 stats + 1 about + 14 skills + 6 projects)
