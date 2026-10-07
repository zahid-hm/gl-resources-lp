# Generated HTML → stage-resources.getlevrg.com

Every `src/app/<slug>/page.tsx` is also shipped as one self-contained file,
`generated-html/<slug>.html`, and served from **stage-resources.getlevrg.com/<slug>**
by a small Node server, not by Next.js. The Next app on `main` (deploy.yml) is unaffected.

## Commands

| Command | What it does |
|---|---|
| `npm run html:generate` | Converts every page that has **no** `.html` yet. Builds with Next, then inlines. |
| `npm run html:generate -- crm video-saas` | (Re)converts exactly these pages. |
| `npm run html:generate -- --all` | Reconverts everything. **Use after changing anything shared**: a `sections/*.tsx` file, `components/`, `lib/`, `globals.css`, `layout.tsx`, `public/` images under 1 KB. |
| `npm run html:check` | Converts nothing; exits 1 if a page has no `.html` (CI runs this). |
| `npm run html:serve` | The stage server, which is what the container runs. `PORT=3000` by default. |
| `npm run html:smoke [-- slug …]` | Loads pages in headless Chrome: hydration, zero `/_next/` requests, no errors, lead-form validation. |
| `npm run html:unpublished -- --url=…` | Lists pages whose bytes differ from what a server is serving. |
| `npm run html:validate [-- slug …]` | Landing-page rules (ported from `getlevrg-landing-pages`' `validate_pages.py`): form GUID, lead fields, ns array, widget contract, HTML structure, UTF-8, CDN host. |

`html:generate` needs `NEXT_PUBLIC_SITE_URL` (env or `.env`), which is baked into canonical and OG URLs.
Commit `generated-html/` with the source change. Never hand-edit a generated file; edit the `.tsx` and regenerate.

> "Missing" means *no file*, not *stale*. Editing an existing page does not make
> `html:generate` pick it up. Name the slug, or use `--all`. Output is
> deterministic, so `--all` only changes the files whose content actually changed.

## What "self-contained" means here

`scripts/html/inline.mjs` post-processes the prerendered page from a dedicated build
(`HTML_BUILD=1` → `.next-html/`, `experimental.inlineCss`, fixed build ID):

- **All JavaScript is inline**, including lazily imported chunks (libphonenumber). The page still
  hydrates as the real React app, so forms, accordions, carousels and the intro animation all work.
- **CSS is inline**, and the two extra copies Next puts in the RSC payload are emptied (about 200 KB per page).
- **The Inter latin font is a data URI.** Other unicode-range subsets fall back to the system font.
- **Images ≤ 1 KB become data URIs** (`--inline-max=<bytes>` to change). Larger images, video,
  flags and `/data/countries.json` stay as root-relative URLs, served from `public/` by the stage server.
- Nothing under `/_next/` is requested at runtime. Generation fails if anything is left, and the
  smoke test fails if the browser asks for one.

A page is ~1.2–1.4 MB raw and ~320 KB as served (brotli). The JS is the same code the Next site
ships, but a self-contained page can't share a cached bundle across pages.

The form calls `/api/check-email` and `/api/geolocate`; `serve.mjs` implements both (ports of
`src/app/api/*/route.ts`; keep them in step). Submitting navigates to `/thank-you` with a full page load.

## CI/CD: `.github/workflows/stage-html.yml` (push to `stage`)

1. **detect**: `html:check`, then `html:unpublished` diffs sha256 of each page against
   `https://stage-resources.getlevrg.com/__manifest.json`. If nothing is new or changed, the run stops.
2. **test**, on the unpublished pages only:
   - `html:validate`, the landing-page rules ported from `getlevrg-landing-pages`: HTML well-formedness,
     UTF-8/mojibake, raw HubSpot CDN host, and the lead-form/GUID/ns-array/widget rules where they apply.
     The two HubSpot page-identity rules are not ported: `filename_pattern` (stems here are slugs) and
     `id_mapping` (no HubSpot ID; it is also the rule that could create a HubSpot draft).
   - `html:smoke` in headless Chrome.
3. **deploy**: `Dockerfile.html` → image `gl-resources-lp-stage` (server + `public/` + pages,
   precompressed) → scp to the VPS → `docker compose up` (`docker-compose.stage.yml`, host port 3006).
   The previous image is kept as `:previous`. Then the job waits until the manifest reports this
   commit and nothing is unpublished.

Manual run: Actions → Stage HTML → Run workflow (tick **force** to redeploy with nothing changed).

**Rollback** on the VPS: `cd ~/gl-resources-lp-stage && docker tag gl-resources-lp-stage:previous gl-resources-lp-stage:latest && docker compose up -d --force-recreate`

### One-time setup

- **Secrets**: `VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY` (already used by deploy.yml);
  optional `IPWHOIS_ENDPOINT`, `DOH_ENDPOINT`, and `HUBSPOT_ACCESS_TOKEN` (enables the validator's API-backed checks).
- **Branch**: create `stage`.
- **DNS + TLS**: point `stage-resources.getlevrg.com` at the VPS and proxy it to `127.0.0.1:3006`
  (same pattern as the main site's server block in DEPLOYMENT.md).

The server sends `X-Robots-Tag: noindex, nofollow` (stage must not be indexed). Canonical URLs
in the pages still point at `NEXT_PUBLIC_SITE_URL`.

## When it breaks

- **`Turbopack chunk registration not found` / `unsupported RSC chunk type`**: a Next upgrade
  changed an internal format that `inline.mjs` depends on. The checks exist so this fails at
  generation time, not in a visitor's browser. Fix `inline.mjs`, then `--all` and `html:smoke`.
- **`not prerendered as static HTML`**: the page became dynamic (cookies, headers, searchParams),
  and a dynamic page can't be a static file.
- **Smoke: "React never hydrated"**: the page renders but nothing on it works. Check the
  `uncaught:` lines above it.
- **On Windows `html:generate` always builds every route**: Next's `--debug-build-paths` doesn't match
  Windows paths, so scoped builds only happen on macOS/Linux. The output is the same either way.
