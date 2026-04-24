import { Helmet } from "react-helmet-async";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE_PATH,
  DOCUMENT_SITE_TITLE,
  getSiteOrigin,
  SITE_NAME,
  toAbsoluteUrl,
} from "./config";

type SeoProps = {
  title: string;
  description?: string;
  pathname: string;
  /** Absolute path starting with / (e.g. /aboutus/photo.png) */
  ogImagePath?: string;
  noindex?: boolean;
  type?: "website" | "article";
  /** When true, no canonical (e.g. 404) */
  omitCanonical?: boolean;
};

/**
 * Per-route head tags: title, description, canonical, Open Graph, Twitter, robots.
 */
export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  pathname,
  ogImagePath = DEFAULT_OG_IMAGE_PATH,
  noindex = false,
  type = "website",
  omitCanonical = false,
}: SeoProps) {
  const origin = getSiteOrigin();
  const path = pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  const normalizedPath = path === "/" ? "" : path;
  const canonical = `${origin}${normalizedPath || "/"}`;

  const documentTitle = `${title} | ${SITE_NAME}`;

  const imageUrl = toAbsoluteUrl(ogImagePath);

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{DOCUMENT_SITE_TITLE}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={DEFAULT_KEYWORDS} />
      <meta name="author" content={SITE_NAME} />
      {!omitCanonical && <link rel="canonical" href={canonical} />}

      <meta property="og:site_name" content={DOCUMENT_SITE_TITLE} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {!omitCanonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${SITE_NAME} — portfolio`} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      <meta name="theme-color" content="#0B1426" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
}
