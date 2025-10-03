# 🗄️ PANDUAN SETUP MYSQL (XAMPP) - Database Lokal

Panduan lengkap setup MySQL dengan XAMPP sebagai database portofolio Anda.

---

## ✅ **KEUNTUNGAN PAKAI MYSQL + XAMPP:**

1. ✅ **Sudah Ada di Komputer** - Tidak perlu setup cloud
2. ✅ **Gratis Selamanya** - Tidak ada limit storage
3. ✅ **Cepat** - Database lokal = super cepat
4. ✅ **Full Control** - Akses penuh ke database
5. ✅ **phpMyAdmin** - GUI untuk manage database
6. ✅ **Production Ready** - Bisa deploy ke hosting MySQL nanti

---

## 📋 **LANGKAH 1: Start XAMPP MySQL (1 menit)**

### **A. Buka XAMPP Control Panel**
1. Buka: **XAMPP Control Panel**
2. **Start** Apache (untuk phpMyAdmin)
3. **Start** MySQL

**Indicator:**
```
Apache:  [Running] (hijau)
MySQL:   [Running] (hijau)
```

✅ **MySQL siap digunakan!**

---

## 📋 **LANGKAH 2: Import Database Schema (2 menit)**

### **A. Buka phpMyAdmin**
1. Buka browser: **http://localhost/phpmyadmin**
2. Atau klik tombol **"Admin"** di samping MySQL di XAMPP

### **B. Create Database**
Pilih salah satu cara:

**Cara 1: Import Otomatis (Recommended)**
1. Klik tab: **"Import"**
2. **Choose File** → Pilih: `database/schema.sql` (dari proyek Anda)
3. Klik: **"Import"**
4. ✅ Database `portfolio_db` dan semua table otomatis dibuat!

**Cara 2: Manual**
1. Klik: **"New"** atau **"Databases"**
2. **Database name:** `portfolio_db`
3. **Collation:** `utf8mb4_unicode_ci`
4. Klik: **"Create"**
5. Pilih database `portfolio_db`
6. Klik tab: **"SQL"**
7. Copy-paste isi file `database/schema.sql`
8. Klik: **"Go"**

### **C. Verify Tables**
Setelah import, Anda akan melihat 6 tables:
```
✅ users         (untuk authentication)
✅ home          (home section content)
✅ home_stats    (stats di home)
✅ about         (about section content)
✅ skills        (daftar skills)
✅ projects      (daftar projects)
```

---

## 📋 **LANGKAH 3: Setup Environment Variables (1 menit)**

### **A. Copy Environment Template**
Di root proyek, jalankan:

**Windows (PowerShell/CMD):**
```bash
copy .env.local.example .env.local
```

**Git Bash/Mac/Linux:**
```bash
cp .env.local.example .env.local
```

### **B. Edit .env.local**
Buka file `.env.local` dan isi:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio_db
```

**Default XAMPP:**
- **Host:** `localhost`
- **User:** `root`
- **Password:** (kosong/blank)
- **Database:** `portfolio_db`

⚠️ **Jika password MySQL Anda berbeda, sesuaikan `DB_PASSWORD`**

### **C. Pastikan .env.local Ada di .gitignore**
File `.gitignore` sudah otomatis ignore `.env*.local`

---

## 📋 **LANGKAH 4: Migrate Data dari JSON ke MySQL (1 menit)**

Run migration script:

```bash
npx ts-node scripts/migrateToMySQL.ts
```

**Output yang diharapkan:**
```
🚀 Starting migration from JSON to MySQL...

📡 Connecting to MySQL...
   Host: localhost
   Database: portfolio_db
   User: root

✅ Connected to MySQL

📂 JSON data loaded

🗑️  Clearing existing data...
✅ Existing data cleared

📝 Migrating Home section...
✅ Home section migrated (4 stats)

📝 Migrating About section...
✅ About section migrated

📝 Migrating Skills...
✅ 12 skills migrated

📝 Migrating Projects...
✅ 3 projects migrated

📝 Migrating Users...
✅ 1 users migrated

🎉 Migration completed successfully!

📊 Summary:
   - Home: 1 row + 4 stats
   - About: 1 row
   - Skills: 12 rows
   - Projects: 3 rows
   - Users: 1 rows

✅ You can now use MySQL as your database!

📡 Disconnected from MySQL
```

✅ **Data berhasil di-migrate!**

---

## 📋 **LANGKAH 5: Verify Data di phpMyAdmin (1 menit)**

1. Kembali ke **phpMyAdmin**
2. Pilih database: **`portfolio_db`**
3. Klik setiap table untuk lihat data:

**users:**
```
id | username | email | password | created_at
```

**home:**
```
id | title | subtitle | description | profile_image
```

**home_stats:**
```
id | value | label | display_order
1  | 2 Tahun | Pengalaman | 0
2  | 15+ | Projects | 1
3  | 12+ | Skills | 2
4  | 100% | Dedication | 3
```

**skills:**
```
id | name | category | icon | color
1  | PHP | Backend | ... | #777BB4
... (12 skills)
```

**projects:**
```
id | title | subtitle | handle | image | ...
... (3 projects)
```

✅ **Semua data ada!**

---

## 📋 **LANGKAH 6: Test di Local (1 menit)**

⚠️ **CATATAN:** API routes masih pakai JSON (`lib/dbHelper.ts`). Anda perlu update API routes untuk pakai MySQL.

**Saya bisa bantu generate API routes baru untuk MySQL jika Anda mau!**

Untuk sekarang, test koneksi:

```bash
npm run dev
```

Website akan berjalan di: `http://localhost:3000`

---

## 📋 **LANGKAH 7: Update API Routes (Optional - Saya Bisa Bantu!)**

Untuk membuat admin panel full CRUD dengan MySQL, perlu update:

**Files yang perlu diupdate:**
```
- app/api/auth/login/route.ts
- app/api/auth/register/route.ts
- app/api/admin/home/route.ts
- app/api/admin/about/route.ts
- app/api/admin/skills/route.ts
- app/api/admin/skills/[id]/route.ts
- app/api/admin/projects/route.ts
- app/api/admin/projects/[id]/route.ts
- app/api/portfolio/route.ts
```

**Katakan:** "Buatkan API routes untuk MySQL" dan saya akan generate semua!

---

## 🌐 **LANGKAH 8: Deploy ke Hosting (Nanti)**

Ketika siap deploy, Anda bisa:

### **Opsi 1: Hosting dengan MySQL (Recommended)**
```
✅ Hostinger (Rp 20rb/bulan)
✅ Niagahoster (Rp 15rb/bulan)
✅ Rumahweb (Rp 25rb/bulan)
✅ InfinityFree (GRATIS! dengan MySQL)
```

### **Opsi 2: VPS + Deploy Node.js**
```
✅ Digital Ocean ($5/bulan)
✅ Vultr ($2.5/bulan)
✅ AWS Lightsail ($3.5/bulan)
```

**Untuk InfinityFree:**
1. Upload files via FTP
2. Export MySQL dari phpMyAdmin
3. Import ke database InfinityFree
4. Update .env dengan credentials baru
5. Done!

---

## 🔒 **Security Best Practices**

### **Development (Local):**
✅ Password MySQL bisa kosong (default XAMPP)  
✅ `.env.local` sudah di-.gitignore  

### **Production (Deploy):**
⚠️ **HARUS ganti password MySQL!**  
⚠️ Gunakan strong password  
⚠️ Jangan commit `.env.local` ke Git  
⚠️ Gunakan environment variables di hosting  

---

## 🎯 **Troubleshooting**

### **Error: "ECONNREFUSED"**
**Penyebab:** MySQL tidak running

**Solusi:**
1. ✅ Buka XAMPP Control Panel
2. ✅ Start MySQL
3. ✅ Tunggu hingga [Running] (hijau)
4. ✅ Jalankan migration lagi

---

### **Error: "ER_BAD_DB_ERROR: Unknown database"**
**Penyebab:** Database `portfolio_db` belum dibuat

**Solusi:**
1. ✅ Buka phpMyAdmin
2. ✅ Import `database/schema.sql`
3. ✅ Verify database `portfolio_db` ada
4. ✅ Jalankan migration lagi

---

### **Error: "ER_ACCESS_DENIED_ERROR"**
**Penyebab:** Username/password salah

**Solusi:**
1. ✅ Cek file `.env.local`
2. ✅ Pastikan `DB_USER=root` dan `DB_PASSWORD=` (kosong)
3. ✅ Jika pernah set password, isi `DB_PASSWORD=password_anda`

---

### **Migration Script Error**
**Penyebab:** `lib/db.json` tidak valid

**Solusi:**
1. ✅ Cek file `lib/db.json` ada
2. ✅ Pastikan format JSON valid
3. ✅ Test dengan: `cat lib/db.json` atau buka di editor

---

## 📊 **Monitoring Database**

### **phpMyAdmin:**
1. **Browse Data:**
   - Klik table → Lihat semua rows
   
2. **Run SQL Queries:**
   - Tab "SQL" → Tulis query → Go
   
3. **Export Data:**
   - Tab "Export" → Format: SQL → Go
   
4. **Import Data:**
   - Tab "Import" → Choose file → Go

### **Command Line (Optional):**
```bash
# Login ke MySQL
mysql -u root -p

# Pilih database
USE portfolio_db;

# Lihat tables
SHOW TABLES;

# Lihat data
SELECT * FROM skills;
```

---

## ✅ **Checklist Setup MySQL**

- [ ] Start XAMPP MySQL
- [ ] Buka phpMyAdmin
- [ ] Import `database/schema.sql`
- [ ] Verify 6 tables created
- [ ] Copy `.env.local.example` → `.env.local`
- [ ] Edit `.env.local` dengan credentials
- [ ] Run migration script
- [ ] Verify data di phpMyAdmin
- [ ] Test koneksi (npm run dev)
- [ ] (Optional) Update API routes untuk MySQL

---

## 🎉 **Selesai!**

Database MySQL Anda siap digunakan!

**Benefits:**
- ✅ Data persisten di database lokal
- ✅ Full CRUD (setelah update API routes)
- ✅ phpMyAdmin untuk manage data
- ✅ Gratis & unlimited storage
- ✅ Production-ready
- ✅ Mudah deploy ke hosting MySQL

**Next Steps:**
1. Update API routes untuk MySQL (saya bisa bantu!)
2. Test admin panel full CRUD
3. Deploy ke hosting dengan MySQL

---

**Need Help?** Tanya saya untuk:
- Generate API routes MySQL
- Deploy ke InfinityFree
- Troubleshooting

---

© 2025 Taji Jadda Giras Sentosa
