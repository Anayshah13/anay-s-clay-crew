import React from 'react';
import BlobCharacter from './BlobCharacter';
import type { BlobConfig } from './blobConfigs';

/**
 * THE NERD — mint green #A8E6CF — MID ROW
 * Wide magnified eyes (dominant glasses), small red book, smirk
 */
export function renderNerdBlob(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // EMOTION: slight upward smirk — smart expression
    <BlobCharacter {...(common as any)} eyeSize={26} mouthWidth={18} mouthHeight={6} mouthRadius="0 60% 60% 0"
      faceChildren={
        // Oversized thick glasses — dominant feature
        <div style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 1, zIndex: 3 }}>
          <div style={{ width: 30, height: 30, border: '4px solid rgba(0,0,0,0.75)', borderRadius: 6, background: 'rgba(180,220,255,0.12)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 3, left: 3, width: 6, height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: '50%' }} />
          </div>
          <div style={{ width: 6, height: 3, background: 'rgba(0,0,0,0.75)', borderRadius: 1 }} />
          <div style={{ width: 30, height: 30, border: '4px solid rgba(0,0,0,0.75)', borderRadius: 6, background: 'rgba(180,220,255,0.12)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 3, left: 3, width: 6, height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: '50%' }} />
          </div>
          <div style={{ position: 'absolute', left: -10, top: 12, width: 12, height: 2.5, background: 'rgba(0,0,0,0.7)' }} />
          <div style={{ position: 'absolute', right: -10, top: 12, width: 12, height: 2.5, background: 'rgba(0,0,0,0.7)' }} />
        </div>
      }
      accessoryBody={
        // Red book held in left hand
        <div style={{ position: 'absolute', bottom: '28%', left: -18 }}>
          <div data-book-page style={{ width: 22, height: 28, background: '#E74C3C', borderRadius: '2px 5px 5px 2px', position: 'relative', boxShadow: '2px 2px 5px rgba(0,0,0,0.25)' }}>
            <div style={{ position: 'absolute', left: 3, width: 1.5, height: '100%', background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', right: 1, top: 2, bottom: 2, width: 3, background: '#f0e8d8', borderRadius: '0 2px 2px 0' }} />
            <div style={{ position: 'absolute', top: 5, left: 5, right: 3, height: 1.5, background: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
            <div style={{ position: 'absolute', top: 9, left: 5, right: 3, height: 1.5, background: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
          </div>
        </div>
      }
    />
  );
}

/**
 * THE PUZZLE SOLVER — indigo #667eea — BACK ROW
 * BACK ROW: No accessories — body, eyes, mouth only
 */
export function renderPuzzle(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // Back row — strip all accessories for occlusion/performance
    // Eyes: wide curious expression, straight concentration mouth
    <BlobCharacter {...(common as any)} eyeSize={22} mouthWidth={18} mouthHeight={4} mouthRadius="2px" />
  );
}

/**
 * THE CLUMSY PERSON — indigo #667eea — BACK ROW
 * BACK ROW: Bandage on head, concerned brows, highly unstable
 */
export function renderClumsy(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    <BlobCharacter {...(common as any)} eyeSize={22} mouthWidth={18} mouthHeight={12} mouthRadius="50%"
      eyebrows={
        // Wobbly, concerned brows
        <div style={{ display: 'flex', gap: '14px', marginBottom: '-4px' }}>
          <div style={{ width: 14, height: 4, background: 'rgba(0,0,0,0.5)', borderRadius: 2, transform: 'rotate(-25deg)' }} />
          <div style={{ width: 14, height: 4, background: 'rgba(0,0,0,0.5)', borderRadius: 2, transform: 'rotate(25deg)' }} />
        </div>
      }
      accessoryTop={
        // Bandage on head
        <div style={{ position: 'absolute', top: 5, left: '20%', transform: 'rotate(-15deg)' }}>
          <div style={{ width: 18, height: 8, background: '#f5d5cc', borderRadius: 2, border: '1px solid #dca79a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 4, height: 4, background: 'white', opacity: 0.6 }} />
          </div>
        </div>
      }
    />
  );
}

/**
 * THE SLEEPY ONE — warm yellow #FFD93D — BACK ROW
 * GLACIAL motion, heavy drooping lids, barely-there droopy line mouth
 * BACK ROW: keep accessories (just visible)
 */
export function renderSleepy(cfg: BlobConfig, common: Record<string, unknown>) {
  const c = common as any;
  // Sleepy is awake if not dark, OR if explicitly woken up
  const isAwake = !c.isDark || c.isSleepyAwake;
  const isNightSleep = c.isDark && !c.isSleepyAwake;
  
  return (
    // EMOTION: SLEEPINESS — drooping heavy lids via eyelidClose, droopy line mouth
    <BlobCharacter {...c}
      eyeSize={20}
      eyelidClose={isAwake ? 0.1 : 0.85}
      mouthWidth={14} mouthHeight={isAwake ? 12 : 3} mouthRadius={isAwake ? "50%" : "0 0 50% 50%"}
      eyebrows={
        // Very heavy droopy brows — inner corners up (opposite of anger)
        <div style={{ display: 'flex', gap: '16px', marginBottom: '-2px' }}>
          <div style={{ width: 16, height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 4, transform: isAwake ? 'rotate(-5deg)' : 'rotate(14deg)' }} />
          <div style={{ width: 16, height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 4, transform: isAwake ? 'rotate(5deg)' : 'rotate(-14deg)' }} />
        </div>
      }
      accessoryTop={
        /* Night cap — drooping to one side */
        <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%) rotate(18deg)', transformOrigin: 'bottom center' }}>
          <div style={{ width: 28, height: 34, background: '#3498DB', borderRadius: '50% 50% 0 0', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: -3, left: -4, width: 36, height: 8, background: 'white', borderRadius: 4 }} />
            <div style={{ position: 'absolute', top: -6, right: -4, width: 10, height: 10, background: 'white', borderRadius: '50%' }} />
          </div>
        </div>
      }
      accessoryBody={
        // Teddy bear under arm only — minimal
        <div style={{ position: 'absolute', bottom: '12%', left: -16 }}>
          <div style={{ width: 14, height: 14, background: '#C19A6B', borderRadius: '50%', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -4, left: 0, width: 6, height: 6, background: '#C19A6B', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: -4, right: 0, width: 6, height: 6, background: '#C19A6B', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: 3, left: 2, width: 3, height: 3, background: '#333', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: 3, right: 2, width: 3, height: 3, background: '#333', borderRadius: '50%' }} />
          </div>
        </div>
      }
    >
      {/* Z z z floats */}
      {isNightSleep && ['Z', 'z', 'z'].map((z, zi) => (
        <div key={zi} data-zzz style={{
          position: 'absolute', top: -8 - zi * 14, right: 2 + zi * 9,
          fontSize: 13 + zi * 4, fontWeight: 700,
          color: '#89C9C9', fontFamily: 'serif'
        }}>{z}</div>
      ))}
    </BlobCharacter>
  );
}

/**
 * THE GRAPHIC DESIGNER — coral red #FF6B6B — BACK ROW
 * BACK ROW: No accessories, creative absorbed smirk mouth
 */
export function renderGraphicDesigner(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // MOUTH: creative asymmetric smirk
    <BlobCharacter {...(common as any)} eyeSize={22}
      mouthWidth={22} mouthHeight={7} mouthRadius="0 70% 60% 10%"
      eyebrows={
        <div style={{ display: 'flex', gap: '16px', marginBottom: '-2px' }}>
          <div style={{ width: 14, height: 3.5, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(-4deg)' }} />
          <div style={{ width: 14, height: 3.5, background: 'rgba(0,0,0,0.4)', borderRadius: 2, transform: 'rotate(-14deg) translateY(-5px)' }} />
        </div>
      }
      accessoryTop={
        /* Beret hat */
        <div style={{ position: 'absolute', top: -14, left: '46%', transform: 'translateX(-50%) rotate(-10deg)' }}>
          <div style={{ width: 34, height: 14, background: '#222', borderRadius: '17px 17px 4px 4px' }} />
          <div style={{ position: 'absolute', top: -3, left: '50%', width: 4, height: 4, background: '#222', borderRadius: '50%' }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Color palette */}
          <div style={{ position: 'absolute', bottom: '25%', left: -22, transform: 'rotate(-15deg)' }}>
            <div style={{ width: 28, height: 20, background: '#e8c9a5', borderRadius: '14px', position: 'relative' }}>
              <div style={{ position: 'absolute', right: 4, top: 4, width: 6, height: 6, background: '#fff', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', left: 4, top: 4, width: 6, height: 6, background: '#FF4757', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', left: 10, top: 12, width: 6, height: 6, background: '#4285F4', borderRadius: '50%' }} />
            </div>
          </div>
          {/* Stylus / pencil */}
          <div style={{ position: 'absolute', top: '35%', right: -14, transform: 'rotate(25deg)' }}>
            <div style={{ width: 4, height: 24, background: '#feca57', borderRadius: 2, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -4, left: 0, width: 4, height: 4, background: '#333', borderRadius: '2px 2px 0 0' }} />
            </div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE CHEF — orange pear-shape — MID ROW
 * Concentration O-shaped mouth, chef hat, vada pav pan
 */
export function renderChef(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // MOUTH: concentration O — circular open
    <BlobCharacter {...(common as any)} eyeSize={20} mouthWidth={16} mouthHeight={16} mouthRadius="50%"
      accessoryTop={
        /* Chef hat */
        <div style={{ position: 'absolute', top: -34, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 38, height: 28, background: 'white', borderRadius: '8px 8px 0 0', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 2, left: 4, width: 15, height: 13, background: 'rgba(240,240,240,1)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: 0, right: 4, width: 13, height: 11, background: 'rgba(245,245,245,1)', borderRadius: '50%' }} />
          </div>
          <div style={{ width: 52, height: 8, background: 'white', borderRadius: 3, marginTop: -1, boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.08)' }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Frying pan with vada pav */}
          <div data-chef-pan style={{ position: 'absolute', top: '32%', right: -30 }}>
            <div style={{ width: 28, height: 28, background: '#555', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3)', position: 'relative' }}>
              <div style={{ position: 'absolute', right: -13, top: '50%', transform: 'translateY(-50%)', width: 13, height: 5, background: '#8B4513', borderRadius: 3 }} />
              {/* Vada pav */}
              <div style={{ position: 'absolute', top: 4, left: 4, width: 16, height: 12, background: '#D4A96A', borderRadius: '50% 50% 40% 40%' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 1, right: 1, height: 5, background: '#8B6914', borderRadius: '0 0 40% 40%' }} />
              </div>
            </div>
          </div>
          {/* Steam */}
          {[0,1].map(si => (
            <div key={si} data-steam style={{ position: 'absolute', top: '16%', right: -8 + si * 6, fontSize: 9, opacity: 0.8 }}>🌶️</div>
          ))}
          {/* Apron stripe */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', width: cfg.w * 0.45, height: cfg.h * 0.2, background: 'rgba(255,255,255,0.5)', borderRadius: '0 0 8px 8px' }} />
        </>
      }
    />
  );
}

/**
 * THE ASTRONAUT — near-white #E8E8FF — BACK ROW
 * BACK ROW: Keep helmet ring (part of face), strip other accessories, small nervous smile
 */
export function renderAstronaut(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // MOUTH: small nervous smile
    <BlobCharacter {...(common as any)} eyeSize={22} mouthWidth={14} mouthHeight={8} mouthRadius="0 0 60% 60%"
      faceChildren={
        <>
          {/* Outer Helmet Dome - kept in face for proper overlapping */}
          <div style={{
            position: 'absolute', top: '-18%', left: '50%', transform: 'translateX(-50%)',
            width: cfg.w * 0.85, height: cfg.w * 0.85,
            border: '8px solid rgba(220,230,250,0.95)',
            borderRadius: '50%',
            /* Light transparent white to not hide eyes */
            background: 'rgba(255,255,255,0.05)',
            boxShadow: 'inset 0 0 16px rgba(100,200,255,0.4)',
            zIndex: 4, pointerEvents: 'none'
          }}>
            <div style={{ position: 'absolute', top: '15%', left: '15%', width: '30%', height: '14%', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', transform: 'rotate(-30deg)' }} />
          </div>
          {/* Chest control panel */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', width: 44, height: 34, background: '#eee', borderRadius: 4, border: '2px solid #ccc', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: 4, left: 4, width: 12, height: 8, background: '#222', borderRadius: 2 }} />
            <div style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, background: '#FF4757', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: 14, right: 4, width: 6, height: 6, background: '#4285F4', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: 4, left: 4, width: 24, height: 6, background: '#ccc', borderRadius: 2 }} />
          </div>
         
        </>
      }
    />
  );
}

/**
 * THE DETECTIVE — dark brown #4A3728 — BACK ROW
 * BACK ROW: keep only deerstalker hat (on head), pipe at mouth corner — strip magnifier/monocle
 * MOUTH: side-pipe smirk
 */
export function renderDetective(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // MOUTH: distinctive side-pipe smirk — shifted right
    <BlobCharacter {...(common as any)} mouthWidth={16} mouthHeight={5} mouthRadius="0 0 70% 30%"
      accessoryTop={
        // Deerstalker hat — keep (it's on top, visible)
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: cfg.w * 0.62, height: 14, background: '#6B4423', borderRadius: '50% 50% 0 0', position: 'relative' }}>
            <div style={{ position: 'absolute', left: -8, bottom: 0, width: 15, height: 9, background: '#7B5433', borderRadius: '0 0 4px 4px', transform: 'rotate(-15deg)' }} />
            <div style={{ position: 'absolute', right: -8, bottom: 0, width: 15, height: 9, background: '#7B5433', borderRadius: '0 0 4px 4px', transform: 'rotate(15deg)' }} />
          </div>
        </div>
      }
      faceChildren={
        // Cigarette in mouth corner
        <div style={{ position: 'absolute', bottom: '22%', right: '16%', zIndex: 5, transform: 'rotate(-10deg)', transformOrigin: 'left center' }}>
          <div style={{ width: 18, height: 3.5, background: '#fff', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, width: 4, height: '100%', background: '#ff7e67', borderRadius: '0 2px 2px 0' }} />
            {/* Smoke wisp */}
            <div style={{ position: 'absolute', right: -6, top: -8, fontSize: 8, color: 'rgba(255,255,255,0.6)', transform: 'rotate(20deg)' }}>≈</div>
          </div>
        </div>
      }
      accessoryBody={
        <>
          {/* Magnifying Glass */}
          <div style={{ position: 'absolute', top: '50%', right: -10, transform: 'rotate(-25deg)' }}>
            <div style={{ width: 8, height: 26, background: '#5B3413', borderRadius: '0 0 4px 4px', position: 'relative', left: 10 }}>
              <div style={{ position: 'absolute', top: -20, left: -10, width: 28, height: 28, border: '4px solid #gold', background: 'rgba(200,220,255,0.4)', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.3)', borderColor: '#DAA520' }}>
                <div style={{ position: 'absolute', top: 2, left: 2, width: 8, height: 4, background: 'rgba(255,255,255,0.6)', borderRadius: '50%', transform: 'rotate(-45deg)' }} />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

/**
 * THE TINY STRANGER — soft lavender #C9B1FF — BACK ROW (deliberate tiny)
 * NO accessories — only massive eyes, tiny smile. Most reactive eye tracking.
 */
export function renderTinyStranger(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // Eyes are ~60% face width relative to this tiny blob
    // eyeSize=24px on a 72px wide blob = enormous eyes
    // MOUTH: tiny 16px subtle curve — almost imperceptible
    <BlobCharacter {...(common as any)}
      eyeSize={22}
      mouthWidth={14} mouthHeight={5} mouthRadius="0 0 60% 60%"
      // No arms, no accessories, no eyebrows — pure alien wide-eyed innocence
      hideLeftArm hideRightArm
    />
  );
}

/**
 * THE ANGRY — red circle #FF4757 — BACK ROW
 * RAGE: V-brows at steep angle, jagged downward frown with teeth, crossed arms
 * BACK ROW: no accessories except the crossed arms
 */
export function renderAngry(cfg: BlobConfig, common: Record<string, unknown>) {
  return (
    // EMOTION: PURE RAGE — beady small eyes, sharp V-brows, jagged frown
    <BlobCharacter {...(common as any)}
      eyeSize={14}
      mouthWidth={24} mouthHeight={7} mouthRadius="50% 50% 0 0"
      armLength={28} hideLeftArm hideRightArm
      eyebrows={
        <div style={{ display: 'flex', gap: '8px', marginBottom: '-6px' }}>
          {/* V-brows: inner edges SLAM down hard */}
          <div style={{ width: 15, height: 5, background: 'rgba(0,0,0,0.7)', borderRadius: 2, transform: 'rotate(26deg)' }} />
          <div style={{ width: 15, height: 5, background: 'rgba(0,0,0,0.7)', borderRadius: 2, transform: 'rotate(-26deg)' }} />
        </div>
      }
      faceChildren={
        /* Jagged frown teeth */
        <div style={{ position: 'absolute', bottom: '23%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2, zIndex: 4 }}>
          {[9,6,8,6,9].map((h, i) => (
            <div key={i} style={{ width: 5, height: h, background: 'rgba(255,255,255,0.9)', borderRadius: '0 0 1px 1px' }} />
          ))}
        </div>
      }
    >
      {/* Crossed arms */}
      <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <div style={{ width: 18, height: 30, background: cfg.color, borderRadius: 50, position: 'absolute', left: -14, transform: 'rotate(35deg)', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.2)' }} />
        <div style={{ width: 18, height: 30, background: cfg.color, borderRadius: 50, position: 'absolute', right: -14, transform: 'rotate(-35deg)', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.2)' }} />
      </div>
      <div style={{ position: 'absolute', top: -10, left: '25%', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>💢</div>
    </BlobCharacter>
  );
}
