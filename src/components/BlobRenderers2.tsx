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
 * THE SLEEPY ONE (night owl) — warm yellow #FFD93D — BACK ROW
 * Dark mode: tired but pleasant / “awake but sleepy”. Light mode: heavier daydream lids.
 * Brows stay soft — never steep / furrowed (no angry read).
 */
export function renderSleepy(cfg: BlobConfig, common: Record<string, unknown>) {
  const c = common as any;
  const isDark = !!c.isDark;
  const perked = !!c.isSleepyAwake;
  // Dark = lighter lids; light = sleepier. Click perks everyone up a notch.
  let eyelidClose = isDark ? 0.28 : 0.55;
  if (perked) eyelidClose = Math.max(0.08, eyelidClose - 0.18);
  const mouthH = isDark ? 9 : 5;
  const mouthR = isDark ? '0 0 55% 55%' : '0 0 50% 50%';

  return (
    <BlobCharacter {...c}
      eyeSize={20}
      eyelidClose={eyelidClose}
      mouthWidth={16} mouthHeight={mouthH} mouthRadius={mouthR}
      eyebrows={
        <div style={{ display: 'flex', gap: '18px', marginBottom: '-1px' }}>
          <div style={{ width: 15, height: 3, background: 'rgba(0,0,0,0.22)', borderRadius: 4, transform: 'rotate(4deg)' }} />
          <div style={{ width: 15, height: 3, background: 'rgba(0,0,0,0.22)', borderRadius: 4, transform: 'rotate(-4deg)' }} />
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
      {/* Soft Zzz only when extra-drowsy (light mode), not full “passed out” */}
      {!isDark && !perked && ['z', 'z'].map((z, zi) => (
        <div key={zi} data-zzz style={{
          position: 'absolute', top: 2 - zi * 11, right: 4 + zi * 10,
          fontSize: 10 + zi * 2, fontWeight: 600,
          color: 'rgba(100, 140, 160, 0.45)', fontFamily: 'serif'
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
        /* Beret — slightly larger */
        <div style={{ position: 'absolute', top: -16, left: '46%', transform: 'translateX(-50%) rotate(-10deg)' }}>
          <div style={{ width: 42, height: 17, background: '#1a1a1a', borderRadius: '21px 21px 5px 5px', boxShadow: 'inset 0 -2px 0 rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', top: -4, left: '52%', width: 5, height: 5, background: '#1a1a1a', borderRadius: '50%' }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Paintbrush — left hand (swapped from right) */}
          <div style={{ position: 'absolute', bottom: '25%', left: -18, transform: 'rotate(-18deg)' }}>
            <div style={{ width: 4, height: 24, background: '#feca57', borderRadius: 2, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -4, left: 0, width: 4, height: 4, background: '#333', borderRadius: '2px 2px 0 0' }} />
            </div>
          </div>
          {/* Hand-held wooden palette — tucked toward right hand */}
          <div style={{ position: 'absolute', top: '58%', right: -32, transform: 'rotate(14deg)', transformOrigin: '20% 80%' }}>
            <div style={{ position: 'relative', width: 36, height: 26, filter: 'drop-shadow(1px 2px 0 rgba(0,0,0,0.12))' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(145deg, #d4a574 0%, #b8895e 45%, #9a734f 100%)',
                borderRadius: '46% 54% 42% 58% / 48% 45% 55% 52%',
                border: '1.5px solid rgba(60,40,30,0.35)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
              }} />
              <div style={{ position: 'absolute', left: '42%', top: '18%', width: 9, height: 11, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fff 0%, #f1f1f1 40%, #ddd 100%)', border: '1px solid rgba(0,0,0,0.2)', boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.15)' }} />
              <div style={{ position: 'absolute', right: '12%', top: '22%', width: 8, height: 8, borderRadius: '50%', background: 'radial-gradient(circle at 25% 25%, #ff8a8a 0%, #e74c3c 70%)', border: '1px solid rgba(0,0,0,0.2)' }} />
              <div style={{ position: 'absolute', left: '18%', bottom: '18%', width: 8, height: 8, borderRadius: '50%', background: 'radial-gradient(circle at 30% 25%, #8ec5ff 0%, #2d7dd2 75%)', border: '1px solid rgba(0,0,0,0.2)' }} />
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
        <div style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 38, height: 28, background: 'white', borderRadius: '8px 8px 0 0', boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 2, left: 4, width: 15, height: 13, background: 'rgba(240,240,240,1)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: 0, right: 4, width: 13, height: 11, background: 'rgba(245,245,245,1)', borderRadius: '50%' }} />
          </div>
          <div style={{ width: 52, height: 8, background: 'white', borderRadius: 3, marginTop: -1, boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.08)' }} />
        </div>
      }
      accessoryBody={
        <>
          {/* Frying pan */}
          <div data-chef-pan style={{ position: 'absolute', top: '32%', right: -30 }}>
            <div style={{ width: 28, height: 28, background: '#555', borderRadius: '50%', boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3)', position: 'relative' }}>
              <div style={{ position: 'absolute', right: -13, top: '50%', transform: 'translateY(-50%)', width: 13, height: 5, background: '#8B4513', borderRadius: 3 }} />
            </div>
          </div>
          {/* Steam */}
          {[0,1].map(si => (
            <div key={si} data-steam style={{ position: 'absolute', top: '16%', right: -8 + si * 6, fontSize: 9, opacity: 0.8 }}>🌶️</div>
          ))}
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
    <BlobCharacter {...(common as any)} eyeSize={24} mouthWidth={16} mouthHeight={5} mouthRadius="0 0 70% 30%"
      accessoryTop={
        // Deerstalker — cap band scales with slightly larger blob
        <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: cfg.w * 0.58, height: 16, background: '#6B4423', borderRadius: '50% 50% 0 0', position: 'relative', boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.12)' }}>
            <div style={{ position: 'absolute', left: -9, bottom: 0, width: 17, height: 10, background: '#7B5433', borderRadius: '0 0 4px 4px', transform: 'rotate(-15deg)' }} />
            <div style={{ position: 'absolute', right: -9, bottom: 0, width: 17, height: 10, background: '#7B5433', borderRadius: '0 0 4px 4px', transform: 'rotate(15deg)' }} />
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
          <div style={{ position: 'absolute', top: '50%', right: -10, transform: 'rotate(25deg)' }}>
            <div style={{ width: 9, height: 30, background: '#5B3413', borderRadius: '0 0 4px 4px', position: 'relative', left: 11 }}>
              <div style={{ position: 'absolute', top: -22, left: -11, width: 32, height: 32, border: '4px solid #DAA520', background: 'rgba(200,220,255,0.42)', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
                <div style={{ position: 'absolute', top: 3, left: 3, width: 10, height: 5, background: 'rgba(255,255,255,0.55)', borderRadius: '50%', transform: 'rotate(-45deg)' }} />
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
