import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlobCrowd from '@/components/BlobCrowd';
import LightSwitch from '@/components/LightSwitch';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import ProjectsTimeline from '@/components/ProjectsTimeline';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

const BB = "'Bebas Neue', sans-serif";

gsap.registerPlugin(ScrollTrigger);

const HeroPage: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
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

  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
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
    gsap.to(elements, {
      y: 0, opacity: 1,
      duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.4
    });
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

  return (
    <div className="w-full relative bg-black">
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
            border: 'none',
            boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(13,42,110,0.15)',
            borderRadius: 16,
            padding: isMobile ? '24px 20px' : '40px 48px',
            width: isMobile ? '92vw' : undefined,
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

          <p data-animate style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4, transition: 'color 0.6s' }}>
            Hi, I'm
          </p>
          <h1 data-animate style={{ fontSize: 'clamp(3.8rem, 6vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.88, marginBottom: 8, color: anayNameColor }}>
            Anay Shah
          </h1>
          {/* Typewriter — fix clipping: smaller font, overflow visible, nowrap */}
          <div data-animate style={{ height: isMobile ? '2.5rem' : '3rem', display: 'flex', alignItems: 'center', marginBottom: isMobile ? 20 : 32, overflow: 'visible' }}>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', transition: 'color 0.6s', whiteSpace: 'nowrap' }}>
              {displayedText}
              <span style={{ marginLeft: 2, display: 'inline-block', width: 3, height: '1.2em', background: '#DAFC92', color: '#DAFC92', fontWeight: 300, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
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
          </div>

          <div data-animate style={{ display: 'flex', gap: 16 }}>
            {[
              { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/Anayshah13' },
              { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com/in/Anayshah' },
              { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://instagram.com/anay_shah13' },
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

          {/* Large Circular Open to Internships Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              right: -20,
              width: 100,
              height: 100,
              background: '#F5F0E8',
              border: '4px solid #27C93F',
              color: '#27C93F',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              pointerEvents: 'none',
              outline: '4px solid #F5F0E8',
              outlineOffset: '-8px',
              boxShadow: '7px 7px 14px rgba(0,0,0,0.20)',
              fontFamily: BB,
              fontWeight: 900,
              transform: 'rotate(10deg)',
              textShadow: 'none',
              gap: 1,
            }}
          >
            <div style={{ fontSize: '0.85rem', letterSpacing: '0.15em', opacity: 0.8, marginBottom: 1 }}>STATUS</div>
            <div style={{ fontSize: '1.1rem', lineHeight: 1.05, textAlign: 'center', fontWeight: 900 }}>
              OPEN TO<br />INTERNSHIPS
            </div>
          </div>
        </div>

        <div ref={scrollIndicatorRef} style={{ position: 'fixed', right: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <div style={{ width: 1, height: 40, background: isDark ? 'linear-gradient(to bottom, transparent, rgba(218,252,146,0.6))' : 'linear-gradient(to bottom, transparent, rgba(27,57,112,0.5))' }} />
          <div style={{ width: 10, height: 10, borderBottom: `2px solid ${isDark ? '#DAFC92' : '#1B3970'}`, borderRight: `2px solid ${isDark ? '#DAFC92' : '#1B3970'}`, transform: 'rotate(45deg)', marginTop: -6 }} />
        </div>
      </div>
      <AboutSection isDark={isDark} />
      <SkillsSection />
      <ProjectsTimeline />
      <ContactSection />

      {/* --- FOOTER --- */}
      <footer
        style={{
          width: '100%',
          minHeight: '50vh',
          background: '#1B3970',
          color: '#F5F0E8',
          fontFamily: "'JetBrains Mono', monospace",
          borderTop: '6px solid #0E0E0E',
          boxShadow: '0 -8px 0 #0E0E0E',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '32px 5vw',
          position: 'relative',
          zIndex: 100,
          gap: 24,
        }}
      >
        {/* Left: Rotating logo and motto */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180 }}>
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: 12,
              border: '4px solid #DAFC92',
              boxShadow: '0 4px 16px #0E0E0E44',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
              animation: 'spinLogo 7s linear infinite',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.09) rotate(-8deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          >
            <img src="/aboutus/anay13.png" alt="Anay13 Logo" style={{ width: '90%', height: '90%', borderRadius: '50%' }} />
          </div>
          <div style={{ fontFamily: BB, fontSize: '1.25rem', color: '#fff', letterSpacing: '0.04em', textShadow: '2px 2px 0 #0E0E0E', marginBottom: 8 }}>Work Smart , Not Hard</div>
          <div style={{ fontSize: '0.95rem', color: '#B399FF', opacity: 0.8, marginTop: 4 }}>
            &copy; {new Date().getFullYear()} Anay Shah &mdash; All Rights Reserved
          </div>
        </div>

        {/* Center: Context text */}
        <div style={{
          flex: 1,
          maxWidth: 600,
          fontSize: '1.08rem',
          color: '#F5F0E8',
          opacity: 0.93,
          textAlign: 'center',
          margin: '0 24px',
          lineHeight: 1.7,
          fontWeight: 500,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{ marginBottom: 10 }}>
            This portfolio is a creative, interactive showcase of my journey as a developer, UI animator, and problem solver.<br />
            Explore my projects, skills, and achievements, or connect with me for collaborations and opportunities.<br />
            Designed with a neobrutalist aesthetic, custom React components, and playful animations.<br />
            Built with React, TypeScript, Vite, GSAP, and a love for bold, expressive design.
          </div>
          <div style={{ width: 80, height: 3, background: '#FFBE0B', borderRadius: 2, margin: '10px auto 0 auto' }} />
        </div>

        {/* Right: Social pills */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 18, minWidth: 160 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Instagram */}
            <a href="https://instagram.com/anay_shah13" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#DAFC92', color: '#1B3970',
                borderRadius: 999, padding: '8px 18px', fontWeight: 700, fontSize: '1.08rem',
                boxShadow: '2px 2px 0 #0E0E0E', textDecoration: 'none', border: '2.5px solid #0E0E0E',
                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '4px 4px 0 #0E0E0E'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '2px 2px 0 #0E0E0E'; }}
            >
              <Instagram size={22} style={{ marginRight: 2 }} /> Insta
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/Anayshah" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#F5F0E8', color: '#1B3970',
                borderRadius: 999, padding: '8px 18px', fontWeight: 700, fontSize: '1.08rem',
                boxShadow: '2px 2px 0 #0E0E0E', textDecoration: 'none', border: '2.5px solid #0E0E0E',
                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '4px 4px 0 #0E0E0E'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '2px 2px 0 #0E0E0E'; }}
            >
              <Linkedin size={22} style={{ marginRight: 2 }} /> LinkedIn
            </a>
            {/* Github */}
            <a href="https://github.com/Anayshah13" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#FF5C5C', color: '#fff',
                borderRadius: 999, padding: '8px 18px', fontWeight: 700, fontSize: '1.08rem',
                boxShadow: '2px 2px 0 #0E0E0E', textDecoration: 'none', border: '2.5px solid #0E0E0E',
                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '4px 4px 0 #0E0E0E'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '2px 2px 0 #0E0E0E'; }}
            >
              <Github size={22} style={{ marginRight: 2 }} /> Github
            </a>
          </div>
        </div>

        {/* Rotating logo animation keyframes */}
        <style>{`
          @keyframes spinLogo {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </footer>
    </div>
  );
};

export default HeroPage;
