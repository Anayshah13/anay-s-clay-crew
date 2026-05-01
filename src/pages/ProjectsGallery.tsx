import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '@/data/projectsGalleryData.js';
import { Seo } from '@/seo/Seo';
import { JsonLdProjects } from '@/seo/JsonLdProjects';
import styles from './ProjectsGallery.module.css';

const MAC_DOTS = ['#FF5F57', '#FEBC2E', '#28C840'] as const;

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
      <Seo
        title="All projects"
        description={`${PROJECTS.length} builds in one place: design, full-stack, games, and hackathon work with demos, GitHub, and live links. Portfolio by Anay Shah.`}
        pathname="/projects"
        ogImagePath="/projects/images/portfolio.webp"
      />
      <JsonLdProjects />
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
        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={styles.card}
              style={{
                borderColor: project.color,
                boxShadow: `8px 8px 0 ${project.color}`,
                ['--gallery-card-accent' as string]: project.color,
              }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardChrome}>
                  <div className={styles.cardChromeDots}>
                    {MAC_DOTS.map((c, i) => (
                      <span key={i} className={styles.cardChromeDot} style={{ background: c }} />
                    ))}
                  </div>
                  <span
                    className={styles.cardChromeMeta}
                    style={{ color: project.color }}
                  >
                    {String(project.id).padStart(2, '0')}
                    <span className={styles.cardChromeSep} aria-hidden>
                      {' '}
                      ·{' '}
                    </span>
                    {project.date}
                  </span>
                </div>
                <div
                  className={styles.cardMedia}
                  style={{ borderColor: '#0e0e0e' }}
                >
                  {project.bentoImage ? (
                    <img
                      src={project.bentoImage}
                      alt={`${project.title} screenshot`}
                      className={styles.cardImg}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.cardPlaceholder}>
                      {project.imagePlaceholder}
                    </div>
                  )}
                </div>
                <div className={styles.cardPanel}>
                  <h2 className={styles.cardTitle} style={{ color: project.color }}>
                    {project.title}
                  </h2>
                  {project.hackathon ? (
                    <div
                      className={styles.hackathonBadge}
                      style={{ background: project.color, color: '#0e0e0e' }}
                    >
                      {project.hackathon}
                    </div>
                  ) : null}
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.techRow}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={styles.techPill}
                        style={{ background: project.color, color: '#0e0e0e' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardLinks}>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardLink}
                        style={{ borderColor: project.color, color: project.color }}
                      >
                        GitHub &lt;/&gt;
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardLinkLive}
                        style={{
                          background: project.color,
                          color: '#0e0e0e',
                          borderColor: project.color,
                        }}
                      >
                        Live ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectsGallery;
