# 🚀 Panduan Deploy ke InfinityFree

## 📋 Persiapan

### 1. Build Project
```bash
npm run build
```

### 2. Setup Database MySQL di InfinityFree
1. Login ke cPanel InfinityFree
2. Buka **MySQL Databases**
3. Buat database baru (catat nama, user, password)
4. Buka **phpMyAdmin**
5. Import file `database/schema.sql`

### 3. Migrasi Data (Opsional)
Jika sudah punya data di `lib/db.json`:
```bash
# Edit scripts/migrateToMySQL.ts (sesuaikan kredensial)
npx ts-node scripts/migrateToMySQL.ts
```

---

## 📦 File yang Harus Di-Upload

### Folder Wajib:
```
✅ app/                    (semua isi)
✅ lib/                    (semua isi)
✅ public/                 (semua isi)
✅ .next/                  (hasil build)
✅ node_modules/           (jika tidak ada npm access)
```

### File Wajib:
```
✅ next.config.js
✅ postcss.config.js
✅ package.json
✅ package-lock.json
✅ tailwind.config.ts
✅ tsconfig.json
```

### File Database:
```
✅ database/schema.sql     (untuk import ke phpMyAdmin)
✅ scripts/migrateToMySQL.ts (untuk migrasi data)
```

---

## ⚙️ Konfigurasi Environment

Buat file `.env.local` di server (via File Manager):

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

**Contoh:**
```env
DB_HOST=localhost
DB_USER=id12345_admin
DB_PASSWORD=MySecurePass123
DB_NAME=id12345_portfolio
```

---

## 📂 Struktur Upload

```
/htdocs
  ├── app/
  ├── lib/
  ├── public/
  ├── .next/
  ├── node_modules/
  ├── .env.local         ← BUAT FILE INI
  ├── next.config.js
  ├── package.json
  └── ... file lainnya
```

---

## ⚠️ Catatan Penting

### InfinityFree Limitations:
- ❌ Tidak support Node.js runtime (by default)
- ❌ Tidak support `.mjs`, `.ico`, `.woff` files (sudah diperbaiki ✅)
- ⚠️ Next.js mungkin **tidak berjalan sempurna**

### Jika Next.js Tidak Berjalan:

#### Option 1: Static Export
```bash
# Edit next.config.js, tambahkan:
output: 'export'

# Build static files:
npm run build

# Upload folder `out/` ke htdocs
```

#### Option 2: Deploy ke Vercel (RECOMMENDED)
- ✅ **Gratis selamanya**
- ✅ **Native Next.js support**
- ✅ **Auto-deploy dari Git**
- ✅ **Bisa connect ke MySQL remote**

**Panduan Vercel:** Lihat `DEPLOY_VERCEL_MYSQL.md`

---

## 🔧 Troubleshooting

### Error: "Cannot find module"
```bash
# Di server, jalankan:
npm install
```

### Error: Database Connection
- Cek kredensial di `.env.local`
- Pastikan database sudah di-import (`schema.sql`)
- Cek nama database/user/password di cPanel

### Error: Permission Denied
- Set permission folder `lib/` ke 755
- Set permission file `db.json` ke 644

### Website Tidak Muncul
1. Cek apakah InfinityFree support Node.js
2. Coba static export (Option 1)
3. Atau deploy ke Vercel (Option 2 - RECOMMENDED)

---

## 📞 Next Steps

1. ✅ Build project: `npm run build`
2. ⏳ Setup MySQL database di cPanel
3. ⏳ Upload files via FTP/File Manager
4. ⏳ Buat `.env.local` di server
5. ⏳ Test website
6. ⏳ Jika gagal → Deploy ke Vercel

---

## 🎯 Alternative: Vercel (EASIER & FREE)

Jika InfinityFree terlalu rumit atau tidak support Next.js:

1. Push code ke GitHub/GitLab
2. Import project di Vercel
3. Connect MySQL database (remote)
4. Deploy (otomatis)

**Keuntungan Vercel:**
- ✅ Zero configuration
- ✅ Auto SSL/HTTPS
- ✅ CDN global
- ✅ Auto-deploy on Git push
- ✅ 100% free untuk personal projects

---

**Last Updated:** {{ date }}
**Status:** ✅ Ready for deployment
