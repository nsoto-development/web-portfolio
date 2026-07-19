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
  detail: string;
  stack: string[];
  status: string;
  category: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

/** Landing teaser order: Chess first, Budget second (P0 #5 / M2b). */
export const LANDING_APP_TEASER_IDS = ["chess.nsoto.dev", "budget.nsoto.dev"] as const;

/** Landing experience highlights (M2d) — full list stays on `/experience`. */
export const LANDING_EXPERIENCE_IDS = ["sedgwick", "southeastern"] as const;

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
  ] satisfies CaseStudyIndexEntry[],
  links: {
    github: "https://github.com/nsoto-development",
    linkedin: "https://linkedin.com/in/nsoto-development",
    email: "nsoto.development@gmail.com",
  },
  hero: {
    eyebrow: "</ BUILDING ON NSOTO.DEV >",
    headline: "I modernize legacy systems and keep mission-critical integrations running.",
    sub: "Senior software engineer in Jacksonville, FL — 20 years across C#, JavaScript, and SQL Server. Cloud migrations, enterprise integrations, and the inherited codebases teams still depend on.",
  },
  experienceStub: {
    eyebrow: "</ EXPERIENCE >",
    headline: "Work history",
    sub: "Roles across cloud migrations, enterprise integrations, and data platforms — filter by focus area.",
  },
  experience: [
    {
      id: "sedgwick",
      company: "Sedgwick Repair Solutions",
      role: "Senior IT Application Specialist",
      dates: "Feb 2026 – Current",
      location: "Jacksonville, FL",
      detail:
        "Maintain .NET data ingestion pipelines between XactAnalysis, Cotality, and Salesforce over HTTP/SFTP. Configured a Cursor workspace against legacy Visual SourceSafe repos to preserve system knowledge after the original architect's retirement, and authored a phased VSS-to-Git migration plan.",
      stack: ["C#", ".NET", "Salesforce", "SFTP", "Cursor / AI-assisted dev"],
      status: "Current",
      category: "integration",
    },
    {
      id: "southeastern",
      company: "Southeastern Aluminum Products",
      role: "Systems Software Engineer",
      dates: "Sept 2024 – Aug 2025",
      location: "Jacksonville, FL",
      detail:
        "Led an Azure migration from legacy server hosting — 15–20% lower hosting cost, ~10% better performance. Reverse-engineered Syspro ERP integrations, directed a WordPress redesign, and built ETL processes against the ERP schema.",
      stack: ["Azure", "Syspro ERP", "C#", "VB6", "SQL Server"],
      status: "Cloud",
      category: "cloud",
    },
    {
      id: "caci",
      company: "CACI Federal",
      role: "Software Engineer (Remote)",
      dates: "Sept 2022 – Jun 2024",
      location: "Rome, NY",
      detail:
        "Built WebCV, a no/low-code data visualization platform for the Air Force Research Laboratory. Integrated Cytoscape.js for network graph visualization and implemented a custom graph-traversal algorithm; built the ETL back end on Node-RED with custom nodes.",
      stack: ["JavaScript", "Node-RED", "Cytoscape.js", "GIS"],
      status: "Federal",
      category: "data",
    },
    {
      id: "proverde",
      company: "ProVerde Laboratories",
      role: "Lead Application Developer",
      dates: "Nov 2013 – Jul 2019",
      location: "Milford, MA",
      detail:
        "Designed the architecture for ProVerde's centralized cloud platform: an ASP.NET Web API over an in-house MySQL sample-tracking database (Amazon RDS), a customer ordering portal in AngularJS, and integrated BlueSnap, USAePay, FedEx Ship API, and Sage 50.",
      stack: ["ASP.NET", "AngularJS", "MySQL", "AWS RDS"],
      status: "Architecture",
      category: "cloud",
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
      "Senior engineer focused on legacy modernization, cloud migrations, and the integrations operations still run on. I care about systems teams can maintain — and I ship side projects on nsoto.dev to keep building in public.",
    paragraph:
      "I've built centralized cloud platforms, federal data-visualization tools, and the ERP/CRM pipelines that keep operations stable. At Sedgwick I maintain .NET ingestion between XactAnalysis, Cotality, and Salesforce, and configured a Cursor workspace against legacy Visual SourceSafe repos to preserve system knowledge after the original architect retired. Before that I led an Azure migration that cut hosting costs 15–20% and improved performance. I mentor when I can and care about software teams can actually maintain.",
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
    sub: "Live apps on their own domains — open what’s shipping, then see the full catalog.",
    entries: [
      {
        name: "Chess",
        domain: "chess.nsoto.dev",
        status: "Live",
        blurb: "Browser chess with click-to-move and full rules.",
        description:
          "Browser chess with a hand-built board — click-to-move, legal-move highlighting, and full rule logic through a thin chess.js wrapper. Local two-player hot-seat on one screen; Stockfish opponent planned.",
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
        blurb: "This hub — landing, case studies, shared design system.",
        description:
          "This site — Next.js hub for nsoto.dev: landing, case studies, and shared design-system consumption across public apps.",
        href: "https://github.com/nsoto-development/web-portfolio",
      },
      {
        name: "Budget",
        domain: "budget.nsoto.dev",
        status: "Live",
        blurb: "Cash flow scheduler with calendar-accurate projection.",
        description:
          "Cash flow scheduler — recurring income and bills, calendar-accurate projection, and deficit visualization. Framework-agnostic scheduling engine with a SvelteKit UI on @nsoto/portfolio-tokens.",
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
          "Dark-only, code-forward foundations for nsoto.dev — CSS tokens and brand assets plus React primitives, shared by the hub and subdomain apps.",
        href: "https://www.npmjs.com/package/@nsoto/portfolio-tokens",
        links: [
          {
            label: "@nsoto/portfolio-ui",
            href: "https://www.npmjs.com/package/@nsoto/portfolio-ui",
          },
        ],
        repo: "https://github.com/nsoto-development/design-system",
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
