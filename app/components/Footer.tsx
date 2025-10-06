"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#project" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/6281265098103",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      color: "#25D366"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/tajijaddagiras_",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: "#E4405F"
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M12 .5a12 12 0 0 0-3.793 23.392c.6.111.82-.26.82-.579 0-.287-.01-1.049-.016-2.059-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.072 1.836 2.813 1.306 3.498.998.108-.777.42-1.306.763-1.606-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.476 5.921.431.372.815 1.103.815 2.223 0 1.606-.015 2.901-.015 3.296 0 .321.218.694.826.577A12.001 12.001 0 0 0 12 .5Z" clipRule="evenodd" />
        </svg>
      ),
      color: "#FFFFFF"
    },
    {
      name: "Email",
      href: "mailto:tajijaddagirassntosa@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: "#EA4335"
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-[#0a0a0f] to-black overflow-hidden border-t border-white/5" suppressHydrationWarning>
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20" suppressHydrationWarning>
        <div className="absolute inset-0" suppressHydrationWarning style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full md:blur-[100px]" suppressHydrationWarning />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full md:blur-[100px]" suppressHydrationWarning />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24" suppressHydrationWarning>
        {/* Main Grid - 4 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12" suppressHydrationWarning>
          
          {/* Brand Section - Spans 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6" suppressHydrationWarning>
            <div suppressHydrationWarning>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Taji Jadda Giras Sentosa
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                Web Developer & IoT Specialist yang bersemangat dalam menciptakan solusi digital inovatif dan efisien.
              </p>
            </div>

            {/* Social Media */}
            <div suppressHydrationWarning>
              <h4 className="text-xs font-semibold text-white/50 mb-4 uppercase tracking-wider">Connect With Me</h4>
              <div className="flex gap-3" suppressHydrationWarning>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    title={social.name}
                  >
                    {/* Icon Container */}
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1" suppressHydrationWarning>
                      {/* Glow Effect on Hover */}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:blur-xl"
                        style={{ background: `${social.color}40` }}
                        suppressHydrationWarning
                      />
                      
                      {/* Icon */}
                      <div className="relative w-5 h-5 transition-transform duration-300" style={{ color: social.color }} suppressHydrationWarning>
                        {social.icon}
                      </div>
                    </div>

                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div suppressHydrationWarning>
            <h4 className="text-xs font-semibold text-white/50 mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3" suppressHydrationWarning>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group text-gray-400 hover:text-white transition-all duration-300 inline-flex items-center text-sm sm:text-base"
                  >
                    <span className="inline-block mr-0 opacity-0 -translate-x-2 group-hover:mr-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-purple-400">
                      →
                    </span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div suppressHydrationWarning>
            <h4 className="text-xs font-semibold text-white/50 mb-6 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-4" suppressHydrationWarning>
              <li className="group">
                <a href="tel:081265098103" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-transparent group-hover:from-green-500/20 transition-all duration-300" suppressHydrationWarning>
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm pt-1.5">081265098103</span>
                </a>
              </li>
              <li className="group">
                <a href="mailto:tajijaddagirassntosa@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-transparent group-hover:from-blue-500/20 transition-all duration-300" suppressHydrationWarning>
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm pt-1.5 break-all">tajijaddagirassntosa@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-transparent" suppressHydrationWarning>
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm pt-1.5">Universitas Samudra</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative h-px mb-8" suppressHydrationWarning>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" suppressHydrationWarning />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 md:blur-sm" suppressHydrationWarning />
        </div>

        {/* Bottom Section - Copyright & Credits */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm" suppressHydrationWarning>
          <p className="text-gray-400">
            © {currentYear} <span className="text-white font-medium">Taji Jadda Giras Sentosa</span>. All rights reserved.
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            Made with <span className="text-red-500 animate-pulse inline-block">❤</span> using 
            <span className="text-white font-medium">Next.js</span> & 
            <span className="text-white font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>

      {/* Bottom Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-80" suppressHydrationWarning />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
      `}</style>
    </footer>
  );
}
