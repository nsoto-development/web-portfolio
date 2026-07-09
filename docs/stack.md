# Stack — web-portfolio (hub site)

**Scope:** `nsoto.dev` hub only. Subdomain apps (e.g. `chess.nsoto.dev`) are separate repos/deployments and may use their own stacks (including .NET where it fits).

## Production stack (agreed)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js** (App Router) | Deploy, routing, OG/meta, future subdomain linking |
| Styling | **Tailwind CSS** | Map tokens from [`design-system/tokens/`](../design-system/tokens/) into theme config |
| UI motion | **Framer Motion** | Page/section transitions, hovers — not WebGL |
| 3D / hero motion | **React Three Fiber + drei** | **Phase 2** — cursor-reactive / WebGL hero after static baseline ships |
| Icons | **Lucide** | Per design-system iconography (substitution) |

## Design system integration

| Role | Path |
|------|------|
| **Draft SSOT** | [`design-system/readme.md`](../design-system/readme.md) — tokens, voice, components, caveats |
| **Tokens (harvest source)** | [`design-system/tokens/`](../design-system/tokens/) — import or mirror into Tailwind |
| **UI reference** | [`design-system/ui_kits/portfolio/`](../design-system/ui_kits/portfolio/) — click-through prototype; **originated**, not frozen |
| **Brand assets** | `design-system/assets/logo/` — lockups and mark |
| **Agent skill** | [`design-system/SKILL.md`](../design-system/SKILL.md) |

Production code should **reference semantic tokens** (`--brand`, `--bg-canvas`, etc.), not re-invent palette values. When the app diverges from the draft system, update tokens in one place and note the change in the feature doc.

## Phased delivery (do not scaffold everything at once)

1. **M1 — Static shell:** Next + Tailwind + tokens; hero matches visual baseline with motion off.
2. **M2 — Portfolio sections:** Nav, work/skills/about/contact guided by ui kit layout and real resume copy.
3. **M3 — WebGL layer:** R3F hero; `prefers-reduced-motion` falls back to M1 static hero.
4. **Deploy:** Vercel (or equivalent) at `nsoto.dev`.

## Explicit non-goals (hub)

- **.NET / Blazor** on the hub — JS ecosystem fits WebGL and the chosen design-system components.
- **Light theme** — dark-only per design system.
- **R3F on day one** — static-first, then motion.

## When to update

- Stack choice changes for the hub.
- Token pipeline changes (how Tailwind maps to `design-system/tokens/`).
- A subdomain app picks a different stack — document there, not here.
