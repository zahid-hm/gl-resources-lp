#!/usr/bin/env node
// npm run html:unpublished -- [--url=https://stage-resources.getlevrg.com] [--github-output]
//
// Lists the generated pages that the stage server is not serving yet — new
// pages, and pages whose bytes differ from what is live. Compares sha256 of
// generated-html/*.html with the stage server's /__manifest.json, so "what is
// published" is read from the server itself rather than tracked in git.
//
// An unreachable server or a server without a manifest (first deploy) means
// everything counts as unpublished.
//
// --github-output also writes count, slugs, files and removed to $GITHUB_OUTPUT.
// --expect-none exits 1 if anything is unpublished (post-deploy verification).

import { appendFileSync, readdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const HTML_DIR = join(ROOT, "generated-html");
const args = process.argv.slice(2);
const options = Object.fromEntries(args.filter((a) => a.includes("=")).map((a) => a.replace(/^--/, "").split(/=(.*)/s)));
const base = (options.url ?? process.env.STAGE_URL ?? "https://stage-resources.getlevrg.com").replace(/\/$/, "");

async function remoteManifest() {
  try {
    const res = await fetch(`${base}/__manifest.json`, { signal: AbortSignal.timeout(15000), headers: { "Cache-Control": "no-cache" } });
    if (!res.ok) {
      console.warn(`! ${base}/__manifest.json returned ${res.status} — treating every page as unpublished`);
      return {};
    }
    return (await res.json()).pages ?? {};
  } catch (err) {
    console.warn(`! could not read ${base}/__manifest.json (${err.message}) — treating every page as unpublished`);
    return {};
  }
}

const local = Object.fromEntries(
  readdirSync(HTML_DIR)
    .filter((f) => f.endsWith(".html"))
    .sort()
    .map((f) => [f.slice(0, -5), createHash("sha256").update(readFileSync(join(HTML_DIR, f))).digest("hex")])
);
const remote = await remoteManifest();

const added = Object.keys(local).filter((slug) => !(slug in remote));
const changed = Object.keys(local).filter((slug) => slug in remote && remote[slug] !== local[slug]);
const removed = Object.keys(remote).filter((slug) => !(slug in local));
const unpublished = [...added, ...changed].sort();

console.log(`${Object.keys(local).length} generated, ${Object.keys(remote).length} live on ${base}`);
console.log(`  new:     ${added.length ? added.join(", ") : "-"}`);
console.log(`  changed: ${changed.length ? changed.join(", ") : "-"}`);
console.log(`  removed: ${removed.length ? removed.join(", ") : "-"}  (dropped from stage on deploy)`);

if (args.includes("--github-output")) {
  const out = process.env.GITHUB_OUTPUT;
  if (!out) throw new Error("--github-output needs $GITHUB_OUTPUT");
  appendFileSync(
    out,
    [
      `count=${unpublished.length}`,
      `slugs=${unpublished.join(" ")}`,
      `files=${unpublished.map((s) => `generated-html/${s}.html`).join(" ")}`,
      `removed=${removed.join(" ")}`,
      "",
    ].join("\n")
  );
}

if (args.includes("--expect-none") && (unpublished.length || removed.length)) {
  console.error(`✗ ${base} is not serving this tree: ${unpublished.length} unpublished, ${removed.length} stale`);
  process.exit(1);
}
