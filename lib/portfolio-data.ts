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
  description?: string;
  href?: string;
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

export const portfolioData = {
  name: "Nelson Soto",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Apps", href: "/apps" },
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
    eyebrow: "</ APPS COMING SOON. STAY TUNED >",
    headline: "I modernize legacy systems and keep mission-critical integrations running.",
    sub: "Senior software engineer in Jacksonville, FL — 20 years across C#, JavaScript, and SQL Server. Cloud migrations, enterprise integrations, and the inherited codebases teams still depend on.",
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
    sub: "Each app ships on its own domain and stack. Open what's live — more are on the way.",
    entries: [
      {
        name: "Chess",
        domain: "chess.nsoto.dev",
        status: "Live",
        description:
          "Browser chess with a hand-built board — click-to-move, legal-move highlighting, and full rule logic through a thin chess.js wrapper. Local two-player hot-seat on one screen; Stockfish opponent planned.",
        href: "https://chess.nsoto.dev",
        repo: "https://github.com/nsoto-development/ns-chess",
      },
      {
        name: "Portfolio",
        domain: "github.com/nsoto-development/web-portfolio",
        status: "Live",
        description:
          "This site — Next.js hub for nsoto.dev: landing, case studies, and shared design-system consumption across public apps.",
        href: "https://github.com/nsoto-development/web-portfolio",
      },
      { name: "Budget", domain: "budget.nsoto.dev", status: "Coming soon" },
    ] satisfies AppsStubEntry[],
  },
  // Future hook: live apps list for M2b Apps hub section
  apps: [] as { name: string; href: string; status: string }[],
};
