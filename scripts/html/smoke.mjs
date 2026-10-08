#!/usr/bin/env node
// npm run html:smoke [-- <slug> ...] [--base=http://localhost:3000]
//
// Loads generated pages in headless Chrome (DevTools protocol over Node's
// built-in WebSocket — no Puppeteer) and fails a page when:
//   - React did not hydrate it (the page would look right but nothing works),
//   - it requested anything under /_next/ (an asset escaped inlining),
//   - it threw, logged a console error, or got a 4xx/5xx from its own origin,
//   - its lead form does not show validation errors on an empty submit.
// Starts `serve.mjs` itself unless --base points at a running server.
// Chrome: $CHROME_PATH, else the usual install locations.

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const HTML_DIR = join(ROOT, "generated-html");
const args = process.argv.slice(2);
const options = Object.fromEntries(args.filter((a) => a.includes("=")).map((a) => a.replace(/^--/, "").split(/=(.*)/s)));
const slugs = args.filter((a) => !a.startsWith("--"));
const HYDRATION_TIMEOUT_MS = 15000;
// Fail-soft by design (the form never blocks on them) and they call third
// parties that CI may not reach, so their status codes are not judged here.
const IGNORED_PATHS = /^\/api\//;

const targets = slugs.length
  ? slugs
  : readdirSync(HTML_DIR).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5)).sort();

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ];
  const found = candidates.find((c) => c && existsSync(c));
  if (!found) throw new Error("Chrome not found — set CHROME_PATH");
  return found;
}

/** Resolves with the first stdout/stderr line matching `re`. */
function waitForLine(child, re, what) {
  return new Promise((resolveLine, reject) => {
    let buffer = "";
    const timer = setTimeout(() => reject(new Error(`timed out waiting for ${what}`)), 20000);
    const onData = (data) => {
      buffer += data;
      const m = re.exec(buffer);
      if (m) {
        clearTimeout(timer);
        resolveLine(m);
      }
    };
    child.stdout?.on("data", onData);
    child.stderr?.on("data", onData);
    child.on("exit", (code) => reject(new Error(`${what}: process exited with ${code}\n${buffer}`)));
  });
}

class Cdp {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Set();
    this.ws.addEventListener("message", ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve: ok, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else ok(msg.result);
      } else if (msg.method) {
        for (const listener of this.listeners) listener(msg);
      }
    });
  }
  open() {
    return new Promise((ok, reject) => {
      this.ws.addEventListener("open", ok, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
  }
  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((ok, reject) => this.pending.set(id, { resolve: ok, reject }));
  }
  on(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function checkPage(cdp, base, slug) {
  const problems = [];
  const origin = new URL(base).origin;
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const send = (method, params) => cdp.send(method, params, sessionId);

  let loaded = false;
  const off = cdp.on((msg) => {
    if (msg.sessionId !== sessionId) return;
    const p = msg.params;
    switch (msg.method) {
      case "Page.loadEventFired":
        loaded = true;
        break;
      case "Network.requestWillBeSent":
        if (new URL(p.request.url, base).pathname.startsWith("/_next/")) problems.push(`requested build asset ${p.request.url}`);
        break;
      case "Network.responseReceived": {
        const url = new URL(p.response.url);
        if (url.origin === origin && p.response.status >= 400 && !IGNORED_PATHS.test(url.pathname)) {
          problems.push(`HTTP ${p.response.status} ${url.pathname}`);
        }
        break;
      }
      case "Runtime.exceptionThrown":
        problems.push(`uncaught: ${p.exceptionDetails.exception?.description ?? p.exceptionDetails.text}`);
        break;
      case "Runtime.consoleAPICalled":
        if (p.type === "error") problems.push(`console.error: ${p.args.map((a) => a.value ?? a.description).join(" ").slice(0, 300)}`);
        break;
    }
  });

  try {
    await Promise.all([send("Page.enable"), send("Runtime.enable"), send("Network.enable")]);
    await send("Page.navigate", { url: `${base}/${slug}` });
    for (const start = Date.now(); !loaded && Date.now() - start < HYDRATION_TIMEOUT_MS; ) await sleep(100);
    if (!loaded) problems.push("load event never fired");

    const evaluate = async (expression) =>
      (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

    // hydrateRoot(document) tags the document with React's container key.
    let hydrated = false;
    for (const start = Date.now(); !hydrated && Date.now() - start < HYDRATION_TIMEOUT_MS; await sleep(100)) {
      hydrated = await evaluate(`Object.keys(document).some((k) => k.startsWith("__reactContainer"))`);
    }
    if (!hydrated) problems.push("React never hydrated the page");

    // Empty submit on the first visible form must surface validation messages.
    // Several sections hold the form back behind a ~6 s intro (INTRO_DURATION).
    const form = hydrated
      ? await evaluate(`(async () => {
          let form;
          for (let i = 0; i < 100 && !form; i++) {
            form = [...document.querySelectorAll("form")].find((f) => f.offsetParent !== null);
            if (!form) await new Promise((r) => setTimeout(r, 100));
          }
          if (!form) return "no-form";
          const before = form.innerText;
          form.querySelector('[type="submit"]')?.click();
          for (let i = 0; i < 40; i++) {
            await new Promise((r) => setTimeout(r, 100));
            if (/required/i.test(form.innerText) && form.innerText !== before) return "validated";
          }
          return location.pathname.endsWith("/${slug}") ? "no-validation" : "navigated";
        })()`)
      : "skipped";
    if (form === "no-validation") problems.push("lead form showed no validation errors on an empty submit");
    if (form === "navigated") problems.push("empty lead form submitted and navigated away");
    await sleep(300); // let late console errors land
    return { problems, form };
  } finally {
    off();
    await cdp.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

async function main() {
  if (!targets.length) {
    console.log("no pages to smoke-test");
    return;
  }

  let server;
  let base = options.base?.replace(/\/$/, "");
  if (!base) {
    server = spawn(process.execPath, ["--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", join(ROOT, "scripts/html/serve.mjs")], {
      env: { ...process.env, PORT: "0", HOST: "127.0.0.1" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    const [, url] = await waitForLine(server, /on (http:\/\/\S+)/, "serve.mjs");
    base = url;
  }

  const profile = mkdtempSync(join(tmpdir(), "html-smoke-"));
  const chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--disable-extensions",
      ...(process.platform === "linux" ? ["--no-sandbox"] : []),
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  let failed = 0;
  try {
    const [, wsUrl] = await waitForLine(chrome, /DevTools listening on (ws:\/\/\S+)/, "Chrome");
    const cdp = new Cdp(wsUrl);
    await cdp.open();
    for (const slug of targets) {
      const { problems, form } = await checkPage(cdp, base, slug);
      if (problems.length) {
        failed++;
        console.log(`✗ ${slug}`);
        for (const p of [...new Set(problems)]) console.log(`    ${p}`);
      } else {
        console.log(`✓ ${slug}  (hydrated, form: ${form})`);
      }
    }
  } finally {
    chrome.kill();
    server?.kill();
    await sleep(500);
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
  console.log(`\n${targets.length - failed}/${targets.length} page(s) passed`);
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
