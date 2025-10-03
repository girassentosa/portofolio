/**
 * Migration Script: JSON to MongoDB
 * 
 * Script ini akan migrate data dari lib/db.json ke MongoDB Atlas
 * 
 * Usage:
 * 1. Setup MongoDB Atlas dan dapatkan connection string
 * 2. Buat file .env.local dengan MONGODB_URI
 * 3. Run: npx ts-node scripts/migrateToMongoDB.ts
 */

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { Home, About, Skill, Project } from '../lib/models/Portfolio';
import User from '../lib/models/User';

// Read MongoDB URI from environment variable
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in environment variables!');
  console.log('📝 Please create .env.local file with:');
  console.log('   MONGODB_URI=mongodb+srv://...');
  process.exit(1);
}

async function migrate() {
  try {
    console.log('🚀 Starting migration from JSON to MongoDB...\n');

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Read JSON file
    const dbPath = path.join(process.cwd(), 'lib', 'db.json');
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    const data = JSON.parse(rawData);

    console.log('📂 JSON data loaded\n');

    // Clear existing data (optional - comment if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Home.deleteMany({});
    await About.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Migrate Home
    console.log('📝 Migrating Home section...');
    const home = new Home(data.home);
    await home.save();
    console.log('✅ Home section migrated\n');

    // Migrate About
    console.log('📝 Migrating About section...');
    const about = new About(data.about);
    await about.save();
    console.log('✅ About section migrated\n');

    // Migrate Skills
    console.log('📝 Migrating Skills...');
    for (const skill of data.skills) {
      const newSkill = new Skill(skill);
      await newSkill.save();
    }
    console.log(`✅ ${data.skills.length} skills migrated\n`);

    // Migrate Projects
    console.log('📝 Migrating Projects...');
    for (const project of data.projects) {
      const newProject = new Project(project);
      await newProject.save();
    }
    console.log(`✅ ${data.projects.length} projects migrated\n`);

    // Migrate Users
    console.log('📝 Migrating Users...');
    for (const user of data.users) {
      const newUser = new User(user);
      await newUser.save();
    }
    console.log(`✅ ${data.users.length} users migrated\n`);

    console.log('🎉 Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Home: 1 document`);
    console.log(`   - About: 1 document`);
    console.log(`   - Skills: ${data.skills.length} documents`);
    console.log(`   - Projects: ${data.projects.length} documents`);
    console.log(`   - Users: ${data.users.length} documents`);
    console.log('\n✅ You can now use MongoDB as your database!');

    // Disconnect
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
