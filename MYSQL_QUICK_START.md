# ⚡ MYSQL (XAMPP) - QUICK START GUIDE

Setup MySQL XAMPP dalam 10 menit! Database lokal untuk portofolio Anda.

---

## 🎯 **APA YANG SUDAH DISIAPKAN?**

✅ **File MySQL yang sudah dibuat:**
```
✅ lib/mysql.ts                      # MySQL connection utility
✅ database/schema.sql               # Database schema (6 tables)
✅ scripts/migrateToMySQL.ts         # Migration script JSON → MySQL
✅ env.example                       # Template environment variables
✅ MYSQL_SETUP_GUIDE.md              # Panduan lengkap
```

✅ **Dependencies sudah diinstall:**
```
✅ mysql2           # MySQL driver untuk Node.js
✅ ts-node          # Run TypeScript scripts
```

---

## 🚀 **LANGKAH CEPAT (10 MENIT)**

### **STEP 1: Start XAMPP (1 menit)**

1. **Buka:** XAMPP Control Panel
2. **Start:** Apache
3. **Start:** MySQL

**Indicator harus hijau:**
```
Apache:  ●  [Running]
MySQL:   ●  [Running]
```

✅ **MySQL siap!**

---

### **STEP 2: Import Database (2 menit)**

**A. Buka phpMyAdmin:**
```
http://localhost/phpmyadmin
```

**B. Import Schema:**
1. Klik tab: **"Import"**
2. **Choose File:** `database/schema.sql` (dari folder proyek)
3. Klik: **"Import"**

✅ **Database `portfolio_db` dan 6 tables dibuat!**

**Verify:**
- Klik database `portfolio_db`
- Lihat 6 tables: `users`, `home`, `home_stats`, `about`, `skills`, `projects`

---

### **STEP 3: Setup .env.local (1 menit)**

**A. Copy Template:**
```bash
copy env.example .env.local
```

**B. Edit .env.local:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio_db
```

⚠️ **Default XAMPP:** password kosong (blank)

---

### **STEP 4: Migrate Data (1 menit)**

Run migration script:

```bash
npx ts-node scripts/migrateToMySQL.ts
```

**Output:**
```
✅ Connected to MySQL
✅ Home section migrated (4 stats)
✅ About section migrated
✅ 12 skills migrated
✅ 3 projects migrated
✅ 1 users migrated

🎉 Migration completed successfully!
```

✅ **Data berhasil di-migrate!**

---

### **STEP 5: Verify Data (1 menit)**

**Kembali ke phpMyAdmin:**

1. Pilih database: `portfolio_db`
2. Klik table `skills` → Lihat 12 rows
3. Klik table `projects` → Lihat 3 rows
4. Klik table `users` → Lihat 1 row

✅ **Semua data tersimpan!**

---

### **STEP 6: Test Koneksi (1 menit)**

```bash
npm run dev
```

Buka: `http://localhost:3000`

⚠️ **Catatan:** Website masih pakai JSON. Untuk full MySQL, perlu update API routes.

---

## 🔧 **NEXT STEP: Update API Routes untuk MySQL**

API routes saat ini masih pakai `lib/dbHelper.ts` (JSON).

**Katakan:**
```
"Buatkan API routes untuk MySQL"
```

Saya akan generate semua API routes yang connect ke MySQL! 🚀

---

## ✅ **Checklist**

- [ ] Start XAMPP MySQL
- [ ] Import `database/schema.sql` via phpMyAdmin
- [ ] Copy `env.example` → `.env.local`
- [ ] Run migration: `npx ts-node scripts/migrateToMySQL.ts`
- [ ] Verify data di phpMyAdmin
- [ ] (Optional) Update API routes untuk MySQL

---

## 🎊 **SELESAI!**

MySQL database siap! Data sudah di-migrate dari JSON.

**Benefits:**
- ✅ Database lokal (gratis & cepat)
- ✅ phpMyAdmin untuk manage data
- ✅ Production-ready
- ✅ Bisa deploy ke hosting MySQL nanti

**Next:**
1. Update API routes (katakan "buatkan API routes MySQL")
2. Test admin panel full CRUD
3. Deploy ke hosting dengan MySQL (InfinityFree, dll)

---

**Lihat panduan lengkap:** `MYSQL_SETUP_GUIDE.md`

**Need Help?** Tanya saya! 😊

© 2025 Taji Jadda Giras Sentosa
