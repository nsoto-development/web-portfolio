import { portfolioData, type CaseStudyIndexEntry } from "@/lib/portfolio-data";

/** Published case studies for index pages and nav discovery. */
export const publishedCaseStudies: CaseStudyIndexEntry[] = portfolioData.caseStudies;

export function getCaseStudyBySlug(slug: string): CaseStudyIndexEntry | undefined {
  return publishedCaseStudies.find((study) => study.slug === slug);
}
