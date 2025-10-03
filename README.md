# 🎨 Portfolio Website - Taji Jadda Giras Sentosa

Portfolio pribadi yang dibangun dengan **Next.js 14**, **TypeScript**, **Tailwind CSS**, dan **Three.js**.

---

## ✨ Fitur

- 🎭 **3D Background Animation** (Three.js Beams)
- 📱 **Fully Responsive** untuk semua device
- 🎨 **Modern UI/UX** dengan animasi smooth
- 🔐 **Admin Panel** untuk manajemen konten
- 💾 **MySQL Database** untuk data persistence
- 🚀 **Optimized Performance** (Image optimization, lazy loading)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js, React Three Fiber
- **Animation:** Framer Motion
- **Database:** MySQL (via mysql2)
- **Authentication:** Session-based with cookies

---

## 📦 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd portofolio-diri
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database (XAMPP)
```bash
# Start XAMPP MySQL
# Buka phpMyAdmin
# Import database/schema.sql
```

### 4. Configure Environment
Buat file `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio_db
```

### 5. Migrate Data (Optional)
```bash
npx ts-node scripts/migrateToMySQL.ts
```

### 6. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

### Deploy ke InfinityFree
Lihat panduan: **`DEPLOYMENT_INFINITYFREE.md`**

### Deploy ke Vercel (RECOMMENDED)
Lihat panduan: **`DEPLOY_VERCEL_MYSQL.md`**

---

## 📂 Struktur Project

```
portofolio-diri/
├── app/                      # Next.js App Router
│   ├── components/           # React Components
│   ├── admin/                # Admin Panel
│   ├── api/                  # API Routes
│   └── page.tsx              # Homepage
├── lib/                      # Utilities & DB
│   ├── mysql.ts              # MySQL connection
│   ├── dbHelper.ts           # DB helpers (legacy)
│   └── db.json               # JSON DB (legacy)
├── public/                   # Static assets
├── database/                 # SQL schema
├── scripts/                  # Migration scripts
└── README.md                 # You are here
```

---

## 🔐 Admin Panel

Akses admin panel di `/admin/login`

**Default credentials:**
- **Username:** admin
- **Password:** admin123

⚠️ **PENTING:** Ganti password default setelah login pertama!

---

## 📖 Dokumentasi

- **Setup MySQL:** `MYSQL_SETUP_GUIDE.md`
- **Quick Start MySQL:** `MYSQL_QUICK_START.md`
- **Deploy InfinityFree:** `DEPLOYMENT_INFINITYFREE.md`
- **Deploy Vercel:** `DEPLOY_VERCEL_MYSQL.md`

---

## 🎯 Features Overview

### Portfolio Sections:
- 🏠 **Home** - Hero section dengan animasi
- 👤 **About** - Informasi pribadi
- 💡 **Skills** - Keahlian teknis
- 🚀 **Projects** - Portfolio projects
- 📧 **Contact** - Contact form

### Admin Features:
- ✏️ Edit semua konten via dashboard
- 📊 Statistics overview
- 🖼️ Image upload support
- ➕ Add/Edit/Delete projects & skills
- 🔒 Protected routes

---

## 🐛 Troubleshooting

### Build Error
```bash
npm run build
# Jika error, hapus .next dan node_modules
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Error
- Pastikan XAMPP MySQL running
- Cek kredensial di `.env.local`
- Import `database/schema.sql`

### Font/Asset Error
- Pastikan file `.woff2` ada di `app/fonts/`
- Check `app/layout.tsx` untuk path yang benar

---

## 📄 License

© 2024 Taji Jadda Giras Sentosa. All rights reserved.

---

## 🤝 Contact

- **Email:** [your-email@example.com]
- **LinkedIn:** [your-linkedin]
- **GitHub:** [your-github]

---

**Happy Coding! 🎉**