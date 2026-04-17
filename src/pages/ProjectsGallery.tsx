import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import MagicBento from '@/components/MagicBento';
import { PROJECTS } from '@/data/projectsTimelineData';
import styles from './ProjectsGallery.module.css';

const ProjectsGallery = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const t = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          Back to homepage
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>All projects</h1>
          <p className={styles.subtitle}>
            <span className={styles.monoTag}>$ ls -la ~/builds</span>
            &nbsp;&nbsp;{PROJECTS.length} items found
          </p>
        </div>
        <div className={styles.bentoWrap}>
          <MagicBento projects={PROJECTS} disableAnimations={false} />
        </div>
      </main>
    </div>
  );
};

export default ProjectsGallery;