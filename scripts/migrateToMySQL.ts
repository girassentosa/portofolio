/**
 * Migration Script: JSON to MySQL
 * 
 * Script ini akan migrate data dari lib/db.json ke MySQL
 * 
 * Usage:
 * 1. Pastikan XAMPP MySQL sudah running
 * 2. Import schema: database/schema.sql ke phpMyAdmin
 * 3. Buat file .env.local dengan DB credentials
 * 4. Run: npx ts-node scripts/migrateToMySQL.ts
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

// Read from environment or use defaults
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
};

async function migrate() {
  let connection;
  
  try {
    console.log('🚀 Starting migration from JSON to MySQL...\n');

    // Connect to MySQL
    console.log('📡 Connecting to MySQL...');
    console.log(`   Host: ${DB_CONFIG.host}`);
    console.log(`   Database: ${DB_CONFIG.database}`);
    console.log(`   User: ${DB_CONFIG.user}\n`);
    
    connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ Connected to MySQL\n');

    // Read JSON file
    const dbPath = path.join(process.cwd(), 'lib', 'db.json');
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    const data = JSON.parse(rawData);

    console.log('📂 JSON data loaded\n');

    // Clear existing data (optional)
    console.log('🗑️  Clearing existing data...');
    await connection.execute('DELETE FROM home_stats');
    await connection.execute('DELETE FROM home');
    await connection.execute('DELETE FROM about');
    await connection.execute('DELETE FROM skills');
    await connection.execute('DELETE FROM projects');
    await connection.execute('DELETE FROM users');
    console.log('✅ Existing data cleared\n');

    // Reset auto increment
    await connection.execute('ALTER TABLE home AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE about AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE skills AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE projects AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE home_stats AUTO_INCREMENT = 1');

    // Migrate Home
    console.log('📝 Migrating Home section...');
    await connection.execute(
      `INSERT INTO home (title, subtitle, description, profile_image) 
       VALUES (?, ?, ?, ?)`,
      [data.home.title, data.home.subtitle, data.home.description, data.home.image]
    );
    
    // Migrate Home Stats
    for (let i = 0; i < data.home.stats.length; i++) {
      const stat = data.home.stats[i];
      await connection.execute(
        `INSERT INTO home_stats (value, label, display_order) 
         VALUES (?, ?, ?)`,
        [stat.value, stat.label, i]
      );
    }
    console.log(`✅ Home section migrated (${data.home.stats.length} stats)\n`);

    // Migrate About
    console.log('📝 Migrating About section...');
    await connection.execute(
      `INSERT INTO about (
        who_am_i, my_approach, full_name, role, email, phone, 
        location, availability, linkedin, github, instagram, twitter
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.about.whoAmI,
        data.about.myApproach,
        data.about.personalInfo.fullName,
        data.about.personalInfo.role,
        data.about.personalInfo.email,
        data.about.personalInfo.phone,
        data.about.personalInfo.location,
        data.about.personalInfo.availability,
        data.about.personalInfo.linkedin || null,
        data.about.personalInfo.github || null,
        data.about.personalInfo.instagram || null,
        data.about.personalInfo.twitter || null,
      ]
    );
    console.log('✅ About section migrated\n');

    // Migrate Skills
    console.log('📝 Migrating Skills...');
    for (const skill of data.skills) {
      await connection.execute(
        `INSERT INTO skills (name, category, icon, color) 
         VALUES (?, ?, ?, ?)`,
        [skill.name, skill.category, skill.icon, skill.color]
      );
    }
    console.log(`✅ ${data.skills.length} skills migrated\n`);

    // Migrate Projects
    console.log('📝 Migrating Projects...');
    for (const project of data.projects) {
      await connection.execute(
        `INSERT INTO projects (title, subtitle, handle, image, border_color, gradient, url) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          project.title,
          project.subtitle,
          project.handle,
          project.image,
          project.borderColor,
          project.gradient,
          project.url,
        ]
      );
    }
    console.log(`✅ ${data.projects.length} projects migrated\n`);

    // Migrate Users
    console.log('📝 Migrating Users...');
    for (const user of data.users) {
      await connection.execute(
        `INSERT INTO users (username, email, password) 
         VALUES (?, ?, ?)`,
        [user.username, user.email, user.password]
      );
    }
    console.log(`✅ ${data.users.length} users migrated\n`);

    console.log('🎉 Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Home: 1 row + ${data.home.stats.length} stats`);
    console.log(`   - About: 1 row`);
    console.log(`   - Skills: ${data.skills.length} rows`);
    console.log(`   - Projects: ${data.projects.length} rows`);
    console.log(`   - Users: ${data.users.length} rows`);
    console.log('\n✅ You can now use MySQL as your database!');

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Database tidak ditemukan!');
      console.log('   1. Buka phpMyAdmin: http://localhost/phpmyadmin');
      console.log('   2. Import file: database/schema.sql');
      console.log('   3. Jalankan migration lagi');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 MySQL tidak berjalan!');
      console.log('   1. Start XAMPP');
      console.log('   2. Start MySQL service');
      console.log('   3. Jalankan migration lagi');
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n📡 Disconnected from MySQL');
    }
  }
}

migrate();
