import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Instagram, Mail, Code2, Hand } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BB = "'Bebas Neue', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const B = '4px solid #0E0E0E';

const SOCIALS = [
  { name: 'GITHUB', handle: '@Anayshah13', icon: <Github size={28} strokeWidth={2.5} /> },
  { name: 'LINKEDIN', handle: '/in/Anayshah', icon: <Linkedin size={28} strokeWidth={2.5} /> },
  { name: 'INSTAGRAM', handle: '@anay_shah13', icon: <Instagram size={28} strokeWidth={2.5} /> },
  { name: 'CODOLIO', handle: '@Anayshah13', icon: <Code2 size={28} strokeWidth={2.5} /> },
  { name: 'LEETCODE', handle: '/Anay_13', icon: <Code2 size={28} strokeWidth={2.5} /> },
  { name: 'RESUME', handle: 'DOWNLOAD PDF', icon: <div style={{ fontWeight: 900, fontSize: '1.2rem', fontFamily: BB }}>PDF</div> },
];

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance Timeline for chaotic overlapping layout
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          once: true,
        }
      });

      // Scatter decorative floaters
      gsap.utils.toArray('.deco-float').forEach((el: HTMLElement, i) => {
        gsap.to(el, {
          y: '+=25',
          rotation: i % 2 === 0 ? 20 : -20,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      tl.from(headerRef.current, { y: -80, opacity: 0, duration: 0.7, ease: 'back.out(1.5)' })
        // Throw elements onto the "desk"
        .from(terminalRef.current, { x: -250, y: -100, rotation: -25, scale: 0.5, opacity: 0, duration: 0.9, ease: 'back.out(1.3)' }, '-=0.3')
        .from(boardRef.current, { x: 250, y: 150, rotation: 15, scale: 0.5, opacity: 0, duration: 0.9, ease: 'back.out(1.2)' }, '-=0.6')
        .from(stickyRef.current, { x: 0, y: -200, scale: 0, rotation: -40, opacity: 0, duration: 0.7, ease: 'back.out(1.8)' }, '-=0.4')
        .from('.pin-card', { scale: 0, rotation: () => Math.random() * 40 - 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
        .from(footerRef.current, { y: 40, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        // Stamp comes down hard at the very end
        .from(stampRef.current, { scale: 3, rotation: 15, opacity: 0, duration: 0.4, ease: 'power4.in' }, '+=0.2')
        // Jolt the terminal on stamp impact!
        .to(terminalRef.current, { y: '+=10', rotation: '-=2', duration: 0.1, yoyo: true, repeat: 1 }, '-=0.0');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '110vh',
        background: '#FFBE0B', // Amber Gold background
        position: 'relative',
        overflow: 'hidden',
        color: '#0E0E0E',
        fontFamily: MONO,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        .pin-card {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .pin-card:hover {
          transform: translateY(-8px) scale(1.05) rotate(0deg) !important;
          box-shadow: 10px 10px 0 #0E0E0E !important;
          z-index: 100;
        }
        .say-hi-btn {
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .say-hi-btn:active {
          transform: translateY(6px) !important;
          box-shadow: 0px 0px 0 #0E0E0E !important;
        }
      `}</style>

      {/* BACKGROUND DECORATIVE GRID LINES */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(180deg, transparent, transparent 39px, #0E0E0E 39px, #0E0E0E 40px)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, #0E0E0E 39px, #0E0E0E 40px)' }} />

      {/* Scattered Micro-elements - Cool graphics carefully positioned on edges */}
      <div className="deco-float" style={{ position: 'absolute', top: '15%', left: '48%', width: '120px', height: '120px', border: '6px solid #DAFC92', borderRadius: '50%', opacity: 0.8, boxShadow: '8px 8px 0 #0E0E0E', zIndex: 5 }} />
      {/* Cool Geometric Edge Graphics */}
      <div className="deco-float" style={{ position: 'absolute', top: '12%', right: '15%', opacity: 0.9, fontSize: '6rem', fontWeight: 900, color: '#B399FF', textShadow: '6px 6px 0 #0E0E0E', zIndex: 5 }}>{'//'}</div>
      <div className="deco-float" style={{ position: 'absolute', top: '-8%', right: '5%', opacity: 0.9, fontSize: '10rem', fontWeight: 900, color: '#FFBE0B', textShadow: '8px 8px 0 #0E0E0E', zIndex: 5 }}>*</div>
      <div className="deco-float" style={{ position: 'absolute', bottom: '52%', left: '40%', opacity: 0.9, fontSize: '7rem', fontWeight: 900, color: '#F5F0E8', textShadow: '6px 6px 0 #1B3970', zIndex: 5 }}>{'}'}</div>
      <div className="deco-float" style={{ position: 'absolute', bottom: '35%', right: '40%', width: '180px', height: '60px', background: '#ff5c5c', border: '6px solid #0E0E0E', borderRadius: '40px', transform: 'rotate(25deg)', zIndex: 5, boxShadow: '8px 8px 0 #0E0E0E' }} />
      
      <svg className="deco-float" width="120" height="120" viewBox="0 0 100 100" style={{ position: 'absolute', top: '20%', left: '2%', zIndex: 5 }}>
        <path d="M50 0 L55 35 L90 25 L65 50 L90 75 L55 65 L50 100 L45 65 L10 75 L35 50 L10 25 L45 35 Z" fill="#DAFC92" stroke="#0E0E0E" strokeWidth="5" />
      </svg>
      <svg className="deco-float" width="120" height="120" viewBox="0 0 100 100" style={{ position: 'absolute', top: '65%', left: '2%', zIndex: 5 }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#B399FF" strokeWidth="8" strokeDasharray="15, 15" />
      </svg>
      <svg className="deco-float" width="150" height="150" viewBox="0 0 100 100" style={{ position: 'absolute', top: '80%', left: '52%', zIndex: 5 }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#1B3970" strokeWidth="8" strokeDasharray="15, 15" />
      </svg>

      {/* MAIN CONTAINER FOR COLLAGE LAYOUT */}
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>

        {/* HEADER */}
        <h1
          ref={headerRef}
          style={{
            fontFamily: BB, fontSize: 'clamp(4rem, 8vw, 7rem)',
            color: '#F5F0E8', textShadow: '6px 6px 0 #0E0E0E',
            margin: '4vh 0 2vh 0', textAlign: 'center', letterSpacing: '0.08em',
            zIndex: 10, pointerEvents: 'none', position: 'relative'
          }}
        >
          LET&apos;S CONNECT
        </h1>

        <div style={{ position: 'relative', flex: 1, width: '100%' }}>
          {/* 1. TERMINAL CARD */}
          <div 
            ref={terminalRef}
            style={{
              position: 'absolute', top: '5vh', left: '5vw',
              width: '40vw', minWidth: '340px', maxWidth: '550px',
              background: '#1B3970', border: B, boxShadow: '14px 14px 0 #0E0E0E',
              borderRadius: '0', display: 'flex', flexDirection: 'column',
              zIndex: 15, transform: 'rotate(-2deg)'
            }}
          >
            <div style={{ height: '40px', background: '#F5F0E8', borderBottom: B, display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #0E0E0E', background: '#FF5C5C' }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #0E0E0E', background: '#FFBE0B' }} />
              <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #0E0E0E', background: '#DAFC92' }} />
              <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em' }}>CONTACT.SH</span>
            </div>
            <div style={{ padding: '32px 24px', color: '#DAFC92', fontSize: '1.25rem', lineHeight: 2.2, minHeight: '280px' }}>
              <form onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:anayshah10@gmail.com?subject=Message from ${email}&body=${encodeURIComponent(message)}`; }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#F5F0E8', fontSize: '1.1rem', display: 'block', marginBottom: '8px', fontFamily: BB, letterSpacing: '0.05em' }}>FROM (EMAIL):</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', backgroundColor: '#F5F0E8', backgroundImage: 'radial-gradient(circle, rgba(14, 14, 14, 0.15) 2px, transparent 2px)', backgroundSize: '24px 24px', border: '4px solid #0E0E0E', color: '#0E0E0E', fontFamily: MONO, fontSize: '1rem', boxSizing: 'border-box', outline: 'none', boxShadow: '4px 4px 0 #0E0E0E' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#F5F0E8', fontSize: '1.1rem', display: 'block', marginBottom: '8px', fontFamily: BB, letterSpacing: '0.05em' }}>MESSAGE:</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} style={{ width: '100%', padding: '12px', backgroundColor: '#F5F0E8', backgroundImage: 'radial-gradient(circle, rgba(14, 14, 14, 0.15) 2px, transparent 2px)', backgroundSize: '24px 24px', border: '4px solid #0E0E0E', color: '#0E0E0E', fontFamily: MONO, fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical', outline: 'none', boxShadow: '4px 4px 0 #0E0E0E' }} />
                </div>
                <button type="submit" style={{ background: '#FFBE0B', border: '2px solid #0E0E0E', color: '#0E0E0E', padding: '10px 20px', fontFamily: BB, fontSize: '1.2rem', cursor: 'pointer', boxShadow: '4px 4px 0 #0E0E0E' }}>Send Message</button>
              </form>
            </div>
          </div>

          {/* 2. RUBBER STAMP */}
          <div
            ref={stampRef}
            style={{
              position: 'absolute', top: '-2vh', left: '40vw',
              width: '150px', height: '150px',
              transform: 'rotate(20deg)',
              zIndex: 30, pointerEvents: 'none',
              filter: 'drop-shadow(8px 8px 15px rgba(0,0,0,0.25))'
            }}
          >
          </div>

          {/* 3. LAVENDER STICKY NOTE */}
          <div
            ref={stickyRef}
            style={{
              position: 'absolute', top: '48vh', left: '35vw',
              background: '#B399FF', border: B, padding: '25px',
              width: '180px', height: '180px',
              transform: 'rotate(-8deg)', boxShadow: '8px 8px 0 #0E0E0E',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', zIndex: 25,
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '100% 25px'
            }}
          >
            {/* Pushpin */}
            <div style={{ position: 'absolute', top: '12px', width: '14px', height: '14px', borderRadius: '50%', background: '#1B3970', border: '2px solid #0E0E0E', boxShadow: '3px 3px 0 rgba(0,0,0,0.5)' }} />
            <span style={{ fontFamily: BB, fontSize: '2.4rem', lineHeight: 1.1, color: '#0E0E0E', textShadow: '2px 2px 0 #F5F0E8' }}>HIT ME<br />UP!</span>
            <div style={{ marginTop: '10px', width: '50px', height: '4px', background: '#0E0E0E' }} />
          </div>

          {/* 4. PINBOARD */}
          <div
            ref={boardRef}
            style={{
              position: 'absolute', top: '2vh', right: '4vw',
              width: '42vw', minWidth: '380px', maxWidth: '650px',
              background: '#F5F0E8', border: B, boxShadow: '14px 14px 0 #0E0E0E',
              padding: '40px 20px', zIndex: 12, transform: 'rotate(2deg)',
              backgroundImage: 'radial-gradient(circle, rgba(14, 14, 14, 0.15) 2px, transparent 2px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Peeking Orange Monkey Blob */}
            <div style={{ position: 'absolute', top: -75, left: '60%', transform: 'translateX(-50%)', zIndex: 20 }}>
              <svg width="200" height="150" viewBox="0 0 200 150" style={{ overflow: 'visible' }}>
                {/* Body (only top half is visible above the board line approx) */}
                <path d="M70,80 Q70,40 100,40 Q130,40 130,80" fill="#FF8C00" stroke="#0E0E0E" strokeWidth="4" />
                {/* Face */}
                <circle cx="90" cy="55" r="4.5" fill="#0E0E0E" />
                <circle cx="110" cy="55" r="4.5" fill="#0E0E0E" />
                <path d="M95,65 Q100,72 105,65" fill="none" stroke="#0E0E0E" strokeWidth="3" strokeLinecap="round" />

                {/* Long Monkey Left Arm Draping Over */}
                <path d="M72,70 Q50,70 55,100" fill="none" stroke="#FF8C00" strokeWidth="12" strokeLinecap="round" />
                <path d="M72,70 Q50,70 55,100" fill="none" stroke="#0E0E0E" strokeWidth="4" strokeLinecap="round" style={{ mixBlendMode: 'overlay', opacity: 0.5 }} />

                {/* Long Monkey Right Arm Draping Over */}
                <path d="M128,70 Q150,70 145,100" fill="none" stroke="#FF8C00" strokeWidth="12" strokeLinecap="round" />
                <path d="M128,70 Q150,70 145,100" fill="none" stroke="#0E0E0E" strokeWidth="4" strokeLinecap="round" style={{ mixBlendMode: 'overlay', opacity: 0.5 }} />

                {/* Fingers Left */}
                <path d="M50,100 L55,115 M55,100 L60,115 M60,100 L65,115" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" />
                {/* Fingers Right */}
                <path d="M135,100 L140,115 M140,100 L145,115 M145,100 L150,115" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '16px', position: 'relative', zIndex: 10 }}>
              {SOCIALS.map((social, idx) => {
                const stickyColors = [
                  '#DAFC92', // Lime Cream
                  '#B399FF', // Soft Periwinkle
                  '#FFBE0B', // Amber Gold
                  '#FF5C5C', // Vibrant Coral
                  '#1B3970', // Regal Navy
                  '#0E0E0E', // Onyx Black
                ];
                const foldColors = [
                  '#E8FDC2', // Lighter Lime
                  '#CBB8FF', // Lighter Periwinkle
                  '#FFD54F', // Lighter Amber
                  '#FF8080', // Lighter Coral
                  '#2C4E8A', // Lighter Navy
                  '#2A2A2A', // Lighter Black
                ];
                const darkerColors = [
                  '#A8D44F', // Darker Lime
                  '#8A6FE8', // Darker Periwinkle
                  '#D4960A', // Darker Amber
                  '#D43030', // Darker Coral
                  '#0F2548', // Darker Navy
                  '#363535ff', // Darker Black
                ];
                const textColors = [
                  '#0E0E0E', // for Lime Cream
                  '#1B3970', // for Periwinkle
                  '#0E0E0E', // for Amber Gold
                  '#1B3970', // for Coral
                  '#DAFC92', // for Navy
                  '#F5F0E8', // for Parchment
                ];
                const tilts = [-3, 4, 2, -3, 5, -2];
                const pinColors = ['#FF5C5C', '#1B3970', '#DAFC92', '#FFBE0B', '#B399FF', '#FF5C5C'];
                const curlSVG = (
                  <svg
                    width="40" height="40" viewBox="0 0 40 40"
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      right: -1,
                      zIndex: 3,
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Board background covering the clipped corner */}
                    <path d="M0,40 Q25,25 40,0 L40,40 Z" fill={darkerColors[idx]} />
                    {/* Border along the torn/folded edge */}
                    <path d="M0,40 Q25,25 40,0" fill="none" stroke="#0E0E0E" strokeWidth="5" />
                    {/* The actual folded-up flap */}
                    <path d="M0,40 Q25,25 40,0 Q15,35 0,40 Z" fill={darkerColors[idx]} />
                    {/* Flap Shading for 3D effect */}
                    <path d="M0,40 Q25,25 40,0 Q15,35 0,40 Z" fill="rgba(0,0,0,0.15)" />
                    {/* Outline of the folded flap */}
                    <path d="M0,40 Q25,25 40,0 Q15,35 0,40 Z" fill="none" stroke="#0E0E0E" strokeWidth="3" strokeLinejoin="round" />
                  </svg>
                );
                return (
                  <a
                    key={social.name}
                    href={social.name === 'EMAIL' ? `mailto:${social.handle}` : (social.name === 'RESUME' ? '/Anay_Resume.pdf' : '#')}
                    className="pin-card"
                    style={{
                      background: stickyColors[idx],
                      border: B,
                      boxShadow: '6px 6px 0 #0E0E0E',
                      padding: '16px 12px',
                      textDecoration: 'none',
                      color: textColors[idx],
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transform: `rotate(${tilts[idx]}deg)`,
                      position: 'relative',
                      justifyContent: 'center',
                      minHeight: '120px',
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Pin visual: head + stem */}
                    <div style={{ position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: pinColors[idx], border: '2px solid #0E0E0E', boxShadow: '0 2px 4px rgba(0,0,0,0.18)' }} />
                      <div style={{ width: 3, height: 18, background: '#0E0E0E', margin: '0 auto', borderRadius: 2, marginTop: -2, boxShadow: '0 2px 4px rgba(0,0,0,0.10)' }} />
                    </div>
                    <div style={{ marginBottom: '8px', color: textColors[idx], marginTop: 18 }}>{social.icon}</div>
                    <span style={{ fontFamily: BB, fontSize: '1.6rem', letterSpacing: '0.05em', margin: 0 }}>{social.name}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px', textAlign: 'center', wordBreak: 'break-all' }}>{social.handle}</span>
                    {/* Curl effect */}
                    {curlSVG}
                  </a>
                );
              })}
            </div>
          </div>


        </div>
      </div>

    </div>
  );
};

export default ContactSection;
