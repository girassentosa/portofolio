"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import AdminProfileModal from "@/app/components/AdminProfileModal";
import AdminPhotoPreview from "@/app/components/AdminPhotoPreview";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPhotoPreviewOpen, setIsPhotoPreviewOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profile.jpg");

  // Hindari hydration mismatch: render setelah mount saja
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    checkAuth();
  }, [mounted]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        // Load profile image from session if available
        if (data.user?.profileImage) {
          setProfileImage(data.user.profileImage);
        }
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    // Refresh user data after profile update
    checkAuth();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Home",
      href: "/admin/dashboard/home",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "About",
      href: "/admin/dashboard/about",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: "Skills",
      href: "/admin/dashboard/skills",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      name: "Projects",
      href: "/admin/dashboard/projects",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ];

  // Loading state - HANYA show loading, tidak render apapun
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Jika tidak ada user (tidak authenticated), jangan render apapun
  // Middleware akan redirect ke login
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar - HANYA render setelah mounted untuk prevent flash */}
      {/* Menggunakan div bukan aside untuk avoid CSS global conflict */}
      {mounted && (
        <div
          role="complementary"
          aria-label="Admin Sidebar"
          className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-700/50 shadow-2xl z-40 transition-all duration-300 ease-in-out ${sidebarOpen ? "block" : "hidden"} lg:block`}
        >
        <div className="h-full px-4 py-6 overflow-y-auto">
          {/* Header - Tombol Close */}
          <div className="flex items-center justify-end mb-6 px-2">
            {/* Tombol X - close sidebar di mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="mb-6 px-3 py-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPhotoPreviewOpen(true)}
                className="group relative overflow-hidden rounded-full cursor-pointer transition-all hover:shadow-xl hover:shadow-purple-500/50"
              >
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-500/30 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-purple-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/profile.jpg';
                  }}
                />
              </button>
              <div>
                <p className="text-white text-sm font-semibold">{user?.username}</p>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Administrator
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu</p>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    // Auto-close sidebar di mobile setelah klik
                    if (window.innerWidth < 1024) {
                      setTimeout(() => setSidebarOpen(false), 150);
                    }
                  }}
                  className={`group flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
                  )}
                </Link>
              );
            })}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-3 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all font-medium border border-red-500/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="ml-3">Logout</span>
            </button>
          </nav>
        </div>
      </div>
      )}

      {/* Tombol Hamburger - HANYA di mobile, render setelah mounted */}
      {mounted && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-5 left-5 z-50 p-3 lg:hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl border border-gray-700/50 transition-all hover:scale-105"
        >
        <svg className={`w-6 h-6 transition-transform ${sidebarOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      )}

      {/* Overlay - HANYA muncul di mobile ketika sidebar terbuka DAN mounted */}
      {mounted && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <main className="p-4 sm:p-6 md:p-8 pt-20 lg:pt-6">{children}</main>
      </div>

      {/* Photo Preview Modal */}
      <AdminPhotoPreview
        isOpen={isPhotoPreviewOpen}
        onClose={() => setIsPhotoPreviewOpen(false)}
        photoUrl={profileImage}
        onEdit={() => setIsProfileModalOpen(true)}
      />

      {/* Profile Edit Modal */}
      <AdminProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfileImage={profileImage}
        username={user?.username || ''}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}
