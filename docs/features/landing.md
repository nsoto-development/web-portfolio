# Feature: Landing / portfolio hub

## Purpose

The public face of **nsoto.dev**: introduce the developer, show shipped work and skills, link to subdomain apps, and provide contact paths. Visual quality is a first-class requirement — the site is the portfolio product.

## Roadmap

Tracks P0 **[chore] #1** + **[feature] #2** → **M1**; **[feature] #3** → **M2**; **[chore] #4** → **M3** (deploy); **[feature] #5** → **M2b** (Apps hub). P1 **[feature] #1** WebGL → **M5**; **[debt] #4** package cutover → **M4a** (Done); polish/Framer → **M4**.

**v1 launch path:** static landing (M1+M2) deployed at nsoto.dev (M3 Done). **Next:** Apps strip on landing (**M2b** / P0 #5) — apps are first-class citizens of this portfolio. WebGL (M5) is post-v1 per [`mvp-scope.md`](../mvp-scope.md). After M2b: roadmap P1 **Recently shipped**.

**Milestone naming:** **M3 = deploy**; graphical WebGL enhancement = **M5** (not M3).

## Stack

Hub repo only — subdomain apps (e.g. `chess.nsoto.dev`) are separate repos; document their stacks there.

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js** (App Router) | Deploy, routing, OG/meta, future subdomain linking |
| Styling | **Tailwind CSS** | `@import '@nsoto/portfolio-tokens/styles.css'` in `app/globals.css`; Tailwind extends semantic CSS vars |
| UI primitives | **`@nsoto/portfolio-ui`** | Via thin `"use client"` wrappers in `components/ui/` (Next adapters stay here) |
| UI motion | **CSS** (M1–M2) | Static baseline; **Framer Motion** at M4 — not WebGL |
| 3D / hero motion | **React Three Fiber + drei** | **M5 only** — post-v1; after static baseline ships |
| Icons | **Lucide** (`lucide-react`) | Per kit iconography |

Production code references **semantic tokens** (`--brand`, `--bg-canvas`, etc.) — do not duplicate palette values. When the app diverges from the draft system, update tokens in one place and note here.

Deploy target: **Vercel** at [nsoto.dev](https://nsoto.dev) (M3 Done).

## v1 scope (agreed)

- Dark-only landing matching `@nsoto/portfolio-tokens` and [`docs/mvp-scope.md`](../mvp-scope.md) visual baseline.
- Hero: logo mark, `nsoto.dev` wordmark, terminal eyebrow (`</ … >`), primary headline and subcopy. **Copy:** keep ui-kit draft (`</ COMING SOON. STAY TUNED >`) until post-M1 side-by-side with brand lockup, then refine.
- Sections (M1+M2 epic): sticky nav, work/experience, skills, about, contact, footer — layout informed by the canonical DS portfolio ui-kit (reference only).
- **Apps on landing (M2b / P0 #5):** compact `</ APPS >` strip **early** on the home page (after hero, before Work/experience). Apps are first-class; employment history supports the story. See [M2b spec](#m2b--apps-strip-on-landing).
- **`/apps` detail hub:** case-studies **M3** shipped top-level **Apps** → `/apps` with live cards. That page stays the full catalog; M2b does **not** duplicate it as a second card grid.
- **Contact:** ui-kit form UI; submissions delivered via [Web3Forms](https://web3forms.com) (`POST https://api.web3forms.com/submit`) using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (client-side; key aliases inbox email).
- **Content SSOT:** resume-sourced copy in `lib/portfolio-data.ts`; app entries shared between `/apps` and the M2b landing strip.
- **Tokens:** `@import '@nsoto/portfolio-tokens/styles.css'` in app global CSS; Tailwind theme extends CSS variables (see [Stack](#stack)).
- Accessible defaults: focus rings, semantic HTML, `prefers-reduced-motion` respected before/without WebGL.

## Non-goals (v1)

- Full WebGL hero on first ship (M5 — see milestones).
- Framer Motion on first static ship (M4).
- Light theme or alternate colorways.
- CMS / admin for content — copy lives in repo.
- Full card grid on the landing page (that lives on `/apps`).
- Treating the design-system ui kit as immutable — it is a **draft** starting point.

## Future hooks

- R3F cursor-reactive background (M5).
- Per-subdomain cards with OG previews on `/apps`.
- Blog or writing section (P2).
- [Recently shipped](#after-m2b--recently-shipped) (roadmap P1 #7) after M2b.

## Code paths

| Area | Location |
|------|----------|
| App | `app/` (`layout.tsx`, `page.tsx`, `globals.css`) |
| Landing sections | `components/landing/` — Hero, Nav, **Apps (M2b)**, Experience, Skills, About, Contact, Footer |
| Site nav | `lib/portfolio-data.ts` `nav`; shared header on `/`, `/apps`, `/case-studies/*` |
| Apps detail page | `app/apps/page.tsx` — full cards (case-studies M3); SSOT entries shared with M2b strip |
| Shared UI | `components/ui/` — `"use client"` re-exports / wrappers from `@nsoto/portfolio-ui`; Next `NavLink` adapter |
| Content | `lib/portfolio-data.ts` (`appsStub` / app entries) |
| Contact delivery | `components/landing/Contact.tsx` → Web3Forms; env `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (see `.env.example`) |
| Hero shell + tier gate (M5) | `components/hero/` |
| R3F scene (M5) | `components/hero/webgl/` |
| Probe util (M5) | Co-located with tier gate or `lib/hero-tier/` |
| Theme tokens | `app/globals.css` → `@nsoto/portfolio-tokens/styles.css`; `tailwind.config.ts` extends CSS vars |
| Brand assets | `public/logo/`; `public/favicon/`; `public/og/` (copied at ship; package assets available for future) |
| Design SSOT | `@nsoto/portfolio-tokens` + `@nsoto/portfolio-ui` (canonical design-system repo) |
| Meta / OG / favicon | `app/layout.tsx`; `public/favicon/`; `public/og/nsoto-dev-og.png` |
| SEO / discoverability | `app/sitemap.ts`, `app/robots.ts`, `lib/seo/`, `components/seo/JsonLd.tsx` |

## Visual / motion spec

- **Authority:** `@nsoto/portfolio-tokens` / `@nsoto/portfolio-ui` (canonical [design-system](https://github.com/nsoto-development/design-system) repo).
- **Brand assets in app:** `public/logo/nsoto-mark-cyan.png` (accent lockup).
- **Prototype:** DS repo `ui_kits/portfolio/` — layout/copy guide, not production source. Ui-kit has **no Apps section** — Apps is net-new at M2b.
- **M1–M2:** static; CSS-only motion (blinking cursor, hovers per DS tokens).

## M2b — Apps strip on landing

Tracks P0 **[feature] #5**. Apps are first-class on this portfolio hub: the home page should surface what you ship **before** résumé Work.

### Intent

| Surface | Role |
|---------|------|
| Landing `#apps` strip | Early, compact discovery — name, one short line, Live/WIP, link |
| `/apps` | Full catalog — descriptions, badges, domain + repo links |

### Layout / hierarchy

1. **Hero** — brand + positioning (may mention building apps on nsoto.dev; no app cards in the hero).
2. **Apps strip** — immediately after hero (before Experience).
3. **Work / skills / about / contact** — proof and contact; unchanged otherwise.

### Strip UI (keep simple — reuse existing tokens/badges)

- Eyebrow: `</ APPS >`.
- One short supporting sentence (section has one job).
- Compact rows or a thin list (not a card grid): **name**, one-line blurb, status badge, outbound link (and optional “See all → `/apps`” if the list grows).
- Same entry data as `/apps` (`lib/portfolio-data.ts`) — one SSOT; strip may show a shorter blurb field if needed.
- Live apps get real `href`s (chess, budget, packages, etc. as already on `/apps`).

### Non-goals (M2b)

- Duplicating the full `/apps` card layout on the home page.
- Recently shipped / changelog UI (roadmap P1 #7 — after this milestone).
- New visual language, stats strips, or dashboard chrome.
- Hero redesign or WebGL (M5).

### Done when

- Home page renders the Apps strip after Hero and before Experience.
- Entries stay in sync with `/apps` via shared data.
- Nav **Apps** still goes to `/apps` for the full page.

## After M2b — Recently shipped

Roadmap **P1 #7**. Curated milestone outcomes (date + product + one line + optional link) — primarily on `/apps`; optional later reuse. **Non-goals:** GitHub API, commit/PR charts, velocity dashboards. Add `docs/features/recently-shipped.md` when implementing; keep this hub doc as the sequencing pointer only.

## M5 — WebGL hero

Cursor-reactive R3F background for the landing hero, gated by a device-capability tier so low-perf clients get the same visual content without a canvas. M1 reduced tier is the visual baseline; full tier targets smooth interaction on mid-tier laptop iGPU. **Post-v1** — not required for MVP launch.

### Tier model

Two tiers only:

| Tier | Render | Content |
|------|--------|---------|
| `full` | R3F canvas + drei cursor-reactive layer | Same hero visual |
| `reduced` | Static/CSS hero (M1 baseline) | Same hero visual, no canvas |

### Decision order (client)

1. **`prefers-reduced-motion`** → `reduced` immediately (accessibility short-circuit; not a perf path).
2. Else **`sessionStorage` cache** → reuse prior tier for this session (no re-probe on route change).
3. Else **fps probe** on mount → `full` if ≥ ~45fps, else `reduced`.

### FPS probe

- One probe on first hero mount per session.
- ~1s sample window.
- Hidden off-screen canvas (not the visible hero canvas).
- Threshold: ~45fps sustained during sample.
- Result cached in `sessionStorage` for the session.

### SSR / hydration

- Server **always** renders `reduced` (avoids hydration mismatch).
- Client promotes to `full` only after probe passes (and reduced-motion did not short-circuit).

### Non-goals (M5)

- Static hardware detection (`hardwareConcurrency`, `deviceMemory`, GPU renderer string).
- Continuous re-monitoring or tier changes after the initial decision.
- More than two tiers (no partial / “medium” WebGL).
- Re-probing on client-side route changes within the same session.

### Future hooks (M5)

- Tune ~45fps threshold after M5 ship on real devices.

## Milestones

| # | Milestone | Status | Deliverables |
|---|-----------|--------|--------------|
| M1 | Static hero shell | Done | Scaffold + hero; token imports in `globals.css`; `public/logo/` |
| M2 | Portfolio sections | Done | Nav, work, skills, about, contact (Web3Forms), footer |
| M2b | Apps strip on landing | Planned | Compact `</ APPS >` strip after hero; shared data with `/apps`; not a card-grid duplicate (P0 #5) — [spec](#m2b--apps-strip-on-landing) |
| M3 | Deploy `nsoto.dev` | Done | Live at [nsoto.dev](https://nsoto.dev) — Vercel, HTTPS, favicon, OG, Web3Forms env (P0 #4) |
| M4a | Package cutover (P1 #4) | **Done** | `@nsoto/portfolio-*` deps; no vendored `design-system/`; case study `implemented` |
| M4 | Polish + a11y pass | Planned | Focus/contrast sweep; Framer Motion |
| M5 | WebGL hero motion | Planned | Tier gate + R3F `full` tier; `reduced` static/CSS fallback — [M5 spec](#m5--webgl-hero) (P1 #1, post-v1) |

**Quick gate:** each implementation thread names **one milestone** only. M5 does not pull M4 polish.

## M3 — Deploy nsoto.dev

Tracks P0 **[chore] #4**. **Done** — [nsoto.dev](https://nsoto.dev) is live (static landing; Apps hub is M2b / P0 #5).

### Shipped

| Item | Location |
|------|----------|
| Production deploy | Vercel → `nsoto.dev` (HTTPS) |
| `metadataBase`, title, description | `app/layout.tsx` |
| Open Graph + Twitter cards | `app/layout.tsx` → `public/og/nsoto-dev-og.png` |
| Favicon pack + web manifest | `public/favicon/`; wired in `layout.tsx` |
| Contact delivery | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel env |
| Verify pipeline | `.cursor/nudl.json` — `npm run lint`, `npm run build` |
| Web Analytics + Speed Insights | `@vercel/analytics`, `@vercel/speed-insights` in `app/layout.tsx`; enabled in Vercel project |
| Google Analytics | `components/GoogleAnalytics.tsx` → `app/layout.tsx`; `NEXT_PUBLIC_GA_MEASUREMENT_ID` (production only) |
| Sitemap + robots | `app/sitemap.ts`, `app/robots.ts` — URLs derived from `publishedCaseStudies` |
| JSON-LD structured data | `components/seo/JsonLd.tsx`, `lib/seo/jsonld.ts` — Person/WebSite on `/`, Article on case studies |

### SEO / discoverability

**Code paths:** `app/sitemap.ts`, `app/robots.ts`, `lib/seo/site.ts`, `lib/seo/jsonld.ts`, `components/seo/JsonLd.tsx`.

- Sitemap lists `/`, `/apps`, `/case-studies`, and each entry in `publishedCaseStudies` (`lib/case-studies/registry.ts`). Hash anchors (`#work`, etc.) are not separate URLs.
- Case studies may set optional `updatedAt` in `lib/portfolio-data.ts` for accurate `lastModified` in the sitemap.
- New routes: add page `metadata`, ensure the URL is in the sitemap source (registry or static list), then re-submit in Search Console after deploy.

**Manual ops (post-deploy):**

1. [Google Search Console](https://search.google.com/search-console) — add property `https://nsoto.dev`, verify via DNS (Vercel) or HTML tag.
2. Submit sitemap: `https://nsoto.dev/sitemap.xml`.
3. Request indexing for `/` and new case studies when published.
4. Optional: [Bing Webmaster Tools](https://www.bing.com/webmasters) — same sitemap URL.
5. Validate: view page source for JSON-LD on `/` and case study pages; test share previews (LinkedIn Post Inspector, Twitter/X card validator).

## Tests / verify

Add lint/build/test commands to [`.cursor/nudl.json`](../../.cursor/nudl.json) `verify.commands` when the app exists (roadmap P0 #1 seeds initial commands; P1 #3 expands the full pipeline).

**Contact (manual):**

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` set in `.env.local` (local) or Vercel env (deploy).
- Submit form → success toast, form clears, message arrives in inbox.
- Missing/invalid key → danger toast; form data retained.

**M3 deploy (manual):**

- `npm run lint` and `npm run build` pass before merge.
- Production ([nsoto.dev](https://nsoto.dev)): HTTPS, OG image, contact form with Vercel env set.
- Vercel project: Web Analytics and Speed Insights enabled; page views and Web Vitals appear in dashboard after traffic.
- Vercel env: `NEXT_PUBLIC_GA_MEASUREMENT_ID` set for Google Analytics (production only; no GA on local dev).
- `https://nsoto.dev/sitemap.xml` and `https://nsoto.dev/robots.txt` return expected content after deploy.

**M5 (manual until verify pipeline exists):**

- `prefers-reduced-motion` on → no canvas, static hero.
- Throttled CPU / low-end device → `reduced` after probe.
- Capable device → promotes to `full` after ~1s; same-session navigation does not re-probe.
