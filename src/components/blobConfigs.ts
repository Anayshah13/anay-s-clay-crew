// Shape constants shared across all blobs
export const SHAPES = {
  A: '48% 52% 45% 55% / 50% 48% 52% 50%',       // Tall egg (default)
  B: '30% 35% 30% 35% / 32% 30% 35% 30%',       // Stubby
  C: '50% 50% 45% 45% / 60% 60% 40% 40%',       // Wide squash (wider than tall)
  D: '50% 50% 45% 45% / 40% 40% 55% 55%',       // Pear (narrow top, wide bottom)
  E: '42% 58% 55% 45% / 48% 52% 48% 52%',       // Classic pill
  F: '50%',                                       // Perfect circle
  G: '50% 50% 45% 45% / 35% 35% 60% 60%',       // Wide squash variant
  H: '38% 62% 55% 45% / 45% 38% 62% 55%',       // Lumpy potato
  I: '40% 40% 50% 50% / 50% 50% 40% 40%',       // Stubby round
  J: '50% 50% 50% 50% / 60% 60% 40% 40%',       // Teardrop
  K: '28% 32% 30% 28% / 30% 28% 32% 30%',       // Chunky square (Minecraft-ish)
  L: '42% 58% 55% 45% / 48% 52% 48% 52%',       // Lumpy potato variant
} as const;

export interface BlobAnimConfig {
  breathDuration: number;
  leftArmRange: [number, number];
  leftArmDuration: number;
  rightArmRange: [number, number];
  rightArmDuration: number;
  legSwayDuration: number;
  cursorResponsiveness: number;
  eyeLag: number;
  fearRadius: number;
}

export type RowType = 'front' | 'mid' | 'back';

export interface BlobConfig {
  id: string;
  color: string;
  shape: string;
  w: number;
  h: number;
  x: string;
  bottom: string;
  z: number;
  row: RowType;
  anim: BlobAnimConfig;
  eyelidClose?: number;
}

export const BLOB_CONFIGS: BlobConfig[] = [
  // ── FRONT ROW ──────────────────────────────────────────────────────────────
  {
    id: 'dev', color: '#DAFC92', shape: SHAPES.A, w: 195, h: 234,
    x: '56%', bottom: '-10px', z: 16, row: 'front',
    eyelidClose: 0.1,
    // Focused — moderate rhythm
    anim: { breathDuration: 2.1, leftArmRange: [-15, 25], leftArmDuration: 1.8, rightArmRange: [-8, 18], rightArmDuration: 2.4, legSwayDuration: 1.3, cursorResponsiveness: 1.8, eyeLag: 0.03, fearRadius: 170 },
  },
  {
    // REPLACED: was 'lol'. Now: THE MINECRAFT PLAYER
    id: 'minecraft', color: '#5B8C5A', shape: SHAPES.K, w: 185, h: 222,
    x: '40%', bottom: '-15px', z: 15, row: 'front',
    // Rhythmic — sword arm raise
    anim: { breathDuration: 2.0, leftArmRange: [-20, 10], leftArmDuration: 1.4, rightArmRange: [-10, 40], rightArmDuration: 1.2, legSwayDuration: 1.8, cursorResponsiveness: 1.5, eyeLag: 0.04, fearRadius: 145 },
  },
  {
    id: 'lego', color: '#FFD93D', shape: SHAPES.C, w: 175, h: 210,
    x: '74%', bottom: '-5px', z: 14, row: 'front',
    // Joyful, strong enthusiasm
    anim: { breathDuration: 1.9, leftArmRange: [-20, 15], leftArmDuration: 2.0, rightArmRange: [-10, 40], rightArmDuration: 1.5, legSwayDuration: 1.6, cursorResponsiveness: 1.2, eyeLag: 0.08, fearRadius: 155 },
  },
  {
    // REPLACED: was 'marsrover'. Now: THE FUNNY GUY
    id: 'funnyguy', color: '#FF8C00', shape: SHAPES.H, w: 180, h: 216,
    x: '30%', bottom: '-10px', z: 14, row: 'front',
    // ERRATIC — irregular, fast erratic bounce, larger ranges. 3× dramatic
    anim: { breathDuration: 0.7, leftArmRange: [-40, 30], leftArmDuration: 0.5, rightArmRange: [-50, 45], rightArmDuration: 0.4, legSwayDuration: 0.5, cursorResponsiveness: 2.0, eyeLag: 0.02, fearRadius: 120 },
  },
  {
    // REPLACED: was 'injured'. Now: THE POP CULTURE FREAK
    id: 'popculture', color: '#E91E8C', shape: SHAPES.E, w: 175, h: 210,
    x: '82%', bottom: '-5px', z: 14, row: 'front',
    anim: { breathDuration: 1.6, leftArmRange: [-15, 25], leftArmDuration: 1.8, rightArmRange: [-30, 20], rightArmDuration: 1.1, legSwayDuration: 1.4, cursorResponsiveness: 1.6, eyeLag: 0.05, fearRadius: 155 },
  },
  {
    id: 'hackathon', color: '#9B59FF', shape: SHAPES.E, w: 175, h: 210,
    x: '88%', bottom: '20px', z: 9, row: 'mid',
    eyelidClose: 0.35,
    anim: { breathDuration: 2.0, leftArmRange: [-8, 18], leftArmDuration: 2.0, rightArmRange: [-25, 20], rightArmDuration: 1.3, legSwayDuration: 1.7, cursorResponsiveness: 1.0, eyeLag: 0.10, fearRadius: 160 },
  },

  // ── MID ROW ────────────────────────────────────────────────────────────────
  {
    id: 'cprog', color: '#1E488F', shape: SHAPES.A, w: 160, h: 192,
    x: '48%', bottom: '140px', z: 13, row: 'mid',
    // LOCKED-IN — flat, almost zero movement. Eye lag very fast
    anim: { breathDuration: 2.6, leftArmRange: [-5, 8], leftArmDuration: 3.5, rightArmRange: [-3, 6], rightArmDuration: 4.0, legSwayDuration: 3.0, cursorResponsiveness: 1.9, eyeLag: 0.02, fearRadius: 185 },
  },
  {
    id: 'nerd', color: '#A8E6CF', shape: SHAPES.I, w: 155, h: 186,
    x: '65%', bottom: '120px', z: 10, row: 'mid',
    anim: { breathDuration: 2.3, leftArmRange: [-10, 25], leftArmDuration: 2.0, rightArmRange: [-8, 14], rightArmDuration: 2.8, legSwayDuration: 1.9, cursorResponsiveness: 0.9, eyeLag: 0.12, fearRadius: 175 },
  },
  {
    id: 'chef', color: '#FF8C42', shape: SHAPES.D, w: 150, h: 180,
    x: '60%', bottom: '200px', z: 7, row: 'mid',
    anim: { breathDuration: 2.2, leftArmRange: [-8, 18], leftArmDuration: 2.0, rightArmRange: [-25, 20], rightArmDuration: 1.3, legSwayDuration: 1.7, cursorResponsiveness: 1.0, eyeLag: 0.10, fearRadius: 160 },
  },

  // ── BACK ROW ───────────────────────────────────────────────────────────────
  {
    id: 'philosopher', color: '#667eea', shape: SHAPES.J, w: 128, h: 154,
    x: '72%', bottom: '280px', z: 7, row: 'back',
    anim: { breathDuration: 3.0, leftArmRange: [-8, 12], leftArmDuration: 3.0, rightArmRange: [-10, 18], rightArmDuration: 3.5, legSwayDuration: 2.0, cursorResponsiveness: 0.5, eyeLag: 0.22, fearRadius: 180 },
  },
  {
    id: 'sleepy', color: '#FFD93D', shape: SHAPES.G, w: 122, h: 146,
    x: '53%', bottom: '300px', z: 6, row: 'back',
    eyelidClose: 0.65,
    // GLACIAL — 3× slow. Barely moves
    anim: { breathDuration: 7.5, leftArmRange: [-3, 5], leftArmDuration: 9.0, rightArmRange: [-2, 4], rightArmDuration: 11.0, legSwayDuration: 8.0, cursorResponsiveness: 0.3, eyeLag: 0.35, fearRadius: 180 },
  },
  {
    // REPLACED: was 'cool'. Now: THE GRAPHIC DESIGNER
    id: 'graphicdesigner', color: '#FF6B6B', shape: SHAPES.G, w: 148, h: 148,
    x: '82%', bottom: '270px', z: 5, row: 'back',
    // Back row — accessories stripped
    anim: { breathDuration: 2.0, leftArmRange: [-15, 10], leftArmDuration: 2.4, rightArmRange: [-35, 20], rightArmDuration: 0.4, legSwayDuration: 1.6, cursorResponsiveness: 0.9, eyeLag: 0.11, fearRadius: 200 },
  },
  {
    id: 'astronaut', color: '#E8E8FF', shape: SHAPES.I, w: 118, h: 142,
    x: '64%', bottom: '340px', z: 4, row: 'back',
    anim: { breathDuration: 2.7, leftArmRange: [-10, 15], leftArmDuration: 2.5, rightArmRange: [-12, 20], rightArmDuration: 2.9, legSwayDuration: 1.9, cursorResponsiveness: 0.6, eyeLag: 0.14, fearRadius: 160 },
  },
  {
    id: 'angry', color: '#FF4757', shape: SHAPES.F, w: 112, h: 112,
    x: '45%', bottom: '270px', z: 3, row: 'back',
    // RAPID TWITCH — 0.3× duration
    anim: { breathDuration: 0.45, leftArmRange: [-2, 3], leftArmDuration: 0.3, rightArmRange: [-2, 3], rightArmDuration: 0.3, legSwayDuration: 0.3, cursorResponsiveness: 0.5, eyeLag: 0.05, fearRadius: 80 },
  },
  {
    id: 'detective', color: '#4A3728', shape: SHAPES.H, w: 120, h: 144,
    x: '88%', bottom: '210px', z: 2, row: 'back',
    anim: { breathDuration: 2.7, leftArmRange: [-10, 15], leftArmDuration: 2.5, rightArmRange: [-12, 20], rightArmDuration: 2.9, legSwayDuration: 1.9, cursorResponsiveness: 0.6, eyeLag: 0.14, fearRadius: 160 },
  },
  {
    // REPLACED: was 'wildcard'. Now: THE TINY STRANGER
    id: 'tinystranger', color: '#C9B1FF', shape: SHAPES.F, w: 72, h: 72,
    x: '96%', bottom: '215px', z: 8, row: 'back',
    // Minimal — just breathing, very responsive eyes
    anim: { breathDuration: 3.5, leftArmRange: [-2, 2], leftArmDuration: 4.0, rightArmRange: [-2, 2], rightArmDuration: 4.5, legSwayDuration: 4.0, cursorResponsiveness: 0.4, eyeLag: 0.04, fearRadius: 120 },
  },
];
