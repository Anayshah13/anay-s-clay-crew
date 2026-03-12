import React from 'react';
import BlobCharacter from './BlobCharacter';
import type { BlobConfig } from './blobConfigs';

/**
 * THE DEV — lime #DAFC92 — FRONT CENTER
 * Focused thin-line mouth, thick glasses, CLI laptop
 */
export function renderDev(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    <BlobCharacter {...(common as any)} eyeSize={22} mouthWidth={18} mouthHeight={3} mouthRadius="2px"
      eyebrows={
        <div style={{ display: 'flex', gap: '24px', marginBottom: '-3px' }}>
          <div style={{ width: 18, height: 4, background: 'rgba(0,0,0,0.45)', borderRadius: 2, transform: 'rotate(-5deg)' }} />
          <div style={{ width: 18, height: 4, background: 'rgba(0,0,0,0.45)', borderRadius: 2, transform: 'rotate(5deg)' }} />
        </div>
      }
      faceChildren={
        /* Thick nerdy glasses */
        <div style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1, zIndex: 3 }}>
          <div style={{ width: 34, height: 32, border: '4px solid #333', borderRadius: 8, background: 'rgba(200,230,255,0.15)' }} />
          <div style={{ width: 7, height: 3.5, background: '#333', borderRadius: 2 }} />
          <div style={{ width: 34, height: 32, border: '4px solid #333', borderRadius: 8, background: 'rgba(200,230,255,0.15)' }} />
          <div style={{ position: 'absolute', left: -11, top: 12, width: 13, height: 2.5, background: '#333' }} />
          <div style={{ position: 'absolute', right: -11, top: 12, width: 13, height: 2.5, background: '#333' }} />
        </div>
      }
      accessoryTop={
        <div style={{ position: 'absolute', top: -14, right: '8%' }}>
          <div style={{ background: '#1a1a2e', color: '#DAFC92', fontSize: 9, fontWeight: 900, fontFamily: 'monospace', padding: '3px 7px', borderRadius: 4, border: '2px solid #DAFC92', letterSpacing: 1 }}>DJ</div>
        </div>
      }
      accessoryBody={
        <>
          {/* Laptop with >_ terminal */}
          <div style={{ position: 'absolute', bottom: '24%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ width: 76, height: 54, background: '#2d2d2d', borderRadius: 7, position: 'relative', boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.4)' }}>
              <div style={{ position: 'absolute', inset: 4, background: '#0d1117', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 6, left: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ color: '#DAFC92', fontSize: 10, fontFamily: 'monospace', fontWeight: 700 }}>{'>_'}</span>
                </div>
                <div data-code-line style={{ position: 'absolute', top: 18, left: 5, width: 32, height: 2.5, background: '#4ECDC4', borderRadius: 1, opacity: 0.8 }} />
                <div data-code-line style={{ position: 'absolute', top: 25, left: 7, width: 24, height: 2.5, background: '#DAFC92', borderRadius: 1, opacity: 0.6 }} />
                <div data-code-line style={{ position: 'absolute', top: 32, left: 5, width: 34, height: 2.5, background: '#9B59FF', borderRadius: 1, opacity: 0.5 }} />
                <div data-laptop-flash style={{ position: 'absolute', inset: 0, background: 'rgba(218,252,146,0)', borderRadius: 3 }} />
              </div>
              <div style={{ position: 'absolute', bottom: -6, left: -4, width: 84, height: 6, background: '#444', borderRadius: '0 0 4px 4px' }} />
            </div>
          </div>
          {/* DJSCE badge */}
          <div style={{ position: 'absolute', top: '50%', left: '14%' }}>
            <div style={{ background: '#1a1a2e', color: '#DAFC92', fontSize: 8, fontWeight: 900, fontFamily: 'monospace', padding: '3px 5px', borderRadius: 4, border: '1.5px solid #DAFC92', lineHeight: 1.5 }}>DJSCE</div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE MINECRAFT PLAYER — forest green #5B8C5A — FRONT LEFT
 * Creeper belly, diamond sword, pixelated crown, TNT block
 */
export function renderMinecraft(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    <BlobCharacter {...(common as any)} eyeSize={24} mouthWidth={44} mouthHeight={20} mouthRadius="0 0 50% 50%"
      eyebrows={
        // Blocky square-ish brows for pixel art feel
        <div style={{ display: 'flex', gap: '20px', marginBottom: '-4px' }}>
          <div style={{ width: 18, height: 5, background: 'rgba(0,0,0,0.55)', borderRadius: 1 }} />
          <div style={{ width: 18, height: 5, background: 'rgba(0,0,0,0.55)', borderRadius: 1 }} />
        </div>
      }
      faceChildren={
        // Creeper face on belly
        <div style={{ position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
          {/* Creeper eyes */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 3 }}>
            <div style={{ width: 10, height: 10, background: '#1a3d1a', borderRadius: 2 }} />
            <div style={{ width: 10, height: 10, background: '#1a3d1a', borderRadius: 2 }} />
          </div>
          {/* Creeper mouth — M shape */}
          <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
            <div style={{ width: 6, height: 8, background: '#1a3d1a', borderRadius: '0 0 2px 2px' }} />
            <div style={{ width: 4, height: 4, background: '#1a3d1a', borderRadius: 2, marginTop: 4 }} />
            <div style={{ width: 6, height: 8, background: '#1a3d1a', borderRadius: '0 0 2px 2px' }} />
          </div>
        </div>
      }
      accessoryTop={
        // Pixelated crown
        <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          <div style={{ width: 12, height: 14, background: '#FFD700', borderRadius: 2 }} />
          <div style={{ width: 12, height: 20, background: '#FFD700', borderRadius: 2 }}>
            <div style={{ width: 6, height: 6, background: '#FF4757', borderRadius: 1, margin: '3px auto' }} />
          </div>
          <div style={{ width: 12, height: 16, background: '#FFD700', borderRadius: 2 }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Diamond sword — right arm */}
          <div data-mc-sword style={{ position: 'absolute', top: '20%', right: -40, transform: 'rotate(-15deg)', transformOrigin: 'bottom center' }}>
            {/* Blade — diamond blue */}
            <div style={{ width: 8, height: 55, background: 'linear-gradient(180deg, #5DADE2 0%, #85C1E9 50%, #5DADE2 100%)', borderRadius: '4px 4px 2px 2px', position: 'relative', boxShadow: '0 0 8px rgba(93,173,226,0.5)' }}>
              {/* Crossguard */}
              <div style={{ position: 'absolute', bottom: 14, left: -10, width: 28, height: 7, background: '#888', borderRadius: 3 }} />
              {/* Handle */}
              <div style={{ position: 'absolute', bottom: -14, left: -1, width: 10, height: 16, background: '#6B3A1F', borderRadius: '0 0 4px 4px' }} />
            </div>
          </div>
          {/* TNT block — left arm */}
          <div style={{ position: 'absolute', top: '40%', left: -28 }}>
            <div style={{ width: 20, height: 20, background: '#E74C3C', borderRadius: 3, position: 'relative', border: '2px solid #C0392B' }}>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'white', fontSize: 6, fontWeight: 900, fontFamily: 'monospace' }}>TNT</span>
            </div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE LEGO BUILDER — yellow #FFD93D — FRONT RIGHT
 * Pure joy, enormous smile squinting
 */
export function renderLego(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // EMOTION: PURE JOY — enormous smile, eyes squinting happy, raised cheeks
    <BlobCharacter {...(common as any)} mouthWidth={52} mouthHeight={26} mouthRadius="0 0 60% 60%"
      eyebrows={
        // Squinted happy brows — curve inward-down indicating scrunched happy cheeks
        <div style={{ display: 'flex', gap: '18px', marginBottom: '-6px' }}>
          <div style={{ width: 18, height: 5, background: 'rgba(0,0,0,0.35)', borderRadius: 4, transform: 'rotate(-12deg)' }} />
          <div style={{ width: 18, height: 5, background: 'rgba(0,0,0,0.35)', borderRadius: 4, transform: 'rotate(12deg)' }} />
        </div>
      }
      accessoryTop={
        /* LEGO stud hair — 3 circles on top */
        <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 11, height: 11, background: '#FFD93D', border: '2px solid rgba(0,0,0,0.2)', borderRadius: '50%', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.15)' }} />
          ))}
        </div>
      }
      accessoryBody={
        <>
          {/* Big LEGO 2x4 brick */}
          <div style={{ position: 'absolute', bottom: '30%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ width: 52, height: 24, background: '#E8230A', borderRadius: 4, position: 'relative', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.25), inset 2px 3px 5px rgba(255,255,255,0.15)' }}>
              <div style={{ position: 'absolute', top: -7, left: 3, display: 'flex', gap: 5 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ width: 9, height: 8, background: '#E8230A', borderRadius: '50% 50% 0 0', border: '1.5px solid rgba(0,0,0,0.2)', boxShadow: 'inset -1px -2px 3px rgba(0,0,0,0.2)' }} />
                ))}
              </div>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'rgba(255,255,255,0.25)', fontSize: 8, fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: 1 }}>LEGO</span>
            </div>
          </div>
          {/* Instruction booklet */}
          <div style={{ position: 'absolute', top: '38%', left: -20, transform: 'rotate(15deg)' }}>
            <div style={{ width: 20, height: 26, background: 'white', borderRadius: 2, position: 'relative', boxShadow: '1px 1px 4px rgba(0,0,0,0.2)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 9, background: '#E8230A', borderRadius: '2px 2px 0 0' }} />
              <div style={{ position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)', width: 12, height: 5, background: '#FFD93D', borderRadius: 1 }} />
              <div style={{ position: 'absolute', top: 13, left: 3, width: 13, height: 1.5, background: '#ccc', borderRadius: 1 }} />
              <div style={{ position: 'absolute', top: 17, left: 3, width: 10, height: 1.5, background: '#ccc', borderRadius: 1 }} />
            </div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE COMPETITIVE PROGRAMMER — deep blue #1E488F — MID LEFT
 * LOCKED-IN — zero expression flat line mouth, beady small eyes, pressed brows
 */
export function renderCprog(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // EMOTION: LOCKED-IN — flat zero-expression mouth, intense small beady eyes
    <BlobCharacter {...(common as any)} eyeSize={16} mouthWidth={22} mouthHeight={3} mouthRadius="1px"
      eyebrows={
        // Flat brows pressed DOWN — intensity
        <div style={{ display: 'flex', gap: '16px', marginBottom: '-9px' }}>
          <div style={{ width: 16, height: 4, background: 'rgba(255,255,255,0.65)', borderRadius: 2 }} />
          <div style={{ width: 16, height: 4, background: 'rgba(255,255,255,0.65)', borderRadius: 2 }} />
        </div>
      }
      faceChildren={
        /* Wire-frame round glasses */
        <div style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 3, zIndex: 3 }}>
          <div style={{ width: 22, height: 22, border: '2px solid rgba(255,255,255,0.6)', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ width: 5, height: 2, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
          <div style={{ width: 22, height: 22, border: '2px solid rgba(255,255,255,0.6)', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', left: -5, top: 8, width: 7, height: 1.5, background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ position: 'absolute', right: -5, top: 8, width: 7, height: 1.5, background: 'rgba(255,255,255,0.4)' }} />
        </div>
      }
      accessoryTop={
        /* Floating {} near head */
        <div data-cprog-braces style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', width: 70, height: 70, transformOrigin: 'center center' }}>
          <div style={{ position: 'absolute', top: 0, left: '30%', fontSize: 20, color: 'rgba(218,252,146,0.85)', fontWeight: 900, fontFamily: 'monospace' }}>{'{'}</div>
          <div style={{ position: 'absolute', bottom: 0, right: '25%', fontSize: 20, color: 'rgba(218,252,146,0.85)', fontWeight: 900, fontFamily: 'monospace' }}>{'}'}</div>
          <div style={{ position: 'absolute', top: '40%', left: '5%', fontSize: 12, color: 'rgba(78,205,196,0.6)', fontFamily: 'monospace' }}>{'</>'}</div>
        </div>
      }
      accessoryBody={
        <>
          {/* 1497 — DOMINANT chest jersey number */}
          <div style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ color: '#DAFC92', fontSize: 28, fontWeight: 900, fontFamily: "'Impact', 'Bebas Neue', 'Arial Black', monospace", textShadow: '0 2px 8px rgba(0,0,0,0.5)', letterSpacing: 1 }}>1497</span>
          </div>
          {/* LeetCode clipboard */}
          <div style={{ position: 'absolute', bottom: '22%', right: -22 }}>
            <div style={{ width: 22, height: 28, background: '#2d2d2d', borderRadius: '2px 2px 3px 3px', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 8, height: 5, background: '#555', borderRadius: '2px 2px 0 0' }} />
              <div style={{ position: 'absolute', top: 4, left: 3, right: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ height: 1.5, background: '#FFA116', borderRadius: 1, opacity: 0.9 }} />
                <div style={{ height: 1.5, background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />
                <div style={{ height: 1.5, background: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
              </div>
              <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', fontSize: 6, color: '#FFA116', fontWeight: 900, fontFamily: 'monospace' }}>LC</div>
            </div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE FUNNY GUY — warm orange #FF8C00 — FRONT LEFT
 * Jester hat, mic, asymmetric eyes, huge buckteeth grin
 */
export function renderFunnyGuy(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // EMOTION: MAXIMUM GOOFINESS — one eye 30% larger, widest grin of all blobs
    <BlobCharacter {...(common as any)}
      eyeSizeLeft={28}  // LEFT eye bigger = goofy asymmetry
      eyeSizeRight={20}
      mouthWidth={55} mouthHeight={24} mouthRadius="0 0 60px 60px"
      eyebrows={
        // Goofy unbalanced brows
        <div style={{ display: 'flex', marginBottom: '-3px', gap: '14px' }}>
          <div style={{ width: 20, height: 5, background: 'rgba(0,0,0,0.5)', borderRadius: 3, transform: 'rotate(-14deg)' }} />
          <div style={{ width: 14, height: 4, background: 'rgba(0,0,0,0.5)', borderRadius: 3, transform: 'rotate(8deg)' }} />
        </div>
      }
      faceChildren={
        // Buck teeth hanging from upper jaw of mouth
        <div style={{ position: 'absolute', bottom: '21%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 3, zIndex: 4 }}>
          <div style={{ width: 12, height: 16, background: 'white', borderRadius: '0 0 3px 3px', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
          <div style={{ width: 12, height: 14, background: 'white', borderRadius: '0 0 3px 3px', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
        </div>
      }
      accessoryTop={
        // Jester hat — 3 prongs with bells
        <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', width: 70, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {/* Left prong */}
          <div style={{ width: 16, height: 28, background: '#FF4757', borderRadius: '50% 50% 0 0', position: 'relative', transform: 'rotate(-20deg)', transformOrigin: 'bottom center' }}>
            <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, background: '#FFD700', borderRadius: '50%', boxShadow: '0 0 4px rgba(255,215,0,0.5)' }} />
          </div>
          {/* Center prong — tallest */}
          <div style={{ width: 18, height: 36, background: '#DAFC92', borderRadius: '50% 50% 0 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 14, height: 14, background: '#FF4757', borderRadius: '50%', boxShadow: '0 0 5px rgba(255,71,87,0.5)' }} />
          </div>
          {/* Right prong */}
          <div style={{ width: 16, height: 26, background: '#FF4757', borderRadius: '50% 50% 0 0', position: 'relative', transform: 'rotate(20deg)', transformOrigin: 'bottom center' }}>
            <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, background: '#FFD700', borderRadius: '50%', boxShadow: '0 0 4px rgba(255,215,0,0.5)' }} />
          </div>
        </div>
      }
      accessoryBody={
        <>
          {/* Microphone — right arm raised */}
          <div data-mic-arm style={{ position: 'absolute', top: '22%', right: -32, transform: 'rotate(-15deg)', transformOrigin: 'bottom center' }}>
            {/* Mic head */}
            <div style={{ width: 14, height: 20, background: '#444', borderRadius: '50% 50% 20% 20%', position: 'relative', boxShadow: 'inset -2px -3px 5px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'absolute', inset: 2, background: '#666', borderRadius: '50%', opacity: 0.6 }} />
            </div>
            {/* Mic handle */}
            <div style={{ width: 6, height: 22, background: '#888', borderRadius: '0 0 3px 3px', margin: '0 auto' }} />
          </div>
        </>
      }
    />
  );
}

/**
 * THE POP CULTURE FREAK — hot pink #E91E8C — FRONT RIGHT
 * Arc reactor, Pokeball, lightsaber, Pikachu scar
 */
export function renderPopCulture(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // EMOTION: FANATIC HAPPINESS — huge smile, starry eyes
    <BlobCharacter {...(common as any)} eyeSize={26} mouthWidth={44} mouthHeight={22} mouthRadius="0 0 60% 60%"
      eyebrows={
        <div style={{ display: 'flex', gap: '16px', marginBottom: '-2px' }}>
          <div style={{ width: 16, height: 4, background: 'rgba(255,255,255,0.5)', borderRadius: 2, transform: 'rotate(-8deg)' }} />
          <div style={{ width: 16, height: 4, background: 'rgba(255,255,255,0.5)', borderRadius: 2, transform: 'rotate(8deg)' }} />
        </div>
      }
      faceChildren={
        <>
          {/* Pikachu lightning bolt scar on left cheek */}
          <div style={{ position: 'absolute', bottom: '30%', left: '12%', zIndex: 4 }}>
            <svg width="16" height="22" viewBox="0 0 16 22">
              <polyline points="8,0 2,10 8,10 0,22" fill="none" stroke="#FFD700" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Star pupils overlay */}
          <div style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '28px', zIndex: 5, pointerEvents: 'none' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,215,0,0.9)', textShadow: '0 0 4px gold' }}>★</span>
            <span style={{ fontSize: 11, color: 'rgba(255,215,0,0.9)', textShadow: '0 0 4px gold' }}>★</span>
          </div>
        </>
      }
      accessoryTop={
        // Avengers "A" floating above
        <div style={{ position: 'absolute', top: -22, left: '55%' }}>
          <div style={{ width: 18, height: 20, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#C0392B', fontSize: 16, fontWeight: 900, fontFamily: 'Impact, sans-serif', textShadow: '0 0 6px rgba(192,57,43,0.6)' }}>A</span>
          </div>
        </div>
      }
      accessoryBody={
        <>
          {/* Arc reactor — glowing on chest */}
          <div data-arc-reactor style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2.5px solid #89C9C9', background: 'radial-gradient(circle, rgba(255,255,255,0.95) 20%, #4ECDC4 45%, #0077ff 70%, transparent 100%)', boxShadow: '0 0 10px #4ECDC4, 0 0 20px #0077ff' }} />
          </div>
          {/* Pokeball — right arm */}
          <div data-pokeball style={{ position: 'absolute', top: '30%', right: -28 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', overflow: 'hidden', border: '3px solid #333', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: '#FF4757' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'white' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', border: '2.5px solid #333' }} />
              </div>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: '#333', transform: 'translateY(-50%)', zIndex: 1 }} />
            </div>
          </div>
          {/* Lightsaber — left arm */}
          <div data-lightsaber style={{ position: 'absolute', top: '18%', left: -36, transform: 'rotate(20deg)', transformOrigin: 'bottom center' }}>
            {/* Blade */}
            <div style={{ width: 5, height: 52, background: '#00FFFF', borderRadius: '4px 4px 2px 2px', boxShadow: '0 0 8px #00FFFF, 0 0 20px #00FFFF, 0 0 40px rgba(0,255,255,0.4)', position: 'relative' }}>
              {/* Handle */}
              <div style={{ position: 'absolute', bottom: -14, left: -2, width: 9, height: 16, background: 'linear-gradient(180deg, #888, #555)', borderRadius: '2px 2px 4px 4px', border: '1px solid #777' }} />
            </div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE HACKATHON BLOB — electric purple #9B59FF — MID
 * Dark eye bags, energy drink, exhausted droopy mouth
 */
export function renderHackathon(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // EMOTION: EXHAUSTED DROOPING — half-closed lids, droopy frown corners
    <BlobCharacter {...(common as any)} eyeSize={20} eyelidClose={0.35}
      mouthWidth={22} mouthHeight={5} mouthRadius="40% 40% 50% 50%"
      faceChildren={
        <>
          {/* Deep eye bags */}
          <div style={{ position: 'absolute', top: '38%', left: '14%', width: 18, height: 7, background: 'rgba(80,30,120,0.55)', borderRadius: '0 0 50% 50%' }} />
          <div style={{ position: 'absolute', top: '38%', right: '14%', width: 18, height: 7, background: 'rgba(80,30,120,0.55)', borderRadius: '0 0 50% 50%' }} />
          {/* Sweat drops */}
          <div style={{ position: 'absolute', top: '8%', left: '22%', width: 6, height: 9, background: 'rgba(150,200,255,0.7)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', transform: 'rotate(20deg)' }} />
          <div style={{ position: 'absolute', top: '14%', left: '36%', width: 5, height: 8, background: 'rgba(150,200,255,0.6)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', transform: 'rotate(10deg)' }} />
          {/* 5 HRS chest */}
          <div style={{ position: 'absolute', bottom: '24%', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 900, fontFamily: 'monospace', letterSpacing: 0 }}>5 HRS</span>
          </div>
        </>
      }
      accessoryTop={
        /* Dishevelled hair tufts */
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
          <div style={{ width: 5, height: 14, background: '#9B59FF', borderRadius: '50% 50% 0 0', transform: 'rotate(-20deg)' }} />
          <div style={{ width: 5, height: 18, background: '#9B59FF', borderRadius: '50% 50% 0 0', transform: 'rotate(-5deg)' }} />
          <div style={{ width: 5, height: 12, background: '#9B59FF', borderRadius: '50% 50% 0 0', transform: 'rotate(15deg)' }} />
        </div>
      }
      accessoryBody={
        /* Energy drink can */
        <div style={{ position: 'absolute', top: '30%', right: -20 }}>
          <div style={{ width: 13, height: 30, background: 'linear-gradient(135deg, #d4d4d4, #a0a0a0)', borderRadius: '3px 3px 2px 2px', position: 'relative', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: 5, left: 1, right: 1, height: 9, background: 'rgba(0,200,100,0.8)', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 5, color: 'white', fontWeight: 900 }}>⚡</span>
            </div>
            <div style={{ position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)', width: 9, height: 3, background: '#888', borderRadius: '50% 50% 0 0' }} />
          </div>
        </div>
      }
    />
  );
}

/**
 * THE DOODLER (Graphic Designer) — kept for backward compat if used
 * Now renderGraphicDesigner is the back-row blob but this stays in file
 */
export function renderDoodler(cfg: BlobConfig, common: Record<string, unknown>) {
  // Back row — no accessories, just body/eyes/mouth
  return (
    <BlobCharacter {...(common as any)} mouthWidth={22} mouthHeight={8} mouthRadius="0 50% 50% 0"
      eyebrows={
        <div style={{ display: 'flex', gap: '16px', marginBottom: '-2px' }}>
          <div style={{ width: 14, height: 3.5, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(-4deg)' }} />
          <div style={{ width: 14, height: 3.5, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(-14deg) translateY(-4px)' }} />
        </div>
      }
    />
  );
}
