# Feature: Landing / portfolio hub

## Purpose

The public face of **nsoto.dev**: introduce the developer, show shipped work and skills, link to subdomain apps, and provide contact paths. Visual quality is a first-class requirement — the site is the portfolio product.

## Roadmap

Tracks P0 **[chore] #1** + **[feature] #2** → **M1**; **[feature] #3** → **M2**; **[chore] #4** → **M3** (deploy); **[feature] #5** → **M2b** (Apps teaser). P1 **[feature] #8** funnel → **M2c** / **M2d**; **[feature] #1** WebGL → **M5**; **[debt] #4** package cutover → **M4a** (Done); polish/Framer → **M4**.

**v1 launch path:** static landing (M1+M2) deployed at nsoto.dev (M3 Done); **M2c** `/experience` + **M2d** funnel + **M2b** Apps teaser **Done**. **Next:** roadmap P1 **Recently shipped**, or M4 polish / M5. WebGL (M5) is post-v1 per [`mvp-scope.md`](../mvp-scope.md).

**Branch note:** `feature/apps-strip-m2b` (four-row strip) stayed **unmerged**; M2b shipped as the 2-project screenshot teaser instead.

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
- **Apps on landing (M2b / P0 #5):** 2-project visual **teaser** early on the home page (after hero; Chess + Budget + screenshots). Apps are first-class; employment history supports the story. See [M2b spec](#m2b--apps-teaser-on-landing).
- **Landing funnel (M2c / M2d / P1 #8):** `/experience` holds full work history; landing shows highlights + condensed skills/about with clear depth CTAs. See [M2c](#m2c--experience-depth-page) / [M2d](#m2d--fast-landing-funnel).
- **`/apps` detail hub:** case-studies **M3** shipped top-level **Apps** → `/apps` with live cards. That page stays the full catalog; M2b does **not** duplicate it as a four-card grid.
- **Contact:** ui-kit form UI; submissions delivered via [Web3Forms](https://web3forms.com) (`POST https://api.web3forms.com/submit`) using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (client-side; key aliases inbox email).
- **Content SSOT:** resume-sourced copy in `lib/portfolio-data.ts`; app entries shared between `/apps` and the M2b landing teaser.
- **Tokens:** `@import '@nsoto/portfolio-tokens/styles.css'` in app global CSS; Tailwind theme extends CSS variables (see [Stack](#stack)).
- Accessible defaults: focus rings, semantic HTML, `prefers-reduced-motion` respected before/without WebGL.

## Non-goals (v1)

- Full WebGL hero on first ship (M5 — see milestones).
- Framer Motion on first static ship (M4).
- Light theme or alternate colorways.
- CMS / admin for content — copy lives in repo.
- Full card grid or four-row text strip of all apps on the landing page (full catalog lives on `/apps`; teaser is two projects only).
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
| Landing sections | `components/landing/` — Hero, Nav, **Apps teaser (M2b)**, Experience highlights, Skills, About, Contact, Footer |
| Site nav | `lib/portfolio-data.ts` `nav`; shared header on `/`, `/apps`, `/experience`, `/case-studies/*` |
| Experience depth | `app/experience/page.tsx` (M2c Done) — full history + filters |
| Experience shared UI | `components/experience/` — `ExperienceCard`, `ExperienceList` (client filters) |
| Apps detail page | `app/apps/page.tsx` — full cards (case-studies M3); SSOT entries shared with M2b teaser |
| App preview assets | `public/apps/` — static screenshots for M2b teaser (`next/image`) |
| Shared UI | `components/ui/` — `"use client"` re-exports / wrappers from `@nsoto/portfolio-ui`; Next `NavLink` adapter |
| Content | `lib/portfolio-data.ts` (`appsStub` / `experienceStub` / app + job entries) |
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

## M2b — Apps teaser on landing

Tracks P0 **[feature] #5**. **Done** — apps are first-class on this portfolio hub: the home page proves capability quickly, then hands off to `/apps`. Shipped with funnel **M2d**.

### Intent

| Surface | Role |
|---------|------|
| Landing `#apps` teaser | Two visual project cards (Chess first, Budget second) + `See all apps → /apps` |
| `/apps` | Full catalog — all entries, fuller descriptions, badges, domain + repo links |

### Layout / hierarchy

1. **Hero** — brand + positioning (may mention building apps on nsoto.dev; no app cards in the hero).
2. **Apps teaser** — immediately after hero (before Experience highlights).
3. **Work / skills / about / contact** — condensed funnel sections (M2d); unchanged Contact terminal CTA.

### Teaser UI

- Eyebrow: `</ APPS >`.
- One short supporting sentence (section has one job).
- **Two** higher-presence cards only: Chess, then Budget — each with a static screenshot (`public/apps/`), name, short blurb, outbound live link.
- Same entry data as `/apps` (`lib/portfolio-data.ts`) — one SSOT; optional `blurb` / preview fields for the teaser.
- Clear `See all apps → /apps` CTA.
- Card surfaces match `/apps` (slightly lighter surface + visible border vs pure-black canvas).

### Non-goals (M2b)

- Four-row text strip (superseded; do not merge `feature/apps-strip-m2b`).
- Duplicating the full `/apps` four-card grid on the home page.
- Mini-app embeds, iframes, or remote screenshot services.
- Recently shipped / changelog UI (roadmap P1 #7 — after this milestone).
- Hero redesign or WebGL (M5).

### Done when

- Home page renders the two-project Apps teaser after Hero and before Experience.
- Entries stay in sync with `/apps` via shared data.
- Nav **Apps** still goes to `/apps` for the full page.

## M2c — Experience depth page

Tracks P1 **[feature] #8** (first slice). **Done** — full employment history is available at `/experience`; landing still shows the full list until **M2d**.

### Intent

| Surface | Role |
|---------|------|
| Landing `#work` | Two highlights only (current + one standout) + `Full experience → /experience` (M2d) |
| `/experience` | Full four-role history + category filters |

### Deliverables

- Extract reusable experience card + thin client filter list (landing `Experience` is currently a single `"use client"` module with a private card).
- `app/experience/page.tsx` hub shell (mirror `/apps`): metadata, `SiteNav`, filters, full cards, `Footer`.
- Optional `experienceStub` header copy in `lib/portfolio-data.ts`.
- Sitemap entry for `/experience`.
- Keep primary nav `Work` → `#work` on home; **no** extra top-level Experience nav item.
- Experience-only page for v1 (Skills stay condensed on landing).

### Non-goals (M2c)

- Condensing the landing Experience section (that is **M2d**).
- Changing `/apps` or Case Studies.
- JSON-LD `WorkExperience` schema (optional later).

### Done when

- `/experience` shows all roles with working filters.
- Shared job data remains SSOT in `lib/portfolio-data.ts`.
- Lint + build pass; sitemap includes `/experience`.

## M2d — Fast landing funnel

Tracks P1 **[feature] #8** (second slice) and closes **P0 #5 / M2b** Apps teaser. **Done**.

### Landing composition (top → bottom)

1. **Hero** — unchanged structure; refresh stale “apps coming soon” eyebrow copy.
2. **Apps teaser** — M2b (Chess + Budget screenshots).
3. **Experience highlights** — current Sedgwick role + Southeastern Azure migration; no filter tabs; `Full experience → /experience`.
4. **Skills** — curated 10–15 chips (compact companion, not a full-height block); full taxonomy stays in data.
5. **About** — 2–3 sentence landing summary; keep case-study callout card.
6. **Contact** — unchanged terminal CTA.

### Design principles

- Mono headings / badges; sans body — no regression.
- Trimmed-section body text: nudge contrast up where `--text-secondary` feels washed out.
- Every depth section ends with a clear link to its full page (`/apps`, `/experience`).

### Non-goals (M2d)

- Changes to `/apps` card layout or Case Studies pages.
- Framer Motion (M4) or WebGL (M5).
- Analytics experimentation UI.

### Done when

- Landing scan length is materially shorter; depth CTAs work.
- M2b teaser Done criteria met.
- P1 #8 and P0 #5 can be marked Done when both M2c and M2d (incl. M2b) have shipped.

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
| M2b | Apps teaser on landing | **Done** | Two-project screenshot teaser (Chess + Budget); shared data with `/apps` (P0 #5) — [spec](#m2b--apps-teaser-on-landing); shipped with M2d |
| M2c | Experience depth page | **Done** | `/experience` full history + filters; extract reusable cards (P1 #8) — [spec](#m2c--experience-depth-page) |
| M2d | Fast landing funnel | **Done** | Condense Experience/Skills/About; depth CTAs; include M2b teaser (P1 #8) — [spec](#m2d--fast-landing-funnel) |
| M3 | Deploy `nsoto.dev` | Done | Live at [nsoto.dev](https://nsoto.dev) — Vercel, HTTPS, favicon, OG, Web3Forms env (P0 #4) |
| M4a | Package cutover (P1 #4) | **Done** | `@nsoto/portfolio-*` deps; no vendored `design-system/`; case study `implemented` |
| M4 | Polish + a11y pass | Planned | Focus/contrast sweep; Framer Motion |
| M5 | WebGL hero motion | Planned | Tier gate + R3F `full` tier; `reduced` static/CSS fallback — [M5 spec](#m5--webgl-hero) (P1 #1, post-v1) |

**Quick gate:** each implementation thread names **one milestone** only. M5 does not pull M4 polish.

## M3 — Deploy nsoto.dev

Tracks P0 **[chore] #4**. **Done** — [nsoto.dev](https://nsoto.dev) is live (static landing; Apps teaser is M2b / P0 #5).

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
- New routes: add page `metadata`, ensure the URL is in the sitemap source (registry or static list), then re-submit in Search Console after deploy. `/experience` is listed in `app/sitemap.ts` (M2c).

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
