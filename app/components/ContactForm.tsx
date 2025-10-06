"use client";

import { useState, FormEvent } from 'react';

interface ContactFormProps {
  whatsapp: string;
  email: string;
  instagram: string;
}

interface ToastNotification {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ContactForm = ({ whatsapp, email, instagram }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    via: 'whatsapp',
    subject: '',
    message: ''
  });
  
  const [toast, setToast] = useState<ToastNotification>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const { name, email: userEmail, via, subject, message } = formData;
    
    // Format pesan
    const formattedMessage = `
Nama: ${name}
Email: ${userEmail}
Subjek: ${subject}

Pesan:
${message}
    `.trim();

    // Redirect berdasarkan via yang dipilih
    if (via === 'whatsapp') {
      const waNumber = whatsapp.replace(/\D/g, '');
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, '_blank');
      showToast('Membuka WhatsApp...', 'success');
    } else if (via === 'email') {
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedMessage)}`;
      window.location.href = mailtoUrl;
      showToast('Membuka aplikasi email...', 'success');
    } else if (via === 'instagram') {
      const igUrl = `https://instagram.com/${instagram}`;
      window.open(igUrl, '_blank');
      // Copy message to clipboard for Instagram
      navigator.clipboard.writeText(formattedMessage);
      showToast('Pesan disalin! Paste di Instagram DM', 'info');
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
          <div 
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-2xl border backdrop-blur-md ${
              toast.type === 'success' 
                ? 'bg-green-500/90 border-green-400 text-white' 
                : toast.type === 'error'
                ? 'bg-red-500/90 border-red-400 text-white'
                : 'bg-blue-500/90 border-blue-400 text-white'
            }`}
          >
            {toast.type === 'success' && (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-2 hover:opacity-70 transition-opacity"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
      {/* Row 1: Nama & Email | Kirim Via & Subjek - 2 Kolom di Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
        {/* Kolom Kiri */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Nama Lengkap */}
          <div className="group">
            <label htmlFor="name" className="block text-[11px] sm:text-xs md:text-sm font-medium text-white/90 mb-1 sm:mb-1.5">
              Nama Lengkap <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 text-xs sm:text-sm bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          {/* Email */}
          <div className="group">
            <label htmlFor="email" className="block text-[11px] sm:text-xs md:text-sm font-medium text-white/90 mb-1 sm:mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 text-xs sm:text-sm bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
              placeholder="nama@email.com"
            />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Kirim Via */}
          <div className="group">
            <label htmlFor="via" className="block text-[11px] sm:text-xs md:text-sm font-medium text-white/90 mb-1 sm:mb-1.5">
              Kirim Via <span className="text-red-400">*</span>
            </label>
            <select
              id="via"
              required
              value={formData.via}
              onChange={(e) => setFormData({ ...formData, via: e.target.value })}
              className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 text-xs sm:text-sm bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 cursor-pointer"
            >
              <option value="whatsapp" className="bg-gray-900">WhatsApp</option>
              <option value="email" className="bg-gray-900">Email</option>
              <option value="instagram" className="bg-gray-900">Instagram</option>
            </select>
          </div>

          {/* Subjek */}
          <div className="group">
            <label htmlFor="subject" className="block text-[11px] sm:text-xs md:text-sm font-medium text-white/90 mb-1 sm:mb-1.5">
              Subjek <span className="text-red-400">*</span>
            </label>
            <select
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 text-xs sm:text-sm bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 cursor-pointer"
            >
              <option value="" className="bg-gray-900">Pilih Subjek</option>
              <option value="Pembuatan Aplikasi Website" className="bg-gray-900">Pembuatan Aplikasi Website</option>
              <option value="Pengembangan Website" className="bg-gray-900">Pengembangan Website</option>
              <option value="Proposal/Skripsi" className="bg-gray-900">Proposal/Skripsi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pesan */}
      <div className="group">
        <label htmlFor="message" className="block text-[11px] sm:text-xs md:text-sm font-medium text-white/90 mb-1 sm:mb-1.5">
          Pesan <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2.5 text-xs sm:text-sm bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 resize-none"
          placeholder="Tulis pesan Anda di sini..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full relative group overflow-hidden px-4 py-2 sm:px-5 sm:py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-xs sm:text-sm text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Kirim Pesan
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
      </form>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ContactForm;

