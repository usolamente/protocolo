"use client";

import { useState, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function Collapsible({
  title,
  subtitle,
  numeral,
  defaultOpen = false,
  badge,
  children,
  accent = "bone",
}: {
  title: string;
  subtitle?: string;
  numeral?: string;
  defaultOpen?: boolean;
  badge?: ReactNode;
  children: ReactNode;
  accent?: "bone" | "sage";
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card as="article" className="relative !p-0 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-5 text-left"
      >
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "eyebrow",
              accent === "sage" ? "text-sage-300" : "text-bone-300",
            )}
          >
            {title}
          </p>
          {subtitle && (
            <h2 className="font-display text-xl font-light text-bone-50 mt-1 leading-tight">
              {subtitle}
            </h2>
          )}
          {badge}
        </div>
        {numeral && (
          <span className="numeral text-3xl text-ink-700 shrink-0" aria-hidden>
            {numeral}
          </span>
        )}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "w-5 h-5 text-bone-400 transition-transform shrink-0",
            open && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 -mt-1 animate-fade-up">{children}</div>
      )}
    </Card>
  );
}
