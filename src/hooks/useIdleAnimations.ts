import { useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import type { BlobRef } from './useBlobCrowd';
import type { BlobAnimConfig } from '@/components/blobConfigs';

export function useIdleAnimations(
  blobRefs: React.MutableRefObject<BlobRef[]>,
  configs: BlobAnimConfig[]
) {
  const ctxRef = useRef<gsap.Context | null>(null);
  const breathTweens = useRef<Map<number, gsap.core.Tween[]>>(new Map());

  const restartBreathing = useCallback((index: number) => {
    const blob = blobRefs.current[index];
    const config = configs[index];
    if (!blob?.body || !config) return;

    const tweens: gsap.core.Tween[] = [];
    tweens.push(gsap.to(blob.body, {
      scaleY: 1.04, scaleX: 0.97,
      duration: config.breathDuration,
      ease: 'sine.inOut', yoyo: true, repeat: -1
    }));
    tweens.push(gsap.to(blob.body, {
      rotation: 2 + Math.random() * 2,
      duration: config.breathDuration * 1.5,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
      delay: Math.random() * 0.5
    }));
    breathTweens.current.set(index, tweens);
  }, [blobRefs, configs]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    ctxRef.current = gsap.context(() => {
      const refs = blobRefs.current;
      for (let i = 0; i < refs.length; i++) {
        const blob = refs[i];
        const config = configs[i];
        if (!config) continue;

        // Breathing
        if (blob.body) {
          restartBreathing(i);
        }

        // Left arm idle — unique per blob
        if (blob.leftArm) {
          gsap.to(blob.leftArm, {
            rotation: 25 + config.leftArmRange[0],
            duration: config.leftArmDuration,
            ease: 'sine.inOut', yoyo: true, repeat: -1,
            delay: Math.random() * 0.3
          });
        }

        // Right arm idle — different timing from left
        if (blob.rightArm) {
          gsap.to(blob.rightArm, {
            rotation: -25 + config.rightArmRange[1],
            duration: config.rightArmDuration,
            ease: 'sine.inOut', yoyo: true, repeat: -1,
            delay: Math.random() * 0.4
          });
        }

        // Leg sway with unique timing per leg
        const legs = blob.container?.querySelectorAll('[data-leg]');
        if (legs) {
          legs.forEach((leg, li) => {
            gsap.to(leg, {
              rotation: li === 0 ? 5 : -5,
              duration: config.legSwayDuration + (li * 0.3),
              ease: 'sine.inOut', yoyo: true, repeat: -1,
              delay: li * 0.2
            });
          });
        }

        // Blink loop
        const eyelids = blob.container?.querySelectorAll('[data-eyelid]');
        if (eyelids && eyelids.length > 0) {
          const blinkLoop = () => {
            gsap.to(eyelids, {
              scaleY: 1, duration: 0.1, ease: 'power2.in',
              onComplete: () => {
                gsap.to(eyelids, {
                  scaleY: 0, duration: 0.15, ease: 'power2.out', delay: 0.05
                });
              }
            });
            gsap.delayedCall(3 + Math.random() * 4, blinkLoop);
          };
          gsap.delayedCall(2 + Math.random() * 3, blinkLoop);
        }
      }
    });

    return () => {
      ctxRef.current?.revert();
      breathTweens.current.clear();
    };
  }, [blobRefs, configs, restartBreathing]);

  return restartBreathing;
}
