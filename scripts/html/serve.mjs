#!/usr/bin/env node
// npm run html:serve — serves generated-html/ the way stage-resources.getlevrg.com
// runs it. Deliberately not `next start`: there is no Next server here, only
// the self-contained pages, the public/ assets they reference by URL, and the
// two API routes the lead form calls.
//
//   GET /<slug>             generated-html/<slug>.html, brotli/gzip (see precompress.mjs)
//   GET /images/... etc.    public/ files, same cache policy as next.config.ts
//   GET /api/geolocate      visitor country for the phone field
//   GET /api/check-email    MX / disposable-domain check for the email field
//   GET /__manifest.json    sha256 of every page being served — CI diffs against it
//   GET /healthz
//
// Env: PORT (3000), HOST (0.0.0.0), HTML_DIR, PUBLIC_DIR, ROOT_REDIRECT (/video),
//      NOINDEX=1 (adds X-Robots-Tag), RELEASE (shown in the manifest),
//      IPWHOIS_ENDPOINT, DOH_ENDPOINT — same meaning as for the Next app.

import { createServer } from "node:http";
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve, dirname, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { brotliCompressSync, gzipSync, constants as zlib } from "node:zlib";
import { SECURITY_HEADERS, IMMUTABLE_CACHE } from "../../http-headers.mjs";
// Same lists the Next route uses, read straight from source (Node strips the types).
import { SUSPICIOUS_KEYWORDS, SUSPICIOUS_TLDS } from "../../src/lib/constants.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const HTML_DIR = resolve(process.env.HTML_DIR ?? join(ROOT, "generated-html"));
const PUBLIC_DIR = resolve(process.env.PUBLIC_DIR ?? join(ROOT, "public"));
const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "0.0.0.0";
const ROOT_REDIRECT = process.env.ROOT_REDIRECT ?? "/video"; // mirrors src/app/page.tsx
const NOINDEX = process.env.NOINDEX === "1";
const IPWHOIS_ENDPOINT = process.env.IPWHOIS_ENDPOINT || "https://ipwho.is";
const DOH_ENDPOINT = process.env.DOH_ENDPOINT || "https://cloudflare-dns.com/dns-query";

const disposableDomains = new Set(createRequire(import.meta.url)("disposable-email-domains"));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
};
const COMPRESSIBLE = new Set([".json", ".txt", ".xml", ".svg"]);
// Matches next.config.ts: filename-versioned folders and the logos/favicon.
const IMMUTABLE_PATH = /^\/(?:(?:images|logos|flags|video|data)\/|favicon\.webp$|logo\.webp$|Light%20Logo\.webp$|Light Logo\.webp$)/;

// --- Pages are loaded and hashed once; they never change while running.
// Compressed bodies come from precompress.mjs (the stage image runs it at
// build time) or are made on first request and kept.
const pages = new Map();
for (const file of existsSync(HTML_DIR) ? readdirSync(HTML_DIR) : []) {
  if (!file.endsWith(".html")) continue;
  const path = join(HTML_DIR, file);
  const raw = readFileSync(path);
  const sha256 = createHash("sha256").update(raw).digest("hex");
  const precompressed = (ext) => {
    const sibling = `${path}.${ext}`;
    return existsSync(sibling) && statSync(sibling).mtimeMs >= statSync(path).mtimeMs ? readFileSync(sibling) : undefined;
  };
  pages.set(file.slice(0, -5), { raw, sha256, etag: `"${sha256.slice(0, 32)}"`, br: precompressed("br"), gzip: precompressed("gz") });
}

function encoded(page, encoding) {
  page[encoding] ??=
    encoding === "br"
      ? brotliCompressSync(page.raw, { params: { [zlib.BROTLI_PARAM_QUALITY]: 9, [zlib.BROTLI_PARAM_SIZE_HINT]: page.raw.length } })
      : gzipSync(page.raw, { level: 9 });
  return page[encoding];
}
if (!pages.size) {
  console.error(`no .html files in ${HTML_DIR} — run \`npm run html:generate\` first`);
  process.exit(1);
}
const manifest = JSON.stringify({
  release: process.env.RELEASE ?? null,
  pages: Object.fromEntries([...pages].sort(([a], [b]) => a.localeCompare(b)).map(([slug, p]) => [slug, p.sha256])),
});

function baseHeaders(res) {
  for (const { key, value } of SECURITY_HEADERS) res.setHeader(key, value);
  if (NOINDEX) res.setHeader("X-Robots-Tag", "noindex, nofollow");
}

function sendJson(res, status, body, cache = "no-store") {
  res.writeHead(status, { "Content-Type": MIME[".json"], "Cache-Control": cache });
  res.end(JSON.stringify(body));
}

function pickEncoding(req) {
  const accept = req.headers["accept-encoding"] ?? "";
  if (/\bbr\b/.test(accept)) return "br";
  if (/\bgzip\b/.test(accept)) return "gzip";
  return null;
}

function sendPage(req, res, page) {
  res.setHeader("Vary", "Accept-Encoding");
  // Revalidate every time: a deploy replaces the file at the same URL.
  res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
  res.setHeader("ETag", page.etag);
  if (req.headers["if-none-match"] === page.etag) {
    res.writeHead(304);
    return res.end();
  }
  const encoding = pickEncoding(req);
  const body = encoding ? encoded(page, encoding) : page.raw;
  if (encoding) res.setHeader("Content-Encoding", encoding);
  res.writeHead(200, { "Content-Type": MIME[".html"], "Content-Length": body.length });
  res.end(req.method === "HEAD" ? undefined : body);
}

function sendNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
  res.end(req.method === "HEAD" ? undefined : "Not found");
}

function sendStatic(req, res, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return sendNotFound(req, res);
  }
  const file = resolve(PUBLIC_DIR, "." + decoded);
  if (!file.startsWith(PUBLIC_DIR + sep)) return sendNotFound(req, res);
  let stat;
  try {
    stat = statSync(file);
  } catch {
    return sendNotFound(req, res);
  }
  if (!stat.isFile()) return sendNotFound(req, res);

  const ext = extname(file).toLowerCase();
  const headers = {
    "Content-Type": MIME[ext] ?? "application/octet-stream",
    "Cache-Control": IMMUTABLE_PATH.test(pathname) ? IMMUTABLE_CACHE : "public, max-age=3600",
    "Last-Modified": stat.mtime.toUTCString(),
    "Accept-Ranges": "bytes",
  };

  // Byte ranges: Safari will not play <video> without them.
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "");
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : stat.size - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : stat.size - 1;
    start = Math.max(0, start);
    end = Math.min(end, stat.size - 1);
    if (start > end) {
      res.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
      return res.end();
    }
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${stat.size}`, "Content-Length": end - start + 1 });
    if (req.method === "HEAD") return res.end();
    return createReadStream(file, { start, end }).pipe(res);
  }

  if (COMPRESSIBLE.has(ext) && stat.size > 1024 && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    const body = gzipSync(readFileSync(file));
    res.writeHead(200, { ...headers, Vary: "Accept-Encoding", "Content-Encoding": "gzip", "Content-Length": body.length });
    return res.end(req.method === "HEAD" ? undefined : body);
  }
  res.writeHead(200, { ...headers, "Content-Length": stat.size });
  if (req.method === "HEAD") return res.end();
  createReadStream(file).pipe(res);
}

// --- API: ports of src/app/api/*/route.ts. Keep the two in step.

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return typeof forwarded === "string" ? forwarded.split(",")[0].trim() : "";
}

async function geolocate(req, res) {
  const ip = clientIp(req);
  const isPrivateIp = !ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("192.168.");
  const url = new URL(ip && !isPrivateIp ? `/${ip}` : "/", IPWHOIS_ENDPOINT);
  url.searchParams.set("fields", "success,country_code");
  try {
    const upstream = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!upstream.ok) return sendJson(res, 502, { error: `upstream status ${upstream.status}` });
    const data = await upstream.json();
    const countryCode = data.success && data.country_code ? String(data.country_code).toUpperCase() : null;
    sendJson(res, 200, { countryCode });
  } catch {
    sendJson(res, 502, { error: "geolocation lookup failed" });
  }
}

function looksSuspicious(domain) {
  const lower = domain.toLowerCase();
  return SUSPICIOUS_TLDS.some((tld) => lower.endsWith(tld)) || SUSPICIOUS_KEYWORDS.some((kw) => lower.includes(kw));
}

async function checkEmail(res, searchParams) {
  const email = (searchParams.get("email") || "").trim().toLowerCase();
  const domain = email.split("@")[1];
  if (!domain) return sendJson(res, 400, { error: "missing or invalid email" });
  try {
    const url = new URL(DOH_ENDPOINT);
    url.searchParams.set("name", domain);
    url.searchParams.set("type", "MX");
    const lookup = await fetch(url, { headers: { Accept: "application/dns-json" }, signal: AbortSignal.timeout(5000) });
    let hasMx = null;
    if (lookup.ok) {
      const data = await lookup.json();
      hasMx = Array.isArray(data.Answer) && data.Answer.length > 0;
    }
    sendJson(res, 200, { domain, hasMx, disposable: disposableDomains.has(domain), suspicious: looksSuspicious(domain) }, "public, max-age=3600");
  } catch {
    sendJson(res, 502, { error: "domain lookup failed" });
  }
}

// --- Routing

const server = createServer(async (req, res) => {
  baseHeaders(res);
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }
  const { pathname, searchParams } = new URL(req.url ?? "/", "http://localhost");

  if (pathname === "/healthz") return sendJson(res, 200, { ok: true, pages: pages.size });
  if (pathname === "/__manifest.json") {
    res.writeHead(200, { "Content-Type": MIME[".json"], "Cache-Control": "no-store" });
    return res.end(manifest);
  }
  if (pathname === "/api/geolocate") return geolocate(req, res);
  if (pathname === "/api/check-email") return checkEmail(res, searchParams);
  if (pathname === "/") {
    res.writeHead(307, { Location: ROOT_REDIRECT });
    return res.end();
  }

  // /crm, /crm/ and /crm.html all serve the page; only /crm is canonical.
  const slug = pathname.replace(/^\/+|\/+$/g, "").replace(/\.html$/, "");
  const page = pages.get(slug);
  if (page) {
    // The app router asks for an RSC payload (?_rsc / RSC header) on client
    // navigation, e.g. the lead form's push to /thank-you. There is no RSC
    // here; any non-RSC response makes the router do a full page load, so
    // answer with an empty one rather than a megabyte of HTML it discards.
    if (searchParams.has("_rsc") || req.headers.rsc === "1") {
      res.writeHead(204, { "Cache-Control": "no-store", Vary: "RSC" });
      return res.end();
    }
    return sendPage(req, res, page);
  }
  return sendStatic(req, res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`serving ${pages.size} page(s) from ${HTML_DIR} on http://${HOST}:${server.address().port}`);
});

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
