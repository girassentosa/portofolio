"use client";

import { useState } from "react";

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async (format: 'pdf' | 'jpg') => {
    setIsDownloading(true);
    
    try {
      const fileName = format === 'pdf' 
        ? 'CV TAJI JADDA GIRAS SENTOSA.pdf'
        : 'CV TAJI JADDA GIRAS SENTOSA.jpg';
      
      const filePath = `/images/${fileName}`;
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        setIsDownloading(false);
      }, 500);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 md:backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-20 md:blur-xl" />
          
          {/* Content */}
          <div className="relative p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Unduh CV Saya
              </h3>
              <p className="text-gray-400 text-sm">
                Pilih format yang Anda inginkan
              </p>
            </div>

            {/* Download Options */}
            <div className="space-y-3 mb-6">
              {/* PDF Option */}
              <button
                onClick={() => handleDownload('pdf')}
                disabled={isDownloading}
                className="group relative w-full p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center border border-red-500/30">
                      <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/>
                        <path d="M14 2v6h6M9 13h6M9 17h6"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm sm:text-base">Format PDF</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Recommended untuk print</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* JPG Option */}
              <button
                onClick={() => handleDownload('jpg')}
                disabled={isDownloading}
                className="group relative w-full p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm sm:text-base">Format JPG</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Recommended untuk online</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isDownloading}
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
          </div>

          {/* Close Icon */}
          <button
            onClick={onClose}
            disabled={isDownloading}
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

