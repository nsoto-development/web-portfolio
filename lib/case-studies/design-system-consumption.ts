import type { CaseStudy } from "./types";

export const designSystemConsumption: CaseStudy = {
  slug: "design-system-consumption",
  title: "Architecture at a crossroads",
  subtitle: "Shared UI across public repos without the copy-paste tax",
  lifecycle: "architecture",
  lastUpdated: "2026-07-12",
  status: {
    phaseLabel: "Architecture",
    headline: "Decision recorded — implementation tracked separately",
    body: "This case study documents the problem, constraints, and options for consuming a design system across multiple public apps. Consumption migration is planned and will be executed in a separate effort; this page will be updated as that work is specified and shipped.",
  },
  sections: [
    {
      id: "hook",
      eyebrow: "</ CONTEXT >",
      heading: "One design system. Three copies.",
      body: `nsoto.dev is a portfolio hub built in Next.js. ns-chess is a public Vite app — a hand-built React board with a chess.js rules engine. Both share one visual language: true-black canvas, azure brand accent, monospace headings, terminal voice.

Both started by copy-pasting an entire \`design-system/\` folder from a canonical repo. That felt fast. It did not scale. I had one source of truth and two stale snapshots — plus drift between what the apps actually run and what the vendored folder claims to be.`,
    },
    {
      id: "problem",
      eyebrow: "</ AUDIT >",
      heading: "Vendoring the whole repo is not consuming it",
      body: `The audit surfaced three structural problems.

**Full-tree copy-paste.** Each public app carried guidelines, ui_kits, component sources, and tooling artifacts — most of it never imported at build time. Dead weight and a second source of truth.

**Two integration models, one brand.** web-portfolio imports **tokens only** in \`globals.css\` and hand-ports components into \`components/ui/\` and \`components/landing/\`. ns-chess imports \`styles.css\` and runs design-system \`.jsx\` through a \`@ds\` alias and thin wrappers in \`src/components/ui/\`. Same primitives; different wiring.

**Silent drift.** The live portfolio \`Nav.tsx\` shipped responsive mobile nav. The vendored \`ui_kits/portfolio/Nav.jsx\` in both app repos did not. Copy in \`lib/portfolio-data.ts\` moved forward; vendored \`data.js\` did not. Nothing pinned a version — no way to answer which design-system commit an app was on.`,
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
      body: "Public app repos must support `git clone` → `npm install` → `npm run dev` with **no private registry auth**. The full design-system repo can stay private; the **runtime dependency** must be publicly resolvable.",
      kind: "options",
    },
    {
      id: "decision",
      eyebrow: "</ DIRECTION >",
      heading: "Private workshop, public runtime",
      body: `**Leading direction:** keep the design-system repo private as the workshop (guidelines, ui_kits, prompts, prototypes). Publish or vendor a **runtime slice** — \`@nsoto/tokens\` and \`@nsoto/ui\` on public npm, or a committed vendor directory — so public apps declare versioned dependencies like any other package.

**Alternative under evaluation:** make the design-system repo public as its own portfolio project; same package consumption model, but guidelines and ui_kits become part of what is showcased.

**App ownership unchanged:** Next.js adapters and landing sections stay in web-portfolio. Game UI stays in ns-chess. Content stays in \`lib/portfolio-data.ts\` — not in the design system.

This is an architecture-phase decision. Migration phases, package setup, and consumer refactors are tracked under design-system harvest (P1 #4).`,
    },
    {
      id: "evidence",
      eyebrow: "</ REPOS >",
      heading: "Where to look",
      body: `- [web-portfolio](https://github.com/nsoto-development/web-portfolio) — Next.js hub; tokens via \`globals.css\`; manual TSX ports.
- [ns-chess](https://github.com/nsoto-development/ns-chess) — Vite app; \`@ds\` wrappers; oxlint \`no-restricted-imports\`; integration doc at \`docs/design/system-integration.md\`.

ns-chess is further along on consumption discipline. web-portfolio carries more dead vendored weight. Both need to converge on versioned runtime deps — not folder copies.`,
    },
    {
      id: "learnings",
      eyebrow: "</ TAKEAWAYS >",
      heading: "What I would do differently from day one",
      bullets: [
        "**Vendoring a folder ≠ consuming a design system.** Ship tokens and built primitives; keep specs and ui_kits in the workshop repo.",
        "**Public apps need publicly resolvable runtime.** Private-only packages fail the clone-and-run bar unless every reader has registry auth.",
        "**Framework adapters belong in apps; primitives belong in packages.** Next.js `\"use client\"` and `next/image` stay in web-portfolio — not in shared component source.",
      ],
    },
  ],
  constraints: [
    {
      constraint: "`design-system` is private",
      implication: "Guidelines, ui_kits, prompts stay in workshop repo",
    },
    {
      constraint: "`web-portfolio` and `ns-chess` are public",
      implication: "Anyone can clone; narrative must be self-contained on site",
    },
    {
      constraint: "Readers must run apps without DS access",
      implication: "Runtime deps: public npm or committed vendor slice — not private registry only",
    },
    {
      constraint: "Next.js ≠ Vite",
      implication: "Shared primitives; framework adapters stay per app",
    },
    {
      constraint: "Sites are live",
      implication: "Shipped CSS/JS is inspectable; private DS protects process, not deployed aesthetic",
    },
  ],
  options: [
    {
      option: "Keep copy-pasting full repo",
      pros: "Zero setup",
      cons: "Guaranteed drift; dead files in public repos",
      verdict: "Retire",
    },
    {
      option: "Private npm packages only",
      pros: "Corporate-clean versioning",
      cons: "`npm install` fails for readers without auth",
      verdict: "Fails clone-and-run bar",
    },
    {
      option: "Public `@nsoto/tokens` + `@nsoto/ui`",
      pros: "Versioned; reviewer-friendly",
      cons: "Component source on public npm",
      verdict: "Leading direction",
    },
    {
      option: "Committed vendor slice",
      pros: "No registry; works offline in git",
      cons: "Manual sync until packages exist",
      verdict: "Valid interim",
    },
    {
      option: "Private monorepo",
      pros: "Simplest internal workflow",
      cons: "Loses separate public app repos",
      verdict: "Optional if repo model changes",
    },
    {
      option: "Public design-system repo",
      pros: "Full system showcase; same npm model",
      cons: "All workshop content public",
      verdict: "Alternative under evaluation",
    },
  ],
};
