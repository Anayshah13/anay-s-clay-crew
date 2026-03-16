import React, { forwardRef } from 'react';

const BB = "'Bebas Neue', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const B = '4px solid #0E0E0E';

const SKILLS = [
  {
    label: 'Frontend',
    color: '#DAFC92',
    items: ['React', 'TypeScript', 'Next.js', 'GSAP', 'Tailwind', 'Vite'],
  },
  {
    label: 'Backend',
    color: '#B399FF',
    items: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB'],
  },
  {
    label: 'AI / ML',
    color: '#FFBE0B',
    items: ['PyTorch', 'HuggingFace', 'LangChain', 'OpenCV', 'Scikit-learn'],
  },
  {
    label: 'Tools & More',
    color: '#4ECDC4',
    items: ['Git', 'Docker', 'Figma', 'Linux', 'Blockchain', 'Web3'],
  },
];

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Anayshah13', emoji: '🐙' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/Anayshah', emoji: '💼' },
  { label: 'Instagram', href: 'https://instagram.com/anay_shah13', emoji: '📸' },
  { label: 'Email', href: 'mailto:anayshah13@gmail.com', emoji: '✉️' },
  { label: 'Resume', href: '#', emoji: '📄' },
];

const SkillsSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      id="skills-section"
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#FF5C5C',
        color: '#0E0E0E',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 5vw 80px',
        boxSizing: 'border-box',
        visibility: 'hidden',
        opacity: 0,
        zIndex: 5,
      }}
    >
      {/* Background dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }} />

      {/* Heading */}
      <div
        className="skills-heading"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '48px' }}
      >
        <h2 style={{
          fontFamily: BB,
          fontSize: 'clamp(4rem, 9vw, 7.5rem)',
          color: '#0E0E0E',
          letterSpacing: '0.12em',
          lineHeight: 1,
          margin: 0,
        }}>
          Skills &amp; Links
        </h2>
        <div style={{ width: '80px', height: '6px', background: '#0E0E0E', margin: '16px auto 0', borderRadius: 0 }} />
      </div>

      {/* Skill boxes grid */}
      <div
        className="skills-grid"
        style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          width: '100%',
          maxWidth: '900px',
          marginBottom: '48px',
        }}
      >
        {SKILLS.map((cat) => (
          <div
            key={cat.label}
            className="skill-box"
            style={{
              background: '#F5F0E8',
              border: B,
              boxShadow: '6px 6px 0 #0E0E0E',
              borderRadius: 0,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              background: '#0E0E0E', padding: '8px 14px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
              <span style={{ fontFamily: BB, fontSize: '1.1rem', color: cat.color, letterSpacing: '0.1em' }}>
                {cat.label}
              </span>
            </div>
            {/* Tags */}
            <div style={{ padding: '12px 14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {cat.items.map(item => (
                <span key={item} style={{
                  fontFamily: MONO, fontSize: '0.68rem', fontWeight: 700,
                  background: cat.color, color: '#0E0E0E',
                  padding: '3px 8px', borderRadius: 0,
                  border: '2px solid #0E0E0E',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Links row */}
      <div
        className="skills-links"
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center',
        }}
      >
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="skill-link-circle"
            style={{
              width: '80px', height: '80px', borderRadius: '50%',
              border: '3px solid #0E0E0E', boxShadow: '4px 4px 0 #0E0E0E',
              background: '#F5F0E8',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', color: '#0E0E0E',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #0E0E0E';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #0E0E0E';
            }}
          >
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{link.emoji}</span>
            <span style={{ fontFamily: MONO, fontSize: '0.5rem', fontWeight: 700, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
});

SkillsSection.displayName = 'SkillsSection';
export default SkillsSection;
