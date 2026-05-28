"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { SpartanRunner } from "@/components/spartan/SpartanRunner";
import { ExerciseDetailModal } from "@/components/spartan/ExerciseDetailModal";
import { SPARTAN_CIRCUIT, SPARTAN_LEVELS } from "@/lib/data/spartanCircuit";
import { useT } from "@/lib/i18n/useT";
import { useTData } from "@/lib/i18n/useTData";
import type { SpartanLevel } from "@/lib/types";
import { cn, num } from "@/lib/utils";

export function SpartanSection() {
  const t = useT();
  const td = useTData();
  const [level, setLevel] = useState<SpartanLevel>(2);
  const [running, setRunning] = useState(false);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);

  const detail =
    detailIndex !== null ? SPARTAN_CIRCUIT[detailIndex] ?? null : null;

  return (
    <>
      <div className="space-y-5">
        {!running && (
          <>
            {/* Selector de nivel */}
            <Card>
              <p className="eyebrow text-bone-300 mb-3">
                {t("spartan.intensity")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {([1, 2, 3] as SpartanLevel[]).map((lv) => {
                  const c = SPARTAN_LEVELS[lv];
                  const active = lv === level;
                  return (
                    <button
                      key={lv}
                      onClick={() => setLevel(lv)}
                      className={cn(
                        "py-3 rounded-lg border transition-all",
                        active
                          ? "border-terra-300 bg-terra-300/10 text-bone-50"
                          : "border-ink-700 bg-transparent text-bone-300 hover:border-ink-600",
                      )}
                    >
                      <p className="numeral text-2xl tabular">{c.sets}</p>
                      <p className="font-mono text-[10px] tracking-widest uppercase mt-1">
                        {t("common.rounds")}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-bone-400 mt-3 leading-relaxed">
                {SPARTAN_LEVELS[level].note}
              </p>
            </Card>

            {/* Vista previa de los 15 ejercicios — tappable */}
            <Card>
              <p className="eyebrow text-bone-300 mb-4">
                {t("spartan.sequence")}
              </p>
              <ol className="grid grid-cols-1 gap-2">
                {SPARTAN_CIRCUIT.map((ex, i) => (
                  <li key={ex.index}>
                    <button
                      onClick={() => setDetailIndex(i)}
                      className="w-full flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-ink-850 transition-colors text-left group"
                    >
                      <span className="shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-[#f4f1ea] border border-ink-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ex.image}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="numeral text-sm text-bone-400 tabular w-5">
                        {num(ex.index)}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-bone-100 truncate">
                          {td(ex.nameEs)}
                        </span>
                        <span className="block text-[11px] text-bone-400 truncate">
                          {ex.reps} reps · {ex.duration}s
                        </span>
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-bone-400 group-hover:text-terra-300 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ol>
            </Card>

            <button
              onClick={() => setRunning(true)}
              className="btn btn-energy w-full"
            >
              {t("spartan.startCircuit")} · {SPARTAN_LEVELS[level].label}
            </button>
          </>
        )}

        {running && (
          <Card>
            <SpartanRunner level={level} />
            <div className="mt-6 pt-4 border-t border-ink-800 flex justify-center">
              <button
                onClick={() => {
                  if (confirm(t("spartan.exitConfirm"))) {
                    setRunning(false);
                  }
                }}
                className="btn btn-ghost text-[10px]"
              >
                {t("common.exit")}
              </button>
            </div>
          </Card>
        )}
      </div>

      <ExerciseDetailModal
        exercise={detail}
        onClose={() => setDetailIndex(null)}
        onPrev={
          detailIndex !== null && detailIndex > 0
            ? () => setDetailIndex(detailIndex - 1)
            : undefined
        }
        onNext={
          detailIndex !== null && detailIndex < SPARTAN_CIRCUIT.length - 1
            ? () => setDetailIndex(detailIndex + 1)
            : undefined
        }
      />
    </>
  );
}
