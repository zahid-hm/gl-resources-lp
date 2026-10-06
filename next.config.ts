import type { NextConfig } from "next";
// Shared with the stage server for generated-html/ (scripts/html/serve.mjs).
import { SECURITY_HEADERS, IMMUTABLE_CACHE } from "./http-headers.mjs";

// Content-hashed bundles under /_next/static already get an immutable policy
// from Next. Everything in /public is served with a short default, which makes
// Lighthouse's "efficient cache policy" audit fail and costs repeat visitors a
// revalidation round-trip per asset. These paths are versioned by filename, so
// a long immutable TTL is safe; change the filename to bust the cache.
const IMMUTABLE = {
  key: "Cache-Control",
  value: IMMUTABLE_CACHE,
};

// `npm run html:generate` builds with HTML_BUILD=1. That build only exists to
// be post-processed into self-contained files under generated-html/, so it gets
// its own distDir (a regular `.next` build is never clobbered) and inlines CSS
// natively — Next then also swaps the stylesheet reference in the RSC payload,
// which hydration would otherwise re-request from /_next/static.
const HTML_BUILD = process.env.HTML_BUILD === "1";

const nextConfig: NextConfig = {
  output: HTML_BUILD ? undefined : "standalone",
  distDir: HTML_BUILD ? ".next-html" : ".next",
  // The build ID is embedded in every page. A random one would make each
  // regeneration byte-different even when nothing changed, and CI decides what
  // to publish by comparing page hashes. These pages never navigate client-side
  // (they full-page-load), so version skew detection loses nothing.
  ...(HTML_BUILD && { generateBuildId: () => "generated-html" }),
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    inlineCss: HTML_BUILD,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        source: "/:dir(images|logos|flags|video|data)/:path*",
        headers: [IMMUTABLE],
      },
      {
        source: "/:file(favicon.webp|logo.webp|Light%20Logo.webp)",
        headers: [IMMUTABLE],
      },
      {
        // The countries payload the phone field lazy-loads, plus the flags it
        // references, never change between deploys.
        source: "/data/:path*.json",
        headers: [IMMUTABLE],
      },
    ];
  },
};

export default nextConfig;
