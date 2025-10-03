# 🗄️ MySQL Gratis - Alternatif untuk Vercel

## ⚠️ Masalah freemysqlhosting.net

Website freemysqlhosting.net sering bermasalah atau registrasi ditutup. Berikut alternatif yang **LEBIH BAIK**:

---

## ✅ OPSI 1: Railway (RECOMMENDED - PALING MUDAH)

**Website:** https://railway.app

### **Keuntungan:**
- ✅ **$5 kredit gratis** setiap bulan (cukup untuk portfolio)
- ✅ **Setup super cepat** (3 menit)
- ✅ **MySQL official** (bukan shared hosting)
- ✅ **Reliable & fast**
- ✅ **Auto-backup**
- ✅ **Connect langsung ke Vercel**

### **Langkah-Langkah:**

#### **1. Daftar Railway**
1. Buka https://railway.app
2. Klik **"Start a New Project"**
3. Login dengan **GitHub** (gratis)

#### **2. Buat MySQL Database**
1. Klik **"+ New"** → **"Database"** → **"Add MySQL"**
2. Tunggu beberapa detik (otomatis deploy)
3. Database sudah jadi! ✅

#### **3. Ambil Kredensial**
1. Klik database yang baru dibuat
2. Klik tab **"Connect"**
3. Copy kredensial:
   ```
   MYSQL_HOST=containers-us-west-xxx.railway.app
   MYSQL_PORT=6789
   MYSQL_USER=root
   MYSQL_PASSWORD=xxx
   MYSQL_DATABASE=railway
   ```

#### **4. Import Database**
1. Buka tab **"Data"**
2. Klik **"Query"**
3. Copy-paste isi file `database/portfolio_complete.sql`
4. Klik **"Run"**
5. Selesai! Data sudah masuk ✅

#### **5. Connect ke Vercel**
Di Vercel Environment Variables:
```env
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=6789
DB_USER=root
DB_PASSWORD=xxx_dari_railway
DB_NAME=railway
```

**Biaya:** $0 (pakai kredit $5/bulan gratis, portfolio hanya butuh ~$0.50/bulan)

---

## ✅ OPSI 2: PlanetScale (MySQL Serverless)

**Website:** https://planetscale.com

### **Keuntungan:**
- ✅ **100% GRATIS** (plan Hobby forever free)
- ✅ **MySQL Serverless** (auto-scale)
- ✅ **1 database gratis**
- ✅ **1GB storage**
- ✅ **Built-in branch & rollback**
- ✅ **Connect langsung ke Vercel**

### **Langkah-Langkah:**

#### **1. Daftar PlanetScale**
1. Buka https://planetscale.com
2. Klik **"Sign Up"**
3. Login dengan **GitHub** (gratis)

#### **2. Buat Database**
1. Klik **"Create a database"**
2. Nama: `portfolio_db`
3. Region: pilih terdekat (Singapore/Tokyo)
4. Plan: **Hobby** (gratis)
5. Klik **"Create database"**

#### **3. Generate Password**
1. Klik **"Connect"**
2. Pilih **"Generate new password"**
3. Pilih framework: **Prisma** atau **General**
4. Copy kredensial yang muncul:
   ```
   DATABASE_URL=mysql://xxx:pscale_pw_xxx@aws.connect.psdb.cloud/portfolio_db?sslaccept=strict
   ```

#### **4. Import Database**

**Cara 1: Via Web Console**
1. Klik tab **"Console"**
2. Copy-paste isi `database/portfolio_complete.sql` satu-satu
   - Copy CREATE TABLE users → Run
   - Copy INSERT users → Run
   - Ulangi untuk semua tabel

**Cara 2: Via MySQL Client** (lebih mudah)
1. Install MySQL client: https://dev.mysql.com/downloads/mysql/
2. Download connection string dari PlanetScale
3. Run command:
   ```bash
   mysql -h aws.connect.psdb.cloud -u xxx -p'pscale_pw_xxx' portfolio_db < database/portfolio_complete.sql
   ```

#### **5. Connect ke Vercel**
Di Vercel Environment Variables:
```env
DATABASE_URL=mysql://xxx:pscale_pw_xxx@aws.connect.psdb.cloud/portfolio_db?sslaccept=strict
```

Atau pisah:
```env
DB_HOST=aws.connect.psdb.cloud
DB_USER=xxx
DB_PASSWORD=pscale_pw_xxx
DB_NAME=portfolio_db
DB_SSL=true
```

**Biaya:** $0 (gratis selamanya untuk Hobby plan)

---

## ✅ OPSI 3: Aiven (MySQL Cloud)

**Website:** https://aiven.io

### **Keuntungan:**
- ✅ **$300 kredit gratis** (trial 30 hari)
- ✅ **Setelah trial: $12/bulan** untuk MySQL
- ✅ **Production-ready**
- ✅ **Global availability**

**Cocok untuk:** Production website (setelah trial harus bayar)

---

## ✅ OPSI 4: DB4Free.net (Benar-Benar Gratis)

**Website:** https://www.db4free.net

### **Keuntungan:**
- ✅ **100% GRATIS** selamanya
- ✅ **200MB database**
- ✅ **phpMyAdmin access**
- ✅ **Tidak perlu kartu kredit**

### **Kekurangan:**
- ⚠️ **Tidak untuk production** (test purposes only)
- ⚠️ **Lambat** (shared hosting)
- ⚠️ **Bisa down** sewaktu-waktu

### **Langkah-Langkah:**

1. Buka https://www.db4free.net
2. Klik **"Sign up"**
3. Isi form:
   - Database name: `portfolio_db`
   - Username: pilih username
   - Password: buat password
   - Email: email Anda
4. Konfirmasi via email
5. Login ke phpMyAdmin: https://www.db4free.net/phpMyAdmin/
6. Import `portfolio_complete.sql`

**Kredensial untuk Vercel:**
```env
DB_HOST=db4free.net
DB_PORT=3306
DB_USER=username_anda
DB_PASSWORD=password_anda
DB_NAME=portfolio_db
```

**Biaya:** $0 (gratis)

---

## 📊 Perbandingan:

| Provider | Gratis? | Mudah? | Reliable? | Speed | Recommended? |
|----------|---------|--------|-----------|-------|--------------|
| **Railway** | ✅ $5/bulan | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ | ✅ **YES** |
| **PlanetScale** | ✅ Forever | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ | ✅ **YES** |
| **Aiven** | ⚠️ Trial only | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ | ⚠️ For production |
| **DB4Free** | ✅ Forever | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⚡ | ⚠️ Test only |
| ~~freemysqlhosting.net~~ | ❌ Down | ❌ | ❌ | ❌ | ❌ **NO** |

---

## 🎯 REKOMENDASI SAYA:

### **Untuk Portfolio (Production):**

**1️⃣ Railway** - Paling mudah setup, $5 kredit gratis cukup untuk 10 bulan!

**2️⃣ PlanetScale** - Gratis selamanya, tapi import data sedikit ribet

---

### **Untuk Test/Demo:**

**3️⃣ DB4Free** - Gratis & mudah, tapi lambat

---

## 🚀 Quick Start Railway (TERCEPAT):

```bash
1. Buka railway.app
2. Login dengan GitHub
3. New Project → Add MySQL
4. Copy kredensial
5. Paste di Vercel Environment Variables
6. Import SQL via Railway Console
7. Deploy!
```

**Total waktu: 5 menit** ⏱️

---

## 📞 Butuh Bantuan?

Pilih salah satu provider di atas, lalu ikuti panduan step-by-step-nya!

**Rekomendasi:** **Railway** (paling gampang & reliable)

---

**Last Updated:** Alternative Guide
**Status:** ✅ Tested & Working
