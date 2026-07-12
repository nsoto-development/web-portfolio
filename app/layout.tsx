import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nelson Soto — nsoto.dev",
  description:
    "My portfolio hub — full-stack engineering, cloud migrations, and enterprise integrations.",
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
