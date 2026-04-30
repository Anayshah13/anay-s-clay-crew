/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production site origin, no trailing slash. Used for canonical URLs, sitemap, and JSON-LD. */
  readonly VITE_SITE_URL?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
}
