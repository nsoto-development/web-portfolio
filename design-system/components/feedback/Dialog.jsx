import React from "react";

/**
 * Dialog — centered modal for project detail / confirmations.
 * Dims backdrop with blur, panel slides up + fades in.
 */
export function Dialog({ open, onClose, title, children, footer }) {
  const titleId = React.useId();
  const panelRef = React.useRef(null);
  const previousFocusRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement;
    const panel = panelRef.current;
    const focusable = panel?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const nodes = panel.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusables = Array.from(nodes).filter((el) => !el.disabled);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === "function") {
        previous.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(var(--blur-panel))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        animation: "dcFadeIn var(--duration-base) var(--ease-out)",
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(480px, 90vw)",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          animation: "dcSlideUp var(--duration-base) var(--ease-out)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--space-5) var(--space-6)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span
            id={titleId}
            style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-md)", color: "var(--text-primary)" }}
          >
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-tertiary)",
              cursor: "pointer",
              fontSize: "var(--text-lg)",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: "var(--space-6)", color: "var(--text-secondary)", fontSize: "var(--text-sm)" }}>
          {children}
        </div>
        {footer && (
          <div
            style={{
              padding: "var(--space-4) var(--space-6)",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-3)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
      <style>{`
        @keyframes dcFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes dcSlideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
