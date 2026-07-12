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
  lastUpdated: string;
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
