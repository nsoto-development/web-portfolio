# Feature: Landing / portfolio hub

## Purpose

The public face of **nsoto.dev**: introduce the developer, show shipped work and skills, link to subdomain apps, and provide contact paths. Visual quality is a first-class requirement — the site is the portfolio product.

## Roadmap

Tracks P0 **[chore] #1** + **[feature] #2** → **M1**; **[feature] #3** → **M2**; **[chore] #4** → **M3** (deploy); **[feature] #5** → **M2b** (Apps hub). P1 **[feature] #1** WebGL → **M5**; **[debt] #4** design harvest → **M4**.

**v1 launch path:** static landing (M1+M2 epic) → Apps hub (M2b) → M3 deploy. WebGL (M5) is post-v1 per [`mvp-scope.md`](../mvp-scope.md).

**Milestone naming:** **M3 = deploy**; graphical WebGL enhancement = **M5** (not M3).

## Stack

Hub repo only — subdomain apps (e.g. `chess.nsoto.dev`) are separate repos; document their stacks there.

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js** (App Router) | Deploy, routing, OG/meta, future subdomain linking |
| Styling | **Tailwind CSS** | `@import` [`design-system/tokens/`](../../design-system/tokens/) in global CSS; Tailwind extends semantic CSS vars |
| UI motion | **CSS** (M1–M2) | Static baseline; **Framer Motion** at M4 — not WebGL |
| 3D / hero motion | **React Three Fiber + drei** | **M5 only** — post-v1; after static baseline ships |
| Icons | **Lucide** (`lucide-react`) | Per design-system iconography |

Production code references **semantic tokens** (`--brand`, `--bg-canvas`, etc.) — do not duplicate palette values. When the app diverges from the draft system, update tokens in one place and note here.

Deploy target: Vercel (or equivalent) at `nsoto.dev`.

## v1 scope (agreed)

- Dark-only landing matching [`design-system/`](../../design-system/) tokens and [`docs/mvp-scope.md`](../mvp-scope.md) visual baseline.
- Hero: logo mark, `nsoto.dev` wordmark, terminal eyebrow (`</ … >`), primary headline and subcopy. **Copy:** keep ui-kit draft (`</ COMING SOON. STAY TUNED >`) until post-M1 side-by-side with brand lockup, then refine.
- Sections (M1+M2 epic): sticky nav, work/experience, skills, about, contact, footer — layout informed by [`design-system/ui_kits/portfolio/`](../../design-system/ui_kits/portfolio/).
- **Apps hub (M2b / P0 #5):** dedicated section (`</ APPS >` eyebrow) listing WIP subdomain apps — coming soon, no live outbound links. Initial entries: `chess.nsoto.dev`, `budget.nsoto.dev`. **Not in the static-bootstrap epic** — ships after M1+M2.
- **Contact:** ui-kit form UI; submissions delivered via [Web3Forms](https://web3forms.com) (`POST https://api.web3forms.com/submit`) using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (client-side; key aliases inbox email).
- **Content SSOT:** resume-sourced copy in `lib/portfolio-data.ts` (migrated from ui-kit `data.js`); app list added when Apps hub ships.
- **Tokens:** `@import` [`design-system/tokens/`](../../design-system/tokens/) in app global CSS; Tailwind theme extends CSS variables (see [Stack](#stack)).
- Accessible defaults: focus rings, semantic HTML, `prefers-reduced-motion` respected before/without WebGL.

## Non-goals (v1)

- Full WebGL hero on first ship (M5 — see milestones).
- Framer Motion on first static ship (M4).
- Light theme or alternate colorways.
- CMS / admin for content — copy lives in repo.
- Live subdomain apps linked from the hub — all WIP at v1.
- Treating the design-system ui kit as immutable — it is a **draft** starting point.

## Future hooks

- R3F cursor-reactive background (M5).
- Live subdomain links when child apps ship (P1 #2).
- Per-subdomain cards with OG previews.
- Blog or writing section (P2).

## Code paths

| Area | Location |
|------|----------|
| App | `app/` (`layout.tsx`, `page.tsx`, `globals.css`) |
| Landing sections | `components/landing/` — Hero, Nav, Experience, Skills, About, Contact, Footer; Apps (M2b) |
| Shared UI | `components/ui/` — ported from `design-system/components/` |
| Content | `lib/portfolio-data.ts` |
| Contact delivery | `components/landing/Contact.tsx` → Web3Forms; env `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (see `.env.example`) |
| Hero shell + tier gate (M5) | `components/hero/` |
| R3F scene (M5) | `components/hero/webgl/` |
| Probe util (M5) | Co-located with tier gate or `lib/hero-tier/` |
| Theme tokens | `app/globals.css` `@import` → `design-system/tokens/`; `tailwind.config.ts` extends CSS vars |
| Brand assets | `public/logo/` (from `design-system/assets/logo/`); `public/favicon/` (from `design-system/assets/favicon/`); `public/og/` (OG preview image) |
| Design reference | `design-system/` |
| Meta / OG / favicon | `app/layout.tsx`; `public/favicon/`; `public/og/nsoto-dev-og.png` |

## Visual / motion spec

- **Authority:** [`design-system/readme.md`](../../design-system/readme.md) + [`design-system/tokens/`](../../design-system/tokens/) (draft — refine after M1 side-by-side with brand lockup).
- **Brand reference:** `design-system/assets/logo/nsoto-logo-cyan.png` (accent lockup); splash still at `design-system/assets/logo/nsoto-coming-soon-cyan-pad.png` (or nearest cyan lockup in `assets/logo/`).
- **Prototype:** `design-system/ui_kits/portfolio/index.html` — layout/copy guide, not production source. Ui-kit has **no Apps section** — Apps is net-new at M2b.
- **M1–M2:** static; CSS-only motion (blinking cursor, hovers per DS tokens).

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
| M2b | Apps hub | Planned | `</ APPS >` section; chess/budget coming soon (P0 #5) |
| M3 | Deploy `nsoto.dev` | In progress | Pre-deploy shipped: favicon, OG, meta in `layout.tsx`. Remaining: Vercel, domain/DNS, env, production smoke test — [M3 runbook](#m3--deploy-nsotodev) (P0 #4) — **v1 launch** |
| M4 | Polish + a11y pass | Planned | Focus/contrast sweep; Framer Motion; harvest token tweaks into design-system (P1 #4) |
| M5 | WebGL hero motion | Planned | Tier gate + R3F `full` tier; `reduced` static/CSS fallback — [M5 spec](#m5--webgl-hero) (P1 #1, post-v1) |

**Quick gate:** each implementation thread names **one milestone** only. M5 does not pull M4 polish.

## M3 — Deploy nsoto.dev

Tracks P0 **[chore] #4**. **v1 launch** requires M2b (Apps hub) plus this deploy pass.

### In repo (shipped)

| Item | Location |
|------|----------|
| `metadataBase`, title, description | `app/layout.tsx` |
| Open Graph + Twitter cards | `app/layout.tsx` → `public/og/nsoto-dev-og.png` |
| Favicon pack + web manifest | `public/favicon/`; wired in `layout.tsx` |
| Contact env contract | `.env.example` → `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` |
| Verify pipeline | `.cursor/nudl.json` — `npm run lint`, `npm run build` |

### Operator checklist (production)

1. **Prerequisite:** M2b Apps hub merged (v1 launch bar per [`mvp-scope.md`](../mvp-scope.md)).
2. Create a **Vercel** project; import this repo; use default Next.js settings.
3. Set **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** in Vercel env (Production; Preview optional for form smoke tests).
4. Add custom domain **`nsoto.dev`** (and `www` → apex redirect if desired).
5. Configure **DNS** at registrar per Vercel instructions; wait for HTTPS cert.
6. **Smoke test on production:** landing loads; favicon; OG preview (iMessage or [opengraph.xyz](https://www.opengraph.xyz/)); contact form delivers to inbox.

**Non-goals for M3:** Framer Motion (M4), WebGL hero (M5), live subdomain app links.

## Tests / verify

Add lint/build/test commands to [`.cursor/nudl.json`](../../.cursor/nudl.json) `verify.commands` when the app exists (roadmap P0 #1 seeds initial commands; P1 #3 expands the full pipeline).

**Contact (manual):**

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` set in `.env.local` (local) or Vercel env (deploy).
- Submit form → success toast, form clears, message arrives in inbox.
- Missing/invalid key → danger toast; form data retained.

**M3 deploy (manual):**

- `npm run lint` and `npm run build` pass locally before merge.
- Production: HTTPS at `https://nsoto.dev`; OG image resolves; contact form delivers with Vercel env set.

**M5 (manual until verify pipeline exists):**

- `prefers-reduced-motion` on → no canvas, static hero.
- Throttled CPU / low-end device → `reduced` after probe.
- Capable device → promotes to `full` after ~1s; same-session navigation does not re-probe.
