import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-studies/CaseStudyLayout";
import { designSystemConsumption } from "@/lib/case-studies/design-system-consumption";

const path = "/case-studies/design-system-consumption";

export const metadata: Metadata = {
  title: "Architecture at a crossroads — nsoto.dev",
  description:
    "Bootstrap vendoring, consolidation options, and the private-vs-public design-system evaluation that led to a public canonical repo with versioned @nsoto packages.",
  openGraph: {
    title: "Architecture at a crossroads",
    description: "Bootstrap, consolidation, and the evaluation that chose a public design-system repo.",
    url: `https://nsoto.dev${path}`,
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
  return <CaseStudyLayout study={designSystemConsumption} />;
}
