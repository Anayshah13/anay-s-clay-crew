import React from 'react';
import BlobCharacter from './BlobCharacter';
import type { BlobConfig } from './blobConfigs';

/**
 * THE DEV — lime #DAFC92 — FRONT CENTER (LANDING SCREEN - BIGGER)
 * Focused thin-line mouth, thick glasses, CLI laptop
 */
export function renderDev(cfg: BlobConfig, common: Record<string, unknown>) {
  const isDark = (common as any).isDark;
  const passedEyelidClose = (common as any).eyelidClose;
  return (
    <BlobCharacter {...(common as any)} eyeSize={32} eyelidClose={passedEyelidClose !== undefined ? passedEyelidClose : (isDark ? 0.8 : 0)} mouthWidth={0} mouthHeight={0} mouthRadius="0"
      eyebrows={
        <div data-dev-eyebrows style={{ display: 'flex', gap: '32px', marginBottom: '-5px' }}>
          <div style={{ width: 24, height: 6, background: 'rgba(0,0,0,0.45)', borderRadius: 3, transform: 'rotate(-5deg)' }} />
          <div style={{ width: 24, height: 6, background: 'rgba(0,0,0,0.45)', borderRadius: 3, transform: 'rotate(5deg)' }} />
        </div>
      }
      faceChildren={
        <>
          {/* Thick nerdy glasses - LARGER */}
          <div data-dev-glasses style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 2, zIndex: 3 }}>
            <div style={{ width: 46, height: 42, border: '5px solid #333', borderRadius: 10, background: 'rgba(200,230,255,0.15)' }} />
            <div style={{ width: 9, height: 5, background: '#333', borderRadius: 2 }} />
            <div style={{ width: 46, height: 42, border: '5px solid #333', borderRadius: 10, background: 'rgba(200,230,255,0.15)' }} />
            <div style={{ position: 'absolute', left: -14, top: 16, width: 17, height: 3.5, background: '#333' }} />
            <div style={{ position: 'absolute', right: -14, top: 16, width: 17, height: 3.5, background: '#333' }} />
          </div>
          {/* Coral filled D-mouth — LARGER */}
          <div data-dev-mouth style={{ marginTop: 6, width: 38, height: 21, background: '#FF5C5C', borderRadius: '7px 7px 40px 40px', zIndex: 999 }} />
        </>
      }
      accessoryTop={
        /* Google colored propeller beanie (Intern) - LARGER */
        <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 58, height: 38, background: '#4285F4', borderRadius: '24px 24px 0 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '25%', background: '#4285F4' }} />
            <div style={{ position: 'absolute', top: 0, left: '25%', bottom: 0, width: '25%', background: '#34A853' }} />
            <div style={{ position: 'absolute', top: 0, left: '50%', bottom: 0, width: '25%', background: '#FBBC05' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '25%', background: '#EA4335' }} />
          </div>
          <div style={{ position: 'absolute', bottom: -3, left: -8, width: 74, height: 8, background: '#34A853', borderRadius: 4 }} />
          <div style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', width: 3, height: 24, background: '#555' }} />
          <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, background: '#4285F4', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, background: '#FBBC05', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, background: '#EA4335', borderRadius: '50%' }} />
          <div data-propeller style={{ position: 'absolute', top: -23, left: '50%', marginLeft: -26, width: 52, height: 5, background: '#4285F4', borderRadius: 3, transformOrigin: 'center center' }} />
          <div style={{ position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, background: '#34A853', borderRadius: '50%' }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Laptop held in right hand - LARGER */}
          <div style={{ position: 'absolute', top: '35%', right: -48, transform: 'rotate(-20deg)', transformOrigin: 'bottom center', zIndex: 10 }}>
            <div style={{ width: 88, height: 58, background: '#2d2d2d', borderRadius: 6, position: 'relative', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.4)' }}>
              <div style={{ position: 'absolute', inset: 4, background: '#0d1117', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 5, left: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ color: '#DAFC92', fontSize: 10, fontFamily: 'monospace', fontWeight: 700 }}>{'>_'}</span>
                </div>
                <div data-code-line style={{ position: 'absolute', top: 18, left: 5, width: 34, height: 3, background: '#4ECDC4', borderRadius: 1.5, opacity: 0.8 }} />
                <div data-code-line style={{ position: 'absolute', top: 26, left: 8, width: 26, height: 3, background: '#DAFC92', borderRadius: 1.5, opacity: 0.6 }} />
                <div data-laptop-flash style={{ position: 'absolute', inset: 0, background: 'rgba(218,252,146,0)', borderRadius: 3 }} />
              </div>
              <div style={{ position: 'absolute', bottom: -6, left: -4, width: 96, height: 6, background: '#444', borderRadius: '0 0 4px 4px' }} />
            </div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE DEV — lime #DAFC92 (ABOUT US SCREEN - SMALLER)
 */
export function renderAboutDev(cfg: BlobConfig, common: Record<string, unknown>) {
  const isDark = (common as any).isDark;
  const passedEyelidClose = (common as any).eyelidClose;
  return (
    <BlobCharacter {...(common as any)} eyeSize={22} eyelidClose={passedEyelidClose !== undefined ? passedEyelidClose : (isDark ? 0.8 : 0)} mouthWidth={0} mouthHeight={0} mouthRadius="0"
      eyebrows={
        <div data-dev-eyebrows style={{ display: 'flex', gap: '24px', marginBottom: '-3px' }}>
          <div style={{ width: 18, height: 4, background: 'rgba(0,0,0,0.45)', borderRadius: 2, transform: 'rotate(-5deg)' }} />
          <div style={{ width: 18, height: 4, background: 'rgba(0,0,0,0.45)', borderRadius: 2, transform: 'rotate(5deg)' }} />
        </div>
      }
      faceChildren={
        <>
          {/* Thick nerdy glasses */}
          <div data-dev-glasses style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1, zIndex: 3 }}>
            <div style={{ width: 34, height: 32, border: '4px solid #333', borderRadius: 8, background: 'rgba(200,230,255,0.15)' }} />
            <div style={{ width: 7, height: 3.5, background: '#333', borderRadius: 2 }} />
            <div style={{ width: 34, height: 32, border: '4px solid #333', borderRadius: 8, background: 'rgba(200,230,255,0.15)' }} />
            <div style={{ position: 'absolute', left: -11, top: 12, width: 13, height: 2.5, background: '#333' }} />
            <div style={{ position: 'absolute', right: -11, top: 12, width: 13, height: 2.5, background: '#333' }} />
          </div>
          {/* Coral filled D-mouth — flat top, rounded bottom */}
          <div data-dev-mouth style={{ marginTop: 4, width: 28, height: 15, background: '#FF5C5C', borderRadius: '5px 5px 30px 30px', zIndex: 999 }} />
        </>
      }
      accessoryTop={
        /* Google colored propeller beanie */
        <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 44, height: 28, background: '#4285F4', borderRadius: '17px 17px 0 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '25%', background: '#4285F4' }} />{/* Blue */}
            <div style={{ position: 'absolute', top: 0, left: '25%', bottom: 0, width: '25%', background: '#34A853' }} />{/* Green */}
            <div style={{ position: 'absolute', top: 0, left: '50%', bottom: 0, width: '25%', background: '#FBBC05' }} />{/* Yellow */}
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '25%', background: '#EA4335' }} />{/* Red */}
          </div>
          {/* Green rim */}
          <div style={{ position: 'absolute', bottom: -2, left: -6, width: 56, height: 6, background: '#34A853', borderRadius: 3 }} />
          {/* Wire stem */}
          <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', width: 2, height: 18, background: '#555' }} />
          {/* Beads */}
          <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, background: '#4285F4', borderRadius: '50%' }} />{/* Blue */}
          <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, background: '#FBBC05', borderRadius: '50%' }} />{/* Yellow */}
          <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, background: '#EA4335', borderRadius: '50%' }} />{/* Red */}
          {/* Propeller Blade */}
          <div data-propeller style={{ position: 'absolute', top: -17, left: '50%', marginLeft: -20, width: 40, height: 4, background: '#4285F4', borderRadius: 2, transformOrigin: 'center center' }} />
          {/* Top bead/wire loop */}
          <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, background: '#34A853', borderRadius: '50%' }} />{/* Green */}
        </div>
      }
      accessoryBody={
        <>
          {/* Laptop held in right hand - DECREASED SIZE, SHIFTED RIGHT */}
          <div style={{ position: 'absolute', top: '35%', right: -46, transform: 'rotate(-20deg)', transformOrigin: 'bottom center', zIndex: 10 }}>
            <div style={{ width: 50, height: 33, background: '#2d2d2d', borderRadius: 4, position: 'relative', boxShadow: 'inset -2px -3px 5px rgba(0,0,0,0.4)' }}>
              <div style={{ position: 'absolute', inset: 2.5, background: '#0d1117', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 3, left: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ color: '#DAFC92', fontSize: 6, fontFamily: 'monospace', fontWeight: 700 }}>{'>_'}</span>
                </div>
                <div data-code-line style={{ position: 'absolute', top: 10, left: 3, width: 19, height: 1.5, background: '#4ECDC4', borderRadius: 1, opacity: 0.8 }} />
                <div data-code-line style={{ position: 'absolute', top: 15, left: 4.5, width: 15, height: 1.5, background: '#DAFC92', borderRadius: 1, opacity: 0.6 }} />
                <div data-laptop-flash style={{ position: 'absolute', inset: 0, background: 'rgba(218,252,146,0)', borderRadius: 2 }} />
              </div>
              <div style={{ position: 'absolute', bottom: -4, left: -2.5, width: 55, height: 4, background: '#444', borderRadius: '0 0 2.5px 2.5px' }} />
            </div>
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
      accessoryTop={
        <img
          src="/landing/crown.png"
          alt=""
          width={54}
          height={54}
          style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', objectFit: 'contain', pointerEvents: 'none' }}
        />
      }
      accessoryBody={
        <>
          <div data-mc-sword style={{ position: 'absolute', top: '36%', right: -34, transform: 'rotate(26deg)', transformOrigin: 'bottom center' }}>
            <img src="/landing/sword.png" alt="" width={36} height={92} style={{ display: 'block', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div style={{ position: 'absolute', top: '46%', left: -36 }}>
            <img src="/landing/tnt.png" alt="" width={36} height={36} style={{ display: 'block', objectFit: 'contain', pointerEvents: 'none' }} />
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
    <BlobCharacter {...(common as any)} mouthWidth={64} mouthHeight={32} mouthRadius="0 0 70% 70%"
      eyebrows={
        // Squinted happy brows — curve inward-down indicating scrunched happy cheeks
        <div style={{ display: 'flex', gap: '18px', marginBottom: '-6px' }}>
          <div style={{ width: 18, height: 6, background: 'rgba(0,0,0,0.4)', borderRadius: 4, transform: 'rotate(-15deg)' }} />
          <div style={{ width: 18, height: 6, background: 'rgba(0,0,0,0.4)', borderRadius: 4, transform: 'rotate(15deg)' }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Big LEGO 2x4 brick */}
          <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ width: 52, height: 24, background: '#E8230A', borderRadius: 4, position: 'relative', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.25), inset 2px 3px 5px rgba(255,255,255,0.15)' }}>
              <div style={{ position: 'absolute', top: -7, left: 3, display: 'flex', gap: 5 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ width: 9, height: 8, background: '#E8230A', borderRadius: '50% 50% 0 0', border: '1.5px solid rgba(0,0,0,0.2)', boxShadow: 'inset -1px -2px 3px rgba(0,0,0,0.2)' }} />
                ))}
              </div>
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'rgba(255, 255, 255, 0.74)', fontSize: 8, fontWeight: 900, fontFamily: 'sans-serif', letterSpacing: 1 }}>LEGO</span>
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
          {/* LeetCode logo on chest */}
          <div style={{ position: 'absolute', top: '47%', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ width: 44, height: 44, background: '#2d2d2d', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2.5px solid #555', boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              <img src="/landing/leetcode.png" alt="" width={30} height={30} style={{ objectFit: 'contain', display: 'block' }} />
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
 * Arc reactor, Pokeball, hammer, Pikachu scar
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
        </>
      }
      accessoryTop={
        /* Cool snapback cap */
        <div style={{ position: 'absolute', top: -16, left: '40%', transform: 'translateX(-50%) rotate(-10deg)', zIndex: 10 }}>
          {/* Cap dome */}
          <div style={{ width: 64, height: 42, background: '#2d2d2d', borderRadius: '22px 22px 0 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, background: '#FF4757', borderRadius: '50%' }} />
          </div>
          {/* Cap brim pointing left-ish */}
          <div style={{ position: 'absolute', bottom: -2, right: -12, width: 32, height: 6, background: '#FF4757', borderRadius: 3, transform: 'rotate(5deg)' }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Pokeball — right arm */}
          <div data-pokeball style={{ position: 'absolute', top: '45%', right: -30 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '3.5px solid #333', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: '#FF4757' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'white' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'white', border: '3px solid #333' }} />
              </div>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3.5, background: '#333', transform: 'translateY(-50%)', zIndex: 1 }} />
            </div>
          </div>
          {/* Mjolnir — aligned with left hand / arm */}
          <div data-culture-hammer style={{ position: 'absolute', top: '44%', left: -46, transform: 'rotate(18deg)', transformOrigin: '55% 88%' }}>
            <img src="/landing/hammer.png" alt="" width={48} height={60} style={{ display: 'block', objectFit: 'contain', pointerEvents: 'none', transform: 'scaleX(-1)' }} />
          </div>
        </>
      }
    />
  );
}

/**
 * THE HACKATHON BLOB — electric purple #9B59FF — MID
 * Dark eye bags, Monster can, exhausted droopy mouth
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
        <>
          <div style={{ position: 'absolute', top: '44%', right: -22 }}>
            <img src="/landing/monster.png" alt="" width={26} height={44} style={{ display: 'block', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
        </>
      }
    />
  );
}


