import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LightSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

const LightSwitch: React.FC<LightSwitchProps> = ({ isDark, onToggle }) => {
  const cordRef = useRef<HTMLDivElement>(null);
  const pullRef = useRef<HTMLDivElement>(null);

  // Idle sway
  useEffect(() => {
    if (!cordRef.current) return;
    const tl = gsap.to(cordRef.current, {
      rotation: 2, duration: 3, ease: 'sine.inOut',
      yoyo: true, repeat: -1, transformOrigin: 'top center'
    });
    return () => { tl.kill(); };
  }, []);

  const handleClick = () => {
    if (!cordRef.current) { onToggle(); return; }
    gsap.to(cordRef.current, {
      scaleY: 1.4, duration: 0.15, ease: 'power2.out',
      onComplete: () => {
        gsap.to(cordRef.current, {
          scaleY: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)',
          onStart: onToggle
        });
      }
    });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, right: 80, zIndex: 200,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      cursor: 'pointer', userSelect: 'none'
    }} onClick={handleClick}>
      <span style={{
        fontSize: 9, fontFamily: 'JetBrains Mono, monospace',
        color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
        letterSpacing: 2, marginTop: 8, marginBottom: 2
      }}>LIGHTS</span>
      <div ref={cordRef} style={{
        width: 2, height: 60,
        background: isDark ? '#666' : '#999',
        transformOrigin: 'top center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <div ref={pullRef} style={{
          width: 16, height: 16, borderRadius: '50%',
          background: isDark ? '#aaa' : '#777',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          marginBottom: -8,
          transition: 'background 0.3s'
        }} />
      </div>
    </div>
  );
};

export default React.memo(LightSwitch);
