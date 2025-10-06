"use client";

import { useState } from "react";

interface AdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfileImage: string;
  username: string;
  onUpdate: () => void;
}

export default function AdminProfileModal({
  isOpen,
  onClose,
  currentProfileImage,
  username,
  onUpdate
}: AdminProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'photo'>('account');
  const [loading, setLoading] = useState(false);
  
  // Account form (username + password)
  const [oldUsername, setOldUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Photo form
  const [profileImage, setProfileImage] = useState(currentProfileImage);
  
  // Notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          oldUsername, 
          oldPassword, 
          newUsername: newUsername || oldUsername, // Jika tidak diubah, pakai yang lama
          newPassword, 
          confirmPassword 
        })
      });

      const data = await res.json();

      if (res.ok) {
        showNotification('Profil berhasil diubah!', 'success');
        setOldUsername('');
        setOldPassword('');
        setNewUsername('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onClose();
          onUpdate();
        }, 1500);
      } else {
        showNotification(data.error || 'Gagal mengubah profil', 'error');
      }
    } catch (error) {
      showNotification('Terjadi kesalahan', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileImage })
      });

      const data = await res.json();

      if (res.ok) {
        showNotification('Foto profil berhasil diubah!', 'success');
        setTimeout(() => {
          onClose();
          onUpdate();
        }, 1500);
      } else {
        showNotification(data.error || 'Gagal mengubah foto', 'error');
      }
    } catch (error) {
      showNotification('Terjadi kesalahan', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-4 border-b border-gray-700/50 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <p className="text-sm text-gray-400 mt-1">@{username}</p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700/50">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'account'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
            }`}
          >
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Username & Password
          </button>
          <button
            onClick={() => setActiveTab('photo')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
              activeTab === 'photo'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
            }`}
          >
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Ubah Foto
          </button>
        </div>

        {/* Content - With Scroll */}
        <div className="px-6 py-5 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
          {activeTab === 'account' && (
            <form onSubmit={handleAccountUpdate} className="space-y-4">
              {/* Data Lama - 2 Kolom */}
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-3">Verifikasi Data Saat Ini</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Username Lama
                    </label>
                    <input
                      type="text"
                      value={oldUsername}
                      onChange={(e) => setOldUsername(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Username saat ini"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Password Lama
                    </label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Password saat ini"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700/50 pt-4">
                <p className="text-sm font-semibold text-gray-300 mb-1">Data Baru</p>
                <p className="text-xs text-gray-500 mb-3">Kosongkan jika tidak ingin mengubah</p>
                
                {/* Data Baru - 2 Kolom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Username Baru (Optional)
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Username baru"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Password Baru (Optional)
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Min. 6 karakter"
                      minLength={6}
                    />
                  </div>

                  {/* Konfirmasi Password - Selalu tampil */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Ulangi Password Baru (Optional)
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Ulangi password baru"
                      required={!!newPassword}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button - Sticky at bottom */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                >
                  {loading ? 'Mengubah...' : 'Ubah Profil'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'photo' && (
            <form onSubmit={handlePhotoUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  URL Foto Profil
                </label>
                <input
                  type="text"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="/images/profile.jpg"
                  required
                />
                <p className="mt-2 text-xs text-gray-500">
                  Contoh: /images/profile.jpg atau https://example.com/photo.jpg
                </p>
              </div>

              {/* Preview */}
              <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                <img
                  src={profileImage || '/images/profile.jpg'}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/30"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/profile.jpg';
                  }}
                />
                <div>
                  <p className="text-sm font-medium text-white">Preview</p>
                  <p className="text-xs text-gray-400 mt-1">Foto profil baru Anda</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
              >
                {loading ? 'Mengubah...' : 'Ubah Foto Profil'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top duration-300">
          <div className={`px-6 py-3 rounded-lg shadow-2xl border ${
            notification.type === 'success'
              ? 'bg-green-500/90 border-green-400 text-white'
              : 'bg-red-500/90 border-red-400 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <p className="font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

