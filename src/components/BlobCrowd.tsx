import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import BlobCharacter from './BlobCharacter';
import type { BlobRef } from '@/hooks/useBlobCrowd';
import { useBlobCrowd } from '@/hooks/useBlobCrowd';
import { useIdleAnimations } from '@/hooks/useIdleAnimations';
import { BLOB_CONFIGS } from './blobConfigs';

const rowClassMap = { front: 'rowFront', mid: 'rowMid', back: 'rowBack' } as const;

interface BlobCrowdProps {
  isDark: boolean;
}

const BlobCrowd: React.FC<BlobCrowdProps> = ({ isDark }) => {
  const blobElementRefs = useRef<BlobRef[]>([]);
  const crowdRef = useRef<HTMLDivElement>(null);

  const setRef = (idx: number) => (ref: BlobRef | null) => {
    if (ref) blobElementRefs.current[idx] = ref;
  };

  const animConfigs = BLOB_CONFIGS.map(c => c.anim);

  const restartBreathing = useIdleAnimations(blobElementRefs, animConfigs);
  useBlobCrowd(blobElementRefs, animConfigs, restartBreathing);

  // Page load animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const containers = blobElementRefs.current.map(b => b.container).filter(Boolean);
    gsap.set(containers, { y: 120, scale: 0.3, opacity: 0 });
    gsap.to(containers, {
      y: 0, scale: 1, opacity: 1,
      duration: 0.7, stagger: 0.06, ease: 'back.out(1.7)', delay: 0.6
    });
  }, []);

  // Special per-blob animations
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Music notes (musician)
      const musicNotes = crowdRef.current?.querySelectorAll('[data-music-note]');
      if (musicNotes) gsap.to(musicNotes, { y: -40, opacity: 0, duration: 2, stagger: 0.6, repeat: -1, ease: 'power1.out' });

      // ZZZ (sleepy)
      const zzz = crowdRef.current?.querySelectorAll('[data-zzz]');
      if (zzz) gsap.to(zzz, { y: -35, opacity: 0, duration: 2.5, stagger: 0.8, repeat: -1, ease: 'power1.out' });

      // Torch flicker (explorer)
      const torch = crowdRef.current?.querySelector('[data-torch]');
      if (torch) gsap.to(torch, { opacity: 0.6, duration: 0.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Balloon bob (party)
      const balloon = crowdRef.current?.querySelector('[data-balloon]');
      if (balloon) gsap.to(balloon, { y: -8, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Lightbulb pulse (philosopher)
      const bulb = crowdRef.current?.querySelector('[data-bulb]');
      if (bulb) gsap.to(bulb, { boxShadow: '0 0 20px 8px rgba(255,217,61,0.6)', duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Question marks orbit (philosopher)
      const orbiter = crowdRef.current?.querySelector('[data-orbiter]');
      if (orbiter) gsap.to(orbiter, { rotation: 360, duration: 8, repeat: -1, ease: 'linear' });

      // Code scroll (dev)
      const codeLines = crowdRef.current?.querySelectorAll('[data-code-line]');
      if (codeLines) gsap.to(codeLines, { y: -20, opacity: 0, duration: 2, stagger: 0.5, repeat: -1, ease: 'linear' });

      // Google cap fan spin
      const capFan = crowdRef.current?.querySelector('[data-cap-fan]');
      if (capFan) gsap.to(capFan, { rotation: 360, duration: 1.5, repeat: -1, ease: 'linear' });

      // Angry leg bounce
      const angryIdx = BLOB_CONFIGS.findIndex(c => c.id === 'angry');
      if (angryIdx >= 0) {
        const angryBlob = blobElementRefs.current[angryIdx];
        if (angryBlob?.container) {
          const rightLeg = angryBlob.container.querySelector('[data-leg]:last-child');
          if (rightLeg) gsap.to(rightLeg, { rotation: 5, duration: 0.15, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        }
      }

      // Musician strum arm
      const musicianIdx = BLOB_CONFIGS.findIndex(c => c.id === 'musician');
      if (musicianIdx >= 0) {
        const mb = blobElementRefs.current[musicianIdx];
        if (mb?.rightArm) gsap.to(mb.rightArm, { rotation: -35, duration: 0.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }

      // Wildcard arm wave
      const wcIdx = BLOB_CONFIGS.findIndex(c => c.id === 'wildcard');
      if (wcIdx >= 0) {
        const wb = blobElementRefs.current[wcIdx];
        if (wb?.rightArm) gsap.to(wb.rightArm, { rotation: -45, duration: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }

      // Chef pan bob
      const chefPan = crowdRef.current?.querySelector('[data-chef-pan]');
      if (chefPan) gsap.to(chefPan, { y: -6, duration: 0.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Chef steam
      const steam = crowdRef.current?.querySelectorAll('[data-steam]');
      if (steam) gsap.to(steam, { y: -30, opacity: 0, duration: 2, stagger: 0.4, repeat: -1, ease: 'power1.out' });

      // Astronaut float
      const astroIdx = BLOB_CONFIGS.findIndex(c => c.id === 'astronaut');
      if (astroIdx >= 0) {
        const ab = blobElementRefs.current[astroIdx];
        if (ab?.body) gsap.to(ab.body, { y: -15, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }

      // Astronaut rocket orbit
      const rocket = crowdRef.current?.querySelector('[data-rocket]');
      if (rocket) gsap.to(rocket, { rotation: 360, duration: 10, repeat: -1, ease: 'linear' });

      // Astronaut flag wave
      const astroFlag = crowdRef.current?.querySelector('[data-astro-flag]');
      if (astroFlag) gsap.to(astroFlag, { skewX: 8, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Detective magnifying glass raise
      const detIdx = BLOB_CONFIGS.findIndex(c => c.id === 'detective');
      if (detIdx >= 0) {
        const db = blobElementRefs.current[detIdx];
        if (db?.rightArm) {
          const detLoop = () => {
            gsap.to(db.rightArm, {
              rotation: -60, duration: 1.5, ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(db.rightArm, {
                  rotation: -25, duration: 1.5, ease: 'power2.inOut', delay: 1
                });
              }
            });
            gsap.delayedCall(5 + Math.random() * 3, detLoop);
          };
          gsap.delayedCall(3, detLoop);
        }
      }

      // Detective question mark float
      const detQ = crowdRef.current?.querySelectorAll('[data-det-q]');
      if (detQ) gsap.to(detQ, { y: -25, opacity: 0, duration: 3, stagger: 2, repeat: -1, ease: 'power1.out' });

      // Party confetti burst
      const confetti = crowdRef.current?.querySelectorAll('[data-confetti]');
      if (confetti) {
        confetti.forEach((c, i) => {
          gsap.to(c, {
            y: -30 - Math.random() * 20,
            x: (Math.random() - 0.5) * 30,
            opacity: 0, rotation: 360,
            duration: 2 + Math.random(),
            delay: i * 0.3,
            repeat: -1,
            ease: 'power1.out'
          });
        });
      }

      // Gamer button mash animation
      const gamerIdx = BLOB_CONFIGS.findIndex(c => c.id === 'gamer');
      if (gamerIdx >= 0) {
        const gb = blobElementRefs.current[gamerIdx];
        if (gb?.leftArm) {
          gsap.to(gb.leftArm, { rotation: 28, duration: 0.15, yoyo: true, repeat: -1, ease: 'steps(1)' });
        }
      }

      // Cool blob finger snap (arm pulse)
      const coolIdx = BLOB_CONFIGS.findIndex(c => c.id === 'cool');
      if (coolIdx >= 0) {
        const cb = blobElementRefs.current[coolIdx];
        if (cb?.body) {
          gsap.to(cb.body, { rotation: 2, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        }
      }

      // Nerd book page flip
      const bookPages = crowdRef.current?.querySelector('[data-book-page]');
      if (bookPages) {
        gsap.to(bookPages, { rotationY: 15, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }

      // Injured crutch wobble
      const crutch = crowdRef.current?.querySelector('[data-crutch]');
      if (crutch) {
        gsap.to(crutch, { rotation: 3, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: 'bottom center' });
      }

    }, crowdRef);

    return () => ctx.revert();
  }, []);

  // Hover interaction: blobs jump when clicked
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const refs = blobElementRefs.current;
      for (let i = 0; i < refs.length; i++) {
        const blob = refs[i];
        if (!blob.container) continue;
        const rect = blob.container.getBoundingClientRect();
        if (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom
        ) {
          // Jump animation
          gsap.to(blob.container, {
            y: -30, duration: 0.2, ease: 'power2.out',
            onComplete: () => {
              gsap.to(blob.container, { y: 0, duration: 0.6, ease: 'bounce.out' });
            }
          });
          // Spin eyes
          if (blob.leftPupil) gsap.to(blob.leftPupil, { rotation: 360, duration: 0.5, ease: 'power2.out' });
          if (blob.rightPupil) gsap.to(blob.rightPupil, { rotation: 360, duration: 0.5, ease: 'power2.out' });
          // Happy mouth
          if (blob.mouth) {
            gsap.to(blob.mouth, { scaleX: 1.5, scaleY: 1.5, duration: 0.2, yoyo: true, repeat: 1 });
          }
          break;
        }
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Dark/light mode crowd filter
  useEffect(() => {
    if (!crowdRef.current) return;
    gsap.to(crowdRef.current, {
      filter: isDark ? 'brightness(0.85)' : 'brightness(1)',
      duration: 0.6
    });
  }, [isDark]);

  return (
    <div ref={crowdRef} style={{
      position: 'fixed', bottom: 0, left: 0,
      width: '100vw', height: '100vh',
      overflow: 'visible', zIndex: 1, pointerEvents: 'none'
    }}>
      {/* Radial glow behind crowd */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 65% 70%, rgba(218,252,146,0.06) 0%, transparent 70%)'
      }} />

      {BLOB_CONFIGS.map((cfg, i) => {
        const posStyle: React.CSSProperties = {
          left: cfg.x,
          bottom: cfg.bottom,
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
        };

        const common = {
          key: cfg.id,
          ref: setRef(i),
          color: cfg.color,
          width: cfg.w,
          height: cfg.h,
          shape: cfg.shape,
          zIndex: cfg.z,
          style: posStyle,
          rowClass: rowClassMap[cfg.row],
          eyelidClose: cfg.eyelidClose,
        };

        switch (cfg.id) {
          case 'dev':
            return (
              <BlobCharacter {...common} eyeSize={22} mouthWidth={18} mouthHeight={3} mouthRadius="2px"
                eyebrows={
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '-2px' }}>
                    <div style={{ width: 16, height: 3, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(-8deg)' }} />
                    <div style={{ width: 16, height: 3, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(8deg)' }} />
                  </div>
                }
                faceChildren={
                  // Thick nerdy glasses sitting on eyes
                  <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1, zIndex: 3 }}>
                    <div style={{ width: 28, height: 26, border: '3px solid #333', borderRadius: 6, background: 'rgba(200,230,255,0.12)' }} />
                    <div style={{ width: 6, height: 3, background: '#333', borderRadius: 2 }} />
                    <div style={{ width: 28, height: 26, border: '3px solid #333', borderRadius: 6, background: 'rgba(200,230,255,0.12)' }} />
                    {/* Temple arms */}
                    <div style={{ position: 'absolute', left: -8, top: 8, width: 10, height: 2, background: '#333' }} />
                    <div style={{ position: 'absolute', right: -8, top: 8, width: 10, height: 2, background: '#333' }} />
                  </div>
                }
                accessoryTop={
                  // Google cap with rotating propeller fan
                  <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)' }}>
                    {/* Cap brim */}
                    <div style={{ width: cfg.w * 0.65, height: 14, background: '#4285F4', borderRadius: '4px 4px 0 0', position: 'relative', boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.2)' }}>
                      <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.75, height: 8, background: '#4285F4', borderRadius: '0 0 8px 8px' }} />
                      {/* Google "G" logo */}
                      <div style={{ position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 900, color: 'white', fontFamily: 'sans-serif' }}>G</div>
                    </div>
                    {/* Propeller fan — 4 colored blades */}
                    <div data-cap-fan style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', width: 28, height: 28 }}>
                      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 8, height: 14, background: '#EA4335', borderRadius: '4px 4px 0 0' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 8, height: 14, background: '#FBBC05', borderRadius: '0 0 4px 4px' }} />
                      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 14, height: 8, background: '#4285F4', borderRadius: '4px 0 0 4px' }} />
                      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 14, height: 8, background: '#34A853', borderRadius: '0 4px 4px 0' }} />
                      {/* Center dot */}
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 6, height: 6, background: 'white', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }} />
                    </div>
                  </div>
                }
                accessoryBody={
                  // Bigger laptop/computer
                  <div style={{ position: 'absolute', bottom: '28%', left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: 56, height: 38, background: '#444', borderRadius: 5, position: 'relative', boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.4), inset 1px 2px 4px rgba(255,255,255,0.1)' }}>
                      {/* Screen bezel */}
                      <div style={{ position: 'absolute', inset: 3, background: '#1a1a2e', borderRadius: 3 }}>
                        <div data-code-line style={{ position: 'absolute', top: 4, left: 4, width: 28, height: 2, background: '#89C9C9', borderRadius: 1, opacity: 0.8 }} />
                        <div data-code-line style={{ position: 'absolute', top: 9, left: 6, width: 22, height: 2, background: '#DAFC92', borderRadius: 1, opacity: 0.6 }} />
                        <div data-code-line style={{ position: 'absolute', top: 14, left: 4, width: 30, height: 2, background: '#89C9C9', borderRadius: 1, opacity: 0.7 }} />
                        <div data-code-line style={{ position: 'absolute', top: 19, left: 8, width: 18, height: 2, background: '#FF6B9D', borderRadius: 1, opacity: 0.5 }} />
                        <div data-code-line style={{ position: 'absolute', top: 24, left: 4, width: 24, height: 2, background: '#C9B1FF', borderRadius: 1, opacity: 0.6 }} />
                      </div>
                      {/* Keyboard base */}
                      <div style={{ position: 'absolute', bottom: -6, left: -4, width: 64, height: 6, background: '#555', borderRadius: '0 0 3px 3px', boxShadow: 'inset 0 2px 2px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                }
              />
            );

          case 'gamer':
            return (
              <BlobCharacter {...common} mouthWidth={12} mouthHeight={10} mouthRadius="40%"
                accessoryTop={
                  <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.85, height: 10, background: '#333', borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    <div style={{ position: 'absolute', left: -8, top: -3, width: 18, height: 18, background: '#444', borderRadius: '50%', border: '2px solid #333' }}>
                      {/* LED glow on left ear */}
                      <div style={{ position: 'absolute', top: 3, left: 3, width: 5, height: 5, background: '#00FF88', borderRadius: '50%', boxShadow: '0 0 6px rgba(0,255,136,0.5)' }} />
                    </div>
                    <div style={{ position: 'absolute', right: -8, top: -3, width: 18, height: 18, background: '#444', borderRadius: '50%', border: '2px solid #333' }}>
                      <div style={{ position: 'absolute', top: 3, right: 3, width: 5, height: 5, background: '#00FF88', borderRadius: '50%', boxShadow: '0 0 6px rgba(0,255,136,0.5)' }} />
                    </div>
                    {/* Mic boom */}
                    <div style={{ position: 'absolute', left: -2, bottom: -14, width: 2, height: 14, background: '#555', transform: 'rotate(15deg)', transformOrigin: 'top' }}>
                      <div style={{ position: 'absolute', bottom: -3, left: -3, width: 8, height: 6, background: '#333', borderRadius: 3 }} />
                    </div>
                  </div>
                }
                accessoryBody={
                  <div style={{ position: 'absolute', bottom: '26%', left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: 38, height: 22, background: '#222', borderRadius: 6, boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(0,255,136,0.1)', position: 'relative' }}>
                      {/* D-pad */}
                      <div style={{ position: 'absolute', top: 5, left: 5, width: 10, height: 10 }}>
                        <div style={{ position: 'absolute', top: 0, left: 3, width: 4, height: 10, background: '#555', borderRadius: 1 }} />
                        <div style={{ position: 'absolute', top: 3, left: 0, width: 10, height: 4, background: '#555', borderRadius: 1 }} />
                      </div>
                      {/* Buttons */}
                      <div style={{ position: 'absolute', top: 4, right: 4, display: 'flex', gap: 2, flexWrap: 'wrap', width: 14 }}>
                        <div style={{ width: 5, height: 5, background: '#EA4335', borderRadius: '50%' }} />
                        <div style={{ width: 5, height: 5, background: '#4285F4', borderRadius: '50%' }} />
                        <div style={{ width: 5, height: 5, background: '#FBBC05', borderRadius: '50%' }} />
                        <div style={{ width: 5, height: 5, background: '#34A853', borderRadius: '50%' }} />
                      </div>
                    </div>
                  </div>
                }
              />
            );

          case 'explorer':
            return (
              <BlobCharacter {...common} eyeSize={26} mouthWidth={20} mouthHeight={16} mouthRadius="50%"
                accessoryTop={
                  <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.7, height: 16, background: '#8B6914', borderRadius: '50% 50% 0 0', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3)' }}>
                    <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.9, height: 8, background: '#A07818', borderRadius: 4 }} />
                  </div>
                }
                accessoryBody={
                  <>
                    <div style={{ position: 'absolute', top: '28%', right: -24 }}>
                      <div style={{ width: 10, height: 36, background: '#8B4513', borderRadius: 3 }}>
                        <div data-torch style={{ position: 'absolute', top: -14, left: -6, width: 22, height: 18, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,165,0,0.9) 0%, rgba(255,69,0,0.4) 60%, transparent 100%)' }} />
                      </div>
                    </div>
                    {/* Compass on belt */}
                    <div style={{ position: 'absolute', bottom: '18%', left: -12, width: 16, height: 16, border: '2px solid #8B6914', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}>
                      <div style={{ position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)', width: 2, height: 6, background: '#E74C3C', borderRadius: 1 }} />
                    </div>
                    {/* Binoculars around neck */}
                    <div style={{ position: 'absolute', top: '48%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
                      <div style={{ width: 8, height: 10, background: '#333', borderRadius: '3px 3px 50% 50%' }} />
                      <div style={{ width: 8, height: 10, background: '#333', borderRadius: '3px 3px 50% 50%' }} />
                    </div>
                  </>
                }
              />
            );

          case 'party':
            return (
              <BlobCharacter {...common} mouthWidth={26} mouthHeight={12} mouthRadius="0 0 50% 50%"
                accessoryTop={
                  <>
                    {/* Party hat — bigger, positioned lower on head */}
                    <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '36px solid #4ECDC4' }}>
                      <div style={{ position: 'absolute', top: -7, left: -5, width: 10, height: 10, background: '#DAFC92', borderRadius: '50%' }} />
                      {/* Polka dots on hat */}
                      <div style={{ position: 'absolute', top: 8, left: -4, width: 5, height: 5, background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: 16, left: 2, width: 4, height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: 12, right: -2, width: 5, height: 5, background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
                      {/* Hat brim */}
                      <div style={{ position: 'absolute', bottom: -4, left: -22, width: 44, height: 5, background: '#3AB8AF', borderRadius: 3 }} />
                    </div>
                    {/* Confetti pieces */}
                    {['#FFD93D', '#EA4335', '#4285F4', '#34A853', '#FF6B9D'].map((color, ci) => (
                      <div key={ci} data-confetti style={{
                        position: 'absolute', top: -8, left: `${20 + ci * 15}%`,
                        width: 4, height: 4, background: color, borderRadius: ci % 2 === 0 ? '50%' : 1,
                        opacity: 0.8,
                      }} />
                    ))}
                  </>
                }
                accessoryBody={
                  <>
                    {/* Balloon in right hand — bigger */}
                    <div data-balloon style={{ position: 'absolute', top: -70, right: -24 }}>
                      <div style={{ width: 28, height: 36, background: '#DAFC92', borderRadius: '50%', boxShadow: 'inset -4px -5px 10px rgba(0,0,0,0.2), inset 3px 4px 6px rgba(255,255,255,0.3)' }}>
                        {/* Balloon highlight */}
                        <div style={{ position: 'absolute', top: 6, left: 6, width: 8, height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }} />
                      </div>
                      <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.4)', margin: '0 auto' }} />
                    </div>
                    {/* Party horn / noisemaker */}
                    <div style={{ position: 'absolute', top: '45%', left: -18 }}>
                      <div style={{ width: 22, height: 6, background: '#FFD93D', borderRadius: '3px 0 0 3px', position: 'relative' }}>
                        <div style={{ position: 'absolute', right: -8, top: -2, width: 10, height: 10, background: '#FF6B9D', borderRadius: '50%' }} />
                      </div>
                    </div>
                    {/* Bow tie */}
                    <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translateX(-50%)' }}>
                      <div style={{ width: 20, height: 10, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, width: 8, height: 10, background: '#FFD93D', borderRadius: '50% 0 0 50%', clipPath: 'polygon(0 0, 100% 30%, 100% 70%, 0 100%)' }} />
                        <div style={{ position: 'absolute', right: 0, width: 8, height: 10, background: '#FFD93D', borderRadius: '0 50% 50% 0', clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)' }} />
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 5, height: 5, background: '#E8A800', borderRadius: '50%' }} />
                      </div>
                    </div>
                  </>
                }
              />
            );

          case 'angry':
            return (
              <BlobCharacter {...common} eyeSize={16} mouthWidth={14} mouthHeight={5} mouthRadius="50% 50% 0 0"
                armLength={32} hideLeftArm hideRightArm
                eyebrows={
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '-4px' }}>
                    <div style={{ width: 12, height: 3, background: 'rgba(0,0,0,0.5)', borderRadius: 2, transform: 'rotate(15deg)' }} />
                    <div style={{ width: 12, height: 3, background: 'rgba(0,0,0,0.5)', borderRadius: 2, transform: 'rotate(-15deg)' }} />
                  </div>
                }
              >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ width: 18, height: 32, background: cfg.color, borderRadius: 50, position: 'absolute', left: -14, transform: 'rotate(35deg)', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.2)' }} />
                  <div style={{ width: 18, height: 32, background: cfg.color, borderRadius: 50, position: 'absolute', right: -14, transform: 'rotate(-35deg)', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.2)' }} />
                </div>
                <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)' }}>
                  <div style={{ width: 18, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(45deg)' }} />
                  <div style={{ width: 18, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(-45deg)' }} />
                </div>
                {/* Steam puffs */}
                <div style={{ position: 'absolute', top: -8, left: '30%', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>💢</div>
              </BlobCharacter>
            );

          case 'nerd':
            return (
              <BlobCharacter {...common} mouthWidth={12} mouthHeight={5} mouthRadius="0 0 60% 40%"
                faceChildren={
                  // Better fitted glasses — positioned over the eye row area
                  <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1, zIndex: 3 }}>
                    <div style={{ width: 28, height: 28, border: '3px solid rgba(0,0,0,0.7)', borderRadius: 6, background: 'rgba(200,230,255,0.1)', position: 'relative' }}>
                      {/* Lens glare */}
                      <div style={{ position: 'absolute', top: 3, left: 3, width: 6, height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }} />
                    </div>
                    <div style={{ width: 6, height: 3, background: 'rgba(0,0,0,0.7)', borderRadius: 1 }} />
                    <div style={{ width: 28, height: 28, border: '3px solid rgba(0,0,0,0.7)', borderRadius: 6, background: 'rgba(200,230,255,0.1)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 3, left: 3, width: 6, height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }} />
                    </div>
                    {/* Temple arms */}
                    <div style={{ position: 'absolute', left: -7, top: 10, width: 9, height: 2.5, background: 'rgba(0,0,0,0.7)', borderRadius: 1 }} />
                    <div style={{ position: 'absolute', right: -7, top: 10, width: 9, height: 2.5, background: 'rgba(0,0,0,0.7)', borderRadius: 1 }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Book in left hand */}
                    <div style={{ position: 'absolute', bottom: '28%', left: -18 }}>
                      <div data-book-page style={{ width: 22, height: 28, background: '#E74C3C', borderRadius: '2px 6px 6px 2px', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3)', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 3, width: 2, height: '100%', background: 'rgba(255,255,255,0.2)' }} />
                        {/* Pages */}
                        <div style={{ position: 'absolute', right: 1, top: 2, bottom: 2, width: 3, background: '#f0e8d8', borderRadius: '0 2px 2px 0' }} />
                      </div>
                    </div>
                    {/* Pocket protector with pens */}
                    <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)', width: 14, height: 12, background: 'rgba(255,255,255,0.3)', borderRadius: '0 0 3px 3px' }}>
                      <div style={{ width: 2, height: 8, background: '#3498DB', position: 'absolute', top: 0, left: 3 }} />
                      <div style={{ width: 2, height: 7, background: '#E74C3C', position: 'absolute', top: 1, left: 7 }} />
                      <div style={{ width: 2, height: 6, background: '#2ECC71', position: 'absolute', top: 2, left: 10 }} />
                    </div>
                    {/* Calculator */}
                    <div style={{ position: 'absolute', bottom: '18%', right: -14, width: 14, height: 20, background: '#333', borderRadius: 2, padding: 2 }}>
                      <div style={{ width: '100%', height: 5, background: '#76D7C4', borderRadius: 1, marginBottom: 2 }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1 }}>
                        {[...Array(6)].map((_, bi) => (
                          <div key={bi} style={{ width: 3, height: 3, background: '#666', borderRadius: 0.5 }} />
                        ))}
                      </div>
                    </div>
                  </>
                }
              />
            );

          case 'musician':
            return (
              <BlobCharacter {...common} mouthWidth={12} mouthHeight={12} mouthRadius="50%"
                accessoryTop={
                  // Beret
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.7, height: 14, background: '#2C3E50', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3)' }}>
                    <div style={{ position: 'absolute', top: -4, left: '40%', width: 6, height: 6, background: '#2C3E50', borderRadius: '50%' }} />
                  </div>
                }
                accessoryBody={
                  <div style={{ position: 'absolute', bottom: '18%', right: -18 }}>
                    <div style={{ width: 12, height: 30, background: '#8B4513', borderRadius: 3, position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: 0, left: -7, width: 26, height: 16, background: '#A0522D', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3)' }}>
                        {/* Sound hole */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 8, height: 8, border: '1.5px solid rgba(0,0,0,0.3)', borderRadius: '50%' }} />
                      </div>
                      {/* Tuning pegs */}
                      <div style={{ position: 'absolute', top: -4, left: -2, width: 3, height: 3, background: '#C0C0C0', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: -4, right: -2, width: 3, height: 3, background: '#C0C0C0', borderRadius: '50%' }} />
                    </div>
                  </div>
                }
              >
                {['♪', '♫', '♪'].map((note, ni) => (
                  <div key={ni} data-music-note style={{
                    position: 'absolute', top: -12 - ni * 10, left: `${30 + ni * 20}%`,
                    fontSize: 16, color: 'rgba(255,255,255,0.7)', fontWeight: 'bold'
                  }}>{note}</div>
                ))}
              </BlobCharacter>
            );

          case 'sleepy':
            return (
              <BlobCharacter {...common} mouthWidth={10} mouthHeight={5} mouthRadius="50% 50% 40% 40%"
                accessoryTop={
                  // Night cap
                  <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%) rotate(15deg)', transformOrigin: 'bottom center' }}>
                    <div style={{ width: 30, height: 35, background: '#3498DB', borderRadius: '50% 50% 0 0', position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: -3, left: -4, width: 38, height: 8, background: 'white', borderRadius: 4 }} />
                      <div style={{ position: 'absolute', top: -6, right: -4, width: 10, height: 10, background: 'white', borderRadius: '50%' }} />
                    </div>
                  </div>
                }
                accessoryBody={
                  <>
                    <div style={{ position: 'absolute', bottom: '22%', left: -14 }}>
                      <div style={{ width: 28, height: 20, background: 'white', borderRadius: 5, boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1)' }} />
                    </div>
                    {/* Teddy bear */}
                    <div style={{ position: 'absolute', bottom: '16%', right: -16 }}>
                      <div style={{ width: 14, height: 14, background: '#C19A6B', borderRadius: '50%', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: -4, left: 0, width: 6, height: 6, background: '#C19A6B', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', top: -4, right: 0, width: 6, height: 6, background: '#C19A6B', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', top: 3, left: 3, width: 3, height: 3, background: '#333', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', top: 3, right: 3, width: 3, height: 3, background: '#333', borderRadius: '50%' }} />
                      </div>
                    </div>
                  </>
                }
              >
                {['Z', 'Z', 'Z'].map((z, zi) => (
                  <div key={zi} data-zzz style={{
                    position: 'absolute', top: -12 - zi * 14, right: 6 + zi * 10,
                    fontSize: 14 + zi * 4, fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.6)', fontFamily: 'serif'
                  }}>{z}</div>
                ))}
              </BlobCharacter>
            );

          case 'cool':
            return (
              <BlobCharacter {...common} mouthWidth={14} mouthHeight={6} mouthRadius="0 0 70% 30%"
                faceChildren={
                  // Better sunglasses — properly fitted
                  <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 2, zIndex: 3 }}>
                    <div style={{ width: 26, height: 16, background: 'rgba(0,0,0,0.9)', borderRadius: '30% 30% 50% 50%', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.1)' }} />
                    <div style={{ width: 4, height: 3, background: 'rgba(0,0,0,0.8)', borderRadius: 1 }} />
                    <div style={{ width: 26, height: 16, background: 'rgba(0,0,0,0.9)', borderRadius: '30% 30% 50% 50%', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.1)' }} />
                    {/* Ear hooks */}
                    <div style={{ position: 'absolute', left: -6, top: 5, width: 8, height: 2, background: 'rgba(0,0,0,0.8)' }} />
                    <div style={{ position: 'absolute', right: -6, top: 5, width: 8, height: 2, background: 'rgba(0,0,0,0.8)' }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Gold chain necklace */}
                    <div style={{ position: 'absolute', top: '54%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 3 }}>
                      {[0,1,2,3,4].map(ci => (
                        <div key={ci} style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD700', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                      ))}
                    </div>
                    {/* Star badge */}
                    <div style={{ position: 'absolute', bottom: '28%', right: -20, width: 22, height: 22, background: '#DAFC92', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
                    {/* Sneakers */}
                    <div style={{ position: 'absolute', bottom: -20, left: '15%', width: 24, height: 10, background: '#E74C3C', borderRadius: '5px 12px 3px 3px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 3, background: 'white', borderRadius: '0 0 3px 3px' }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: -20, right: '15%', width: 24, height: 10, background: '#E74C3C', borderRadius: '12px 5px 3px 3px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 3, background: 'white', borderRadius: '0 0 3px 3px' }} />
                    </div>
                  </>
                }
              />
            );

          case 'wildcard':
            return (
              <BlobCharacter {...common} mouthWidth={20} mouthHeight={10} mouthRadius="0 0 50% 50%"
                className="wildcard-clip"
                accessoryBody={
                  <>
                    {/* Much bigger flag */}
                    <div style={{ position: 'absolute', top: '-5%', right: -28 }}>
                      <div style={{ width: 5, height: 50, background: '#888' }}>
                        <div className="animate-wave-flag" style={{ position: 'absolute', top: 0, left: 5, width: 40, height: 24, background: 'linear-gradient(135deg, #FF6B9D, #FF4757)', borderRadius: 3, boxShadow: '0 2px 6px rgba(255,107,157,0.3)' }}>
                          {/* Flag design — star */}
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 12, height: 12, background: 'white', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', opacity: 0.8 }} />
                        </div>
                      </div>
                    </div>
                    {/* Question mark accessory */}
                    <div style={{ position: 'absolute', top: -14, left: '30%', fontSize: 16, fontWeight: 900, color: 'rgba(218,252,146,0.6)' }}>?</div>
                  </>
                }
              >
                <div style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, zIndex: 5 }}>
                  {[0,1,2].map(ti => (
                    <div key={ti} style={{ width: 4, height: 4, background: 'white', borderRadius: 1 }} />
                  ))}
                </div>
              </BlobCharacter>
            );

          case 'pirate':
            return (
              <BlobCharacter {...common} mouthWidth={16} mouthHeight={6} mouthRadius="0 0 70% 30%" legVariant="pegRight"
                faceChildren={
                  <div style={{ position: 'absolute', top: '18%', left: '22%', zIndex: 4 }}>
                    <div style={{ width: 16, height: 16, background: '#111', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', top: 6, left: -24, width: 70, height: 2, background: '#111', transform: 'rotate(-5deg)' }} />
                  </div>
                }
                accessoryTop={
                  // Pirate bandana
                  <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.8, height: 12, background: '#C0392B', borderRadius: 3 }}>
                    <div style={{ position: 'absolute', right: -8, top: 6, width: 12, height: 16, background: '#C0392B', borderRadius: '0 0 4px 4px', transform: 'rotate(15deg)' }} />
                    {/* Skull icon */}
                    <div style={{ position: 'absolute', top: 1, left: '50%', transform: 'translateX(-50%)', fontSize: 8 }}>☠</div>
                  </div>
                }
                accessoryBody={
                  <>
                    <div style={{ position: 'absolute', top: '28%', right: -26 }}>
                      <div style={{ width: 5, height: 42, background: '#C0C0C0', borderRadius: '2px 2px 1px 1px', boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.3)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 8, left: -5, width: 15, height: 4, background: '#8B6914', borderRadius: 2 }} />
                      </div>
                    </div>
                    {/* Parrot */}
                    <div style={{ position: 'absolute', top: -8, right: 8 }}>
                      <div style={{ width: 18, height: 20, background: '#2ECC71', borderRadius: '50% 50% 40% 40%', boxShadow: 'inset -2px -3px 5px rgba(0,0,0,0.2), inset 1px 2px 3px rgba(255,255,255,0.15)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 4, left: 4, width: 5, height: 5, background: 'white', borderRadius: '50%' }}>
                          <div style={{ width: 3, height: 3, background: '#111', borderRadius: '50%', position: 'absolute', top: 1, left: 1 }} />
                        </div>
                        <div style={{ position: 'absolute', top: 8, right: 0, width: 6, height: 4, background: '#F39C12', borderRadius: '0 50% 50% 0' }} />
                        {/* Tail feathers */}
                        <div style={{ position: 'absolute', bottom: -6, left: 2, width: 4, height: 8, background: '#E74C3C', borderRadius: 2, transform: 'rotate(-10deg)' }} />
                        <div style={{ position: 'absolute', bottom: -5, left: 6, width: 4, height: 7, background: '#3498DB', borderRadius: 2, transform: 'rotate(5deg)' }} />
                      </div>
                    </div>
                    {/* Hook hand */}
                    <div style={{ position: 'absolute', top: '42%', left: -16 }}>
                      <div style={{ width: 10, height: 14, background: '#C0C0C0', borderRadius: '0 0 50% 50%', border: '2px solid #999', borderTop: 'none' }} />
                    </div>
                  </>
                }
              />
            );

          case 'injured':
            return (
              <BlobCharacter {...common} mouthWidth={14} mouthHeight={5} mouthRadius="50% 50% 30% 30%"
                faceChildren={
                  <>
                    {/* X eye */}
                    <div style={{ position: 'absolute', top: '15%', right: '22%', zIndex: 4 }}>
                      <div style={{ width: 16, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(45deg)' }} />
                      <div style={{ width: 16, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(-45deg)' }} />
                    </div>
                    {/* Band-aid on face */}
                    <div style={{ position: 'absolute', top: '35%', right: '15%', width: 18, height: 8, background: '#F5CBA7', borderRadius: 2, zIndex: 5, transform: 'rotate(-20deg)' }}>
                      <div style={{ position: 'absolute', top: '50%', left: 3, transform: 'translateY(-50%)', width: 2, height: 2, background: 'rgba(0,0,0,0.15)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: '50%', right: 3, transform: 'translateY(-50%)', width: 2, height: 2, background: 'rgba(0,0,0,0.15)', borderRadius: '50%' }} />
                    </div>
                  </>
                }
                accessoryBody={
                  <>
                    {/* Cast on arm */}
                    <div style={{ position: 'absolute', top: '38%', left: -14, width: 26, height: 40, background: 'rgba(255,255,255,0.7)', borderRadius: 5, transform: 'rotate(15deg)' }} />
                    {/* Crutch */}
                    <div data-crutch style={{ position: 'absolute', bottom: -12, left: -22 }}>
                      <div style={{ width: 5, height: 52, background: '#8B4513', borderRadius: 3, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: -8, width: 20, height: 5, background: '#8B4513', borderRadius: 3 }} />
                        {/* Rubber tip */}
                        <div style={{ position: 'absolute', bottom: -3, left: -1, width: 7, height: 4, background: '#333', borderRadius: '0 0 3px 3px' }} />
                      </div>
                    </div>
                    {/* Ice pack on top */}
                    <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 20, height: 14, background: '#87CEEB', borderRadius: 4, opacity: 0.7 }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 8, color: 'white' }}>+</div>
                    </div>
                  </>
                }
              />
            );

          case 'philosopher':
            return (
              <BlobCharacter {...common} mouthWidth={16} mouthHeight={3} mouthRadius="2px"
                faceChildren={
                  // Round spectacles — better fitted
                  <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 3, zIndex: 3 }}>
                    <div style={{ width: 24, height: 24, border: '2.5px solid rgba(200,180,120,0.8)', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 3, left: 3, width: 5, height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: '50%' }} />
                    </div>
                    <div style={{ width: 5, height: 2, background: 'rgba(200,180,120,0.8)', borderRadius: 1 }} />
                    <div style={{ width: 24, height: 24, border: '2.5px solid rgba(200,180,120,0.8)', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 3, left: 3, width: 5, height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: '50%' }} />
                    </div>
                    {/* Ear hooks */}
                    <div style={{ position: 'absolute', left: -5, top: 9, width: 7, height: 2, background: 'rgba(200,180,120,0.7)' }} />
                    <div style={{ position: 'absolute', right: -5, top: 9, width: 7, height: 2, background: 'rgba(200,180,120,0.7)' }} />
                  </div>
                }
                accessoryTop={
                  <>
                    <div data-bulb style={{ position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)', width: 22, height: 26, background: '#FFD93D', borderRadius: '50% 50% 30% 30%', boxShadow: '0 0 12px 4px rgba(255,217,61,0.4)' }}>
                      <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 12, height: 8, background: '#999', borderRadius: '0 0 4px 4px' }}>
                        {/* Filament lines */}
                        <div style={{ position: 'absolute', top: 0, left: 3, width: 1, height: 4, background: '#666' }} />
                        <div style={{ position: 'absolute', top: 0, right: 3, width: 1, height: 4, background: '#666' }} />
                      </div>
                    </div>
                    <div data-orbiter style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', width: 90, height: 90, transformOrigin: 'center center' }}>
                      <div style={{ position: 'absolute', top: 0, left: '50%', fontSize: 16, color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>?</div>
                      <div style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>...</div>
                      <div style={{ position: 'absolute', left: 0, top: '50%', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>∞</div>
                    </div>
                  </>
                }
                accessoryBody={
                  // Scroll / ancient book
                  <div style={{ position: 'absolute', bottom: '20%', left: -16 }}>
                    <div style={{ width: 18, height: 24, background: '#F5E6C4', borderRadius: 2, position: 'relative', boxShadow: 'inset -1px -1px 3px rgba(0,0,0,0.15)' }}>
                      <div style={{ position: 'absolute', top: -2, left: -2, right: -2, height: 4, background: '#D4A574', borderRadius: 2 }} />
                      <div style={{ position: 'absolute', bottom: -2, left: -2, right: -2, height: 4, background: '#D4A574', borderRadius: 2 }} />
                    </div>
                  </div>
                }
              />
            );

          // ---- NEW BLOBS ----
          case 'chef':
            return (
              <BlobCharacter {...common} eyeSize={24} mouthWidth={18} mouthHeight={14} mouthRadius="50%"
                accessoryTop={
                  // Chef hat
                  <div style={{ position: 'absolute', top: -36, left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: 40, height: 32, background: 'white', borderRadius: '8px 8px 0 0', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.1), inset 2px 3px 5px rgba(255,255,255,0.5)' }}>
                      {/* Puff sections */}
                      <div style={{ position: 'absolute', top: 2, left: 4, width: 16, height: 14, background: 'rgba(240,240,240,1)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: 0, right: 4, width: 14, height: 12, background: 'rgba(245,245,245,1)', borderRadius: '50%' }} />
                    </div>
                    <div style={{ width: 56, height: 8, background: 'white', borderRadius: 3, marginTop: -1, boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.08)' }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Frying pan */}
                    <div data-chef-pan style={{ position: 'absolute', top: '35%', right: -28 }}>
                      <div style={{ width: 28, height: 28, background: '#555', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3)', position: 'relative' }}>
                        <div style={{ position: 'absolute', right: -14, top: '50%', transform: 'translateY(-50%)', width: 14, height: 6, background: '#8B4513', borderRadius: 3 }} />
                        {/* Egg in pan */}
                        <div style={{ position: 'absolute', top: 5, left: 5, width: 14, height: 12, background: 'white', borderRadius: '50%' }}>
                          <div style={{ position: 'absolute', top: 2, left: 3, width: 8, height: 7, background: '#FFD93D', borderRadius: '50%' }} />
                        </div>
                      </div>
                    </div>
                    {/* Apron */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.5, height: cfg.h * 0.22, background: 'rgba(255,255,255,0.6)', borderRadius: '0 0 8px 8px' }}>
                      <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 14, height: 10, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
                    </div>
                    {/* Oven mitt on left */}
                    <div style={{ position: 'absolute', top: '42%', left: -18, width: 20, height: 28, background: '#FF6B4A', borderRadius: '10px 10px 6px 6px', boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.2)' }} />
                    {/* Steam wisps */}
                    {[0, 1, 2].map(si => (
                      <div key={si} data-steam style={{
                        position: 'absolute', top: '20%', right: -20 + si * 8,
                        width: 3, height: 12, background: 'rgba(255,255,255,0.6)',
                        borderRadius: 4, transform: `rotate(${si * 10 - 10}deg)`
                      }} />
                    ))}
                  </>
                }
              />
            );

          case 'astronaut':
            return (
              <BlobCharacter {...common} eyeSize={24} eyeScale={1.15}
                mouthWidth={12} mouthHeight={6} mouthRadius="0 0 50% 50%"
                faceChildren={
                  // Helmet
                  <div style={{
                    position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)',
                    width: cfg.w * 0.75, height: cfg.w * 0.75,
                    border: '4px solid rgba(255,255,255,0.4)',
                    borderRadius: '50%',
                    background: 'rgba(100,180,255,0.15)',
                    zIndex: 0, pointerEvents: 'none'
                  }}>
                    {/* Helmet reflection */}
                    <div style={{ position: 'absolute', top: '15%', left: '15%', width: '25%', height: '15%', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', transform: 'rotate(-30deg)' }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Bigger flag */}
                    <div style={{ position: 'absolute', top: '15%', left: -28 }}>
                      <div style={{ width: 4, height: 50, background: '#888', borderRadius: 2 }}>
                        <div data-astro-flag style={{ position: 'absolute', top: 0, left: 4, width: 28, height: 18, background: '#E74C3C', borderRadius: 2 }}>
                          <div style={{ position: 'absolute', top: 5, left: 5, width: 8, height: 8, background: 'white', borderRadius: '50%' }} />
                          {/* Stripes */}
                          <div style={{ position: 'absolute', bottom: 2, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.3)' }} />
                        </div>
                      </div>
                    </div>
                    {/* Rocket orbiting */}
                    <div data-rocket style={{ position: 'absolute', top: -10, right: -5, width: 50, height: 50, transformOrigin: 'center center' }}>
                      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
                        <div style={{ width: 10, height: 18, background: '#ddd', borderRadius: '5px 5px 2px 2px', position: 'relative' }}>
                          <div style={{ position: 'absolute', bottom: 0, left: -3, width: 4, height: 6, background: '#FF4757', borderRadius: '0 0 3px 3px' }} />
                          <div style={{ position: 'absolute', bottom: 0, right: -3, width: 4, height: 6, background: '#FF4757', borderRadius: '0 0 3px 3px' }} />
                          <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 6, background: '#FFD93D', borderRadius: '0 0 3px 3px' }} />
                        </div>
                      </div>
                    </div>
                    {/* Jetpack */}
                    <div style={{ position: 'absolute', top: '40%', right: -14 }}>
                      <div style={{ width: 10, height: 20, background: '#888', borderRadius: 3, position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: -6, left: 1, width: 3, height: 6, background: '#FF6B4A', borderRadius: '0 0 2px 2px', opacity: 0.7 }} />
                        <div style={{ position: 'absolute', bottom: -6, right: 1, width: 3, height: 6, background: '#FF6B4A', borderRadius: '0 0 2px 2px', opacity: 0.7 }} />
                      </div>
                    </div>
                  </>
                }
              />
            );

          case 'detective':
            return (
              <BlobCharacter {...common} mouthWidth={14} mouthHeight={5} mouthRadius="0 0 70% 30%"
                accessoryTop={
                  // Deerstalker hat
                  <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: cfg.w * 0.6, height: 14, background: '#6B4423', borderRadius: '50% 50% 0 0', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -8, bottom: 0, width: 16, height: 10, background: '#7B5433', borderRadius: '0 0 4px 4px', transform: 'rotate(-15deg)' }} />
                      <div style={{ position: 'absolute', right: -8, bottom: 0, width: 16, height: 10, background: '#7B5433', borderRadius: '0 0 4px 4px', transform: 'rotate(15deg)' }} />
                    </div>
                  </div>
                }
                faceChildren={
                  // Monocle on right eye — better fitted
                  <div style={{ position: 'absolute', top: '16%', right: '22%', zIndex: 4 }}>
                    <div style={{ width: 26, height: 26, border: '2.5px solid rgba(200,180,100,0.85)', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}>
                      {/* Lens glare */}
                      <div style={{ position: 'absolute', top: 3, left: 4, width: 5, height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: '50%' }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: -14, left: '50%', width: 1, height: 14, background: 'rgba(200,180,100,0.6)' }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Magnifying glass */}
                    <div style={{ position: 'absolute', top: '35%', right: -26 }}>
                      <div style={{ width: 26, height: 26, border: '3px solid #8B6914', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: -12, right: -2, width: 5, height: 14, background: '#8B4513', borderRadius: 3, transform: 'rotate(30deg)' }} />
                      </div>
                    </div>
                    {/* Pipe at mouth */}
                    <div style={{ position: 'absolute', top: '52%', left: -14 }}>
                      <div style={{ width: 12, height: 4, background: '#6B4423', borderRadius: 2 }}>
                        <div style={{ position: 'absolute', left: -6, top: -8, width: 8, height: 10, background: '#5B3413', borderRadius: '3px 3px 0 0' }} />
                      </div>
                    </div>
                    {/* Trench coat collar */}
                    <div style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
                      <div style={{ width: 12, height: 8, background: '#5B3413', borderRadius: '0 0 3px 3px', transform: 'rotate(-10deg)' }} />
                      <div style={{ width: 12, height: 8, background: '#5B3413', borderRadius: '0 0 3px 3px', transform: 'rotate(10deg)' }} />
                    </div>
                  </>
                }
              >
                {/* Floating ? */}
                <div data-det-q style={{ position: 'absolute', top: -16, left: '60%', fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>?</div>
              </BlobCharacter>
            );

          default:
            return (
              <BlobCharacter {...common} />
            );
        }
      })}
    </div>
  );
};

export default React.memo(BlobCrowd);
