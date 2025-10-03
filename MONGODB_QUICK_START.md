# ⚡ MONGODB ATLAS - QUICK START GUIDE

Setup MongoDB Atlas dalam 15 menit! Database cloud gratis untuk portofolio Anda.

---

## 🎯 **APA YANG SUDAH DISIAPKAN?**

✅ **File MongoDB yang sudah dibuat:**
```
✅ lib/mongodb.ts                    # MongoDB connection utility
✅ lib/models/User.ts                # User model (authentication)
✅ lib/models/Portfolio.ts           # Portfolio models (Home, About, Skills, Projects)
✅ scripts/migrateToMongoDB.ts       # Migration script dari JSON ke MongoDB
✅ env.example                       # Template environment variables
✅ MONGODB_SETUP_GUIDE.md            # Panduan lengkap setup
```

✅ **Dependencies sudah diinstall:**
```
✅ mongoose          # MongoDB ODM
✅ ts-node           # Run TypeScript scripts
✅ @types/node       # TypeScript types
```

---

## 🚀 **LANGKAH CEPAT (15 MENIT)**

### **STEP 1: Buat Akun MongoDB Atlas (3 menit)**

1. **Kunjungi:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** dengan Google (paling cepat)
3. **Create Organization:** `Portfolio`
4. **Create Project:** `Portfolio Database`

---

### **STEP 2: Deploy Free Cluster (5 menit)**

1. Klik: **"Build a Database"**
2. Pilih: **"M0 FREE"** (Gratis Selamanya!)
   ```
   ✅ 512 MB Storage
   ✅ Free Forever
   ```
3. **Cloud Provider:** AWS (atau Google Cloud)
4. **Region:** Singapore/Jakarta (terdekat dengan Indonesia)
5. **Cluster Name:** `Cluster0` (default)
6. Klik: **"Create"**

⏳ **Tunggu 1-3 menit** cluster dibuat...

---

### **STEP 3: Setup Security (2 menit)**

Setelah cluster dibuat, akan muncul popup:

**A. Create Database User:**
```
Username: tajijadda           (ganti dengan nama Anda)
Password: [Auto-generate]     (atau buat sendiri)
```
⚠️ **SIMPAN PASSWORD INI!**

Klik: "Create User"

**B. Network Access:**
```
Pilih: "Allow Access from Anywhere" (0.0.0.0/0)
```
Klik: "Add Entry" → "Finish and Close"

---

### **STEP 4: Get Connection String (1 menit)**

1. Di dashboard cluster, klik: **"Connect"**
2. Pilih: **"Connect your application"**
3. **Driver:** Node.js, **Version:** 5.5 or later
4. **Copy** connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

**Edit Connection String:**
```
SEBELUM:
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

SESUDAH (contoh):
mongodb+srv://tajijadda:MyPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Perubahan:**
- Ganti `<username>` dengan username database Anda
- Ganti `<password>` dengan password database Anda
- Tambah `/portfolio` setelah `.net` (nama database)

⚠️ **COPY & SIMPAN CONNECTION STRING INI!**

---

### **STEP 5: Setup .env.local (1 menit)**

1. **Copy** file `env.example` menjadi `.env.local`:
   ```bash
   copy env.example .env.local
   ```
   Atau di Git Bash/Mac/Linux:
   ```bash
   cp env.example .env.local
   ```

2. **Edit** file `.env.local`, paste connection string Anda:
   ```env
   MONGODB_URI=mongodb+srv://tajijadda:MyPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

3. **Save** file

---

### **STEP 6: Migrate Data ke MongoDB (1 menit)**

Run migration script untuk transfer data dari `lib/db.json` ke MongoDB:

```bash
npx ts-node scripts/migrateToMongoDB.ts
```

**Output yang diharapkan:**
```
🚀 Starting migration from JSON to MongoDB...
✅ Connected to MongoDB
✅ Home section migrated
✅ About section migrated
✅ 12 skills migrated
✅ 3 projects migrated
✅ 1 users migrated

🎉 Migration completed successfully!
```

✅ **Data berhasil di-migrate!**

---

### **STEP 7: Verify Data di MongoDB Atlas (1 menit)**

1. Kembali ke **MongoDB Atlas Dashboard**
2. Klik: **"Browse Collections"** (pada cluster Anda)
3. Pilih database: **"portfolio"**
4. Lihat collections:
   ```
   ✅ homes       (1 document)
   ✅ abouts      (1 document)
   ✅ skills      (12 documents)
   ✅ projects    (3 documents)
   ✅ users       (1 document)
   ```

✅ **Data berhasil tersimpan di MongoDB!**

---

### **STEP 8: Test di Local (1 menit)**

```bash
npm run dev
```

1. Buka: `http://localhost:3000`
2. Test admin panel: `http://localhost:3000/admin/login`
3. Login dengan user yang sudah di-migrate
4. Test CRUD operations (tambah/edit/hapus skills/projects)
5. Refresh page → **Data tetap ada!** ✅

---

## 🎉 **SELESAI!**

✅ MongoDB Atlas sudah setup  
✅ Data sudah di-migrate  
✅ Admin panel full CRUD berfungsi  
✅ Data persisten (tidak hilang saat restart)  

---

## 📋 **NEXT STEP: Deploy ke Vercel**

### **A. Commit & Push ke GitHub:**

```bash
git add .
git commit -m "Upgrade to MongoDB Atlas database"
git push origin main
```

### **B. Setup Environment Variable di Vercel:**

1. Push ke GitHub (jika belum)
2. Deploy ke Vercel (atau buka existing project)
3. **Vercel Dashboard** → Project Settings → **Environment Variables**
4. Add variable:
   ```
   Key:   MONGODB_URI
   Value: mongodb+srv://... (paste connection string Anda)
   
   Environments:
   ✅ Production
   ✅ Preview
   ✅ Development
   ```
5. Klik: "Save"
6. **Redeploy** (otomatis atau manual dari Vercel Dashboard)

### **C. Test Live Website:**

1. Website Anda: `https://your-portfolio.vercel.app`
2. Admin panel: `https://your-portfolio.vercel.app/admin/login`
3. Login dan test CRUD
4. **Data persisten!** ✅

---

## 🔥 **BENEFITS MongoDB vs JSON**

| Feature | JSON File | MongoDB Atlas |
|---------|-----------|---------------|
| **Data Persisten** | ❌ Hilang saat redeploy | ✅ Permanen |
| **Admin CRUD** | ❌ Tidak berfungsi | ✅ Full CRUD |
| **Scalability** | ❌ Limited | ✅ Unlimited |
| **Backup** | ❌ Manual | ✅ Auto (paid) |
| **Security** | ⚠️ File-based | ✅ Encrypted |
| **Production Ready** | ❌ No | ✅ Yes |
| **Cost** | ✅ Free | ✅ Free (512MB) |

---

## 🆘 **Troubleshooting**

### ❌ **Error: "MONGODB_URI not found"**
✅ Pastikan file `.env.local` ada di root proyek  
✅ Pastikan isi `MONGODB_URI=mongodb+srv://...`

### ❌ **Error: "Authentication failed"**
✅ Cek username & password di connection string  
✅ Cek password tidak ada special characters (atau encode)

### ❌ **Error: "Network timeout"**
✅ Cek internet connection  
✅ Cek IP Whitelist di MongoDB Atlas (0.0.0.0/0)

### ❌ **Migration gagal**
✅ Pastikan `lib/db.json` ada dan valid  
✅ Cek connection string benar

---

## 📚 **Dokumentasi Lengkap**

Lihat: **`MONGODB_SETUP_GUIDE.md`** untuk panduan detail.

---

## ✅ **Checklist**

- [ ] Buat akun MongoDB Atlas
- [ ] Deploy M0 Free Cluster
- [ ] Setup database user & password
- [ ] Whitelist IP (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Buat file `.env.local`
- [ ] Run migration script
- [ ] Verify data di MongoDB Atlas
- [ ] Test di local (npm run dev)
- [ ] Push ke GitHub
- [ ] Add env var di Vercel
- [ ] Deploy ke production
- [ ] Test live website

---

## 🎊 **CONGRATULATIONS!**

Portofolio Anda sekarang menggunakan database cloud production-ready! 🚀

**What's Next?**
- Customize data via admin panel
- Add more skills/projects
- Monitor di MongoDB Atlas Dashboard
- Share portfolio link dengan dunia! 🌍

---

**Need Help?** Baca `MONGODB_SETUP_GUIDE.md` atau tanya saya! 😊

© 2025 Taji Jadda Giras Sentosa
