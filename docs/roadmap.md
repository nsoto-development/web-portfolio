# web-portfolio — product roadmap



Ordered **backlog**: **priority tiers** (P0/P1/P2) group **numbered work items**. See [`docs/process/cursor-workflow.md`](process/cursor-workflow.md) for backlog vs **feature** vs **milestone**.



**Work item kinds** (optional tags): `[feature]`, `[bugfix]`, `[chore]`, `[debt]`. A `[feature]` work item usually pairs with a feature doc; other kinds often do not.



**Feature & design:** [`docs/features/landing.md`](features/landing.md) · [`docs/features/case-studies.md`](features/case-studies.md) · [`design-system/readme.md`](../design-system/readme.md)



---



## Status (where we are)



- **Live:** [nsoto.dev](https://nsoto.dev) — static landing deployed (M3 Done)

- **Current focus:** P1 #6 case-studies **M3** (top-level nav, `/case-studies` index, `/apps` stub, landing callout). P0 #5 Apps hub **M2b** (full landing section) deferred — stub route acceptable in M3.

- **Shipped:** M1+M2 static landing + M3 deploy + case-studies M2 page at `/case-studies/design-system-consumption`

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

5. `[feature]` **Apps hub section** — `</ APPS >` eyebrow; `chess.nsoto.dev`, `budget.nsoto.dev` coming soon (no live links). → landing **M2b**. Interim `/apps` stub may ship in case-studies **M3**; full section is still this work item.



---



## P1



1. `[feature]` **WebGL hero motion** — R3F + drei cursor-reactive layer; `prefers-reduced-motion` + device fps-probe tier gate → static/CSS fallback. → landing **M5** ([`landing.md`](features/landing.md#m5--webgl-hero))

2. `[feature]` **Subdomain app: first live child** — e.g. chess.nsoto.dev (separate stack OK; link from hub)

3. `[chore]` **Verify pipeline** — lint, typecheck, build in `nudl.json` `verify.commands`

4. `[debt]` **Design-system harvest** — reconcile app theme with `design-system/tokens/` after M1 ship; resolve any draft/ui-kit drift. → landing **M4**

5. ~~`[chore]` **Web Analytics + Speed Insights**~~ — **Done** — `@vercel/analytics`, `@vercel/speed-insights` in `app/layout.tsx`; enable in Vercel project.

6. `[feature]` **Case studies — design system consumption** — architecture crossroads narrative at `/case-studies/design-system-consumption`; living doc updated when P1 #4 migration is planned/shipped. → case-studies **M2** Done; **M3** nav + discovery next ([`case-studies.md`](features/case-studies.md))



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

