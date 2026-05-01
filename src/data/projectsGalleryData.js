/**
 * Canonical project records for the portfolio gallery.
 * Layout-specific fields (e.g. position, color) stay here so any UI can consume the same list.
 *
 * @typedef {Object} GalleryProject
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} tech
 * @property {string} date
 * @property {'left'|'right'} position
 * @property {string} color
 * @property {string} [hackathon]
 * @property {string} [liveUrl]
 * @property {string} [githubUrl]
 * @property {string} imagePlaceholder
 * @property {string} [bentoImage]
 * @property {'video'|'youtube'} [mediaType]
 * @property {string} [videoSrc]
 * @property {string} [videoPoster]
 * @property {string} [youtubeEmbedUrl]
 */

/** @type {GalleryProject[]} */
export const PROJECTS = [
  {
    id: 1,
    title: 'AI-Powered LoL Wrapped',
    description:
      'Full-stack analytics platform built during Rift Rewind Hackathon. Delivers personalized League of Legends gameplay insights from Riot API data using AWS Bedrock AI.',
    tech: ['React', 'TypeScript', 'FastAPI', 'AWS Bedrock', 'Riot API'],
    date: 'Nov 2025',
    position: 'right',
    color: '#4ECDC4',
    hackathon: '🏆 Hidden Gem Prize — AWS x Riot Games',
    liveUrl: 'https://riftwrapped.ishaan812.com/',
    githubUrl: 'https://github.com/Anayshah13/rift-wrapped',
    imagePlaceholder: 'LOL_WRAPPED',
    bentoImage: '/projects/images/riftrewind.webp',
    mediaType: 'youtube',
    youtubeEmbedUrl:
      'https://www.youtube.com/embed/pYupilcB-3g?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=pYupilcB-3g',
  },
  {
    id: 2,
    title: 'Code Uncode Website',
    description:
      "Official website for DJS Codestars's annual competitive programming event. Performance-focused animated UI with interactive 3D components and GSAP-driven transitions with focus on the central theme of Pokemon.",
    tech: ['React', 'Next.js', 'GSAP', 'Framer Motion'],
    date: 'Mar 2026',
    position: 'left',
    color: '#B399FF',
    liveUrl: 'https://codeuncode.djscodestars.in/',
    githubUrl: 'https://github.com/NidhiiMaru/code_uncode',
    imagePlaceholder: 'codeuncode',
    bentoImage: '/projects/images/codeuncode.webp',
    mediaType: 'youtube',
    youtubeEmbedUrl:
      'https://www.youtube.com/embed/jKGvrvPsbQo?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=jKGvrvPsbQo',
  },
  {
    id: 3,
    title: 'Industrial Metal Factory Website',
    description:
      'Redesigned a legacy PHP-based industrial company site into a clean, responsive React frontend with subtle animations. Real client project.',
    tech: ['React', 'CSS', 'Responsive Design'],
    date: 'Jan 2026',
    position: 'right',
    color: '#F2A900',
    liveUrl: 'https://www.westernaluminium.com/',
    githubUrl: 'https://github.com/Anayshah13/wmipl-forge',
    imagePlaceholder: 'FACTORY',
    bentoImage: '/projects/images/western.webp',
    mediaType: 'youtube',
    youtubeEmbedUrl:
      'https://www.youtube.com/embed/7J_dXlen810?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=7J_dXlen810',
  },
  {
    id: 4,
    title: 'Roam',
    description:
      'AI-powered heritage tour guide app with GPS-based walking routes, landmark verification via Gemini vision, and real-time voice conversations using LiveKit + Gemini 2.5 Live. Personalizes narration style, language, and tour progression across guided city stops.',
    tech: ['React Native', 'Expo', 'TypeScript', 'LiveKit', 'Gemini 2.5'],
    date: 'Mar 2026',
    position: 'left',
    color: '#3b82f6',
    githubUrl: 'https://github.com/Anayshah13/gemini-live-agent-hackathon',
    imagePlaceholder: 'ROAM',
    bentoImage: '/projects/images/roam.webp',
    mediaType: 'youtube',
    youtubeEmbedUrl:
      'https://www.youtube.com/embed/RNVlefi62qc?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&start=11&loop=1&playlist=RNVlefi62qc',
  },
  {
    id: 5,
    title: 'Codeshastra XII Website',
    description:
      'Official event website featuring high-energy visuals, transitions, and a performance-first frontend experience.',
    tech: ['React', 'Next.js', 'GSAP'],
    date: 'Mar 2026',
    position: 'right',
    color: '#FF5C5C',
    liveUrl: 'https://codeshastra.djcsi.co.in/',
    imagePlaceholder: 'CODESHASTRA_XII',
    bentoImage: '/projects/images/codeshastra.webp',
    mediaType: 'youtube',
    youtubeEmbedUrl:
      'https://www.youtube.com/embed/U4sKC4KFvSQ?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=U4sKC4KFvSQ',
  },
  {
    id: 6,
    title: 'Antariksh',
    description:
      'Main DJS Antariksh website built with high-contrast visuals, smooth motion sections, and performance-focused frontend interactions.',
    tech: ['React', 'TypeScript', 'GSAP'],
    date: 'Dec 2025',
    position: 'left',
    color: '#F2A900',
    liveUrl: 'https://djsantariksh.com/',
    imagePlaceholder: 'ANTARIKSH',
    bentoImage: '/projects/images/antariksh.webp',
    mediaType: 'youtube',
    youtubeEmbedUrl:
      'https://www.youtube.com/embed/nKpnx0D7BtM?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=nKpnx0D7BtM',
  },
  {
    id: 7,
    title: 'DJSCSI Main Event Website',
    description:
      "Official website for DJSCSI's annual main event. Performance-focused animated UI with Three.js and GSAP-driven transitions.",
    tech: ['React', 'Next.js', 'GSAP', 'Three.js'],
    date: 'Feb 2026',
    position: 'right',
    color: '#3b82f6',
    liveUrl: 'https://djscsi.co.in/',
    imagePlaceholder: 'DASHBOARD',
    bentoImage: '/projects/images/csi_main.webp',
  },
  {
    id: 8,
    title: 'PyGame 2D Shooter',
    description:
      'First game project. 2D shooter in Python using PyGame with player mechanics, collision detection, and full game physics.',
    tech: ['Python', 'PyGame', 'Game Physics'],
    date: 'Dec 2024',
    position: 'left',
    color: '#F2A900',
    githubUrl: 'https://github.com/Anayshah13/Anays-First-Pygame',
    imagePlaceholder: 'PYGAME',
    bentoImage: '/projects/images/pygame.webp',
  },
  {
    id: 9,
    title: 'OriginTrace - Recursive Supply Chain Tracker',
    description:
      'Built a graph-based system that reconstructs multi-tier supply chains from any company using open customs data, resolving HSN codes and recursively traces upstream suppliers across countries',
    tech: ['Next.js', 'FastAPI', 'OpenYeti', 'Web Scraping'],
    date: 'Apr 2026',
    position: 'right',
    color: '#FF5C5C',
    liveUrl: 'https://origin-trace-ashen.vercel.app/',
    githubUrl: 'https://github.com/Anayshah13/OriginTrace',
    imagePlaceholder: 'ORIGINTRACE',
    bentoImage: '/projects/images/origintrace.webp',
  },
  {
    id: 10,
    title: 'Excel Graph Visualizer',
    description:
      'React app that parses aluminium factory production data and renders multi-parameter visual charts using Recharts with dynamic parameter selection.',
    tech: ['React', 'Recharts', 'PapaParse', 'Data Viz'],
    date: 'Jul 2025',
    position: 'left',
    color: '#B399FF',
    githubUrl: 'https://github.com/Anayshah13/Western-Excel-Visualizer',
    imagePlaceholder: 'EXCEL_VIZ',
    bentoImage: '/projects/images/excel_viz.webp',
  },
  {
    id: 11,
    title: 'Lego Set Finder',
    description:
      'Look up LEGO sets by number for full details, or search by name with autocomplete-style suggestions as you type. Pick a match to see imagery, part count, and release year in a clean viewer. Loads set data from CSV via PapaParse (public LEGO dataset), with real-time UI updates and smooth interactions.',
    tech: ['React', 'PapaParse', 'CSV'],
    date: 'Jul 2025',
    position: 'right',
    color: '#DA291C',
    liveUrl: 'https://lego-set-finder.vercel.app/',
    githubUrl: 'https://github.com/Anayshah13/Lego-Set-Finder',
    imagePlaceholder: 'LEGO_SEARCH',
    bentoImage: '/projects/images/lego-searcher.webp',
  },
  {
    id: 12,
    title: 'Adchemy Landing Page',
    description:
      'Frontend build for the Adchemy marketing site: a landing experience that explains how teams point the product at a website, Instagram, or docs to extract a Brand Formula, watch competitor ads, and ship on-brand content from one place — focused on layout, sections, and polish rather than backend product logic.',
    tech: ['React', 'TypeScript', 'CSS'],
    date: 'Apr 2026',
    position: 'left',
    color: '#7c3aed',
    liveUrl: 'https://adchemy.io/',
    imagePlaceholder: 'ADCHEMY',
    bentoImage: '/projects/images/adchemy.webp',
  },
];

export default PROJECTS;
