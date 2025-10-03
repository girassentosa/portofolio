-- ============================================
-- PORTFOLIO DATABASE - COMPLETE WITH DATA
-- Untuk Import ke InfinityFree phpMyAdmin
-- ============================================

-- Uncomment baris berikut jika ingin create database baru
-- CREATE DATABASE IF NOT EXISTS portfolio_db;
-- USE portfolio_db;

-- ============================================
-- 1. TABEL USERS
-- ============================================

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert admin user (password: admin123)
INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'admin', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin@example.com', '2025-01-01 00:00:00');

-- ============================================
-- 2. TABEL HOME
-- ============================================

DROP TABLE IF EXISTS `home`;

CREATE TABLE `home` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255),
  `description` TEXT,
  `image` VARCHAR(255),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert home data
INSERT INTO `home` (`id`, `title`, `subtitle`, `description`, `image`) VALUES
(1, 'Taji Jadda Giras Sentosa', 'Halo, saya', 'Berpengalaman dalam pengembangan web dan IoT, saya terbiasa merancang solusi yang responsif, cepat, dan sesuai kebutuhan pengguna. Menguasai JavaScript sebagai bahasa utama untuk membangun aplikasi modern dan interaktif.', '/images/profile.jpg');

-- ============================================
-- 3. TABEL HOME_STATS
-- ============================================

DROP TABLE IF EXISTS `home_stats`;

CREATE TABLE `home_stats` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `value` VARCHAR(50) NOT NULL,
  `label` VARCHAR(100) NOT NULL,
  `order_index` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert home stats
INSERT INTO `home_stats` (`id`, `value`, `label`, `order_index`) VALUES
(1, '2 Tahun', 'Pengalaman', 1),
(2, 'JavaScript', 'Bahasa Utama', 2),
(3, '10 Proyek', 'Total Proyek', 3),
(4, '3.68/4.00', 'IPK', 4);

-- ============================================
-- 4. TABEL ABOUT
-- ============================================

DROP TABLE IF EXISTS `about`;

CREATE TABLE `about` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `who_am_i` TEXT,
  `my_approach` TEXT,
  `name` VARCHAR(255),
  `location` VARCHAR(255),
  `email` VARCHAR(100),
  `phone` VARCHAR(20),
  `education` VARCHAR(255),
  `image` VARCHAR(255),
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert about data
INSERT INTO `about` (`id`, `who_am_i`, `my_approach`, `name`, `location`, `email`, `phone`, `education`, `image`) VALUES
(1, 'Saya adalah seorang Web Developer dan IoT Specialist yang passionate dalam menciptakan solusi teknologi inovatif. Dengan pengalaman 2 tahun di bidang pengembangan web dan Internet of Things, saya fokus pada pembuatan aplikasi yang tidak hanya fungsional, tetapi juga memberikan pengalaman pengguna yang luar biasa.', 'Pendekatan saya dalam setiap project adalah mengutamakan kualitas dan detail. Saya percaya bahwa teknologi harus dapat memecahkan masalah nyata dan memberikan nilai tambah yang signifikan. Dengan menggabungkan kreativitas dan kemampuan teknis, saya berusaha menciptakan solusi yang elegant dan efisien.', 'Taji Jadda Giras Sentosa', 'Indonesia', 'tajijaddagirassntosa@gmail.com', '081265098103', 'Informatika - IPK 3.68/4.00', '/images/profile1.jpg');

-- ============================================
-- 5. TABEL SKILLS
-- ============================================

DROP TABLE IF EXISTS `skills`;

CREATE TABLE `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(100),
  `icon` VARCHAR(255),
  `color` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert skills data
INSERT INTO `skills` (`id`, `name`, `category`, `icon`, `color`) VALUES
(1, 'Visual Studio Code', 'Code Editor', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', '#007ACC'),
(2, 'React.js', 'JavaScript Library', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', '#61DAFB'),
(3, 'Next.js', 'React Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', '#FFFFFF'),
(4, 'Tailwind CSS', 'CSS Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', '#06B6D4'),
(5, 'Bootstrap', 'CSS Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', '#7952B3'),
(6, 'JavaScript', 'Programming Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', '#F7DF1E'),
(7, 'Node.js', 'JavaScript Runtime', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', '#339933'),
(8, 'GitHub', 'Version Control', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', '#FFFFFF'),
(9, 'Firebase', 'Backend Platform', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', '#FFCA28'),
(10, 'HTML5', 'Markup Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', '#E34F26'),
(11, 'CSS3', 'Style Sheet Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', '#1572B6'),
(12, 'TypeScript', 'Programming Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', '#3178C6'),
(13, 'PHP', 'Programming Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', '#777BB4'),
(14, 'MySQL', 'Database System', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', '#4479A1');

-- ============================================
-- 6. TABEL PROJECTS
-- ============================================

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255),
  `handle` VARCHAR(255),
  `image` VARCHAR(255),
  `border_color` VARCHAR(50),
  `gradient` VARCHAR(255),
  `url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert projects data
INSERT INTO `projects` (`id`, `title`, `subtitle`, `handle`, `image`, `border_color`, `gradient`, `url`) VALUES
(1, 'Dashboard Analytics', 'Web Application', 'Next.js + TypeScript', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop', '#3B82F6', 'linear-gradient(145deg, #3B82F6, #000)', 'https://github.com'),
(2, 'E-Commerce Platform', 'Full Stack Project', 'React + Node.js', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop', '#10B981', 'linear-gradient(210deg, #10B981, #000)', 'https://github.com'),
(3, 'Task Management', 'Productivity App', 'React + Firebase', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop', '#F59E0B', 'linear-gradient(165deg, #F59E0B, #000)', 'https://github.com'),
(4, 'IoT Dashboard', 'Smart Home System', 'Arduino + React', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop', '#EF4444', 'linear-gradient(195deg, #EF4444, #000)', 'https://github.com'),
(5, 'Portfolio Website', 'Personal Branding', 'Next.js + Tailwind', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop', '#8B5CF6', 'linear-gradient(225deg, #8B5CF6, #000)', 'https://github.com'),
(6, 'Chat Application', 'Real-time Messaging', 'Socket.io + Express', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=500&fit=crop', '#06B6D4', 'linear-gradient(135deg, #06B6D4, #000)', 'https://github.com');

-- ============================================
-- SELESAI!
-- ============================================

-- Total Data:
-- - 1 User (admin)
-- - 1 Home section
-- - 4 Home stats
-- - 1 About section
-- - 14 Skills
-- - 6 Projects

SELECT 'Database imported successfully!' AS status;
