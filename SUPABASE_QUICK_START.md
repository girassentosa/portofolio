# ⚡ Supabase Quick Start Guide

Panduan singkat untuk deploy dalam 15 menit!

## 🎯 Checklist Deployment

### ✅ 1. Setup Supabase (5 menit)
- [ ] Daftar di [supabase.com](https://supabase.com)
- [ ] Buat project baru
- [ ] Copy file `database/supabase_migration.sql`
- [ ] Paste & Run di Supabase SQL Editor
- [ ] Copy **Project URL** dan **anon key** dari Settings → API

### ✅ 2. Setup Vercel (5 menit)
- [ ] Push code ke GitHub
- [ ] Login ke [vercel.com](https://vercel.com) dengan GitHub
- [ ] Import project `portofolio-diri`
- [ ] Add 3 Environment Variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `JWT_SECRET`
- [ ] Deploy!

### ✅ 3. Test Website (5 menit)
- [ ] Buka URL Vercel
- [ ] Test homepage
- [ ] Login admin (`admin` / `admin123`)
- [ ] Test edit data di dashboard

---

## 📝 Environment Variables Template

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=your_random_secret_key_here
```

---

## 🚀 Local Development

1. **Clone & Install**
```bash
git clone <your-repo>
cd portofolio-diri
npm install
```

2. **Create .env.local**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
JWT_SECRET=random_key_123
NODE_ENV=development
```

3. **Run Development Server**
```bash
npm run dev
```

Open http://localhost:3000

---

## 🔑 Default Login

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **PENTING**: Ubah password setelah deploy!

---

## 🎨 File Structure (Updated for Supabase)

```
lib/
├── supabase.ts          ← Supabase client config
├── supabaseHelper.ts    ← Database operations
├── mysql.ts             ← (Legacy - tidak dipakai lagi)
└── dbHelper.ts          ← (Legacy - tidak dipakai lagi)

database/
├── supabase_migration.sql    ← Import ke Supabase
└── portfolio_complete.sql    ← (Legacy MySQL)

app/api/
├── admin/               ← Admin API (sudah diupdate)
├── auth/                ← Authentication (sudah diupdate)
└── portfolio/           ← Public API (sudah diupdate)
```

---

## ❓ Troubleshooting

### Problem: Build failed di Vercel
**Fix**: Check environment variables sudah di-set semua

### Problem: "Supabase credentials not found"
**Fix**: Pastikan env variables di Vercel sudah benar

### Problem: Cannot login
**Fix**: Pastikan sudah run migration SQL di Supabase

### Problem: Data tidak muncul
**Fix**: Buka Supabase → Table Editor, pastikan ada data

---

## 📚 Full Documentation

Lihat `DEPLOY_VERCEL_SUPABASE.md` untuk dokumentasi lengkap.

---

## 🎉 Done!

Setelah deploy, website Anda akan:
- ✅ Live di `https://your-project.vercel.app`
- ✅ Auto deploy tiap push ke GitHub
- ✅ Gratis untuk personal use
- ✅ Global CDN (cepat di seluruh dunia)
- ✅ SSL/HTTPS otomatis

**Happy Deploying! 🚀**

