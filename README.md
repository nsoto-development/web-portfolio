# web-portfolio

Personal **hub** for my portfolio on [**nsoto.dev**](https://nsoto.dev). Built in **Next.js** with a draft [**design-system**](design-system/readme.md) as the aesthetic baseline.

## Status

**Foundation phase.** This repo currently has:

- A draft **design-system** — tokens, React components, and a click-through portfolio ui-kit
- **Product docs** — roadmap, MVP scope, landing feature spec, and an active implementation epic

The **Next.js app is not scaffolded yet.** Active work: [`docs/epics/static-hub-bootstrap.md`](docs/epics/static-hub-bootstrap.md) (landing M1+M2 — static page from the design-system).

| Milestone | What |
|-----------|------|
| **M1 + M2** (next) | Next.js scaffold + static landing (nav, hero, work, skills, about, contact, footer) |
| **M2b** | Apps hub section (`</ APPS >`, coming soon cards) |
| **M3** | Deploy to `nsoto.dev` |
| **M4 / M5** | Framer Motion polish; WebGL hero (post-v1) |

## Stack (planned)

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS + `design-system/tokens/` CSS variables |
| Icons | Lucide (`lucide-react`) |
| Motion | CSS first → Framer Motion (M4) → R3F WebGL hero (M5) |
| Deploy | Vercel (or equivalent) at `nsoto.dev` |

Subdomain apps are **separate repos** and may use other stacks.

## Repo map

| Path | Purpose |
|------|---------|
| [`design-system/`](design-system/readme.md) | Draft SSOT — tokens, components, portfolio ui-kit prototype |
| [`design-system/ui_kits/portfolio/`](design-system/ui_kits/portfolio/index.html) | Click-through layout reference (open `index.html` locally) |
| [`docs/roadmap.md`](docs/roadmap.md) | Backlog and priority tiers |
| [`docs/mvp-scope.md`](docs/mvp-scope.md) | v1 launch bar and visual direction |
| [`docs/features/landing.md`](docs/features/landing.md) | Landing hub — product spec, stack, code paths |
| [`docs/epics/static-hub-bootstrap.md`](docs/epics/static-hub-bootstrap.md) | **Active** — M1+M2 implementation detail |

## Design-system preview

The portfolio ui-kit is a standalone HTML prototype (React via CDN). To preview the intended look before the Next.js app exists:

1. Open [`design-system/ui_kits/portfolio/index.html`](design-system/ui_kits/portfolio/index.html) in a browser (or serve the `design-system/` folder with any static file server).

Production code will `@import` tokens from `design-system/tokens/` and port sections from the ui-kit into `app/` and `components/`.

## Visual direction

- **Dark only** — true-black canvas, azure `--brand` accent
- **Voice** — engineer-to-engineer
- **Motion** — purposeful UI motion layered on a static baseline

See [`design-system/readme.md`](design-system/readme.md) for tokens, components, and voice guidelines.

## License

Private project. All rights reserved unless stated otherwise.
