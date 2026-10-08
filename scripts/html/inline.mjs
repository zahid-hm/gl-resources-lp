// Turns one prerendered Next.js page (from `.next-html/server/app/<slug>.html`)
// into a single self-contained HTML document: every JS chunk, the CSS and the
// preloaded font are inlined, small images become data URIs, and nothing under
// /_next/ is fetched at runtime. Images, video, flags and /data/*.json stay as
// root-relative URLs — the stage server serves them out of public/.
//
// The page still hydrates as a normal React app. Making that work without the
// chunk files takes four adjustments, each explained where it is made:
//  1. Chunks register with `document.currentScript`'s src; inline scripts
//     have none, so they register under their path string instead.
//  2. Lazily imported chunks (libphonenumber's metadata) are found by following
//     "static/chunks/*.js" references and inlined too.
//  3. The runtime chunk runs last, and each chunk keeps an inert
//     `<script type="text/x-inlined" async src>` placeholder, which both the
//     runtime and React look for before fetching a chunk.
//  4. Next's getAssetPrefix() reads currentScript.src, so each inline script
//     gets an own `src` property pointing under /_next/.
// smoke.mjs proves the result in a real browser; run it after a Next upgrade.
//
// The RSC payload (`self.__next_f`) also carries a second and third copy of the
// stylesheet for `experimental.inlineCss`. React adopts the <style data-href>
// already in the document during hydration and never reads those copies, so
// they are emptied — about 200 KB per page.

import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const CURRENT_SCRIPT = '"object"==typeof document?document.currentScript:void 0';
const CHUNK_REF_RE = /"(?:\/_next\/)?(static\/chunks\/[\w.-]+\.js)"/g;
const SCRIPT_TAG_RE = /<script\b([^>]*)\bsrc="\/_next\/(static\/chunks\/[\w.-]+\.js)"([^>]*)><\/script>/g;
const FLIGHT_SCRIPT_RE = /<script>(?:\(self\.__next_f=self\.__next_f\|\|\[\]\)|self\.__next_f)\.push\((\[[\s\S]*?\])\)<\/script>/g;
const FONT_FACE_RE = /@font-face\{[^}]*\}/g;
const PLACEHOLDER_TYPE = "text/x-inlined";
const MEDIA_URL_RE = /url\(\/_next\/(static\/media\/[\w.-]+)\)/;

const MIME = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

/**
 * @param {string} html            prerendered page from the HTML build
 * @param {object} opts
 * @param {string} opts.distDir     the HTML build's distDir (".next-html")
 * @param {string} opts.publicDir   the app's public/ directory
 * @param {number} opts.inlineImageMaxBytes  images at or under this size become data URIs (0 disables)
 * @returns {{ html: string, stats: object }}
 */
export function inlinePage(html, { distDir, publicDir, inlineImageMaxBytes }) {
  const readDist = (rel) => readFileSync(join(distDir, rel));
  const dataUri = (path, bytes) => `data:${MIME[extname(path).toLowerCase()]};base64,${bytes.toString("base64")}`;

  // --- 1. Pull out the external chunk <script>s, keeping their order and id.
  const entryScripts = [];
  html = html.replace(SCRIPT_TAG_RE, (_tag, before, rel, after) => {
    const attrs = before + after;
    if (/\bnoModule\b/i.test(attrs)) return ""; // legacy-browser polyfills; every supported browser runs modules
    const id = /\bid="([^"]+)"/.exec(attrs)?.[1];
    entryScripts.push({ rel, id });
    return "";
  });
  if (!entryScripts.length) throw new Error("no /_next/static/chunks scripts found — unexpected build output");

  // --- 2. Resolve every chunk the page can ever load, including lazy ones.
  const chunks = new Map(); // rel -> code
  const queue = entryScripts.map((s) => s.rel);
  while (queue.length) {
    const rel = queue.shift();
    if (chunks.has(rel)) continue;
    const code = readDist(rel).toString("utf8");
    chunks.set(rel, code);
    for (const [, ref] of code.matchAll(CHUNK_REF_RE)) if (!chunks.has(ref)) queue.push(ref);
  }

  // --- 3. Preload hints for things that are now inline are dead weight.
  const preloadedFonts = new Set();
  html = html.replace(/<link\b[^>]*>/g, (tag) => {
    const href = /\bhref="([^"]*)"/.exec(tag)?.[1] ?? "";
    if (!href.startsWith("/_next/")) return tag;
    if (/\bas="font"/.test(tag)) preloadedFonts.add(href.slice("/_next/".length));
    if (/\brel="(?:preload|modulepreload)"/.test(tag)) return "";
    throw new Error(`unhandled <link> to a build asset: ${tag}`);
  });

  // --- 4. Assets shared by the markup, the RSC payload and the JS: fonts and small images.
  const imageCache = new Map();
  const inlineSmallImages = (text) => {
    if (!inlineImageMaxBytes) return text;
    return text.replace(/(?<=["'(\s,=])(\/[\w./%@-]+\.(?:webp|png|jpe?g|gif|svg|avif|ico))(?=["')\s,\\])/gi, (path) => {
      if (!imageCache.has(path)) {
        let replacement = null;
        const file = join(publicDir, decodeURIComponent(path));
        if (file.startsWith(publicDir) && existsSync(file) && statSync(file).size <= inlineImageMaxBytes) {
          replacement = dataUri(file, readFileSync(file));
        }
        imageCache.set(path, replacement);
      }
      return imageCache.get(path) ?? path;
    });
  };
  const inlineFonts = (text) =>
    text.replace(FONT_FACE_RE, (rule) => {
      const media = MEDIA_URL_RE.exec(rule)?.[1];
      if (!media) return rule;
      // Only the preloaded subset (latin) is embedded; other unicode-range
      // subsets fall back to the system font stack rather than 404ing.
      if (!preloadedFonts.has(media)) return "";
      return rule.replace(MEDIA_URL_RE, `url(${dataUri(media, readDist(media))})`);
    });
  const transformAssets = (text) => inlineSmallImages(inlineFonts(text));

  // --- 5. Rewrite the RSC payload as one push with the dead CSS copies emptied.
  const flight = extractFlight(html);
  html = flight.html;
  // Preload hints (`:HL[...]`) for build assets would make React insert a
  // <link rel=preload> during hydration — a request for a file that is inline.
  const rows = parseFlight(flight.payload).filter((r) => !(r.kind === "line" && /^H[A-Za-z]?\[/.test(r.text) && r.text.includes("/_next/")));
  const deadCss = styleChildRefs(rows);
  for (const row of rows) {
    if (row.kind === "T" && deadCss.has(row.id)) row.text = "";
    else row.text = transformAssets(row.text);
  }
  const payload = serializeFlight(rows);

  // --- 6. Markup-level asset rewrites, then the payload and chunks go back in.
  html = transformAssets(html);
  html = html.replace(/<link\b[^>]*\brel="preload"[^>]*\bhref="data:[^"]*"[^>]*>/g, "");
  html = html.replace(flight.marker, () => `<script>self.__next_f.push(${scriptJson([1, payload])})</script>`);

  // The runtime chunk boots the app the moment it runs. With external async
  // scripts the others were already in the DOM as <script src>, which the
  // runtime waits on; inline they don't exist yet, so it would request them.
  // Running it last means every chunk is registered before anything asks.
  const entryIds = new Map(entryScripts.map((s) => [s.rel, s.id]));
  const isRuntime = (rel) => /runtimeModuleIds/.test(chunks.get(rel).slice(0, 2000));
  const all = [...entryScripts.map((s) => s.rel), ...[...chunks.keys()].filter((rel) => !entryIds.has(rel))];
  const ordered = [...all.filter((rel) => !isRuntime(rel)), ...all.filter(isRuntime)];
  const scripts = ordered
    .map((rel) => {
      const code = registerInline(stripBaselinePolyfills(transformAssets(chunks.get(rel))), rel);
      const id = entryIds.get(rel);
      // Next's getAssetPrefix() derives the prefix from document.currentScript.src
      // and throws unless it contains "/_next/". An own `src` property on this
      // element answers that without setting the attribute, so nothing is fetched.
      const src = `Object.defineProperty(document.currentScript,"src",{value:new URL(${JSON.stringify(`/_next/${rel}`)},location.href).href});`;
      return `<script${id ? ` id="${id}"` : ""}>${src}${escapeScript(code)}</script>`;
    })
    .join("");
  // Before fetching a chunk the runtime looks for `script[src="<url>"]` and, if
  // present, just waits on it. Registration resolves that wait, so an element
  // with the URL but a non-JavaScript type (never fetched, per the HTML spec)
  // is all it needs to not request a chunk that is already inline.
  const placeholders = ordered.map((rel) => `<script type="${PLACEHOLDER_TYPE}" async src="/_next/${rel}"></script>`).join("");
  if (!html.includes("</body>")) throw new Error("no </body> to append scripts to");
  html = html.replace("</body>", () => `${placeholders}${scripts}</body>`);

  // --- 7. Fail loudly rather than ship a page that silently 404s at runtime.
  const outsideScripts = html.replace(/<script\b[\s\S]*?<\/script>/g, "");
  const fetchable = /<script\b(?![^>]*\btype="text\/x-inlined")[^>]*\bsrc="[^"]*\/_next\//.exec(html);
  if (fetchable) throw new Error(`build asset still loaded by a script tag: ${fetchable[0]}`);
  // data-href is excluded on purpose: it is the key React adopts the inlined <style> by.
  const leftover = /(?<![\w-])(?:src|href|srcset|imagesrcset)="[^"]*\/_next\/[^"]*"/i.exec(outsideScripts);
  if (leftover) throw new Error(`build asset still referenced after inlining: ${leftover[0]}`);
  for (const [, ref] of payload.matchAll(/\/_next\/(static\/chunks\/[\w.-]+\.js)/g)) {
    if (!chunks.has(ref)) throw new Error(`RSC payload references a chunk that was not inlined: ${ref}`);
  }

  return {
    html,
    stats: {
      chunks: chunks.size,
      lazyChunks: chunks.size - entryScripts.length,
      cssCopiesRemoved: deadCss.size,
      imagesInlined: [...imageCache.values()].filter(Boolean).length,
    },
  };
}

/**
 * Next always bundles next/dist/build/polyfills/polyfill-module (trimStart,
 * flat, at, hasOwn, …), which Lighthouse reports as "Legacy JavaScript". Every
 * browser Next supports (Chrome/Edge/Firefox 111, Safari 16.4) has all of it
 * except URL.canParse, so the sequence is cut just before that last polyfill.
 * The match is exact or nothing: an unrecognised shape is left alone.
 */
const BASELINE_POLYFILLS_RE = /"trimStart"in String\.prototype\|\|\(String\.prototype\.trimStart=String\.prototype\.trimLeft\),[\s\S]{0,3000}?(?="canParse"in URL\|\|)/;
function stripBaselinePolyfills(code) {
  return code.replace(BASELINE_POLYFILLS_RE, "");
}

/** Replace the chunk's self-registration via document.currentScript with its path. */
function registerInline(code, rel) {
  const at = code.indexOf(CURRENT_SCRIPT);
  if (at === -1 || at > 200) {
    throw new Error(`${rel}: Turbopack chunk registration not found — the chunk format changed; update scripts/html/inline.mjs`);
  }
  return code.slice(0, at) + JSON.stringify(rel) + code.slice(at + CURRENT_SCRIPT.length);
}

/** Inline <script> content may not contain "</script"; "<\/" means the same thing in every JS context it appears in. */
function escapeScript(code) {
  return code.replace(/<\/(script)/gi, "<\\/$1");
}

/** JSON safe to embed in a <script>: no "<", so no "</script>" or "<!--". (U+2028/9 are legal in string literals since ES2019.) */
function scriptJson(value) {
  return JSON.stringify(value).replace(/</g, "\\x3c");
}

/** Removes the type-1 (string) flight pushes, leaving a marker where the first one was. */
function extractFlight(html) {
  const marker = "<!--__flight__-->";
  let payload = "";
  let placed = false;
  html = html.replace(FLIGHT_SCRIPT_RE, (tag, json) => {
    const entry = JSON.parse(json);
    if (entry[0] === 0) return tag; // bootstrap: `(self.__next_f=...).push([0])`
    if (entry[0] !== 1) {
      // Binary/form-state chunks are order-sensitive relative to the string
      // ones; merging around them would reorder the stream.
      throw new Error(`unsupported RSC chunk type ${entry[0]} — page cannot be merged safely`);
    }
    payload += entry[1];
    if (placed) return "";
    placed = true;
    return marker;
  });
  if (!placed) throw new Error("no RSC payload found in page");
  return { html, payload, marker };
}

/** Splits a flight stream into rows. `T` rows are length-prefixed (UTF-8 bytes); all others end at "\n". */
export function parseFlight(payload) {
  const buf = Buffer.from(payload, "utf8");
  const rows = [];
  let i = 0;
  while (i < buf.length) {
    const colon = buf.indexOf(0x3a, i);
    if (colon === -1) throw new Error(`malformed RSC row at byte ${i}`);
    const id = buf.toString("latin1", i, colon);
    if (buf[colon + 1] === 0x54 /* T */) {
      const comma = buf.indexOf(0x2c, colon + 2);
      const len = parseInt(buf.toString("latin1", colon + 2, comma), 16);
      const start = comma + 1;
      rows.push({ id, kind: "T", text: buf.toString("utf8", start, start + len) });
      i = start + len;
    } else {
      if (/^[AOoUSsLlGgMmV][0-9a-f]+,/.test(buf.toString("latin1", colon + 1, colon + 12))) {
        throw new Error(`binary RSC row ${id} is not supported`);
      }
      const nl = buf.indexOf(0x0a, colon + 1);
      if (nl === -1) throw new Error(`unterminated RSC row ${id}`);
      rows.push({ id, kind: "line", text: buf.toString("utf8", colon + 1, nl) });
      i = nl + 1;
    }
  }
  if (serializeFlight(rows) !== payload) throw new Error("RSC payload did not round-trip through the parser");
  return rows;
}

export function serializeFlight(rows) {
  return rows
    .map((r) => (r.kind === "T" ? `${r.id}:T${Buffer.byteLength(r.text, "utf8").toString(16)},${r.text}` : `${r.id}:${r.text}\n`))
    .join("");
}

/** Ids of the T rows that are the children of a hoisted `<style precedence href>` element. */
function styleChildRefs(rows) {
  const refs = new Set();
  const walk = (node) => {
    if (!Array.isArray(node)) {
      if (node && typeof node === "object") for (const v of Object.values(node)) walk(v);
      return;
    }
    const [marker, type, , props] = node;
    if (marker === "$" && type === "style" && props?.precedence && props?.href && typeof props.children === "string") {
      const m = /^\$([0-9a-f]+)$/.exec(props.children);
      if (m) refs.add(m[1]);
    }
    node.forEach(walk);
  };
  for (const row of rows) {
    if (row.kind !== "line" || !/^[[{]/.test(row.text)) continue;
    try {
      walk(JSON.parse(row.text));
    } catch {
      // Not plain JSON (a tagged row such as I/HL) — it can't hold a style element.
    }
  }
  return refs;
}
