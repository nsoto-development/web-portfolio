import { portfolioData } from "@/lib/portfolio-data";
import { Tag } from "@/components/ui/Tag";

export function Skills() {
  const { groups } = portfolioData.skills;

  return (
    <section
      id="skills"
      className="landing-section"
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "var(--space-16) var(--space-6)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-2xl)",
          color: "var(--text-primary)",
          margin: "0 0 var(--space-8)",
        }}
      >
        Skills
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--space-8)",
        }}
      >
        {groups.map((g) => (
          <div key={g.label}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-2xs)",
                letterSpacing: "var(--tracking-wide)",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                marginBottom: "var(--space-3)",
              }}
            >
              {g.label}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {g.items.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
