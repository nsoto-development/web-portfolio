import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Needed when testing unpublished kit builds (file:/tarball deps).
  transpilePackages: ["@nsoto/portfolio-ui", "@nsoto/portfolio-tokens"],
};

export default nextConfig;
