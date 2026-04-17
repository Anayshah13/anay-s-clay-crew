export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  date: string;
  position: 'left' | 'right';
  color: string;
  hackathon?: string;
  liveUrl?: string;
  githubUrl?: string;
  imagePlaceholder: string;
  bentoImage?: string;
  mediaType?: 'video' | 'youtube';
  videoSrc?: string;
  videoPoster?: string;
  youtubeEmbedUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI-Powered LoL Wrapped',
    description: 'Full-stack analytics platform built during Rift Rewind Hackathon. Delivers personalized League of Legends gameplay insights from Riot API data using AWS Bedrock AI.',
    tech: ['React', 'TypeScript', 'FastAPI', 'AWS Bedrock', 'Riot API'],
    date: 'Nov 2025',
    position: 'right',
    color: '#4ECDC4',
    hackathon: '🏆 Hidden Gem Prize — AWS x Riot Games',
    githubUrl: 'https://github.com/Anayshah13/rift-wrapped',
    imagePlaceholder: 'LOL_WRAPPED',
    bentoImage: '/projects/images/riftrewind.png',
    mediaType: 'youtube',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/pYupilcB-3g?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=pYupilcB-3g',
  },
  {
    id: 2,
    title: 'Code Uncode Website',
    description: 'Official website for DJS Codestars\'s annual competitive programming event. Performance-focused animated UI with interactive 3D components and GSAP-driven transitions with focus on the central theme of Pokemon.',
    tech: ['React', 'Next.js', 'GSAP', 'Framer Motion'],
    date: 'Dec 2025',
    position: 'left',
    color: '#B399FF',
    githubUrl: 'https://github.com/NidhiiMaru/code_uncode',
    imagePlaceholder: 'codeuncode',
    bentoImage: '/projects/images/codeuncode.png',
    mediaType: 'video',
    videoSrc: '/projects/codeuncode.mp4',
    videoPoster: '/projects/images/codeuncode.png',
  },
  {
    id: 3,
    title: 'Industrial Metal Factory Website',
    description: 'Redesigned a legacy PHP-based industrial company site into a clean, responsive React frontend with subtle animations. Real client project.',
    tech: ['React', 'CSS', 'Responsive Design'],
    date: 'Dec 2025',
    position: 'right',
    color: '#F2A900',
    imagePlaceholder: 'FACTORY',
    bentoImage: '/projects/images/western.png',
    mediaType: 'video',
    videoSrc: '/projects/western.mp4',
    videoPoster: '/projects/images/western.png',
  },
  {
    id: 4,
    title: 'Roam',
    description: 'AI-powered heritage tour guide app with GPS-based walking routes, landmark verification via Gemini vision, and real-time voice conversations using LiveKit + Gemini 2.5 Live. Personalizes narration style, language, and tour progression across guided city stops.',
    tech: ['React Native', 'Expo', 'TypeScript', 'LiveKit', 'Gemini 2.5'],
    date: '2026',
    position: 'left',
    color: '#3b82f6',
    imagePlaceholder: 'ROAM',
    bentoImage: '/projects/images/roam.png',
    mediaType: 'youtube',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/RNVlefi62qc?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&start=11&loop=1&playlist=RNVlefi62qc',
  },
  {
    id: 5,
    title: 'Codeshastra XII Website',
    description: 'Official event website featuring high-energy visuals, transitions, and a performance-first frontend experience.',
    tech: ['React', 'Next.js', 'GSAP'],
    date: '2026',
    position: 'right',
    color: '#FF5C5C',
    imagePlaceholder: 'CODESHASTRA_XII',
    bentoImage: '/projects/images/codeshastra.png',
    mediaType: 'video',
    videoSrc: '/projects/codeshastra.mp4',
    videoPoster: '/projects/images/codeshastra.png',
  },
  {
    id: 6,
    title: 'Antariksh',
    description: 'Main Antariksh website built with high-contrast visuals, smooth motion sections, and performance-focused frontend interactions.',
    tech: ['React', 'TypeScript', 'GSAP'],
    date: '2026',
    position: 'left',
    color: '#F2A900',
    imagePlaceholder: 'ANTARIKSH',
    bentoImage: '/projects/images/antariksh.png',
    mediaType: 'video',
    videoSrc: '/projects/antariksh.mp4',
    videoPoster: '/projects/images/antariksh.png',
  },
  {
    id: 7,
    title: 'RAG System with PDF Upload',
    description: 'Retrieval-Augmented Generation system using HuggingFace. Implements PDF parsing, vector embeddings, semantic search, and context-aware response generation with query memory.',
    tech: ['Python', 'HuggingFace', 'Vector DB', 'FastAPI'],
    date: 'Aug 2025',
    position: 'left',
    color: '#FF5C5C',
    githubUrl: 'https://github.com/Anayshah13',
    imagePlaceholder: 'RAG_SYSTEM',
  },
  {
    id: 8,
    title: 'DJSCSI Main Event Website',
    description: 'Official website for DJSCSI\'s annual main event. Performance-focused animated UI with Three.js and GSAP-driven transitions.',
    tech: ['React', 'Next.js', 'GSAP', 'Three.js'],
    date: 'Mar 2026',
    position: 'right',
    color: '#3b82f6',
    githubUrl: 'https://github.com/Anayshah13',
    imagePlaceholder: 'DASHBOARD',
    bentoImage: '/projects/images/csi_main.png',
  },
  {
    id: 9,
    title: 'PyGame 2D Shooter',
    description: 'First game project. 2D shooter in Python using PyGame with player mechanics, collision detection, and full game physics.',
    tech: ['Python', 'PyGame', 'Game Physics'],
    date: 'Dec 2024',
    position: 'left',
    color: '#F2A900',
    githubUrl: 'https://github.com/Anayshah13/Anays-First-Pygame',
    imagePlaceholder: 'PYGAME',
  },
  {
    id: 10,
    title: 'EDA on Kaggle Datasets',
    description: 'Data cleaning and exploratory data analysis on diabetes and e-commerce datasets. Applied linear regression, logistic regression, and one-hot encoding.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    date: 'Jun 2025',
    position: 'right',
    color: '#FF5C5C',
    githubUrl: 'https://github.com/Anayshah13',
    imagePlaceholder: 'EDA',
  },
  {
    id: 11,
    title: 'Excel Graph Visualizer',
    description: 'React app that parses aluminium factory production data and renders multi-parameter visual charts using Recharts with dynamic parameter selection.',
    tech: ['React', 'Recharts', 'PapaParse', 'Data Viz'],
    date: 'Jul 2025',
    position: 'left',
    color: '#B399FF',
    githubUrl: 'https://github.com/Anayshah13/Western-Excel-Visualizer',
    imagePlaceholder: 'EXCEL_VIZ',
  },
];
