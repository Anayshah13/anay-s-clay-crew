import { Helmet } from "react-helmet-async";
import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  DOCUMENT_SITE_TITLE,
  getSiteOrigin,
  SITE_NAME,
  SOCIAL_SAME_AS,
  toAbsoluteUrl,
} from "./config";

/**
 * WebSite, Person, and WebPage — helps crawlers and rich results understand the portfolio.
 */
export function JsonLdHome() {
  const origin = getSiteOrigin();
  const personId = `${origin}/#person`;
  const websiteId = `${origin}/#website`;
  const webPageId = `${origin}/#webpage`;
  const image = toAbsoluteUrl("/aboutus/anay13.png");

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: DOCUMENT_SITE_TITLE,
        url: origin,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
        potentialAction: {
          "@type": "ReadAction",
          target: [origin, `${origin}/projects`],
        },
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: `${origin}/`,
        name: `${SITE_NAME} — Developer, UI animator, and competitive programmer`,
        description: DEFAULT_DESCRIPTION,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        primaryImageOfPage: { "@type": "ImageObject", url: image },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        url: origin,
        image,
        email: `mailto:${CONTACT_EMAIL}`,
        sameAs: [...SOCIAL_SAME_AS],
        jobTitle: "Software Developer",
        knowsAbout: [
          "Web development",
          "React",
          "TypeScript",
          "User interface",
          "Competitive programming",
        ],
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}
