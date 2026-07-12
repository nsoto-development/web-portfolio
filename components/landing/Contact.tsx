"use client";

import { useState } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section
      id="contact"
      className="landing-contact"
      style={{
        maxWidth: "var(--content-narrow)",
        margin: "0 auto",
        padding: "var(--space-16) var(--space-6) var(--space-24)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-2xl)",
          color: "var(--text-primary)",
          margin: "0 0 var(--space-3)",
        }}
      >
        Get in touch
      </h2>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--text-tertiary)",
          margin: "0 0 var(--space-8)",
        }}
      >
        Have a project in mind, or just want to say hi? I read everything myself — or reach me
        directly at{" "}
        <a href={`mailto:${portfolioData.links.email}`}>{portfolioData.links.email}</a>.
      </p>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <div className="landing-contact-fields">
          <Input
            label="Name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@domain.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <Textarea
          label="Message"
          rows={5}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <div>
          <Button type="submit" variant="primary">
            Send message
          </Button>
        </div>
      </form>
      <div className="landing-safe-bottom" style={{ position: "fixed", zIndex: 60 }}>
        {sent && (
          <Toast
            tone="success"
            title="Message sent"
            message="I'll get back to you within 24h."
            onDismiss={() => setSent(false)}
          />
        )}
      </div>
    </section>
  );
}
