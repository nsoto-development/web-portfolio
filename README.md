# web-portfolio

Personal **hub** for my portfolio on **[nsoto.dev](https://nsoto.dev)**. **Next.js** app consuming **[`@nsoto/portfolio-tokens`](https://www.npmjs.com/package/@nsoto/portfolio-tokens)** and **[`@nsoto/portfolio-ui`](https://www.npmjs.com/package/@nsoto/portfolio-ui)** for the visual baseline.

## Status

**[nsoto.dev](https://nsoto.dev) is live** — deployed on **Vercel** (static landing: nav, hero, work, skills, about, contact, footer). Production uses **Vercel Web Analytics** and **Speed Insights** for page views and Core Web Vitals. Case studies at [`/case-studies`](https://nsoto.dev/case-studies) with the first story on design-system consumption; Apps hub stub at `/apps` until M2b.

| Milestone          | What                                              |
| ------------------ | ------------------------------------------------- |
| **M1 + M2** (done) | Next.js scaffold + static landing                 |
| **M3** (done)      | Deployed to `nsoto.dev` on Vercel (HTTPS, Web Analytics, Speed Insights) |
| **case-studies M3** (done) | Top-level nav, `/case-studies` index, `/apps` stub, landing callout |
| **M4a** (done)     | Package cutover — `@nsoto/portfolio-*`, no vendored `design-system/` |
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
| Styling   | Tailwind CSS v4 + `@nsoto/portfolio-tokens`             |
| UI        | `@nsoto/portfolio-ui` via `components/ui/` wrappers     |
| Icons     | Lucide (`lucide-react`) + inline SVGs for brand icons   |
| Motion    | CSS → Framer Motion (M4) → R3F WebGL hero (M5)          |
| Deploy    | Vercel at [nsoto.dev](https://nsoto.dev) (live)         |
| Analytics | Vercel Web Analytics + Speed Insights (`app/layout.tsx`) |


Subdomain apps are **separate repos** and may use other stacks.

## Repo map


| Path                                                                             | Purpose                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `[app/](app/)`                                                                   | Next.js shell — `layout.tsx`, `page.tsx`, `globals.css` |
| `[components/](components/)`                                                     | Landing sections + UI wrappers                          |
| `[lib/portfolio-data.ts](lib/portfolio-data.ts)`                                 | Copy and site content (SSOT)                            |
| `[lib/case-studies/](lib/case-studies/)`                                         | Case study content + registry                           |
| `[app/case-studies/](app/case-studies/)`                                         | Case studies index + story routes                       |
| `[app/apps/](app/apps/)`                                                         | Apps coming-soon stub (until landing M2b)               |
| `[components/SiteNav.tsx](components/SiteNav.tsx)`                               | Shared header on hub routes                             |
| `[public/logo/](public/logo/)`                                                   | Brand mark served by the app                            |
| `[public/favicon/](public/favicon/)`                                             | Favicon pack + web manifest                             |
| `[public/og/](public/og/)`                                                       | Open Graph preview image                                |
| `[docs/roadmap.md](docs/roadmap.md)`                                             | Backlog and priority tiers                              |
| `[docs/mvp-scope.md](docs/mvp-scope.md)`                                         | v1 launch bar and visual direction                      |
| `[docs/features/landing.md](docs/features/landing.md)`                           | Landing hub — product spec, milestones                  |




## Design reference

Canonical kit: [`@nsoto/portfolio-tokens`](https://www.npmjs.com/package/@nsoto/portfolio-tokens) + [`@nsoto/portfolio-ui`](https://www.npmjs.com/package/@nsoto/portfolio-ui) ([design-system](https://github.com/nsoto-development/design-system) repo). The hub imports tokens in `app/globals.css` and re-exports UI primitives from `components/ui/` (Next adapters such as `NavLink` stay app-owned). Landing sections live in `components/landing/`.

## Visual direction

- **Dark only** — true-black canvas, azure `--brand` accent
- **Voice** — engineer-to-engineer
- **Motion** — purposeful UI motion on a static baseline

## License

Private project. All rights reserved unless stated otherwise.
