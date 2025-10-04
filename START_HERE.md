# 🚀 START HERE - Deploy Portfolio ke Vercel dengan Supabase

**Selamat datang!** File ini adalah panduan cepat untuk memulai deployment.

---

## 📌 Apa yang Sudah Dilakukan?

Proyek Anda telah diupdate untuk deployment ke **Vercel + Supabase**:

✅ **Dependencies installed**: `@supabase/supabase-js`  
✅ **Database helper created**: `lib/supabaseHelper.ts`  
✅ **API routes updated**: Semua sudah pakai Supabase  
✅ **SQL migration ready**: `database/supabase_migration.sql`  
✅ **Documentation created**: Panduan lengkap tersedia  

---

## 🎯 Pilih Panduan Anda

### 🏃‍♂️ Saya ingin deploy CEPAT! (15 menit)
**👉 Baca: [`SUPABASE_QUICK_START.md`](SUPABASE_QUICK_START.md)**

Quick checklist:
1. Setup Supabase (5 menit)
2. Setup Vercel (5 menit)  
3. Test website (5 menit)

### 📚 Saya ingin panduan LENGKAP dengan penjelasan
**👉 Baca: [`DEPLOY_VERCEL_SUPABASE.md`](DEPLOY_VERCEL_SUPABASE.md)**

Includes:
- Step-by-step detailed
- Screenshots guide
- Troubleshooting
- Best practices

### 🔍 Saya ingin tahu apa yang berubah
**👉 Baca: [`MIGRATION_SUMMARY.md`](MIGRATION_SUMMARY.md)**

Details:
- File yang diupdate
- Code changes
- Database schema
- Testing guide

---

## ⚡ Quick Setup (5 Langkah)

### 1. **Setup Supabase**
```
→ Daftar di supabase.com
→ Buat project baru
→ Import database/supabase_migration.sql di SQL Editor
→ Copy Project URL & Anon Key
```

### 2. **Create Environment File**
Buat file `.env.local` di root project:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
JWT_SECRET=random_secret_key_123
```

### 3. **Test Locally**
```bash
npm install
npm run dev
```
Buka http://localhost:3000

### 4. **Push ke GitHub**
```bash
git add .
git commit -m "Ready for deployment with Supabase"
git push origin main
```

### 5. **Deploy ke Vercel**
```
→ Login vercel.com dengan GitHub
→ Import project
→ Add environment variables (sama seperti .env.local)
→ Deploy!
```

---

## 📋 Checklist Pre-Deployment

Sebelum deploy, pastikan:

- [ ] Supabase project sudah dibuat
- [ ] Database schema sudah di-import
- [ ] Credentials Supabase sudah dicopy
- [ ] File `.env.local` sudah dibuat (untuk local)
- [ ] Project sudah di-push ke GitHub
- [ ] Environment variables siap untuk Vercel

---

## 🔑 Default Admin Credentials

Setelah deploy, login dengan:
- **URL**: `https://your-site.vercel.app/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **PENTING**: Ubah password setelah login pertama!

---

## 📁 Dokumentasi Lengkap

| File | Deskripsi | Kapan Digunakan |
|------|-----------|-----------------|
| [`SUPABASE_QUICK_START.md`](SUPABASE_QUICK_START.md) | Quick guide 15 menit | Untuk deployment cepat |
| [`DEPLOY_VERCEL_SUPABASE.md`](DEPLOY_VERCEL_SUPABASE.md) | Full guide lengkap | Untuk panduan detail |
| [`MIGRATION_SUMMARY.md`](MIGRATION_SUMMARY.md) | Summary perubahan | Untuk developer |
| [`README.md`](README.md) | Project overview | Untuk general info |

---

## ❓ Troubleshooting Cepat

### Build error?
```bash
npm run build
# Check error message
```

### Environment variables tidak terdeteksi?
- Pastikan nama file: `.env.local` (bukan .env)
- Restart dev server setelah membuat .env.local

### Login tidak bisa?
- Cek apakah SQL migration sudah dijalankan di Supabase
- Buka Supabase → Table Editor → users (pastikan ada data admin)

### Data tidak muncul?
- Check Supabase credentials di .env.local
- Check browser console untuk error messages
- Verify table ada data di Supabase

---

## 🆘 Butuh Bantuan?

1. **Cek dokumentasi** di file-file diatas
2. **Cek Vercel logs** di Vercel Dashboard
3. **Cek Supabase logs** di Supabase Dashboard
4. **Search error message** di Google/Stack Overflow

---

## 🎉 Next Steps Setelah Deploy

Setelah website live:

1. **✅ Test semua fitur**
   - Homepage, About, Skills, Projects
   - Admin login & dashboard
   - CRUD operations

2. **🔐 Update security**
   - Change admin password
   - Enable Row Level Security di Supabase
   - Review API permissions

3. **📊 Setup monitoring**
   - Vercel Analytics
   - Supabase Logs
   - Error tracking (optional: Sentry)

4. **🎨 Customize content**
   - Update profile image
   - Edit about text
   - Add your projects
   - Update skills

5. **🌐 Share your portfolio!**
   - Add to resume
   - Share on LinkedIn
   - Add to GitHub profile

---

## 💡 Pro Tips

1. **Development**: Gunakan `npm run dev` untuk local testing
2. **Production**: Vercel auto-deploy setiap git push
3. **Database**: Backup data regular dari Supabase
4. **Performance**: Check Lighthouse score di Chrome DevTools
5. **SEO**: Update meta tags di `app/layout.tsx`

---

## 📞 Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## ✨ Selamat Deploy!

Ikuti panduan diatas dan dalam 15 menit portfolio Anda akan live di internet! 🚀

**Happy Deploying!** 🎉

---

**Created**: Oktober 2025  
**For**: Taji Jadda Giras Sentosa  
**Tech Stack**: Next.js 14 + Supabase + Vercel

