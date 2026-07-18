import { ExperienceList } from "@/components/experience/ExperienceList";
import { portfolioData } from "@/lib/portfolio-data";

const experienceHeading = (
  <h2
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-2xl)",
      color: "var(--text-primary)",
      margin: 0,
    }}
  >
    Experience
  </h2>
);

export function Experience() {
  return (
    <section
      id="work"
      className="landing-section"
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "var(--space-16) var(--space-6)",
      }}
    >
      <ExperienceList jobs={portfolioData.experience} heading={experienceHeading} />
    </section>
  );
}
