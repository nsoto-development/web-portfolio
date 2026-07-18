# web-portfolio — product roadmap

Ordered **backlog**: **priority tiers** (P0/P1/P2) group **numbered work items**. See [`docs/process/cursor-workflow.md`](process/cursor-workflow.md) for backlog vs **feature** vs **milestone**.

**Work item kinds** (optional tags): `[feature]`, `[bugfix]`, `[chore]`, `[debt]`. A `[feature]` work item usually pairs with a feature doc; other kinds often do not.

**Feature & design:** [`docs/features/landing.md`](features/landing.md) · [`docs/features/case-studies.md`](features/case-studies.md) · [`@nsoto/portfolio-tokens`](https://www.npmjs.com/package/@nsoto/portfolio-tokens) / [`@nsoto/portfolio-ui`](https://www.npmjs.com/package/@nsoto/portfolio-ui)

---

## Status (where we are)

- **Live:** [nsoto.dev](https://nsoto.dev) — static landing deployed (M3 Done)

- **Current focus:** P1 #8 **Landing funnel restructure** **M2c** — `/experience` depth page (then M2d condense + P0 #5 Apps teaser). Spec: [`landing.md`](features/landing.md#m2c--experience-depth-page).

- **Shipped:** M1+M2 static landing + M3 deploy + case-studies M2 page + case-studies M3 discovery (nav, index, `/apps` hub, callout)

- **Unmerged WIP:** `feature/apps-strip-m2b` (four-row strip) — **not** merging; Apps teaser is redefined under P0 #5 / M2b.

- **Milestone naming:** **M3 = deploy**; graphical WebGL enhancement = **M5** (not M3)

---

## Priority framework

**P-tiers are importance bands — not work units.** A large `[feature]` work item may take several milestones (M1, M2, …) in a feature doc or active epic.

| Tier | Meaning |
|------|--------|
| **P0** | Must have — product is not viable without this |
| **P1** | Strong improvements after P0 |
| **P2** | Differentiation / scale — after P1 sticks |

---

## P0

1. ~~`[chore]` **App scaffold**~~ — **Done** — Next.js + Tailwind; map `design-system/tokens/` into theme; verify commands in `nudl.json`. → landing **M1**

2. ~~`[feature]` **Hero / static landing shell**~~ — **Done** — match visual baseline; logo, wordmark, terminal eyebrow, headline. → landing **M1** ([`landing.md`](features/landing.md))

3. ~~`[feature]` **Portfolio sections**~~ — **Done** — nav, work, skills, about, contact, footer. → landing **M2**

4. ~~`[chore]` **Deploy `nsoto.dev`**~~ — **Done** — live at [nsoto.dev](https://nsoto.dev) (Vercel, HTTPS, favicon, OG, Web3Forms). → landing **M3**

5. `[feature]` **Apps on landing** — apps-first portfolio: **2-project visual teaser** after hero (Chess + Budget + screenshots); `See all apps → /apps`; shared `appsStub` data. **Not** a four-row text strip or a duplicate full card grid. → landing **M2b** ([`landing.md`](features/landing.md#m2b--apps-teaser-on-landing)). Ships with funnel **M2d**.

---

## P1

1. `[feature]` **WebGL hero motion** — R3F + drei cursor-reactive layer; `prefers-reduced-motion` + device fps-probe tier gate → static/CSS fallback. → landing **M5** ([`landing.md`](features/landing.md#m5--webgl-hero))

2. `[feature]` **Subdomain app: first live child** — e.g. chess.nsoto.dev (separate stack OK; link from hub)

3. `[chore]` **Verify pipeline** — lint, typecheck, build in `nudl.json` `verify.commands`

4. ~~`[debt]` **Design-system harvest**~~ — **Done** — consume `@nsoto/portfolio-tokens` / `@nsoto/portfolio-ui`; no vendored `design-system/`; case study `implemented`. Polish/Framer (landing M4 remainder) stays separate. Migration SSOT: design-system `guidelines/migration-to-portfolio-packages.md`.

5. ~~`[chore]` **Web Analytics + Speed Insights**~~ — **Done** — `@vercel/analytics`, `@vercel/speed-insights` in `app/layout.tsx`; enable in Vercel project.

6. `[feature]` **Case studies — design system consumption** — architecture crossroads narrative at `/case-studies/design-system-consumption`; living doc updated when P1 #4 migration is planned/shipped. → case-studies **M2** + **M3** Done ([`case-studies.md`](features/case-studies.md))

7. `[feature]` **Recently shipped** — curated milestone outcomes (date + product + one line); surface on `/apps` (and optional reuse later). **After** P0 #5 M2b. No GitHub API / commit charts. → feature doc at implement ([`landing.md` future hook](features/landing.md#after-m2b--recently-shipped))

8. `[feature]` **Landing funnel restructure** — tighter home page for recruiter scan speed: depth on `/experience` + `/apps`; condensed Experience/Skills/About on `/`. → landing **M2c** then **M2d** ([`landing.md`](features/landing.md#m2c--experience-depth-page)). Does **not** change `/apps` or Case Studies pages.

**Post-v1 polish (landing milestones):** M4 a11y + Framer Motion; M5 WebGL.

---

## P2

1. `[feature]` **Writing / blog** — optional content section

2. `[feature]` **Showcase .NET** — on a subdomain app, not the hub

3. `[chore]` **nudl kit feedback** — optional visual-baseline pattern upstream if it proves useful

---

## When to update

- **Ship a milestone** → update status in the feature doc or active epic; mark the **work item** **Done** only when all milestones for that item are complete (or the whole item was one milestone).

- **Epic complete** → delete epic; fold lasting contracts into the feature doc.

- **Reprioritize** → move work items between P-tiers or reorder the backlog.
