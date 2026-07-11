# MVP scope — web-portfolio

## Product north star

**nsoto.dev** is a portfolio **hub** linking to subdomain projects (e.g. `chess.nsoto.dev`). The hub is built in **Next.js** with [`design-system/`](../design-system/) as the aesthetic baseline: true-black canvas, azure brand accent, terminal voice. **Static landing ships first**; UI motion (Framer) and WebGL hero layer on later. **v1 launch** = full static page (including Apps hub) **deployed** at `nsoto.dev` with HTTPS and sane meta/OG.

## Context

- **MVP** = what a **shipped v1** means for this product (launch bar), not execution order.
- **Roadmap / backlog:** [`docs/roadmap.md`](roadmap.md) — priority tiers and work items.
- **Features:** `docs/features/` — SSOT for product capabilities (usually tied to `[feature]` work items).
- **Hub implementation:** [`docs/features/landing.md`](features/landing.md) — stack, code paths, M5 spec.
- **Active execution:** [`docs/epics/static-hub-bootstrap.md`](epics/static-hub-bootstrap.md) — M1+M2 implementation detail (ephemeral).
- **Milestones:** shippable slices — see [`docs/process/cursor-workflow.md`](process/cursor-workflow.md).

## Enhancement layers

| Layer | When | What |
|-------|------|------|
| **0 — Design system** | Now | Tokens, components, ui-kit prototype ([`design-system/`](../design-system/)) |
| **1 — Static landing** | M1+M2 ([epic](epics/static-hub-bootstrap.md)) | Next.js page matching ui-kit; CSS-only motion |
| **2 — UI motion** | M4 | Framer Motion fades/hovers |
| **3 — WebGL hero** | M5 (post-v1) | R3F cursor-reactive layer with tier gate |

**Naming:** landing **M3** = deploy; **M5** = graphical WebGL enhancement (not M3).

## MVP bar (v1 target)

1. **Live at `nsoto.dev`** — deployed hub site with sane meta/OG and HTTPS.
2. **Visual match** — dark landing consistent with brand lockup and [`design-system/`](../design-system/) tokens (see Visual baseline below).
3. **Hero** — logo mark, `nsoto.dev`, terminal eyebrow, headline + subcopy; static-first (WebGL may follow in M5).
4. **Portfolio content** — work/experience, skills, about, contact (copy from resume; layout guided by design-system ui kit). Required for first static ship (M1+M2 epic).
5. **Apps hub** — `</ APPS >` section listing WIP subdomain apps (coming soon, no live links). Required for **v1 launch** (P0 #5 / landing M2b) — not in the static-bootstrap epic.
6. **Subdomain hub** — coming soon cards at v1 launch; live outbound links when child apps ship (P1).
7. **Motion / accessibility** — `prefers-reduced-motion` honored; CSS motion OK for first static ship; no motion-only critical content.

## Non-goals (MVP)

- Light theme or rebrand exploration.
- Full cursor-reactive WebGL hero required for v1 launch (planned M5, post-v1).
- Framer Motion required for first static ship (planned M4).
- .NET / Blazor on the hub — hub is **Next.js**; subdomain apps are separate repos/deployments and may use other stacks (including .NET).
- CMS, auth, or backend beyond static/edge deploy.
- Perfect parity with every design-system component — ui kit is a **draft** prototype.
- Real contact form delivery at v1 (placeholder UI only).

## Visual baseline (v1)

**Layered authority** (most durable → most exploratory):

| Layer | Path | Role |
|-------|------|------|
| **Design system (draft SSOT)** | [`design-system/readme.md`](../design-system/readme.md), [`design-system/tokens/`](../design-system/tokens/) | Tokens, type, motion vocabulary, voice, components |
| **Brand lockup** | `design-system/assets/logo/nsoto-logo-cyan.png` | Accent reference sampled into `--brand` |
| **Splash reference** | `design-system/assets/logo/nsoto-coming-soon-cyan-pad.png` | Still-frame target (or nearest cyan lockup in `assets/logo/`) |
| **Layout prototype** | [`design-system/ui_kits/portfolio/`](../design-system/ui_kits/portfolio/) | Originated click-through — strong starting point, not sacred |

**Direction:** true-black canvas, azure brand accent (`--brand`), JetBrains Mono + Space Grotesk, terminal punctuation (`</ … >`), centered minimal layout, engineer-to-engineer voice (see design-system readme).

**Non-goals:** light theme, warm/golden imagery grades, busy backgrounds, corporate SaaS look, emoji.

**Motion:** CSS for static bootstrap (M1+M2); Framer Motion at M4; WebGL at M5 ([`landing.md`](features/landing.md#m5--webgl-hero)).

**Draft caveat:** components and ui kit were **originated** from logo + resume — harvest and adjust after M1 when compared to the real lockup.

## When to update this doc

- MVP bar or non-goals change.
- Something shipped that **changes the launch bar** (tighten wording to match reality).
- Aesthetic direction changes deliberately (rare — update design-system tokens/readme and reference assets).
