const trimTrailing = (s: string) => s.replace(/\/+$/, "");

/**
 * Public site origin for canonicals, Open Graph, and JSON-LD.
 * Set `VITE_SITE_URL` in `.env` (e.g. https://yoursite.com) for production.
 * Falls back to the current origin in the browser, or a placeholder when unknown.
 */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (fromEnv) return trimTrailing(String(fromEnv));
  if (typeof window !== "undefined") return trimTrailing(window.location.origin);
  return "https://example.com";
}

export function toAbsoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  if (!path || path === "/") return `${origin}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${p}`;
}

export const SITE_NAME = "Anay Shah";

/** Shown in the browser tab on every route. */
export const DOCUMENT_SITE_TITLE = "Anay's Portfolio Website";

export const DEFAULT_DESCRIPTION =
  "Portfolio of Anay Shah: developer, UI animator, competitive programmer, and hackathon builder. Projects, skills, GitHub, and contact — React, TypeScript, bold interactive design.";

export const DEFAULT_KEYWORDS = [
  "Anay Shah",
  "developer portfolio",
  "React",
  "TypeScript",
  "UI animation",
  "competitive programming",
  "hackathon",
  "web developer",
  "DJSCE",
  "Mumbai",
].join(", ");

export const DEFAULT_OG_IMAGE_PATH = "/aboutus/anay13.png";

export const SOCIAL_SAME_AS = [
  "https://github.com/Anayshah13",
  "https://www.linkedin.com/in/anay-shah-5880aa264/",
  "https://www.instagram.com/anay_shah13/",
] as const;

export const CONTACT_EMAIL = "anayshah13@gmail.com";
