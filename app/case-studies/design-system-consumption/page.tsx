import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-studies/CaseStudyLayout";
import { designSystemConsumption } from "@/lib/case-studies/design-system-consumption";

const path = "/case-studies/design-system-consumption";

export const metadata: Metadata = {
  title: "Architecture at a crossroads — nsoto.dev",
  description:
    "How I audited design-system drift across web-portfolio and ns-chess, mapped consumption options, and chose a path toward versioned shared UI without copy-paste.",
  openGraph: {
    title: "Architecture at a crossroads",
    description: "Design system consumption across public repos — constraints, options, and direction.",
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
    description: "Design system consumption across public repos — constraints, options, and direction.",
    images: ["/og/nsoto-dev-og.png"],
  },
};

export default function DesignSystemConsumptionPage() {
  return <CaseStudyLayout study={designSystemConsumption} />;
}
