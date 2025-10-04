-- ============================================
-- PORTFOLIO DATABASE - SUPABASE MIGRATION
-- PostgreSQL Compatible
-- ============================================

-- ============================================
-- 1. TABEL USERS
-- ============================================

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123 - MD5 hash)
INSERT INTO users (username, password, email) VALUES
('admin', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin@example.com');

-- ============================================
-- 2. TABEL HOME
-- ============================================

DROP TABLE IF EXISTS home CASCADE;

CREATE TABLE home (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  image VARCHAR(255),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert home data
INSERT INTO home (title, subtitle, description, image) VALUES
('Taji Jadda Giras Sentosa', 'Halo, saya', 'Berpengalaman dalam pengembangan web dan IoT, saya terbiasa merancang solusi yang responsif, cepat, dan sesuai kebutuhan pengguna. Menguasai JavaScript sebagai bahasa utama untuk membangun aplikasi modern dan interaktif.', '/images/profile.jpg');

-- ============================================
-- 3. TABEL HOME_STATS
-- ============================================

DROP TABLE IF EXISTS home_stats CASCADE;

CREATE TABLE home_stats (
  id SERIAL PRIMARY KEY,
  value VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Insert home stats
INSERT INTO home_stats (value, label, order_index) VALUES
('2 Tahun', 'Pengalaman', 1),
('JavaScript', 'Bahasa Utama', 2),
('10 Proyek', 'Total Proyek', 3),
('3.68/4.00', 'IPK', 4);

-- ============================================
-- 4. TABEL ABOUT
-- ============================================

DROP TABLE IF EXISTS about CASCADE;

CREATE TABLE about (
  id SERIAL PRIMARY KEY,
  who_am_i TEXT,
  my_approach TEXT,
  name VARCHAR(255),
  location VARCHAR(255),
  email VARCHAR(100),
  phone VARCHAR(20),
  education VARCHAR(255),
  image VARCHAR(255),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert about data
INSERT INTO about (who_am_i, my_approach, name, location, email, phone, education, image) VALUES
('Saya adalah seorang Web Developer dan IoT Specialist yang passionate dalam menciptakan solusi teknologi inovatif. Dengan pengalaman 2 tahun di bidang pengembangan web dan Internet of Things, saya fokus pada pembuatan aplikasi yang tidak hanya fungsional, tetapi juga memberikan pengalaman pengguna yang luar biasa.', 'Pendekatan saya dalam setiap project adalah mengutamakan kualitas dan detail. Saya percaya bahwa teknologi harus dapat memecahkan masalah nyata dan memberikan nilai tambah yang signifikan. Dengan menggabungkan kreativitas dan kemampuan teknis, saya berusaha menciptakan solusi yang elegant dan efisien.', 'Taji Jadda Giras Sentosa', 'Indonesia', 'tajijaddagirassntosa@gmail.com', '081265098103', 'Informatika - IPK 3.68/4.00', '/images/profile1.jpg');

-- ============================================
-- 5. TABEL SKILLS
-- ============================================

DROP TABLE IF EXISTS skills CASCADE;

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  icon VARCHAR(255),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert skills data
INSERT INTO skills (name, category, icon, color) VALUES
('Visual Studio Code', 'Code Editor', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', '#007ACC'),
('React.js', 'JavaScript Library', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', '#61DAFB'),
('Next.js', 'React Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', '#FFFFFF'),
('Tailwind CSS', 'CSS Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', '#06B6D4'),
('Bootstrap', 'CSS Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', '#7952B3'),
('JavaScript', 'Programming Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', '#F7DF1E'),
('Node.js', 'JavaScript Runtime', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', '#339933'),
('GitHub', 'Version Control', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', '#FFFFFF'),
('Firebase', 'Backend Platform', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', '#FFCA28'),
('HTML5', 'Markup Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', '#E34F26'),
('CSS3', 'Style Sheet Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', '#1572B6'),
('TypeScript', 'Programming Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', '#3178C6'),
('PHP', 'Programming Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', '#777BB4'),
('MySQL', 'Database System', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', '#4479A1');

-- ============================================
-- 6. TABEL PROJECTS
-- ============================================

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  handle VARCHAR(255),
  image VARCHAR(255),
  border_color VARCHAR(50),
  gradient VARCHAR(255),
  url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert projects data
INSERT INTO projects (title, subtitle, handle, image, border_color, gradient, url) VALUES
('Dashboard Analytics', 'Web Application', 'Next.js + TypeScript', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop', '#3B82F6', 'linear-gradient(145deg, #3B82F6, #000)', 'https://github.com'),
('E-Commerce Platform', 'Full Stack Project', 'React + Node.js', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop', '#10B981', 'linear-gradient(210deg, #10B981, #000)', 'https://github.com'),
('Task Management', 'Productivity App', 'React + Firebase', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop', '#F59E0B', 'linear-gradient(165deg, #F59E0B, #000)', 'https://github.com'),
('IoT Dashboard', 'Smart Home System', 'Arduino + React', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop', '#EF4444', 'linear-gradient(195deg, #EF4444, #000)', 'https://github.com'),
('Portfolio Website', 'Personal Branding', 'Next.js + Tailwind', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop', '#8B5CF6', 'linear-gradient(225deg, #8B5CF6, #000)', 'https://github.com'),
('Chat Application', 'Real-time Messaging', 'Socket.io + Express', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=500&fit=crop', '#06B6D4', 'linear-gradient(135deg, #06B6D4, #000)', 'https://github.com');

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_projects_created_at ON projects(created_at);

-- ============================================
-- SELESAI!
-- ============================================

-- Total Data:
-- - 1 User (admin / admin123)
-- - 1 Home section
-- - 4 Home stats
-- - 1 About section
-- - 14 Skills
-- - 6 Projects

SELECT 'Supabase migration completed successfully!' AS status;

