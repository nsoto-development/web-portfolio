import { portfolioData } from "@/lib/portfolio-data";

export function About() {
  const { landing } = portfolioData.about;

  return (
    <section
      id="about"
      className="landing-section"
      style={{
        padding: "var(--space-16) 0",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-2xl)",
            color: "var(--text-primary)",
            margin: "0 0 var(--space-5)",
          }}
        >
          About me
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-md)",
            color: "var(--text-primary)",
            lineHeight: "var(--leading-relaxed)",
            margin: 0,
            opacity: 0.88,
          }}
        >
          {landing}
        </p>
      </div>
    </section>
  );
}
