# Feature: Landing / portfolio hub

## Purpose

The public face of **nsoto.dev**: introduce the developer, show shipped work and skills, link to subdomain apps, and provide contact paths. Visual quality is a first-class requirement — the site is the portfolio product.

## Roadmap

Tracks **[feature] work item #2** and **#3** on [`docs/roadmap.md`](../roadmap.md) (hero + portfolio sections). Deploy is work item #4.

## v1 scope (agreed)

- Dark-only landing matching [`design-system/`](../design-system/) tokens and [`docs/mvp-scope.md`](../mvp-scope.md) visual baseline.
- Hero: logo mark, `nsoto.dev` wordmark, terminal eyebrow (`</ … >`), primary headline and subcopy (resume-sourced).
- Sections: sticky nav, work/experience, skills, about, contact, footer — layout informed by [`design-system/ui_kits/portfolio/`](../design-system/ui_kits/portfolio/).
- Subdomain hub: list linked apps (live or “coming soon”) with outbound links.
- Accessible defaults: focus rings, semantic HTML, `prefers-reduced-motion` respected before/without WebGL.

## Non-goals (v1)

- Full WebGL hero on first ship (M3 — see milestones).
- Light theme or alternate colorways.
- CMS / admin for content — copy lives in repo.
- Treating the design-system ui kit as immutable — it is a **draft** starting point.

## Future hooks

- R3F cursor-reactive background (M3).
- Per-subdomain cards with status badges and OG previews.
- Blog or writing section (P2).

## Code paths

| Area | Location |
|------|----------|
| App (planned) | `app/` |
| Shared UI (planned) | `components/` |
| Theme tokens (planned) | Tailwind config ← `design-system/tokens/` |
| Design reference | `design-system/` |

## Visual / motion spec

- **Authority:** [`design-system/readme.md`](../../design-system/readme.md) + [`design-system/tokens/`](../../design-system/tokens/) (draft — refine after M1 side-by-side with brand lockup).
- **Brand reference:** `design-system/assets/logo/nsoto-logo-cyan.png` (accent lockup); optional pad reference at `docs/design/reference/nsoto-coming-soon-cyan-pad.png` if present.
- **Prototype:** `design-system/ui_kits/portfolio/index.html` — layout/copy guide, not production source.
- **M1:** static; Framer Motion optional for subtle fades only.
- **M3:** WebGL layer; reduced-motion → static M1 hero; target smooth interaction on mid-tier laptop iGPU.

## Milestones

| # | Milestone | Status | Deliverables |
|---|-----------|--------|--------------|
| M1 | Static hero shell | Planned | Next + Tailwind scaffold; hero matches baseline; tokens wired |
| M2 | Portfolio sections | Planned | Nav, work, skills, about, contact, footer; subdomain hub stub |
| M3 | WebGL hero motion | Planned | R3F layer + reduced-motion fallback |
| M4 | Polish + a11y pass | Planned | Focus/contrast sweep; harvest token tweaks into design-system if needed |

**Quick gate:** each implementation thread names **one milestone** only.

## Tests / verify

Add lint/build/test commands to [`.cursor/nudl.json`](../../.cursor/nudl.json) `verify.commands` when the app exists.
