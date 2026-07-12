# web-portfolio

Personal **hub** for my portfolio on **[nsoto.dev](https://nsoto.dev)**. **Next.js** app with a draft **[design-system](design-system/readme.md)** as the aesthetic baseline.

## Status

Static landing **M1 + M2** is implemented locally (nav, hero, work, skills, about, contact, footer). Not deployed yet.


| Milestone          | What                                              |
| ------------------ | ------------------------------------------------- |
| **M1 + M2** (done) | Next.js scaffold + static landing                 |
| **M2b**            | Apps hub section (`</ APPS >`, coming soon cards) |
| **M3**             | Deploy to `nsoto.dev`                             |
| **M4 / M5**        | Framer Motion polish; WebGL hero (post-v1)        |


Implementation detail: `[docs/epics/static-hub-bootstrap.md](docs/epics/static-hub-bootstrap.md)` · product spec: `[docs/features/landing.md](docs/features/landing.md)`

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # ESLint
npm run build   # production build
npm run start   # serve production build
```



## Stack


| Layer     | Choice                                                  |
| --------- | ------------------------------------------------------- |
| Framework | Next.js 16 (App Router)                                 |
| Styling   | Tailwind CSS v4 + `design-system/tokens/` CSS variables |
| Icons     | Lucide (`lucide-react`) + inline SVGs for brand icons   |
| Motion    | CSS → Framer Motion (M4) → R3F WebGL hero (M5)          |
| Deploy    | Vercel (or equivalent) at `nsoto.dev` (M3)              |


Subdomain apps are **separate repos** and may use other stacks.

## Repo map


| Path                                                                             | Purpose                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `[app/](app/)`                                                                   | Next.js shell — `layout.tsx`, `page.tsx`, `globals.css` |
| `[components/](components/)`                                                     | Landing sections + ported UI primitives                 |
| `[lib/portfolio-data.ts](lib/portfolio-data.ts)`                                 | Copy and site content (SSOT)                            |
| `[public/logo/](public/logo/)`                                                   | Brand mark served by the app                            |
| `[design-system/](design-system/readme.md)`                                      | Draft SSOT — tokens, components, ui-kit prototype       |
| `[design-system/ui_kits/portfolio/](design-system/ui_kits/portfolio/index.html)` | Click-through layout reference                          |
| `[docs/roadmap.md](docs/roadmap.md)`                                             | Backlog and priority tiers                              |
| `[docs/mvp-scope.md](docs/mvp-scope.md)`                                         | v1 launch bar and visual direction                      |
| `[docs/features/landing.md](docs/features/landing.md)`                           | Landing hub — product spec, milestones                  |




## Design reference

The portfolio ui-kit (`design-system/ui_kits/portfolio/index.html`) is a standalone HTML prototype for layout and copy reference. The Next.js app ports those sections into `components/landing/` and `@import`s tokens from `design-system/tokens/` in `app/globals.css`.

## Visual direction

- **Dark only** — true-black canvas, azure `--brand` accent
- **Voice** — engineer-to-engineer
- **Motion** — purposeful UI motion on a static baseline

See `[design-system/readme.md](design-system/readme.md)` for tokens, components, and voice guidelines.

## License

Private project. All rights reserved unless stated otherwise.