import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOB_CONFIGS } from './blobConfigs';
import { renderAboutDev } from './BlobRenderers1';
import type { BlobRef } from '@/hooks/useBlobCrowd';
import styles from './AchievementsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── Education Data ──────────────────────────────────────────────────
const EDUCATION = [
  {
    school: "SVKM's Dwarkadas J. Sanghvi College of Engineering",
    degree: 'B.Tech in Information Technology',
    years: '2024 – 2028',
    score: 'CGPA: 8.95/10',
    accentColor: '#B399FF',
  },
  {
    school: 'Nirmala Memorial Foundation College of Commerce & Science',
    degree: 'Higher Secondary Certificate (HSC)',
    years: '2022 – 2024',
    score: '80.67%',
    accentColor: '#FF5C5C',
  },
  {
    school: 'Rustomjee Cambridge International School',
    degree: 'IGCSE',
    years: '2012 – 2022',
    score: '95.2%',
    accentColor: '#4ECDC4',
  },
];

// ── Achievements Data ───────────────────────────────────────────────
const ACHIEVEMENTS = [
  {
    category: 'DSA',
    icon: '💻',
    badgeColor: '#DAFC92',
    items: [
      { text: 'Solved **280+** DSA problems across LeetCode, CodeChef, and Codeforces.' },
    ],
  },
  {
    category: 'Hackathons',
    icon: '🏆',
    badgeColor: '#B399FF',
    items: [
      { text: '**Prize Winner** — Rift Rewind Hackathon (AWS × Riot Games)' },
      { text: '**3rd Place** — Code Relay' },
      { text: '**Second Runner-Up** — CSI SPIT Frontend Hackathon' },
      { text: 'Participant — HackOps by DJS NSDC, MumbaiHacks 2025, HackFusion 2026, VEGA Hackathon' },
    ],
  },
  {
    category: 'Competitions',
    icon: '🎯',
    badgeColor: '#FF5C5C',
    items: [
      { text: 'Ranked **7th** — SPIT CodeHunt 2024' },
      { text: 'Ranked **9th** — CodeBusters 2025' },
      { text: 'Top **3** teams — CP++ (SPIT)' },
    ],
  },
];

// Bold text renderer
function renderBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} className={styles.achieveHighlight}>{part.slice(2, -2)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

// ── Starburst polygon generator ─────────────────────────────────────
function burstPoints(n: number, outerR: number, innerR: number): string {
  return Array.from({ length: n * 2 })
    .map((_, i) => {
      const angle = (i * Math.PI) / n - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
    })
    .join(' ');
}

const AchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const pedestalRef = useRef<HTMLDivElement>(null);
  const blobContainerRef = useRef<HTMLDivElement>(null);
  const devBlobRef = useRef<BlobRef | null>(null);

  // ── Entrance animations ─────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          if (titleRef.current) {
            gsap.from(titleRef.current, { y: -50, opacity: 0, duration: 0.7, ease: 'back.out(1.4)' });
          }
          if (pedestalRef.current) {
            gsap.from(pedestalRef.current, { y: 80, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 });
          }
          if (blobContainerRef.current) {
            gsap.from(blobContainerRef.current, { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.8)', delay: 0.4 });
          }
          if (leftCardRef.current) {
            gsap.from(leftCardRef.current, { x: -120, duration: 0.8, ease: 'power3.out', delay: 0.2 });
          }
          if (rightCardRef.current) {
            gsap.from(rightCardRef.current, { x: 120, duration: 0.8, ease: 'power3.out', delay: 0.3 });
          }
          const eduItems = sectionRef.current?.querySelectorAll('[data-edu-item]');
          if (eduItems?.length) {
            gsap.from(eduItems, { y: 30, stagger: 0.12, duration: 0.5, ease: 'power2.out', delay: 0.5 });
          }
          const achieveItems = sectionRef.current?.querySelectorAll('[data-achieve-item]');
          if (achieveItems?.length) {
            gsap.from(achieveItems, { y: 30, stagger: 0.12, duration: 0.5, ease: 'power2.out', delay: 0.6 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Blob breathing animation ────────────────────────────────────
  useEffect(() => {
    if (!blobContainerRef.current) return;
    const tween = gsap.to(blobContainerRef.current, {
      scaleY: 1.06,
      scaleX: 0.96,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center bottom',
    });
    return () => { tween.kill(); };
  }, []);

  // ── Dev blob config ─────────────────────────────────────────────
  const devCfg = BLOB_CONFIGS.find(b => b.id === 'dev');
  const devCommon = devCfg
    ? {
        id: 'dev',
        ref: devBlobRef,
        color: devCfg.color,
        width: 130,
        height: Math.round(130 * (devCfg.h / devCfg.w)),
        shape: devCfg.shape,
        zIndex: 9999,
        style: { position: 'relative', width: '100%', height: '100%', pointerEvents: 'none', opacity: 1 } as React.CSSProperties,
        rowClass: 'rowFront',
        eyelidClose: 0,
        isDark: false,
      }
    : null;

  return (
    <section ref={sectionRef} className={styles.section} id="achievements">

      {/* ── Background ─────────────────────────────────── */}
      <div className={styles.bgDots} />
      <div className={styles.bgDiagonals}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={i * 100 - 300} y1={0} x2={i * 100 + 500} y2="100%"
              stroke="rgba(14,14,14,0.10)" strokeWidth="1.5" />
          ))}
        </svg>
      </div>

      {/* ── Bush / Hedge — organic SVG wavy top, extends to bottom ── */}
      <div className={styles.bushStrip}>
        <svg
          className={styles.bushWaveSvg}
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back bush layer */}
          <path
            d="M-20,800 L-20,180
               Q 30,100 80,180
               Q 140,50 200,160
               Q 270,10 330,160
               Q 400,60 460,180
               Q 530,20 600,150
               Q 660,-10 740,160
               Q 810,30 870,170
               Q 940,0 1000,150
               Q 1060,-20 1140,170
               Q 1210,40 1280,180
               Q 1350,10 1460,190
               L1460,800 Z"
            fill="#c8f070"
            stroke="#16A34A"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Front bush layer */}
          <path
            d="M-20,800 L-20,220
               Q 40,150 100,220
               Q 160,90 240,210
               Q 320,60 380,200
               Q 450,110 520,220
               Q 590,50 670,200
               Q 750,-20 830,210
               Q 900,80 970,220
               Q 1040,10 1110,210
               Q 1190,-30 1250,200
               Q 1320,80 1380,230
               Q 1430,70 1480,240
               L1480,800 Z"
            fill="#DAFC92"
            stroke="#15803d"
            strokeWidth="8"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Floating decorative elements */}
      <svg className={`${styles.floatingStarburst} ${styles.spinAnim}`}
        width="90" height="90" viewBox="0 0 100 100"
        style={{ top: '50%', left: '32%' }}>
        <polygon points={burstPoints(12, 50, 30)} fill="#FF5C5C" stroke="#0E0E0E" strokeWidth="3" />
      </svg>

      <svg className={`${styles.floatingStarburst} ${styles.spinAnim}`}
        width="60" height="60" viewBox="0 0 100 100"
        style={{ bottom: '62%', left: '64%' }}>
        <polygon points={burstPoints(8, 50, 35)} fill="#1B3970" stroke="#0E0E0E" strokeWidth="3" />
      </svg>

      <svg className={`${styles.floatingStarburst} ${styles.spinReverseAnim}`}
        width="80" height="80" viewBox="0 0 100 100"
        style={{ top: '60%', right: '2%' }}>
        <polygon points={burstPoints(14, 50, 25)} fill="#4ECDC4" stroke="#0E0E0E" strokeWidth="3" />
      </svg>

      <div className={styles.floatingSquare} style={{
        top: '20%', right: '5%', width: 40, height: 40,
        background: '#FF5C5C', border: '3px solid #0E0E0E',
        boxShadow: '4px 4px 0 #0E0E0E',
      }} />

      <div className={styles.floatingSquare} style={{
        bottom: '33%', left: '4%', width: 30, height: 30,
        background: '#FFBE0B', border: '3px solid #0E0E0E',
        boxShadow: '3px 3px 0 #0E0E0E',
      }} />

      <div className={styles.floatingCross} style={{ top: '12%', left: '3%' }}>
        <div style={{ position: 'absolute', width: 30, height: 8, background: '#0E0E0E', top: 11, left: 0 }} />
        <div style={{ position: 'absolute', width: 8, height: 30, background: '#0E0E0E', top: 0, left: 11 }} />
      </div>

      {/* ── Extra Graffiti / Abstract Shapes */}
      <div className={styles.floatingSquare} style={{
        bottom: '15%', left: '10%', width: 80, height: 20,
        background: '#4ECDC4', border: '3px solid #0E0E0E',
        boxShadow: '4px 4px 0 #0E0E0E', transform: 'rotate(-20deg)',
      }} />

      <div className={styles.floatingSquare} style={{
        top: '25%', left: '45%', width: 50, height: 50,
        borderRadius: '50%', background: '#DAFC92', border: '3px solid #0E0E0E',
        boxShadow: '3px 3px 0 #0E0E0E',
      }} />

      <div className={styles.floatingSquare} style={{
        bottom: '30%', right: '8%', width: 60, height: 25,
        background: '#FF5C5C', border: '3px solid #0E0E0E',
        boxShadow: '4px 4px 0 #0E0E0E', transform: 'rotate(15deg)',
      }} />

      <svg className={styles.floatingStarburst}
        width="60" height="60" viewBox="0 0 100 100"
        style={{ top: '10%', right: '35%' }}>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#0E0E0E" strokeWidth="8" strokeDasharray="10 10" />
      </svg>

      {/* ── Title — 2 lines ────────────────────────────── */}
      <div ref={titleRef} className={styles.titleBox}>
        <h2 className={styles.titleLine1}>ACHIEVEMENTS &amp;</h2>
        <h2 className={styles.titleLine2}>EDUCATION</h2>
        <div className={styles.titleUnderline} />
      </div>

      {/* ── Main Content ───────────────────────────────── */}
      <div className={styles.content}>

        {/* ── LEFT CARD: Education ─────────────────────── */}
        <div ref={leftCardRef} className={styles.cardLeft}>
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderIcon}>🎓</span>
            <span className={styles.cardHeaderTitle}>EDUCATION</span>
          </div>
          <div className={styles.cardBody}>
            {EDUCATION.map((edu, i) => (
              <div key={i} data-edu-item className={styles.eduItem} style={{ borderLeftColor: edu.accentColor, borderLeftWidth: 5 }}>
                <div className={styles.eduRow}>
                  <span className={styles.eduSchool}>{edu.school}</span>
                  <span className={styles.eduYear}>{edu.years}</span>
                </div>
                <span className={styles.eduDegree}>{edu.degree}</span>
                <span className={styles.eduScore} style={{ background: edu.accentColor }}>{edu.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER: Blob on Pedestal ─────────────────── */}
        <div className={styles.pedestalWrapper}>
          <div ref={blobContainerRef} className={`${styles.blobWrapper} ${styles.floatAnim}`}>
            {devCfg && devCommon ? (
              <React.Fragment key="dev-achievements">
                {renderAboutDev(devCfg, devCommon)}
              </React.Fragment>
            ) : null}

            {/* Trophy icon */}
            <svg className={styles.trophy} width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 8H20L15.5 12L17.5 18L12 14L6.5 18L8.5 12L4 8H9.5L12 2Z"
                fill="#FFBE0B" stroke="#0E0E0E" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          {/* ── 3D Pedestal (Book stack) ─────────────────── */}
          <div ref={pedestalRef} className={styles.pedestal}>
            {/* Top plate */}
            <div className={styles.pedestalTop}>
              <span className={styles.pedestalTopLabel}>★ #1 ★</span>
            </div>

            {/* Tier 1: Red "MVP" book with 3D sides */}
            <div style={{ position: 'relative' }}>
              <div className={styles.pedestalFront}>
                <span className={styles.pedestalFrontLabel}>DEVELOPER</span>
              </div>
              <div className={styles.pedestalRight} />
              <div className={styles.pedestalTopFace} />
            </div>

            {/* Base divider */}
            <div className={styles.pedestalBase} />

            {/* Tier 2: Amber Gold "CHAMPION" book with 3D side */}
            <div style={{ position: 'relative' }}>
              <div className={styles.pedestalTier2}>
                <span className={styles.pedestalTier2Label}>DESIGNER</span>
              </div>
              <div className={styles.pedestalTier2Right} />
            </div>

            {/* Mid base divider */}
            <div className={styles.pedestalMidBase} />

            {/* Tier 3: Navy "CREATOR" book with 3D side */}
            <div style={{ position: 'relative' }}>
              <div className={styles.pedestalTier3}>
                <span className={styles.pedestalTier3Label}>CREATOR</span>
              </div>
              <div className={styles.pedestalTier3Right} />
            </div>

            {/* Bottom base */}
            <div className={styles.pedestalBottomBase} />
          </div>
        </div>

        {/* ── RIGHT CARD: Achievements ────────────────── */}
        <div ref={rightCardRef} className={styles.cardRight}>
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderIcon}>⚡</span>
            <span className={styles.cardHeaderTitle}>ACHIEVEMENTS</span>
          </div>
          <div className={styles.cardBody}>
            {ACHIEVEMENTS.map((group, gi) => (
              <div key={gi} data-achieve-item className={styles.achieveItem}>
                <div className={styles.achieveCategory}>
                  <span>{group.icon}</span>
                  <span>{group.category}</span>
                  <span className={styles.achieveBadge} style={{ background: group.badgeColor }}>{group.category}</span>
                </div>
                {group.items.map((item, ii) => (
                  <div key={ii} className={styles.achieveText}>
                    • {renderBold(item.text)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AchievementsSection;
