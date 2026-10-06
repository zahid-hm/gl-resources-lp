// Response headers shared by next.config.ts (the Next app) and
// scripts/html/serve.mjs (the stage server for generated-html/), so both
// deployments send the same security policy.

export const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// For assets versioned by filename: change the filename to bust the cache.
export const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
