import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProjectsTimeline.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  date: string;
  position: 'left' | 'right';
  color: string;
  hackathon?: string;
  liveUrl?: string;
  githubUrl?: string;
  imagePlaceholder: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI-Powered LoL Wrapped',
    description: 'Full-stack analytics platform built during Rift Rewind Hackathon. Delivers personalized League of Legends gameplay insights from Riot API data using AWS Bedrock AI.',
    tech: ['React', 'TypeScript', 'FastAPI', 'AWS Bedrock', 'Riot API'],
    date: 'Nov 2025',
    position: 'right',
    color: '#4ECDC4',
    hackathon: '🏆 Hidden Gem Prize — AWS × Riot Games',
    githubUrl: 'https://github.com/Anayshah13/rift-wrapped',
    imagePlaceholder: 'LOL_WRAPPED',
  },
  {
    id: 2,
    title: 'Committee Websites',
    description: 'Official websites for DJS Antariksh, DJCSI & DJS CodeStars. Performance-focused animated UI with interactive 3D components and GSAP-driven transitions.',
    tech: ['React', 'Next.js', 'GSAP', 'Three.js', 'Framer Motion'],
    date: 'Dec 2025',
    position: 'left',
    color: '#B399FF',
    githubUrl: 'https://github.com/Anayshah13',
    imagePlaceholder: 'COMMITTEES',
  },
  {
    id: 3,
    title: 'Industrial Metal Factory Website',
    description: 'Redesigned a legacy PHP-based industrial company site into a clean, responsive React frontend with subtle animations. Real client project.',
    tech: ['React', 'CSS', 'Responsive Design'],
    date: 'Dec 2025',
    position: 'right',
    color: '#F2A900',
    imagePlaceholder: 'FACTORY',
  },
  {
    id: 4,
    title: 'RAG System with PDF Upload',
    description: 'Retrieval-Augmented Generation system using HuggingFace. Implements PDF parsing, vector embeddings, semantic search, and context-aware response generation with query memory.',
    tech: ['Python', 'HuggingFace', 'Vector DB', 'FastAPI'],
    date: 'Aug 2025',
    position: 'left',
    color: '#FF5C5C',
    githubUrl: 'https://github.com/Anayshah13',
    imagePlaceholder: 'RAG_SYSTEM',
  },
  {
    id: 5,
    title: 'LEGO Set Finder',
    description: 'React app to search LEGO sets by name and number using CSV parsing via PapaParse, dynamic filtering and a clean responsive UI.',
    tech: ['React', 'PapaParse', 'CSV', 'Tailwind'],
    date: 'Jul 2025',
    position: 'right',
    color: '#3b82f6',
    githubUrl: 'https://github.com/Anayshah13/Lego-Set-Finder',
    imagePlaceholder: 'LEGO_FINDER',
  },
  {
    id: 6,
    title: 'Excel Graph Visualizer',
    description: 'React app that parses aluminium factory production data and renders multi-parameter visual charts using Recharts with dynamic parameter selection.',
    tech: ['React', 'Recharts', 'PapaParse', 'Data Viz'],
    date: 'Jul 2025',
    position: 'left',
    color: '#B399FF',
    githubUrl: 'https://github.com/Anayshah13/Western-Excel-Visualizer',
    imagePlaceholder: 'EXCEL_VIZ',
  },
  {
    id: 7,
    title: 'EDA on Kaggle Datasets',
    description: 'Data cleaning and exploratory data analysis on diabetes and e-commerce datasets. Applied linear regression, logistic regression, and one-hot encoding.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    date: 'Jun 2025',
    position: 'right',
    color: '#FF5C5C',
    githubUrl: 'https://github.com/Anayshah13',
    imagePlaceholder: 'EDA',
  },
  {
    id: 8,
    title: 'PyGame 2D Shooter',
    description: 'First game project. 2D shooter in Python using PyGame with player mechanics, collision detection, and full game physics.',
    tech: ['Python', 'PyGame', 'Game Physics'],
    date: 'Dec 2024',
    position: 'left',
    color: '#F2A900',
    githubUrl: 'https://github.com/Anayshah13/Anays-First-Pygame',
    imagePlaceholder: 'PYGAME',
  },
];

const DevBlob: React.FC<{ leftPupilRef: React.RefObject<HTMLDivElement>; rightPupilRef: React.RefObject<HTMLDivElement> }> = ({ leftPupilRef, rightPupilRef }) => (
  <div className={styles.devBlob}>
    <div className={styles.blobBody}>
      <div className={styles.blobHighlight} />
      
      <div className={styles.blobFace}>
        <div className={styles.blobGlasses}>
          <div className={styles.glassLens} />
          <div className={styles.glassBridge} />
          <div className={styles.glassLens} />
        </div>
        <div className={styles.blobEyes}>
          <div className={styles.blobEye}><div ref={leftPupilRef} className={styles.blobPupil} /></div>
          <div className={styles.blobEye}><div ref={rightPupilRef} className={styles.blobPupil} /></div>
        </div>
        <div className={styles.blobMouth} />
      </div>

      <div className={styles.propellerHat}>
        <div className={styles.hatBody}>
          <div className={styles.hatSegment} style={{ background: '#4285F4' }} />
          <div className={styles.hatSegment} style={{ background: '#34A853' }} />
          <div className={styles.hatSegment} style={{ background: '#FBBC05' }} />
          <div className={styles.hatSegment} style={{ background: '#EA4335' }} />
        </div>
        <div className={styles.propellerBlade} />
      </div>

      <div className={styles.blobAccessories}>
        <div className={styles.blobArmLeft} />
        <div className={styles.laptopHand}>
          <div className={styles.blobArmRight} />
          <div className={styles.blobComputer}>
            <div className={styles.computerScreen}>
              <div className={styles.computerCode} />
            </div>
            <div className={styles.computerBase} />
          </div>
        </div>
      </div>
    </div>
    
    <div className={styles.blobLegs}>
      <div className={styles.blobLeg} />
      <div className={styles.blobLeg} />
    </div>
  </div>
);

const ProjectImage: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div className={styles.projectImage} style={{ borderColor: color, boxShadow: `8px 8px 0 ${color}` }}>
    <div className={styles.imageBrowserBar}>
      <div className={styles.imageBrowserUrl}>localhost:3000</div>
      <div className={styles.macIconsArea}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
      </div>
    </div>
    <div className={styles.projectImageInner}>
      <div className={styles.imageDotGrid} />
      <div className={styles.imageLabel} style={{ background: color, color: '#0E0E0E' }}>
        {label}
      </div>
    </div>
  </div>
);

const ProjectsTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressLineRef = useRef<SVGPathElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  const SEG_H = 600; // Increased wavelength slightly
  const SVGH = PROJECTS.length * SEG_H;

  const buildPath = () => {
    const n = PROJECTS.length;
    let d = `M 500 0`; // Start at middle of 1000px canvas
    for (let i = 0; i < n; i++) {
      const y0 = i * SEG_H;
      const y1 = (i + 1) * SEG_H;
      // Absolute curve pulling out to 900 or 100
      const cx = i % 2 === 0 ? 900 : 100;
      d += ` Q ${cx} ${y0 + SEG_H / 2}, 500 ${y1}`;
    }
    return d;
  };

  const PATH_D = buildPath();

  useLayoutEffect(() => {
    if (!sectionRef.current || !progressLineRef.current || !pathRef.current || !blobRef.current) return;

    let ctx: gsap.Context | null = null;

    const init = () => {
      ctx = gsap.context(() => {
        const pathLen = pathRef.current!.getTotalLength();
        if (!Number.isFinite(pathLen) || pathLen <= 0) return;

        gsap.set(progressLineRef.current, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });

        const moveBlobTo = (progress: number) => {
          if (!pathRef.current || !wrapperRef.current || !blobRef.current) return;
          const pt = pathRef.current.getPointAtLength(pathLen * Math.min(1, Math.max(0, progress)));
          const svgEl = pathRef.current.closest('svg') as SVGSVGElement;
          if (!svgEl) return;
          const svgRect = svgEl.getBoundingClientRect();
          const wrapperRect = wrapperRef.current.getBoundingClientRect();
          const scaleX = svgRect.width / 1000;
          const scaleY = svgRect.height / SVGH;
          const absX = svgRect.left - wrapperRect.left + pt.x * scaleX;
          const absY = svgRect.top - wrapperRect.top + pt.y * scaleY;
          gsap.set(blobRef.current, { x: absX - 55, y: absY - 55 });

          const currentProjIdx = Math.min(PROJECTS.length - 1, Math.max(0, Math.floor(progress * PROJECTS.length)));
          const currentProj = PROJECTS[currentProjIdx];
          
          if (leftPupilRef.current && rightPupilRef.current) {
            // Looking at the large project image box
            const lookX = currentProj.position === 'left' ? 6 : -6;
            gsap.to([leftPupilRef.current, rightPupilRef.current], { x: lookX, duration: 0.3, overwrite: "auto" });
          }
        };

        moveBlobTo(0);

        gsap.to(blobRef.current, {
          scaleY: 1.04, scaleX: 0.97, duration: 2.2,
          repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'center bottom',
        });

        gsap.to(progressLineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => moveBlobTo(self.progress),
          },
        });

        PROJECTS.forEach((proj) => {
          const card = sectionRef.current!.querySelector(`[data-project-id="${proj.id}"]`);
          const img = sectionRef.current!.querySelector(`[data-project-img="${proj.id}"]`);
          
          if (card) {
            const descWrap = card.querySelector(`.${styles.projDescWrapper}`);
            const techWrap = card.querySelector(`.${styles.projTechWrapper}`);

            gsap.fromTo(card,
              { opacity: 0, x: proj.position === 'left' ? -100 : 100, scale: 0.9 },
              {
                opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)',
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
              }
            );

            if (descWrap && techWrap) {
              gsap.to([descWrap, techWrap], {
                height: 'auto', opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 55%',
                  toggleActions: 'play none none reverse',
                }
              });
            }
          }

          if (img) {
            gsap.fromTo(img,
              { opacity: 0, x: proj.position === 'left' ? 100 : -100, scale: 0.9 },
              {
                opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)', delay: 0.1,
                scrollTrigger: { trigger: img, start: 'top 85%', toggleActions: 'play none none reverse' },
              }
            );
          }
        });

      }, sectionRef);

      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(() => { setTimeout(init, 150); });
    return () => { cancelAnimationFrame(raf); ctx?.revert(); };
  }, []);

  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    [0, 250, 800].forEach(t => setTimeout(r, t));
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="projects">

      {/* ── BACKGROUND ─────────────────────── */}
      <div className={styles.bgDots} />
      <div className={styles.bgDiagonals}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={i} x1={i * 120 - 400} y1={0} x2={i * 120 + 600} y2="100%"
              stroke="rgba(218,252,146,0.04)" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      {/* Increased Background Additions */}
      <div className={styles.bgCircle} style={{ top: '5%', right: '-80px', width: 250, height: 250, '--shape-color': '#4ECDC4' } as React.CSSProperties} />
      <div className={styles.bgTriangle} style={{ top: '12%', left: '8%', transform: 'scale(2.5)', '--shape-color': '#FF5C5C' } as React.CSSProperties} />
      <div className={styles.bgSquare} style={{ top: '22%', right: '12%', width: 100, height: 100, '--shape-color': '#3b82f6', animationDelay: '1.2s' } as React.CSSProperties} />
      <div className={styles.bgStar} style={{ top: '35%', left: '5%', transform: 'scale(2.2)', '--shape-color': '#B399FF' } as React.CSSProperties} />
      <div className={styles.bgCircle} style={{ top: '48%', right: '18%', width: 160, height: 160, '--shape-color': '#FF5C5C' } as React.CSSProperties} />
      <div className={styles.bgSquare} style={{ top: '60%', left: '10%', width: 140, height: 140, '--shape-color': '#4ECDC4', animationDelay: '0.8s' } as React.CSSProperties} />
      <div className={styles.bgStar} style={{ top: '75%', right: '8%', transform: 'scale(1.8)', '--shape-color': '#3b82f6', animationDelay: '2.5s' } as React.CSSProperties} />
      <div className={styles.bgCircle} style={{ bottom: '15%', left: '15%', width: 200, height: 200, opacity: 0.1, '--shape-color': '#F2A900' } as React.CSSProperties} />
      <div className={styles.bgTriangle} style={{ bottom: '5%', right: '10%', transform: 'scale(2)', '--shape-color': '#B399FF', animationDelay: '0.5s' } as React.CSSProperties} />
      
      {/* Even more color coordinated background geometric shapes mapped across height */}
      {[...Array(30)].map((_, i) => {
        const types = [styles.bgSquare, styles.bgCircle, styles.bgTriangle, styles.bgStar];
        const colors = ['#FF5C5C', '#3b82f6', '#4ECDC4', '#B399FF', '#F2A900'];
        const typeClass = types[i % 4];
        const sColor = colors[(i * 3) % 5];
        return (
          <div key={`shape-${i}`} className={typeClass} style={{
            top: `${1 + i * 3.2}%`,
            left: i % 2 === 0 ? `${2 + (i * 7) % 15}%` : `${75 + (i * 11) % 20}%`,
            width: `${40 + (i * 15) % 80}px`,
            height: `${40 + (i * 15) % 80}px`,
            opacity: 0.08,
            '--shape-color': sColor,
            animationDelay: `${(i % 5) * 0.5}s`,
            transform: (typeClass === styles.bgTriangle || typeClass === styles.bgStar) 
              ? `scale(${1 + (i % 3) * 0.5})` 
              : undefined,
          } as React.CSSProperties} />
        );
      })}
      
      {[...Array(25)].map((_, i) => {
         const glyphs = ['[ ]', '=>', '::', '∞', '+++', '---', '{ }', '//', '*/'];
         const randColor = ['#FF5C5C', '#3b82f6', '#4ECDC4', '#B399FF', '#F2A900'][i % 5];
         return (
          <div key={i} className={styles.bgGlyph} style={{
            top: `${2 + Math.floor(i * 3.8)}%`,
            left: `${5 + (i * 13) % 85}%`,
            fontSize: `${2 + (i % 3) * 1.5}rem`,
            color: randColor,
            opacity: i % 2 === 0 ? 0.2 : 0.15,
            animationDelay: `${i * 0.4}s`,
          }}>{glyphs[i % glyphs.length]}</div>
         );
      })}

      {/* ── HEADING ───────────────────────────────────── */}
      <div className={styles.heading}>
        <h2 className={styles.headingText}>PROJECTS</h2>
        <div className={styles.headingUnderline} />
        <p className={styles.headingSubtitle}>
          <span className={styles.monoTag}>$ ls -la ~/builds</span>
          &nbsp;&nbsp;{PROJECTS.length} items found
        </p>
      </div>

      {/* ── TIMELINE WRAPPER ──────────────────────────── */}
      <div className={styles.wrapper} ref={wrapperRef} style={{ minHeight: `${SVGH + 400}px` }}>

        <svg
          className={styles.svg}
          viewBox={`0 0 1000 ${SVGH}`}
          preserveAspectRatio="none"
          style={{ height: `${SVGH}px` }}
        >
          <defs>
            <filter id="pathGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path ref={pathRef} d={PATH_D} fill="none"
            stroke="rgba(218,252,146,0.15)" strokeWidth="10" filter="url(#pathGlow)" />
          <path ref={progressLineRef} d={PATH_D} fill="none"
            stroke="#4ECDC4" strokeWidth="8" strokeLinecap="round"
            className={styles.progressLine} />
          {PROJECTS.map((_, i) => {
            const cxValue = i % 2 === 0 ? 900 : 100;
            // X position of quadratic bezier at t=0.5: X = 0.25*startX + 0.5*controlX + 0.25*endX
            const dotX = 0.25 * 500 + 0.5 * cxValue + 0.25 * 500;
            const dotY = (i + 0.5) * SEG_H;
            return (
              <g key={i}>
                <circle cx={dotX} cy={dotY} r={18} fill="none" stroke="#4ECDC4" strokeWidth="2.5" className={styles.dotFlicker} />
                <circle cx={dotX} cy={dotY} r={7} fill="#DAFC92" stroke="#010101" strokeWidth="2" />
              </g>
            );
          })}
        </svg>

        <div ref={blobRef} className={styles.blobWalker}>
          <DevBlob leftPupilRef={leftPupilRef} rightPupilRef={rightPupilRef} />
        </div>

        <div className={styles.events} style={{ minHeight: `${SVGH + 200}px` }}>
          {PROJECTS.map((proj, i) => {
            const exactY = (i + 0.5) * SEG_H;
            return (
              <div
                key={proj.id}
                className={`${styles.eventRow} ${proj.position === 'left' ? styles.rowLeft : styles.rowRight}`}
                style={{ top: `${exactY}px` }}
              >
                {/* PROJECT CARD */}
                <div
                  className={styles.card}
                  data-project-id={proj.id}
                  style={{ borderColor: '#0E0E0E', boxShadow: `8px 8px 0 #0E0E0E` }}
                  onMouseEnter={e => {
                    gsap.to(e.currentTarget, { y: -8, boxShadow: `12px 12px 0 #0E0E0E`, duration: 0.18, ease: 'power1.out' });
                  }}
                  onMouseLeave={e => {
                    gsap.to(e.currentTarget, { y: 0, boxShadow: `8px 8px 0 #0E0E0E`, duration: 0.18, ease: 'power1.out' });
                  }}
                >
                  <div className={styles.cardHeader} style={{ background: '#0E0E0E' }}>
                    <span className={styles.cardNum} style={{ color: proj.color }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.cardDate}>{proj.date}</span>
                  </div>
                  
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle} style={{ color: proj.color }}>{proj.title}</h3>
                    
                    {proj.hackathon && (
                      <div className={styles.hackathonBadge} style={{ background: proj.color, color: '#0E0E0E' }}>
                        {proj.hackathon}
                      </div>
                    )}
                    
                    <div className={styles.projDescWrapper}>
                      <p className={styles.cardDesc}>{proj.description}</p>
                    </div>
                    
                    <div className={styles.projTechWrapper}>
                      <div className={styles.techRow}>
                        {proj.tech.map(t => (
                          <span key={t} className={styles.techPill} style={{ background: proj.color, color: '#0E0E0E' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.cardLinks}>
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                          className={styles.cardLink} style={{ borderColor: proj.color, color: proj.color }}>
                          GitHub &lt;/&gt;
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                          className={styles.cardLink} style={{ background: proj.color, color: '#0E0E0E', borderColor: proj.color }}>
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* PROJECT IMAGE (Made significantly bigger in CSS) */}
                <div data-project-img={proj.id} className={styles.imgWrapper}>
                  <ProjectImage label={proj.imagePlaceholder} color={proj.color} />
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsTimeline;
