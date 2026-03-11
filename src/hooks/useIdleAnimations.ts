import { useEffect } from 'react';
import gsap from 'gsap';
import type { BlobRef } from './useBlobCrowd';

interface IdleConfig {
  breathDuration?: number;
  armRange?: [number, number];
  headWobble?: number;
  skipLeftArm?: boolean;
  skipRightArm?: boolean;
}

export function useIdleAnimations(
  blobRefs: React.MutableRefObject<BlobRef[]>,
  configs: IdleConfig[]
) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const refs = blobRefs.current;
      for (let i = 0; i < refs.length; i++) {
        const blob = refs[i];
        const config = configs[i] || {};
        const breathDur = config.breathDuration || 2 + Math.random() * 0.8;
        const wobble = config.headWobble ?? (2 + Math.random() * 2);
        const armRange = config.armRange || [-15, 15];

        // Breathing
        if (blob.body) {
          gsap.to(blob.body, {
            scaleY: 1.04, scaleX: 0.97,
            duration: breathDur,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });

          // Head wobble
          gsap.to(blob.body, {
            rotation: wobble,
            duration: breathDur * 1.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 0.5
          });
        }

        // Left arm idle
        if (blob.leftArm && !config.skipLeftArm) {
          gsap.to(blob.leftArm, {
            rotation: 25 + armRange[0],
            duration: 1.5 + Math.random() * 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 0.3
          });
        }

        // Right arm idle
        if (blob.rightArm && !config.skipRightArm) {
          gsap.to(blob.rightArm, {
            rotation: -25 + armRange[1],
            duration: 1.6 + Math.random() * 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 0.4
          });
        }

        // Leg sway
        const legs = blob.container?.querySelectorAll('[data-leg]');
        if (legs) {
          legs.forEach((leg, li) => {
            gsap.to(leg, {
              rotation: li === 0 ? 5 : -5,
              duration: 1.2 + Math.random() * 0.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              delay: li * 0.2
            });
          });
        }

        // Blink loop
        const eyelids = blob.container?.querySelectorAll('[data-eyelid]');
        if (eyelids && eyelids.length > 0) {
          const blinkLoop = () => {
            gsap.to(eyelids, {
              scaleY: 1,
              duration: 0.1,
              ease: 'power2.in',
              onComplete: () => {
                gsap.to(eyelids, {
                  scaleY: 0,
                  duration: 0.15,
                  ease: 'power2.out',
                  delay: 0.05
                });
              }
            });
            gsap.delayedCall(3 + Math.random() * 4, blinkLoop);
          };
          gsap.delayedCall(2 + Math.random() * 3, blinkLoop);
        }
      }
    });

    return () => ctx.revert();
  }, [blobRefs, configs]);
}
