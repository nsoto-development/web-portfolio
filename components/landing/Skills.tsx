import { portfolioData } from "@/lib/portfolio-data";
import { Tag } from "@/components/ui/Tag";

export function Skills() {
  const { landing } = portfolioData.skills;

  return (
    <section
      id="skills"
      className="landing-section landing-skills-compact"
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "0 var(--space-6) var(--space-16)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-lg)",
          color: "var(--text-primary)",
          margin: "0 0 var(--space-4)",
        }}
      >
        Skills
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {landing.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </section>
  );
}
