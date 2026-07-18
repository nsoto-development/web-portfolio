import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { Footer } from "@/components/landing/Footer";
import { portfolioData } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work history for Nelson Soto — cloud migrations, enterprise integrations, and data platforms.",
  openGraph: {
    title: "Experience",
    description:
      "Work history for Nelson Soto — cloud migrations, enterprise integrations, and data platforms.",
    url: `${SITE_URL}/experience`,
    siteName: "nsoto.dev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/nsoto-dev-og.png",
        width: 1731,
        height: 909,
        alt: "nsoto.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience",
    description:
      "Work history for Nelson Soto — cloud migrations, enterprise integrations, and data platforms.",
    images: ["/og/nsoto-dev-og.png"],
  },
};

export default function ExperiencePage() {
  const { experienceStub, experience } = portfolioData;

  return (
    <>
      <SiteNav />
      <main className="hub-page-main">
        <div className="hub-page-content">
          <header className="hub-page-header">
            <p className="case-study-eyebrow">{experienceStub.eyebrow}</p>
            <h1 className="hub-page-title">{experienceStub.headline}</h1>
            <p className="hub-page-subtitle">{experienceStub.sub}</p>
          </header>
          <ExperienceList jobs={experience} />
        </div>
      </main>
      <Footer />
    </>
  );
}
