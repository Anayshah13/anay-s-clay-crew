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
      gsap.utils.toArray('.deco-float').forEach((el: any, i) => {
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
        .from(buttonRef.current, { y: 100, scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.3')
        // Stamp comes down hard
        .from(stampRef.current, { scale: 3, rotation: 15, opacity: 0, duration: 0.4, ease: 'power4.in' }, '-=0.4')
        // Jolt the terminal on stamp impact!
        .to(terminalRef.current, { y: '+=10', rotation: '-=2', duration: 0.1, yoyo: true, repeat: 1 }, '-=0.0')
        // Social cards stagger pop
        .from('.pin-card', { scale: 0, rotation: () => Math.random() * 40 - 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
        .from(footerRef.current, { y: 40, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
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

      {/* Scattered Micro-elements */}
      <div className="deco-float" style={{ position: 'absolute', top: '20%', left: '8%', width: '120px', height: '120px', border: '5px solid #DAFC92', borderRadius: '50%', opacity: 0.8, boxShadow: '8px 8px 0 #0E0E0E' }} />
      <div className="deco-float" style={{ position: 'absolute', bottom: '15%', right: '12%', width: '150px', height: '150px', border: '5px solid #0E0E0E', background: '#FF5C5C', opacity: 0.4, transform: 'rotate(15deg)' }} />
      <div className="deco-float" style={{ position: 'absolute', top: '15%', right: '25%', opacity: 0.9, fontSize: '5rem', fontWeight: 'bold', color: '#FFBE0B', textShadow: '4px 4px 0 #0E0E0E' }}>+</div>
      <div className="deco-float" style={{ position: 'absolute', bottom: '25%', left: '15%', opacity: 0.8, fontSize: '6rem', fontWeight: 'bold', color: '#F5F0E8', textShadow: '6px 6px 0 #1B3970' }}>{"}"}</div>
      <svg className="deco-float" width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', top: '40%', right: '5%', zIndex: 1 }}>
        <path d="M50 0 L55 35 L90 25 L65 50 L90 75 L55 65 L50 100 L45 65 L10 75 L35 50 L10 25 L45 35 Z" fill="#DAFC92" stroke="#0E0E0E" strokeWidth="4" />
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
            <div style={{ padding: '32px 24px', color: '#1B3970', fontSize: '1.25rem', lineHeight: 2.2, minHeight: '280px' }}>
              <form onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:anayshah10@gmail.com?subject=Message from ${email}&body=${encodeURIComponent(message)}`; }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#FFBE0B', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>From (Email):</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#F5F0E8', border: '2px solid #1B3970', color: '#1B3970', fontFamily: MONO, fontSize: '1rem', boxSizing: 'border-box', borderRadius: 8, fontWeight: 600 }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#FFBE0B', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>Message:</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} style={{ width: '100%', padding: '10px', background: '#F5F0E8', border: '2px solid #1B3970', color: '#1B3970', fontFamily: MONO, fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical', borderRadius: 8, fontWeight: 600 }} />
                </div>
                <button type="submit" style={{ background: '#FFBE0B', border: '2px solid #0E0E0E', color: '#0E0E0E', padding: '10px 20px', fontFamily: BB, fontSize: '1.2rem', cursor: 'pointer', boxShadow: '4px 4px 0 #0E0E0E', borderRadius: 8 }}>Send Message</button>
              </form>
            </div>
          </div>

          {/* 2. RUBBER STAMP */}
          <div
            ref={stampRef}
            style={{
              position: 'absolute', top: '0vh', left: '35vw',
              background: '#F5F0E8', border: '5px solid #27C93F', color: '#27C93F',
              padding: '16px 24px', transform: 'rotate(12deg)',
              fontFamily: BB, fontSize: '3rem', fontWeight: 900,
              textShadow: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              zIndex: 30, pointerEvents: 'none',
              outline: '4px solid #F5F0E8', outlineOffset: '-10px',
              mixBlendMode: 'normal', boxShadow: '8px 8px 15px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ fontSize: '1.2rem', letterSpacing: '0.3em', opacity: 0.8 }}>STATUS:</div>
            <div style={{ lineHeight: 0.9 }}>OPEN TO</div>
            <div style={{ lineHeight: 0.9 }}>INTERNSHIPS</div>
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
              background: '#1B3970', border: B, boxShadow: '14px 14px 0 #0E0E0E',
              padding: '40px 20px', zIndex: 12, transform: 'rotate(2deg)',
              backgroundImage: 'radial-gradient(circle, rgba(245,240,232,0.10) 2px, transparent 2px)',
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
                // Sticky note colors from palette
                const stickyColors = [
                  '#DAFC92', // Lime Cream
                  '#F5F0E8', // Parchment
                  '#B399FF', // Soft Periwinkle
                  '#FFBE0B', // Amber Gold
                  '#FF5C5C', // Vibrant Coral
                  '#1B3970', // Regal Navy
                ];
                const textColors = [
                  '#0E0E0E', // for Lime Cream
                  '#1B3970', // for Parchment
                  '#1B3970', // for Periwinkle
                  '#0E0E0E', // for Amber Gold
                  '#1B3970', // for Coral
                  '#DAFC92', // for Navy
                ];
                const tilts = [-3, 4, 2, -3, 5, -2];
                const pinColors = ['#FF5C5C', '#1B3970', '#DAFC92', '#FFBE0B', '#B399FF', '#FF5C5C'];
                // Curl SVG for sticky note
                const curlSVG = (
                  <svg width="38" height="22" viewBox="0 0 38 22" style={{
                    position: 'absolute',
                    bottom: 0,
                    right: idx % 2 === 0 ? 0 : undefined,
                    left: idx % 2 !== 0 ? 0 : undefined,
                    zIndex: 3,
                  }}>
                    <path
                      d={
                        idx % 2 === 0
                          ? "M0,0 Q18,22 38,0 L38,22 L0,22 Z"
                          : "M38,0 Q20,22 0,0 L0,22 L38,22 Z"
                      }
                      fill="#F5F0E8"
                      opacity="0.85"
                    />
                    <path
                      d={
                        idx % 2 === 0
                          ? "M0,0 Q18,22 38,0"
                          : "M38,0 Q20,22 0,0"
                      }
                      fill="none"
                      stroke="#0E0E0E"
                      strokeWidth="2"
                      opacity="0.5"
                    />
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
                      borderRadius: 16,
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

          {/* 5. GIANT "SAY HI!" BUTTON */}
          <a
            ref={buttonRef}
            href="mailto:hello@anayshah.com"
            className="say-hi-btn"
            style={{
              position: 'absolute', bottom: '8vh', left: '15vw',
              width: '160px', height: '160px', borderRadius: '50%',
              background: '#FF5C5C', border: '5px solid #0E0E0E', boxShadow: '0px 10px 0px #0E0E0E',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', color: '#0E0E0E', zIndex: 40,
              cursor: 'pointer'
            }}
          >
            <Hand size={42} strokeWidth={2.5} style={{ marginBottom: '5px' }} />
            <span style={{ fontFamily: BB, fontSize: '2.4rem', lineHeight: 1 }}>SAY HI!</span>
          </a>


        </div>
      </div>

    </div>
  );
};

export default ContactSection;
