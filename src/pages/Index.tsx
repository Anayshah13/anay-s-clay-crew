import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlobCrowd from '@/components/BlobCrowd';
import LightSwitch from '@/components/LightSwitch';
import { Github, Linkedin, Instagram, ExternalLink, ArrowRight, Mail } from 'lucide-react';

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

const HeroPage: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  // Card stagger animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !cardRef.current) return;

    const elements = cardRef.current.querySelectorAll('[data-animate]');
    gsap.set(elements, { y: 50, opacity: 0 });
    gsap.to(elements, {
      y: 0, opacity: 1,
      duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.4
    });
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


  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: bgColor, transition: 'background 0.6s ease' }}>

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
      <BlobCrowd isDark={isDark} />

      {/* Light switch */}
      <LightSwitch isDark={isDark} onToggle={() => setIsDark(d => !d)} />

      {/* Glassmorphism HUD card */}
      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          top: isMobile ? '3%' : '8%',
          left: isMobile ? '50%' : '5%',
          transform: isMobile ? 'translateX(-50%)' : 'none',
          zIndex: 100,
          background: cardBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${cardBorder}`,
          boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(13,42,110,0.15)',
          borderRadius: 16,
          padding: isMobile ? '24px 20px' : '40px 48px',
          width: isMobile ? '92vw' : undefined,
          minWidth: isMobile ? undefined : 420,
          maxWidth: isMobile ? undefined : 520,
          transition: 'background 0.6s ease, border-color 0.6s ease',
        }}
      >
        <div style={{ position: 'absolute', top: 18, right: 20, display: 'flex', gap: 8, zIndex: 10 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
        </div>

        <p data-animate style={{ color: textColor, fontSize: isMobile ? '1.4rem' : '2.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: 4, transition: 'color 0.6s' }}>
          Hi, I'm
        </p>
        <h1 data-animate style={{ fontSize: isMobile ? '2.8rem' : '4.5rem', fontWeight: 700, lineHeight: 1.05, marginBottom: 8, color: anayNameColor }}>
          Anay Shah
        </h1>
        {/* Typewriter — fix clipping: smaller font, overflow visible, nowrap */}
        <div data-animate style={{ height: isMobile ? '2.5rem' : '3rem', display: 'flex', alignItems: 'center', marginBottom: isMobile ? 20 : 32, overflow: 'visible' }}>
          <span style={{ color: textColor, fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', transition: 'color 0.6s', whiteSpace: 'nowrap' }}>
            {displayedText}
            <span className="animate-cursor-blink" style={{ marginLeft: 2, display: 'inline-block', width: 3, height: '1.2em', background: '#DAFC92', verticalAlign: 'middle' }} />
          </span>
        </div>

        {/* Buttons */}
        <div data-animate style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 20 : 32, flexWrap: 'wrap' }}>
          <button style={{
            padding: '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
            background: btnPrimaryBg, color: btnPrimaryText, border: 'none', cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            View Projects <ArrowRight size={16} />
          </button>
          <button style={{
            padding: '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14,
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
          <button style={{
            padding: '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
            background: 'transparent', color: mutedText, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
            transition: 'transform 0.2s, color 0.6s, border-color 0.6s',
          }}
            onClick={() => window.open('https://github.com/Anayshah13', '_blank')}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            GitHub <ExternalLink size={14}/>
          </button>
        </div>
        
        <div data-animate style={{ display: 'flex', gap: 16 }}>
          {[
            { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/Anayshah13' },
            { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com/in/anay-shah' },
            { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://instagram.com/anay_shah' },
            { icon: <Mail size={20} />, label: 'Email', href: 'mailto:anayshah13@gmail.com' },
          ].map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
              style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: iconBg, color: iconColor, transition: 'transform 0.2s, background 0.6s, color 0.6s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label={social.label}>
              {social.icon}
            </a>
          ))}
        </div>

        {/* Cursor at bottom right */}
        <img src="/cursor.png" alt="Cursor" style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 50, zIndex: 20, pointerEvents: 'none' }} />
      </div>
    </div>
  );
};

export default HeroPage;
