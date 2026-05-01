import React, { useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/gsapWithScrollTrigger';
import { getPrimaryProjectUrl } from '@/lib/projectLinks';
import styles from './ProjectsTimeline.module.css';
import { PROJECTS } from '@/data/projectsTimelineData';
import { TOP_TIMELINE_PROJECT_COUNT } from '@/data/projectsHomeConfig';

/** Background décor: fixed % positions so shapes/glyphs stay separated (no stacked clusters). */
const DECOR_SHAPE_CLASSES = [styles.bgSquare, styles.bgCircle, styles.bgTriangle, styles.bgStar] as const;
const DECOR_COLORS = ['#FF5C5C', '#3b82f6', '#4ECDC4', '#B399FF', '#F2A900'] as const;

type ScatterShape = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  typeIx: 0 | 1 | 2 | 3;
  colorIx: 0 | 1 | 2 | 3 | 4;
  /** For triangle/star only */
  scale?: number;
  opacity?: number;
};

const SCATTER_SHAPES: ScatterShape[] = [
  { top: '5%', right: '-72px', size: 230, typeIx: 1, colorIx: 2 },
  { top: '11%', left: '5%', size: 0, typeIx: 2, colorIx: 0, scale: 2.35 },
  { top: '17%', right: '11%', size: 92, typeIx: 0, colorIx: 1 },
  { top: '24%', left: '3%', size: 0, typeIx: 3, colorIx: 3, scale: 2.05 },
  { top: '34%', right: '5%', size: 78, typeIx: 0, colorIx: 4 },
  { top: '42%', left: '11%', size: 52, typeIx: 1, colorIx: 4 },
  { top: '50%', right: '26%', size: 46, typeIx: 0, colorIx: 2 },
  { top: '58%', left: '2%', size: 0, typeIx: 3, colorIx: 1, scale: 1.55 },
  { top: '66%', right: '8%', size: 102, typeIx: 0, colorIx: 2 },
  { top: '74%', left: '16%', size: 88, typeIx: 0, colorIx: 0 },
  { top: '83%', right: '3%', size: 0, typeIx: 3, colorIx: 4, scale: 1.75 },
  { bottom: '9%', left: '7%', size: 185, typeIx: 1, colorIx: 4, opacity: 0.1 },
  { bottom: '4%', right: '11%', size: 0, typeIx: 2, colorIx: 3, scale: 1.85 },
  { top: '30%', left: '26%', size: 42, typeIx: 1, colorIx: 1 },
  { top: '62%', right: '35%', size: 38, typeIx: 1, colorIx: 3 },
];

const GLYPH_CHARS = ['[ ]', '=>', '::', '∞', '+++', '---', '{ }', '//', '*/'] as const;

const SCATTER_GLYPHS: { top: string; left: string; gi: number; ci: number; fs: number; op: number }[] = [
  { top: '7%', left: '38%', gi: 0, ci: 2, fs: 2.0, op: 0.11 },
  { top: '16%', left: '72%', gi: 1, ci: 1, fs: 1.7, op: 0.12 },
  { top: '27%', left: '14%', gi: 2, ci: 0, fs: 2.3, op: 0.09 },
  { top: '39%', left: '84%', gi: 3, ci: 3, fs: 2.0, op: 0.1 },
  { top: '47%', left: '20%', gi: 4, ci: 4, fs: 1.5, op: 0.12 },
  { top: '54%', left: '58%', gi: 5, ci: 2, fs: 1.9, op: 0.1 },
  { top: '69%', left: '6%', gi: 6, ci: 1, fs: 1.65, op: 0.11 },
  { top: '78%', left: '44%', gi: 7, ci: 0, fs: 2.1, op: 0.09 },
  { top: '90%', left: '68%', gi: 8, ci: 3, fs: 1.55, op: 0.1 },
  { top: '36%', left: '48%', gi: 1, ci: 4, fs: 1.35, op: 0.08 },
  { top: '61%', left: '32%', gi: 3, ci: 2, fs: 1.75, op: 0.1 },
  { top: '94%', left: '26%', gi: 0, ci: 1, fs: 1.45, op: 0.09 },
];

function DecorShape({ s }: { s: ScatterShape }) {
  const cls = DECOR_SHAPE_CLASSES[s.typeIx];
  const color = DECOR_COLORS[s.colorIx];
  const style: React.CSSProperties = {
    '--shape-color': color,
    opacity: s.opacity ?? 0.085,
    position: 'absolute',
    pointerEvents: 'none',
  };
  if (s.top !== undefined) style.top = s.top;
  if (s.bottom !== undefined) style.bottom = s.bottom;
  if (s.left !== undefined) style.left = s.left;
  if (s.right !== undefined) style.right = s.right;
  if (s.size > 0) {
    style.width = s.size;
    style.height = s.size;
  }
  if (cls === styles.bgTriangle || cls === styles.bgStar) {
    style.transform = `scale(${s.scale ?? 1})`;
  }
  return <div className={cls} style={style} aria-hidden />;
}

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

const ProjectImage: React.FC<{
  label: string;
  color: string;
  mediaType?: 'video' | 'youtube';
  videoSrc?: string;
  videoPoster?: string;
  youtubeEmbedUrl?: string;
}> = ({ label, color, mediaType, videoSrc, videoPoster, youtubeEmbedUrl }) => {
  const mediaRootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Tracks viewport intersection — used for HTML5 video play/pause only */
  const [isVisible, setIsVisible] = React.useState(false);
  /** Once true, keep YouTube iframe mounted — avoid clearing src and reloading when scrolling away */
  const [youtubeEmbedMounted, setYoutubeEmbedMounted] = React.useState(false);
  /** After iframe load fires once, never show loader again for this embed (scroll-away safe) */
  const [youtubeIframeReady, setYoutubeIframeReady] = React.useState(false);
  const youtubeLoadHandledRef = useRef(false);

  useEffect(() => {
    const root = mediaRootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const vis = entry.isIntersecting;
        setIsVisible(vis);
        if (vis && mediaType === 'youtube' && youtubeEmbedUrl) {
          setYoutubeEmbedMounted(true);
        }
      },
      { root: null, rootMargin: '250px 0px', threshold: 0.15 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [mediaType, youtubeEmbedUrl]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVisible) {
      videoRef.current.play().catch(() => {});
      return;
    }
    videoRef.current.pause();
  }, [isVisible]);

  const onYoutubeIframeLoad = React.useCallback(() => {
    if (youtubeLoadHandledRef.current) return;
    youtubeLoadHandledRef.current = true;
    setYoutubeIframeReady(true);
  }, []);

  /** Fallback so loader never traps if iframe never emits load */
  useEffect(() => {
    if (!youtubeEmbedMounted || youtubeIframeReady) return;
    const t = window.setTimeout(() => {
      if (youtubeLoadHandledRef.current) return;
      youtubeLoadHandledRef.current = true;
      setYoutubeIframeReady(true);
    }, 26000);
    return () => clearTimeout(t);
  }, [youtubeEmbedMounted, youtubeIframeReady]);

  return (
    <div className={styles.projectImage} style={{ borderColor: color, boxShadow: `8px 8px 0 ${color}` }}>
      <div className={styles.imageBrowserBar}>
        <div className={styles.macIconsArea}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
      <div ref={mediaRootRef} className={styles.projectImageInner}>
        {mediaType === 'youtube' && youtubeEmbedUrl ? (
          <div
            className={styles.youtubeMediaSlot}
            style={{ '--youtube-accent': color } as React.CSSProperties}
          >
            {!youtubeEmbedMounted ? (
              <div className={styles.youtubeAwaitingIntersect} aria-hidden>
                <span className={styles.youtubeAwaitingBar} />
                <span className={styles.youtubeAwaitingMuted}>loads when visible</span>
              </div>
            ) : null}
            {youtubeEmbedMounted ? (
              <iframe
                src={youtubeEmbedUrl}
                title={`${label} demo`}
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={onYoutubeIframeLoad}
                className={`${styles.youtubeIframe} ${youtubeIframeReady ? styles.youtubeIframeVisible : ''}`}
              />
            ) : null}
            {youtubeEmbedMounted && !youtubeIframeReady ? (
              <div
                role="status"
                aria-busy="true"
                aria-live="polite"
                className={styles.youtubeLoaderOverlay}
              >
                <div className={styles.youtubeLoaderSpinner} aria-hidden />
                <span className={styles.youtubeLoaderLabel}>Loading demo…</span>
              </div>
            ) : null}
          </div>
        ) : mediaType === 'video' && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={videoPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <>
            <div className={styles.imageDotGrid} />
            <div className={styles.imageLabel} style={{ background: color, color: '#0E0E0E' }}>
              {label}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProjectsTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressLineRef = useRef<SVGPathElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  const SEG_H = 600; // Increased wavelength slightly
  const topProjects = useMemo(() => PROJECTS.slice(0, TOP_TIMELINE_PROJECT_COUNT), []);
  const remainderProjects = useMemo(() => PROJECTS.slice(TOP_TIMELINE_PROJECT_COUNT), []);
  const SVGH = useMemo(() => topProjects.length * SEG_H, [topProjects]);

  const buildPath = () => {
    const n = topProjects.length;
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
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches) {
      return;
    }
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

          const currentProjIdx = Math.min(topProjects.length - 1, Math.max(0, Math.floor(progress * topProjects.length)));
          const currentProj = topProjects[currentProjIdx];
          
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

        topProjects.forEach((proj) => {
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
  }, [SVGH, topProjects]);

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
          {Array.from({ length: 28 }).map((_, i) => (
            <line key={i} x1={i * 140 - 420} y1={0} x2={i * 140 + 520} y2="100%"
              stroke="rgba(218,252,146,0.04)" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      {SCATTER_SHAPES.map((s, i) => (
        <DecorShape key={`scatter-shape-${i}`} s={s} />
      ))}

      {SCATTER_GLYPHS.map((g, i) => (
        <div
          key={`scatter-glyph-${i}`}
          className={styles.bgGlyph}
          style={{
            top: g.top,
            left: g.left,
            fontSize: `${g.fs}rem`,
            color: DECOR_COLORS[g.ci % DECOR_COLORS.length],
            opacity: g.op,
          }}
          aria-hidden
        >
          {GLYPH_CHARS[g.gi % GLYPH_CHARS.length]}
        </div>
      ))}

      {/* Project headings: desktop / tablet only (>900px); bento grid moved to /projects */}
      <div className={styles.desktopBentoBlock}>
        <div className={styles.heading}>
          <h2 className={styles.headingText}>PROJECTS</h2>
          <div className={styles.headingUnderline} />
          <p className={styles.headingSubtitle}>
            <span className={styles.monoTag}>$ ls -la ~/builds</span>
            &nbsp;&nbsp;{PROJECTS.length} items found
          </p>
        </div>
      </div>

      {/* ── TIMELINE WRAPPER ──────────────────────────── */}
      <div className={styles.wrapper} ref={wrapperRef} style={{ minHeight: `${SVGH + 50}px` }}>

        <svg
          className={styles.svg}
          viewBox={`0 0 1000 ${SVGH}`}
          preserveAspectRatio="none"
          style={{ height: `${SVGH}px` }}
        >
          <path ref={pathRef} d={PATH_D} fill="none"
            stroke="rgba(218,252,146,0.15)" strokeWidth="10" />
          <path ref={progressLineRef} d={PATH_D} fill="none"
            stroke="#4ECDC4" strokeWidth="8" strokeLinecap="round"
            className={styles.progressLine} />
          {topProjects.map((_, i) => {
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

        <div className={styles.events} style={{ minHeight: `${SVGH}px` }}>
          {topProjects.map((proj, i) => {
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
                  <ProjectImage
                    label={proj.imagePlaceholder}
                    color={proj.color}
                    mediaType={proj.mediaType}
                    videoSrc={proj.videoSrc}
                    videoPoster={proj.videoPoster}
                    youtubeEmbedUrl={proj.youtubeEmbedUrl}
                  />
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.desktopMarqueeSection}>
        <div className={styles.desktopMarqueeViewport}>
          {remainderProjects.length > 0 && (
            <>
              <p className="sr-only">
                Other projects: {remainderProjects.map((p) => p.title).join(', ')}.
              </p>
              <div className={styles.desktopMarqueeOuter}>
                <div className={styles.desktopMarqueeTrack}>
                  {[...remainderProjects, ...remainderProjects].map((proj, i) => {
                    const href = getPrimaryProjectUrl(proj);
                    const label =
                      href == null
                        ? undefined
                        : proj.liveUrl
                          ? `Open live site: ${proj.title}`
                          : `Open GitHub: ${proj.title}`;
                    const inner = (
                      <>
                        <div
                          className={styles.desktopMarqueeCardMedia}
                          style={{ borderColor: '#0e0e0e' }}
                        >
                          {proj.bentoImage ? (
                            <img
                              src={proj.bentoImage}
                              alt=""
                              className={styles.desktopMarqueeCardImg}
                              loading="lazy"
                            />
                          ) : (
                            <div className={styles.desktopMarqueeCardPlaceholder}>
                              {proj.imagePlaceholder}
                            </div>
                          )}
                        </div>
                        <div className={styles.desktopMarqueeCardBody}>
                          <h3 className={styles.desktopMarqueeCardTitle} style={{ color: proj.color }}>
                            {proj.title}
                          </h3>
                          <p className={styles.desktopMarqueeCardMeta}>{proj.date}</p>
                          <div className={styles.desktopMarqueeTech}>
                            {proj.tech.slice(0, 3).map((t, ti) => (
                              <span
                                key={`${proj.id}-${i}-${ti}`}
                                className={styles.desktopMarqueeTechPill}
                                style={{ background: proj.color, color: '#0e0e0e' }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                    return href ? (
                      <a
                        key={`${proj.id}-${i}`}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.desktopMarqueeCard} ${styles.desktopMarqueeCardClickable}`}
                        style={{ borderColor: proj.color, boxShadow: `4px 4px 0 ${proj.color}` }}
                        aria-label={label}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div
                        key={`${proj.id}-${i}`}
                        className={styles.desktopMarqueeCard}
                        style={{ borderColor: proj.color, boxShadow: `4px 4px 0 ${proj.color}` }}
                      >
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <div className={styles.desktopViewAllWrap}>
            <Link to="/projects" className={styles.viewAllProjectsBtn}>
              VIEW ALL PROJECTS
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.mobileViewAllWrap}>
        <Link to="/projects" className={styles.viewAllProjectsBtn}>
          VIEW ALL PROJECTS
        </Link>
      </div>
    </section>
  );
};

export default ProjectsTimeline;
