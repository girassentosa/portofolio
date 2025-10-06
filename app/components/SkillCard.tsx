"use client";

import { useEffect, useRef, useState } from 'react';

interface SkillCardProps {
  name: string;
  icon: string;
  color: string;
  delay: number;
  category: string;
}

const SkillCard = ({ name, icon, color, delay, category }: SkillCardProps) => {
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

  return (
    <div
      ref={cardRef}
      className={`skill-card relative group transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      suppressHydrationWarning
    >
      <div 
        className="relative p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 md:backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
        style={{
          boxShadow: `0 8px 32px ${color}20`
        }}
        suppressHydrationWarning
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:blur-xl"
          style={{
            background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`
          }}
          suppressHydrationWarning
        />

        {/* Icon container - Horizontal Layout */}
        <div className="relative z-10 flex flex-row items-center gap-3 sm:gap-3.5" suppressHydrationWarning>
          <div 
            className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              boxShadow: `0 4px 20px ${color}30`
            }}
            suppressHydrationWarning
          >
            <img
              src={icon}
              alt={name}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.opacity = '0.3';
              }}
            />
          </div>

          {/* Skill name & category */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold text-white text-left transition-colors duration-300 group-hover:text-white leading-tight truncate">
              {name}
            </h3>
            <p className="text-[10px] sm:text-xs text-white/60 text-left mt-0.5 leading-tight truncate">
              {category}
            </p>
          </div>
        </div>

        {/* Animated border */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, ${color}30, transparent)`,
            backgroundSize: '200% 200%',
            animation: 'borderGlow 3s ease infinite'
          }}
          suppressHydrationWarning
        />
      </div>

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

export default SkillCard;

