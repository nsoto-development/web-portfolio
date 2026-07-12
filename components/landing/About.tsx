import Image from "next/image";
import { portfolioData } from "@/lib/portfolio-data";

export function About() {
  const { paragraph } = portfolioData.about;

  return (
    <section
      id="about"
      className="landing-section"
      style={{
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "var(--space-16) var(--space-6)",
      }}
    >
      <div className="landing-about-grid">
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: "50%",
            border: "2px solid var(--brand)",
            boxShadow: "var(--glow-brand-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "var(--gradient-brand-subtle)",
          }}
        >
          <Image
            src="/logo/nsoto-mark-cyan.png"
            alt=""
            width={69}
            height={69}
            style={{ width: "62%", height: "auto" }}
          />
        </div>
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
              color: "var(--text-secondary)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "640px",
              margin: 0,
            }}
          >
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
