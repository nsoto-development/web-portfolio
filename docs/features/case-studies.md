# Feature: Case studies

## Purpose

Host **engineering case studies** on nsoto.dev — long-form narratives that show systems thinking, shipped work, and architectural judgment beyond the landing page. v1 delivers the case-studies capability and the first story: **Architecture at a crossroads** (design system consumption across public repos). The page is a **living document**: it ships in `architecture` lifecycle phase and is revised when consumption migration is planned and executed (see [Follow-on updates](#follow-on-updates)).

## Roadmap

Tracks P1 **[feature] #6** on [`docs/roadmap.md`](../roadmap.md). Relates to P1 **[debt] #4** (design-system harvest) — the case study documents the crossroads; harvest owns implementation.

**Tone:** portfolio value — not "hiring" / "recruiter" language in public copy, titles, or eyebrows.

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js** (App Router) | New route under `app/case-studies/` |
| Content | **Typed TS modules** | `lib/case-studies/*.ts` — no MDX in v1 |
| Styling | **DS tokens** + landing patterns | Reuse `--content-max`, mono eyebrows, Card/Badge; add `.case-study-prose` in `globals.css` |
| Icons | **Lucide** (if needed) | Same as landing |

## v1 scope (agreed)

- Feature doc SSOT (this file) + roadmap line.
- First case study at `/case-studies/design-system-consumption` — self-contained narrative (no dependency on private DS repo links).
- Sections: hook, problem, constraints, options matrix, decision direction, evidence, learnings, status (lifecycle callout).
- `lifecycle: 'architecture'` on v1 publish; status explains planned revisions.
- Discovery from landing (M3) — light touch; no top-level nav item before Apps hub ships.
- Content SSOT for page body: `lib/case-studies/design-system-consumption.ts` (ported from [Appendix A](#appendix-a--case-study-copy-v1)).

## Non-goals (v1)

- DS consumption migration implementation (P1 #4 — separate thread).
- MDX / blog engine / CMS.
- Additional case studies beyond design-system consumption.
- Changing P0 #5 Apps hub.
- Publishing or restructuring the design-system repo.

## Future hooks

- More case studies under `app/case-studies/<slug>/`.
- Lifecycle content passes when migration moves to `planned` → `in-progress` → `implemented`.
- Optional P1 chore: **Case study — consumption migration update** per lifecycle transition.

## Code paths

| Area | Location |
|------|----------|
| Feature SSOT | `docs/features/case-studies.md` |
| Content types | `lib/case-studies/types.ts` |
| First story content | `lib/case-studies/design-system-consumption.ts` |
| Layout + sections | `components/case-studies/CaseStudyLayout.tsx`, `CaseStudySection.tsx`, `OptionsTable.tsx`, `CaseStudyStatus.tsx` |
| Route | `app/case-studies/design-system-consumption/page.tsx` |
| Prose styles | `app/globals.css` (`.case-study-prose`) |
| Discovery (M3) | `lib/portfolio-data.ts` (`caseStudies`); callout in `components/landing/About.tsx` or `Experience.tsx` |
| Related debt | P1 #4 design-system harvest → landing M4 |

## Content contract (M2)

See [Appendix B](#appendix-b--typescript-contracts) and [Appendix C](#appendix-c--page-metadata). M2 implements types and ports Appendix A into `design-system-consumption.ts` without rewriting prose.

## Follow-on updates

Living document tied to P1 #4 consumption migration.

| Lifecycle | When | Case study changes |
|-----------|------|-------------------|
| `architecture` | **v1 (M2)** | Problem, constraints, matrix, directional decision, evidence, open migration work |
| `planned` | Migration approach finalized in dedicated planning thread | Chosen path, phase outline, target end state |
| `in-progress` | Migration milestones shipping | Status banner, before/after deps, PR/commit links |
| `implemented` | P1 #4 done bar met | Outcomes, version pins, validated learnings |

**Revision triggers:**

1. Migration plan finalized → `planned`.
2. First migration milestone ships → `in-progress`.
3. Migration complete → `implemented`.

Update `lifecycle`, `lastUpdated`, status callout copy, and relevant sections in `design-system-consumption.ts`. No new routes required per transition.

## Milestones

| # | Milestone | Status | Deliverables |
|---|-----------|--------|--------------|
| M1 | Docs + roadmap | **Done** | This feature doc; P1 #6 on roadmap; copy appendix for M2 |
| M2 | Case study page | **Done** | `lib/`, `components/case-studies/`, route, prose CSS, OG metadata |
| M3 | Discovery + polish | Planned | Landing callout; `portfolio-data` caseStudies; README blurb |

**Quick gate:** one milestone per `/nudl-start-milestone` pass.

## Tests / verify

- `npm run lint` and `npm run build` pass after M2.
- Manual: `/case-studies/design-system-consumption` readable at mobile width; status callout visible; external links work.

---

## Appendix A — Case study copy (v1)

Port into `lib/case-studies/design-system-consumption.ts`. Eyebrows use mono `</ … >` pattern.

### Meta

- **slug:** `design-system-consumption`
- **title:** Architecture at a crossroads
- **subtitle:** Shared UI across public repos without the copy-paste tax
- **lifecycle:** `architecture`
- **lastUpdated:** set at M2 ship date (ISO string)

### Status callout (render prominently)

- **phase label:** Architecture
- **headline:** Decision recorded — implementation tracked separately
- **body:** This case study documents the problem, constraints, and options for consuming a design system across multiple public apps. Consumption migration is planned and will be executed in a separate effort; this page will be updated as that work is specified and shipped.

### Section: Hook

**Eyebrow:** `</ CONTEXT >`

**Heading:** One design system. Three copies.

**Body:**

nsoto.dev is a portfolio hub built in Next.js. ns-chess is a public Vite app — a hand-built React board with a chess.js rules engine. Both share one visual language: true-black canvas, azure brand accent, monospace headings, terminal voice.

Both started by copy-pasting an entire `design-system/` folder from a canonical repo. That felt fast. It did not scale. I had one source of truth and two stale snapshots — plus drift between what the apps actually run and what the vendored folder claims to be.

### Section: Problem

**Eyebrow:** `</ AUDIT >`

**Heading:** Vendoring the whole repo is not consuming it

**Body:**

The audit surfaced three structural problems.

**Full-tree copy-paste.** Each public app carried guidelines, ui_kits, component sources, and tooling artifacts — most of it never imported at build time. Dead weight and a second source of truth.

**Two integration models, one brand.** web-portfolio imports **tokens only** in `globals.css` and hand-ports components into `components/ui/` and `components/landing/`. ns-chess imports `styles.css` and runs design-system `.jsx` through a `@ds` alias and thin wrappers in `src/components/ui/`. Same primitives; different wiring.

**Silent drift.** The live portfolio `Nav.tsx` shipped responsive mobile nav. The vendored `ui_kits/portfolio/Nav.jsx` in both app repos did not. Copy in `lib/portfolio-data.ts` moved forward; vendored `data.js` did not. Nothing pinned a version — no way to answer which design-system commit an app was on.

### Section: Constraints

**Eyebrow:** `</ CONSTRAINTS >`

**Heading:** What the architecture had to satisfy

**Body:** (render as table — see Appendix D)

### Section: Crossroads

**Eyebrow:** `</ OPTIONS >`

**Heading:** Five paths, one requirement

**Body:** Public app repos must support `git clone` → `npm install` → `npm run dev` with **no private registry auth**. The full design-system repo can stay private; the **runtime dependency** must be publicly resolvable. See options matrix (Appendix D).

### Section: Decision

**Eyebrow:** `</ DIRECTION >`

**Heading:** Private workshop, public runtime

**Body:**

**Leading direction:** keep the design-system repo private as the workshop (guidelines, ui_kits, prompts, prototypes). Publish or vendor a **runtime slice** — `@nsoto/tokens` and `@nsoto/ui` on public npm, or a committed vendor directory — so public apps declare versioned dependencies like any other package.

**Alternative under evaluation:** make the design-system repo public as its own portfolio project; same package consumption model, but guidelines and ui_kits become part of what is showcased.

**App ownership unchanged:** Next.js adapters and landing sections stay in web-portfolio. Game UI stays in ns-chess. Content stays in `lib/portfolio-data.ts` — not in the design system.

This is an architecture-phase decision. Migration phases, package setup, and consumer refactors are tracked under design-system harvest (P1 #4).

### Section: Evidence

**Eyebrow:** `</ REPOS >`

**Heading:** Where to look

**Body:**

- [web-portfolio](https://github.com/nsoto-development/web-portfolio) — Next.js hub; tokens via `globals.css`; manual TSX ports.
- [ns-chess](https://github.com/nsoto-development/ns-chess) — Vite app; `@ds` wrappers; oxlint `no-restricted-imports`; integration doc at `docs/design/system-integration.md`.

ns-chess is further along on consumption discipline. web-portfolio carries more dead vendored weight. Both need to converge on versioned runtime deps — not folder copies.

### Section: Learnings

**Eyebrow:** `</ TAKEAWAYS >`

**Heading:** What I would do differently from day one

**Bullets:**

1. **Vendoring a folder ≠ consuming a design system.** Ship tokens and built primitives; keep specs and ui_kits in the workshop repo.
2. **Public apps need publicly resolvable runtime.** Private-only packages fail the clone-and-run bar unless every reader has registry auth.
3. **Framework adapters belong in apps; primitives belong in packages.** Next.js `"use client"` and `next/image` stay in web-portfolio — not in shared component source.

---

## Appendix B — TypeScript contracts

```ts
export type CaseStudyLifecycle =
  | "architecture"
  | "planned"
  | "in-progress"
  | "implemented";

export type CaseStudyMeta = {
  slug: string;
  title: string;
  subtitle: string;
  lifecycle: CaseStudyLifecycle;
  lastUpdated: string; // ISO date
};

export type CaseStudyStatusCallout = {
  phaseLabel: string;
  headline: string;
  body: string;
};

export type CaseStudySection = {
  id: string;
  eyebrow: string;
  heading: string;
  body?: string;
  bullets?: string[];
  kind?: "prose" | "constraints" | "options";
};

export type OptionsMatrixRow = {
  option: string;
  pros: string;
  cons: string;
  verdict: string;
};

export type ConstraintRow = {
  constraint: string;
  implication: string;
};

export type CaseStudy = CaseStudyMeta & {
  status: CaseStudyStatusCallout;
  sections: CaseStudySection[];
  constraints: ConstraintRow[];
  options: OptionsMatrixRow[];
};
```

## Appendix C — Page metadata

| Field | Value |
|-------|-------|
| **Route** | `/case-studies/design-system-consumption` |
| **title** | Architecture at a crossroads — nsoto.dev |
| **description** | How I audited design-system drift across web-portfolio and ns-chess, mapped consumption options, and chose a path toward versioned shared UI without copy-paste. |
| **og:title** | Architecture at a crossroads |
| **og:description** | Design system consumption across public repos — constraints, options, and direction. |
| **og:url** | `https://nsoto.dev/case-studies/design-system-consumption` |

## Appendix D — Tables (constraints + options matrix)

### Constraints

| Constraint | Implication |
|------------|-------------|
| `design-system` is private | Guidelines, ui_kits, prompts stay in workshop repo |
| `web-portfolio` and `ns-chess` are public | Anyone can clone; narrative must be self-contained on site |
| Readers must run apps without DS access | Runtime deps: public npm or committed vendor slice — not private registry only |
| Next.js ≠ Vite | Shared primitives; framework adapters stay per app |
| Sites are live | Shipped CSS/JS is inspectable; private DS protects process, not deployed aesthetic |

### Options matrix

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Keep copy-pasting full repo | Zero setup | Guaranteed drift; dead files in public repos | Retire |
| Private npm packages only | Corporate-clean versioning | `npm install` fails for readers without auth | Fails clone-and-run bar |
| Public `@nsoto/tokens` + `@nsoto/ui` | Versioned; reviewer-friendly | Component source on public npm | Leading direction |
| Committed vendor slice | No registry; works offline in git | Manual sync until packages exist | Valid interim |
| Private monorepo | Simplest internal workflow | Loses separate public app repos | Optional if repo model changes |
| Public design-system repo | Full system showcase; same npm model | All workshop content public | Alternative under evaluation |
