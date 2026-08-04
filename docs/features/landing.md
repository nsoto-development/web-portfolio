# Feature: Landing / portfolio hub

## Purpose

The public face of **nsoto.dev**: introduce the developer, show shipped work and skills, link to subdomain apps, and provide contact paths. Visual quality is a first-class requirement — the site is the portfolio product.

## Roadmap

Tracks P0 **[chore] #1** + **[feature] #2** → **M1**; **[feature] #3** → **M2**; **[chore] #4** → **M3** (deploy); **[feature] #5** → **M2b** (Apps teaser). P1 **[feature] #8** funnel → **M2c** / **M2d**; **[feature] #1** WebGL → **M5**; **[debt] #4** package cutover → **M4a** (Done); polish/Framer → **M4** (Done); experience accordion motion → **M4b** (Done); experience copy hierarchy → **M4c** (Done); experience deep-link cards → **M4d** (Planned).

**v1 launch path:** static landing (M1+M2) deployed at nsoto.dev (M3 Done); **M2c** `/experience` + **M2d** funnel + **M2b** Apps teaser **Done**; **M4** Framer Motion **Done**; **M4b** experience accordion **Done**; **M4c** experience copy **Done**. **Next:** landing **M4d** (experience deep-links), roadmap P1 **Recently shipped**, or M5 WebGL. WebGL (M5) is post-v1 per [`mvp-scope.md`](../mvp-scope.md).

**Branch note:** `feature/apps-strip-m2b` (four-row strip) stayed **unmerged**; M2b shipped as the 2-project screenshot teaser instead.

**Milestone naming:** **M3 = deploy**; graphical WebGL enhancement = **M5** (not M3).

## Stack

Hub repo only — subdomain apps (e.g. `chess.nsoto.dev`) are separate repos; document their stacks there.

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js** (App Router) | Deploy, routing, OG/meta, future subdomain linking |
| Styling | **Tailwind CSS** | `@import '@nsoto/portfolio-tokens/styles.css'` in `app/globals.css`; Tailwind extends semantic CSS vars |
| UI primitives | **`@nsoto/portfolio-ui`** | Via thin `"use client"` wrappers in `components/ui/` (Next adapters stay here) |
| UI motion | **Framer Motion** (M4 + M4b Done) | Home: hero stagger, section `whileInView`, card/CTA hover; `/experience` accordion height/opacity (M4b); CSS cursor blink remains; **not** WebGL |
| 3D / hero motion | **React Three Fiber + drei** | **M5 only** — post-v1; after static baseline ships |
| Icons | **Lucide** (`lucide-react`) | Per kit iconography |

Production code references **semantic tokens** (`--brand`, `--bg-canvas`, etc.) — do not duplicate palette values. When the app diverges from the draft system, update tokens in one place and note here.

Deploy target: **Vercel** at [nsoto.dev](https://nsoto.dev) (M3 Done).

## v1 scope (agreed)

- Dark-only landing matching `@nsoto/portfolio-tokens` and [`docs/mvp-scope.md`](../mvp-scope.md) visual baseline.
- Hero: logo mark, `nsoto.dev` wordmark, terminal eyebrow (`</ … >`), primary headline and subcopy from `lib/portfolio-data.ts` (e.g. `</ SENIOR SOFTWARE ENGINEER >`).
- Sections (M1+M2 epic): sticky nav, work/experience, skills, about, contact, footer — layout informed by the canonical DS portfolio ui-kit (reference only).
- **Apps on landing (M2b / P0 #5):** 2-project visual **teaser** early on the home page (after hero; Chess + Budget + screenshots). Apps are first-class; employment history supports the story. See [M2b spec](#m2b--apps-teaser-on-landing).
- **Landing funnel (M2c / M2d / P1 #8):** `/experience` holds full work history; landing shows highlights + condensed skills/about with clear depth CTAs. See [M2c](#m2c--experience-depth-page) / [M2d](#m2d--fast-landing-funnel).
- **`/apps` detail hub:** case-studies **M3** shipped top-level **Apps** → `/apps` with live cards. That page stays the full catalog; M2b does **not** duplicate it as a four-card grid. Catalog may include **repo-only** utilities (no live subdomain) — e.g. P1 #9 LG TV Sync — without adding them to the landing teaser.
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
- Repo-only `/apps` entries (GitHub primary link; optional case-study `links[]`) — P1 #9 / case-studies **M4**.
- Per-subdomain cards with OG previews on `/apps`.
- Blog or writing section (P2).
- [Recently shipped](#after-m2b--recently-shipped) (roadmap P1 #7) after M2b.
- Landing experience cards → `/experience` deep-link + open accordion ([M4d](#m4d--experience-deep-link-cards)).

## Code paths

| Area | Location |
|------|----------|
| App | `app/` (`layout.tsx`, `page.tsx`, `globals.css`) |
| Landing sections | `components/landing/` — Hero, Nav, **Apps teaser (M2b)**, Experience highlights, Skills, About, Contact, Footer |
| Landing motion (M4) | `components/landing/motion/` — `FadeIn`, `SectionReveal`, `HoverLift` (`useReducedMotion`) |
| Site nav | `lib/portfolio-data.ts` `nav`; shared header on `/`, `/apps`, `/experience`, `/case-studies/*` |
| Experience depth | `app/experience/page.tsx` (M2c Done) — full history + tech filters + expandable resume bullets |
| Experience shared UI | `components/experience/` — `ExperienceCard`, `ExperienceList` (client filters); M4b Framer expand/collapse on card bullets |
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
- **M4 (home `/` only):** three intentional Framer motions — (1) hero entrance stagger (`FadeIn`), (2) section scroll presence once (`SectionReveal` / `whileInView`), (3) subtle hover lift on Apps teaser cards + hero CTAs (`HoverLift`). Helpers honor `useReducedMotion()` (no enter/hover transforms). CSS `.dc-cursor` blink + kit CSS hovers remain. Nav/Footer and other routes: no Framer in M4.
- **M4b (`/experience`):** Framer height/opacity expand/collapse for accordion resume bullets; `useReducedMotion` → instant toggle. See [M4b](#m4b--experience-accordion-motion).
- **M4c:** Experience card copy hierarchy — short `detail` hooks; fuller resume lines only in `bullets`. See [M4c](#m4c--experience-copy-hierarchy).

## M4b — Experience accordion motion

Post-M4 polish (no new roadmap P-tier line). **Done** — `/experience` accordion open/close uses Framer Motion height/opacity.

### Intent

| Surface | Role |
|---------|------|
| `/experience` expandable cards | Smooth height + opacity on show/hide details; chevron may keep CSS rotate or match Framer |
| Landing `#work` cards | Unchanged — summary-only, no expand |

### Deliverables

- Animate bullet list expand/collapse via Framer (`AnimatePresence` + height/opacity) in `ExperienceCard` (or a thin co-located helper).
- Honor `useReducedMotion()` — no enter/exit transforms; content still toggles instantly.
- Keep existing accordion UX: single open at a time; Current (`sedgwick`) open by default; `aria-expanded` preserved.
- Match M4 motion vocabulary (ease similar to `FadeIn`).

### Non-goals (M4b)

- Filter-tab or list reorder animation.
- Multi-open accordions.
- Framer on other routes beyond this accordion.
- Focus/contrast sweep (still deferred from M4).
- WebGL (M5).

### Done when

- Expanding/collapsing details on `/experience` animates smoothly when motion is allowed.
- Reduced-motion users get instant toggle with no layout thrash.
- Lint + build pass; `landing.md` status → Done.

## M4c — Experience copy hierarchy

Post-M4b polish (no new roadmap P-tier line). **Done** — experience `detail` hooks are short scannable frames; fuller resume lines live in `bullets` without restating the summary.

### Intent

| Field | Role |
|-------|------|
| `detail` | Short scannable hook always visible (landing highlights + collapsed `/experience` cards) |
| `bullets` | Fuller resume highlights — only on `/experience` expand; must not duplicate the hook |

### Agreed hooks (`detail`)

| Job id | Hook |
|--------|------|
| `sedgwick` | Mission-critical .NET data ingestion between XactAnalysis, Cotality, and Salesforce over HTTP and SFTP. |
| `southeastern` | Led an Azure migration — 15–20% lower hosting cost, ~10% better performance and stability. |
| `caci` | WebCV for AFRL — no/low-code viz, Cytoscape graphs, and a Node-RED ETL back end. |
| `chorotega` | Acquisition-side tech advising and CMS booking for a new venture with prior ProVerde ownership. |
| `career-note` | Relocated from Massachusetts to Florida and prioritized family matters before returning to full-time work. |
| `interactive-resources` | Short Angular contract — organization and fixes so the team could ship in parallel. |
| `proverde` | Architected ProVerde’s cloud sample platform — API, portals, payments, shipping, and Sage. |
| `des-lauriers-municipal` | Day-to-day delivery lead for a five-developer municipal product team. |
| `des-lauriers-municipal-dev` | Municipal product features driven by customer feedback and industry shifts. |
| `des-lauriers-associates` | Acquisition cutover: ASC live, data migrated, Access→MySQL, site rewritten in ASP.NET. |

**Sedgwick:** hook is **integrations only**; Cursor / VSS / AI-assisted knowledge preservation stays in bullets.  
**Southeastern:** keep cost/perf numbers in the hook (landing highlight).  
**Career note:** keep the gap line; say **family matters** only — no health detail.

### Deliverables

- Update `lib/portfolio-data.ts` `detail` (and dedupe overlapping bullet #1 where needed) per table above.
- Light list styling: flush with the summary plane (`list-style: none`); brand en-dash markers, not nested `ul` indent.
- Landing `#work` inherits new hooks via shared data (`LANDING_EXPERIENCE_IDS` unchanged: sedgwick, southeastern, caci).

### Non-goals (M4c)

- Accordion motion changes (M4b Done).
- Landing card deep-links to `/experience` (that is **M4d**).
- Filter UX, new roles, skills/about rewrite.
- Resume PDF sync automation.
- WebGL (M5) or Recently shipped (P1 #7).

### Done when

- Hooks match the agreed table; expand bullets no longer restate the visible summary.
- Career note uses “family matters” (no health wording).
- Lint + build pass; `landing.md` status → Done.

## M4d — Experience deep-link cards

Post-M4c polish (no new roadmap P-tier line). **Planned** — landing `#work` highlight cards link into the matching role on `/experience`.

### Intent

| Surface | Role |
|---------|------|
| Landing `#work` cards | Clickable → `/experience#<job-id>` (or equivalent); still summary-only (no expand on landing) |
| `/experience` | Stable `id` per job card; on hash load, scroll into view and open that accordion when expandable |

### Deliverables

- Add durable anchors on experience cards (`id={job.id}` or wrapper).
- Wrap landing highlight cards in `Link` (or card-level hit target) to `/experience#…`.
- On `/experience`, honor hash: set open accordion to that job when it has bullets; scroll to the card.
- Keep **Full experience → /experience** section CTA.

### Non-goals (M4d)

- Expanding details on the landing itself.
- Filter query-string sync.
- Deep-links from nav or sitemap (hash URLs stay secondary).

### Done when

- Clicking a landing highlight lands on the matching `/experience` card with details open when available.
- Lint + build pass; `landing.md` status → Done.

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
| `/experience` | Full resume-aligned work history + curated tech filters (C#, .NET, Node.js, Azure, AWS, SQL, Angular, Salesforce); accordion “Show details” expands curated resume bullets (Current open by default). Landing cards stay summary-only. |

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

1. **Hero** — unchanged structure; eyebrow/headline/sub live in `lib/portfolio-data.ts`.
2. **Apps teaser** — M2b (Chess + Budget screenshots).
3. **Experience highlights** — Sedgwick (current), Southeastern Azure migration, and CACI/AFRL WebCV; no filter tabs; `Full experience → /experience`.
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
| M4 | Polish + Framer Motion | **Done** | Home Framer: hero stagger, section presence, card/CTA hover; `prefers-reduced-motion` via `useReducedMotion` (focus/contrast sweep deferred) |
| M4b | Experience accordion motion | **Done** | Framer expand/collapse for `/experience` resume bullets; `useReducedMotion` — [spec](#m4b--experience-accordion-motion) |
| M4c | Experience copy hierarchy | **Done** | Short `detail` hooks + deduped bullets; career-note family matters — [spec](#m4c--experience-copy-hierarchy) |
| M4d | Experience deep-link cards | Planned | Landing `#work` → `/experience#job-id` + open accordion — [spec](#m4d--experience-deep-link-cards) |
| M5 | WebGL hero motion | Planned | Tier gate + R3F `full` tier; `reduced` static/CSS fallback — [M5 spec](#m5--webgl-hero) (P1 #1, post-v1) |

**Quick gate:** each implementation thread names **one milestone** only. M4d does not pull M5; M5 does not pull M4 polish.

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
