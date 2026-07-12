import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nsoto.dev"),
  title: "Nelson Soto — nsoto.dev",
  description:
    "My portfolio hub — full-stack engineering, cloud migrations, and enterprise integrations.",
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
      "My portfolio hub — full-stack engineering, cloud migrations, and enterprise integrations.",
    url: "https://nsoto.dev",
    siteName: "nsoto.dev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/nsoto-dev-og.png",
        width: 1731,
        height: 909,
        alt: "nsoto.dev — coming soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nelson Soto — nsoto.dev",
    description:
      "My portfolio hub — full-stack engineering, cloud migrations, and enterprise integrations.",
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
      <body>{children}</body>
    </html>
  );
}
