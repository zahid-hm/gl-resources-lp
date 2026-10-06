#!/usr/bin/env node
// npm run html:generate [-- <slug> ...] [--all] [--check] [--inline-max=<bytes>]
//
// Converts src/app/<slug>/page.tsx into generated-html/<slug>.html — one
// self-contained, hydrating HTML file per page (see inline.mjs for how).
//
//   (no args)      convert only the pages that have no .html yet
//   <slug> ...     (re)convert exactly these pages
//   --all          reconvert every page — use after changing shared sections,
//                  layout, styles or anything else several pages render
//   --check        convert nothing; exit 1 if any page has no .html (used by CI)
//
// Generated files are committed. They are build output: edit the .tsx and
// regenerate, never hand-edit the .html.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { inlinePage } from "./inline.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const APP_DIR = join(ROOT, "src/app");
const OUT_DIR = join(ROOT, "generated-html");
const DIST_DIR = join(ROOT, ".next-html");
const PUBLIC_DIR = join(ROOT, "public");
const DEFAULT_INLINE_MAX = 1024; // above ~1 KB, base64 + duplication across markup, payload and JS costs more than the request it saves

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));
const options = Object.fromEntries(args.filter((a) => a.includes("=")).map((a) => a.replace(/^--/, "").split("=")));
const requested = args.filter((a) => !a.startsWith("--"));

/** Every routable top-level folder under src/app that has a page.tsx. */
function discoverPages() {
  return readdirSync(APP_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !/^[_(\[@]/.test(d.name) && d.name !== "api")
    .filter((d) => existsSync(join(APP_DIR, d.name, "page.tsx")))
    .map((d) => d.name)
    .sort();
}

const htmlPath = (slug) => join(OUT_DIR, `${slug}.html`);

function main() {
  const pages = discoverPages();
  const missing = pages.filter((slug) => !existsSync(htmlPath(slug)));
  const orphans = existsSync(OUT_DIR)
    ? readdirSync(OUT_DIR)
        .filter((f) => f.endsWith(".html") && !pages.includes(f.slice(0, -5)))
        .map((f) => f.slice(0, -5))
    : [];

  if (orphans.length) {
    console.warn(`! ${orphans.length} .html file(s) with no src/app/<slug>/page.tsx: ${orphans.join(", ")}`);
  }

  if (flags.has("--check")) {
    if (missing.length) {
      console.error(`✗ ${missing.length} of ${pages.length} page(s) not converted: ${missing.join(", ")}`);
      console.error("  run `npm run html:generate` and commit generated-html/");
      process.exit(1);
    }
    console.log(`✓ all ${pages.length} pages have a generated .html`);
    return;
  }

  const unknown = requested.filter((slug) => !pages.includes(slug));
  if (unknown.length) {
    console.error(`✗ no src/app/<slug>/page.tsx for: ${unknown.join(", ")}`);
    process.exit(1);
  }

  const targets = flags.has("--all") ? pages : requested.length ? requested : missing;
  if (!targets.length) {
    console.log(`✓ nothing to do — all ${pages.length} pages already converted (use --all or name a slug to regenerate)`);
    return;
  }

  // Next reads .env itself, but fail here with a clear message instead of deep inside the build.
  const { loadEnvConfig } = createRequire(import.meta.url)("@next/env");
  loadEnvConfig(ROOT, false, { info() {}, error: console.error });
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    console.error("✗ NEXT_PUBLIC_SITE_URL is not set (env or .env) — it is baked into canonical and OG URLs");
    process.exit(1);
  }

  console.log(`→ converting ${targets.length} page(s): ${targets.join(", ")}`);
  build(targets, targets.length === pages.length);

  mkdirSync(OUT_DIR, { recursive: true });
  const inlineImageMaxBytes = Number(options["inline-max"] ?? DEFAULT_INLINE_MAX);
  let failed = 0;
  for (const slug of targets) {
    const source = join(DIST_DIR, "server/app", `${slug}.html`);
    if (!existsSync(source)) {
      console.error(`✗ ${slug}: not prerendered as static HTML — does the page read request data (cookies, headers, searchParams)?`);
      failed++;
      continue;
    }
    try {
      const { html, stats } = inlinePage(readFileSync(source, "utf8"), {
        distDir: DIST_DIR,
        publicDir: PUBLIC_DIR,
        inlineImageMaxBytes,
      });
      writeFileSync(htmlPath(slug), html);
      const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
      console.log(`✓ ${slug}.html  ${kb} KB  (${stats.chunks} chunks, ${stats.lazyChunks} lazy, ${stats.imagesInlined} images inlined)`);
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`);
      failed++;
    }
  }
  if (failed) process.exit(1);
}

function build(slugs, everything) {
  const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
  const buildArgs = [nextBin, "build"];
  // Scoping the build to the pages being converted keeps a one-page run fast.
  // Not on Windows: Next 16.3 matches the patterns against backslash paths
  // there, so the scoped build silently contains no app routes at all.
  if (!everything && process.platform !== "win32") buildArgs.push(`--debug-build-paths=${slugs.map((s) => `src/app/${s}/page.tsx`).join(",")}`);
  const result = spawnSync(process.execPath, buildArgs, {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, HTML_BUILD: "1", NEXT_TELEMETRY_DISABLED: "1" },
  });
  if (result.status !== 0) {
    console.error("✗ next build failed");
    process.exit(result.status ?? 1);
  }
}

main();
