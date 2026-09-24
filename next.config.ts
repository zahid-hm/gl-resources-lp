import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Content-hashed bundles under /_next/static already get an immutable policy
// from Next. Everything in /public is served with a short default, which makes
// Lighthouse's "efficient cache policy" audit fail and costs repeat visitors a
// revalidation round-trip per asset. These paths are versioned by filename, so
// a long immutable TTL is safe; change the filename to bust the cache.
const IMMUTABLE = {
  key: "Cache-Control",
  value: "public, max-age=31536000, immutable",
};

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
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
