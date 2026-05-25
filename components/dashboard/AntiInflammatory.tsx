"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import {
  ANTIINFLAMMATORY_PRINCIPLES,
  ANTIINFLAMMATORY_INTRO,
} from "@/lib/data/antiInflammatory";
import { useProtocolStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AntiInflammatory() {
  const [open, setOpen] = useState(false);
  const verbose = useProtocolStore((s) => s.config.verbosity === "verbose");

  return (
    <section className="px-5 py-2">
      <Card className="p-4 border-terra-300/30 bg-terra-300/5">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-3 text-left"
          aria-expanded={open}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-1.5 w-1.5 rounded-full bg-terra-300" aria-hidden />
            <p className="font-mono text-[10px] tracking-widest uppercase text-terra-300">
              Enfoque antiinflamatorio
            </p>
          </div>
          <svg
            viewBox="0 0 24 24"
            className={cn(
              "w-4 h-4 text-bone-400 transition-transform shrink-0",
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

        {verbose && !open && (
          <p className="text-[12px] text-bone-300 leading-snug mt-2">
            {ANTIINFLAMMATORY_INTRO}
          </p>
        )}

        {open && (
          <div className="mt-3 space-y-3 animate-fade-up">
            <p className="text-[12px] text-bone-200 leading-relaxed">
              {ANTIINFLAMMATORY_INTRO}
            </p>
            <ul className="space-y-2.5">
              {ANTIINFLAMMATORY_PRINCIPLES.map((p) => (
                <li key={p.title}>
                  <p className="text-sm text-bone-100 font-medium">{p.title}</p>
                  <p className="text-[12px] text-bone-300 leading-snug mt-0.5">
                    {p.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-bone-400 italic leading-relaxed">
              Principios orientativos basados en nutrición deportiva
              antiinflamatoria; ajústalos con un dietista si tienes condiciones
              específicas.
            </p>
          </div>
        )}
      </Card>
    </section>
  );
}
