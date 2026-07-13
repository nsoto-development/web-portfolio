import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-studies/CaseStudyLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { designSystemConsumption } from "@/lib/case-studies/design-system-consumption";
import { getCaseStudyBySlug } from "@/lib/case-studies/registry";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/site";

const path = "/case-studies/design-system-consumption";

export const metadata: Metadata = {
  title: "Architecture at a crossroads — nsoto.dev",
  description:
    "Bootstrap vendoring, consolidation options, and the private-vs-public design-system evaluation that led to a public canonical repo with versioned @nsoto packages.",
  openGraph: {
    title: "Architecture at a crossroads",
    description: "Bootstrap, consolidation, and the evaluation that chose a public design-system repo.",
    url: `${SITE_URL}${path}`,
    siteName: "nsoto.dev",
    locale: "en_US",
    type: "article",
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
    title: "Architecture at a crossroads",
    description: "Bootstrap, consolidation, and the evaluation that chose a public design-system repo.",
    images: ["/og/nsoto-dev-og.png"],
  },
};

export default function DesignSystemConsumptionPage() {
  const study = getCaseStudyBySlug("design-system-consumption");

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "Architecture at a crossroads",
          description:
            "Bootstrap vendoring, consolidation options, and the private-vs-public design-system evaluation that led to a public canonical repo with versioned @nsoto packages.",
          path,
          dateModified: study?.updatedAt,
        })}
      />
      <CaseStudyLayout study={designSystemConsumption} />
    </>
  );
}
