import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-studies/CaseStudyLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { lgtvDisplayWake } from "@/lib/case-studies/lgtv-display-wake";
import { getCaseStudyBySlug } from "@/lib/case-studies/registry";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { SITE_URL } from "@/lib/seo/site";

const path = "/case-studies/lgtv-display-wake";

export const metadata: Metadata = {
  title: "When the display wakes but the TV does not",
  description:
    "A real WoL bug under VPN, a lock→wake capture that showed no magic packet, a TLS stall on the webOS control channel, and a purpose-built LG TV sync utility.",
  openGraph: {
    title: "When the display wakes but the TV does not",
    description:
      "WoL PR, capture pivot, TLS stall, and a purpose-built LG display sync tool — engineering narrative on nsoto.dev.",
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
    title: "When the display wakes but the TV does not",
    description:
      "WoL PR, capture pivot, TLS stall, and a purpose-built LG display sync tool — engineering narrative on nsoto.dev.",
    images: ["/og/nsoto-dev-og.png"],
  },
};

export default function LgtvDisplayWakePage() {
  const study = getCaseStudyBySlug("lgtv-display-wake");

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "When the display wakes but the TV does not",
          description:
            "A real WoL bug under VPN, a lock→wake capture that showed no magic packet, a TLS stall on the webOS control channel, and a purpose-built LG TV sync utility.",
          path,
          dateModified: study?.updatedAt,
        })}
      />
      <CaseStudyLayout study={lgtvDisplayWake} />
    </>
  );
}
