// Shape constants shared across all blobs
export const SHAPES = {
  A: '48% 52% 45% 55% / 50% 48% 52% 50%',  // Classic Pill
  B: '30% 35% 30% 35% / 32% 30% 35% 30%',  // Chunky Square
  C: '50% 50% 45% 45% / 60% 60% 40% 40%',  // Tall Egg
  D: '50% 50% 45% 45% / 40% 40% 55% 55%',  // Wide Squash
  E: '42% 58% 55% 45% / 48% 52% 48% 52%',  // Lumpy Potato
  F: '50%',                                    // Tiny Round
} as const;

export const BLOB_CONFIGS = [
  { id: 'dev',         color: '#DAFC92', shape: SHAPES.A, w: 125, h: 150, x: '48%', y: '42%', z: 13 },
  { id: 'gamer',       color: '#4ECDC4', shape: SHAPES.A, w: 108, h: 130, x: '22%', y: '48%', z: 12 },
  { id: 'explorer',    color: '#E8845A', shape: SHAPES.C, w: 102, h: 126, x: '72%', y: '30%', z: 10 },
  { id: 'party',       color: '#FF6B9D', shape: SHAPES.A, w: 98,  h: 118, x: '70%', y: '52%', z: 11 },
  { id: 'nerd',        color: '#A8E6CF', shape: SHAPES.B, w: 92,  h: 112, x: '18%', y: '28%', z: 9 },
  { id: 'musician',    color: '#C9B1FF', shape: SHAPES.E, w: 90,  h: 110, x: '82%', y: '22%', z: 7 },
  { id: 'sleepy',      color: '#FFD93D', shape: SHAPES.D, w: 85,  h: 102, x: '50%', y: '16%', z: 6 },
  { id: 'angry',       color: '#FF4757', shape: SHAPES.F, w: 65,  h: 75,  x: '12%', y: '60%', z: 13 },
  { id: 'cool',        color: '#2F3542', shape: SHAPES.A, w: 100, h: 120, x: '42%', y: '26%', z: 8 },
  { id: 'wildcard',    color: '#DAFC92', shape: SHAPES.C, w: 88,  h: 108, x: '5%',  y: '14%', z: 5 },
  { id: 'pirate',      color: '#8B4513', shape: SHAPES.E, w: 95,  h: 115, x: '62%', y: '18%', z: 9 },
  { id: 'injured',     color: '#98D8C8', shape: SHAPES.B, w: 78,  h: 96,  x: '85%', y: '12%', z: 6 },
  { id: 'philosopher', color: '#667eea', shape: SHAPES.D, w: 110, h: 132, x: '35%', y: '8%',  z: 5 },
] as const;
