# 🚀 PANDUAN DEPLOYMENT PORTOFOLIO KE VERCEL

**Status:** ✅ Proyek sudah di-commit dan siap untuk di-push!

---

## 📋 **STEP 2: Buat GitHub Repository**

### **A. Kunjungi GitHub:**
1. Buka browser: **https://github.com/new**
2. Atau klik tombol **"+"** di pojok kanan atas → **"New repository"**

### **B. Isi Form Repository:**
```
Repository name:     portofolio-diri
Description:         Portfolio Website - Taji Jadda Giras Sentosa
Visibility:          ☑ Public  (atau Private jika mau)

⚠️ JANGAN centang:
   ❌ Add a README file
   ❌ Add .gitignore
   ❌ Choose a license
```

### **C. Klik: "Create repository"**

### **D. Copy URL Repository:**
Setelah repository dibuat, Anda akan melihat URL seperti:
```
https://github.com/USERNAME/portofolio-diri.git
```
**COPY URL INI!** (Ganti USERNAME dengan username GitHub Anda)

---

## 📋 **STEP 3: Push ke GitHub**

Setelah dapat URL repository, jalankan command berikut **DI TERMINAL PROYEK INI:**

### **A. Tambahkan Remote GitHub:**
```bash
git remote add origin https://github.com/USERNAME/portofolio-diri.git
```
⚠️ **GANTI** `USERNAME` dengan username GitHub Anda!

**Contoh:**
```bash
git remote add origin https://github.com/tajijadda/portofolio-diri.git
```

### **B. Push ke GitHub:**
```bash
git push -u origin main
```

**Username & Password:**
- Username: username GitHub Anda
- Password: **Personal Access Token** (bukan password akun!)

**Cara Buat Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → Pilih "classic"
3. Centang: `repo` (semua)
4. Generate → Copy token
5. Paste sebagai password saat push

---

## 📋 **STEP 4: Deploy ke Vercel**

### **A. Kunjungi Vercel:**
1. Buka: **https://vercel.com/signup**
2. Klik: **"Continue with GitHub"**
3. Login dengan akun GitHub Anda
4. Authorize Vercel untuk akses repository

### **B. Import Project:**
1. Di Vercel Dashboard, klik: **"Add New Project"**
2. Pilih: **"Import Git Repository"**
3. Cari dan pilih: **"portofolio-diri"**
4. Klik: **"Import"**

### **C. Configure Project:**
```
Framework Preset:    Next.js (auto-detected) ✅
Root Directory:      ./ (default) ✅
Build Command:       npm run build (auto) ✅
Output Directory:    .next (auto) ✅
Install Command:     npm install (auto) ✅
```

**Environment Variables:**  
⚠️ Untuk saat ini KOSONGKAN (tidak perlu)

### **D. Deploy:**
1. Klik: **"Deploy"**
2. Tunggu 2-3 menit (proses build & deploy)
3. **SELESAI!** 🎉

---

## 📋 **STEP 5: Akses Website Anda**

Setelah deploy selesai, Anda akan mendapat URL:
```
https://portofolio-diri-USERNAME.vercel.app
```

**Atau bisa custom menjadi:**
```
https://your-name.vercel.app
```

---

## 🎯 **Testing Checklist**

Setelah website live, test:

### **A. Halaman Utama:**
- [ ] ✅ Loading screen muncul (1 detik)
- [ ] ✅ Background Beams berjalan
- [ ] ✅ Animasi scroll bekerja
- [ ] ✅ Section: Home, About, Skills, Projects, Contact
- [ ] ✅ Footer tampil

### **B. Admin Panel:**
- [ ] ✅ Akses: `/admin/login`
- [ ] ✅ Bisa register user baru
- [ ] ✅ Bisa login
- [ ] ✅ Dashboard tampil dengan sidebar
- [ ] ✅ Bisa edit Home section
- [ ] ✅ Bisa edit About section
- [ ] ✅ Bisa tambah/edit/hapus Skills
- [ ] ✅ Bisa tambah/edit/hapus Projects

### **C. Responsive:**
- [ ] ✅ Mobile view (< 640px)
- [ ] ✅ Tablet view (640px - 1024px)
- [ ] ✅ Desktop view (> 1024px)

---

## ⚠️ **CATATAN PENTING - Database JSON**

### **Masalah:**
- ✅ Data di `lib/db.json` bisa **DIBACA**
- ⚠️ Perubahan data (tambah/edit/hapus) **TIDAK PERSISTEN**
- ⚠️ Setiap redeploy, data kembali ke `db.json` original

### **Kenapa?**
Vercel adalah **serverless** → tidak ada file system yang persisten

### **Solusi Sementara:**
Jika mau update data via admin panel:
1. Edit `lib/db.json` manual di lokal
2. Commit & push ke GitHub
3. Vercel auto-redeploy
4. Data ter-update

### **Solusi Jangka Panjang:**
Upgrade ke database real (saya bisa bantu nanti):
- MongoDB Atlas (Gratis selamanya)
- PostgreSQL (Vercel Postgres)
- MySQL (PlanetScale)

---

## 🔧 **Auto-Deploy**

Vercel sudah setup **auto-deploy**:
```
Setiap kali Anda:
git add .
git commit -m "Update"
git push

→ Vercel otomatis build & deploy ulang!
→ Website update otomatis dalam 2 menit!
```

---

## 🌐 **Custom Domain (Opsional)**

### **Domain Gratis dari Vercel:**
Di Vercel Dashboard → Settings → Domains
- Ganti dari: `portofolio-diri-username.vercel.app`
- Menjadi: `your-name.vercel.app`

### **Domain Berbayar:**
Jika punya domain sendiri (contoh: `tajijadda.com`):
1. Vercel → Settings → Domains
2. Add Domain: `tajijadda.com`
3. Update DNS di registrar domain
4. Tunggu propagasi (5-10 menit)
5. SSL otomatis aktif! 🔒

---

## 📞 **Butuh Bantuan?**

Jika ada error atau masalah:
1. Cek **Vercel Deployment Logs**
2. Screenshot error
3. Tanya saya! 😊

---

## ✅ **Summary - Langkah yang Sudah Dilakukan:**

✅ **SELESAI:**
- [x] ✅ Git add & commit (59 files)
- [x] ✅ Branch renamed ke `main`
- [x] ✅ Proyek siap di-push

📝 **YANG HARUS ANDA LAKUKAN:**
1. [ ] Buat GitHub repository
2. [ ] Push proyek ke GitHub
3. [ ] Deploy ke Vercel
4. [ ] Test website live
5. [ ] Share link! 🎉

---

**Good luck! Tinggal beberapa langkah lagi dan website Anda akan LIVE! 🚀**

© 2025 Taji Jadda Giras Sentosa
