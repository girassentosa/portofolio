# 🎨 Portfolio Website - Taji Jadda Giras Sentosa

Portfolio website modern dengan admin panel lengkap, dibangun menggunakan Next.js 15, TypeScript, dan Tailwind CSS.

## ✨ Fitur

### 🌟 **Halaman Utama (Portfolio)**
- ✅ **Loading Screen** dengan animasi progress bar
- ✅ **Animated Background** menggunakan Three.js (Beams effect)
- ✅ **Scroll Animations** dengan Framer Motion
- ✅ **Responsive Design** untuk semua devices
- ✅ **Sections:**
  - Home - Profil & statistik
  - About - Informasi personal & pendekatan
  - Skills - Daftar keahlian dengan animasi
  - Projects - Portfolio proyek
  - Contact - Form kontak & informasi

### 🔐 **Admin Panel**
- ✅ **Authentication System** (Login & Register)
- ✅ **Protected Routes** dengan session management
- ✅ **Dashboard** dengan statistik
- ✅ **CRUD Management:**
  - Home Section (Title, Subtitle, Description, Stats)
  - About Section (Who Am I, My Approach, Personal Info)
  - Skills Management
  - Projects Management
- ✅ **Responsive Admin Panel** untuk mobile & desktop

## 🚀 Tech Stack

- **Framework:** Next.js 15.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **Database:** JSON-based (lib/db.json)
- **Authentication:** Cookie-based sessions with MD5 hashing

## 📦 Installation

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔧 Configuration

### Database
Data portofolio disimpan di `lib/db.json`. Struktur:
```json
{
  "home": { ... },
  "about": { ... },
  "skills": [ ... ],
  "projects": [ ... ],
  "users": [ ... ]
}
```

### Admin Access
- **Login:** `/admin/login`
- **Register:** `/admin/register`
- **Dashboard:** `/admin/dashboard`

Default credentials dapat dibuat melalui halaman register.

## 📁 Struktur Proyek

```
portofolio-diri/
├── app/
│   ├── admin/              # Admin panel
│   │   ├── login/
│   │   ├── register/
│   │   └── dashboard/
│   ├── api/                # API routes
│   │   ├── admin/          # Admin CRUD APIs
│   │   ├── auth/           # Authentication APIs
│   │   └── portfolio/      # Public portfolio API
│   ├── components/         # React components
│   ├── fonts/              # Custom fonts
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── lib/
│   ├── db.json             # JSON database
│   └── dbHelper.ts         # Database helpers
├── public/
│   └── images/             # Images & CV
└── ...config files
```

## 🎨 Components

### Main Components
- `Beams` - 3D animated background
- `ResponsiveBeams` - Responsive wrapper for Beams
- `ClientWrapper` - Loading screen wrapper
- `LoadingScreen` - Progress bar animation
- `ScrollReveal` - Scroll-triggered animations
- `StaggeredReveal` - Staggered grid animations
- `HomeReveal` - Home section animations

### UI Components
- `Header` - Navigation header
- `Footer` - Footer section
- `ProfileCard` - Profile card dengan stats
- `SkillCard` - Skill item card
- `ContactCard` - Contact information
- `ContactForm` - Contact form
- `MagicBento` - About section layout
- `CVDownloadModal` - CV download modal

## 🔐 Security

- Password hashing menggunakan MD5
- Session management dengan cookies
- Protected admin routes
- Input validation pada forms

## 📱 Responsive Design

Website fully responsive dengan breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** ≥ 1024px

## 🎯 Performance

- **Lazy Loading** components dengan `next/dynamic`
- **Image Optimization** dengan Next.js Image
- **Font Optimization** dengan `next/font`
- **SWC Minification** untuk production
- **CSS Optimization** enabled

## 📄 Documentation

Lihat `PANDUAN_ADMIN.md` untuk dokumentasi lengkap admin panel.

## 🛠️ Development

```bash
# Development mode
npm run dev

# Build production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## 📝 License

Private portfolio project.

## 👨‍💻 Developer

**Taji Jadda Giras Sentosa**
- Portfolio: [Your URL]
- Email: [Your Email]

---

Built with ❤️ using Next.js & TypeScript