// ============================================
// PRODUCTION DATABASE CONFIG FOR INFINITYFREE
// ============================================
// File ini khusus untuk InfinityFree yang tidak support .env.local
// GANTI kredensial di bawah dengan kredensial ASLI dari cPanel

module.exports = {
  DB_HOST: 'localhost',
  DB_USER: 'epiz_12345678_portfolio',      // ← GANTI dengan username MySQL Anda
  DB_PASSWORD: 'password_kuat_anda',       // ← GANTI dengan password MySQL Anda
  DB_NAME: 'epiz_12345678_portfolio_db',   // ← GANTI dengan nama database Anda
};

// ============================================
// CARA PAKAI:
// ============================================
// 1. Upload file ini ke folder lib/ di InfinityFree
// 2. Ganti semua value di atas dengan kredensial dari cPanel
// 3. File mysql.ts akan otomatis baca dari file ini
// 4. JANGAN upload file ini ke Git!
// ============================================
