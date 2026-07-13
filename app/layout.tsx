import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/seo/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nelson Soto — nsoto.dev",
  description:
    "Nelson Soto — senior software engineer with 20 years in full-stack development, cloud migrations, enterprise integrations, and legacy modernization. Jacksonville, FL.",
  icons: {
    icon: [
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Nelson Soto — nsoto.dev",
    description:
      "Nelson Soto — senior software engineer with 20 years in full-stack development, cloud migrations, enterprise integrations, and legacy modernization. Jacksonville, FL.",
    url: SITE_URL,
    siteName: "nsoto.dev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/nsoto-dev-og.png",
        width: 1731,
        height: 909,
        alt: "Nelson Soto — nsoto.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nelson Soto — nsoto.dev",
    description:
      "Nelson Soto — senior software engineer with 20 years in full-stack development, cloud migrations, enterprise integrations, and legacy modernization. Jacksonville, FL.",
    images: ["/og/nsoto-dev-og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
