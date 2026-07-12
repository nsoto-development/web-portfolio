"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toast } from "@/components/ui/Toast";

type ToastState = {
  tone: "success" | "danger";
  title: string;
  message?: string;
};

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  function showToast(next: ToastState, autoDismissMs?: number) {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setToast(next);
    if (autoDismissMs) {
      dismissTimer.current = setTimeout(() => setToast(null), autoDismissMs);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      showToast({
        tone: "danger",
        title: "Form unavailable",
        message: "Contact form is not configured. Email me directly instead.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          subject: "New message from nsoto.dev",
          from_name: "nsoto.dev",
          botcheck: "",
        }),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };

      if (data.success) {
        setForm({ name: "", email: "", message: "" });
        showToast(
          {
            tone: "success",
            title: "Message sent",
            message: "I'll get back to you within 24h.",
          },
          3500,
        );
      } else {
        showToast({
          tone: "danger",
          title: "Could not send",
          message: data.message ?? "Something went wrong. Try again or email me directly.",
        });
      }
    } catch {
      showToast({
        tone: "danger",
        title: "Could not send",
        message: "Network error. Try again or email me directly.",
      });
    } finally {
      setSubmitting(false);
    }
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
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
          readOnly
        />
        <div className="landing-contact-fields">
          <Input
            label="Name"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={submitting}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@domain.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            disabled={submitting}
          />
        </div>
        <Textarea
          label="Message"
          name="message"
          rows={5}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          disabled={submitting}
        />
        <div>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </div>
      </form>
      <div className="landing-safe-bottom" style={{ position: "fixed", zIndex: 60 }}>
        {toast && (
          <Toast
            tone={toast.tone}
            title={toast.title}
            message={toast.message}
            onDismiss={() => setToast(null)}
          />
        )}
      </div>
    </section>
  );
}
