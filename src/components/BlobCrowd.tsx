import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import type { BlobRef } from '@/hooks/useBlobCrowd';
import { useBlobCrowd } from '@/hooks/useBlobCrowd';
import { useIdleAnimations } from '@/hooks/useIdleAnimations';
import { BLOB_CONFIGS } from './blobConfigs';

import {
  renderDev,
  renderMinecraft,
  renderLego,
  renderCprog,
  renderFunnyGuy,
  renderPopCulture,
  renderHackathon,
} from './BlobRenderers1';

import {
  renderNerdBlob,
  renderSleepy,
  renderGraphicDesigner,
  renderChef,
  renderAstronaut,
  renderDetective,
  renderAngry,
  renderTinyStranger,
  renderClumsy,
} from './BlobRenderers2';

const rowClassMap = { front: 'rowFront', mid: 'rowMid', back: 'rowBack' } as const;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

interface BlobCrowdProps {
  isDark: boolean;
}

const BlobCrowd: React.FC<BlobCrowdProps> = ({ isDark }) => {
  const blobElementRefs = useRef<BlobRef[]>([]);
  const crowdRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isSleepyAwake, setIsSleepyAwake] = useState(false);

  useEffect(() => {
    if (isDark) setIsSleepyAwake(false);
  }, [isDark]);

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

  // Per-blob GSAP animations
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {

      // ZZZ floats (sleepy)
      const zzz = crowdRef.current?.querySelectorAll('[data-zzz]');
      if (zzz?.length) gsap.to(zzz, { y: -35, opacity: 0, duration: 2.5, stagger: 0.8, repeat: -1, ease: 'power1.out' });

      // Lightbulb pulse (philosopher + puzzle)
      const bulbs = crowdRef.current?.querySelectorAll('[data-bulb]');
      if (bulbs?.length) gsap.to(bulbs, { boxShadow: '0 0 20px 8px rgba(255,217,61,0.7)', duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Orbiting ? marks
      const orbiters = crowdRef.current?.querySelectorAll('[data-orbiter]');
      if (orbiters?.length) gsap.to(orbiters, { rotation: 360, duration: 8, repeat: -1, ease: 'linear' });

      // Code scroll on dev laptop screen
      const codeLines = crowdRef.current?.querySelectorAll('[data-code-line]');
      if (codeLines?.length) gsap.to(codeLines, { y: -20, opacity: 0, duration: 2, stagger: 0.5, repeat: -1, ease: 'linear' });

      // Dev laptop compile flash
      const laptopFlash = crowdRef.current?.querySelector('[data-laptop-flash]');
      if (laptopFlash) {
        gsap.to(laptopFlash, {
          background: 'rgba(218,252,146,0.25)',
          duration: 0.15, repeat: -1, repeatDelay: 4, yoyo: true, ease: 'none',
        });
      }

      // Minecraft sword arm raise — rhythmic
      const mcIdx = BLOB_CONFIGS.findIndex(c => c.id === 'minecraft');
      if (mcIdx >= 0) {
        const mb = blobElementRefs.current[mcIdx];
        const sword = crowdRef.current?.querySelector('[data-mc-sword]');
        if (sword) {
          gsap.to(sword, { rotation: -40, duration: 0.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        }
        if (mb?.rightArm) gsap.to(mb.rightArm, { rotation: -40, duration: 0.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }

      // LEGO builder arm brick-place every 4s
      const legoIdx = BLOB_CONFIGS.findIndex(c => c.id === 'lego');
      if (legoIdx >= 0) {
        const lg = blobElementRefs.current[legoIdx];
        if (lg?.leftArm) {
          const legoLoop = () => {
            gsap.to(lg.leftArm, { rotation: -50, duration: 0.6, ease: 'power2.out', onComplete: () => {
              gsap.to(lg.leftArm, { rotation: 20, duration: 0.5, ease: 'power2.in', delay: 0.5 });
            }});
            gsap.delayedCall(4, legoLoop);
          };
          gsap.delayedCall(2, legoLoop);
        }
      }

      // Funny Guy — erratic irregular bounce and mic wave
      const funnyIdx = BLOB_CONFIGS.findIndex(c => c.id === 'funnyguy');
      if (funnyIdx >= 0) {
        const fb = blobElementRefs.current[funnyIdx];
        if (fb?.container) {
          // Erratic non-uniform bounce
          const erraticBounce = () => {
            const dy = -12 - Math.random() * 10;
            const dur = 0.15 + Math.random() * 0.1;
            gsap.to(fb.container, { y: dy, duration: dur, ease: 'power2.out', onComplete: () => {
              gsap.to(fb.container, { y: 0, duration: 0.3 + Math.random() * 0.2, ease: 'bounce.out', onComplete: () => {
                gsap.delayedCall(0.3 + Math.random() * 0.8, erraticBounce);
              }});
            }});
          };
          gsap.delayedCall(1, erraticBounce);
        }
        // Mic wave arm
        const micArm = crowdRef.current?.querySelector('[data-mic-arm]');
        if (micArm) gsap.to(micArm, { rotation: -25, duration: 0.35, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }

      // Competitive programmer {} braces orbit
      const bracesEl = crowdRef.current?.querySelector('[data-cprog-braces]');
      if (bracesEl) gsap.to(bracesEl, { rotation: 360, duration: 6, repeat: -1, ease: 'linear' });

      // Pop culture — arc reactor pulsing glow
      const arcReactor = crowdRef.current?.querySelector('[data-arc-reactor]');
      if (arcReactor) gsap.to(arcReactor, { opacity: 0.65, boxShadow: '0 0 16px #4ECDC4, 0 0 32px #0077ff', duration: 0.9, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Pop culture — pokeball slow rotate
      const pokeball = crowdRef.current?.querySelector('[data-pokeball]');
      if (pokeball) gsap.to(pokeball, { rotation: 45, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Pop culture — lightsaber wave
      const lightsaber = crowdRef.current?.querySelector('[data-lightsaber]');
      if (lightsaber) gsap.to(lightsaber, { rotation: 30, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Chef pan bob + steam
      const chefPan = crowdRef.current?.querySelector('[data-chef-pan]');
      if (chefPan) gsap.to(chefPan, { y: -6, duration: 0.9, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      const steam = crowdRef.current?.querySelectorAll('[data-steam]');
      if (steam?.length) gsap.to(steam, { y: -28, opacity: 0, duration: 1.8, stagger: 0.3, repeat: -1, ease: 'power1.out' });

      // Angry — ultra-fast micro pulse (0.3× speed = RAPID TWITCH)
      const angryIdx = BLOB_CONFIGS.findIndex(c => c.id === 'angry');
      if (angryIdx >= 0) {
        const am = blobElementRefs.current[angryIdx];
        if (am?.body) gsap.to(am.body, { scale: 1.05, duration: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        // Tapping foot
        if (am?.container) gsap.to(am.container, { rotation: 2, duration: 0.2, yoyo: true, repeat: -1, ease: 'none' });
      }

      // Nerd book page flip
      const bookPage = crowdRef.current?.querySelector('[data-book-page]');
      if (bookPage) gsap.to(bookPage, { rotationY: 12, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Hackathon — exhausted droop animation on head
      const hackIdx = BLOB_CONFIGS.findIndex(c => c.id === 'hackathon');
      if (hackIdx >= 0) {
        const hb = blobElementRefs.current[hackIdx];
        if (hb?.body) gsap.to(hb.body, { rotation: 4, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }

      // Detective ? float
      const detQ = crowdRef.current?.querySelectorAll('[data-det-q]');
      if (detQ?.length) gsap.to(detQ, { y: -22, opacity: 0, duration: 3, stagger: 2, repeat: -1, ease: 'power1.out' });

      // Tiny Stranger — shy recoil from world
      const tsIdx = BLOB_CONFIGS.findIndex(c => c.id === 'tinystranger');
      if (tsIdx >= 0) {
        const ts = blobElementRefs.current[tsIdx];
        if (ts?.container) {
          // Minimal, glacial breathe/sway
          gsap.to(ts.container, { y: -3, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        }
      }

      // Clumsy guy — harmonious left/right wide sway
      const clumsyIdx = BLOB_CONFIGS.findIndex(c => c.id === 'clumsy');
      if (clumsyIdx >= 0) {
        const cls = blobElementRefs.current[clumsyIdx];
        if (cls?.body) {
          gsap.fromTo(cls.body, { x: -28, rotation: -10 }, { x: 28, rotation: 10, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        }
      }

    }, crowdRef);

    return () => ctx.revert();
  }, []);

  // Click = blob jump
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX == null || clientY == null) return;

      const refs = blobElementRefs.current;
      for (let i = 0; i < refs.length; i++) {
        const blob = refs[i];
        if (!blob.container) continue;
        const rect = blob.container.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
          gsap.to(blob.container, { y: -32, duration: 0.2, ease: 'power2.out', onComplete: () => {
            gsap.to(blob.container, { y: 0, duration: 0.6, ease: 'bounce.out' });
          }});
          if (blob.leftPupil) gsap.to(blob.leftPupil, { rotation: 360, duration: 0.5 });
          if (blob.rightPupil) gsap.to(blob.rightPupil, { rotation: 360, duration: 0.5 });
          if (blob.mouth) gsap.to(blob.mouth, { scaleX: 1.5, scaleY: 1.5, duration: 0.2, yoyo: true, repeat: 1 });
          if (BLOB_CONFIGS[i].id === 'sleepy') {
            setIsSleepyAwake(true);
          }
          break;
        }
      }
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Tiny stranger — eye-wide fear reaction on nearby cursor
  useEffect(() => {
    const tsIdx = BLOB_CONFIGS.findIndex(c => c.id === 'tinystranger');
    if (tsIdx < 0) return;
    const handleMouseMove = (e: MouseEvent) => {
      const ts = blobElementRefs.current[tsIdx];
      if (!ts?.container) return;
      const rect = ts.container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 120) {
        // Eyes go WIDE — scale up eyes via scale on body
        gsap.to(ts.container, { scale: 0.88, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(ts.container, { scale: 1, duration: 0.5, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dark/light mode
  useEffect(() => {
    if (!crowdRef.current) return;
    gsap.to(crowdRef.current, { filter: isDark ? 'brightness(0.85)' : 'brightness(1)', duration: 0.6 });
  }, [isDark]);

  return (
    <div ref={crowdRef} style={{
      position: 'fixed', bottom: 0, left: 0,
      width: '100vw', height: '100vh',
      overflow: 'visible', zIndex: 1, pointerEvents: 'none'
    }}>
      {/* Radial glow behind crowd */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 55% 70%, rgba(218,252,146,0.06) 0%, transparent 70%)'
      }} />

      {BLOB_CONFIGS.map((cfg, i) => {
        const bottomRaw = cfg.bottom;
        const bottomNum = parseInt(bottomRaw, 10);
        const isPixelBottom = bottomRaw.endsWith('px');
        const mobileBottom = isMobile && isPixelBottom
          ? `${Math.max(bottomNum * 0.45, -20)}px`
          : bottomRaw;
        const mobileScale = isMobile ? 0.5 : 1;

        const posStyle: React.CSSProperties = {
          left: cfg.x,
          bottom: mobileBottom,
          transform: `translateX(-50%) scale(${mobileScale})`,
          transformOrigin: 'center bottom',
          pointerEvents: 'auto',
        };

        const mobileW = isMobile ? Math.round(cfg.w * 1.0) : cfg.w;

        const common = {
          key: cfg.id,
          ref: setRef(i),
          color: cfg.color,
          width: mobileW,
          height: Math.round(mobileW * (cfg.h / cfg.w)),
          shape: cfg.shape,
          zIndex: cfg.z,
          style: posStyle,
          rowClass: rowClassMap[cfg.row],
          eyelidClose: cfg.eyelidClose,
          isDark,
          isSleepyAwake,
        };

        switch (cfg.id) {
          case 'dev':            return renderDev(cfg, common);
          case 'minecraft':      return renderMinecraft(cfg, common);
          case 'lego':           return renderLego(cfg, common);
          case 'cprog':          return renderCprog(cfg, common);
          case 'funnyguy':       return renderFunnyGuy(cfg, common);
          case 'popculture':     return renderPopCulture(cfg, common);
          case 'hackathon':      return renderHackathon(cfg, common);
          case 'nerd':           return renderNerdBlob(cfg, common);
          case 'chef':           return renderChef(cfg, common);
          case 'clumsy':         return renderClumsy(cfg, common);
          case 'sleepy':         return renderSleepy(cfg, common);
          case 'graphicdesigner':return renderGraphicDesigner(cfg, common);
          case 'astronaut':      return renderAstronaut(cfg, common);
          case 'angry':          return renderAngry(cfg, common);
          case 'detective':      return renderDetective(cfg, common);
          case 'tinystranger':   return renderTinyStranger(cfg, common);
          default:
            return null;
        }
      })}
    </div>
  );
};

export default React.memo(BlobCrowd);
