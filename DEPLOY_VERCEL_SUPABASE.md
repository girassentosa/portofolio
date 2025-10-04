# 🚀 Deploy Next.js ke Vercel dengan Supabase

Panduan lengkap untuk deploy aplikasi portfolio Next.js ke Vercel menggunakan Supabase sebagai database.

## 📋 Prerequisites

- Akun GitHub
- Akun Vercel (gratis)
- Akun Supabase (gratis)
- Project sudah di-push ke GitHub

---

## 🎯 STEP 1: Setup Supabase Database

### 1.1 Buat Akun Supabase
1. Kunjungi [https://supabase.com](https://supabase.com)
2. Klik **"Start your project"**
3. Sign up dengan GitHub account

### 1.2 Buat Project Baru
1. Di dashboard Supabase, klik **"New Project"**
2. Isi informasi:
   - **Name**: `portfolio-db` (atau nama lain)
   - **Database Password**: Buat password yang kuat (SIMPAN INI!)
   - **Region**: Pilih yang terdekat (Singapore/Southeast Asia)
3. Klik **"Create new project"**
4. Tunggu 2-3 menit hingga project selesai dibuat

### 1.3 Import Database Schema
1. Di Supabase Dashboard, buka **SQL Editor** (menu sebelah kiri)
2. Klik **"New query"**
3. Copy seluruh isi file `database/supabase_migration.sql`
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Pastikan muncul pesan success

### 1.4 Dapatkan Credentials
1. Buka **Settings** → **API** (menu sebelah kiri)
2. Copy nilai berikut:
   - **Project URL** (bentuknya: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key** (token panjang yang diawali dengan `eyJ...`)

---

## 🌐 STEP 2: Deploy ke Vercel

### 2.1 Push Project ke GitHub
```bash
# Jika belum di-push
git add .
git commit -m "Ready for Vercel deployment with Supabase"
git push origin main
```

### 2.2 Deploy ke Vercel
1. Kunjungi [https://vercel.com](https://vercel.com)
2. Sign in dengan **GitHub account**
3. Klik **"Add New..."** → **"Project"**
4. Import repository `portofolio-diri`
5. Klik **"Import"**

### 2.3 Configure Environment Variables
Sebelum deploy, tambahkan environment variables:

1. Di halaman import, scroll ke **"Environment Variables"**
2. Tambahkan 3 variables berikut:

| Name | Value | Dari Mana? |
|------|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (token panjang) | Supabase Settings → API |
| `JWT_SECRET` | `random_secret_key_123` | Buat random string sendiri |

3. Klik **"Deploy"**
4. Tunggu 2-3 menit hingga deployment selesai

---

## ✅ STEP 3: Verifikasi Deployment

### 3.1 Test Website
1. Setelah deploy selesai, klik URL yang diberikan (misal: `https://portfolio-xxx.vercel.app`)
2. Test halaman:
   - ✅ Homepage
   - ✅ Admin Login (`/admin/login`)
   - ✅ Dashboard Admin

### 3.2 Test Database Connection
1. Login ke admin: `username: admin` / `password: admin123`
2. Coba edit data di dashboard
3. Pastikan perubahan tersimpan

---

## 🔧 STEP 4: Setup Local Development

### 4.1 Buat File .env.local
Buat file `.env.local` di root project:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# JWT Secret
JWT_SECRET=random_secret_key_123

# Node Environment
NODE_ENV=development
```

### 4.2 Test Locally
```bash
npm run dev
```
Buka http://localhost:3000

---

## 📊 Struktur Database Supabase

### Tables:
- **users** - User accounts untuk admin
- **home** - Data homepage
- **home_stats** - Statistik di homepage
- **about** - Data halaman about
- **skills** - Daftar skills
- **projects** - Portfolio projects

### Default Admin:
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@example.com`

---

## 🔐 Security Best Practices

### 1. Ubah Password Admin
Setelah deployment, segera ubah password admin:
1. Login ke Supabase Dashboard
2. Buka **SQL Editor**
3. Jalankan query:
```sql
UPDATE users 
SET password = md5('password_baru_anda') 
WHERE username = 'admin';
```

### 2. Setup Row Level Security (RLS)
Di Supabase, enable RLS untuk semua tabel:
1. Buka **Authentication** → **Policies**
2. Enable RLS untuk setiap tabel
3. Buat policy sesuai kebutuhan

### 3. Jangan Share Environment Variables
- Jangan commit `.env.local` ke Git
- `.env.local` sudah ada di `.gitignore`

---

## 🚨 Troubleshooting

### Error: "Supabase credentials not found"
✅ **Solusi**: Pastikan environment variables sudah di-set di Vercel:
1. Vercel Dashboard → Project Settings
2. Environment Variables
3. Add missing variables

### Error: "relation does not exist"
✅ **Solusi**: Database schema belum di-import:
1. Buka Supabase SQL Editor
2. Run `database/supabase_migration.sql`

### Error: Build failed di Vercel
✅ **Solusi**: 
1. Check build logs di Vercel
2. Pastikan `package.json` dependencies lengkap
3. Run `npm run build` locally untuk test

### Data tidak ter-update
✅ **Solusi**: 
1. Check koneksi ke Supabase di browser console
2. Pastikan API routes sudah menggunakan `supabaseHelper.ts`

---

## 📝 Update API Routes (PENTING!)

Untuk menggunakan Supabase, semua API routes perlu diupdate. Contoh:

### ❌ Before (MySQL):
```typescript
import { query } from '@/lib/mysql';

export async function GET() {
  const result = await query('SELECT * FROM skills');
  // ...
}
```

### ✅ After (Supabase):
```typescript
import { getSkills } from '@/lib/supabaseHelper';

export async function GET() {
  const skills = await getSkills();
  // ...
}
```

---

## 🎉 Deployment Complete!

Website Anda sekarang live di:
- **Production URL**: `https://your-project.vercel.app`
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (CDN Global)

### Keuntungan Vercel + Supabase:
✅ **Gratis** untuk personal projects
✅ **Auto SSL/HTTPS**
✅ **Global CDN** - loading cepat di seluruh dunia
✅ **Auto deployments** dari Git push
✅ **Scalable** - bisa handle traffic tinggi
✅ **Real-time database** dengan Supabase
✅ **Built-in authentication** (optional)

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 🆘 Need Help?

1. Check Vercel build logs
2. Check Supabase logs: Dashboard → Logs
3. Check browser console for errors
4. Vercel Discord: https://vercel.com/discord
5. Supabase Discord: https://discord.supabase.com

---

**Created by**: Taji Jadda Giras Sentosa  
**Updated**: Oktober 2025

