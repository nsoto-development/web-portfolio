# Epic: Static hub bootstrap

> **Ephemeral execution SSOT** — multi-slice effort only. **Delete or archive** when P0 #1–#3 are Done. Fold lasting system truth into [`docs/features/landing.md`](../features/landing.md).

## Purpose

Bootstrap the **nsoto.dev hub** from the draft [`design-system/`](../../design-system/): Next.js scaffold, token wiring, and a full **static** landing page matching the ui-kit prototype. Delivers landing **M1 + M2** locally (no deploy). This epic holds implementation detail that [`landing.md`](../features/landing.md) intentionally keeps at product level.

## Roadmap

Tracks P0 **[chore] #1**, **[feature] #2**, **[feature] #3** on [`docs/roadmap.md`](../roadmap.md).

| Roadmap item | Landing milestone | Epic milestone |
|--------------|-------------------|----------------|
| P0 #1 App scaffold | M1 | M1 |
| P0 #2 Hero / static shell | M1 | M1 |
| P0 #3 Portfolio sections | M2 | M2 |

**Not in this epic:** P0 #4 deploy (M3), P0 #5 Apps hub (M2b), P1 WebGL (M5).

## Scope (this effort)

- Next.js App Router + TypeScript + Tailwind + ESLint scaffold
- `@import` [`design-system/tokens/`](../../design-system/tokens/) in `app/globals.css` — **tokens only** (not full `styles.css` reset; avoids fighting Tailwind preflight)
- `tailwind.config.ts` extends semantic CSS variables (`--brand`, `--bg-canvas`, font families, etc.)
- `lib/portfolio-data.ts` migrated from [`design-system/ui_kits/portfolio/data.js`](../../design-system/ui_kits/portfolio/data.js)
- Port DS primitives → `components/ui/`: Button, Input, Textarea, Toast
- Port ui-kit sections → `components/landing/`: Nav, Hero, Experience, Skills, About, Contact, Footer
- `lucide-react` for icons (replaces ui-kit `icons.jsx`)
- Logo assets → `public/logo/` from `design-system/assets/logo/`
- Contact: M2 shipped placeholder UI (success toast only); **post-M2** wired to [Web3Forms](https://web3forms.com) — see [`landing.md`](../features/landing.md#code-paths)
- [`.cursor/nudl.json`](../../.cursor/nudl.json) `verify.commands`: `npm run lint`, `npm run build`
- Light a11y: semantic landmarks (`header`, `main`, `footer`, `section`); focus rings via DS tokens; `prefers-reduced-motion` disables CSS animations (e.g. blinking cursor)

**Hero copy (locked for this epic):** keep ui-kit draft — eyebrow `</ COMING SOON. STAY TUNED >`; refine after side-by-side with brand lockup in a later pass.

## Non-goals

- Deploy to `nsoto.dev` (landing M3 / P0 #4)
- Apps hub section (P0 #5 / landing M2b — separate pass)
- Framer Motion dependency (landing M4)
- WebGL / React Three Fiber (landing M5)
- Rewriting inline styles to Tailwind utility classes
- Updating the ui-kit HTML prototype (read-only reference)
- Light theme or rebrand

## Milestones

Each row = one logical slice; **M1 + M2 may ship in a single** `/nudl-start-milestone` pass.

| # | Milestone | Status | Deliverables |
|---|-----------|--------|--------------|
| M1 | Scaffold + hero | Done | `package.json`; `app/layout.tsx`, `app/page.tsx`, `app/globals.css` (token imports); `tailwind.config.ts`; verify commands in `nudl.json`; `public/logo/`; `lib/portfolio-data.ts`; `components/ui/Button.tsx`; `components/landing/Hero.tsx`; hero matches ui-kit baseline |
| M2 | Full static landing | Done | Remaining `components/ui/*` (Input, Textarea, Toast); `components/landing/Nav`, `Experience`, `Skills`, `About`, `Contact`, `Footer`; `app/page.tsx` composed; `npm run build` passes |

### M2 section checklist

| Section | Ui-kit source | Nav anchor |
|---------|---------------|------------|
| Nav | `Nav.jsx` | — |
| Hero | `Hero.jsx` | `#top` |
| Work / Experience | `Experience.jsx` | `#work` |
| Skills | `Skills.jsx` | `#skills` |
| About | `About.jsx` | `#about` |
| Contact | `Contact.jsx` | `#contact` |
| Footer | `Footer.jsx` | — |

Nav items in `portfolio-data.ts`: Work, Skills, About, Contact — **no Apps**.

## Porting rules

1. **Preserve inline styles + `var(--*)`** from DS components — fastest path to visual parity; do not Tailwind-rewrite in this epic.
2. Replace `window.PORTFOLIO_DATA` and `window.NsotoDevDesignSystem_*` globals with normal ES module imports.
3. Add `'use client'` only where needed (Contact form, Toast).
4. Import token files individually in `globals.css`:

```css
@import "../../design-system/tokens/fonts.css";
@import "../../design-system/tokens/colors.css";
@import "../../design-system/tokens/typography.css";
@import "../../design-system/tokens/spacing.css";
@import "../../design-system/tokens/effects.css";
```

5. DS source files are `.jsx` — port to `.tsx` with minimal typing.

## Touch areas

| Area | Path / notes |
|------|----------------|
| App shell | `app/layout.tsx`, `app/page.tsx`, `app/globals.css` |
| Content | `lib/portfolio-data.ts` |
| Landing sections | `components/landing/*.tsx` |
| UI primitives | `components/ui/*.tsx` ← `design-system/components/` |
| Tokens | `design-system/tokens/` via `@import` |
| Assets | `public/logo/` ← `design-system/assets/logo/` |
| Reference prototype | `design-system/ui_kits/portfolio/` (read-only; not production source) |
| Verify | `.cursor/nudl.json` |

## Risks / open questions

- Ui-kit prototype has **no Apps section** — intentional; Apps is P0 #5 after this epic.
- Logo PNGs may need copying from `design-system/assets/logo/` if not yet in `public/`.
- Package manager: `npm` (no lockfile preference in repo).

## Lifecycle

When M1 + M2 ship and P0 #1–#3 are Done:

1. Mark roadmap work items **Done**.
2. **Delete** this epic.
3. Update [`landing.md`](../features/landing.md) milestone statuses; fold any new contracts discovered during port.
