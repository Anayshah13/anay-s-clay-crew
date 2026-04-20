import React from 'react';

const ONYX = '#0E0E0E';
const AMBER = '#FFBE0B';
const SEP = ' //// ';
const MONO = "'JetBrains Mono', monospace";

/** Nouns / phrases for what you do — edit freely. */
const PHRASES = [
  'DESIGN',
  'SCALABLE BACKENDS',
  'ACCESSIBLE',
  'FAST',
  'SECURE',
  'OPEN FOR WORK',
  'FULL STACK DEVELOPMENT',
  'UI ANIMATION',
  'COMPETITIVE PROGRAMMING',
];

const CHUNK = `${PHRASES.join(SEP)}${SEP}`;

const PursuitsTapeBand: React.FC = () => (
  <section
    style={{
      width: '100%',
      boxSizing: 'border-box',
      background: AMBER,
      borderTop: `3px solid ${ONYX}`,
      borderBottom: `3px solid ${ONYX}`,
      paddingTop: '0.45rem',
      paddingBottom: '0.45rem',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative',
      zIndex: 6,
    }}
  >
    <style>{`
      @keyframes pursuits-marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .pursuits-marquee-track {
        display: flex;
        width: max-content;
        animation: pursuits-marquee 38s linear infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .pursuits-marquee-track {
          animation: none;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          max-width: 100%;
          padding: 0.45rem 0.65rem;
          box-sizing: border-box;
        }
        .pursuits-marquee-track span {
          white-space: normal;
        }
      }
    `}</style>

    <p className="sr-only">Things I do: {PHRASES.join(', ')}.</p>

    <div className="pursuits-marquee-track" aria-hidden="true">
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 800,
          fontSize: 'clamp(0.82rem, 2.1vw, 1.08rem)',
          letterSpacing: '0.07em',
          color: ONYX,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          lineHeight: 1.15,
          paddingRight: '1.5rem',
        }}
      >
        {CHUNK}
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 800,
          fontSize: 'clamp(0.82rem, 2.1vw, 1.08rem)',
          letterSpacing: '0.07em',
          color: ONYX,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          lineHeight: 1.15,
          paddingRight: '1.5rem',
        }}
      >
        {CHUNK}
      </span>
    </div>
  </section>
);

export default PursuitsTapeBand;
