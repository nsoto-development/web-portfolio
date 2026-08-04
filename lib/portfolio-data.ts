export type NavItem = {
  label: string;
  href: string;
};

export type CaseStudyIndexEntry = {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  lifecycle: "architecture" | "planned" | "in-progress" | "implemented";
  updatedAt?: string;
};

export type AppsStubEntry = {
  name: string;
  domain: string;
  status: string;
  /** Full copy for `/apps` cards. */
  description?: string;
  /** One-line copy for the landing Apps teaser (M2b). Falls back to description when omitted. */
  blurb?: string;
  /** Static preview for landing teaser cards (`public/apps/…`). */
  preview?: { src: string; alt: string; width: number; height: number };
  href?: string;
  /** Extra outbound links shown beside the primary domain (e.g. sibling npm packages). */
  links?: { label: string; href: string }[];
  repo?: string;
};

export type ExperienceJob = {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  /** Scannable one-liner always visible on the card. */
  detail: string;
  /** Resume highlights shown when expanded on `/experience`. */
  bullets?: string[];
  /** Tech chips on the card; also drives curated `/experience` filters via aliases. */
  stack: string[];
  status: string;
};

/**
 * Recruiter-oriented tech filters for `/experience`.
 * A job matches when any `stack` chip is in that filter's aliases.
 */
export const EXPERIENCE_TECH_FILTERS = [
  { value: "csharp", label: "C#", aliases: ["C#"] },
  { value: "dotnet", label: ".NET", aliases: [".NET", "ASP.NET"] },
  { value: "nodejs", label: "Node.js", aliases: ["Node.js", "Node-RED"] },
  { value: "azure", label: "Azure", aliases: ["Azure"] },
  { value: "aws", label: "AWS", aliases: ["AWS", "AWS RDS"] },
  { value: "sql", label: "SQL", aliases: ["SQL Server", "MySQL", "Access", "Postgres"] },
  { value: "angular", label: "Angular", aliases: ["Angular", "AngularJS"] },
  { value: "salesforce", label: "Salesforce", aliases: ["Salesforce"] },
] as const;

export function experienceFilterItems(jobs: ExperienceJob[]) {
  return [
    { label: "All", value: "all" },
    ...EXPERIENCE_TECH_FILTERS.filter((f) =>
      jobs.some((j) => j.stack.some((s) => (f.aliases as readonly string[]).includes(s))),
    ).map((f) => ({ label: f.label, value: f.value })),
  ];
}

export function jobMatchesExperienceFilter(job: ExperienceJob, filter: string): boolean {
  if (filter === "all") return true;
  const tech = EXPERIENCE_TECH_FILTERS.find((f) => f.value === filter);
  if (!tech) return false;
  return job.stack.some((s) => (tech.aliases as readonly string[]).includes(s));
}

export type SkillGroup = {
  label: string;
  items: string[];
};

/** Landing teaser order: Chess first, Budget second (P0 #5 / M2b). */
export const LANDING_APP_TEASER_IDS = ["chess.nsoto.dev", "budget.nsoto.dev"] as const;

/** Landing experience highlights (M2d) — full list stays on `/experience`. */
export const LANDING_EXPERIENCE_IDS = ["sedgwick", "southeastern", "caci"] as const;

export const portfolioData = {
  name: "Nelson Soto",
  nav: [
    { label: "Apps", href: "/apps" },
    { label: "Work", href: "#work" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
  caseStudies: [
    {
      slug: "design-system-consumption",
      title: "Architecture at a crossroads",
      subtitle: "From deliberate bootstrap to a single consumption model",
      href: "/case-studies/design-system-consumption",
      lifecycle: "architecture",
      updatedAt: "2026-03-01",
    },
    {
      slug: "lgtv-display-wake",
      title: "When the display wakes but the TV does not",
      subtitle: "A real WoL bug, a capture that changed the question, and a purpose-built sync tool",
      href: "/case-studies/lgtv-display-wake",
      lifecycle: "implemented",
      updatedAt: "2026-07-27",
    },
  ] satisfies CaseStudyIndexEntry[],
  links: {
    github: "https://github.com/nsoto-development",
    linkedin: "https://linkedin.com/in/nsoto-development",
    email: "nsoto.development@gmail.com",
  },
  hero: {
    eyebrow: "</ SENIOR SOFTWARE ENGINEER >",
    headline: "I build full-stack systems, integrations, and cloud platforms teams can rely on.",
    sub: "Senior software engineer in Jacksonville, FL — 20 years across C#, JavaScript, and SQL Server. Enterprise integrations, cloud migrations, and products from data pipelines to customer-facing apps.",
  },
  experienceStub: {
    eyebrow: "</ EXPERIENCE >",
    headline: "Work history",
    sub: "Full career history — C#, .NET, Node.js, cloud platforms, and more.",
  },
  experience: [
    {
      id: "sedgwick",
      company: "Sedgwick Repair Solutions",
      role: "Senior IT Application Specialist",
      dates: "Feb 2026 – Current",
      location: "Jacksonville, FL",
      detail:
        "Maintain mission-critical .NET ingestion pipelines between XactAnalysis, Cotality, and Salesforce.",
      bullets: [
        "Maintain .NET data ingestion pipelines between XactAnalysis, Cotality, and Salesforce over HTTP/SFTP for performance and stability.",
        "Maintain client-facing ASP.NET websites and ship feature enhancements.",
        "Configured a Cursor workspace against legacy Visual SourceSafe repos to preserve system knowledge after the original architect retired; authored living engineer-ready context for AI-assisted work across 20+ inherited microservice projects.",
        "Authored a phased VSS-to-Git (Azure DevOps) migration plan now in organizational review; the same workspace accelerates feature work and custom log-parsing workflows.",
      ],
      stack: ["C#", ".NET", "Salesforce", "SFTP", "AI-assisted workflows"],
      status: "Current",
    },
    {
      id: "southeastern",
      company: "Southeastern Aluminum Products",
      role: "Systems Software Engineer",
      dates: "Sept 2024 – Aug 2025",
      location: "Jacksonville, FL",
      detail:
        "Led an Azure migration that cut hosting cost 15–20% and improved performance ~10%.",
      bullets: [
        "Led migration from legacy server hosting to Azure — 15–20% lower hosting cost, ~10% better performance and stability.",
        "Reverse-engineered and maintained Syspro ERP integrations with customer portals, barcode scanning, and legacy .NET (C#), Razor, and VB6 apps.",
        "Directed a company website redesign (Figma wireframes/mockups; WordPress on Docker), mentoring a graphic design intern.",
        "Designed ETL for data imports/exports, pricing updates, and sales reports against Syspro schemas.",
        "Built and maintained SQL Server views, functions, and stored procedures for internal ERP integrations.",
      ],
      stack: ["Azure", "Syspro ERP", "C#", ".NET", "VB6", "SQL Server"],
      status: "Cloud",
    },
    {
      id: "caci",
      company: "CACI Federal",
      role: "Software Engineer (Remote)",
      dates: "Sept 2022 – Jun 2024",
      location: "Rome, NY",
      detail:
        "Built WebCV, a no/low-code data visualization platform for the Air Force Research Laboratory.",
      bullets: [
        "Developed WebCV for AFRL — no/low-code web platform for data visualization and analysis.",
        "Shipped JavaScript UI libraries (tables, charts, 3D graphs, GIS renderers) with a strong UX focus.",
        "Integrated Cytoscape.js for network graph visualization over large relationship datasets.",
        "Implemented a custom graph-traversal algorithm with AFRL path-finding constraints (max iterations, depth, and related limits).",
        "Customized Node-RED as the WebCV ETL back end, including custom nodes for CSV/SQL/Postgres/SPARQL access, transforms, and server-side JavaScript.",
        "Mentored junior developers through a formal mentorship program.",
      ],
      stack: ["JavaScript", "Node.js", "Node-RED", "Cytoscape.js", "GIS"],
      status: "Federal",
    },
    {
      id: "chorotega",
      company: "The Chorotega",
      role: "IT Consulting (Remote)",
      dates: "March 2022 – Aug 2022",
      location: "Boston, MA",
      detail:
        "Supported ProVerde ownership through an acquisition with tech modernization and website work.",
      bullets: [
        "Advised on infrastructure, vendors, and software choices during acquisition-related tech modernization.",
        "Enhanced the company website for online booking and CMS-managed content.",
      ],
      stack: ["CMS", "Web"],
      status: "Consulting",
    },
    {
      id: "career-note",
      company: "Career note",
      role: "Relocation · family priority",
      dates: "Nov 2019 – Mar 2022",
      location: "Massachusetts → Florida",
      detail:
        "Relocated from Massachusetts to Florida and prioritized a family health matter before returning to full-time work.",
      stack: [],
      status: "Note",
    },
    {
      id: "interactive-resources",
      company: "Interactive Resources",
      role: "Software Developer",
      dates: "Sept 2019 – Nov 2019",
      location: "Jacksonville, FL",
      detail:
        "Short-term contract on an Angular project — organization and bug fixes to support parallel development.",
      stack: ["Angular"],
      status: "Contract",
    },
    {
      id: "proverde",
      company: "ProVerde Laboratories",
      role: "Lead Application Developer",
      dates: "Nov 2013 – Jul 2019",
      location: "Milford, MA",
      detail:
        "Led architecture for ProVerde’s centralized cloud platform — API, portals, and payment/shipping integrations.",
      bullets: [
        "Partnered with ownership to define MVP roadmap and overall architecture for the centralized cloud platform.",
        "Built sample tracking on Amazon RDS MySQL with an ASP.NET Web API (C#) for secure operations and integrations.",
        "Shipped an AngularJS customer ordering portal and Razor/jQuery internal tracking against the same API.",
        "Integrated BlueSnap and USAePay payments plus FedEx Ship for automated PDF shipping labels.",
        "Integrated Sage 50 for automated bookkeeping and reconciliation from configured service charge codes.",
        "Owned ongoing operations support across laboratory, sales, and support teams.",
      ],
      stack: ["C#", "ASP.NET", "AngularJS", "MySQL", "AWS RDS"],
      status: "Architecture",
    },
    {
      id: "des-lauriers-municipal",
      company: "Des Lauriers Municipal Solutions",
      role: "Assistant Product Development Manager",
      dates: "Oct 2010 – Nov 2013",
      location: "Franklin, MA",
      detail:
        "Helped run delivery for a five-developer product team — timelines, unblocking, and client requirements.",
      bullets: [
        "Supported the Product Development Manager on timelines, tasking, and resolving delivery bottlenecks.",
        "Assisted managing a team of five developers with quality and schedule accountability.",
        "Mentored teammates on design and troubleshooting blockers.",
        "Worked with clients on requirements spanning technical specs and business needs.",
        "Coordinated with ownership, sales, support, and marketing so features matched expectations and industry trends.",
      ],
      stack: ["Product", "Mentorship", "Client delivery"],
      status: "Leadership",
    },
    {
      id: "des-lauriers-municipal-dev",
      company: "Des Lauriers Municipal Solutions",
      role: "Software Developer",
      dates: "Oct 2008 – Oct 2010",
      location: "Franklin, MA",
      detail:
        "Built and improved product features from customer feedback and industry changes.",
      bullets: [
        "Delivered product enhancements driven by customer feedback and industry shifts.",
        "Collaborated across ownership, sales, and support to keep features aligned with client expectations.",
      ],
      stack: ["Software delivery"],
      status: "Product",
    },
    {
      id: "des-lauriers-associates",
      company: "Des Lauriers & Associates",
      role: "Software Developer / Systems Administrator",
      dates: "Oct 2007 – Oct 2008",
      location: "Franklin, MA",
      detail:
        "Stood up acquired ASC systems and modernized internal tools and the company website.",
      bullets: [
        "Brought legacy ASC systems online in the Des Lauriers production environment during acquisition.",
        "Migrated ASC legacy and customer data into the internal project-management system.",
        "Converted the internal project-management database from Access 2003 to MySQL.",
        "Replaced a VBScript/Access 97 website with ASP.NET 3.5/MySQL.",
      ],
      stack: ["ASP.NET", "MySQL", "Access", "Migration"],
      status: "Migration",
    },
  ] satisfies ExperienceJob[],
  skills: {
    /** Curated chips for the landing funnel (M2d). Full taxonomy remains in `groups`. */
    landing: [
      "C#",
      ".NET",
      "ASP.NET",
      "JavaScript",
      "TypeScript",
      "React",
      "SQL Server",
      "Azure",
      "AWS",
      "Node.js",
      "Salesforce",
      "Docker",
    ],
    groups: [
      {
        label: "Languages / Frameworks",
        items: ["C#", ".NET 8", "ASP.NET", "JavaScript", "Node.js", "React", "Vue / Quasar", "Angular"],
      },
      {
        label: "Databases",
        items: ["SQL Server", "MySQL", "Postgres", "MongoDB", "CosmosDB"],
      },
      {
        label: "Cloud / DevOps",
        items: ["Azure", "AWS", "Google Cloud", "Docker"],
      },
      {
        label: "Integration & Data",
        items: ["Node-RED", "Salesforce", "Cytoscape.js", "Syspro ERP"],
      },
      { label: "GIS", items: ["ESRI ArcGIS Server", "ThinkGeo", "OpenLayers"] },
    ] satisfies SkillGroup[],
  },
  about: {
    /** Short landing copy (M2d). Longer narrative retained as `paragraph` for future reuse. */
    landing:
      "Senior engineer with 20 years in full-stack development, systems integration, and cloud infrastructure. I focus on practical architecture — systems that stay efficient and maintainable.",
    paragraph:
      "I've built centralized cloud platforms, federal data-visualization tools, and ERP/CRM pipelines that keep operations stable. Recent work includes .NET integrations at Sedgwick and an Azure migration that cut hosting costs 15–20% with better performance. I mentor when I can and focus on systems that stay efficient and maintainable.",
    caseStudyCallout: {
      eyebrow: "</ CASE STUDY >",
      title: "Architecture at a crossroads",
      description:
        "How bootstrap vendoring across nsoto.dev and ns-chess led to a scoped evaluation of design-system consumption — and why a public canonical repo won.",
      href: "/case-studies/design-system-consumption",
    },
  },
  appsStub: {
    eyebrow: "</ APPS >",
    headline: "Side projects",
    sub: "Live apps on their own domains — chess, budget, and more.",
    entries: [
      {
        name: "Chess",
        domain: "chess.nsoto.dev",
        status: "Live",
        blurb: "Browser chess with a hand-built board and full rules.",
        description:
          "Browser chess with a hand-built board — drag pieces, legal-move highlighting, and full rule logic through a thin chess.js wrapper. Local two-player hot-seat on one screen.",
        preview: {
          src: "/apps/chess-preview.png",
          alt: "ns-chess board and move panel on a dark canvas",
          width: 1280,
          height: 800,
        },
        href: "https://chess.nsoto.dev",
        repo: "https://github.com/nsoto-development/ns-chess",
      },
      {
        name: "Portfolio",
        domain: "github.com/nsoto-development/web-portfolio",
        status: "Live",
        blurb: "Personal site and hub for nsoto.dev apps.",
        description:
          "The nsoto.dev site — landing, experience, case studies, and shared design-system packages used across public apps.",
        href: "https://github.com/nsoto-development/web-portfolio",
      },
      {
        name: "Budget",
        domain: "budget.nsoto.dev",
        status: "Live",
        blurb: "Cash flow scheduler with calendar-accurate projection.",
        description:
          "Cash flow scheduler — recurring income and bills, calendar-accurate projection, and deficit visualization. Built around a reusable scheduling engine with a SvelteKit UI.",
        preview: {
          src: "/apps/budget-preview.png",
          alt: "ns-budget cash flow scheduler with running balance chart",
          width: 1280,
          height: 800,
        },
        href: "https://budget.nsoto.dev",
        repo: "https://github.com/nsoto-development/ns-budget",
      },
      {
        name: "Design System",
        domain: "@nsoto/portfolio-tokens",
        status: "Live",
        blurb: "Tokens and React primitives for nsoto.dev apps.",
        description:
          "Shared foundations for nsoto.dev — CSS tokens, brand assets, and React primitives used by the hub and subdomain apps.",
        href: "https://www.npmjs.com/package/@nsoto/portfolio-tokens",
        links: [
          {
            label: "@nsoto/portfolio-ui",
            href: "https://www.npmjs.com/package/@nsoto/portfolio-ui",
          },
        ],
        repo: "https://github.com/nsoto-development/design-system",
      },
      {
        name: "LG TV Sync",
        domain: "github.com/nsoto-development/lgtv-display-sync",
        status: "Open source",
        description:
          "Windows/.NET utility that syncs an LG webOS TV’s power to Windows display sleep — built after waking failed under VPN. Open-source investigation and tool; v0.1.0 ships a self-contained service and tray zip.",
        href: "https://github.com/nsoto-development/lgtv-display-sync",
        links: [
          { label: "Case study", href: "/case-studies/lgtv-display-wake" },
          {
            label: "v0.1.0",
            href: "https://github.com/nsoto-development/lgtv-display-sync/releases/tag/v0.1.0",
          },
        ],
      },
    ] satisfies AppsStubEntry[],
  },
};

export function landingAppTeasers(): AppsStubEntry[] {
  const byDomain = new Map(portfolioData.appsStub.entries.map((e) => [e.domain, e]));
  return LANDING_APP_TEASER_IDS.flatMap((domain) => {
    const entry = byDomain.get(domain);
    return entry ? [entry] : [];
  });
}

export function landingExperienceHighlights(): ExperienceJob[] {
  const byId = new Map(portfolioData.experience.map((j) => [j.id, j]));
  return LANDING_EXPERIENCE_IDS.flatMap((id) => {
    const job = byId.get(id);
    return job ? [job] : [];
  });
}
