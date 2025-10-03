"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [skillsRes, projectsRes] = await Promise.all([
        fetch("/api/admin/skills"),
        fetch("/api/admin/projects"),
      ]);

      const skills = await skillsRes.json();
      const projects = await projectsRes.json();

      setStats({
        skills: skills.length || 0,
        projects: projects.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const quickActions = [
    {
      title: "Edit Home",
      description: "Ubah judul, deskripsi, dan foto profil",
      href: "/admin/dashboard/home",
      icon: "🏠",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Edit About",
      description: "Kelola informasi tentang Anda",
      href: "/admin/dashboard/about",
      icon: "👤",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Kelola Skills",
      description: `${stats.skills} skills tersedia`,
      href: "/admin/dashboard/skills",
      icon: "⚡",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Kelola Projects",
      description: `${stats.projects} projects tersedia`,
      href: "/admin/dashboard/projects",
      icon: "🚀",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Selamat Datang di Dashboard! 👋</h1>
        <p className="text-sm sm:text-base text-white/90">
          Kelola semua konten portofolio Anda dengan mudah dari sini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-400 text-xs sm:text-sm font-medium">Sections</h3>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-0.5 sm:mt-1">4</p>
        </div>

        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-400 text-xs sm:text-sm font-medium">Total Skills</h3>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-0.5 sm:mt-1">{stats.skills}</p>
        </div>

        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-400 text-xs sm:text-sm font-medium">Total Projects</h3>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-0.5 sm:mt-1">{stats.projects}</p>
        </div>

        <div className="bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-pink-500/20 rounded-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-gray-400 text-xs sm:text-sm font-medium">Last Updated</h3>
          <p className="text-base sm:text-lg font-bold text-white mt-0.5 sm:mt-1">Today</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all hover:scale-105"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4`}>
                {action.icon}
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-purple-400 transition">
                {action.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl p-4 sm:p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-2 sm:ml-3">
            <h3 className="text-blue-400 font-semibold mb-1 text-sm sm:text-base">💡 Tips</h3>
            <p className="text-blue-200 text-xs sm:text-sm">
              Setiap perubahan yang Anda buat akan langsung tersimpan dan tampil di halaman portofolio utama. 
              Pastikan untuk menggunakan gambar berkualitas tinggi untuk hasil terbaik!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

