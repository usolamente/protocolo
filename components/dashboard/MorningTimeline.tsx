"use client";

import { useEffect, useState } from "react";
import { MORNING_PHASES } from "@/lib/data/morningRoutine";
import { cn } from "@/lib/utils";

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function currentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

const KIND_BADGE: Record<string, string> = {
  neuro: "Mente",
  yoga: "Cuerpo",
  transit: "Tránsito",
  lift: "Carga",
  transition: "Vagal",
  sauna: "Calor",
  pool: "Agua",
};

export function MorningTimeline() {
  const [nowMin, setNowMin] = useState<number | null>(null);

  useEffect(() => {
    setNowMin(currentMinutes());
    const id = setInterval(() => setNowMin(currentMinutes()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-5 py-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="eyebrow text-bone-300">Ventana matutina</p>
          <p className="font-display italic text-3xl text-bone-50 leading-none mt-1">
            06:50 <span className="text-bone-400">—</span> 08:30
          </p>
        </div>
        <p className="text-xs text-bone-400 font-mono">
          {nowMin !== null
            ? `${String(Math.floor(nowMin / 60)).padStart(2, "0")}:${String(nowMin % 60).padStart(2, "0")}`
            : "—"}
        </p>
      </div>

      <ol className="relative">
        {/* Línea vertical */}
        <span
          className="absolute left-[26px] top-0 bottom-0 w-px bg-ink-700"
          aria-hidden
        />
        {MORNING_PHASES.map((phase, i) => {
          const startMin = timeToMinutes(phase.start);
          const endMin = timeToMinutes(phase.end);
          const isActive =
            nowMin !== null && nowMin >= startMin && nowMin < endMin;
          const isPast = nowMin !== null && nowMin >= endMin;

          return (
            <li key={phase.start} className="relative pl-14 pb-6 last:pb-0">
              <span
                className={cn(
                  "absolute left-[18px] top-1 w-4 h-4 rounded-full border transition-all",
                  isActive
                    ? "bg-sage-300 border-sage-300 ring-4 ring-sage-300/20 animate-pulse-soft"
                    : isPast
                      ? "bg-ink-700 border-ink-700"
                      : "bg-ink-900 border-ink-600",
                )}
                aria-hidden
              />
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "font-mono text-sm tabular tracking-tight",
                    isActive ? "text-sage-300" : "text-bone-200",
                  )}
                >
                  {phase.start}
                </span>
                <span className="text-[10px] font-mono text-bone-400 tracking-widest uppercase">
                  {KIND_BADGE[phase.kind] ?? ""}
                </span>
              </div>
              <h3
                className={cn(
                  "font-display text-xl font-light mt-0.5",
                  isActive ? "text-bone-50" : "text-bone-100",
                )}
              >
                {phase.label}
              </h3>
              <p className="text-xs text-bone-300 mt-1 leading-relaxed">
                {phase.detail}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
