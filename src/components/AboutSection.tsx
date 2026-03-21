import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitHubCalendar } from 'react-github-calendar';
import { BLOB_CONFIGS } from './blobConfigs';
import { renderAboutDev } from './BlobRenderers1';
import type { BlobRef } from '@/hooks/useBlobCrowd';

gsap.registerPlugin(ScrollTrigger);

const COLORS = [
  { hex: '#DAFC92', name: 'Lime Cream', textColor: '#1a3a00' },
  { hex: '#F5F0E8', name: 'Parchment', textColor: '#0E0E0E' },
  { hex: '#1B3970', name: 'Regal Navy', textColor: '#DAFC92' },
  { hex: '#FF5C5C', name: 'Vibrant Coral', textColor: '#1a0000' },
  { hex: '#B399FF', name: 'Soft Periwinkle', textColor: '#1a0030' },
  { hex: '#FFBE0B', name: 'Amber Gold', textColor: '#1a0a00' },
  { hex: '#0E0E0E', name: 'Onyx', textColor: '#DAFC92' },
];

const photos = [
  '/aboutus/img3.png',
  '/aboutus/img1.png',
  '/aboutus/img2.png',
];
const POLAROID_LABELS = ['Mumbai 2024', 'DJSCE', 'Hackathon 2025'];

// Filter calendar data to last N months
const makeFilter = (months: number) => (data: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[]) => {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  cutoff.setDate(1);
  return data.filter(d => new Date(d.date) >= cutoff);
};

interface Props { isDark: boolean; }

const AboutSection: React.FC<Props> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const photoAreaRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const devBlobRef = useRef<BlobRef | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // ── Propeller spin ──────────────────────────────────────────────────────
  useEffect(() => {
    let anim: gsap.core.Tween | null = null;
    let n = 0;
    const go = () => {
      const fan = containerRef.current?.querySelector('[data-propeller]');
      if (fan) {
        anim = gsap.to(fan, { rotation: 360, duration: 0.55, repeat: -1, ease: 'linear', transformOrigin: '50% 50%' });
      } else if (n++ < 25) setTimeout(go, 150);
    };
    go();
    return () => { anim?.kill(); };
  }, []);

  // ── Laptop screen animation (code-line type-erase + flash) ──────────────
  useEffect(() => {
    const anims: gsap.core.Tween[] = [];
    let n = 0;
    const go = () => {
      if (!containerRef.current) return;
      const lines = containerRef.current.querySelectorAll('[data-code-line]');
      const flash = containerRef.current.querySelector('[data-laptop-flash]') as HTMLElement | null;
      if (lines.length > 0) {
        lines.forEach((line, i) => {
          const el = line as HTMLElement;
          // Save original width then animate typing loop
          const w = el.style.width || getComputedStyle(el).width;
          anims.push(gsap.fromTo(el,
            { width: w },
            {
              width: 0, duration: 0.45, ease: 'power2.in', delay: i * 0.35 + 0.5,
              repeat: -1, yoyo: true, repeatDelay: 2
            }
          ));
        });
        if (flash) {
          // Screen glow flash — like a compile/run event
          anims.push(gsap.to(flash, {
            background: 'rgba(218,252,146,0.30)',
            duration: 0.12, ease: 'power1.inOut',
            repeat: -1, yoyo: true, repeatDelay: 3.8,
          }));
        }
      } else if (n++ < 25) {
        setTimeout(go, 180);
      }
    };
    go();
    return () => { anims.forEach(a => a.kill()); };
  }, []);

  // ── Pulse dot ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (pulseRef.current)
      gsap.to(pulseRef.current, { scale: 1.55, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut', transformOrigin: 'center' });
  }, []);

  // ── Photo cycle ─────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setPhotoIndex(p => (p + 1) % photos.length), 3500);
    return () => clearInterval(id);
  }, []);



  // ── ScrollTrigger entrance ──────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      ScrollTrigger.create({
        trigger: containerRef.current, start: 'top 75%', once: true,
        onEnter: () => {
          if (headingRef.current) gsap.from(headingRef.current, { y: -40, opacity: 0, ease: 'power4.out', duration: 0.55 });
          if (stripRef.current) gsap.from(stripRef.current, { scaleX: 0, transformOrigin: 'left center', ease: 'power3.inOut', duration: 0.7 });
          if (boxesRef.current) {
            const boxes = boxesRef.current.querySelectorAll('.info-box');
            gsap.from(boxes, { x: -70, opacity: 0, stagger: 0.13, ease: 'back.out(1.4)', duration: 0.6 });
          }
          if (photoAreaRef.current) gsap.from(photoAreaRef.current, { x: 70, opacity: 0, ease: 'back.out(1.2)', duration: 0.7 });
          if (trackerRef.current) gsap.from(trackerRef.current, { y: 50, opacity: 0, ease: 'power3.out', duration: 0.6, delay: 0.25 });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);



  const devCfg = BLOB_CONFIGS.find(b => b.id === 'dev');
  const devCommon = devCfg ? {
    id: 'dev', ref: devBlobRef,
    color: devCfg.color, width: 130, height: Math.round(130 * (devCfg.h / devCfg.w)),
    shape: devCfg.shape, zIndex: 9999,
    style: { position: 'relative', width: '100%', height: '100%', pointerEvents: 'none', opacity: 1 },
    rowClass: 'rowFront', eyelidClose: 0, isDark,
  } : null;

  const B = '4px solid #0E0E0E';
  const MONO = "'JetBrains Mono', monospace";
  const BB = "'Bebas Neue', sans-serif";
  const filter7months = makeFilter(7);

  // Generate coordinates for symmetric spiky burst shapes
  const burst12 = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 15 * Math.PI) / 180;
    const r = i % 2 === 0 ? 50 : 30;
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  }).join(' ');

  const burst10 = Array.from({ length: 20 }).map((_, i) => {
    const angle = (i * 18 * Math.PI) / 180;
    const r = i % 2 === 0 ? 50 : 38;
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  }).join(' ');

  return (
    <div
      ref={containerRef}
      style={{ background: '#1B3970', color: '#F5F0E8', borderTop: B, position: 'relative', overflowX: 'hidden' }}
      className="w-full h-screen overflow-hidden flex flex-col"
    >
      {/* ═══════════════════ BACKGROUND DECORATION ═══════════════════════════ */}
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(218,252,146,0.16) 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />
      {/* Diagonal lines — upper-right */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '44%', height: '52%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1={i * 34 - 80} y1={0} x2={i * 34 + 360} y2={500} stroke="rgba(218,252,146,0.05)" strokeWidth="1" />
          ))}
        </svg>
      </div>
      {/* Floating code glyphs */}
      {(['< / >', '{ }', '[ ]', '( )', '::', '=>'] as const).map((t, i) => {
        const pos = [
          { top: '8%', left: '3%' }, { top: '70%', left: '1.5%' }, { top: '52%', right: '2%' },
          { top: '12%', right: '5%' }, { top: '42%', left: '1%' }, { top: '85%', right: '5%' },
        ][i];
        const opacities = [0.10, 0.07, 0.08, 0.06, 0.07, 0.08];
        const sizes = ['2.6rem', '3rem', '2.2rem', '1.8rem', '1.9rem', '1.7rem'];
        return (
          <div key={i} style={{
            position: 'absolute', ...pos, fontFamily: MONO, fontSize: sizes[i], fontWeight: 900,
            color: '#DAFC92', opacity: opacities[i], zIndex: 0, pointerEvents: 'none', userSelect: 'none', letterSpacing: '0.05em',
          }}>{t}</div>
        );
      })}
      {/* Corner L-brackets */}
      {([{ top: 10, left: 10 }, { top: 10, right: 10 }, { bottom: 10, left: 10 }, { bottom: 10, right: 10 }]).map((pos, i) => (
        <svg key={i} width="24" height="24" xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none', opacity: 0.20 }}>
          {i === 0 && <path d="M2 12 L2 2 L12 2" fill="none" stroke="#DAFC92" strokeWidth="2.5" />}
          {i === 1 && <path d="M22 12 L22 2 L12 2" fill="none" stroke="#DAFC92" strokeWidth="2.5" />}
          {i === 2 && <path d="M2 12 L2 22 L12 22" fill="none" stroke="#DAFC92" strokeWidth="2.5" />}
          {i === 3 && <path d="M22 12 L22 22 L12 22" fill="none" stroke="#DAFC92" strokeWidth="2.5" />}
        </svg>
      ))}
      {/* Solid neobrutalist graphic elements */}
      {/* Coral cross - levitating */}
      <div className="neo-levitate neo-graphic-hover" style={{
        position: 'absolute', top: '15%', left: '10%', zIndex: 0, cursor: 'crosshair',
        width: '42px', height: '42px'
      }}>
        <div style={{ position: 'absolute', width: '32px', height: '10px', background: '#FF5C5C', top: '16px', left: '5px' }} />
        <div style={{ position: 'absolute', width: '10px', height: '32px', background: '#FF5C5C', top: '5px', left: '16px' }} />
      </div>

      {/* Purple solid square - spinning */}
      <div className="neo-spin neo-graphic-hover" style={{
        position: 'absolute', top: '75%', right: '8%', zIndex: 0, cursor: 'grab',
        width: '32px', height: '32px', background: '#B399FF',
      }} />

      {/* Thick lime zigzag - levitating */}
      <svg className="neo-levitate neo-graphic-hover" width="40" height="60" viewBox="0 0 40 60"
        style={{ position: 'absolute', bottom: '15%', left: '8%', zIndex: 0, cursor: 'crosshair', opacity: 0.9 }}>
        <polyline points="0,0 20,20 0,40 20,60" fill="none" stroke="#DAFC92" strokeWidth="8" strokeLinejoin="miter" />
      </svg>

      {/* Yellow 12-point burst badge */}
      <svg className="neo-spin-reverse neo-graphic-hover" width="70" height="70" viewBox="0 0 100 100"
        style={{ position: 'absolute', top: '16%', right: '18%', zIndex: 1, cursor: 'pointer' }}>
        <polygon points={burst12} fill="#FFBE0B" />
      </svg>

      {/* Orange 10-point badge */}
      <svg className="neo-spin neo-graphic-hover" width="60" height="60" viewBox="0 0 100 100"
        style={{ position: 'absolute', bottom: '35%', right: '10%', zIndex: 1, cursor: 'pointer' }}>
        <polygon points={burst10} fill="#FF5C5C" />
      </svg>

      {/* Spinning User Profile */}
      <img
        src="/aboutus/anay13.png"
        alt="Profile"
        className="anay-spin-img"
        style={{
          position: 'absolute', top: '4%', right: '3%', width: '90px', height: '90px',
          borderRadius: '50%', border: B, objectFit: 'cover', cursor: 'grab'
        }}
      />

      {/* Atmospheric blobs */}
      <div style={{
        position: 'absolute', top: '-12%', right: '-8%', width: '480px', height: '440px',
        background: 'rgba(218,252,146,0.04)', borderRadius: '62% 38% 55% 45% / 48% 52% 48% 52%',
        zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-12%', left: '-8%', width: '440px', height: '400px',
        background: 'rgba(179,153,255,0.035)', borderRadius: '45% 55% 38% 62% / 52% 48% 52% 48%',
        zIndex: 0, pointerEvents: 'none'
      }} />

      {/* ═══════════════════════════ HEADING ════════════════════════════════ */}
      <div ref={headingRef} className="relative z-10 pt-16 pb-10 flex flex-col items-center shrink-0">
        <h2 style={{
          fontFamily: BB, fontSize: 'clamp(3.8rem, 7.5vw, 6.5rem)', color: '#DAFC92',
          letterSpacing: '0.15em', textAlign: 'center', lineHeight: 1, margin: 0
        }}>
          About Me
        </h2>
      </div>

      {/* ══════════════════════ PALETTE STRIP ════════════════════════════════ */}
      <div ref={stripRef} className="relative z-10 flex flex-row shrink-0 mt-2"
        style={{ width: '65%', margin: '0 auto', gap: '5px' }}>
        {COLORS.map((c) => (
          <div key={c.hex} style={{
            flex: 1, height: '36px', minWidth: '60px', background: c.hex, borderRadius: 0,
            border: '2px solid #0E0E0E',
            padding: '5px 7px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
          }}>
            <span style={{ fontFamily: MONO, fontSize: '0.50rem', fontWeight: 700, color: c.textColor, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>{c.name}</span>
            <span style={{ fontFamily: MONO, fontSize: '0.44rem', fontWeight: 400, color: c.textColor, opacity: 0.75, lineHeight: 1.2, marginTop: '1px' }}>{c.hex}</span>
          </div>
        ))}
      </div>

      {/* ═════════════════ TWO-COLUMN CONTENT ════════════════════════════════ */}
      {/* flex-1 min-h-0 so it fills exactly the remaining viewport height */}
      <div className="relative z-10 flex flex-row flex-1 min-h-0 gap-4 pt-3 pb-3" style={{ maxWidth: '75%', width: '75%', margin: '0 auto' }}>

        {/* ── LEFT — info boxes ── */}
        <div ref={boxesRef} className="flex flex-col gap-3 w-1/2 h-[88%] mr-5">
          {[
            {
              bg: '#DAFC92', rot: '-1deg', num: '01', label: 'ABOUT', numColor: '#DAFC92', textCol: '#0E0E0E',
              text: "I'm a 20-year-old sophomore at Dwarkadas J. Sanghvi College of Engineering, Mumbai, pursuing a B.Tech in Information Technology. Highly motivated to learn FullStack Dev, UI/UX, AI/ML and Blockchain."
            },
            {
              bg: '#B399FF', rot: '0.8deg', num: '02', label: 'BEYOND CODE', numColor: '#B399FF', textCol: '#0E0E0E',
              text: 'Beyond Coding, I\'m an avid enjoyer of casual sports, art, crafts, toys, and all sorts of pop culture & cartoons. ✳'
            },
            {
              bg: '#FF5C5C', rot: '-0.5deg', num: '03', label: 'ORIGIN', numColor: '#FF5C5C', textCol: '#0E0E0E',
              text: 'Growing up surrounded by techies, I embraced the chaos and dove into software. I panic over the smallest details nobody else would ever notice — and I love it.'
            },
          ].map(box => (
            <div key={box.num} className="info-box flex flex-col flex-1 min-h-0"
              style={{
                background: box.bg, border: B, boxShadow: '8px 8px 0 #0E0E0E', borderRadius: 0,
                transform: `rotate(${box.rot})`,
                overflow: 'hidden', cursor: 'pointer',
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, { scale: 1.035, rotate: 0, boxShadow: '14px 14px 0 #0E0E0E', duration: 0.18, ease: 'power1.out', overwrite: 'auto' });
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, { scale: 1, rotate: parseFloat(box.rot), boxShadow: '8px 8px 0 #0E0E0E', duration: 0.18, ease: 'power1.out', overwrite: 'auto' });
              }}
            >
              <div style={{ height: '30px', background: '#0E0E0E', display: 'flex', alignItems: 'center', padding: '0 12px', flexShrink: 0 }}>
                <span style={{ fontFamily: BB, fontSize: '1.1rem', color: box.numColor, lineHeight: 1 }}>{box.num}</span>
                <span style={{ fontFamily: MONO, fontSize: '0.55rem', color: box.numColor, letterSpacing: '0.22em', marginLeft: 'auto' }}>{box.label}</span>
              </div>
              <p style={{ fontFamily: MONO, fontSize: '0.9rem', color: box.textCol, lineHeight: 1.58, padding: '14px 16px', margin: 0, overflow: 'hidden' }}>
                {box.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── RIGHT — photo + git tracker ── */}
        <div className="flex flex-col gap-3 w-1/2 h-full relative">

          {/* PHOTO FRAME */}
          <div ref={photoAreaRef}
            className="about-photo-frame"
            style={{
              flex: '0 0 54%', border: B, boxShadow: '8px 8px 0 #DAFC92', borderRadius: 0,
              background: '#0d1f35', display: 'flex', flexDirection: 'column',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 50,
            }}
            onMouseEnter={e => {
              gsap.to(e.currentTarget, { scale: 1.025, boxShadow: '14px 14px 0 #DAFC92', duration: 0.18, ease: 'power1.out', overwrite: 'auto' });
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget, { scale: 1, boxShadow: '8px 8px 0 #DAFC92', duration: 0.18, ease: 'power1.out', overwrite: 'auto' });
            }}
          >

            {/* macOS title bar */}
            <div style={{
              height: '28px', background: '#0E0E0E', display: 'flex', alignItems: 'center',
              padding: '0 10px', borderBottom: '2px solid #222', flexShrink: 0
            }}>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {(['#FF5F57', '#FEBC2E', '#28C840'] as const).map((col, i) => (
                  <div key={i} style={{
                    width: 11, height: 11, borderRadius: '50%', background: col,
                    border: '1.5px solid rgba(0,0,0,0.3)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: MONO, fontSize: '0.55rem', color: '#DAFC92', letterSpacing: '0.1em', margin: '0 auto', fontWeight: 700 }}>ARCHIVE.JPG</span>
            </div>

            {/* Photo + polaroid area */}
            <div style={{
              flex: 1, position: 'relative', background: '#0d1f35', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Inner clipping area for dot grid and polaroids so they don't leak */}
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Subtle inner dot grid */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  backgroundImage: 'radial-gradient(circle, rgba(218,252,146,0.05) 1px, transparent 1px)',
                  backgroundSize: '18px 18px'
                }} />

                {/* Polaroid stack */}
                {[2, 1, 0].map(layer => {
                  const rotations = [-4, 2.5, -1.5];
                  const offsets = [{ x: -20, y: 16 }, { x: 16, y: -10 }, { x: 0, y: 0 }];
                  const pIdx = (photoIndex + layer) % photos.length;
                  const isTop = layer === 0;
                  return (
                    <div key={layer} style={{
                      position: 'absolute', width: '62%',
                      background: '#F5F0E8', border: '4px solid #0E0E0E',
                      boxShadow: isTop ? '6px 6px 0 #0E0E0E' : '3px 3px 0 rgba(0,0,0,0.4)',
                      borderRadius: 0, padding: '6px 6px 30px 6px',
                      transform: `rotate(${rotations[layer]}deg) translate(${offsets[layer].x}px,${offsets[layer].y}px)`,
                      zIndex: isTop ? 10 : layer + 1,
                    }}>
                      <img src={photos[pIdx]} alt={POLAROID_LABELS[pIdx]}
                        style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', borderRadius: 0, border: '2px solid #ddd' }}
                      />
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F0E8'
                      }}>
                        <span style={{ fontFamily: MONO, fontSize: '0.57rem', color: '#1B3970', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {POLAROID_LABELS[pIdx]}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* cursor.png — floating sticker in photo area top-right */}
                <img
                  src="/cursor.png"
                  alt="cursor"
                  style={{
                    position: 'absolute', top: 10, right: 12, width: '56px', zIndex: 25,
                    transform: 'rotate(12deg)', filter: 'drop-shadow(3px 3px 0 #0E0E0E)',
                    pointerEvents: 'none', opacity: 0.92,
                  }}
                />
                {/* Dev blob — bottom-left, INSIDE the inner overflow: hidden so it doesn't leak out of the polaroid picture frame */}
                <div style={{ position: 'absolute', bottom: -12, left: 4, zIndex: 15, width: '120px', height: '120px', pointerEvents: 'none' }}>
                  {devCfg && devCommon ? <React.Fragment key="dev-about">{renderAboutDev(devCfg, devCommon)}</React.Fragment> : null}
                </div>
              </div>
            </div>
          </div>

          {/* GIT TRACKER */}
          <div ref={trackerRef}
            style={{
              flex: '0 0 auto', border: B, boxShadow: '8px 8px 0 #DAFC92', borderRadius: 0,
              background: '#F5F0E8', display: 'flex', flexDirection: 'column', overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative', zIndex: 10,
            }}
            onMouseEnter={e => {
              gsap.to(e.currentTarget, { scale: 1.025, boxShadow: '14px 14px 0 #DAFC92', duration: 0.18, ease: 'power1.out', overwrite: 'auto' });
            }}
            onMouseLeave={e => {
              gsap.to(e.currentTarget, { scale: 1, boxShadow: '8px 8px 0 #DAFC92', duration: 0.18, ease: 'power1.out', overwrite: 'auto' });
            }}
          >

            {/* Header bar */}
            <div style={{
              height: '32px', background: '#0E0E0E', display: 'flex', alignItems: 'center',
              padding: '0 12px', borderBottom: B, flexShrink: 0
            }}>
              <div ref={pulseRef} style={{
                width: '8px', height: '8px', borderRadius: '50%', background: '#34A853',
                marginRight: '9px', transformOrigin: 'center', flexShrink: 0
              }} />
              <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: '#DAFC92', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Git Activity</span>
              <span style={{ fontFamily: MONO, fontSize: '0.52rem', color: '#B399FF', marginLeft: 'auto', fontWeight: 700 }}>Anayshah13</span>
            </div>

            {/* Calendar — library defaults, custom green theme */}
            <div style={{ padding: '10px 14px 14px' }}>
              <div className="about-calendar" style={{ width: '100%' }}>
                <GitHubCalendar
                  username="Anayshah13"
                  colorScheme="light"
                  fontSize={11}
                  theme={{ light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'] }}
                  blockSize={12}
                  blockMargin={3}
                  blockRadius={0}
                  showTotalCount={true}
                  showColorLegend={true}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutSection;
