// Shape constants shared across all blobs
export const SHAPES = {
  A: '48% 52% 45% 55% / 50% 48% 52% 50%',   // Classic Pill
  B: '30% 35% 30% 35% / 32% 30% 35% 30%',   // Chunky Square
  C: '50% 50% 45% 45% / 60% 60% 40% 40%',   // Tall Egg
  D: '50% 50% 45% 45% / 40% 40% 55% 55%',   // Wide Squash
  E: '42% 58% 55% 45% / 48% 52% 48% 52%',   // Lumpy Potato
  F: '50%',                                    // Tiny Round
  G: '50% 50% 45% 45% / 35% 35% 60% 60%',   // Pear (wide bottom)
  H: '38% 62% 55% 45% / 45% 38% 62% 55%',   // Diamond (lopsided)
  I: '40% 40% 50% 50% / 50% 50% 40% 40%',   // Stubby (flat head wide body)
  J: '50% 50% 50% 50% / 60% 60% 40% 40%',   // Teardrop (taller top)
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

// Row types for layering
export type RowType = 'front' | 'mid' | 'back';

export interface BlobConfig {
  id: string;
  color: string;
  shape: string;
  w: number;
  h: number;
  x: string;      // left position (% of container)
  bottom: string;  // bottom position
  z: number;
  row: RowType;
  anim: BlobAnimConfig;
  eyelidClose?: number;
}

export const BLOB_CONFIGS: BlobConfig[] = [
  // ---- FRONT ROW (z: 10-16) — bottom: 0-5%, sizes 160-200px ----
  // All shifted right, spaced to avoid overlap
  {
    id: 'angry', color: '#FF4757', shape: SHAPES.F, w: 115, h: 130,
    x: '24%', bottom: '2%', z: 15, row: 'front',
    anim: { breathDuration: 1.4, leftArmRange: [-3, 5], leftArmDuration: 3.0, rightArmRange: [-3, 5], rightArmDuration: 3.2, legSwayDuration: 0.3, cursorResponsiveness: 0.5, eyeLag: 0.05, fearRadius: 80 },
  },
  {
    id: 'gamer', color: '#4ECDC4', shape: SHAPES.A, w: 165, h: 198,
    x: '38%', bottom: '0%', z: 13, row: 'front',
    eyelidClose: 0.3,
    anim: { breathDuration: 1.6, leftArmRange: [-30, 10], leftArmDuration: 0.9, rightArmRange: [-5, 35], rightArmDuration: 1.1, legSwayDuration: 2.1, cursorResponsiveness: 1.4, eyeLag: 0.04, fearRadius: 140 },
  },
  {
    id: 'dev', color: '#DAFC92', shape: SHAPES.A, w: 185, h: 220,
    x: '55%', bottom: '0%', z: 14, row: 'front',
    eyelidClose: 0.15,
    anim: { breathDuration: 2.1, leftArmRange: [-15, 25], leftArmDuration: 1.8, rightArmRange: [-8, 18], rightArmDuration: 2.4, legSwayDuration: 1.3, cursorResponsiveness: 0.9, eyeLag: 0.06, fearRadius: 160 },
  },
  {
    id: 'party', color: '#FF6B9D', shape: SHAPES.C, w: 160, h: 192,
    x: '72%', bottom: '0%', z: 12, row: 'front',
    anim: { breathDuration: 1.9, leftArmRange: [-20, 15], leftArmDuration: 2.0, rightArmRange: [-10, 40], rightArmDuration: 1.5, legSwayDuration: 1.6, cursorResponsiveness: 1.2, eyeLag: 0.08, fearRadius: 150 },
  },
  {
    id: 'astronaut', color: '#E8E8FF', shape: SHAPES.I, w: 175, h: 210,
    x: '89%', bottom: '0%', z: 11, row: 'front',
    anim: { breathDuration: 2.5, leftArmRange: [-12, 20], leftArmDuration: 2.8, rightArmRange: [-15, 15], rightArmDuration: 3.0, legSwayDuration: 2.5, cursorResponsiveness: 0.7, eyeLag: 0.10, fearRadius: 170 },
  },

  // ---- MID ROW (z: 5-9) — bottom: 10-22%, sizes 130-155px ----
  {
    id: 'chef', color: '#FF8C42', shape: SHAPES.G, w: 145, h: 174,
    x: '30%', bottom: '15%', z: 7, row: 'mid',
    anim: { breathDuration: 2.2, leftArmRange: [-8, 18], leftArmDuration: 2.0, rightArmRange: [-25, 20], rightArmDuration: 1.3, legSwayDuration: 1.7, cursorResponsiveness: 1.0, eyeLag: 0.10, fearRadius: 160 },
  },
  {
    id: 'nerd', color: '#A8E6CF', shape: SHAPES.I, w: 138, h: 166,
    x: '44%', bottom: '16%', z: 7, row: 'mid',
    anim: { breathDuration: 2.6, leftArmRange: [-10, 30], leftArmDuration: 2.3, rightArmRange: [-8, 12], rightArmDuration: 3.1, legSwayDuration: 1.8, cursorResponsiveness: 0.8, eyeLag: 0.12, fearRadius: 180 },
  },
  {
    id: 'detective', color: '#4A3728', shape: SHAPES.H, w: 138, h: 166,
    x: '57%', bottom: '20%', z: 5, row: 'mid',
    anim: { breathDuration: 2.7, leftArmRange: [-10, 15], leftArmDuration: 2.5, rightArmRange: [-12, 20], rightArmDuration: 2.9, legSwayDuration: 1.9, cursorResponsiveness: 0.6, eyeLag: 0.14, fearRadius: 160 },
  },
  {
    id: 'cool', color: '#2F3542', shape: SHAPES.A, w: 150, h: 180,
    x: '70%', bottom: '12%', z: 9, row: 'mid',
    anim: { breathDuration: 2.8, leftArmRange: [-5, 10], leftArmDuration: 3.5, rightArmRange: [-8, 8], rightArmDuration: 3.8, legSwayDuration: 2.0, cursorResponsiveness: 0.4, eyeLag: 0.15, fearRadius: 80 },
  },
  {
    id: 'explorer', color: '#E8845A', shape: SHAPES.G, w: 148, h: 178,
    x: '82%', bottom: '14%', z: 8, row: 'mid',
    anim: { breathDuration: 2.3, leftArmRange: [-18, 22], leftArmDuration: 2.1, rightArmRange: [-25, 10], rightArmDuration: 2.6, legSwayDuration: 1.5, cursorResponsiveness: 1.1, eyeLag: 0.07, fearRadius: 180 },
  },
  {
    id: 'pirate', color: '#8B4513', shape: SHAPES.H, w: 142, h: 170,
    x: '94%', bottom: '18%', z: 6, row: 'mid',
    anim: { breathDuration: 2.0, leftArmRange: [-20, 15], leftArmDuration: 1.9, rightArmRange: [-15, 25], rightArmDuration: 2.2, legSwayDuration: 1.4, cursorResponsiveness: 1.0, eyeLag: 0.09, fearRadius: 140 },
  },

  // ---- BACK ROW (z: 1-4) — bottom: 28-45%, sizes 110-125px ----
  {
    id: 'wildcard', color: '#DAFC92', shape: SHAPES.J, w: 112, h: 134,
    x: '32%', bottom: '38%', z: 1, row: 'back',
    anim: { breathDuration: 1.7, leftArmRange: [-40, 30], leftArmDuration: 1.2, rightArmRange: [-45, 45], rightArmDuration: 0.5, legSwayDuration: 1.0, cursorResponsiveness: 1.5, eyeLag: 0.06, fearRadius: 180 },
  },
  {
    id: 'philosopher', color: '#667eea', shape: SHAPES.J, w: 125, h: 150,
    x: '44%', bottom: '32%', z: 4, row: 'back',
    anim: { breathDuration: 3.0, leftArmRange: [-8, 12], leftArmDuration: 3.0, rightArmRange: [-10, 18], rightArmDuration: 3.5, legSwayDuration: 2.0, cursorResponsiveness: 0.5, eyeLag: 0.22, fearRadius: 180 },
  },
  {
    id: 'sleepy', color: '#FFD93D', shape: SHAPES.D, w: 118, h: 142,
    x: '58%', bottom: '34%', z: 2, row: 'back',
    eyelidClose: 0.6,
    anim: { breathDuration: 2.9, leftArmRange: [-5, 8], leftArmDuration: 3.5, rightArmRange: [-3, 6], rightArmDuration: 3.8, legSwayDuration: 2.5, cursorResponsiveness: 0.4, eyeLag: 0.28, fearRadius: 240 },
  },
  {
    id: 'injured', color: '#98D8C8', shape: SHAPES.B, w: 115, h: 138,
    x: '72%', bottom: '36%', z: 2, row: 'back',
    eyelidClose: 0.15,
    anim: { breathDuration: 2.4, leftArmRange: [-2, 3], leftArmDuration: 4.0, rightArmRange: [-10, 15], rightArmDuration: 2.5, legSwayDuration: 2.2, cursorResponsiveness: 0.6, eyeLag: 0.18, fearRadius: 240 },
  },
  {
    id: 'musician', color: '#C9B1FF', shape: SHAPES.E, w: 120, h: 144,
    x: '88%', bottom: '30%', z: 3, row: 'back',
    anim: { breathDuration: 1.8, leftArmRange: [-15, 10], leftArmDuration: 2.4, rightArmRange: [-35, 20], rightArmDuration: 0.4, legSwayDuration: 1.6, cursorResponsiveness: 0.9, eyeLag: 0.11, fearRadius: 200 },
  },
];
