import { portfolioData } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/seo/site";

export function homeJsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: portfolioData.name,
      jobTitle: "Senior Software Engineer",
      url: SITE_URL,
      sameAs: [portfolioData.links.github, portfolioData.links.linkedin],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: "nsoto.dev",
      url: SITE_URL,
      publisher: { "@id": personId },
    },
  ];
}

export function articleJsonLd({
  headline,
  description,
  path,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const url = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    author: { "@id": personId },
    isPartOf: { "@id": websiteId },
    ...(dateModified ? { dateModified } : {}),
  };
}
