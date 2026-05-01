import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPrimaryProjectUrl } from '@/lib/projectLinks';
import { PROJECTS_SORTED_BY_DATE_DESC } from '@/lib/galleryProjectsSorted';
import {
  textOnAccent,
  readableAccentOnPanel,
  PANEL_DARK_SLATE,
  PANEL_NEAR_BLACK,
} from '@/lib/accentContrast';
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
        description={`${PROJECTS_SORTED_BY_DATE_DESC.length} builds in one place: design, full-stack, games, and hackathon work with demos, GitHub, and live links. Portfolio by Anay Shah.`}
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
            &nbsp;&nbsp;{PROJECTS_SORTED_BY_DATE_DESC.length} items found
          </p>
        </div>
        <div className={styles.grid}>
          {PROJECTS_SORTED_BY_DATE_DESC.map((project) => {
            const primary = getPrimaryProjectUrl(project);
            const accent = project.color;
            const fgOnAccent = textOnAccent(accent);
            const titleColor = readableAccentOnPanel(accent, PANEL_DARK_SLATE);
            const chromeMetaColor = readableAccentOnPanel(accent, PANEL_NEAR_BLACK);
            const githubLinkColor = readableAccentOnPanel(accent, PANEL_DARK_SLATE);
            return (
            <article
              key={project.id}
              className={`${styles.card}${primary ? ` ${styles.cardInteractive}` : ''}`}
              style={{
                borderColor: accent,
                boxShadow: `8px 8px 0 ${accent}`,
                ['--gallery-card-accent' as string]: accent,
              }}
              tabIndex={primary ? 0 : undefined}
              onClick={
                primary
                  ? (e) => {
                      if ((e.target as HTMLElement).closest('a')) return;
                      window.open(primary, '_blank', 'noopener,noreferrer');
                    }
                  : undefined
              }
              onKeyDown={
                primary
                  ? (e) => {
                      if (e.key !== 'Enter' && e.key !== ' ') return;
                      if ((e.target as HTMLElement).closest('a')) return;
                      e.preventDefault();
                      window.open(primary, '_blank', 'noopener,noreferrer');
                    }
                  : undefined
              }
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
                    style={{ color: chromeMetaColor }}
                  >
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
                  <h2 className={styles.cardTitle} style={{ color: titleColor }}>
                    {project.title}
                  </h2>
                  {project.hackathon ? (
                    <div
                      className={styles.hackathonBadge}
                      style={{ background: accent, color: fgOnAccent }}
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
                        style={{ background: accent, color: fgOnAccent }}
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
                        style={{ borderColor: accent, color: githubLinkColor }}
                        onClick={(e) => e.stopPropagation()}
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
                          background: accent,
                          color: fgOnAccent,
                          borderColor: accent,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ProjectsGallery;
