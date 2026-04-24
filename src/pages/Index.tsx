import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import BlobCrowd from '@/components/BlobCrowd';
import LightSwitch from '@/components/LightSwitch';
import AboutSection from '@/components/AboutSection';
import PursuitsTapeBand from '@/components/PursuitsTapeBand';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import ProjectsTimeline from '@/components/ProjectsTimeline';
import AchievementsSection from '@/components/AchievementsSection';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Instagram, ExternalLink, ArrowRight, Mail } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { JsonLdHome } from '@/seo/JsonLdHome';
import { DEFAULT_DESCRIPTION } from '@/seo/config';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

const TITLES = ['Developer.', 'Hackathon Winner.', 'Competitive Programmer.', 'UI Animator.'];

type FooterPaletteColor = { hex: string; name: string; textColor: string };

const FOOTER_PALETTE: FooterPaletteColor[] = [
  { hex: '#DAFC92', name: 'Lime Cream', textColor: '#1a3a00' },
  { hex: '#F5F0E8', name: 'Parchment', textColor: '#0E0E0E' },
  { hex: '#1B3970', name: 'Regal Navy', textColor: '#DAFC92' },
  { hex: '#FF5C5C', name: 'Vibrant Coral', textColor: '#1a0000' },
  { hex: '#B399FF', name: 'Soft Periwinkle', textColor: '#1a0030' },
  { hex: '#FFBE0B', name: 'Amber Gold', textColor: '#1a0a00' },
  { hex: '#0E0E0E', name: 'Onyx', textColor: '#DAFC92' },
];

const BLOB_DISPLAY_NAMES: Record<string, string> = {
  dev: 'developer',
  minecraft: 'minecraft_player',
  lego: 'lego_builder',
  funnyguy: 'funny_guy',
  popculture: 'culture_nerd',
  hackathon: 'hackathon-er',
  cprog: 'competitive_programmer',
  nerd: 'geek',
  chef: 'chef',
  clumsy: 'mr_clumsy',
  sleepy: 'night_owl',
  graphicdesigner: 'designer',
  astronaut: 'space_enthusiast',
  angry: 'angry',
  detective: 'problem_solver',
  tinystranger: 'forgetful',
};

gsap.registerPlugin(ScrollTrigger);

const HeroPage: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [hoveredBlob, setHoveredBlob] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Typewriter effect
  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayedText.length < currentTitle.length) {
        timeout = setTimeout(() => setDisplayedText(currentTitle.slice(0, displayedText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => setDisplayedText(currentTitle.slice(0, displayedText.length - 1)), 40);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.35,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Card stagger animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardRef.current) return;

    const elements = cardRef.current.querySelectorAll('[data-animate]');
    gsap.set(elements, { y: 50, opacity: 0 });
    
    const tl = gsap.timeline({ delay: 0.4 });
    tl.to(elements, {
      y: 0, opacity: 1,
      duration: 0.7, stagger: 0.15, ease: 'power3.out'
    });

    if (stampRef.current && window.innerWidth >= 768) {
      tl.from(stampRef.current, { scale: 3, rotation: -15, opacity: 0, duration: 0.4, ease: 'power4.in' }, '+=0.2');
    }
  }, []);

  // Handle scroll to fade out indicator
  useEffect(() => {
    const onScroll = () => {
      if (scrollIndicatorRef.current && window.scrollY > 10) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (scrollIndicatorRef.current) gsap.to(scrollIndicatorRef.current, { y: 8, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, []);

  const bgColor = isDark ? '#0B1426' : '#DAFC92';
  // Standardizing text boxes so they are consistent
  const textColor = '#f5f5f5'; // Always light text to contrast the dark navy card
  const mutedText = 'rgba(255,255,255,0.7)'; // Always light
  const cardBg = isDark ? 'rgba(11,20,38,0.85)' : 'rgba(13,42,110,0.92)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(218,252,146,0.35)';
  const iconBg = 'rgba(255,255,255,0.08)'; // Slightly visible white background
  const iconColor = '#DAFC92'; // Lime green icons

  const gridColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(13,42,110,0.12)';
  const anayNameColor = '#DAFC92'; // Lime green in both
  const btnPrimaryBg = '#DAFC92';
  const btnPrimaryText = '#0B1426'; // Dark blue text

  const handleDotClick = (e: React.MouseEvent, type: 'red' | 'green') => {
    if (!cardRef.current) return;
    if (type === 'red') {
      gsap.fromTo(cardRef.current, { scaleX: 0.97, scaleY: 0.97 }, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out' });
    } else {
      gsap.fromTo(cardRef.current, { scale: 1.03 }, { scale: 1, duration: 0.6, ease: 'elastic.out' });
    }
  };

  const gradientBorder = isDark
    ? 'linear-gradient(135deg, rgba(218,252,146,0.1) 0%, rgba(255,255,255,0.05) 35%, rgba(179,153,255,0.1) 100%'
    : 'linear-gradient(135deg, rgba(218, 252, 146, 0.1), rgba(27,57,112,0.05) 50%, rgba(179,153,255,0.3) 100%)';

  const renderFooterPaletteSwatch = (
    c: FooterPaletteColor,
    compact: boolean,
    extraStyle?: React.CSSProperties,
  ) => (
    <div
      key={c.hex}
      style={{
        background: c.hex,
        borderRadius: 0,
        border: compact ? '1.5px solid #0E0E0E' : '2px solid #0E0E0E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        transition: 'transform 0.2s, box-shadow 0.2s, z-index 0.2s',
        position: 'relative',
        zIndex: 1,
        minWidth: 0,
        boxSizing: 'border-box',
        ...(compact
          ? { height: 36, padding: '4px 5px', ...extraStyle }
          : { flex: 1, height: 48, minWidth: 60, padding: '8px 10px', ...extraStyle }),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = `0 0 15px ${c.hex}`;
        e.currentTarget.style.zIndex = '10';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.zIndex = '1';
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: compact ? '0.35rem' : '0.45rem',
          fontWeight: 700,
          color: c.textColor,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          lineHeight: 1.15,
          wordBreak: 'break-word',
          hyphens: 'auto',
        }}
      >
        {c.name}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: compact ? '0.32rem' : '0.4rem',
          fontWeight: 400,
          color: c.textColor,
          opacity: 0.75,
          lineHeight: 1.15,
          marginTop: 1,
        }}
      >
        {c.hex}
      </span>
    </div>
  );

  return (
    <div className="w-full relative bg-black">
      <Seo
        title="Developer, UI animator, and competitive programmer"
        description={DEFAULT_DESCRIPTION}
        pathname="/"
      />
      <JsonLdHome />
      <div className="sticky top-0 z-0 w-full h-screen overflow-hidden" style={{ background: bgColor, transition: 'background 0.6s ease' }}>

        <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>

        {/* === ABSTRACT BACKGROUND SPLASH === */}
        {/* Large organic blob shapes for visual interest */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: isDark ? 0.07 : 0.12, transition: 'opacity 0.6s' }} preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -8" /></filter>
          </defs>
          <g filter="url(#gooey)">
            <ellipse cx="75%" cy="60%" rx="260" ry="200" fill={isDark ? '#DAFC92' : '#0d2a6e'} />
            <ellipse cx="85%" cy="30%" rx="180" ry="140" fill={isDark ? '#4ECDC4' : '#1E488F'} />
            <ellipse cx="60%" cy="80%" rx="220" ry="160" fill={isDark ? '#9B59FF' : '#0d2a6e'} />
            <ellipse cx="90%" cy="70%" rx="150" ry="130" fill={isDark ? '#FF6B9D' : '#1E3A8A'} />
            {/* New oval below text box and a little to right */}
            <ellipse cx="15%" cy="80%" rx="220" ry="160" fill={isDark ? '#9B59FF' : '#0d2a6e'} />
            <ellipse cx="30%" cy="65%" rx="200" ry="150" fill={isDark ? '#4ECDC4' : '#1E488F'} />
            <ellipse cx="20%" cy="60%" rx="80" ry="130" fill={isDark ? '#FF6B9D' : '#1E3A8A'} />
            <ellipse cx="35%" cy="-8%" rx="200" ry="150" fill={isDark ? '#DAFC92' : '#0d2a6e'} />
            <ellipse cx="45%" cy="12%" rx="80" ry="60" fill={isDark ? '#FF6B9D' : '#1E3A8A'} />
          </g>
        </svg>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transition: 'opacity 0.6s',
        }} />

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(218,252,146,0.1)' : 'rgba(13,42,110,0.12)'} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />

        {/* Corner lines */}
        <svg className="absolute top-6 left-6 pointer-events-none" width="80" height="80" style={{ opacity: isDark ? 0.15 : 0.2, transition: 'opacity 0.6s' }}>
          <line x1="0" y1="0" x2="80" y2="0" stroke={isDark ? '#DAFC92' : '#0d2a6e'} strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="80" stroke={isDark ? '#DAFC92' : '#0d2a6e'} strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-6 right-6 pointer-events-none" width="80" height="80" style={{ opacity: isDark ? 0.15 : 0.2, transition: 'opacity 0.6s' }}>
          <line x1="0" y1="80" x2="80" y2="80" stroke={isDark ? '#DAFC92' : '#0d2a6e'} strokeWidth="1.5" />
          <line x1="80" y1="0" x2="80" y2="80" stroke={isDark ? '#DAFC92' : '#0d2a6e'} strokeWidth="1.5" />
        </svg>

        {/* Blob crowd — full viewport behind everything */}
        <BlobCrowd isDark={isDark} onHoverBlob={setHoveredBlob} />

        {hoveredBlob && (
          <div style={{
            position: 'absolute',
            right: '33%',
            top: '20%',
            padding: '8px 16px',
            background: isDark ? 'rgba(11,20,38,0.7)' : 'rgba(13,42,110,0.7)',
            color: '#DAFC92',
            border: '1px solid #DAFC92',
            borderRadius: '9999px',
            zIndex: 1000,
            pointerEvents: 'none',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s',
          }}>
             {BLOB_DISPLAY_NAMES[hoveredBlob] || hoveredBlob}
          </div>
        )}

        {/* Light switch */}
        <LightSwitch isDark={isDark} onToggle={() => setIsDark(d => !d)} />

        {/* Glassmorphism HUD card */}
        <div
          ref={cardRef}
          style={{
            position: 'absolute',
            top: isMobile ? '50%' : '8%',
            left: isMobile ? '50%' : '5%',
            transform: isMobile ? 'translate(-50%, -50%)' : 'none',
            zIndex: 100,
            background: cardBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: 'none',
            boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(13,42,110,0.15)',
            borderRadius: 16,
            padding: isMobile ? '36px 30px' : '40px 48px',
            width: isMobile ? 'min(96vw, 460px)' : undefined,
            minWidth: isMobile ? undefined : 420,
            maxWidth: isMobile ? undefined : 520,
            transition: 'background 0.6s ease',
          }}
        >
          <div style={{ position: 'absolute', zIndex: -1, inset: -1, borderRadius: 17, background: gradientBorder, pointerEvents: 'none', transition: 'background 0.6s ease' }} />

          <div style={{ position: 'absolute', top: 18, right: 20, display: 'flex', gap: 8, zIndex: 10 }}>
            <div
              onClick={(e) => handleDotClick(e, 'red')}
              onMouseEnter={e => { gsap.to(e.target, { scale: 1.3, boxShadow: '0 0 6px rgba(255,92,92,0.8)', duration: 0.2 }); }}
              onMouseLeave={e => { gsap.to(e.target, { scale: 1, boxShadow: 'none', duration: 0.2 }); }}
              style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56', cursor: 'pointer' }}
            />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
            <div
              onClick={(e) => handleDotClick(e, 'green')}
              onMouseEnter={e => { gsap.to(e.target, { scale: 1.3, boxShadow: '0 0 6px rgba(218,252,146,0.8)', duration: 0.2 }); }}
              onMouseLeave={e => { gsap.to(e.target, { scale: 1, boxShadow: 'none', duration: 0.2 }); }}
              style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F', cursor: 'pointer' }}
            />
          </div>

          <p data-animate style={{ color: 'rgba(255,255,255,0.5)', fontSize: isMobile ? '1.2rem' : '1.1rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: isMobile ? 8 : 4, transition: 'color 0.6s' }}>
            Hi, I'm
          </p>
          <h1 data-animate style={{ fontSize: isMobile ? 'clamp(3.35rem, 12vw, 4.5rem)' : 'clamp(3.8rem, 6vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.88, marginBottom: isMobile ? 12 : 8, color: anayNameColor }}>
            Anay Shah
          </h1>
          {/* Typewriter — fix clipping: smaller font, overflow visible, nowrap */}
          <div data-animate style={{ height: isMobile ? '2.85rem' : '3rem', display: 'flex', alignItems: 'center', marginBottom: isMobile ? 26 : 32, overflow: 'visible' }}>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: isMobile ? '1.22rem' : '1.15rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', transition: 'color 0.6s', whiteSpace: 'nowrap' }}>
              {displayedText}
              <span style={{ marginLeft: 2, display: 'inline-block', width: 3, height: '1.2em', background: '#DAFC92', color: '#DAFC92', fontWeight: 300, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
            </span>
          </div>

          {/* Buttons */}
          <div data-animate style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 10, marginBottom: isMobile ? 26 : 32, flexWrap: 'wrap' }}>
            <button
              type="button"
              style={{
                padding: isMobile ? '14px 26px' : '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: isMobile ? 15 : 14,
                display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                background: btnPrimaryBg, color: btnPrimaryText, border: 'none', cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onClick={() => navigate('/projects')}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              View Projects <ArrowRight size={16} />
            </button>
            <button style={{
              padding: isMobile ? '14px 26px' : '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: isMobile ? 15 : 14,
              display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              background: 'transparent', color: textColor, cursor: 'pointer',
              border: `1px solid rgba(255,255,255,0.25)`,
              transition: 'transform 0.2s, color 0.6s, border-color 0.6s',
            }}
              onClick={() => window.location.href = 'mailto:anayshah13@gmail.com'}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              <Mail size={16} /> Contact Me
            </button>
          </div>

          <div data-animate style={{ display: 'flex', gap: isMobile ? 20 : 16 }}>
            {[
              { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/Anayshah13' },
              { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anay-shah-5880aa264/' },
              { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://instagram.com/anay_shah13' },
              { icon: <Mail size={20} />, label: 'Email', href: 'mailto:anayshah13@gmail.com' },
            ].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                style={{ width: isMobile ? 44 : 40, height: isMobile ? 44 : 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: iconBg, color: iconColor, transition: 'transform 0.2s, background 0.6s, color 0.6s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>

          {!isMobile && (
            <div
              ref={stampRef}
              style={{
                position: 'absolute',
                top: 100,
                right: 30,
                width: 140,
                height: 140,
                zIndex: 30,
                pointerEvents: 'none',
                transform: 'rotate(0deg)',
                filter: 'drop-shadow(10px 10px 15px rgba(0,0,0,0.3))'
              }}
            >
              <img src="/open-to.png" alt="Open to Internships" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(-5deg)' }} />
            </div>
          )}
        </div>

        <div ref={scrollIndicatorRef} style={{ position: 'fixed', right: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <div style={{ width: 1, height: 40, background: isDark ? 'linear-gradient(to bottom, transparent, rgba(218,252,146,0.6))' : 'linear-gradient(to bottom, transparent, rgba(27,57,112,0.5))' }} />
          <div style={{ width: 10, height: 10, borderBottom: `2px solid ${isDark ? '#DAFC92' : '#1B3970'}`, borderRight: `2px solid ${isDark ? '#DAFC92' : '#1B3970'}`, transform: 'rotate(45deg)', marginTop: -6 }} />
        </div>
      </div>
      <AboutSection isDark={isDark} />
      <PursuitsTapeBand />
      <SkillsSection />
      <ProjectsTimeline />
      <AchievementsSection />
      <ContactSection />

      {/* --- FOOTER --- */}
      <footer style={{ width: '100%', position: 'relative', zIndex: 100, fontFamily: "'Inter', sans-serif" }}>

        {/* ── Main Footer Content ─────────────────────────── */}
        <div style={{
          background: '#0B1426',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <style>{`
            @keyframes abstractFloat1 { 0% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(25px, -15px) scale(1.02); } 100% { transform: translate(0px, 0px) scale(1); } }
            @keyframes abstractFloat2 { 0% { transform: translate(0px, 0px); } 50% { transform: translate(-15px, 20px); } 100% { transform: translate(0px, 0px); } }
            @keyframes abstractPulse { 0% { opacity: 0.04; transform: scale(1) translate(0px, 0px); } 50% { opacity: 0.08; transform: scale(1.05) translate(10px, 5px); } 100% { opacity: 0.04; transform: scale(1) translate(0px, 0px); } }
          `}</style>
          {/* --- Decorative SVG Background Graphics --- */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} preserveAspectRatio="xMidYMid slice">
            {/* Large lime blob — top right */}
            <circle cx="90%" cy="10%" r="180" fill="#DAFC92" style={{ opacity: 0.04, animation: 'abstractPulse 8s ease-in-out infinite' }} />
            {/* Smaller amber accent — bottom left */}
            <circle cx="8%" cy="85%" r="120" fill="#FFBD2E" style={{ opacity: 0.05, animation: 'abstractFloat1 10s ease-in-out infinite' }} />
            {/* Medium lime ring — centre-right */}
            <circle cx="70%" cy="60%" r="100" fill="none" stroke="#DAFC92" strokeWidth="1" style={{ opacity: 0.08, animation: 'abstractFloat2 12s ease-in-out infinite' }} />
            {/* Tiny dots scatter */}
            <circle cx="20%" cy="25%" r="3" fill="#DAFC92" opacity="0.15" />
            <circle cx="40%" cy="15%" r="2" fill="#DAFC92" opacity="0.12" />
            <circle cx="60%" cy="80%" r="4" fill="#FFBD2E" opacity="0.10" />
            <circle cx="85%" cy="70%" r="2.5" fill="#DAFC92" opacity="0.13" />
            <circle cx="15%" cy="55%" r="3.5" fill="#FFBD2E" opacity="0.08" />
            {/* Diagonal accent line */}
            <line x1="0%" y1="100%" x2="50%" y2="0%" stroke="#DAFC92" strokeWidth="0.5" opacity="0.05" />
            <line x1="100%" y1="100%" x2="60%" y2="0%" stroke="#FFBD2E" strokeWidth="0.5" opacity="0.04" />
          </svg>

          {/* Subtle grid background */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(218,252,146,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(218,252,146,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Radial glow — top-left */}
          <div style={{
            position: 'absolute', top: '-30%', left: '-10%', width: 500, height: 500,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(218,252,146,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Radial glow — bottom-right */}
          <div style={{
            position: 'absolute', bottom: '-25%', right: '-5%', width: 400, height: 400,
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,189,46,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Lime accent line at top */}
          <div style={{ width: '100%', height: 3, background: 'linear-gradient(90deg, transparent, #DAFC92 20%, #DAFC92 80%, transparent)' }} />

          <div style={{
            width: '85%', maxWidth: 'none', margin: '0 auto',
            padding: isMobile ? '48px 24px 40px' : '64px 48px 48px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? 48 : 80,
            position: 'relative',
            zIndex: 1,
          }}>

            {/* ── Left Side: Big Logo & Name ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, flexShrink: 0 }}>
              <div style={{
                width: 240, height: 240, borderRadius: '50%',
                padding: 0,
                background: 'transparent',
                boxShadow: 'none',
              }}>
                <img
                  src="/aboutus/anay13.png"
                  alt="Anay Shah Logo"
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: '50%', objectFit: 'cover',
                    border: 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 35px rgba(218,252,146,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* ── Right Side: Content & Navigate ── */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                width: '100%',
                ...(isMobile ? { alignSelf: 'stretch' } : {}),
              }}
            >
              
              {/* Description */}
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0, textAlign: isMobile ? 'center' : 'left'}}>
                This portfolio is a creative, interactive showcase of my journey as a developer, UI animator, and problem solver. Explore my projects, skills, and achievements, or connect with me for collaborations. Designed with a neobrutalist aesthetic, custom React components, and playful animations. Built with React, TypeScript, Vite, GSAP, and a love for bold, expressive design.
              </p>

              {/* Color Palette — mobile: 4-col grid + flex row (3 swatches truly centered); desktop: single row */}
              {isMobile ? (
                <div
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    paddingBottom: 2,
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                      gap: 4,
                      width: '100%',
                    }}
                  >
                    {FOOTER_PALETTE.slice(0, 4).map((c) => renderFooterPaletteSwatch(c, true))}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                      gap: 4,
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    {FOOTER_PALETTE.slice(4).map((c) =>
                      renderFooterPaletteSwatch(c, true, {
                        flex: '0 0 auto',
                        width: 'calc((100% - 12px) / 4)',
                      }),
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    flexShrink: 0,
                    gap: 6,
                    overflowX: 'auto',
                    paddingBottom: 4,
                  }}
                >
                  {FOOTER_PALETTE.map((c) => renderFooterPaletteSwatch(c, false))}
                </div>
              )}

              {/* Navigation Grid (6 links) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px 24px' }}>
                {[
                  { label: 'Home', href: '#' },
                  { label: 'About', href: '#about' },
                  { label: 'Skills', href: '#skills' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Project gallery', href: '/projects' },
                  { label: 'Achievements', href: '#achievements' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Resume', href: '/Anay_Resume.pdf' },
                ].map((link) => (
                  <a key={link.label} href={link.href} style={{
                    fontSize: '1rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'color 0.2s, border-color 0.2s, transform 0.2s',
                    fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#DAFC92'; e.currentTarget.style.borderColor = '#DAFC92'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span>{link.label}</span>
                    <span style={{ color: '#DAFC92', fontSize: '1.2rem', lineHeight: 1 }}>&rarr;</span>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────── */}
        <div style={{
          background: '#080f1e',
          padding: isMobile ? '16px 24px' : '16px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}>
            &copy; {new Date().getFullYear()} Anay Shah &mdash; All Rights Reserved
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#DAFC92', fontSize: '0.65rem' }}>●</span> Designed &amp; Developed with <span style={{ color: '#DAFC92' }}>♥</span> by Anay Shah
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;
