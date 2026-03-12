import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface LightSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

const LightSwitch: React.FC<LightSwitchProps> = ({ isDark, onToggle }) => {
  const cordRef = useRef<HTMLDivElement>(null);
  const pullRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentStretch = useRef(0);
  const hasToggled = useRef(false);
  const idleTl = useRef<gsap.core.Tween | null>(null);

  // Harmonic idle sway (made it swing more noticeably)
  useEffect(() => {
    if (!cordRef.current) return;
    idleTl.current = gsap.to(cordRef.current, {
      rotation: 30, duration: 3, ease: 'sine.inOut',
      yoyo: true, repeat: -1, transformOrigin: 'top center'
    });
    return () => { idleTl.current?.kill(); };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    hasToggled.current = false;
    startY.current = e.clientY;
    currentStretch.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    idleTl.current?.pause();
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !cordRef.current || !pullRef.current) return;
    const dy = Math.max(0, e.clientY - startY.current);
    currentStretch.current = dy;

    // Elastic stretch with diminishing returns
    const stretch = Math.min(dy * 0.8, 100);
    const scaleY = 1 + stretch / 120;

    gsap.set(cordRef.current, { scaleY, transformOrigin: 'top center' });

    // Pull ball glows as you stretch
    const progress = Math.min(stretch / 50, 1);
    const glowColor = isDark ? `rgba(218,252,146,${progress * 0.6})` : `rgba(50,50,100,${progress * 0.6})`;
    gsap.set(pullRef.current, {
      boxShadow: `0 2px 6px rgba(0,0,0,0.3), 0 0 ${progress * 20}px ${glowColor}`,
      scale: 1 + progress * 0.2,
    });
  }, [isDark]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const stretch = currentStretch.current;
    const shouldToggle = stretch > 60; // Require a strong pull

    if (cordRef.current) {
      // Elastic snap back with harmonic bounce
      gsap.to(cordRef.current, {
        scaleY: shouldToggle ? 0.85 : 1,
        duration: 0.15,
        ease: 'power2.out',
        onComplete: () => {
          if (shouldToggle && !hasToggled.current) {
            hasToggled.current = true;
            onToggle();
          }
          gsap.to(cordRef.current, {
            scaleY: 1,
            duration: 1.2,
            ease: 'elastic.out(1.2, 0.25)',
            onComplete: () => {
              idleTl.current?.resume();
            }
          });
        }
      });
    }

    if (pullRef.current) {
      gsap.to(pullRef.current, {
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, [onToggle]);

  // Fallback click disabled - only toggle on pull as requested
  const handleClick = useCallback(() => {
    // DO NOTHING — force user to pull
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', top: 0, right: 80, zIndex: 200,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'grab', userSelect: 'none', touchAction: 'none',
      }}
      onClick={handleClick}
    >
      <span style={{
        fontSize: 9, fontFamily: 'JetBrains Mono, monospace',
        color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
        letterSpacing: 2, marginTop: 8, marginBottom: 2,
        transition: 'color 0.6s',
      }}>{isDark ? 'DARK' : 'LIGHT'}</span>
      <div ref={cordRef} style={{
        width: 3, height: 110, // Made thicker and significantly longer
        background: isDark
          ? 'linear-gradient(to bottom, #555, #888)'
          : 'linear-gradient(to bottom, #999, #bbb)',
        transformOrigin: 'top center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-end',
        transition: 'background 0.6s',
      }}>
        <div
          ref={pullRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            width: 32, height: 32, borderRadius: '50%', // Made ball significantly bigger
            background: isDark
              ? 'radial-gradient(circle at 35% 35%, #ddd, #999)'
              : 'radial-gradient(circle at 35% 35%, #888, #555)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            marginBottom: -16,
            transition: 'background 0.3s',
            cursor: 'grab',
          }}
        />
      </div>
      <div style={{
        marginTop: 22, fontSize: 18, // Bigger emoji to match the bigger string
        opacity: 0.5,
        transition: 'opacity 0.3s',
      }}>
        {isDark ? '🌙' : '☀️'}
      </div>
    </div>
  );
};

export default React.memo(LightSwitch);
