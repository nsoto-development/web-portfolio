"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/Button";
import { FadeIn, HoverLift } from "@/components/landing/motion";

export function Hero() {
  const { name } = portfolioData;
  const { eyebrow, headline, sub } = portfolioData.hero;

  return (
    <section
      id="top"
      className="landing-hero"
      style={{
        position: "relative",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "var(--space-24) var(--space-6) var(--space-20)",
      }}
    >
      <FadeIn delay={0} className="landing-hero-mark">
        <Image
          src="/logo/nsoto-mark-cyan.png"
          alt=""
          width={120}
          height={120}
          priority
          style={{
            width: "100%",
            height: "auto",
            filter: "drop-shadow(0 0 32px rgba(10, 158, 250, 0.25))",
          }}
        />
      </FadeIn>
      <FadeIn delay={0.08}>
        <div
          className="landing-hero-eyebrow"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-widest)",
            backgroundImage: "linear-gradient(90deg, var(--cyan-300) 0%, var(--violet-400) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            marginBottom: "var(--space-6)",
          }}
        >
          {eyebrow}
        </div>
      </FadeIn>
      <FadeIn delay={0.16}>
        <h1
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-5xl)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-primary)",
            maxWidth: "820px",
            margin: "0 0 var(--space-4)",
          }}
        >
          {name}
        </h1>
      </FadeIn>
      <FadeIn delay={0.24}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-3xl)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-primary)",
            maxWidth: "820px",
            margin: "0 0 var(--space-6)",
          }}
        >
          {headline}
          <span className="dc-cursor" style={{ color: "var(--brand)" }}>
            _
          </span>
        </p>
      </FadeIn>
      <FadeIn delay={0.32}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-md)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            lineHeight: "var(--leading-relaxed)",
            margin: "0 0 var(--space-10)",
          }}
        >
          {sub}
        </p>
      </FadeIn>
      <FadeIn delay={0.4} className="landing-hero-ctas">
        <HoverLift style={{ display: "inline-flex" }}>
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowUpRight size={16} />}
            iconPosition="right"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            View work
          </Button>
        </HoverLift>
        <HoverLift style={{ display: "inline-flex" }}>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get in touch
          </Button>
        </HoverLift>
      </FadeIn>
    </section>
  );
}
