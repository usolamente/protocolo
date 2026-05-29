"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MORNING_PHASES } from "@/lib/data/morningRoutine";
import { getDayPlan } from "@/lib/data/weekPlan";
import { cn, currentWeekDay } from "@/lib/utils";
import { useT } from "@/lib/i18n/useT";
import { useTData } from "@/lib/i18n/useTData";

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
  const td = useTData();
  const t = useT();
  const todayPlan = getDayPlan(currentWeekDay());
  const todayKind = todayPlan?.loadKind ?? "rest";
  const [nowMin, setNowMin] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNowMin(currentMinutes());
    const id = setInterval(() => setNowMin(currentMinutes()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-5 py-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-end justify-between mb-5 text-left"
        aria-expanded={open}
      >
        <div>
          <p className="eyebrow text-bone-300">Ventana matutina</p>
          <p className="font-display italic text-3xl text-bone-50 leading-none mt-1">
            6:50
          </p>
        </div>
        <span className="flex items-center gap-2">
          <p className="text-xs text-bone-400 font-mono">
            {nowMin !== null
              ? `${String(Math.floor(nowMin / 60)).padStart(2, "0")}:${String(nowMin % 60).padStart(2, "0")}`
              : "—"}
          </p>
          <svg
            viewBox="0 0 24 24"
            className={cn(
              "w-5 h-5 text-bone-400 transition-transform",
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
        </span>
      </button>

      {open && (
      <ol className="relative animate-fade-up">
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
                {td(phase.label)}
              </h3>
              <p className="text-xs text-bone-300 mt-1 leading-relaxed">
                {td(phase.detail)}
              </p>
              {phase.kind === "lift" && (
                <TrainingCTA kind={todayKind} t={t} />
              )}
            </li>
          );
        })}
      </ol>
      )}
    </div>
  );
}

function TrainingCTA({
  kind,
  t,
}: {
  kind: "weights" | "spartan" | "rest";
  t: (k: string) => string;
}) {
  // Selector libre: el usuario elige Pesas o Spartan, sin memoria.
  // `kind` es solo una SUGERENCIA visual basada en el plan del día:
  // el botón sugerido se muestra con su acento; el otro queda atenuado.
  const suggestWeights = kind === "weights";
  const suggestSpartan = kind === "spartan";

  return (
    <div className="mt-3 flex items-center gap-2">
      <Link
        href="/entreno?section=weights"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors",
          suggestWeights
            ? "border-sage-300/60 bg-sage-900/30 text-sage-200"
            : "border-ink-700 text-bone-300 hover:border-sage-300/40 hover:text-sage-300",
        )}
      >
        <span className="font-mono text-[11px] tracking-wide">
          {t("training.weightsSection")}
        </span>
        {suggestWeights && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-sage-300/70">
            ·
          </span>
        )}
      </Link>
      <Link
        href="/entreno?section=spartan"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors",
          suggestSpartan
            ? "border-terra-300/60 bg-terra-300/15 text-terra-200"
            : "border-ink-700 text-bone-300 hover:border-terra-300/40 hover:text-terra-300",
        )}
      >
        <span className="font-mono text-[11px] tracking-wide">
          {t("training.spartanSection")}
        </span>
        {suggestSpartan && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-terra-300/70">
            ·
          </span>
        )}
      </Link>
    </div>
  );
}
