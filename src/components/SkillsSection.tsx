import React, { forwardRef, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink, Github, Linkedin, Instagram, Mail, Code2, FileText, Download } from 'lucide-react';
import ShapeGrid from './ShapeGrid';

gsap.registerPlugin(ScrollTrigger);

const BB = "'Bebas Neue', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const B = '4px solid #0E0E0E';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Anayshah13', icon: <Github size={30} strokeWidth={2.5} /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/Anayshah', icon: <Linkedin size={30} strokeWidth={2.5} /> },
  { label: 'Instagram', href: 'https://instagram.com/anay_shah13', icon: <Instagram size={30} strokeWidth={2.5} /> },
  { label: 'Email', href: 'mailto:anayshah13@gmail.com', icon: <Mail size={30} strokeWidth={2.5} /> },
  { label: 'Codolio', href: 'https://codolio.com/profile/Anayshah13', icon: <Code2 size={30} strokeWidth={2.5} /> },
];

// ----------------------------------------------------------------------
// CONFIGURATION VARIABLES (Tweak these manually to adjust layout/sizes)
// ----------------------------------------------------------------------

// Resume Stack Settings
const RESUME_WIDTH = '42vw';         // Base width of the resume relative to screen
const RESUME_MIN_WIDTH = '420px';    // Minimum width so it doesn't get unreadable on tiny screens
const RESUME_MAX_WIDTH = '520px';    // Maximum width bounds
const RESUME_BOTTOM_POS = '-12vh';   // How far from the bottom (negative pushes it down off screen)
const RESUME_LEFT_POS = '4vw';       // How far from the left edge (positive pushes it right)

// Cursor Graphic Settings
const CURSOR_SIZE = '85px';          // Width of the cursor pointer image
const CURSOR_OFFSET_BOTTOM = '-25px';// Cursor position relative to terminal bottom edge
const CURSOR_OFFSET_RIGHT = '-35px'; // Cursor position relative to terminal right edge

// Decorative Starburst Settings
const STARBURST_SIZE = '120px';      // Size of the background starburst graphic
const STARBURST_TOP = '5vh';         // Position from top
const STARBURST_RIGHT = '42vw';      // Position from right

// ----------------------------------------------------------------------

const SkillsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeScale, setResumeScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation refs
  const topSheetRef = useRef<HTMLDivElement>(null);
  const stackWrapperRef = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const starburstRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Combine forwarded ref and internal ref
    if (typeof ref === 'function') {
      ref(containerRef.current);
    } else if (ref) {
      ref.current = containerRef.current;
    }

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animations when section scrolls into view
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          gsap.from(titleBoxRef.current, { x: 100, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' });
          gsap.from(terminalRef.current, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
          gsap.from(cursorRef.current, { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.8)', delay: 0.8 });
          gsap.from(stackWrapperRef.current, { x: -100, y: 100, rotationZ: -20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
          gsap.from(starburstRef.current, { scale: 0, rotation: -180, duration: 0.8, ease: 'back.out(1.2)', delay: 0.3 });

          if (linksRef.current) {
            const children = Array.from(linksRef.current.children);
            gsap.fromTo(children,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.4 }
            );
          }
        }
      });

      // Continuous slow rotation for the starburst
      if (starburstRef.current) {
        gsap.to(starburstRef.current, { rotation: 360, duration: 30, repeat: -1, ease: 'linear' });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [ref]);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResumeOpen(true);
    setResumeScale(1);
  };

  const TopSheetHoverEnter = () => {
    if (topSheetRef.current && stackWrapperRef.current) {
      gsap.to(stackWrapperRef.current, { zIndex: 100, duration: 0 });
      gsap.to(topSheetRef.current, {
        x: '8%', y: '-10%',
        rotationZ: -2,
        scale: 1.05,
        duration: 0.4, ease: 'power2.out',
      });
    }
  };

  const TopSheetHoverLeave = () => {
    if (topSheetRef.current && stackWrapperRef.current) {
      gsap.to(topSheetRef.current, {
        x: '0%', y: '0%',
        rotationZ: -6,
        scale: 1,
        duration: 0.4, ease: 'power2.inOut',
        onComplete: () => {
          if (stackWrapperRef.current) gsap.set(stackWrapperRef.current, { zIndex: 10 });
        }
      });
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        id="skills-section"
        style={{
          width: '100%',
          height: '100vh',
          background: '#FF5C5C',
          color: '#0E0E0E',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 5,
        }}
      >
        <style>{`
          @keyframes termBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .shapegrid-wrapper {
            position: absolute;
            inset: 0;
            z-index: 0;
            width: 100%;
            height: 100%;
          }
          .shapegrid-canvas {
            width: 100%;
            height: 100%;
            display: block;
          }
        `}</style>

        {/* ShapeGrid Background Integration */}
        <div className="shapegrid-wrapper">
          <ShapeGrid
            direction="diagonal"
            speed={0.5}
            shape="hexagon"
            borderColor="rgba(14,14,14,0.12)"
            hoverFillColor="#f5f0e8ab"
            squareSize={80}
            hoverTrailAmount={2}
          />
        </div>

        {/* Decorative Neobrutalist Starburst */}
        <svg
          ref={starburstRef}
          width={STARBURST_SIZE}
          height={STARBURST_SIZE}
          viewBox="0 0 100 100"
          style={{
            position: 'absolute', top: STARBURST_TOP, right: STARBURST_RIGHT, zIndex: 10,
            transformOrigin: 'center center'
          }}
        >
          <path
            d="M50 0 L55 35 L90 25 L65 50 L90 75 L55 65 L50 100 L45 65 L10 75 L35 50 L10 25 L45 35 Z"
            fill="#DAFC92"
            stroke="#0E0E0E"
            strokeWidth="4"
            strokeLinejoin="miter"
          />
        </svg>

        {/* Top-Right Title Box */}
        <div
          ref={titleBoxRef}
          style={{
            position: 'absolute', top: '5vh', right: '5vw', zIndex: 20,
            background: '#0E0E0E', border: B, padding: '12px 28px',
            boxShadow: '6px 6px 0 #DAFC92'
          }}
        >
          <h2 style={{
            fontFamily: BB,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#FF5C5C',
            letterSpacing: '0.12em',
            lineHeight: 1,
            margin: 0,
          }}>
            SKILLS &amp; LINKS
          </h2>
          <div style={{ width: '60px', height: '5px', background: '#DAFC92', margin: '4px 0 0 0', borderRadius: 0 }} />
        </div>

        {/* Left Column: Huge Resume Paper Stack configured via variables */}
        <div
          ref={stackWrapperRef}
          style={{
            position: 'absolute',
            bottom: RESUME_BOTTOM_POS,
            left: RESUME_LEFT_POS,
            width: RESUME_WIDTH,
            minWidth: RESUME_MIN_WIDTH,
            maxWidth: RESUME_MAX_WIDTH,
            aspectRatio: '1 / 1.414',
            zIndex: 10
          }}
        >
          {/* Sheet 3 (Further back) */}
          <div style={{
            position: 'absolute', inset: 0, background: '#DAFC92',
            transform: 'rotate(-20deg) translate(-25px, 35px)', zIndex: 1, boxShadow: '8px 8px 15px rgba(0,0,0,0.3)',
            borderRadius: '3px', border: '2px solid rgba(0, 0, 0, 1)'
          }} />
          {/* Sheet 2 (Middle) - Lavender with wireframe lines */}
          <div style={{
            position: 'absolute', inset: 0, background: '#B399FF',
            transform: 'rotate(-13deg) translate(-15px, 20px)', zIndex: 2, boxShadow: '8px 8px 15px rgba(0,0,0,0.2)',
            borderRadius: '3px', border: '2px solid rgba(0, 0, 0, 1)', overflow: 'hidden'
          }}>
            {/* Wireframe dummy horizontal lines */}
            {[12, 22, 32, 42, 52, 62, 72, 82].map((top, i) => (
              <div key={i} style={{ position: 'absolute', top: `${top}%`, left: '8%', right: '8%', height: '5px', background: 'rgba(14,14,14,0.3)', borderRadius: '2px' }} />
            ))}
            {/* Bold header line */}
            <div style={{ position: 'absolute', top: '7%', left: '15%', width: '70%', height: '8px', background: 'rgba(14,14,14,0.45)', borderRadius: '2px' }} />
            {/* Footer line */}
            <div style={{ position: 'absolute', top: '90%', left: '8%', right: '8%', height: '5px', background: 'rgba(14,14,14,0.3)', borderRadius: '2px' }} />
          </div>
          <div style={{
            position: 'absolute', inset: 0, background: '#FFBE0B',
            transform: 'rotate(-27deg) translate(-15px, 20px)', zIndex: 0, boxShadow: '8px 8px 15px rgba(0,0,0,0.2)',
            borderRadius: '3px', border: '2px solid rgba(0, 0, 0, 1)'
          }} />

          {/* Sheet 1 (Top - Actual Resume Shape + Header) */}
          <div
            ref={topSheetRef}
            onClick={handleResumeClick}
            onMouseEnter={TopSheetHoverEnter}
            onMouseLeave={TopSheetHoverLeave}
            style={{
              position: 'absolute', inset: 0, zIndex: 3, background: '#F5F0E8',
              boxShadow: '12px 12px 25px rgba(0,0,0,0.4)', transform: 'rotate(-6deg)', transformOrigin: 'left center',
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              willChange: 'transform', borderRadius: '4px', overflow: 'hidden',
              border: '2px solid rgba(0,0,0,0.1)'
            }}
          >
            {/* Header bar */}
            <div style={{
              background: '#0E0E0E', color: '#DAFC92', padding: '12px 18px',
              fontFamily: MONO, fontSize: '1rem', fontWeight: 700,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexShrink: 0
            }}>
              <span>ANAY_RESUME.PDF</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ExternalLink size={16} /> VIEW
              </span>
            </div>
            {/* Using iframe to show PDF cleanly in A4 proportion */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#fff' }}>
              <iframe
                src="/Anay_Resume.pdf#view=FitH&scrollbar=0&toolbar=0&navpanes=0"
                style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', backgroundColor: '#fff' }}
                title="Resume Preview"
              />
              <div style={{ position: 'absolute', inset: 0, zIndex: 10 }} />
            </div>
          </div>
        </div>

        {/* Right Side: Terminal & Links */}
        <div style={{
          position: 'absolute', right: '5vw', top: '15vh', bottom: '15vh',
          width: '50vw', minWidth: '400px', maxWidth: '750px',
          zIndex: 15, display: 'flex', flexDirection: 'column', gap: '32px'
        }}>
          {/* Terminal Interface Wrapper with Cursor inside */}
          <div style={{ position: 'relative', width: '100%', flex: '1 0 auto', display: 'flex' }}>
            <div
              ref={terminalRef}
              style={{
                background: '#1B3970', border: B, boxShadow: '10px 10px 0 #0E0E0E', borderRadius: 0,
                width: '100%', display: 'flex', flexDirection: 'column', flex: 1
              }}
            >
              {/* Terminal title bar */}
              <div style={{
                height: '36px', background: '#0E0E0E', display: 'flex', alignItems: 'center',
                padding: '0 14px', gap: '8px', flexShrink: 0
              }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
                <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: '#DAFC92', letterSpacing: '0.08em', marginLeft: '6px' }}>
                  anay@portfolio:~
                </span>
              </div>
              {/* Terminal body */}
              <div style={{
                padding: '18px 20px', overflowY: 'auto', fontFamily: MONO,
                fontSize: '0.8rem', lineHeight: 1.8, color: '#DAFC92', flex: 1
              }}>
                <div><span style={{ color: '#89C9C9' }}>$</span> <span style={{ color: '#F5F0E8' }}>skills --list --all</span></div>
                <div style={{ height: '1em' }}></div>
                <div><span style={{ color: '#FFBE0B', fontWeight: 700 }}>// CORE LANGUAGES</span></div>
                <div style={{ color: '#F5F0E8', opacity: 0.9 }}>[&quot;Python&quot;, &quot;C&quot;, &quot;C++&quot;, &quot;Java&quot;, &quot;JavaScript&quot;, &quot;HTML&quot;, &quot;CSS&quot;]</div>
                <div style={{ height: '1em' }}></div>
                <div><span style={{ color: '#FFBE0B', fontWeight: 700 }}>// FRONTEND ECOSYSTEM</span></div>
                <div style={{ color: '#F5F0E8', opacity: 0.9 }}>[&quot;React&quot;, &quot;Next.js&quot;, &quot;GSAP&quot;, &quot;Three.js&quot;, &quot;Framer Motion&quot;]</div>
                <div style={{ height: '1em' }}></div>
                <div><span style={{ color: '#FFBE0B', fontWeight: 700 }}>// DATA &amp; LIBRARIES</span></div>
                <div style={{ color: '#F5F0E8', opacity: 0.9 }}>[&quot;NumPy&quot;, &quot;Pandas&quot;, &quot;Matplotlib&quot;, &quot;Seaborn&quot;, &quot;Recharts&quot;]</div>
                <div style={{ height: '1em' }}></div>
                <div><span style={{ color: '#FFBE0B', fontWeight: 700 }}>// SYS &amp; HARDWARE TOOLS</span></div>
                <div style={{ color: '#F5F0E8', opacity: 0.9 }}>[&quot;Git&quot;, &quot;GitHub&quot;, &quot;Figma&quot;, &quot;ESP32&quot;, &quot;Arduino&quot;, &quot;Blender&quot;, &quot;Jupyter&quot;]</div>
                <div style={{ height: '1em' }}></div>
                <div><span style={{ color: '#FFBE0B', fontWeight: 700 }}>// ACTIVE BACKGROUND PROCESSES</span></div>
                <div><span style={{ color: '#FF5C5C' }}>↳</span> <span style={{ color: '#B399FF' }}>Machine_Learning_Andrew_Ng.exe</span></div>
                <div><span style={{ color: '#FF5C5C' }}>↳</span> <span style={{ color: '#B399FF' }}>CompetitiveProgramming (LeetCode/Codeforces)</span></div>
                <div style={{ height: '1em' }}></div>
                <div>
                  <span style={{ color: '#89C9C9' }}>$</span> <span style={{ background: '#DAFC92', width: '5px', height: '1.2em', display: 'inline-block', verticalAlign: 'middle', animation: 'termBlink 1.1s step-end infinite' }} />
                </div>
              </div>
            </div>
            {/* Adjustable Cursor Graphic */}
            <img
              ref={cursorRef}
              src="/cursor.png"
              alt="Pointer"
              style={{
                position: 'absolute', bottom: CURSOR_OFFSET_BOTTOM, right: CURSOR_OFFSET_RIGHT,
                width: CURSOR_SIZE, zIndex: 25, transform: 'rotate(-10deg)',
                filter: 'drop-shadow(6px 6px 0 rgba(0,0,0,0.85))',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Circular Neobrutalist Links */}
          <div style={{ width: '100%', height: '4px', background: '#0E0E0E', margin: '4px 0' }} />
          <div
            ref={linksRef}
            style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start', flexShrink: 0, marginLeft: '4vw' }}
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '68px', height: '68px',
                  border: B, boxShadow: '4px 4px 0 #0E0E0E',
                  background: '#DAFC92',
                  borderRadius: '50%', // Circular form
                  display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', color: '#0E0E0E',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  opacity: 0 // For GSAP fromTo entrance
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #0E0E0E';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #0E0E0E';
                }}
                title={link.label}
              >
                {link.icon}
              </a>
            ))}

            {/* Resume Button inside Links area */}
            <div
              onClick={handleResumeClick}
              style={{
                width: '68px', height: '68px',
                border: B, boxShadow: '4px 4px 0 #0E0E0E',
                background: '#F5F0E8',
                borderRadius: '50%', // Circular 
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', color: '#0E0E0E',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                opacity: 0 // For GSAP fromTo entrance
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #0E0E0E';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #0E0E0E';
              }}
              title="Resume"
            >
              <FileText size={30} strokeWidth={2.5} />
            </div>
          </div>
        </div>

      </div>

      {/* Transparent Dark Blurred Resume Modal */}
      {isResumeOpen && (
        <div
          onClick={() => setIsResumeOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backgroundImage: 'radial-gradient(circle, rgba(255, 247, 246, 0.05) 3px, transparent 3px)',
            backgroundSize: '30px 30px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px'
          }}
        >
          {/* A4 Proportion Container for Custom Viewer */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '95vw', maxWidth: '1100px',
              height: '90vh',
              background: '#0E0E0E',
              boxShadow: '12px 12px 0 #0E0E0E, 0 25px 50px -12px rgba(0, 0, 0, 0.8)',
              border: '3px solid #DAFC92',
              display: 'flex', flexDirection: 'column', position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Minimalist Header for Document */}
            <div style={{
              background: '#0E0E0E', padding: '12px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
            }}>
              <span style={{ fontFamily: BB, fontSize: '1.4rem', color: '#DAFC92', letterSpacing: '0.05em', lineHeight: 1 }}>
                DOCUMENT VIEWER: ANAY_RESUME.PDF
              </span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {/* Neobrutalist Zoom Controls */}
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0E0E0E', border: '2px solid #DAFC92' }}>
                  <button 
                    onClick={() => setResumeScale(s => Math.max(s - 0.25, 0.5))}
                    style={{ background: 'transparent', border: 'none', color: '#DAFC92', width: '36px', height: '32px', cursor: 'pointer', fontFamily: MONO, fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(218, 252, 146, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Zoom Out"
                  >−</button>
                  <div style={{ borderLeft: '2px solid #DAFC92', borderRight: '2px solid #DAFC92', padding: '0 8px', height: '32px', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="number"
                      min={25}
                      max={400}
                      value={Math.round(resumeScale * 100)}
                      onChange={e => {
                        const v = parseInt(e.target.value, 10);
                        if (!isNaN(v)) setResumeScale(Math.min(Math.max(v / 100, 0.25), 4));
                      }}
                      style={{ background: 'transparent', border: 'none', outline: 'none', color: '#DAFC92', fontFamily: MONO, fontSize: '1rem', fontWeight: 'bold', width: '48px', textAlign: 'center' }}
                    />
                    <span style={{ color: '#DAFC92', fontFamily: MONO, fontSize: '1rem' }}>%</span>
                  </div>
                  <button 
                    onClick={() => setResumeScale(s => Math.min(s + 0.25, 4))}
                    style={{ background: 'transparent', border: 'none', color: '#DAFC92', width: '36px', height: '32px', cursor: 'pointer', fontFamily: MONO, fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(218, 252, 146, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    title="Zoom In"
                  >+</button>
                </div>

                <a 
                  href="/Anay_Resume.pdf" 
                  download="Anay_Resume.pdf"
                  style={{ background: '#DAFC92', border: '2px solid #DAFC92', color: '#0E0E0E', cursor: 'pointer', padding: '0 12px', height: '36px', transition: 'transform 0.1s', display: 'flex', alignItems: 'center', textDecoration: 'none', fontFamily: BB, fontSize: '1.2rem', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px, -2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  title="Download PDF"
                  aria-label="Download"
                >
                  <Download size={18} strokeWidth={2.5} /> DOWNLOAD
                </a>
                
                <button 
                  onClick={() => setIsResumeOpen(false)}
                  style={{ 
                    background: '#FF5C5C', border: '2px solid #0E0E0E',
                    width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'transform 0.1s ease', marginLeft: '8px',
                    boxShadow: '4px 4px 0 #0E0E0E'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translate(-2px,-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  aria-label="Close"
                >
                  <X size={24} color="#0E0E0E" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Modal Content - Dark Onyx Scrollable Zoom Container */}
            <div style={{ flex: 1, width: '100%', overflow: 'auto', backgroundColor: '#141414' }}>
              {/* Centering wrapper fills entire space so dark bg shows fully at all zoom levels */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minWidth: '100%', minHeight: '100%', padding: '32px', boxSizing: 'border-box' }}>
                {/* Resume doc: width% of the scroll container. No minWidth so 50%/75% truly shrinks it */}
                <div style={{ 
                  width: `${resumeScale * 100}%`,
                  aspectRatio: '1 / 1.414',
                  flexShrink: 0,
                  position: 'relative',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                  transition: 'width 0.2s ease-out',
                }}>
                  <iframe
                    src="/Anay_Resume.pdf#view=Fit&scrollbar=0&toolbar=0&navpanes=0"
                    style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', display: 'block' }}
                    title="Resume Full View"
                  />
                  <div style={{ position: 'absolute', inset: 0, zIndex: 5 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

SkillsSection.displayName = 'SkillsSection';
export default SkillsSection;
