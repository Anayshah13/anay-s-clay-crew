import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { BlobAnimConfig } from '@/components/blobConfigs';

export interface BlobRef {
  container: HTMLDivElement | null;
  leftPupil: HTMLDivElement | null;
  rightPupil: HTMLDivElement | null;
  body: HTMLDivElement | null;
  mouth: HTMLDivElement | null;
  leftArm: HTMLDivElement | null;
  rightArm: HTMLDivElement | null;
}

interface ScaredState {
  isScared: boolean;
}

export function useBlobCrowd(
  blobRefs: React.MutableRefObject<BlobRef[]>,
  animConfigs: BlobAnimConfig[],
  restartBreathingFn?: (index: number) => void
) {
  const rafRef = useRef<number>(0);
  const scaredStates = useRef<ScaredState[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Init scared states
    scaredStates.current = animConfigs.map(() => ({ isScared: false }));

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const refs = blobRefs.current;
        for (let i = 0; i < refs.length; i++) {
          const blob = refs[i];
          const config = animConfigs[i];
          if (!blob.container || !config) continue;

          const rect = blob.container.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          const resp = config.cursorResponsiveness;
          const lag = config.eyeLag;

          // Pupil tracking
          const pupilOffset = Math.min(dist / 30, 5) * resp;
          const px = Math.cos(angle) * pupilOffset;
          const py = Math.sin(angle) * pupilOffset;

          if (blob.leftPupil) {
            gsap.to(blob.leftPupil, { x: px, y: py, duration: lag + 0.06, overwrite: true });
          }
          if (blob.rightPupil) {
            gsap.to(blob.rightPupil, { x: px, y: py, duration: lag + 0.06, overwrite: true });
          }

          if (prefersReduced) continue;

          // Body lean
          const leanX = Math.max(-12, Math.min(12, (dx / 40) * resp));
          const leanY = Math.max(-12, Math.min(12, (dy / 50) * resp));
          if (blob.body && !scaredStates.current[i]?.isScared) {
            gsap.to(blob.body, {
              rotateY: leanX, rotateX: -leanY,
              duration: 0.6, ease: 'power2.out', overwrite: 'auto'
            });
          }

          // Arm rotation
          const armAngle = Math.max(-30, Math.min(30, (dx / 15) * resp));
          if (blob.leftArm) {
            gsap.to(blob.leftArm, { rotation: 25 + armAngle * 0.5, duration: 0.5, overwrite: 'auto' });
          }
          if (blob.rightArm) {
            gsap.to(blob.rightArm, { rotation: -25 + armAngle * 0.5, duration: 0.5, overwrite: 'auto' });
          }

          // Persistent scared state
          const scared = scaredStates.current[i];
          if (!scared) continue;

          if (dist < config.fearRadius && !scared.isScared) {
            scared.isScared = true;
            if (blob.body) {
              gsap.to(blob.body, {
                scaleX: 0.82, scaleY: 1.28,
                duration: 0.25, ease: 'power3.out', overwrite: true
              });
            }
            // Eyes widen
            const eyelids = blob.container.querySelectorAll('[data-eyelid]');
            if (eyelids.length) gsap.to(eyelids, { scaleY: 1.0, duration: 0.15 });
            // Mouth opens
            if (blob.mouth) {
              gsap.to(blob.mouth, { borderRadius: '50%', height: 18, duration: 0.2 });
            }
          }

          if (dist >= config.fearRadius && scared.isScared) {
            scared.isScared = false;
            if (blob.body) {
              gsap.to(blob.body, {
                scaleX: 1, scaleY: 1,
                rotateX: 0, rotateY: 0,
                duration: 0.8, ease: 'elastic.out(1, 0.4)',
                overwrite: true,
                onComplete: () => restartBreathingFn?.(i)
              });
            }
            if (blob.mouth) {
              gsap.to(blob.mouth, { borderRadius: '', height: '', duration: 0.4 });
            }
            // Restore eyelids
            const eyelids = blob.container.querySelectorAll('[data-eyelid]');
            if (eyelids.length) gsap.to(eyelids, { scaleY: 0, duration: 0.3 });
          }
        }
      });
    };

    const handleMouseLeave = () => {
      const refs = blobRefs.current;
      for (let i = 0; i < refs.length; i++) {
        const blob = refs[i];
        if (scaredStates.current[i]) scaredStates.current[i].isScared = false;
        if (blob.body) {
          gsap.to(blob.body, {
            rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, y: 0,
            duration: 0.8, ease: 'elastic.out(1, 0.4)'
          });
        }
        if (blob.leftArm) gsap.to(blob.leftArm, { rotation: 25, duration: 0.5 });
        if (blob.rightArm) gsap.to(blob.rightArm, { rotation: -25, duration: 0.5 });
        if (blob.mouth) gsap.to(blob.mouth, { borderRadius: '', height: '', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [blobRefs, animConfigs, restartBreathingFn]);
}
