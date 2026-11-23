import type { NextConfig } from "next";

// GitHub Pages project sites are served from /<repo>. Set NEXT_PUBLIC_BASE_PATH
// (e.g. "/tangchongrong") when building for Pages; leave it empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // GitHub Pages needs a fully static site; the Dockerfile builds standalone.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
