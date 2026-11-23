import type { NextConfig } from "next";

// Sub-path hosting (GitHub Pages project sites) can set e.g. "/tangchongrong".
// Render serves the site at the root, so leave it empty there.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const outputMode = process.env.NEXT_OUTPUT;

const nextConfig: NextConfig = {
  // Default: standard Next.js server (`next start`), used by Render.
  // NEXT_OUTPUT=standalone for the Docker image; NEXT_OUTPUT=export for a static site.
  output:
    outputMode === "export"
      ? "export"
      : outputMode === "standalone"
        ? "standalone"
        : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
