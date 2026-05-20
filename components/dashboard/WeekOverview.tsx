"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WEEK_PLAN } from "@/lib/data/weekPlan";
import { cn, currentWeekDay, WEEK_SHORT } from "@/lib/utils";
import type { WeekDay } from "@/lib/types";

const FOCUS_DOT: Record<string, string> = {
  push: "bg-terra-300",
  pull: "bg-sage-300",
  calistenia: "bg-bone-200",
  potencia: "bg-terra-400",
  recuperacion: "bg-sage-500",
  "calistenia-avanzada": "bg-bone-300",
  descanso: "bg-ink-700",
};

export function WeekOverview() {
  const [today, setToday] = useState<WeekDay | null>(null);
  useEffect(() => setToday(currentWeekDay()), []);

  return (
    <section className="px-5 py-6">
      <div className="flex items-baseline justify-between mb-4">
        <p className="eyebrow text-bone-300">Microciclo</p>
        <Link
          href="/calendario"
          className="font-mono text-xs text-sage-300 hover:text-sage-200"
        >
          Ver detalle →
        </Link>
      </div>
      <ol className="grid grid-cols-7 gap-1.5">
        {WEEK_PLAN.map((d) => {
          const isToday = today === d.day;
          return (
            <li key={d.day}>
              <Link
                href={`/calendario#${d.day}`}
                className={cn(
                  "flex flex-col items-center gap-1.5 py-3 rounded-sm border transition-colors",
                  isToday
                    ? "border-sage-300 bg-sage-900/30"
                    : "border-ink-800 bg-ink-900/40 hover:border-ink-600",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-widest",
                    isToday ? "text-sage-300" : "text-bone-400",
                  )}
                >
                  {WEEK_SHORT[d.day]}
                </span>
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    FOCUS_DOT[d.focus] ?? "bg-bone-400",
                  )}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
