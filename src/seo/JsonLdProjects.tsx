import { Helmet } from "react-helmet-async";
import { getSiteOrigin, SITE_NAME, toAbsoluteUrl } from "./config";
import { PROJECTS } from "@/data/projectsTimelineData";

/**
 * CollectionPage for the full projects gallery, with ItemList of project titles.
 */
export function JsonLdProjects() {
  const origin = getSiteOrigin();
  const pageUrl = `${origin}/projects`;

  const itemList = PROJECTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    url: p.liveUrl || p.githubUrl || pageUrl,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    name: "All projects",
    url: pageUrl,
    description: `Selected builds and work by ${SITE_NAME}. ${PROJECTS.length} projects in design, full-stack, and game development.`,
    isPartOf: { "@id": `${origin}/#website` },
    inLanguage: "en-IN",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/projects/images/portfolio.png"),
    },
    hasPart: {
      "@type": "ItemList",
      numberOfItems: PROJECTS.length,
      itemListElement: itemList,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
