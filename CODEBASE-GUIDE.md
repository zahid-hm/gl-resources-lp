# gl-resources-lp — Codebase File Guide

A per-file map of this repository: **what each file does**, **what to edit inside it to change a given thing**, and **what else breaks or changes when you do**.

Generated against commit `212c3d3` (branch `main`). Stack: **Next.js 16.3.5 (App Router)** · React 19.2 · Tailwind CSS v4 · TypeScript (strict) · Zod + react-hook-form · Radix UI · Framer Motion. Deployed as a standalone Docker container to a VPS via GitHub Actions.

---

## Table of contents

1. [Mental model — how a page is assembled](#1-mental-model--how-a-page-is-assembled)
2. [Root config files](#2-root-config-files)
3. [`public/` — static assets](#3-public--static-assets)
4. [`src/app/` — routes](#4-srcapp--routes)
5. [`src/app/api/` — server routes](#5-srcappapi--server-routes)
6. [`src/components/layout/` — site chrome](#6-srccomponentslayout--site-chrome)
7. [`src/components/sections/` — the content engine](#7-srccomponentssections--the-content-engine)
8. [`src/components/shared/` — reusable blocks](#8-srccomponentsshared--reusable-blocks)
9. [`src/components/sample/` + `src/components/ui/`](#9-srccomponentssample--srccomponentsui)
10. [`src/hooks/` and `src/lib/`](#10-srchooks-and-srclib)
11. [`scripts/`](#11-scripts)
12. [**Recipe: add a new page `/src/app/<folder>/page.tsx`**](#12-recipe-add-a-new-page)
13. [**Deployment — what to change where**](#13-deployment--what-to-change-where)
14. [Change → blast-radius cheat sheet](#14-change--blast-radius-cheat-sheet)
15. [Known inconsistencies worth fixing](#15-known-inconsistencies-worth-fixing)

---

## 1. Mental model — how a page is assembled

There are **64 routes**. Almost none of them contain their own content sections. The structure is:

```
src/app/<route>/page.tsx          ← hero + SEO meta + the ORDER of sections  (what you usually edit)
        │
        ├── <PageShell meta={...}>          ← Header, Footer, <title>/OG/canonical tags
        │        └── src/components/layout/PageShell.tsx
        │
        └── imports sections from
                 src/components/sections/<category>.tsx   ← the actual copy, stats, FAQs, pricing
```

Six "category" files hold the real content, shared by every variant page in that category:

| Section file | Routes that import it | Count |
|---|---|---|
| `sections/video.tsx` | `/video`, `video-accounting`, `video-agencies`, `video-consulting`, `video-financial-advisory`, `video-founder-operator`, `video-legal`, `video-marketing-ops`, `video-saas`, `video-vp-marketing`, `video-it-services-v3` | 11 |
| `sections/social.tsx` | `/social`, `social-accounting`, `social-architecture`, `social-commercial`, `social-consulting`, `social-engineering`, `social-financial-advisory`, `social-it-services`, `social-legal`, `social-saas`, `social-staffing` | 11 |
| `sections/crm.tsx` | `/crm`, `crm-accounting`, `crm-consulting`, `crm-financial-advisory`, `crm-it-services`, `crm-legal`, `crm-saas`, `crm-staffing` | 8 |
| `sections/linkedin-outbound.tsx` | `/linkedin-outbound`, `linkedin-accounting`, `linkedin-architecture`, `linkedin-commercial`, `linkedin-consulting`, `linkedin-engineering`, `linkedin-financial-advisory`, `linkedin-it-services`, `linkedin-legal`, `linkedin-saas`, `linkedin-staffing`, `linkedin-vp-marketing` | 12 |
| `sections/website-optimization.tsx` | `/website-optimization` + `-accounting`, `-agencies`, `-commercial`, `-consulting`, `-financial-advisory`, `-it-services`, `-legal`, `-saas` | 9 |
| `sections/video-it-services.tsx` | `/video-it-services`, `video-it-services-v3` | 2 |

**Self-contained pages** (no shared sections — edit the page file itself): `fmt`, `thank-you`, `sample-video-v1`, `sample-video-v2`, `social-v1`, `social-v2`, `video-v1`, `video-v2`, `video-it-services-v1`, `video-it-services-v2`.

> ⚠️ **The single most important rule:** editing `sections/video.tsx` changes **11 live pages at once**. Editing `src/app/video-saas/page.tsx` changes **one**. Always confirm which layer you're in before changing copy.

---

## 2. Root config files

### `package.json`
Dependencies and the five npm scripts.

| To change… | Edit |
|---|---|
| Add a library | `dependencies`, then `npm install` |
| Add a command | `scripts` block |
| Minimum Node version | `engines.node` (currently `>=20.9.0`) — must stay ≤ the Dockerfile's `node:22-alpine` |

Scripts: `dev` (hot reload) · `build` (production + full type-check of every route) · `start` (serve the build) · `lint` · `optimize-images` (manual, not part of the build).

**Effect:** adding a dependency changes `package-lock.json`, which invalidates the Docker `deps` layer and makes the next CI build slower.

### `next.config.ts`
Framework behaviour and HTTP response headers.

| To change… | Edit |
|---|---|
| Security headers (CSP, frame options, permissions) | `SECURITY_HEADERS` array |
| Cache lifetime of static assets | the `IMMUTABLE` constant / the `headers()` source patterns |
| Which `public/` folders get the 1-year immutable cache | the `source: "/:dir(images\|logos\|flags\|video\|data)/:path*"` pattern |
| Tree-shaking of big packages | `experimental.optimizePackageImports` |
| Redirects / rewrites | add `async redirects()` / `async rewrites()` here |

**Effect of the immutable cache:** files under `images/`, `logos/`, `flags/`, `video/`, `data/` are cached by browsers and CDNs for **one year**. Overwriting `hero.webp` in place will **not** reach returning visitors. *Change the filename* to bust the cache (e.g. `crm-hero-v2.webp`) and update every reference.

`output: "standalone"` is what makes the Dockerfile's `node server.js` work — don't remove it.

### `tsconfig.json`
The `@/*` → `./src/*` path alias lives in `paths`. Every import in the codebase uses it (`@/components/...`). Strict mode is on, so `npm run build` fails on type errors.

### `postcss.config.mjs`
Loads `@tailwindcss/postcss`. Tailwind v4 has **no `tailwind.config.js`** — all theme configuration lives in `src/app/globals.css` under `@theme inline`. Don't go looking for a Tailwind config file; there isn't one.

### `eslint.config.mjs`
Flat ESLint config extending `next/core-web-vitals` + `next/typescript`. Add rule overrides or ignore paths here.

### `.env` / `.env.example`
Six variables. `.env` is git-ignored; `.env.example` is the committed template — **update it whenever you add a variable**, since it's the only documentation of what the app needs.

| Variable | Scope | Used by |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build + runtime, client-visible | `layout.tsx` (`metadataBase`) and `PageShell.tsx` (canonical + absolute OG image URLs) |
| `IPWHOIS_ENDPOINT` | server only | `api/geolocate/route.ts` (defaults to `https://ipwho.is`) |
| `DOH_ENDPOINT` | server only | `api/check-email/route.ts` (defaults to Cloudflare DoH) |
| `NEXT_PUBLIC_HUBSPOT_SCRIPT_URL` | client | `/thank-you` meetings embed |
| `NEXT_PUBLIC_HUBSPOT_MEETING_URL` | client | `/thank-you` booking calendar |
| `NEXT_PUBLIC_THANKYOU_VIDEO_ID` | client | `/thank-you` YouTube embed |

> 🔴 `NEXT_PUBLIC_*` values are **inlined into the browser bundle at build time**, not read at runtime. Changing `NEXT_PUBLIC_SITE_URL` on the server without rebuilding the image does nothing. Never put a secret in a `NEXT_PUBLIC_` variable.
>
> 🔴 `layout.tsx` uses `process.env.NEXT_PUBLIC_SITE_URL!` with **no fallback** — if it's unset the build crashes at `new URL(undefined)`.

### `Dockerfile`, `docker-compose.dev.yml`, `.dockerignore`
See [§13 Deployment](#13-deployment--what-to-change-where).

### `AGENTS.md` / `CLAUDE.md`
Instructions for AI coding agents. `CLAUDE.md` just does `@AGENTS.md`. The Next.js block inside `AGENTS.md` is **auto-regenerated by `next dev`** — if you delete it, it comes back.

### `README.md` / `DEPLOYMENT.md`
Human onboarding docs. `DEPLOYMENT.md` is currently **out of date** — see [§15](#15-known-inconsistencies-worth-fixing).

---

## 3. `public/` — static assets

Everything here is served from the URL root: `public/logo.webp` → `https://site.com/logo.webp`. No import needed; reference by absolute path in JSX.

| Path | Contents | Edit when you want to… |
|---|---|---|
| `public/` (root) | `logo.webp` (dark header logo), `Light Logo.webp` (footer logo), `favicon.webp` | Rebrand. `logo.webp` → `Header.tsx`; `Light Logo.webp` → `Footer.tsx`; `favicon.webp` → `layout.tsx` `icons.icon` |
| `public/images/hero/` | 2 files per page: `<slug>-hero.webp` (1600w) + `<slug>-hero-sm.webp` (800w) | Change a page's hero background **and** its social-share image. Referenced in the page's `HeroSection` `srcSet` **and** in `PageShell meta.ogImage` |
| `public/images/client/` | 22 headshots, 192px, used in testimonial quotes | Add/replace a testimonial author photo. Referenced in `sections/*.tsx` testimonial arrays and `lib/constants.ts` `TESTIMONIALS` |
| `public/images/work-samples/` | Case-study screenshots, `.webp` + `-sm.webp` pairs | Update portfolio imagery. Consumed via `workSampleSrcSet()` from `lib/responsive-image.ts` |
| `public/images/fmt/` | Six ICP cards at 1x and `@2x`, used only by `/fmt` | Change the fractional-marketing-team page cards |
| `public/logos/b2b/` (38) | Client logos in the trust marquee | **Add a logo file here, then add its entry to the `trustedLogos` array in `shared/TrustedByMarquee.tsx`** — dropping the file in alone does nothing |
| `public/logos/b2c/` (12) | B2C client logos | Currently referenced by a subset of pages only |
| `public/logos/applogos/` (56) | Tool logos (HubSpot, Salesforce, Figma…) | Add a tool to a "Tools We Use" section — then add the entry to that section's local `tools` array inside the relevant `sections/<category>.tsx` |
| `public/flags/` | 230 country flag SVGs, named by lowercase ISO2 | Only touch if adding a country; the path comes from `countries.json`'s `flag` field |
| `public/video/` | `intro1-3.mp4`, two `.webm` targeting clips | Replace demo/background video |
| `public/data/countries.json` | Array of `{iso2, iso3, name, dialCode, flag, capital, continent}` | The phone-picker country list. **Fetched at runtime by `PhoneField.tsx`** — not bundled, so editing it needs no rebuild of the JS, but the 1-year immutable header means you must rename the file to force a refresh |
| `public/data/countries.by-iso2.json` | Same data keyed by ISO2 | Lookup variant; keep in sync if you edit `countries.json` |
| `public/robots.txt` | Crawler rules + sitemap pointer | Block a path from crawlers, or change the sitemap URL (hardcoded to `https://getlevrg.com/sitemap.xml`) |
| `public/sitemap.xml` | **Hand-maintained**, 59 `<url>` entries | ⚠️ **You must add every new public page here manually.** It is not generated. `thank-you`, `sample-video-v1`, `sample-video-v2` are deliberately excluded (they're `noindex`) |
| `public/llms.txt` | Summary for LLM crawlers | ⚠️ Contains **stale** `gl-vite-lp.vercel.app` URLs and describes the site as a React-Router SPA. Update when you touch site structure |

---

## 4. `src/app/` — routes

### `src/app/layout.tsx` — root layout (Server Component)
Wraps **every** page. Owns: the Inter font (`next/font/google`), `metadataBase`, the favicon, the viewport/theme-color, the `<noscript>` animation fallback, and mounts `<Toaster />`.

| To change… | Edit |
|---|---|
| Site font | the `Inter(...)` call; the CSS variable `--font-inter` is consumed in `globals.css` |
| Favicon | `metadata.icons.icon` |
| Browser theme colour | `viewport.themeColor` (currently `#51B027`) |
| Anything that must appear on all 64 pages | add inside `<body>` |

> Deliberately **no** `title`/`description` here. A root-level title would render *before* each page's `PageShell` title in `<head>`, and browsers/crawlers use the first one — which previously made all 64 pages report the same title. Don't re-add them.

**Effect:** any change here invalidates every page.

### `src/app/globals.css` — the entire design system
Tailwind v4 config lives here (no `tailwind.config.js`).

| To change… | Edit this block |
|---|---|
| Brand colours | `@theme inline` → `--color-spark-50` … `--color-spark-900` (`#51B027` is the primary) |
| Dark surfaces | `--color-void`, `--color-surface-dark`, `--color-raised`, `--color-border-dark` |
| Status colours | `--color-warning` / `--color-error` / `--color-success` / `--color-info` |
| Typography scale | the `@utility text-display`, `text-h1`, `text-h2`, `text-h3`, `text-sub`, `text-body`, `text-sm-body`, `text-caption`, `text-display-lg`, `text-display-xl`, `text-sl` blocks |
| Max page width | `@utility max-w-container` (currently `1200px`) |
| Marquee scroll speed | `--animate-marquee-left/right/up` durations |
| Entrance animations | `.gl-reveal` + `.gl-d1`…`.gl-d4` delay helpers |
| Scroll-reveal behaviour | `.gl-scroll-reveal` / `.gl-stagger` (paired with `shared/AnimatedSection.tsx`) |
| Decorative backgrounds | `.bg-grid-pattern`, `.bg-dot-pattern`, `.glow-brand` |

Two notes: (1) the stagger system hardcodes `:nth-child(1)`…`(24)` — a container with **more than 24 children** will have the extras appear with no animation; add more rules if needed. (2) Hero animations are CSS, not Framer Motion, deliberately — Framer renders `opacity:0` into the SSR HTML, which delayed LCP. Don't convert hero elements back to `motion.*`.

**Effect:** global. Changing `--color-spark-600` recolours every CTA button on the site.

### `src/app/page.tsx` — root route
Five lines: `redirect("/video")`. Edit to change what `/` serves.

### `src/app/not-found.tsx` — 404 page
Client component with its own Header/Footer (not `PageShell`). Edit the copy or the "Back to Home" target (currently `/video`).

### `src/app/<route>/page.tsx` — the 64 landing pages
Two shapes:

**Shape A — base page (4 lines):**
```tsx
import { CrmPage } from "@/components/sections/crm";
export default function Page() { return <CrmPage />; }
```
*(`/crm`, `/video`, `/social`, `/website-optimization`, `/linkedin-outbound`, `/video-it-services`)* — to change these, edit the `XxxPage()` function at the bottom of the section file, not the route file.

**Shape B — variant page (~200–900 lines):** `"use client"` + a local `HeroSection()` + a default export composing imported sections. This is where you edit **per-page** hero copy, images, SEO, and section order.

Inside a variant page:

| To change… | Edit |
|---|---|
| Page title / meta description / keywords | the `meta` prop on `<PageShell>` |
| Social-share preview image | `meta.ogImage` — must be a path under `/images/hero/`; `PageShell` prefixes `NEXT_PUBLIC_SITE_URL` to make it absolute |
| Hide from Google | `meta.noindex: true` (as `/thank-you` and `/sample-video-v1` do) |
| Header nav links | the `navItems` array — hrefs are `#anchors` matching `id=` attributes on sections |
| Header CTA text / target | `ctaText`, `ctaTarget` props |
| Hero headline, sub-copy, badges, pull-quote | inside the local `HeroSection()` |
| Hero background image | the `<img src>` + `srcSet` in `HeroSection` (both the `-sm` and full variants) |
| Which sections appear, and in what order | the JSX children of `<PageShell>` |
| Testimonial company names | the `industry` prop on `<TestimonialsSection industry="accounting" />` — when the testimonial's `matchesIndustries` doesn't include it, the component swaps in a generic company name |

**Notable individual pages:** `fmt/page.tsx` (1,505 lines, fully self-contained) · `thank-you/page.tsx` (438 lines — HubSpot calendar embed, YouTube embed, `ServiceCapabilities`, `noindex`; the redirect target of every form submit) · `*-v1`/`*-v2` A/B variants (self-contained, use the `sample/` mobile-app-shell components).

---

## 5. `src/app/api/` — server routes

### `api/check-email/route.ts`
`GET /api/check-email?email=…` → `{ domain, hasMx, disposable, suspicious }`. Runs three checks: exact match against the `disposable-email-domains` package, a keyword/TLD heuristic, and an MX lookup over DNS-over-HTTPS. Responses are cached 1 hour.

| To change… | Edit |
|---|---|
| Suspicious keywords / TLDs | `SUSPICIOUS_KEYWORDS`, `SUSPICIOUS_TLDS` in **`lib/constants.ts`** (not this file) |
| DNS resolver | `DOH_ENDPOINT` env var |
| Cache duration | the `Cache-Control` header |

**Effect:** consumed by `lead-form-schema.ts`'s `emailField`. It deliberately **never blocks on its own failure** — a 5xx or network error lets the submission through.

### `api/geolocate/route.ts`
`GET /api/geolocate` → `{ countryCode }`. Proxies `ipwho.is` server-side so no key is exposed. Reads `x-forwarded-for` (set by your Nginx reverse proxy — without it, behind a proxy, every visitor geolocates to the server's own IP). Explicitly `no-store`.

**Effect:** consumed by `PhoneField.tsx` on mount, with a 3-second timeout (`GEO_TIMEOUT_MS`). On failure the field silently keeps `defaultCountry` ("US").

> To add a new API endpoint: `src/app/api/<name>/route.ts`, exporting `GET`/`POST`. No registration step.

---

## 6. `src/components/layout/` — site chrome

### `PageShell.tsx` ⭐ *the SEO layer*
Client component wrapping every page. Renders all meta tags inline in JSX (Next.js SSRs them into `<head>`), then `Header` → `<main>` → `Footer`.

| To change… | Edit |
|---|---|
| Which meta tags exist on every page | the `<>…</>` block inside `{meta && …}` — add e.g. `og:locale`, `article:*` here once and all 64 pages get it |
| Default OG image when a page omits one | `defaultOgImage` (currently `/images/hero/video-hero.webp`) |
| Canonical URL construction | `canonicalUrl` — `NEXT_PUBLIC_SITE_URL + pathname` |
| Site name in OG tags | the `og:site_name` content (`"Get Levrg"`) |
| Spacing under the fixed header | the `pt-16 sm:pt-20` on `<main>` |
| A new per-page option | add to the `PageShellProps` / `PageMetaProps` interfaces, then pass it through |

**Effect:** the highest-leverage SEO file in the repo. One line here changes 64 pages' `<head>`.

### `Header.tsx`
Fixed, blur-backed header. Props: `navItems`, `ctaText`, `ctaTarget`, `centerLogo`, `hideCta`, `dynamicCta`. Handles smooth-scroll to anchors, the scroll-shadow transition at 20px, the mobile hamburger menu, and (with `dynamicCta`) hiding the CTA while the form is on screen via `IntersectionObserver`.

Edit for: the logo (`/logo.webp`), the default CTA label (`"Book My Call"`), nav styling, the mobile breakpoint (`md:`), or the scroll threshold.

### `Footer.tsx`
14 lines. Logo + copyright. Edit the year or add footer links here — it has no props, so a change applies to all 64 pages.

---

## 7. `src/components/sections/` — the content engine

These six files hold **most of the site's actual words**. Each exports ~15 named sections plus a complete `XxxPage()` for the base route.

Typical exports (names are consistent across files): `ToolsWeUseSection`, `HeroFormIntro`, `ProblemSection`, `SolutionSection`, `SEOSection`, `RoiSection`, `ComparisonSection`, `HowItWorksSection`, `TestimonialsSection`, `WhyChooseUsSection`, `FAQSection`, `FinalCTASection`, plus category-specific ones (`AuditFindingsSection` in crm/website-optimization, `CapabilitiesSection` + `CampaignFindingsSection` in linkedin-outbound, `CostComparisonSection` + `ClientImpactSection` in social, `DeliverablesSection` in website-optimization).

Inside each section the content is a **local array or object literal** right at the top of the function — that's what you edit:

| To change… | Find |
|---|---|
| Which tool logos show, and the headline beside them | the `tools` array + `content` object in `ToolsWeUseSection()` |
| FAQ questions and answers | the `faqs` array in `FAQSection()` — it also feeds `<FaqSchema>`, so edits automatically update the Google rich-result JSON-LD |
| Pricing / savings numbers | the arrays in `ComparisonSection()` / `RoiSection()` / `CostComparisonSection()` |
| Process steps | `HowItWorksSection()` |
| Testimonials and their industry matching | the `bentoTestimonials` array near `TestimonialsSection()` — each entry has `company`, `genericCompany`, and `matchesIndustries` |
| The animated hero widget | the `CrmAnimation` / `SocialAnimation` / `VideoAnimation` function above `HeroFormIntro` |
| The intro-screen duration | `INTRO_DURATION` in `lib/constants.ts` (shared) |

`WorkSampleBentoGrid()` currently `return null` in several files — the "real results" carousel was removed site-wide but the export was kept so pages importing it don't break.

> 🔴 **Blast radius:** a one-word change in `sections/linkedin-outbound.tsx` ships to **12 live pages**. If you need a change on only one page, copy that section's JSX into the route file as a local function instead.

---

## 8. `src/components/shared/` — reusable blocks

### `AnimatedSection.tsx`
Exports `AnimatedSection`, `StaggerContainer`, `StaggerItem`, `FloatingElement`, `CountUp`. Performance-critical: it replaced per-element Framer Motion with **one shared `IntersectionObserver` per root-margin** plus pure-CSS keyframes from `globals.css`. `CountUp` animates with `requestAnimationFrame` and respects `prefers-reduced-motion`.

Edit for: the reveal trigger point (`margin: "-80px"`), direction offsets (the `OFFSETS` map), or the count-up duration. **Don't** reintroduce Framer Motion here — the SSR `opacity:0` it emits is what hurt LCP.

### `LeadForm.tsx`
The canonical five-field form (first name, last name, email, phone, company) + submit. Takes `idPrefix` so multiple forms can coexist on one page.

Edit for: field labels, button text ("Get a Quote"), layout. **Note:** most pages inline their own copy of this markup inside `HeroSection` rather than importing it, so changing this file alone will *not* update every form — grep for `register("firstname")` to find all the copies.

### `PhoneField.tsx`
Country-picker phone input. Flag + dial-code dropdown with search, `AsYouType` live formatting, IP-based default country, `"+"`-triggered international parsing. Country list is **fetched** from `/data/countries.json` (not bundled).

| To change… | Edit |
|---|---|
| Which countries are selectable | the `onlyCountries` prop, or `DEFAULT_ONLY_COUNTRIES` in `lib/constants.ts` (currently `["US","CA"]`) |
| Fallback country | the `defaultCountry` prop (default `"US"`) |
| Geolocation timeout | `GEO_TIMEOUT_MS` in `lib/constants.ts` |
| Dropdown width / styling | the `role="listbox"` div's classes |

### `TrustedByMarquee.tsx`
Exports the `trustedLogos` array (38 entries), `TrustedByMarquee` (two-row light version) and `TrustLogosRow` (single dark row for dark hero backgrounds).

**To add a client logo:** drop the file in `public/logos/b2b/`, then add `{ src, alt }` to `trustedLogos`. Also update the "Trusted by 40+ B2B companies…" headline string if the count changes.

### `FaqSchema.tsx`
Emits `FAQPage` JSON-LD. Pass it the same `faqs` array the visible accordion renders so the structured data can never drift from the page. Already wired into all six section files.

### `ServiceCapabilities.tsx`
265 lines of hand-drawn animated SVG illustrations + a capability tab switcher. Used by `/fmt` and `/thank-you` only.

---

## 9. `src/components/sample/` + `src/components/ui/`

**`sample/`** — a phone-app-style shell used only by the eight A/B variant pages (`*-v1`, `*-v2`): `MobileAppNav.tsx` (bottom tab bar, takes a `tabs` array), `MobileAppTopBar.tsx`, `MobileInfoSheet.tsx` (bottom sheet with body-scroll locking).

**`ui/`** — shadcn-style Radix primitives. Edit these to change a control's appearance **everywhere**:

| File | Owns |
|---|---|
| `button.tsx` | `buttonVariants` (CVA) — variant and size classes. Note: pages pass `variant="ghost"` plus explicit `bg-spark-600` overrides, so changing the `default` variant may not have the effect you expect |
| `input.tsx` | Text input border, height, focus ring |
| `label.tsx` | Form label typography |
| `accordion.tsx` | FAQ expand/collapse |
| `sheet.tsx` | Slide-over drawer |
| `toast.tsx` / `toaster.tsx` | Notification toasts — `Toaster` is mounted once in `layout.tsx` |

---

## 10. `src/hooks/` and `src/lib/`

### `hooks/useLeadForm.ts`
The one submit pipeline: `useForm` + `zodResolver(buildLeadFormSchema())`, validating `onBlur`, redirecting to `/thank-you` on success.

| To change… | Edit |
|---|---|
| Where a successful submit goes | the `redirectTo` option (default `"/thank-you"`) |
| **Actually send the lead somewhere** | the `onValid` function — ⚠️ **it currently only redirects; no data is POSTed anywhere.** Add your CRM/webhook call here and it applies to every form on the site |
| Validation trigger timing | `mode: "onBlur"` |
| Default field values | the `defaultValues` object |

### `hooks/use-toast.ts`
Global toast store (reducer + listener pattern). `TOAST_LIMIT` and `TOAST_REMOVE_DELAY` come from `lib/constants.ts`.

### `lib/constants.ts` ⭐ *tune site-wide behaviour here*
Animation timings (`INTRO_DURATION`, `TESTIMONIAL_CAROUSEL_ROTATE_MS`, `HERO_TESTIMONIAL_ROTATE_MS`), toast settings, validation rules (`NAME_PATTERN`, `NAME_DENYLIST`, `COMPANY_DENYLIST`, `SUSPICIOUS_KEYWORDS`, `SUSPICIOUS_TLDS`), `DEFAULT_ONLY_COUNTRIES`, `GEO_TIMEOUT_MS`, `DESKTOP_QUERY`, plus the `TESTIMONIALS` and `CALL_BULLETS` content arrays used by `/thank-you`.

Changing one value here propagates to every consumer — that's the point of the file.

### `lib/validation/lead-form-schema.ts` ⭐
The single Zod schema behind every form. Name rules (Unicode-aware pattern + denylist), optional company, async email check against `/api/check-email`, and a cross-field phone refinement using `libphonenumber-js` plus `looksFake()` (rejects all-same digits, ascending/descending runs, repeated blocks).

**To add a field to every form:** add it to the `z.object({…})` here, add `defaultValues` in `useLeadForm.ts`, then render the input. Don't write per-page validation.

**To change an error message:** the message strings are all in this file.

### `lib/phone-metadata.ts`
Lazy-loads `libphonenumber-js/min` (~84 KB of country metadata) so it stays out of every page's initial bundle. `loadPhoneMetadata()` (await), `peekPhoneMetadata()` (sync, nullable), `warmPhoneMetadata()` (idle prefetch). Don't convert these to a top-level import — that's what the indirection exists to prevent.

### `lib/responsive-image.ts`
`workSampleSrcSet(src)` builds the `640w / 1200w` srcset pairing a `-sm.webp` companion with the full file; `WORK_SAMPLE_SIZES` is the matching `sizes` string. Must stay in sync with the widths in `scripts/optimize-images.mjs`.

### `lib/utils.ts`
`cn()` — `clsx` + `tailwind-merge`. Used everywhere for conditional classes.

---

## 11. `scripts/`

### `scripts/optimize-images.mjs`
Run manually with `npm run optimize-images`. **Not part of the build.** It:
- converts `public/images/fmt/*.png` → `.webp` at 1x (662×369) and `@2x`
- recompresses `public/images/hero/*.webp` to ≤1600w @ q62 and writes `-sm.webp` at 800w
- recompresses `public/images/work-samples/*.webp` to ≤1200w @ q68 + `-sm.webp` at 640w
- shrinks `public/images/client/*.webp` to 192px

Idempotent (skips already-optimal files). Edit `HERO_WIDTH` / `HERO_QUALITY` / `WORK_*` to change the compression targets — then also update `lib/responsive-image.ts` so the `srcset` widths still match.

**Workflow:** drop a full-size hero into `public/images/hero/`, run the script, commit both the compressed original and the generated `-sm` file.

### `scripts/html/` — generated HTML for stage
`npm run html:generate` turns each `src/app/<slug>/page.tsx` into a self-contained `generated-html/<slug>.html` (all JS/CSS inline, still hydrates), served on stage-resources.getlevrg.com by `npm run html:serve`. `generate.mjs` (CLI) · `inline.mjs` (the conversion) · `serve.mjs` (stage server) · `smoke.mjs` (headless-Chrome check) · `unpublished.mjs` (diff vs. stage) · `validate_html.py` (landing-pages validator) · `precompress.mjs` (image build). Full reference: [`GENERATED-HTML.md`](GENERATED-HTML.md).

---

## 12. Recipe: add a new page

To create `/src/app/<folder-name>/page.tsx` and have it fully live, here is every file to touch, in order.

### Required

**1. `src/app/<folder-name>/page.tsx`** — the route. The folder name *is* the URL. Copy the closest existing sibling (e.g. `src/app/crm-legal/page.tsx`) rather than starting blank.

```tsx
"use client";

import { PageShell } from "@/components/layout/PageShell";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { PhoneField } from "@/components/shared/PhoneField";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ProblemSection, SolutionSection, ToolsWeUseSection,
  HowItWorksSection, TestimonialsSection, FAQSection, FinalCTASection,
} from "@/components/sections/crm";   // ← pick the right category

function HeroSection() {
  const { register, control, handleSubmit, onValid,
          formState: { errors, isSubmitting } } = useLeadForm();
  return (
    <section id="lead-form" /* … hero markup + form … */ />
  );
}

export default function Page() {
  return (
    <PageShell
      navItems={[
        { label: "Problems", href: "#problems" },
        { label: "Solution", href: "#solution" },
      ]}
      ctaText="See How It Works"
      ctaTarget="#lead-form"
      meta={{
        title: "<Page Title> | Get Levrg",
        description: "<150–160 chars>",
        keywords: "<comma, separated>",
        ogTitle: "<share headline>",
        ogDescription: "<share subhead>",
        ogImage: "/images/hero/<folder-name>-hero.webp",
      }}
    >
      <HeroSection />
      <TrustedByMarquee />
      <ProblemSection />
      <SolutionSection />
      <ToolsWeUseSection />
      <HowItWorksSection />
      <TestimonialsSection industry="legal" />
      <FAQSection />
      <FinalCTASection />
    </PageShell>
  );
}
```

> No route registration anywhere — the App Router discovers the folder. Only `page.tsx` makes a segment publicly reachable.

**2. `public/images/hero/<folder-name>-hero.webp`** (+ `-hero-sm.webp`)
Drop the full-size image in, run `npm run optimize-images` to generate the `-sm` companion, and reference **both** in the hero's `srcSet` and the full one in `meta.ogImage`.

**3. `public/sitemap.xml`** — add the entry by hand. It is not generated:
```xml
<url><loc>https://getlevrg.com/<folder-name></loc><lastmod>2026-10-04</lastmod><priority>0.7</priority></url>
```
Convention in this repo: `1.0` for category base pages, `0.7` for industry variants, `0.5–0.6` for A/B test variants. Skip this entirely if the page is `noindex`.

### Conditional

**4. `public/llms.txt`** — only if the page is a new top-level service (not an industry variant).

**5. `src/components/sections/<new-category>.tsx`** — only if the page is a genuinely new category with no existing section file to import from. Follow the shape of `sections/crm.tsx`: a `"use client"` directive, one exported function per section, and a full `XxxPage()` at the bottom for the base route.

**6. `src/lib/constants.ts`** — only if the page introduces a shared timing value or content array.

**7. Internal links** — nothing links between landing pages today (each is an independent paid-traffic entry point). If you want cross-links, add them in `Footer.tsx` or a page's `navItems`.

### Verify

```bash
npm run lint
npm run build      # type-checks AND statically renders every route
npm run dev        # visit http://localhost:3000/<folder-name>
```

`next build` is the real gate — it compiles every route, so a broken import or SSR-unsafe code (e.g. reading `window` outside an effect) fails the build regardless of which file you touched.

### Checklist

- [ ] `src/app/<folder-name>/page.tsx` created
- [ ] Hero image + `-sm` companion in `public/images/hero/`
- [ ] `meta.title`, `meta.description`, `meta.ogImage` set (not copy-pasted from the sibling page)
- [ ] `navItems` hrefs match real `id=` attributes on the sections rendered
- [ ] The form's `id`/`htmlFor` prefixes are unique to this page
- [ ] `TestimonialsSection industry="…"` set, if used
- [ ] Added to `public/sitemap.xml` (or `meta.noindex: true` set)
- [ ] `npm run build` passes
- [ ] `npm run html:generate` run and `generated-html/<folder-name>.html` committed (CI on `stage` fails without it)

---

## 13. Deployment — what to change where

### The actual pipeline

Push to `main` → `.github/workflows/deploy.yml` → `docker build` in the runner → `docker save | gzip` → **scp** the tarball + `docker-compose.yml` + a generated `.env` to the VPS → ssh in → `docker load` → `docker compose up -d --force-recreate --remove-orphans` → prune.

(No registry is involved — the image travels as a gzipped tarball over SSH.)

### `.github/workflows/deploy.yml`

| To change… | Edit |
|---|---|
| What triggers a deploy | the `on:` block (currently `push` to `main` + manual `workflow_dispatch`) |
| **Add an environment variable to production** | **two places in this file**: the `Create .env file` step (add an `echo "KEY=${{ secrets.KEY }}" >> .env` line) **and** `docker-compose.dev.yml`'s `environment:` list. For a `NEXT_PUBLIC_*` variable also add a `--build-arg` to the `Build Image` step and an `ARG` to the `Dockerfile` |
| Target server | the `VPS_HOST` / `VPS_USERNAME` / `VPS_SSH_KEY` secrets |
| Which compose file ships | the `Prepare docker-compose file` step — currently `cp docker-compose.dev.yml docker-compose.yml`; a `docker-compose.prod.yml` line is commented out above it |
| Add a CI gate (lint/tests) | insert a step before `Build Image` |

**GitHub Secrets actually required** (repo → Settings → Secrets and variables → Actions):
`VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY`, `NEXT_PUBLIC_SITE_URL`, `IPWHOIS_ENDPOINT`, `DOH_ENDPOINT`, `NEXT_PUBLIC_HUBSPOT_SCRIPT_URL`, `NEXT_PUBLIC_HUBSPOT_MEETING_URL`, `NEXT_PUBLIC_THANKYOU_VIDEO_ID`.

### `Dockerfile`
Four stages: `base` (node:22-alpine) → `deps` (`npm ci`) → `builder` (`npm run build`) → `runner` (non-root `nextjs` user, copies `.next/standalone` + `.next/static` + `public`, runs `node server.js` on port 3000).

| To change… | Edit |
|---|---|
| Node version | the `FROM node:22-alpine` line (keep ≥ `package.json`'s `engines`) |
| Container port | `EXPOSE` **and** the compose `ports` mapping |
| Add a build-time env var | add `ARG NAME` in the `builder` stage **and** a `--build-arg` in the workflow |
| Add a runtime env var | nothing here — it comes from the compose `environment:` list |

> 🔴 **Build-time vs runtime:** `NEXT_PUBLIC_*` values are baked into the JS bundle during `npm run build` inside the `builder` stage. Changing them in `.env` on the server and restarting the container will **not** update them — you must rebuild the image. Server-only vars (`IPWHOIS_ENDPOINT`, `DOH_ENDPOINT`) *are* read at runtime, so a container restart is enough for those.

### `docker-compose.dev.yml`
Copied to `docker-compose.yml` by the workflow and shipped to the VPS.

| To change… | Edit |
|---|---|
| **Public port** | `ports: "3005:3000"` — host 3005 maps to container 3000. **Your Nginx `proxy_pass` must point at `127.0.0.1:3005`**, not 3000 |
| Restart behaviour | `restart: unless-stopped` |
| Environment passed to the container | the `environment:` list — must mirror the `.env` the workflow writes |
| Add a service (Redis, a worker) | add a sibling key under `services:` |

### `.dockerignore`
Keeps `node_modules`, `.next`, `.git`, `*.md`, and local env files out of the build context. Add anything large that shouldn't ship.

### Server-side setup (not in this repo)
Nginx terminates TLS and reverse-proxies to the container's published port. It must forward `X-Forwarded-For` or `/api/geolocate` will see the proxy's IP for every visitor:
```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

### Rolling back
The deploy prunes old images, so there's no previous tag on the host. Roll back by reverting the commit on `main` and letting the workflow redeploy, or re-run an older successful workflow run from the Actions tab.

### Deploying without CI
```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://getlevrg.com -t gl-resources-lp:latest .
docker save gl-resources-lp:latest | gzip > gl-resources-lp.tar.gz
scp gl-resources-lp.tar.gz docker-compose.yml .env user@host:~/gl-resources-lp/
ssh user@host 'cd ~/gl-resources-lp && docker load -i gl-resources-lp.tar.gz && docker compose up -d --force-recreate'
```

---

## 14. Change → blast-radius cheat sheet

| I want to change… | File | Affects |
|---|---|---|
| Brand colour | `src/app/globals.css` → `--color-spark-*` | Every page |
| Font | `src/app/layout.tsx` → `Inter({…})` | Every page |
| Favicon | `src/app/layout.tsx` + `public/favicon.webp` | Every page |
| Header logo | `public/logo.webp` | Every page with a header |
| Footer text / year | `src/components/layout/Footer.tsx` | Every page |
| Meta tags present on all pages | `src/components/layout/PageShell.tsx` | All 64 pages |
| Default CTA button label | `src/components/layout/Header.tsx` | Pages not overriding `ctaText` |
| One page's title/description/OG | that page's `<PageShell meta={…}>` | 1 page |
| One page's hero image | that page's `HeroSection` `srcSet` + `meta.ogImage` | 1 page |
| Copy in a shared section | `src/components/sections/<category>.tsx` | **2–12 pages** |
| FAQ content | `faqs` array in that category's `FAQSection()` | All pages in the category, visible text **and** JSON-LD |
| Client logo marquee | `public/logos/b2b/` + `trustedLogos` in `TrustedByMarquee.tsx` | Every page rendering the marquee |
| Form fields or error messages | `src/lib/validation/lead-form-schema.ts` | Every form |
| Where a submitted lead goes | `onValid` in `src/hooks/useLeadForm.ts` | Every form |
| Allowed phone countries | `DEFAULT_ONLY_COUNTRIES` in `src/lib/constants.ts` | Every phone field |
| Animation timings | `src/lib/constants.ts` | Every consumer |
| Button / input appearance | `src/components/ui/*.tsx` | Site-wide |
| Caching of static assets | `next.config.ts` → `headers()` | All matched assets |
| Security headers | `next.config.ts` → `SECURITY_HEADERS` | All responses |
| Production env var | workflow `Create .env file` **+** `docker-compose.dev.yml` (+ `Dockerfile` ARG if `NEXT_PUBLIC_*`) | Next deploy |
| Public port | `docker-compose.dev.yml` `ports` **+** your Nginx config | Next deploy |

---

## 15. Known inconsistencies worth fixing

Found while mapping the codebase. None are breaking today, but each will mislead the next person:

1. **`DEPLOYMENT.md` describes a pipeline that no longer exists.** It documents a GHCR push plus `docker compose pull`, and secrets named `EC2_HOST` / `EC2_USER` / `EC2_SSH_KEY` / `EC2_APP_DIR`. The real workflow uses `docker save` + scp + `docker load`, and secrets named `VPS_HOST` / `VPS_USERNAME` / `VPS_SSH_KEY`. Following that doc as written will not produce a working deploy.

2. **`README.md` says `NEXT_PUBLIC_SITE_URL` "defaults to `https://getlevrg.com` if unset".** It doesn't — `layout.tsx` uses `process.env.NEXT_PUBLIC_SITE_URL!` inside `new URL(...)`, so an unset value throws at build time. The README also documents only 2 of the 6 environment variables in `.env.example`.

3. **`README.md` and `DEPLOYMENT.md` reference a `docker-compose.yml`** that isn't in the repo — the file is `docker-compose.dev.yml`, copied to that name by the workflow at deploy time.

4. **`public/llms.txt` is stale**: it points at `gl-vite-lp.vercel.app` URLs and describes the site as "a client-rendered single-page app … served client-side via React Router". That was the pre-migration Vite app; this is a server-rendered Next.js App Router site.

5. **`useLeadForm`'s `onValid` never submits the lead anywhere** — it calls an optional `onSubmitted()` callback and redirects to `/thank-you`. If leads are expected to reach a CRM, that integration is missing.

6. **Nginx must proxy to port 3005**, not 3000, given the current compose mapping. `DEPLOYMENT.md`'s example server block says 3000.

7. **The stagger CSS only covers 24 children** (`globals.css`, `:nth-child(1)`–`(24)`). A `StaggerContainer` with more items will render the overflow un-animated.

8. **`LeadForm.tsx` is largely bypassed** — most pages inline an identical copy of the form markup in their own `HeroSection`. Editing `LeadForm.tsx` will not update those pages.
