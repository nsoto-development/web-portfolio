import type { CaseStudy } from "./types";

export const designSystemConsumption: CaseStudy = {
  slug: "design-system-consumption",
  title: "Architecture at a crossroads",
  subtitle: "From deliberate bootstrap to a single consumption model",
  lifecycle: "architecture",
  lastUpdated: "2026-07-12",
  status: {
    phaseLabel: "Architecture",
    headline: "Evaluation complete — public design-system repo chosen",
    body: "Bootstrap vendoring served its purpose; consolidation into versioned `@nsoto/*` packages is the direction. After scoping two repo-visibility architectures under the same constraints, the choice is a public canonical design-system repo — the private-workshop alternative was viable but costlier to operate. Implementation and repo prep ship separately; this page updates as milestones land.",
  },
  sections: [
    {
      id: "hook",
      eyebrow: "</ CONTEXT >",
      heading: "Bootstrap first, consolidate next",
      body: `nsoto.dev is a portfolio hub built in Next.js. ns-chess is a public Vite app — a hand-built React board with a chess.js rules engine. Both share one visual language: true-black canvas, azure brand accent, monospace headings, terminal voice.

To ship each app quickly on a different stack, I deliberately vendored the full \`design-system/\` tree into each public repo. That was a conscious bootstrap tactic — shared tokens and components on day one, package infrastructure deferred. Consolidation into a single consumption model was always the next step; this case study documents that transition while the repos still carry the interim copies.`,
    },
    {
      id: "problem",
      eyebrow: "</ AUDIT >",
      heading: "What the bootstrap phase surfaces",
      body: `The interim model did its job — both apps launched with a coherent brand and a shared component baseline. As each codebase matured, three gaps clarified why consolidation is the right next move. These are not oversights; they are the expected cost of optimizing for speed first.

**Full-tree vendoring.** Each public app still carries guidelines, ui_kits, component sources, and tooling artifacts — most of it never imported at build time. Acceptable for bootstrap; costly to maintain across repos long term.

**Diverging integration paths.** web-portfolio imports **tokens only** in \`globals.css\` and hand-ports components into \`components/ui/\` and \`components/landing/\`. ns-chess imports \`styles.css\` and runs design-system \`.jsx\` through a \`@ds\` alias and thin wrappers in \`src/components/ui/\`. Same primitives; different wiring — natural when apps evolve on separate timelines.

**Unpinned snapshots.** The live portfolio \`Nav.tsx\` shipped responsive mobile nav while vendored \`ui_kits/portfolio/Nav.jsx\` lagged. Copy in \`lib/portfolio-data.ts\` moved forward; vendored \`data.js\` did not. Without version pins, there is no authoritative answer for which design-system revision an app reflects — fine during bootstrap, blocking for a single source of truth.`,
    },
    {
      id: "constraints",
      eyebrow: "</ CONSTRAINTS >",
      heading: "What the architecture had to satisfy",
      kind: "constraints",
    },
    {
      id: "crossroads",
      eyebrow: "</ OPTIONS >",
      heading: "Five paths, one requirement",
      body: "Public app repos must support `git clone` → `npm install` → `npm run dev` with **no private registry auth**. That requirement narrows **runtime** distribution — but a second question remained: should the design-system **repo** itself stay private or become a public portfolio artifact? The matrix below covers runtime paths; the evaluation section documents how repo visibility was weighed.",
      kind: "options",
    },
    {
      id: "evaluation",
      eyebrow: "</ EVALUATION >",
      heading: "Two architectures, fully scoped",
      body: `**Verdict:** public \`design-system\` repo plus public \`@nsoto/*\` packages. The private-workshop path was scoped fully and set aside — viable, but more costly to run in this context.

**What was compared:** two consumption architectures under identical constraints — public apps, clone-and-run without auth, versioned packages, no vendored trees in consumers.

**Why public won:** lower ongoing operational cost and a complete showcase story for a solo portfolio where the design system is part of the work — not because the private path was incomplete.

Two consumption architectures were scoped to the same end state — no vendored \`design-system/\` folders, versioned \`@nsoto/tokens\` and \`@nsoto/ui\`, app-owned product code. Each covers topology, package layout, responsibility splits, day-to-day workflows, migration phases, and an explicit decision summary. Both are viable; the question is which one to **operate** long term as a solo developer.

---

**Path A — Private workshop, public runtime**

*The spec:* keep \`design-system\` **private**. Guidelines, ui_kits, prompts, prototypes, and uploads stay in a workshop repo that reviewers never need to clone. Only a **runtime slice** reaches consumers:

- \`packages/tokens\` → \`@nsoto/tokens\` (CSS variables, \`styles.css\`, logo/favicon assets)
- \`packages/ui\` → \`@nsoto/ui\` (built React primitives + types)

Apps delete vendored trees and declare semver deps. Workshop content is **never** distributed — not in npm packages, not in consumer repos.

Because apps are public and must support \`git clone\` → \`npm install\` → \`npm run dev\` **without auth**, the private path still requires a **publicly reachable runtime**. The spec defines two ways to deliver it:

1. **Public npm (steady state)** — CI in the private repo publishes \`@nsoto/*\` to public npm on tag. Consumers bump versions; Dependabot can automate. Reviewers install packages; they never see ui_kits.
2. **Committed vendor slice (interim)** — a \`sync-runtime.mjs\` script copies built tokens/ui into each app repo per **sync profile** (\`portfolio\` vs \`chess\` copy different slices). You commit \`.ds-version\` and vendor dirs in **both** \`web-portfolio\` and \`ns-chess\` manually until npm publish exists.

The private spec also documents: Next.js adapter pattern in web-portfolio; oxlint boundaries in ns-chess; a four-phase migration (tokens → UI package → app cleanup → polish); an optional private monorepo escape hatch; and an honest privacy boundary — live sites expose shipped CSS/JS regardless of repo visibility.

*What you gain:* process privacy (drafts, prompts, resume uploads, experiments stay private); a smaller public footprint; a shape familiar from corporate internal design systems.

*What you pay:* **ongoing operational complexity** — detailed below.

---

**Path B — Public portfolio repo, same packages**

*The spec:* make \`design-system\` **public** — a portfolio project and library source in one repo. Consumption model is the same at the package layer: publish \`@nsoto/tokens\` and \`@nsoto/ui\` to public npm (or pin via public git tag + path deps). Consumers look identical to Path A.

The difference is visibility. Guidelines specimen cards, ui_kit prototypes (\`portfolio/\`, \`app-hub/\`), component source, README philosophy, and optional Storybook or GitHub Pages become **part of what is demonstrated**. Reviewers evaluating apps clone \`web-portfolio\` or \`ns-chess\`; reviewers evaluating systems craft clone \`design-system\` directly. No auth, no submodules, no split narrative.

The public spec includes: pre-publish scrub checklist (\`uploads/\` resume PDF, secrets audit, draft cleanup); the same consumer folder layouts and responsibility split; a migration plan (Phase 0 visibility prep → package structure → per-app cutover → README cross-links); and a side-by-side decision table against the private path.

*What you gain:* one source of truth; showcase depth; simpler day-to-day (merge → publish → bump — no sync scripts); alignment with how public design systems are consumed.

*What you pay:* a **one-time** scrub before flip visibility; accepting that workshop content is presentable (or editing it to be).

---

**Operating cost — why private wasn't worth it**

Both paths satisfy every hard constraint. Neither is "wrong." The private path simply costs more to **run** for this setup:

| Operational concern | Private workshop | Public portfolio repo |
|---|---|---|
| Distribution machinery | Two documented paths (public npm **or** per-app vendor sync + profiles) | One path: publish from public repo |
| Per-release workflow | Merge DS → CI publish **or** run sync script → commit vendor bump in **each** consumer repo | Merge DS → CI publish → bump deps in consumers |
| Sync profiles | \`portfolio\` and \`chess\` copy different runtime slices — script + \`.ds-version\` per app | Not needed — consumers use package versions only |
| Portfolio narrative | Apps only; DS craft is hidden unless you grant access | DS repo is a first-class portfolio entry |
| Reviewer exploring the system | npm packages show components; guidelines/ui_kits require access | Full repo browsable on GitHub |
| Ongoing doc debt | Two-tier story to maintain (workshop vs runtime) | Single story across three public repos |
| Privacy benefit | Real for process/unreleased work | Addressed by scrub + editorial pass — not recurring per release |

The private architecture is **more laborious**: even after npm publish lands, you still maintain a hidden workshop alongside public apps, explain what reviewers can and cannot see, and carry sync-script / vendor-slice documentation for the interim (and as fallback). The privacy upside — keeping prompts and drafts off GitHub — did not outweigh that overhead for a **solo portfolio** where the design system itself is part of the work being shown.

Corporate teams with registry auth, compliance requirements, or a hard mandate to hide specs often choose Path A. That is the right call in that context. Path B wins here on **simplicity of operation** and **completeness of showcase**, not because Path A was incomplete.`,
    },
    {
      id: "decision",
      eyebrow: "</ DIRECTION >",
      heading: "What ships next",
      body: `**1. Prep the canonical repo** — scrub \`uploads/\` and sensitive files; audit for secrets; make workshop content presentable.

**2. Extract and publish packages** — add \`packages/tokens\` and \`packages/ui\`; CI publishes \`@nsoto/tokens\` and \`@nsoto/ui\` to public npm on tag.

**3. Migrate consumers** — ns-chess first (closer to package consumption today), then web-portfolio. Delete vendored \`design-system/\` trees; drop the \`@ds\` alias; declare semver deps.

**4. Wire the portfolio story** — README cross-links across all three public repos; update this case study as each phase lands.

App boundaries stay fixed: Next.js adapters and landing sections in web-portfolio; game UI in ns-chess; copy in \`lib/portfolio-data.ts\`. ui_kits remain design references — ported into app code, not imported at runtime.

Migration execution is tracked as design-system harvest work in the product backlog. This page will move from architecture to planned once phases are scheduled, and again as implementation ships.`,
    },
    {
      id: "evidence",
      eyebrow: "</ REPOS >",
      heading: "Where to look",
      body: `- [web-portfolio](https://github.com/nsoto-development/web-portfolio) — Next.js hub; tokens via \`globals.css\`; manual TSX ports; vendored tree still present pre-migration.
- [ns-chess](https://github.com/nsoto-development/ns-chess) — Vite app; \`@ds\` wrappers; oxlint \`no-restricted-imports\`; integration doc at \`docs/design/system-integration.md\`.
- **design-system** (canonical, currently private) — guidelines, ui_kits, tokens, components; target state is public repo with \`packages/tokens\` and \`packages/ui\` published as \`@nsoto/*\`.

ns-chess moved earlier toward consumption discipline during bootstrap. web-portfolio prioritized tokens-first shipping on Next.js. Both patterns inform the migration target: versioned deps from one public canonical repo, no folder copies in consumers.`,
    },
    {
      id: "learnings",
      eyebrow: "</ TAKEAWAYS >",
      heading: "Principles for consolidation",
      bullets: [
        "**Spec both paths before you choose.** Viable architectures can differ mainly in operational cost — document each fully, then decide what you are willing to maintain.",
        "**One repo, many consumers.** Folder vendoring was bootstrap; package consumption is the target. With a public canonical repo, guidelines and ui_kits are showcase assets — not runtime imports in apps.",
        "**Public apps need publicly resolvable runtime.** Private-only packages fail the clone-and-run bar unless every reader has registry auth.",
        "**Framework adapters belong in apps; primitives belong in packages.** Next.js `\"use client\"` and `next/image` stay in web-portfolio — not in shared component source.",
      ],
    },
  ],
  constraints: [
    {
      constraint: "Consumer repos are public",
      implication: "Anyone can clone apps; dependencies must resolve without private auth",
    },
    {
      constraint: "Runtime deps publicly reachable",
      implication: "Public `@nsoto/*` on npm — not private registry or submodule-only access",
    },
    {
      constraint: "DS repo visibility is a product choice",
      implication: "Private workshop vs public portfolio repo — same consumer end state, different showcase depth",
    },
    {
      constraint: "Next.js ≠ Vite",
      implication: "Shared primitives; framework adapters stay per app",
    },
    {
      constraint: "Sites are live",
      implication: "Shipped CSS/JS is inspectable; repo privacy does not hide deployed aesthetics",
    },
  ],
  options: [
    {
      option: "Keep copy-pasting full repo",
      pros: "Fastest path to a shared baseline",
      cons: "Drift across repos; workshop artifacts in public trees",
      verdict: "Bootstrap complete — migrate",
    },
    {
      option: "Private npm packages only",
      pros: "Corporate-clean versioning",
      cons: "`npm install` fails for readers without auth",
      verdict: "Fails clone-and-run bar",
    },
    {
      option: "Public `@nsoto/tokens` + `@nsoto/ui`",
      pros: "Versioned; reviewer-friendly; works with public or private DS source",
      cons: "Component source on public npm",
      verdict: "Chosen consumption model",
    },
    {
      option: "Committed vendor slice",
      pros: "No registry; works offline in git",
      cons: "Manual sync; weaker fit once DS repo is public",
      verdict: "Valid interim only",
    },
    {
      option: "Private monorepo",
      pros: "Simplest internal workflow",
      cons: "Loses separate public app repos",
      verdict: "Optional if repo model changes",
    },
    {
      option: "Public design-system repo",
      pros: "Full system showcase; one SSOT; same npm model",
      cons: "Must scrub sensitive files; all workshop content public",
      verdict: "Chosen repo model",
    },
  ],
};
