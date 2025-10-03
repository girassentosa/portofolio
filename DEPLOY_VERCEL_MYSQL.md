# 🚀 DEPLOY NEXT.JS + MYSQL KE VERCEL

**Solusi Terbaik:** Vercel (Frontend) + MySQL Remote (Backend)

---

## 🎯 **ARCHITECTURE:**

```
┌─────────────────────────────────────────────────┐
│  VERCEL (Frontend + API Routes)                 │
│  - Next.js App                                  │
│  - Server-side Rendering                        │
│  - API Routes                                   │
└─────────────────────────────────────────────────┘
              ↓ Connect via Internet
┌─────────────────────────────────────────────────┐
│  MySQL Database (Remote)                        │
│  - FreeMySQLHosting.net (GRATIS)               │
│  - atau Database hosting lain                   │
└─────────────────────────────────────────────────┐
```

---

## 📋 **STEP-BY-STEP DEPLOYMENT:**

### **STEP 1: Setup Remote MySQL Database (10 menit)**

Karena Vercel tidak include MySQL gratis, kita pakai **FreeMySQLHosting.net**:

#### **A. Daftar FreeMySQLHosting (Gratis)**

1. **Kunjungi:** https://www.freemysqlhosting.net
2. **Sign Up** dengan email Anda
3. **Verify email** dan login

#### **B. Create Database**

1. Dashboard → **"Create Database"**
2. **Database Name:** `sql_yourname_portfolio`
3. **Username:** (auto-generated)
4. **Password:** (auto-generated)
5. Klik: **"Create"**

**Copy credentials:**
```
Server: sqlXXX.freemysqlhosting.net
Database: sql12345_portfolio
Username: sql12345
Password: abcd1234
Port: 3306
```

⚠️ **SIMPAN CREDENTIALS INI!**

#### **C. Import Database Schema**

1. Dashboard → **phpMyAdmin** (klik link)
2. Login dengan credentials di atas
3. Pilih database Anda
4. Tab **"Import"**
5. Choose File → `database/schema.sql`
6. Klik: **"Go"**

✅ **6 tables created!**

#### **D. Import Data dari XAMPP**

**Option 1: Export dari XAMPP → Import ke Remote**

1. **Export dari XAMPP:**
   - Buka phpMyAdmin lokal: `http://localhost/phpmyadmin`
   - Pilih database `portfolio_db`
   - Tab "Export" → Format: SQL
   - Centang: "Data" only (tidak perlu structure)
   - Download file: `portfolio_db.sql`

2. **Import ke Remote:**
   - Buka phpMyAdmin remote (FreeMySQLHosting)
   - Pilih database Anda
   - Tab "Import"
   - Choose file: `portfolio_db.sql`
   - Import!

**Option 2: Manual Copy Data**

Atau jalankan migration lagi dengan credentials remote:

Edit `.env.local`:
```env
DB_HOST=sqlXXX.freemysqlhosting.net
DB_USER=sql12345
DB_PASSWORD=abcd1234
DB_NAME=sql12345_portfolio
```

Run:
```bash
npx ts-node scripts/migrateToMySQL.ts
```

✅ **Data ter-copy ke remote database!**

---

### **STEP 2: Push ke GitHub (5 menit)**

#### **A. Buat GitHub Repository**

1. https://github.com/new
2. **Repository name:** `portofolio-diri`
3. **Visibility:** Public (atau Private)
4. **JANGAN centang:** README, .gitignore, License
5. Klik: **"Create repository"**

Copy URL: `https://github.com/USERNAME/portofolio-diri.git`

#### **B. Push ke GitHub**

Di terminal proyek:

```bash
# Add remote
git remote add origin https://github.com/USERNAME/portofolio-diri.git

# Push
git push -u origin main
```

**Login GitHub:**
- Username: username GitHub
- Password: Personal Access Token (bukan password akun!)

**Cara buat PAT:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Centang: `repo` (all)
5. Generate & copy token
6. Paste sebagai password

✅ **Code pushed to GitHub!**

---

### **STEP 3: Deploy ke Vercel (5 menit)**

#### **A. Login Vercel**

1. https://vercel.com/signup
2. **"Continue with GitHub"**
3. Authorize Vercel

#### **B. Import Project**

1. Dashboard → **"Add New Project"**
2. **"Import Git Repository"**
3. Pilih repository: `portofolio-diri`
4. Klik: **"Import"**

#### **C. Configure Project**

```
Framework Preset:     Next.js ✅ (auto-detected)
Root Directory:       ./ (default)
Build Command:        npm run build (auto)
Output Directory:     .next (auto)
Install Command:      npm install (auto)
Node.js Version:      20.x (default)
```

#### **D. Add Environment Variables**

**PENTING!** Tambahkan database credentials:

```
Key: DB_HOST
Value: sqlXXX.freemysqlhosting.net

Key: DB_USER
Value: sql12345

Key: DB_PASSWORD
Value: abcd1234

Key: DB_NAME
Value: sql12345_portfolio
```

**Untuk setiap variable:**
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Klik: "Add"

#### **E. Deploy!**

Klik: **"Deploy"**

⏳ **Tunggu 2-3 menit...**

🎉 **DEPLOYMENT SUCCESS!**

Your site: `https://portofolio-diri-username.vercel.app`

---

### **STEP 4: Test Website Live (2 menit)**

1. **Buka URL Vercel** Anda
2. **Test halaman utama:**
   - Loading screen ✅
   - Home, About, Skills, Projects, Contact ✅
   - Animasi berjalan ✅

3. **Test Admin Panel:**
   - `/admin/login` ✅
   - Login dengan user dari database ✅
   - Dashboard tampil ✅
   - Test CRUD (tambah/edit/hapus data) ✅
   - Refresh → Data tetap ada! ✅

✅ **Website LIVE dan berfungsi penuh!**

---

### **STEP 5: Custom Domain (Optional)**

#### **Domain Gratis dari Vercel:**

1. Vercel Dashboard → Settings → Domains
2. Ganti dari: `portofolio-diri-username.vercel.app`
3. Menjadi: `tajijadda.vercel.app` (atau nama Anda)
4. Save!

#### **Domain Berbayar (Jika Punya):**

1. Beli domain: Niagahoster, Rumahweb, Namecheap, dll
2. Vercel → Settings → Domains → Add
3. Masukkan: `yourdomain.com`
4. Update DNS di registrar:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
5. Tunggu propagasi (5-10 menit)
6. SSL otomatis aktif! 🔒

---

## 🎯 **TROUBLESHOOTING:**

### **Error: API Routes tidak connect ke database**

**Penyebab:** Environment variables belum diset

**Solusi:**
1. Vercel Dashboard → Settings → Environment Variables
2. Pastikan 4 variables ada (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
3. Redeploy: Deployments → ⋯ → Redeploy

---

### **Error: "connect ETIMEDOUT"**

**Penyebab:** Remote MySQL tidak allow koneksi dari Vercel

**Solusi:**
1. Cek Firewall di FreeMySQLHosting
2. Atau ganti ke database lain:
   - **PlanetScale** (gratis, serverless MySQL)
   - **Railway** (free tier)
   - **Neon** (PostgreSQL gratis)

---

### **Data tidak muncul di website**

**Penyebab:** Data belum di-import ke remote database

**Solusi:**
1. Export data dari XAMPP (phpMyAdmin → Export)
2. Import ke remote database (phpMyAdmin → Import)
3. Atau run migration dengan remote credentials

---

## 📊 **ALTERNATIVE: PlanetScale (MySQL Serverless - Gratis)**

Jika FreeMySQLHosting bermasalah, pakai **PlanetScale**:

### **Setup PlanetScale:**

1. **Sign Up:** https://planetscale.com
2. **Create Database:** `portfolio-db`
3. **Get Connection String:**
   ```
   mysql://user:pass@aws.connect.psdb.cloud/portfolio-db?sslaccept=strict
   ```
4. **Add to Vercel Env Vars:**
   ```
   DATABASE_URL=mysql://user:pass@...
   ```
5. **Update lib/mysql.ts** untuk pakai `DATABASE_URL`

---

## ✅ **CHECKLIST DEPLOYMENT:**

- [ ] Setup remote MySQL database
- [ ] Import schema.sql
- [ ] Import data dari XAMPP
- [ ] Push ke GitHub
- [ ] Deploy ke Vercel
- [ ] Add environment variables
- [ ] Test website live
- [ ] Test admin panel
- [ ] (Optional) Setup custom domain

---

## 🎊 **CONGRATULATIONS!**

Website Anda sekarang **LIVE di Internet**!

**URL:** `https://your-portfolio.vercel.app`

**Features:**
- ✅ Loading screen & animations
- ✅ Responsive design
- ✅ Admin panel full CRUD
- ✅ Data persisten (MySQL)
- ✅ SSL/HTTPS
- ✅ Auto-deploy (Git push = deploy!)
- ✅ Gratis selamanya!

---

**Need Help?** Tanya saya! 😊

© 2025 Taji Jadda Giras Sentosa
