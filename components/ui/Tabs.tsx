"use client";

import React from "react";

type TabItem = {
  label: string;
  value: string;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
};

export function Tabs({ items, value, onChange, style, className }: TabsProps) {
  const rootClass = ["ui-tabs", className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} role="tablist" style={style}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={active ? "ui-tabs__tab ui-tabs__tab--active" : "ui-tabs__tab"}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
