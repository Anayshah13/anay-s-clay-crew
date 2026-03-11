import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlobCrowd from '@/components/BlobCrowd';
import LightSwitch from '@/components/LightSwitch';
import { Github, Linkedin, Instagram, ExternalLink, ArrowRight, Mail } from 'lucide-react';

const TITLES = ['Developer.', 'Hackathon Winner.', 'Competitive Programmer.', 'UI Animator.'];

const HeroPage: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const bgColor = isDark ? '#0B1426' : '#FFFFFF';
  const textColor = isDark ? '#f5f5f5' : '#1a1a2e';
  const mutedText = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const cardBg = isDark ? 'rgba(11,20,38,0.75)' : 'rgba(255,255,255,0.85)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)';
  const iconBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const iconColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.6)';
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const accentColor = isDark ? 'rgba(218,252,146,0.08)' : 'rgba(100,50,200,0.05)';

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: bgColor, transition: 'background 0.6s ease' }}>

      {/* Semi-opaque grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        transition: 'opacity 0.6s',
      }} />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(218,252,146,0.06)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      {/* Accent graphics — abstract shapes */}
      <div className="absolute pointer-events-none" style={{
        top: '10%', right: '15%', width: 300, height: 300,
        background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
        transition: 'background 0.6s',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '20%', left: '5%', width: 200, height: 200,
        background: `radial-gradient(circle, ${isDark ? 'rgba(78,205,196,0.06)' : 'rgba(78,205,196,0.04)'} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(30px)',
      }} />
      <div className="absolute pointer-events-none" style={{
        top: '60%', right: '40%', width: 250, height: 250,
        background: `radial-gradient(circle, ${isDark ? 'rgba(255,107,157,0.05)' : 'rgba(255,107,157,0.03)'} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(50px)',
      }} />

      {/* Corner accent lines */}
      <svg className="absolute top-6 left-6 pointer-events-none" width="80" height="80" style={{ opacity: isDark ? 0.1 : 0.06, transition: 'opacity 0.6s' }}>
        <line x1="0" y1="0" x2="80" y2="0" stroke={isDark ? '#DAFC92' : '#1a1a2e'} strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="80" stroke={isDark ? '#DAFC92' : '#1a1a2e'} strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-6 right-6 pointer-events-none" width="80" height="80" style={{ opacity: isDark ? 0.1 : 0.06, transition: 'opacity 0.6s' }}>
        <line x1="0" y1="80" x2="80" y2="80" stroke={isDark ? '#DAFC92' : '#1a1a2e'} strokeWidth="1" />
        <line x1="80" y1="0" x2="80" y2="80" stroke={isDark ? '#DAFC92' : '#1a1a2e'} strokeWidth="1" />
      </svg>

      {/* Small floating crosses as decoration */}
      {[
        { top: '15%', left: '85%', size: 12 },
        { top: '75%', left: '10%', size: 8 },
        { top: '45%', left: '20%', size: 10 },
      ].map((cross, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          top: cross.top, left: cross.left,
          width: cross.size, height: cross.size,
          opacity: isDark ? 0.15 : 0.08,
          transition: 'opacity 0.6s',
        }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 1, background: isDark ? '#DAFC92' : '#1a1a2e', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, height: '100%', width: 1, background: isDark ? '#DAFC92' : '#1a1a2e', transform: 'translateX(-50%)' }} />
        </div>
      ))}

      {/* Blob crowd — full viewport behind everything */}
      <BlobCrowd isDark={isDark} />

      {/* Light switch */}
      <LightSwitch isDark={isDark} onToggle={() => setIsDark(d => !d)} />

      {/* Glassmorphism HUD card */}
      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          top: '8%',
          left: '5%',
          zIndex: 100,
          background: cardBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${cardBorder}`,
          borderRadius: 16,
          padding: '40px 48px',
          maxWidth: 520,
          transition: 'background 0.6s ease, border-color 0.6s ease',
        }}
      >
        <p data-animate style={{ color: textColor, fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: 4, transition: 'color 0.6s' }}>
          Hi, I'm
        </p>
        <h1 data-animate style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1.05, marginBottom: 8, color: '#DAFC92' }}>
          Anay Shah
        </h1>
        <div data-animate style={{ height: '3.5rem', display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          <span style={{ color: textColor, fontSize: '1.25rem', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', transition: 'color 0.6s' }}>
            {displayedText}
            <span className="animate-cursor-blink" style={{ marginLeft: 2, display: 'inline-block', width: 3, height: '1.2em', background: '#DAFC92', verticalAlign: 'middle' }} />
          </span>
        </div>

        {/* Buttons — all in one line */}
        <div data-animate style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'nowrap' }}>
          <button style={{
            padding: '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
            background: '#DAFC92', color: '#0a0a0a', border: 'none', cursor: 'pointer',
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
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
            transition: 'transform 0.2s, color 0.6s, border-color 0.6s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <Mail size={16} /> Contact Me
          </button>
          <button style={{
            padding: '12px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
            background: 'transparent', color: mutedText, border: 'none', cursor: 'pointer',
            transition: 'transform 0.2s, color 0.6s',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            GitHub <ExternalLink size={14} />
          </button>
        </div>

        {/* Social icons — Codolio replaced with Email */}
        <div data-animate style={{ display: 'flex', gap: 16 }}>
          {[
            { icon: <Github size={20} />, label: 'GitHub' },
            { icon: <Linkedin size={20} />, label: 'LinkedIn' },
            { icon: <Instagram size={20} />, label: 'Instagram' },
            { icon: <Mail size={20} />, label: 'Email' },
          ].map((social) => (
            <a key={social.label} href="#"
              style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: iconBg, color: iconColor, transition: 'transform 0.2s, background 0.6s, color 0.6s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label={social.label}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
