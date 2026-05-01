import { PROJECTS as PROJECTS_FROM_GALLERY } from './projectsGalleryData.js';

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

/** Portfolio projects — source of truth: `./projectsGalleryData.js` */
export const PROJECTS: Project[] = PROJECTS_FROM_GALLERY as Project[];
