# MVP scope — web-portfolio



## Product north star



**nsoto.dev** is a portfolio **hub** linking to subdomain projects (e.g. `chess.nsoto.dev`). The hub is built in **Next.js** with **`@nsoto/portfolio-tokens` / `@nsoto/portfolio-ui`** as the aesthetic baseline: true-black canvas, azure brand accent, terminal voice. **Static landing is live** at [nsoto.dev](https://nsoto.dev); Apps hub and UI/WebGL layers ship next.



## Context



- **MVP** = what a **shipped v1** means for this product (launch bar), not execution order.

- **Roadmap / backlog:** [`docs/roadmap.md`](roadmap.md) — priority tiers and work items.

- **Features:** `docs/features/` — SSOT for product capabilities (usually tied to `[feature]` work items).

- **Hub implementation:** [`docs/features/landing.md`](features/landing.md) — stack, code paths, M3 deploy runbook, M5 spec.

- **Milestones:** shippable slices — see [`docs/process/cursor-workflow.md`](process/cursor-workflow.md).



## Enhancement layers



| Layer | When | What |

|-------|------|------|

| **0 — Design system** | Now | `@nsoto/portfolio-tokens` + `@nsoto/portfolio-ui` (canonical design-system repo) |

| **1 — Static landing** | M1+M2+M3 (Done, live) | Next.js page at [nsoto.dev](https://nsoto.dev); CSS-only motion |

| **2 — UI motion** | M4 | Framer Motion fades/hovers |

| **3 — WebGL hero** | M5 (post-v1) | R3F cursor-reactive layer with tier gate |



**Naming:** landing **M3** = deploy; **M5** = graphical WebGL enhancement (not M3).



## MVP bar (v1 target)



1. **Live at `nsoto.dev`** — **Done** — static landing deployed with HTTPS, meta/OG, and favicon.

2. **Visual match** — dark landing consistent with brand lockup and `@nsoto/portfolio-tokens` (see Visual baseline below).

3. **Hero** — logo mark, `nsoto.dev`, terminal eyebrow, headline + subcopy; static-first (WebGL may follow in M5).

4. **Portfolio content** — work/experience, skills, about, contact (copy from resume; layout guided by design-system ui kit). Contact form delivers to inbox via [Web3Forms](https://web3forms.com) (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`).

5. **Apps hub** — `</ APPS >` section listing WIP subdomain apps (coming soon, no live links). **Not yet shipped** (P0 #5 / landing M2b).

6. **Subdomain hub** — coming soon cards when Apps hub ships; live outbound links when child apps ship (P1).

7. **Motion / accessibility** — `prefers-reduced-motion` honored; CSS motion OK for first static ship; no motion-only critical content.



## Non-goals (MVP)



- Light theme or rebrand exploration.

- Full cursor-reactive WebGL hero required for v1 launch (planned M5, post-v1).

- Framer Motion required for first static ship (planned M4).

- .NET / Blazor on the hub — hub is **Next.js**; subdomain apps are separate repos/deployments and may use other stacks (including .NET).

- CMS, auth, or backend beyond static/edge deploy and client-side form relay (Web3Forms).

- Perfect parity with every design-system component — ui kit is a **draft** prototype.



## Visual baseline (v1)



**Layered authority** (most durable → most exploratory):



| Layer | Path | Role |

|-------|------|------|

| **Design system (SSOT)** | [`@nsoto/portfolio-tokens`](https://www.npmjs.com/package/@nsoto/portfolio-tokens), [`@nsoto/portfolio-ui`](https://www.npmjs.com/package/@nsoto/portfolio-ui) | Tokens, type, motion vocabulary, components |

| **Brand lockup** | `public/logo/nsoto-mark-cyan.png` | Accent reference sampled into `--brand` |

| **Layout prototype** | Canonical DS repo `ui_kits/portfolio/` | Originated click-through — strong starting point, not sacred |



**Direction:** true-black canvas, azure brand accent (`--brand`), JetBrains Mono + Space Grotesk, terminal punctuation (`</ … >`), centered minimal layout, engineer-to-engineer voice.



**Non-goals:** light theme, warm/golden imagery grades, busy backgrounds, corporate SaaS look, emoji.



**Motion:** CSS for static bootstrap (M1+M2); Framer Motion at M4; WebGL at M5 ([`landing.md`](features/landing.md#m5--webgl-hero)).



**Draft caveat:** components and ui kit were **originated** from logo + resume — harvest and adjust after M1 when compared to the real lockup.



## When to update this doc



- MVP bar or non-goals change.

- Something shipped that **changes the launch bar** (tighten wording to match reality).

- Aesthetic direction changes deliberately (rare — update design-system tokens/readme and reference assets).

