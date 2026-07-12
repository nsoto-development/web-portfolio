# web-portfolio

Personal **hub** for my portfolio on **[nsoto.dev](https://nsoto.dev)**. **Next.js** app with a draft **[design-system](design-system/readme.md)** as the aesthetic baseline.

## Status

**[nsoto.dev](https://nsoto.dev) is live** — deployed on **Vercel** (static landing: nav, hero, work, skills, about, contact, footer). Production uses **Vercel Web Analytics** and **Speed Insights** for page views and Core Web Vitals. Case studies at [`/case-studies`](https://nsoto.dev/case-studies) with the first story on design-system consumption; Apps hub stub at `/apps` until M2b.

| Milestone          | What                                              |
| ------------------ | ------------------------------------------------- |
| **M1 + M2** (done) | Next.js scaffold + static landing                 |
| **M3** (done)      | Deployed to `nsoto.dev` on Vercel (HTTPS, Web Analytics, Speed Insights) |
| **case-studies M3** (done) | Top-level nav, `/case-studies` index, `/apps` stub, landing callout |
| **M2b**            | Apps hub section (`</ APPS >`, coming soon cards) |
| **M4 / M5**        | Framer Motion polish; WebGL hero (post-v1)        |

Product spec: [`docs/features/landing.md`](docs/features/landing.md) · [`docs/features/case-studies.md`](docs/features/case-studies.md)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Contact form delivery uses [Web3Forms](https://web3forms.com). Copy the example env file and set your access key:

```bash
cp .env.example .env.local
# edit .env.local — set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
```

Restart `npm run dev` after changing env vars.

```bash
npm run lint    # ESLint
npm run build   # production build
npm run start   # serve production build
```

### Deploy & analytics

Production deploys to **Vercel** at [nsoto.dev](https://nsoto.dev). [`app/layout.tsx`](app/layout.tsx) includes `@vercel/analytics` and `@vercel/speed-insights` — they collect data on Vercel only (inert locally). Enable **Web Analytics** and **Speed Insights** in the Vercel project dashboard after deploy.

## Stack


| Layer     | Choice                                                  |
| --------- | ------------------------------------------------------- |
| Framework | Next.js 16 (App Router)                                 |
| Styling   | Tailwind CSS v4 + `design-system/tokens/` CSS variables |
| Icons     | Lucide (`lucide-react`) + inline SVGs for brand icons   |
| Motion    | CSS → Framer Motion (M4) → R3F WebGL hero (M5)          |
| Deploy    | Vercel at [nsoto.dev](https://nsoto.dev) (live)         |
| Analytics | Vercel Web Analytics + Speed Insights (`app/layout.tsx`) |


Subdomain apps are **separate repos** and may use other stacks.

## Repo map


| Path                                                                             | Purpose                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `[app/](app/)`                                                                   | Next.js shell — `layout.tsx`, `page.tsx`, `globals.css` |
| `[components/](components/)`                                                     | Landing sections + ported UI primitives                 |
| `[lib/portfolio-data.ts](lib/portfolio-data.ts)`                                 | Copy and site content (SSOT)                            |
| `[lib/case-studies/](lib/case-studies/)`                                         | Case study content + registry                           |
| `[app/case-studies/](app/case-studies/)`                                         | Case studies index + story routes                       |
| `[app/apps/](app/apps/)`                                                         | Apps coming-soon stub (until landing M2b)               |
| `[components/SiteNav.tsx](components/SiteNav.tsx)`                               | Shared header on hub routes                             |
| `[public/logo/](public/logo/)`                                                   | Brand mark served by the app                            |
| `[public/favicon/](public/favicon/)`                                             | Favicon pack + web manifest                             |
| `[public/og/](public/og/)`                                                       | Open Graph preview image                                |
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