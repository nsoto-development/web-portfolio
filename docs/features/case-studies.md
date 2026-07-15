# Feature: Case studies

## Purpose

Host **engineering case studies** on nsoto.dev — long-form narratives that show systems thinking, shipped work, and architectural judgment beyond the landing page. v1 delivers the case-studies capability and the first story: **Architecture at a crossroads** (design system consumption across public repos). The page is a **living document**: evaluation shipped in `architecture`; current phase is **`planned`** (phases + `@nsoto/portfolio-*` packages locked in the DS migration SSOT); revise again when migration executes (see [Follow-on updates](#follow-on-updates)).

## Roadmap

Tracks P1 **[feature] #6** on [`docs/roadmap.md`](../roadmap.md). Relates to P1 **[debt] #4** (design-system harvest) — the case study documents the crossroads; harvest owns implementation. Migration how/when: design-system repo `guidelines/migration-to-portfolio-packages.md`.

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
- Sections: hook, problem, constraints, options matrix, **evaluation** (private vs public repo), decision, evidence, learnings, status (lifecycle callout).
- `lifecycle: 'planned'` (2026-07-15) — naming locked to `@nsoto/portfolio-tokens` / `@nsoto/portfolio-ui`; phases scheduled in DS migration SSOT. Earlier v1 ship used `architecture`.
- **Top-level nav (M3):** **Case Studies** and **Apps** in site header (landing, case-study pages, apps stub). Case Studies links to `/case-studies` index; Apps links to `/apps` coming-soon stub until P0 #5 M2b ships properly.
- **Landing callout (M3):** secondary discovery in About or Work — complements nav, does not replace it.
- Content SSOT for page body: `lib/case-studies/design-system-consumption.ts` (ported from [Appendix A](#appendix-a--case-study-copy-v1)).

## Non-goals (v1)

- DS consumption migration implementation (P1 #4 — separate thread).
- MDX / blog engine / CMS.
- Additional case studies beyond design-system consumption.
- **Full** P0 #5 Apps hub (landing `</ APPS >` section, app cards) — M3 may ship a **stub** `/apps` page only; proper M2b is a separate thread.
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
| Site nav (M3) | `lib/portfolio-data.ts` (`nav`, `caseStudies`); `components/SiteNav.tsx` (re-exported as `components/landing/Nav.tsx` on landing) |
| Case studies registry (M3) | `lib/case-studies/registry.ts` |
| Case studies index (M3) | `app/case-studies/page.tsx` — lists published studies |
| Apps stub (M3) | `app/apps/page.tsx` — coming soon; satisfies Apps nav target until landing M2b |
| Discovery callout (M3) | `components/landing/About.tsx` |
| Related debt | P1 #4 design-system harvest → landing M4 |

## Content contract (M2)

See [Appendix B](#appendix-b--typescript-contracts) and [Appendix C](#appendix-c--page-metadata). M2 implements types and ports Appendix A into `design-system-consumption.ts` without rewriting prose.

## Follow-on updates

Living document tied to P1 #4 consumption migration.

| Lifecycle | When | Case study changes |
|-----------|------|-------------------|
| `architecture` | **v1 (M2)** | Problem, constraints, matrix, directional decision, evidence, open migration work |
| `planned` | **Current** — migration SSOT + package names locked | Chosen path, phase outline, `@nsoto/portfolio-*` end state |
| `in-progress` | Migration milestones shipping | Status banner, before/after deps, PR/commit links |
| `implemented` | P1 #4 done bar met | Outcomes, version pins, validated learnings |

**Revision triggers:**

1. ~~Migration plan finalized → `planned`.~~ **Done** (2026-07-15).
2. First migration milestone ships → `in-progress`.
3. Migration complete → `implemented`.

Update `lifecycle`, `lastUpdated`, status callout copy, and relevant sections in `design-system-consumption.ts`. No new routes required per transition.

## Milestones

| # | Milestone | Status | Deliverables |
|---|-----------|--------|--------------|
| M1 | Docs + roadmap | **Done** | This feature doc; P1 #6 on roadmap; copy appendix for M2 |
| M2 | Case study page | **Done** | `lib/`, `components/case-studies/`, route, prose CSS, OG metadata |
| M3 | Discovery + nav | **Done** | Top-level **Case Studies** + **Apps** nav; `/case-studies` index; `/apps` stub; landing callout; `portfolio-data`; README blurb; shared header on hub routes |

**Quick gate:** one milestone per `/nudl-start-milestone` pass.

## Tests / verify

- `npm run lint` and `npm run build` pass after M2.
- Manual: `/case-studies/design-system-consumption` readable at mobile width; status callout visible; external links work.
- Manual (M3): Case Studies and Apps visible in header on `/`, `/case-studies/*`, `/apps`; mobile nav includes both; callout on landing links to first case study.

---

## Appendix A — Case study copy (v1)

Port into `lib/case-studies/design-system-consumption.ts`. Eyebrows use mono `</ … >` pattern.

### Meta

- **slug:** `design-system-consumption`
- **title:** Architecture at a crossroads
- **subtitle:** From deliberate bootstrap to a single consumption model
- **lifecycle:** `architecture`
- **lastUpdated:** set at M2 ship date (ISO string)

### Status callout (render prominently)

- **phase label:** Architecture
- **headline:** Evaluation complete — public design-system repo chosen
- **body:** Bootstrap vendoring served its purpose; consolidation into versioned `@nsoto/*` packages is the direction. After scoping two repo-visibility architectures under the same constraints, the choice is a public canonical design-system repo — the private-workshop alternative was viable but costlier to operate. Implementation and repo prep ship separately; this page updates as milestones land.

### Section: Hook

**Eyebrow:** `</ CONTEXT >`

**Heading:** Bootstrap first, consolidate next

**Body:**

nsoto.dev is a portfolio hub built in Next.js. ns-chess is a public Vite app — a hand-built React board with a chess.js rules engine. Both share one visual language: true-black canvas, azure brand accent, monospace headings, terminal voice.

To ship each app quickly on a different stack, I deliberately vendored the full `design-system/` tree into each public repo. That was a conscious bootstrap tactic — shared tokens and components on day one, package infrastructure deferred. Consolidation into a single consumption model was always the next step; this case study documents that transition while the repos still carry the interim copies.

### Section: Problem

**Eyebrow:** `</ AUDIT >`

**Heading:** What the bootstrap phase surfaces

**Body:**

The interim model did its job — both apps launched with a coherent brand and a shared component baseline. As each codebase matured, three gaps clarified why consolidation is the right next move. These are not oversights; they are the expected cost of optimizing for speed first.

**Full-tree vendoring.** Each public app still carries guidelines, ui_kits, component sources, and tooling artifacts — most of it never imported at build time. Acceptable for bootstrap; costly to maintain across repos long term.

**Diverging integration paths.** web-portfolio imports **tokens only** in `globals.css` and hand-ports components into `components/ui/` and `components/landing/`. ns-chess imports `styles.css` and runs design-system `.jsx` through a `@ds` alias and thin wrappers in `src/components/ui/`. Same primitives; different wiring — natural when apps evolve on separate timelines.

**Unpinned snapshots.** The live portfolio `Nav.tsx` shipped responsive mobile nav while vendored `ui_kits/portfolio/Nav.jsx` lagged. Copy in `lib/portfolio-data.ts` moved forward; vendored `data.js` did not. Without version pins, there is no authoritative answer for which design-system revision an app reflects — fine during bootstrap, blocking for a single source of truth.

### Section: Constraints

**Eyebrow:** `</ CONSTRAINTS >`

**Heading:** What the architecture had to satisfy

**Body:** (render as table — see Appendix D)

### Section: Crossroads

**Eyebrow:** `</ OPTIONS >`

**Heading:** Five paths, one requirement

**Body:** Public app repos must support `git clone` → `npm install` → `npm run dev` with **no private registry auth**. That requirement narrows **runtime** distribution — but a second question remained: should the design-system **repo** itself stay private or become a public portfolio artifact? The matrix below covers runtime paths; the evaluation section documents how repo visibility was weighed.

### Section: Evaluation

**Eyebrow:** `</ EVALUATION >`

**Heading:** Two architectures, fully scoped

**Body:** Opens with 3-line executive summary (verdict / what was compared / why public won); Path A and Path B specs; operating-cost table; see `lib/case-studies/design-system-consumption.ts`

### Section: Decision

**Eyebrow:** `</ DIRECTION >`

**Heading:** What ships next

**Body:**

1. Prep canonical repo (scrub `uploads/`, secrets audit, presentable workshop content)
2. Extract and publish `@nsoto/portfolio-tokens` + `@nsoto/portfolio-ui` (CI on tag)
3. Migrate consumers — ns-chess, then web-portfolio; delete vendored trees
4. README cross-links; update this case study per phase

App boundaries unchanged. Migration execution = design-system harvest (product backlog); lifecycle moves to `planned` when phases are scheduled.

### Section: Evidence

**Eyebrow:** `</ REPOS >`

**Heading:** Where to look

**Body:**

- [web-portfolio](https://github.com/nsoto-development/web-portfolio) — Next.js hub; tokens via `globals.css`; manual TSX ports; vendored tree still present pre-migration.
- [ns-chess](https://github.com/nsoto-development/ns-chess) — Vite app; `@ds` wrappers; oxlint `no-restricted-imports`; integration doc at `docs/design/system-integration.md`.
- **design-system** (canonical, currently private) — guidelines, ui_kits, tokens, components; target state is public repo with `packages/portfolio-tokens` and `packages/portfolio-ui` published as `@nsoto/*`.

### Section: Learnings

**Eyebrow:** `</ TAKEAWAYS >`

**Heading:** Principles for consolidation

**Bullets:**

1. **Spec both paths before you choose.** Viable architectures can differ mainly in operational cost — document each fully, then decide what you are willing to maintain.
2. **One repo, many consumers.** Folder vendoring was bootstrap; package consumption is the target. With a public canonical repo, guidelines and ui_kits are showcase assets — not runtime imports in apps.
3. **Public apps need publicly resolvable runtime.** Private-only packages fail the clone-and-run bar unless every reader has registry auth.
4. **Framework adapters belong in apps; primitives belong in packages.** Next.js `"use client"` and `next/image` stay in web-portfolio — not in shared component source.

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
| **description** | Bootstrap vendoring, consolidation options, and the private-vs-public design-system evaluation that led to a public canonical repo with versioned @nsoto packages. |
| **og:title** | Architecture at a crossroads |
| **og:description** | Bootstrap, consolidation, and the evaluation that chose a public design-system repo. |
| **og:url** | `https://nsoto.dev/case-studies/design-system-consumption` |

## Appendix D — Tables (constraints + options matrix)

### Constraints

| Constraint | Implication |
|------------|-------------|
| Consumer repos are public | Anyone can clone apps; dependencies must resolve without private auth |
| Runtime deps publicly reachable | Public `@nsoto/*` on npm — not private registry or submodule-only access |
| DS repo visibility is a product choice | Private workshop vs public portfolio repo — same consumer end state, different showcase depth |
| Next.js ≠ Vite | Shared primitives; framework adapters stay per app |
| Sites are live | Shipped CSS/JS is inspectable; repo privacy does not hide deployed aesthetics |

### Options matrix

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Keep copy-pasting full repo | Fastest path to a shared baseline | Drift across repos; workshop artifacts in public trees | Bootstrap complete — migrate |
| Private npm packages only | Corporate-clean versioning | `npm install` fails for readers without auth | Fails clone-and-run bar |
| Public `@nsoto/portfolio-tokens` + `@nsoto/portfolio-ui` | Versioned; reviewer-friendly; works with public or private DS source | Component source on public npm | Chosen consumption model |
| Committed vendor slice | No registry; works offline in git | Manual sync; weaker fit once DS repo is public | Valid interim only |
| Private monorepo | Simplest internal workflow | Loses separate public app repos | Optional if repo model changes |
| Public design-system repo | Full system showcase; one SSOT; same npm model | Must scrub sensitive files; all workshop content public | Chosen repo model |
