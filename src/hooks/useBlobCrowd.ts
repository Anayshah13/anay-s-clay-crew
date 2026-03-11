import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface BlobRef {
  container: HTMLDivElement | null;
  leftPupil: HTMLDivElement | null;
  rightPupil: HTMLDivElement | null;
  body: HTMLDivElement | null;
  mouth: HTMLDivElement | null;
  leftArm: HTMLDivElement | null;
  rightArm: HTMLDivElement | null;
}

export function useBlobCrowd(blobRefs: React.MutableRefObject<BlobRef[]>) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const refs = blobRefs.current;
        for (let i = 0; i < refs.length; i++) {
          const blob = refs[i];
          if (!blob.container) continue;

          const rect = blob.container.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Pupil tracking
          const pupilOffset = Math.min(dist / 30, 4);
          const px = Math.cos(angle) * pupilOffset;
          const py = Math.sin(angle) * pupilOffset;

          if (blob.leftPupil) {
            gsap.to(blob.leftPupil, {
              x: px, y: py, duration: 0.12, overwrite: true
            });
          }
          if (blob.rightPupil) {
            gsap.to(blob.rightPupil, {
              x: px, y: py, duration: 0.12, overwrite: true
            });
          }

          if (prefersReduced) continue;

          // Body lean
          const leanX = Math.max(-12, Math.min(12, dx / 40));
          const leanY = Math.max(-12, Math.min(12, dy / 50));
          if (blob.body) {
            gsap.to(blob.body, {
              rotateY: leanX,
              rotateX: -leanY,
              duration: 0.6,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }

          // Arm rotation based on cursor
          const armAngle = Math.max(-30, Math.min(30, dx / 15));
          if (blob.leftArm) {
            gsap.to(blob.leftArm, {
              rotation: 25 + armAngle * 0.5,
              duration: 0.5,
              overwrite: 'auto'
            });
          }
          if (blob.rightArm) {
            gsap.to(blob.rightArm, {
              rotation: -25 + armAngle * 0.5,
              duration: 0.5,
              overwrite: 'auto'
            });
          }

          // Proximity reactions
          if (dist < 200) {
            const squishFactor = 1 - (200 - dist) / 200 * 0.12;
            if (blob.body) {
              gsap.to(blob.body, {
                scaleX: squishFactor,
                scaleY: 1 + (1 - squishFactor) * 1.2,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)',
                overwrite: 'auto'
              });
            }
            if (blob.mouth) {
              gsap.to(blob.mouth, {
                scaleY: 1 + (200 - dist) / 200 * 0.8,
                duration: 0.2,
                overwrite: 'auto'
              });
            }
          }

          if (dist < 100 && blob.body) {
            gsap.to(blob.body, {
              y: -18,
              duration: 0.2,
              ease: 'power2.out',
              overwrite: 'auto',
              onComplete: () => {
                gsap.to(blob.body, {
                  y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)'
                });
              }
            });
          }
        }
      });
    };

    const handleMouseLeave = () => {
      const refs = blobRefs.current;
      for (const blob of refs) {
        if (blob.body) {
          gsap.to(blob.body, {
            rotateX: 0, rotateY: 0, scaleX: 1, scaleY: 1, y: 0,
            duration: 0.8, ease: 'elastic.out(1, 0.4)'
          });
        }
        if (blob.leftArm) gsap.to(blob.leftArm, { rotation: 25, duration: 0.5 });
        if (blob.rightArm) gsap.to(blob.rightArm, { rotation: -25, duration: 0.5 });
        if (blob.mouth) gsap.to(blob.mouth, { scaleY: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [blobRefs]);
}
