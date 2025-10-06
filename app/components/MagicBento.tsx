"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import ElectricBorder from './ElectricBorder';
import Image from 'next/image';

const DEFAULT_PARTICLE_COUNT = 6; // OPTIMIZED: Reduced from 12
const DEFAULT_SPOTLIGHT_RADIUS = 250; // OPTIMIZED: Smaller radius
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const defaultCardData = [
  {
    color: '#060010',
    title: 'Who am I',
    description:
      'Saya adalah seorang pengembang web dan IoT yang bersemangat dalam menciptakan solusi inovatif dan efisien. Saya menyukai tantangan dalam menerjemahkan ide kompleks menjadi aplikasi yang mudah digunakan.',
    label: ''
  },
  {
    color: '#060010',
    title: 'My Approach',
    description:
      '• Fokus pada kebutuhan pengguna.\n• Desain yang bersih dan intuitif.\n• Pengembangan berkelanjutan dengan feedback.',
    label: ''
  },
  {
    color: '#060010',
    title: 'Personal Info',
    description: '',
    label: ''
  },
];

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);pointer-events:none;z-index:100;left:${x}px;top:${y}px;`;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({ proximity: radius * 0.5, fadeDistance: radius * 0.75 });

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({ children, className = '', disableAnimations = false, style, particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR, enableTilt = true, clickEffect = false, enableMagnetism = false }: any) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<any[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<any>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill?.();
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          const parent = particle.parentNode as (Node & ParentNode) | null;
          if (parent) parent.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) { initializeParticles(); }
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    const handleMouseEnter = () => { isHoveredRef.current = true; animateParticles(); if (enableTilt) { gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 }); } };
    const handleMouseLeave = () => { isHoveredRef.current = false; clearAllParticles(); if (enableTilt) { gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' }); } if (enableMagnetism) { gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' }); } };
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top; const centerX = rect.width / 2; const centerY = rect.height / 2;
      if (enableTilt) { const rotateX = ((y - centerY) / centerY) * -10; const rotateY = ((x - centerX) / centerX) * 10; gsap.to(element, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 }); }
      if (enableMagnetism) { const magnetX = (x - centerX) * 0.05; const magnetY = (y - centerY) * 0.05; magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.3, ease: 'power2.out' }); }
    };
    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return; const rect = element.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement('div'); ripple.style.cssText = `position:absolute;width:${maxDistance * 2}px;height:${maxDistance * 2}px;border-radius:50%;background:radial-gradient(circle, rgba(${DEFAULT_GLOW_COLOR},0.4) 0%, rgba(${DEFAULT_GLOW_COLOR},0.2) 30%, transparent 70%);left:${x - maxDistance}px;top:${y - maxDistance}px;pointer-events:none;z-index:1000;`;
      element.appendChild(ripple); gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };
    element.addEventListener('mouseenter', handleMouseEnter); element.addEventListener('mouseleave', handleMouseLeave); element.addEventListener('mousemove', handleMouseMove); element.addEventListener('click', handleClick);
    return () => { isHoveredRef.current = false; element.removeEventListener('mouseenter', handleMouseEnter); element.removeEventListener('mouseleave', handleMouseLeave); element.removeEventListener('mousemove', handleMouseMove); element.removeEventListener('click', handleClick); clearAllParticles(); };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect]);

  return (<div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>{children}</div>);
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }: any) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);
  const lastCallTime = useRef(0); // OPTIMIZED: Throttle tracking
  
  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle, rgba(${glowColor},0.15) 0%, rgba(${glowColor},0.08) 15%, rgba(${glowColor},0.04) 25%, rgba(${glowColor},0.02) 40%, rgba(${glowColor},0.01) 65%, transparent 70%);z-index:200;opacity:0;transform:translate(-50%, -50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight); spotlightRef.current = spotlight;
    
    const handleMouseMove = (e: MouseEvent) => {
      // OPTIMIZED: Throttle to 60fps max (16.67ms)
      const now = Date.now();
      if (now - lastCallTime.current < 16) return;
      lastCallTime.current = now;
      if (!spotlightRef.current || !gridRef.current) return;
      const section = (gridRef.current as HTMLElement).closest('.bento-section') as HTMLElement | null;
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      isInsideSection.current = !!mouseInside;
      const cards = (gridRef.current as HTMLElement).querySelectorAll('.card');
      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach((card) => (card as HTMLElement).style.setProperty('--glow-intensity', '0'));
        return;
      }
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      cards.forEach((card) => {
        const el = card as HTMLElement; const cardRect = el.getBoundingClientRect(); const centerX = cardRect.left + cardRect.width / 2; const centerY = cardRect.top + cardRect.height / 2; const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2; const effectiveDistance = Math.max(0, distance); minDistance = Math.min(minDistance, effectiveDistance);
        let glowIntensity = 0; if (effectiveDistance <= proximity) glowIntensity = 1; else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        updateCardGlowProperties(el, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });
      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };
    const handleMouseLeave = () => { isInsideSection.current = false; (gridRef.current as HTMLElement)?.querySelectorAll('.card').forEach((card) => { (card as HTMLElement).style.setProperty('--glow-intensity', '0'); }); if (spotlightRef.current) { gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }); } };
    document.addEventListener('mousemove', handleMouseMove); document.addEventListener('mouseleave', handleMouseLeave);
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseleave', handleMouseLeave); spotlightRef.current?.parentNode?.removeChild(spotlightRef.current!); };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);
  return null;
};

const BentoCardGrid = ({ children, gridRef }: any) => (
  <div className="bento-section w-full select-none relative" style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.5vw, 1.125rem)' }} ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT); check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check); }, []);
  return isMobile;
};

export default function MagicBento({ cardData = defaultCardData, textAutoHide = true, enableStars = true, enableSpotlight = true, enableBorderGlow = true, disableAnimations = false, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, particleCount = DEFAULT_PARTICLE_COUNT, enableTilt = false, glowColor = DEFAULT_GLOW_COLOR, clickEffect = true, enableMagnetism = true, aboutImage = '/images/profile1.jpg' }: any) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  return (
    <>
      <style>{`
        .bento-section { --glow-x:50%; --glow-y:50%; --glow-intensity:0; --glow-radius:200px; --glow-color:${DEFAULT_GLOW_COLOR}; --border-color:#392e4e; --background-dark:#060010; --white:hsl(0,0%,100%);} 
        .card-responsive { 
          display: grid;
          grid-template-columns: 1fr; 
          width: 100%; 
          margin: 0; 
          padding: 0;
          gap: 0.5rem;
        }
        @media (min-width: 640px) { 
          .card-responsive { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 0.5rem;
          } 
        }
        @media (min-width: 1024px) { 
          .card-responsive { 
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          } 
          .card-responsive .card:nth-child(3) { 
            grid-column: 1 / -1; 
          } 
        }
        .card--border-glow::after{ 
          content:''; 
          position:absolute; 
          inset:0; 
          padding:6px; 
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${DEFAULT_GLOW_COLOR}, .8) 0%, rgba(${DEFAULT_GLOW_COLOR}, .4) 30%, transparent 60%); 
          border-radius:inherit; 
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); 
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); 
          -webkit-mask-composite:xor; 
          mask-composite:subtract; 
          pointer-events:none; 
          transition:opacity .3s ease; 
          z-index:1; 
        }
        .card--border-glow:hover::after{ opacity:1; }
        .card--border-glow:hover{ box-shadow:0 4px 20px rgba(46,24,78,.4), 0 0 30px rgba(132,0,255, .2);} 
        .particle::before{ 
          content:''; 
          position:absolute; 
          top:-2px; 
          left:-2px; 
          right:-2px; 
          bottom:-2px; 
          background:rgba(132,0,255, .2); 
          border-radius:50%; 
          z-index:-1; 
        }
        .text-clamp-1{ display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; line-clamp:1; overflow:hidden; text-overflow:ellipsis;}
        .text-clamp-2{ display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; line-clamp:2; overflow:hidden; text-overflow:ellipsis;}
      `}</style>
      {enableSpotlight && (<GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} glowColor={DEFAULT_GLOW_COLOR} />)}
      <BentoCardGrid gridRef={gridRef}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-6 lg:gap-8 items-center">
          {/* Cards Section */}
          <div className="card-responsive order-2 lg:order-1">
            {cardData.map((card: any, index: number) => {
              const baseClassName = `card flex flex-col justify-start gap-2 relative min-h-[180px] sm:min-h-[200px] w-full max-w-full p-4 sm:p-5 lg:p-6 rounded-2xl border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${enableBorderGlow ? 'card--border-glow' : ''}`;
              const cardStyle: any = { backgroundColor: card.color || 'var(--background-dark)', borderColor: 'var(--border-color)', color: 'var(--white)', '--glow-x': '50%', '--glow-y': '50%', '--glow-intensity': '0', '--glow-radius': '200px' };
              return (
                <ParticleCard key={index} className={baseClassName} style={cardStyle} disableAnimations={shouldDisableAnimations} particleCount={particleCount} glowColor={DEFAULT_GLOW_COLOR} enableTilt={enableTilt} clickEffect={clickEffect} enableMagnetism={enableMagnetism}>
                  <div className="card__header flex justify-between gap-3 relative text-white"><span className="card__label text-sm sm:text-base">{card.label}</span></div>
                  <div className="card__content flex flex-col relative text-white">
                    <h3 className={`card__title font-normal text-lg sm:text-xl m-0 mb-2 flex items-center gap-2`}>
                      {/* Icon bulat */}
                      <span className="inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-white/90 flex-shrink-0"></span>
                      <span className="leading-tight">{card.title}</span>
                    </h3>
                    {card.title === 'My Approach' ? (
                      <ul className="mt-1 space-y-2">
                        {card.description?.split('\n').map((line: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm sm:text-base leading-6 sm:leading-7 opacity-90">
                            <span className="mt-1.5 sm:mt-2 inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/90 flex-shrink-0"></span>
                            <span className="flex-1">{line.replace(/^•\s?/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    ) : card.title === 'Who am I' ? (
                      <p className={`card__description text-sm sm:text-base leading-6 sm:leading-7 opacity-90 text-justify hyphens-auto`}>{card.description || ''}</p>
                    ) : card.title === 'Personal Info' ? (
                      <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2.5 sm:gap-y-3 text-sm sm:text-base leading-6 sm:leading-7 opacity-90">
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Zm0 2c-3.866 0-7 2.686-7 6v1h14v-1c0-3.314-3.134-6-7-6Z"/></svg>
                          <span className="break-words">Taji Jadda Giras Sentosa</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 1 21h22L12 2Zm0 4.3L19.53 19H4.47L12 6.3ZM11 10v6h2v-6h-2Zm0 8v2h2v-2h-2Z"/></svg>
                          <span className="break-words">3.68/4.00</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 5.4 9.58 8.21 10.77.5.21 1.08.21 1.58 0C15.6 20.58 21 16.25 21 11c0-4.97-4.03-9-9-9Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>
                          <span className="break-words">Universitas Samudra</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v2h18V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm14 8H3v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8Zm-9 2h2v2h-2v-2Z"/></svg>
                          <span className="break-words">Medan, 01 Mei 2003</span>
                        </div>
                        <div className="flex items-center gap-2 md:col-span-2">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm.5 5c.828 0 1.5.672 1.5 1.5S13.328 10 12.5 10 11 9.328 11 8.5 11.672 7 12.5 7ZM9 17a3.5 3.5 0 1 1 7 0H9Z"/></svg>
                          <span className="break-all">tajijaddagirassntosa@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 3h15A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3Zm2.25 4.5 5.25 3.75L17.25 7.5H6.75ZM6.75 9.75v6.75h10.5V9.75l-5.25 3.75L6.75 9.75Z"/></svg>
                          <span className="break-words">081234567890</span>
                        </div>
                        <div className="flex items-center gap-2 md:col-span-2">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>
                          <span className="break-words">Dusun VI Sipaku Area, Kec. Simpang Empat, Kab. Asahan</span>
                        </div>
                      </div>
                    ) : (
                      <p className={`card__description text-sm sm:text-base leading-6 sm:leading-7 opacity-90`}>{card.description}</p>
                    )}
                  </div>
                </ParticleCard>
              );
            })}
          </div>

          {/* ElectricBorder Section */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end w-full lg:w-auto">
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 16 }}
              className="w-full max-w-sm sm:max-w-md lg:max-w-none"
            >
              <div className="relative w-full aspect-[3/4] lg:w-[280px] lg:h-[520px] overflow-hidden" style={{ borderRadius: 16 }}>
                <Image
                  src={aboutImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  priority
                />
              </div>
            </ElectricBorder>
          </div>
        </div>
      </BentoCardGrid>
    </>
  );
}


