"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useProtocolStore } from "@/lib/store";
import { useT } from "@/lib/i18n/useT";

const MODULES = [
  { href: "/entreno", nameKey: "nav.training", color: "text-bone-100", descKey: "howItWorks.training" },
  { href: "/reto", nameKey: "nav.challenge", color: "text-sage-300", descKey: "howItWorks.challenge" },
  { href: "/bienestar", nameKey: "nav.care", color: "text-sage-200", descKey: "howItWorks.care" },
];

export function HowItWorks() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const verbosity = useProtocolStore((s) => s.config.verbosity);
  if (verbosity === "synthetic") return null;

  return (
    <section className="px-5 py-2">
      <Card className="p-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between text-left"
          aria-expanded={open}
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-300" aria-hidden />
            <p className="font-mono text-[10px] tracking-widest uppercase text-sage-300">
              {t("howItWorks.title")}
            </p>
          </div>
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 text-bone-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
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
          <div className="mt-3 space-y-3 animate-fade-up">
            <p className="text-[13px] text-bone-300 leading-relaxed">
              {t("howItWorks.intro")}
            </p>
            <ul className="space-y-2.5">
              {MODULES.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="block rounded-xl border border-ink-800 bg-ink-850 px-3 py-2.5 hover:border-ink-700 transition-colors"
                  >
                    <p
                      className={`font-mono text-[11px] tracking-widest uppercase ${m.color}`}
                    >
                      {t(m.nameKey)}
                    </p>
                    <p className="text-[12px] text-bone-300 leading-snug mt-1">
                      {t(m.descKey)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </section>
  );
}
