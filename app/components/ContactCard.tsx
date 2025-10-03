"use client";

import { useEffect, useRef, useState } from 'react';

interface ContactCardProps {
  icon: 'whatsapp' | 'instagram' | 'email' | 'tiktok';
  label: string;
  value: string;
  href: string;
  color: string;
  delay: number;
  available?: boolean;
}

const ContactCard = ({ icon, label, value, href, color, delay, available = true }: ContactCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getIcon = () => {
    switch (icon) {
      case 'whatsapp':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'email':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
          </svg>
        );
    }
  };

  return (
    <div
      ref={cardRef}
      className={`contact-card relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
      suppressHydrationWarning
    >
      <a
        href={available ? href : undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => !available && e.preventDefault()}
        className={`relative block p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 transition-all duration-500 overflow-hidden ${
          available ? 'hover:border-white/40 hover:scale-105 hover:shadow-2xl cursor-pointer' : ''
        }`}
        style={{
          boxShadow: `0 8px 32px ${color}20`
        }}
        suppressHydrationWarning
      >
        {/* Glow effect on hover */}
        <div 
          className={`absolute inset-0 opacity-0 ${available ? 'group-hover:opacity-100' : ''} transition-opacity duration-500 blur-xl`}
          style={{
            background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`
          }}
          suppressHydrationWarning
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-4" suppressHydrationWarning>
          {/* Icon */}
          <div 
            className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl transition-all duration-500 ${
              available ? 'group-hover:scale-110 group-hover:rotate-6' : ''
            } flex-shrink-0`}
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}10)`,
              boxShadow: `0 4px 20px ${color}40`,
              color: color
            }}
            suppressHydrationWarning
          >
            {getIcon()}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
              {label}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 truncate">
              {value}
            </p>
            {!available && (
              <span className="inline-block mt-1 text-[10px] sm:text-xs text-yellow-400">
                Belum Tersedia
              </span>
            )}
          </div>

          {/* Arrow Icon */}
          {available && (
            <svg 
              className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>

        {/* Animated border */}
        <div 
          className={`absolute inset-0 rounded-2xl opacity-0 ${available ? 'group-hover:opacity-100' : ''} transition-opacity duration-500`}
          style={{
            background: `linear-gradient(45deg, transparent, ${color}30, transparent)`,
            backgroundSize: '200% 200%',
            animation: 'borderGlow 3s ease infinite'
          }}
          suppressHydrationWarning
        />
      </a>

      <style jsx>{`
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default ContactCard;

