# MVP scope — web-portfolio

## Context

- **MVP** = what a **shipped v1** means for this product (launch bar), not execution order.
- **Roadmap / backlog:** [`docs/roadmap.md`](roadmap.md) — priority tiers and work items.
- **Features:** `docs/features/` — SSOT for product capabilities (usually tied to `[feature]` work items).
- **Stack:** [`docs/stack.md`](stack.md) — hub tech choices and design-system integration.
- **Milestones:** shippable slices — in a feature doc when delivery is large; see [`docs/process/cursor-workflow.md`](process/cursor-workflow.md).

## MVP bar (v1 target)

1. **Live at `nsoto.dev`** — deployed hub site with sane meta/OG and HTTPS.
2. **Visual match** — dark landing consistent with brand lockup and [`design-system/`](../design-system/) tokens (see Visual baseline below).
3. **Hero** — logo mark, `nsoto.dev`, terminal eyebrow, headline + subcopy; static-first (WebGL may follow in a later milestone).
4. **Portfolio content** — work/experience, skills, about, contact (copy from resume; layout guided by design-system ui kit).
5. **Subdomain hub** — list subdomain apps with links; “coming soon” entries are acceptable for v1.
6. **Motion/accessibility** — `prefers-reduced-motion` honored; no motion-only critical content.

## Non-goals (MVP)

- Light theme or rebrand exploration.
- Full cursor-reactive WebGL hero required for v1 launch (planned post–static hero).
- .NET / Blazor on the hub site (reserved for subdomain apps where it fits).
- CMS, auth, or backend beyond static/edge deploy.
- Perfect parity with every design-system component — ui kit is a **draft** prototype.

## Visual baseline (v1)

**Layered authority** (most durable → most exploratory):

| Layer | Path | Role |
|-------|------|------|
| **Design system (draft SSOT)** | [`design-system/readme.md`](../design-system/readme.md), [`design-system/tokens/`](../design-system/tokens/) | Tokens, type, motion vocabulary, voice, components |
| **Brand lockup** | `design-system/assets/logo/nsoto-logo-cyan.png` | Accent reference sampled into `--brand` |
| **Splash reference** | [`docs/design/reference/nsoto-coming-soon-cyan-pad.png`](design/reference/nsoto-coming-soon-cyan-pad.png) | Original still-frame target (if present) |
| **Layout prototype** | [`design-system/ui_kits/portfolio/`](../design-system/ui_kits/portfolio/) | Originated click-through — strong starting point, not sacred |

**Direction:** true-black canvas, azure brand accent (`--brand`), JetBrains Mono + Space Grotesk, terminal punctuation (`</ … >`), centered minimal layout, engineer-to-engineer voice (see design-system readme).

**Non-goals:** light theme, warm/golden imagery grades, busy backgrounds, corporate SaaS look, emoji.

**Motion:** additive on static baseline; 120–340ms purposeful UI motion per design-system; WebGL is a later milestone ([`docs/features/landing.md`](features/landing.md) M3).

**Draft caveat:** components and ui kit were **originated** from logo + resume — harvest and adjust after M1 when compared to the real lockup.

## When to update this doc

- MVP bar or non-goals change.
- Something shipped that **changes the launch bar** (tighten wording to match reality).
- Aesthetic direction changes deliberately (rare — update design-system tokens/readme and reference assets).
