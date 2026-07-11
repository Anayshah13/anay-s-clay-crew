# Anay's Clay Crew — Portfolio

Personal portfolio for **Anay Shah**: developer, UI animator, competitive programmer, and hackathon builder.

Neobrutalist visual system — bold type, hard shadows, thick borders, high contrast — with GSAP-driven scroll motion, interactive Three.js / blob moments, and a projects experience that spans a homepage timeline and a full gallery route.

---

## Overview

This site is a motion-heavy showcase of selected builds: hackathon products, client and club websites, and side projects. Content lives in shared data modules so the homepage timeline, desktop marquee, and `/projects` gallery stay in sync. The resume is previewed in-page and downloaded from a fixed Google Drive file so it can be updated without redeploying.

---

## Features

- **Neobrutalist UI** — cream / onyx / accent palette, mono + display type, hard-edge cards and CTAs  
- **GSAP + ScrollTrigger** — section entrances, project timeline path, hover micro-interactions  
- **Hero & character moments** — blob crowd / light-switch style interactions on the home page  
- **Projects timeline** — featured builds with YouTube embeds, tech pills, live + GitHub links  
- **Horizontal marquee** — remaining projects on desktop with screenshot cards  
- **`/projects` gallery** — all projects, sorted newest → oldest, contrast-aware accents on pills and buttons  
- **Skills + links** — stack lists, social links, in-page resume stack preview and modal  
- **Achievements & contact** — collage-style achievements; EmailJS contact form and social board  
- **SEO** — Helmet meta, Open Graph, JSON-LD for home and projects  
- **Live resume** — iframe preview + download from Google Drive (same file ID; use Manage versions to update)

---

## Tech stack

| Area | Tools |
|------|--------|
| App | React 18, TypeScript, Vite |
| Routing | React Router |
| Motion | GSAP, ScrollTrigger |
| 3D / WebGL | Three.js, React Three Fiber, Drei, Rapier |
| Styling | Tailwind CSS, CSS Modules |
| Contact | EmailJS |
| SEO | react-helmet-async |
| Quality | ESLint, Vitest, Playwright |

---

## Getting started

```sh
git clone https://github.com/Anayshah13/anay-s-clay-crew.git
cd anay-s-clay-crew
npm i
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright e2e |
| `npm run images:webp` | Convert `public/` PNG/JPEG → WebP |

Optional: set `VITE_SITE_URL` (e.g. your production origin) for canonical / OG URLs in SEO helpers.

---

## Updating the resume (no redeploy)

Resume URLs are centralized in `src/lib/resume.ts` and point at a single Google Drive file.

1. Open the linked **Anay_Latest.pdf** in Drive  
2. Share → **Anyone with the link → Viewer**  
3. New version → right-click → **File information → Manage versions → Upload new version**  
4. Do **not** delete and re-upload a new file (that creates a new file ID and breaks links)

---

## Project structure (high level)

```
src/
  components/     # Sections (skills, projects timeline, contact, …)
  data/           # Projects gallery + timeline config
  lib/            # Helpers (resume URLs, accent contrast, GSAP setup)
  pages/          # Home, /projects gallery
  seo/            # Meta + JSON-LD
public/           # Static assets (project screenshots, etc.)
```

Projects source of truth: `src/data/projectsGalleryData.js`  
Homepage timeline shows the first N entries (`TOP_TIMELINE_PROJECT_COUNT`); the rest appear in the marquee. The gallery route sorts by date descending.

---

## License

Private / personal portfolio unless otherwise noted.
