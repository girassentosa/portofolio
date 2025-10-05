"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import GooeyNav from "./GooeyNav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { 
      label: "Home", 
      href: "#home",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      label: "About", 
      href: "#about",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      label: "Skills", 
      href: "#skills",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    { 
      label: "Project", 
      href: "#project",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      label: "Contact", 
      href: "#contact",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-black/10 bg-white/90 text-black shadow-[0_4px_18px_rgba(0,0,0,0.12)] backdrop-blur" suppressHydrationWarning>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
          <div className="flex h-16 items-center justify-between" suppressHydrationWarning>
            <Link href="#home" className="text-lg font-semibold hover:text-purple-600 transition-colors">
              Portofolio
            </Link>

            <div className="hidden md:flex items-center" suppressHydrationWarning>
              <GooeyNav
                items={navItems.map(item => ({ label: item.label, href: item.href }))}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 4, 1, 2, 3, 4]}
              />
            </div>

            <button
              aria-label="Toggle Menu"
              onClick={() => setOpen(!open)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border border-transparent hover:border-purple-200 transition-all duration-200"
            >
              <svg
                className={`h-6 w-6 transition-all duration-300 ${open ? 'rotate-90' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {open ? (
                  /* X icon saat menu terbuka */
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  /* Hamburger saat menu tertutup */
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MODERN MOBILE MENU - SIDEBAR STYLE (Slide dari kanan, halaman masih kelihatan) */}
      <>
        {/* Overlay - Transparent, halaman masih terlihat */}
        {open && (
          <div
            className="md:hidden fixed inset-0 z-[99] bg-black/40 backdrop-blur-[2px] animate-fadeIn"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar Menu dari Kiri - Background putih simple */}
        <aside
          className={`md:hidden fixed top-0 left-0 z-[100] h-screen w-[75%] max-w-[280px] overflow-hidden border-r border-black/10 bg-white/90 backdrop-blur shadow-[0_4px_18px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Content */}
          <div className="h-full flex flex-col p-5 sm:p-6 overflow-y-auto">
            {/* Spacing tanpa header "Menu" */}
            <div className="mb-6 sm:mb-8"></div>

            {/* Decorative blur elements - subtle */}
            <div className="absolute top-16 right-4 w-20 h-20 bg-purple-200/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-28 left-4 w-24 h-24 bg-pink-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-2 flex-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group relative flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]'
                        : 'bg-black/5 text-black hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-[1.02]'
                    }`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      opacity: open ? 1 : 0,
                      transform: open ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.3s ease-out ${index * 50}ms`
                    }}
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 transition-all duration-300 ${
                      isActive ? 'scale-110 text-white' : 'text-black/70 group-hover:scale-110 group-hover:rotate-6 group-hover:text-purple-600'
                    }`}>
                      {item.icon}
                    </div>

                    {/* Label */}
                    <span className="text-base font-semibold flex-1">{item.label}</span>

                    {/* Active Indicator & Arrow */}
                    {isActive ? (
                      <div className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white/50" />
                    ) : (
                      <svg 
                        className="w-4 h-4 text-black/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-purple-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}

                    {/* Border glow for active - di sisi kanan untuk sidebar kiri */}
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-l-full shadow-lg shadow-purple-500/50" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-4 sm:pt-6 border-t border-black/10">
              <p className="text-black/50 text-xs text-center">
                Tap outside to close
              </p>
            </div>
          </div>
        </aside>
      </>
    </>
  );
}


