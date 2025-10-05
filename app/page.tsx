"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import AnimatedParagraph from "./components/AnimatedParagraph";
import Footer from "./components/Footer";
import CVDownloadModal from "./components/CVDownloadModal";
const ResponsiveBeams = dynamic(() => import("./components/ResponsiveBeams"), { ssr: false });
const Noise = dynamic(() => import("./components/Noise"), { ssr: false });
const BlurText = dynamic(() => import("./components/BlurText"), { ssr: false });
const MagicBento = dynamic(() => import("./components/MagicBento"), { ssr: false });
const SkillCard = dynamic(() => import("./components/SkillCard"), { ssr: false });
const ChromaGrid = dynamic(() => import("./components/ChromaGrid"), { ssr: false });
const ContactCard = dynamic(() => import("./components/ContactCard"), { ssr: false });
const ContactForm = dynamic(() => import("./components/ContactForm"), { ssr: false });
const ScrollReveal = dynamic(() => import("./components/ScrollReveal"), { ssr: false });
const StaggeredReveal = dynamic(() => import("./components/StaggeredReveal"), { ssr: false });
const HomeReveal = dynamic(() => import("./components/HomeReveal"), { ssr: false });
const ClientWrapper = dynamic(() => import("./components/ClientWrapper"), { ssr: false });

export default function Home() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  
  // State untuk data dari database dengan default values
  const [portfolioData, setPortfolioData] = useState<any>({
    home: {
      title: "Loading...",
      subtitle: "",
      description: "",
      profileImage: "/images/profile.jpg",
      stats: []
    },
    about: {
      whoAmI: "",
      myApproach: ""
    },
    skills: [],
    projects: []
  });

  // Fetch data dari API saat component mount
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setPortfolioData(data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };
  return (
    <>
      {/* Beams Background - Fixed Full Screen */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" suppressHydrationWarning>
        <ResponsiveBeams />
      </div>
      
      <main id="home" className="relative" suppressHydrationWarning>
        <ClientWrapper>
          <section className="relative w-full min-h-screen pt-16" suppressHydrationWarning>
        {/* Overlay konten */}
        <div className="relative z-10 py-8 sm:py-12 lg:py-16" suppressHydrationWarning>
          {/* Hero Section */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(100vh-128px)]" suppressHydrationWarning>
              {/* Text Content */}
              <HomeReveal delay={0.6} direction="left" className="order-2 lg:order-1">
                <div className="backdrop-blur-[1px] text-left w-full" suppressHydrationWarning>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-white/80">{portfolioData.home?.subtitle || 'Loading...'}</p>
                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  <BlurText
                      text={portfolioData.home?.title || 'Portfolio'}
                      delay={0}
                    animateBy="words"
                    direction="top"
                    className="inline-block"
                  />
                </h1>
                <AnimatedParagraph
                    text={portfolioData.home?.description || 'Welcome to my portfolio...'}
                    className="mt-4 text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed text-justify"
                  shinySpeed={3}
                />
                {/* Social follow */}
                <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4 text-white/80" suppressHydrationWarning>
                  <span className="text-xs sm:text-sm tracking-wide">Ikuti saya:</span>
                  <div className="flex items-center gap-2 sm:gap-3" suppressHydrationWarning>
                    <a href="#" aria-label="GitHub" className="group relative inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors overflow-hidden">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white/90 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 .5a12 12 0 0 0-3.793 23.392c.6.111.82-.26.82-.579 0-.287-.01-1.049-.016-2.059-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.072 1.836 2.813 1.306 3.498.998.108-.777.42-1.306.763-1.606-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.476 5.921.431.372.815 1.103.815 2.223 0 1.606-.015 2.901-.015 3.296 0 .321.218.694.826.577A12.001 12.001 0 0 0 12 .5Z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="group relative inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors overflow-hidden">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white/90 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7Zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10Zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9Zm5.5-2.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"/>
                      </svg>
                    </a>
                    <a href="#" aria-label="Facebook" className="group relative inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors overflow-hidden">
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white/90 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M13.5 9H15V6.75A3.75 3.75 0 0 1 18.75 3h.75v3h-.75c-.414 0-.75.336-.75.75V9H19l-.5 3h-1.5v9h-3v-9h-1.5V9Z"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.992H8.898V12h1.54V9.797c0-1.52.906-2.36 2.295-2.36.664 0 1.357.118 1.357.118v1.49h-.764c-.752 0-.987.467-.987.946V12h1.68l-.268 2.887h-1.412v6.992C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                  <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4" suppressHydrationWarning>
                  <a href="#project" className="group relative inline-flex items-center justify-center h-12 sm:h-13 px-6 sm:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Jelajahi Proyek Saya
                    </span>
                    <Noise patternAlpha={18} patternRefreshInterval={3} />
                  </a>
                  <button 
                    onClick={() => setIsCVModalOpen(true)}
                    className="group relative inline-flex items-center justify-center h-12 sm:h-13 px-6 sm:px-8 border-2 border-white/30 text-white text-xs sm:text-sm font-semibold rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Unduh CV Saya
                    </span>
                    <Noise patternAlpha={12} patternRefreshInterval={4} />
                  </button>
                </div>

                {/* Stats chips */}
                <div className="mt-5 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3" suppressHydrationWarning>
                  {portfolioData.home?.stats?.map((stat: any, index: number) => (
                    <div key={index} className="relative inline-flex w-full h-14 sm:h-16 px-3 sm:px-5 items-center justify-center rounded-lg sm:rounded-xl bg-white/10 text-white/90 border border-white/15 overflow-hidden backdrop-blur-sm shadow-[0_6px_22px_rgba(0,0,0,0.25)]" suppressHydrationWarning>
                    <div className="relative z-10 flex flex-col leading-tight items-center text-center" suppressHydrationWarning>
                        <span className="text-base sm:text-lg font-semibold">{stat.value}</span>
                        <span className="text-[11px] sm:text-[13px] opacity-80">{stat.label}</span>
                    </div>
                    <Noise patternAlpha={14} patternRefreshInterval={5} />
                    </div>
                  ))}
                  </div>
                </div>
              </HomeReveal>
              
              {/* Profile Card */}
              <HomeReveal delay={0.3} direction="right" className="order-1 lg:order-2">
                <div className="flex justify-center lg:justify-end w-full" suppressHydrationWarning>
                  <ProfileCard
                    avatarUrl={portfolioData.home.profileImage}
                    iconUrl={portfolioData.home.profileImage}
                    name={portfolioData.home.title}
                    onContactClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  />
              </div>
              </HomeReveal>
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 lg:mt-20" style={{ scrollMarginTop: '4rem' }} suppressHydrationWarning>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full" suppressHydrationWarning>
              {/* Section Title */}
              <ScrollReveal direction="down" delay={0}>
                <div className="text-center mb-8 sm:mb-10 lg:mb-12" suppressHydrationWarning>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" suppressHydrationWarning>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    About Me
                  </span>
                </h2>
                <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                  Mengenal lebih dekat tentang saya, perjalanan, dan pendekatan saya dalam dunia teknologi
                </p>
              </div>
              </ScrollReveal>

              {/* About Content */}
              <ScrollReveal direction="up" delay={0.2}>
              <div className="w-full" suppressHydrationWarning>
                <MagicBento
                  cardData={[
                    {
                      color: '#060010',
                      title: 'Who am I',
                      description: portfolioData.about.whoAmI,
                      label: ''
                    },
                    {
                      color: '#060010',
                      title: 'My Approach',
                      description: portfolioData.about.myApproach,
                      label: ''
                    },
                    {
                      color: '#060010',
                      title: 'Personal Info',
                      description: '',
                      label: ''
                    }
                  ]}
                  textAutoHide={true}
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={280}
                  particleCount={8}
                  glowColor="132, 0, 255"
                />
              </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Skills Section */}
          <div id="skills" className="py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 lg:mt-20" style={{ scrollMarginTop: '4rem' }} suppressHydrationWarning>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full" suppressHydrationWarning>
              {/* Section Title */}
              <ScrollReveal direction="down" delay={0}>
                <div className="text-center mb-8 sm:mb-10 lg:mb-12" suppressHydrationWarning>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" suppressHydrationWarning>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    My Skills & Expertise
                  </span>
                </h2>
                <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                  Teknologi dan tools yang saya kuasai untuk membangun solusi digital yang inovatif dan modern
                </p>
              </div>
              </ScrollReveal>

              {/* Skills Grid */}
              <div className="w-full" suppressHydrationWarning>
                <StaggeredReveal direction="left" staggerDelay={0.08} initialDelay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4" suppressHydrationWarning>
                    {portfolioData.skills.map((skill: any, index: number) => (
                  <SkillCard 
                        key={skill.id}
                        name={skill.name} 
                        category={skill.category}
                        icon={skill.icon} 
                        color={skill.color}
                        delay={index * 20}
                      />
                    ))}
                </div>
                </StaggeredReveal>
              </div>
            </div>
          </div>

          {/* Project Section */}
          <div id="project" className="py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 lg:mt-20" style={{ scrollMarginTop: '4rem' }} suppressHydrationWarning>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full" suppressHydrationWarning>
              {/* Section Title */}
              <ScrollReveal direction="down" delay={0}>
                <div className="text-center mb-8 sm:mb-10 lg:mb-12" suppressHydrationWarning>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" suppressHydrationWarning>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    My Projects
                  </span>
                </h2>
                <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                  Berikut adalah beberapa project yang telah saya kerjakan dengan berbagai teknologi modern
                </p>
              </div>
              </ScrollReveal>

              {/* Projects Grid */}
              <div className="w-full min-h-[500px] sm:min-h-[700px]" suppressHydrationWarning>
                <ChromaGrid 
                  items={portfolioData.projects.map((project: any) => ({
                    image: project.image,
                    title: project.title,
                    subtitle: project.subtitle,
                    handle: project.tech,
                    borderColor: project.borderColor,
                    gradient: project.gradient,
                    url: project.url
                  }))}
                  radius={300}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact" className="py-12 sm:py-16 lg:py-20 mt-12 sm:mt-16 lg:mt-20" style={{ scrollMarginTop: '4rem' }} suppressHydrationWarning>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full" suppressHydrationWarning>
              {/* Section Title */}
              <ScrollReveal direction="down" delay={0}>
                <div className="text-center mb-8 sm:mb-10 lg:mb-12" suppressHydrationWarning>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" suppressHydrationWarning>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    Get In Touch
                  </span>
                </h2>
                <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed" suppressHydrationWarning>
                  Mari berkolaborasi dan wujudkan ide Anda menjadi kenyataan. Hubungi saya melalui platform favorit Anda!
                </p>
              </div>
              </ScrollReveal>

              {/* Contact Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center" suppressHydrationWarning>
                {/* Left Side - Contact Info */}
                <ScrollReveal direction="left" delay={0.2}>
                <div className="flex flex-col justify-center space-y-4 sm:space-y-5" suppressHydrationWarning>
                  <ContactCard
                    icon="whatsapp"
                    label="WhatsApp"
                    value="081265098103"
                    href="https://wa.me/6281265098103"
                    color="#25D366"
                    delay={0}
                  />
                  
                  <ContactCard
                    icon="email"
                    label="Email"
                    value="tajijaddagirassntosa@gmail.com"
                    href="mailto:tajijaddagirassntosa@gmail.com"
                    color="#EA4335"
                    delay={100}
                  />
                  
                  <ContactCard
                    icon="instagram"
                    label="Instagram"
                    value="@tajijaddagiras_"
                    href="https://instagram.com/tajijaddagiras_"
                    color="#E4405F"
                    delay={200}
                  />
                  
                  <ContactCard
                    icon="tiktok"
                    label="TikTok"
                    value="Segera Hadir"
                    href="#"
                    color="#00F2EA"
                    delay={300}
                    available={false}
                  />
                </div>
                </ScrollReveal>

                {/* Right Side - Contact Form */}
                <ScrollReveal direction="right" delay={0.2}>
                <div className="relative flex items-center" suppressHydrationWarning>
                  <div className="relative w-full p-5 sm:p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl" suppressHydrationWarning>
                    {/* Glow effect */}
                    <div 
                      className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-xl opacity-20"
                      suppressHydrationWarning
                    />
                    
                    <div className="relative z-10" suppressHydrationWarning>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                        Kirim Pesan Langsung
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-5">
                        Isi form dan pesan akan otomatis terkirim ke platform pilihan Anda
                      </p>
                      
                      <ContactForm
                        whatsapp="6281265098103"
                        email="tajijaddagirassntosa@gmail.com"
                        instagram="tajijaddagiras_"
                      />
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
        </ClientWrapper>
      </main>

      {/* CV Download Modal */}
      <CVDownloadModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)} 
      />
    </>
  );
}
