/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production site origin, no trailing slash. Used for canonical URLs, sitemap, and JSON-LD. */
  readonly VITE_SITE_URL?: string;
}
