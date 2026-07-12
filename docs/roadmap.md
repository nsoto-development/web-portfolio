# web-portfolio — product roadmap



Ordered **backlog**: **priority tiers** (P0/P1/P2) group **numbered work items**. See [`docs/process/cursor-workflow.md`](process/cursor-workflow.md) for backlog vs **feature** vs **milestone**.



**Work item kinds** (optional tags): `[feature]`, `[bugfix]`, `[chore]`, `[debt]`. A `[feature]` work item usually pairs with a feature doc; other kinds often do not.



**Feature & design:** [`docs/features/landing.md`](features/landing.md) · [`design-system/readme.md`](../design-system/readme.md)



---



## Status (where we are)



- **Current focus:** P0 #5 Apps hub (M2b), then P0 #4 production deploy (M3) — see [`landing.md` M3 runbook](features/landing.md#m3--deploy-nsotodev)

- **v1 launch path:** static landing (M1+M2, Done) → Apps hub (P0 #5) → M3 deploy (P0 #4) — see [`mvp-scope.md`](mvp-scope.md)

- **Milestone naming:** **M3 = deploy**; graphical WebGL enhancement = **M5** (not M3)

- **Pre-launch / MVP:** see [`mvp-scope.md`](mvp-scope.md)

- **Done recently:** P0 #1–#3 (M1+M2 static landing); M3 pre-deploy in repo (favicon, OG meta, Web3Forms); `static-hub-bootstrap` epic closed



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

4. `[chore]` **Deploy `nsoto.dev`** — Vercel project, domain/DNS, HTTPS; pre-deploy assets shipped (favicon, OG, meta). Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel env; production contact smoke test. → landing **M3** ([runbook](features/landing.md#m3--deploy-nsotodev))

5. `[feature]` **Apps hub section** — `</ APPS >` eyebrow; `chess.nsoto.dev`, `budget.nsoto.dev` coming soon (no live links). → landing **M2b** (after static bootstrap)



---



## P1



1. `[feature]` **WebGL hero motion** — R3F + drei cursor-reactive layer; `prefers-reduced-motion` + device fps-probe tier gate → static/CSS fallback. → landing **M5** ([`landing.md`](features/landing.md#m5--webgl-hero))

2. `[feature]` **Subdomain app: first live child** — e.g. chess.nsoto.dev (separate stack OK; link from hub)

3. `[chore]` **Verify pipeline** — lint, typecheck, build in `nudl.json` `verify.commands`

4. `[debt]` **Design-system harvest** — reconcile app theme with `design-system/tokens/` after M1 ship; resolve any draft/ui-kit drift. → landing **M4**



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

