# web-portfolio — product roadmap

Ordered **backlog**: **priority tiers** (P0/P1/P2) group **numbered work items**. See [`docs/process/cursor-workflow.md`](process/cursor-workflow.md) for backlog vs **feature** vs **milestone**.

**Work item kinds** (optional tags): `[feature]`, `[bugfix]`, `[chore]`, `[debt]`. A `[feature]` work item usually pairs with a feature doc; other kinds often do not.

**Stack & design:** [`docs/stack.md`](stack.md) · [`design-system/readme.md`](../design-system/readme.md) · [`docs/features/landing.md`](features/landing.md)

---

## Status (where we are)

- **Current focus:** P0 #1 — Next.js scaffold + design tokens (landing M1)
- **Pre-launch / MVP:** see [`mvp-scope.md`](mvp-scope.md)
- **Done recently:** nudl init; draft [`design-system/`](../design-system/); project docs (MVP, stack, landing feature)

---

## Priority framework

**P-tiers are importance bands — not work units.** A large `[feature]` work item may take several milestones (M1, M2, …) in `docs/features/<topic>.md`.

| Tier | Meaning |
|------|--------|
| **P0** | Must have — product is not viable without this |
| **P1** | Strong improvements after P0 |
| **P2** | Differentiation / scale — after P1 sticks |

---

## P0

1. `[chore]` **App scaffold** — Next.js + Tailwind; map `design-system/tokens/` into theme; verify commands in `nudl.json`. → landing **M1** setup
2. `[feature]` **Hero / static landing shell** — match visual baseline; logo, wordmark, terminal eyebrow, headline. → landing **M1** ([`docs/features/landing.md`](features/landing.md))
3. `[feature]` **Portfolio sections + subdomain hub** — nav, work, skills, about, contact, footer; subdomain list (coming soon OK). → landing **M2**
4. `[chore]` **Deploy `nsoto.dev`** — production deploy, domain, OG image from brand lockup

---

## P1

1. `[feature]` **WebGL hero motion** — R3F + drei cursor-reactive layer; `prefers-reduced-motion` fallback. → landing **M3**
2. `[feature]` **Subdomain app: first live child** — e.g. chess.nsoto.dev (separate stack OK; link from hub)
3. `[chore]` **Verify pipeline** — lint, typecheck, build in `nudl.json` `verify.commands`
4. `[debt]` **Design-system harvest** — reconcile app theme with `design-system/tokens/` after M1 ship; resolve any draft/ui-kit drift

---

## P2

1. `[feature]` **Writing / blog** — optional content section
2. `[feature]` **Showcase .NET** — on a subdomain app, not the hub
3. `[chore]` **nudl kit feedback** — optional visual-baseline pattern upstream if it proves useful

---

## When to update

- **Ship a milestone** → update status in the feature doc; mark the **work item** **Done** only when all milestones for that item are complete (or the whole item was one milestone).
- **Reprioritize** → move work items between P-tiers or reorder the backlog.
