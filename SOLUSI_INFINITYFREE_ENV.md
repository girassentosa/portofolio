# 🔧 Solusi File .env.local Tidak Support di InfinityFree

## ❌ Masalah:
InfinityFree tidak mendukung file yang diawali dengan titik (`.env.local`)

---

## ✅ SOLUSI 1: Gunakan File `config.production.js` (RECOMMENDED)

### **Langkah-Langkah:**

1. **Upload file `lib/config.production.js` ke InfinityFree**
   - Lokasi: `htdocs/lib/config.production.js`

2. **Edit file tersebut via File Manager**
   - Ganti kredensial dengan yang ASLI dari cPanel:
   ```javascript
   module.exports = {
     DB_HOST: 'localhost',
     DB_USER: 'epiz_12345678_portfolio',      // ← GANTI INI
     DB_PASSWORD: 'PasswordAndaDariCPanel',   // ← GANTI INI
     DB_NAME: 'epiz_12345678_portfolio_db',   // ← GANTI INI
   };
   ```

3. **Replace file `lib/mysql.ts` dengan `lib/mysql.production.ts`**
   - Di InfinityFree File Manager:
     1. Hapus file `lib/mysql.ts` (backup dulu jika perlu)
     2. Rename `lib/mysql.production.ts` menjadi `lib/mysql.ts`

4. **Selesai!** Website akan otomatis baca dari `config.production.js`

---

## ✅ SOLUSI 2: Hardcode Langsung (SIMPLE)

### **Langkah-Langkah:**

1. **Edit file `lib/mysql.ts` di InfinityFree File Manager**

2. **Ganti baris 9-12** dari:
   ```typescript
   host: process.env.DB_HOST || 'localhost',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || '',
   database: process.env.DB_NAME || 'portfolio_db',
   ```

   **Menjadi** (dengan kredensial ASLI Anda):
   ```typescript
   host: 'localhost',
   user: 'epiz_12345678_portfolio',           // ← GANTI
   password: 'PasswordAndaDariCPanel',        // ← GANTI
   database: 'epiz_12345678_portfolio_db',    // ← GANTI
   ```

3. **Save file**

4. **Selesai!**

---

## 📊 Perbandingan:

| Solusi | Kelebihan | Kekurangan |
|--------|-----------|------------|
| **Solusi 1** | ✅ Lebih aman (kredensial terpisah)<br>✅ Mudah update kredensial | ⚠️ Perlu 2 file (config + mysql) |
| **Solusi 2** | ✅ Paling simple<br>✅ Cuma 1 file | ⚠️ Kredensial langsung di code<br>⚠️ Harus edit code |

---

## 🎯 Rekomendasi:

**Gunakan SOLUSI 1** jika:
- Ingin lebih profesional
- Mau kredensial terpisah dari code

**Gunakan SOLUSI 2** jika:
- Ingin cepat dan simple
- Tidak masalah kredensial di code

---

## ⚠️ CATATAN PENTING:

1. **JANGAN upload `config.production.js` ke Git!**
   - Sudah otomatis di-ignore di `.gitignore`

2. **Untuk lokal development (XAMPP):**
   - Tetap pakai `.env.local` yang sudah ada
   - File `lib/mysql.ts` asli sudah support keduanya

3. **Ganti password admin** setelah deploy:
   - Login ke `/admin/login`
   - Username: `admin`, Password: `admin123`
   - Ganti password di dashboard

---

## 📞 Troubleshooting:

### Error: "Cannot find module './config.production.js'"
- Pastikan file `config.production.js` ada di folder `lib/`
- Cek nama file, harus **PERSIS** `config.production.js`

### Error: "Access denied for user"
- Cek kredensial di `config.production.js`
- Pastikan username, password, database name benar

### Error: "Unknown database"
- Pastikan database sudah dibuat di cPanel
- Pastikan nama database benar di config

---

**Pilih salah satu solusi dan ikuti langkah-langkahnya!** 🚀
