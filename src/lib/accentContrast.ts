/** Cream body text / light foreground — matches gallery panel copy. */
export const ACCENT_FG_LIGHT = '#f5f0e8';

/** Onyx — matches brutal borders + dark UI text. */
export const ACCENT_FG_DARK = '#0e0e0e';

function hexToSrgb(hex: string): [number, number, number] | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6 || !/^[0-9a-fA-F]+$/.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function relativeLuminance(hex: string): number {
  const rgb = hexToSrgb(hex);
  if (!rgb) return 0.5;
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(L1: number, L2: number): number {
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Foreground color on a solid accent fill (badges, pills, filled buttons).
 * Picks light vs dark text by whichever yields higher WCAG contrast vs the accent.
 */
export function textOnAccent(accentHex: string): typeof ACCENT_FG_LIGHT | typeof ACCENT_FG_DARK {
  const Lbg = relativeLuminance(accentHex);
  const rDark = contrastRatio(Lbg, relativeLuminance(ACCENT_FG_DARK));
  const rLight = contrastRatio(Lbg, relativeLuminance(ACCENT_FG_LIGHT));
  return rLight >= rDark ? ACCENT_FG_LIGHT : ACCENT_FG_DARK;
}

/** Minimum contrast ratio for normal-sized UI text (WCAG AA ~ 4.5:1). */
const MIN_RATIO = 4.5;

/** Timeline card body / brutal light surfaces */
export const PANEL_LIGHT_CREAM = '#f5f0e8';

/** Gallery cards, marquee cards */
export const PANEL_DARK_SLATE = '#1e1e24';

/** Browser chrome / card headers */
export const PANEL_NEAR_BLACK = '#0e0e0e';

/**
 * Use accent as foreground when it contrasts enough with the panel; otherwise cream or onyx.
 * For outline links and titles on non-accent backgrounds.
 */
export function readableAccentOnPanel(accentHex: string, panelBgHex: string): string {
  const Lp = relativeLuminance(panelBgHex);
  const La = relativeLuminance(accentHex);
  if (contrastRatio(Lp, La) >= MIN_RATIO) return accentHex;
  return Lp > 0.5 ? ACCENT_FG_DARK : ACCENT_FG_LIGHT;
}
