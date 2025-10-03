# 🗄️ PANDUAN SETUP MONGODB ATLAS (Database Cloud Gratis)

Panduan lengkap untuk setup MongoDB Atlas sebagai database portofolio Anda.

---

## 📋 **LANGKAH 1: Buat Akun MongoDB Atlas**

### **A. Registrasi**
1. Kunjungi: **https://www.mongodb.com/cloud/atlas/register**
2. Isi form registrasi:
   - Email: email Anda
   - Password: password yang kuat
   - Atau klik: "Sign up with Google"
3. Verify email Anda
4. Login ke MongoDB Atlas

### **B. Buat Organization & Project**
1. Setelah login, akan muncul: "Create an organization"
2. **Organization Name:** `Portfolio Projects`
3. Klik: "Next" → "Create Organization"
4. **Project Name:** `Portfolio Database`
5. Klik: "Next" → "Create Project"

---

## 📋 **LANGKAH 2: Deploy Cluster (Database)**

### **A. Deploy Free Cluster**
1. Klik: **"Build a Database"** (atau "Create")
2. Pilih: **"M0 FREE"** (Shared Cluster - Gratis Selamanya!)
   ```
   ✅ 512 MB Storage
   ✅ Shared RAM
   ✅ Free Forever
   ```
3. **Cloud Provider & Region:**
   - Provider: AWS (recommended)
   - Region: Pilih yang terdekat (Jakarta/Singapore untuk Indonesia)
   - Atau gunakan default
4. **Cluster Name:** `Cluster0` (default OK)
5. Klik: **"Create"** (tunggu 1-3 menit)

### **B. Setup Database User**
Setelah cluster dibuat, akan muncul:

**1. Security Quickstart - Create Database User:**
```
Username: tajijadda (ganti dengan username Anda)
Password: [Klik "Autogenerate Secure Password" atau buat sendiri]

⚠️ SIMPAN USERNAME & PASSWORD INI!
```
Klik: "Create User"

**2. Network Access - Add IP Address:**
```
Pilih: "Add My Current IP Address"
Atau untuk dev: "Allow Access from Anywhere" (0.0.0.0/0)
```
Klik: "Add Entry" → "Finish and Close"

---

## 📋 **LANGKAH 3: Dapatkan Connection String**

### **A. Get Connection String**
1. Di dashboard, klik: **"Connect"** (pada cluster Anda)
2. Pilih: **"Connect your application"**
3. **Driver:** Node.js
4. **Version:** 5.5 or later
5. Copy **Connection String:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### **B. Edit Connection String**
Ganti placeholder dengan data Anda:
```
SEBELUM:
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

SESUDAH:
mongodb+srv://tajijadda:MyPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Perubahan:**
- `<username>` → username database Anda
- `<password>` → password database Anda
- Tambah `/portfolio` setelah `.net` (nama database)

**SIMPAN CONNECTION STRING INI!** 

---

## 📋 **LANGKAH 4: Setup Environment Variables**

### **A. Buat File .env.local**
Di root proyek, buat file: `.env.local`

**Isi:**
```env
MONGODB_URI=mongodb+srv://tajijadda:MyPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

**⚠️ GANTI** dengan connection string Anda!

### **B. Tambahkan ke .gitignore**
Pastikan `.env.local` ada di `.gitignore`:
```
# .gitignore
.env.local
.env*.local
```

---

## 📋 **LANGKAH 5: Install Dependencies & Migrate Data**

### **A. Dependencies Sudah Diinstall:**
```bash
✅ mongoose (sudah diinstall)
```

### **B. Run Migration Script**
Migrate data dari `lib/db.json` ke MongoDB:

```bash
# Install ts-node (untuk run TypeScript)
npm install -D ts-node

# Run migration
npx ts-node scripts/migrateToMongoDB.ts
```

**Output yang diharapkan:**
```
🚀 Starting migration from JSON to MongoDB...
📡 Connecting to MongoDB...
✅ Connected to MongoDB

📂 JSON data loaded
🗑️  Clearing existing data...
✅ Existing data cleared

📝 Migrating Home section...
✅ Home section migrated

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
   - Home: 1 document
   - About: 1 document
   - Skills: 12 documents
   - Projects: 3 documents
   - Users: 1 documents

✅ You can now use MongoDB as your database!
```

---

## 📋 **LANGKAH 6: Update API Routes (OPSIONAL)**

Saya sudah siapkan helper functions yang support MongoDB, tapi Anda perlu update API routes.

**File yang perlu diupdate:**
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

**Saya bisa bantu generate API routes baru untuk MongoDB jika Anda mau!**

---

## 📋 **LANGKAH 7: Test di Local**

### **A. Run Development Server**
```bash
npm run dev
```

### **B. Test Admin Panel**
1. Buka: `http://localhost:3000/admin/login`
2. Login dengan user yang sudah di-migrate
3. Test CRUD operations:
   - Edit Home section
   - Edit About section
   - Tambah/Edit/Hapus Skills
   - Tambah/Edit/Hapus Projects
4. Refresh page → Data tetap ada? ✅

---

## 📋 **LANGKAH 8: Deploy ke Vercel**

### **A. Add Environment Variable di Vercel**
1. Push code ke GitHub
2. Di Vercel Dashboard → Project Settings
3. **Environment Variables:**
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://...
   
   Environments: 
   ✅ Production
   ✅ Preview
   ✅ Development
   ```
4. Klik: "Save"

### **B. Redeploy**
```bash
git add .
git commit -m "Upgrade to MongoDB Atlas"
git push
```

Vercel akan auto-deploy dengan MongoDB! 🎉

---

## 🔒 **Security Best Practices**

### **DO:**
✅ Gunakan environment variables untuk connection string  
✅ Simpan password di password manager  
✅ Gunakan IP Whitelist di MongoDB Atlas  
✅ Update password secara berkala  
✅ Gunakan strong password  

### **DON'T:**
❌ Jangan commit `.env.local` ke Git  
❌ Jangan share connection string di public  
❌ Jangan hardcode password di code  
❌ Jangan gunakan "Allow All IPs" untuk production  

---

## 🎯 **Troubleshooting**

### **Error: "MongoNetworkError"**
- ✅ Cek internet connection
- ✅ Cek IP Whitelist di MongoDB Atlas
- ✅ Pastikan connection string benar

### **Error: "Authentication failed"**
- ✅ Cek username & password
- ✅ Cek special characters di password (encode jika perlu)

### **Error: "connect ETIMEDOUT"**
- ✅ Cek firewall/antivirus
- ✅ Coba ganti network

### **Migration Script Error**
- ✅ Pastikan `.env.local` ada
- ✅ Pastikan `MONGODB_URI` benar
- ✅ Cek `lib/db.json` valid JSON

---

## 📊 **Monitoring Database**

### **MongoDB Atlas Dashboard:**
1. **Browse Collections:**
   - Cluster → Browse Collections
   - Lihat semua data di database `portfolio`

2. **Metrics:**
   - Lihat usage, connections, operations

3. **Backup (Paid):**
   - Free tier tidak ada auto-backup
   - Bisa export manual

---

## ✅ **Checklist Setup MongoDB**

- [ ] Buat akun MongoDB Atlas
- [ ] Deploy M0 Free Cluster
- [ ] Setup database user
- [ ] Whitelist IP address
- [ ] Dapatkan connection string
- [ ] Buat file `.env.local`
- [ ] Run migration script
- [ ] Test di local
- [ ] Add env var di Vercel
- [ ] Deploy ke production
- [ ] Test live website

---

## 🎉 **Selesai!**

Database Anda sekarang production-ready dengan MongoDB Atlas!

**Benefits:**
- ✅ Data persisten
- ✅ Full CRUD berfungsi
- ✅ Scalable
- ✅ Gratis selamanya (512MB)
- ✅ Auto-backup (paid)
- ✅ Built-in monitoring

**Next Steps:**
- Tambah data via admin panel
- Monitor di MongoDB Atlas Dashboard
- Upgrade tier jika perlu lebih banyak storage

---

**Need Help?** Tanya saya! 😊

© 2025 Taji Jadda Giras Sentosa
