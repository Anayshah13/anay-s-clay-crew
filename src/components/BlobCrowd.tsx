import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import BlobCharacter from './BlobCharacter';
import type { BlobRef } from '@/hooks/useBlobCrowd';
import { useBlobCrowd } from '@/hooks/useBlobCrowd';
import { useIdleAnimations } from '@/hooks/useIdleAnimations';
import { BLOB_CONFIGS } from './blobConfigs';

const BlobCrowd: React.FC = () => {
  const blobElementRefs = useRef<BlobRef[]>([]);
  const crowdRef = useRef<HTMLDivElement>(null);

  // Set up refs array
  const setRef = (idx: number) => (ref: BlobRef | null) => {
    if (ref) blobElementRefs.current[idx] = ref;
  };

  const idleConfigs = useMemo(() => BLOB_CONFIGS.map((_, i) => ({
    breathDuration: 2 + Math.random() * 0.8,
    armRange: [-15, 15] as [number, number],
    headWobble: 2 + Math.random() * 2,
    skipLeftArm: i === 7, // angry has crossed arms
    skipRightArm: i === 7,
  })), []);

  useBlobCrowd(blobElementRefs);
  useIdleAnimations(blobElementRefs, idleConfigs);

  // Page load animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const containers = blobElementRefs.current.map(b => b.container).filter(Boolean);
    gsap.set(containers, { y: 120, scale: 0.3, opacity: 0 });
    gsap.to(containers, {
      y: 0, scale: 1, opacity: 1,
      duration: 0.7,
      stagger: 0.06,
      ease: 'back.out(1.7)',
      delay: 0.6
    });
  }, []);

  // Special animations per blob
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Music notes for musician (blob 5)
      const musicNotes = crowdRef.current?.querySelectorAll('[data-music-note]');
      if (musicNotes) {
        gsap.to(musicNotes, {
          y: -40, opacity: 0,
          duration: 2,
          stagger: 0.6,
          repeat: -1,
          ease: 'power1.out'
        });
      }

      // Z's for sleepy (blob 6)
      const zzz = crowdRef.current?.querySelectorAll('[data-zzz]');
      if (zzz) {
        gsap.to(zzz, {
          y: -35, opacity: 0,
          duration: 2.5,
          stagger: 0.8,
          repeat: -1,
          ease: 'power1.out'
        });
      }

      // Torch flicker (blob 2)
      const torch = crowdRef.current?.querySelector('[data-torch]');
      if (torch) {
        gsap.to(torch, {
          opacity: 0.6,
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }

      // Balloon bob (blob 3)
      const balloon = crowdRef.current?.querySelector('[data-balloon]');
      if (balloon) {
        gsap.to(balloon, {
          y: -8,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }

      // Lightbulb pulse (blob 12)
      const bulb = crowdRef.current?.querySelector('[data-bulb]');
      if (bulb) {
        gsap.to(bulb, {
          boxShadow: '0 0 20px 8px rgba(255,217,61,0.6)',
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }

      // Question marks orbit (blob 12)
      const orbiter = crowdRef.current?.querySelector('[data-orbiter]');
      if (orbiter) {
        gsap.to(orbiter, {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: 'linear'
        });
      }

      // Laptop screen code scroll (blob 0)
      const codeLines = crowdRef.current?.querySelectorAll('[data-code-line]');
      if (codeLines) {
        gsap.to(codeLines, {
          y: -20, opacity: 0,
          duration: 2,
          stagger: 0.5,
          repeat: -1,
          ease: 'linear'
        });
      }

      // Angry leg bounce (blob 7)
      const angryBlob = blobElementRefs.current[7];
      if (angryBlob?.container) {
        const rightLeg = angryBlob.container.querySelector('[data-leg]:last-child');
        if (rightLeg) {
          gsap.to(rightLeg, {
            rotation: 5, duration: 0.15, yoyo: true, repeat: -1, ease: 'sine.inOut'
          });
        }
      }

      // Guitar strum (blob 5)
      const musicianBlob = blobElementRefs.current[5];
      if (musicianBlob?.rightArm) {
        gsap.to(musicianBlob.rightArm, {
          rotation: -35, duration: 0.2, yoyo: true, repeat: -1, ease: 'sine.inOut'
        });
      }

      // Wildcard arm wave (blob 9)
      const wildcardBlob = blobElementRefs.current[9];
      if (wildcardBlob?.rightArm) {
        gsap.to(wildcardBlob.rightArm, {
          rotation: -45, duration: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut'
        });
      }
    }, crowdRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={crowdRef} className="relative w-full h-full" style={{ minHeight: '500px' }}>
      {/* Radial glow behind crowd */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 70% 60%, rgba(218,252,146,0.06) 0%, transparent 70%)'
      }} />

      {BLOB_CONFIGS.map((cfg, i) => {
        const posStyle: React.CSSProperties = {
          left: cfg.x,
          bottom: cfg.y,
          transform: 'translateX(-50%)',
        };

        // Per-blob accessories and personality
        switch (i) {
          case 0: // DEV
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} eyeSize={20} mouthWidth={16} mouthHeight={3}
                mouthRadius="2px" style={posStyle}
                eyebrows={
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '-2px' }}>
                    <div style={{ width: 14, height: 3, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(-8deg)' }} />
                    <div style={{ width: 14, height: 3, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(8deg)' }} />
                  </div>
                }
                accessoryBody={
                  <div style={{ position: 'absolute', bottom: '35%', left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: 32, height: 22, background: '#555', borderRadius: 3, position: 'relative', boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.3), inset 1px 2px 4px rgba(255,255,255,0.1)' }}>
                      <div data-code-line style={{ position: 'absolute', top: 3, left: 3, width: 18, height: 2, background: '#89C9C9', borderRadius: 1, opacity: 0.8 }} />
                      <div data-code-line style={{ position: 'absolute', top: 7, left: 5, width: 14, height: 2, background: '#DAFC92', borderRadius: 1, opacity: 0.6 }} />
                      <div data-code-line style={{ position: 'absolute', top: 11, left: 3, width: 20, height: 2, background: '#89C9C9', borderRadius: 1, opacity: 0.7 }} />
                    </div>
                  </div>
                }
              />
            );

          case 1: // GAMER
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} eyelidClose={0.25} mouthWidth={10} mouthHeight={8}
                mouthRadius="40%" style={posStyle}
                accessoryTop={
                  <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.9, height: 8, background: '#333', borderRadius: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    <div style={{ position: 'absolute', left: -6, top: -2, width: 14, height: 14, background: '#444', borderRadius: '50%', border: '2px solid #333' }} />
                    <div style={{ position: 'absolute', right: -6, top: -2, width: 14, height: 14, background: '#444', borderRadius: '50%', border: '2px solid #333' }} />
                  </div>
                }
                accessoryBody={
                  <div style={{ position: 'absolute', bottom: '28%', left: '50%', transform: 'translateX(-50%)' }}>
                    <div style={{ width: 28, height: 16, background: '#333', borderRadius: 4, boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3)' }}>
                      <div style={{ position: 'absolute', top: 3, left: 4, width: 5, height: 5, background: '#666', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: 3, right: 4, width: 5, height: 5, background: '#666', borderRadius: '50%' }} />
                    </div>
                  </div>
                }
              >
                {/* Tongue */}
                <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translateX(-50%)', width: 6, height: 4, background: '#FF6B9D', borderRadius: '0 0 50% 50%', zIndex: 5 }} />
              </BlobCharacter>
            );

          case 2: // EXPLORER
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} eyeSize={22} mouthWidth={16} mouthHeight={14}
                mouthRadius="50%" style={posStyle}
                accessoryTop={
                  <>
                    {/* Explorer hat */}
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.7, height: 12, background: '#8B6914', borderRadius: '50% 50% 0 0', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3)' }}>
                      <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.9, height: 6, background: '#A07818', borderRadius: 3 }} />
                    </div>
                  </>
                }
                accessoryBody={
                  <div style={{ position: 'absolute', top: '30%', right: -20 }}>
                    <div style={{ width: 8, height: 30, background: '#8B4513', borderRadius: 2 }}>
                      <div data-torch style={{ position: 'absolute', top: -10, left: -4, width: 16, height: 14, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,165,0,0.9) 0%, rgba(255,69,0,0.4) 60%, transparent 100%)' }} />
                    </div>
                  </div>
                }
              />
            );

          case 3: // PARTY
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={22} mouthHeight={10}
                mouthRadius="0 0 50% 50%" style={posStyle}
                accessoryTop={
                  <>
                    {/* Party hat */}
                    <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderBottom: `22px solid #4ECDC4` }}>
                      <div style={{ position: 'absolute', top: -4, left: -2, width: 4, height: 4, background: '#DAFC92', borderRadius: '50%' }} />
                    </div>
                    {/* Balloon */}
                    <div data-balloon style={{ position: 'absolute', top: -50, right: -15 }}>
                      <div style={{ width: 18, height: 22, background: '#DAFC92', borderRadius: '50%', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.2), inset 2px 3px 5px rgba(255,255,255,0.3)' }} />
                      <div style={{ width: 1, height: 25, background: 'rgba(255,255,255,0.4)', margin: '0 auto' }} />
                    </div>
                  </>
                }
              />
            );

          case 4: // NERD
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={10} mouthHeight={4}
                mouthRadius="0 0 60% 40%" style={posStyle}
                faceChildren={
                  <div style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 2, zIndex: 3 }}>
                    <div style={{ width: 22, height: 22, border: '2.5px solid rgba(0,0,0,0.6)', borderRadius: 4, background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ width: 4, height: 2.5, background: 'rgba(0,0,0,0.6)' }} />
                    <div style={{ width: 22, height: 22, border: '2.5px solid rgba(0,0,0,0.6)', borderRadius: 4, background: 'rgba(255,255,255,0.08)' }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Book */}
                    <div style={{ position: 'absolute', bottom: '30%', left: -12 }}>
                      <div style={{ width: 16, height: 20, background: '#E74C3C', borderRadius: '2px 4px 4px 2px', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3)' }}>
                        <div style={{ position: 'absolute', left: 2, width: 1, height: '100%', background: 'rgba(255,255,255,0.2)' }} />
                      </div>
                    </div>
                    {/* Pocket protector */}
                    <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translateX(-50%)', width: 10, height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: '0 0 2px 2px' }}>
                      <div style={{ width: 2, height: 5, background: '#3498DB', position: 'absolute', top: 1, left: 2 }} />
                      <div style={{ width: 2, height: 4, background: '#E74C3C', position: 'absolute', top: 2, left: 5 }} />
                    </div>
                  </>
                }
              />
            );

          case 5: // MUSICIAN
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={10} mouthHeight={10}
                mouthRadius="50%" style={posStyle}
                accessoryBody={
                  <div style={{ position: 'absolute', bottom: '20%', right: -14 }}>
                    <div style={{ width: 10, height: 24, background: '#8B4513', borderRadius: 2, position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: 0, left: -5, width: 20, height: 12, background: '#A0522D', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3)' }} />
                    </div>
                  </div>
                }
              >
                {/* Music notes */}
                {['♪', '♫', '♪'].map((note, ni) => (
                  <div key={ni} data-music-note style={{
                    position: 'absolute', top: -10 - ni * 8, left: `${30 + ni * 20}%`,
                    fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 'bold'
                  }}>{note}</div>
                ))}
              </BlobCharacter>
            );

          case 6: // SLEEPY
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} eyelidClose={0.55} mouthWidth={8} mouthHeight={4}
                mouthRadius="50% 50% 40% 40%" style={posStyle}
                accessoryBody={
                  <div style={{ position: 'absolute', bottom: '25%', left: -10 }}>
                    <div style={{ width: 22, height: 16, background: 'white', borderRadius: 4, boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.1)' }} />
                  </div>
                }
              >
                {/* ZZZ */}
                {['Z', 'Z', 'Z'].map((z, zi) => (
                  <div key={zi} data-zzz style={{
                    position: 'absolute', top: -10 - zi * 12, right: 5 + zi * 8,
                    fontSize: 12 + zi * 3, fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.6)', fontFamily: 'serif'
                  }}>{z}</div>
                ))}
              </BlobCharacter>
            );

          case 7: // TINY ANGRY
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} eyeSize={14} mouthWidth={12} mouthHeight={4}
                mouthRadius="50% 50% 0 0" armLength={28} style={posStyle}
                hideLeftArm hideRightArm
                eyebrows={
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '-4px' }}>
                    <div style={{ width: 10, height: 3, background: 'rgba(0,0,0,0.5)', borderRadius: 2, transform: 'rotate(15deg)' }} />
                    <div style={{ width: 10, height: 3, background: 'rgba(0,0,0,0.5)', borderRadius: 2, transform: 'rotate(-15deg)' }} />
                  </div>
                }
              >
                {/* Crossed arms */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ width: 16, height: 28, background: cfg.color, borderRadius: 50, position: 'absolute', left: -12, transform: 'rotate(35deg)', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.2)' }} />
                  <div style={{ width: 16, height: 28, background: cfg.color, borderRadius: 50, position: 'absolute', right: -12, transform: 'rotate(-35deg)', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.2)' }} />
                </div>
                {/* Bandage */}
                <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)' }}>
                  <div style={{ width: 16, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(45deg)' }} />
                  <div style={{ width: 16, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(-45deg)' }} />
                </div>
              </BlobCharacter>
            );

          case 8: // COOL
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={12} mouthHeight={5}
                mouthRadius="0 0 70% 30%" style={posStyle}
                faceChildren={
                  <div style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 2, zIndex: 3 }}>
                    <div style={{ width: 20, height: 12, background: 'rgba(0,0,0,0.85)', borderRadius: '50%' }} />
                    <div style={{ width: 4, height: 2, background: 'rgba(0,0,0,0.7)' }} />
                    <div style={{ width: 20, height: 12, background: 'rgba(0,0,0,0.85)', borderRadius: '50%' }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Gold chain */}
                    <div style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 3 }}>
                      {[0,1,2,3,4].map(ci => (
                        <div key={ci} style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFD700', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }} />
                      ))}
                    </div>
                    {/* Star */}
                    <div style={{ position: 'absolute', bottom: '30%', right: -16, width: 16, height: 16, background: '#DAFC92', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
                  </>
                }
              />
            );

          case 9: // WILDCARD
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={18} mouthHeight={8}
                mouthRadius="0 0 50% 50%"
                style={{ ...posStyle, clipPath: 'inset(35% 0 0 0)' }}
                accessoryBody={
                  <div style={{ position: 'absolute', top: '10%', right: -18 }}>
                    <div style={{ width: 4, height: 30, background: '#888' }}>
                      <div className="animate-wave-flag" style={{ position: 'absolute', top: 0, left: 4, width: 20, height: 12, background: '#FF6B9D', borderRadius: 2 }} />
                    </div>
                  </div>
                }
              >
                {/* Teeth in mouth */}
                <div style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1, zIndex: 5 }}>
                  {[0,1,2].map(ti => (
                    <div key={ti} style={{ width: 3, height: 3, background: 'white', borderRadius: 1 }} />
                  ))}
                </div>
              </BlobCharacter>
            );

          case 10: // PIRATE
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={14} mouthHeight={5}
                mouthRadius="0 0 70% 30%" legVariant="pegRight" style={posStyle}
                faceChildren={
                  <>
                    {/* Eyepatch */}
                    <div style={{ position: 'absolute', top: '18%', left: '25%', zIndex: 4 }}>
                      <div style={{ width: 14, height: 14, background: '#111', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: 5, left: -20, width: 60, height: 2, background: '#111', transform: 'rotate(-5deg)' }} />
                    </div>
                  </>
                }
                accessoryBody={
                  <>
                    {/* Sword */}
                    <div style={{ position: 'absolute', top: '30%', right: -22 }}>
                      <div style={{ width: 4, height: 35, background: '#C0C0C0', borderRadius: '2px 2px 1px 1px', boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.3)' }}>
                        <div style={{ position: 'absolute', top: 6, left: -4, width: 12, height: 3, background: '#8B6914', borderRadius: 1 }} />
                      </div>
                    </div>
                    {/* Parrot */}
                    <div style={{ position: 'absolute', top: -5, right: 5 }}>
                      <div style={{ width: 14, height: 16, background: '#2ECC71', borderRadius: '50% 50% 40% 40%', boxShadow: 'inset -2px -3px 5px rgba(0,0,0,0.2), inset 1px 2px 3px rgba(255,255,255,0.15)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 3, left: 3, width: 4, height: 4, background: 'white', borderRadius: '50%' }}>
                          <div style={{ width: 2, height: 2, background: '#111', borderRadius: '50%', position: 'absolute', top: 1, left: 1 }} />
                        </div>
                        <div style={{ position: 'absolute', top: 6, right: 0, width: 5, height: 3, background: '#F39C12', borderRadius: '0 50% 50% 0' }} />
                      </div>
                    </div>
                  </>
                }
              />
            );

          case 11: // INJURED
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={12} mouthHeight={4}
                mouthRadius="50% 50% 30% 30%" eyelidClose={0.15} style={posStyle}
                faceChildren={
                  <div style={{ position: 'absolute', top: '15%', right: '25%', zIndex: 4 }}>
                    <div style={{ width: 14, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(45deg)' }} />
                    <div style={{ width: 14, height: 3, background: 'rgba(255,255,255,0.8)', borderRadius: 1, position: 'absolute', transform: 'rotate(-45deg)' }} />
                  </div>
                }
                accessoryBody={
                  <>
                    {/* Cast on left arm */}
                    <div style={{ position: 'absolute', top: '38%', left: -12, width: 22, height: 35, background: 'rgba(255,255,255,0.6)', borderRadius: 4, transform: 'rotate(15deg)' }} />
                    {/* Crutch */}
                    <div style={{ position: 'absolute', bottom: -10, left: -18 }}>
                      <div style={{ width: 4, height: 45, background: '#8B4513', borderRadius: 2 }}>
                        <div style={{ position: 'absolute', top: 0, left: -6, width: 16, height: 4, background: '#8B4513', borderRadius: 2 }} />
                      </div>
                    </div>
                  </>
                }
              />
            );

          case 12: // PHILOSOPHER
            return (
              <BlobCharacter key={cfg.id} ref={setRef(i)} color={cfg.color}
                width={cfg.w} height={cfg.h} shape={cfg.shape}
                zIndex={cfg.z} mouthWidth={14} mouthHeight={3}
                mouthRadius="2px" style={posStyle}
                faceChildren={
                  <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 3, zIndex: 3 }}>
                    <div style={{ width: 18, height: 18, border: '1.5px solid rgba(0,0,0,0.5)', borderRadius: '50%', background: 'transparent' }} />
                    <div style={{ width: 4, height: 1.5, background: 'rgba(0,0,0,0.5)' }} />
                    <div style={{ width: 18, height: 18, border: '1.5px solid rgba(0,0,0,0.5)', borderRadius: '50%', background: 'transparent' }} />
                  </div>
                }
                accessoryTop={
                  <>
                    {/* Lightbulb */}
                    <div data-bulb style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', width: 18, height: 22, background: '#FFD93D', borderRadius: '50% 50% 30% 30%', boxShadow: '0 0 12px 4px rgba(255,217,61,0.4)' }}>
                      <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 10, height: 6, background: '#999', borderRadius: '0 0 3px 3px' }} />
                    </div>
                    {/* Orbiting ?... */}
                    <div data-orbiter style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, transformOrigin: 'center center' }}>
                      <div style={{ position: 'absolute', top: 0, left: '50%', fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>?</div>
                      <div style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>...</div>
                    </div>
                  </>
                }
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default React.memo(BlobCrowd);
