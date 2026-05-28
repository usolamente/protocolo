"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardEyebrow, CardTitle } from "@/components/ui/Card";
import { WEEK_PLAN } from "@/lib/data/weekPlan";
import { currentWeekDay, WEEK_LABELS } from "@/lib/utils";
import { useTData } from "@/lib/i18n/useTData";
import type { WeekDay } from "@/lib/types";

const FOCUS_COLOR: Record<string, string> = {
  push: "text-terra-300",
  pull: "text-sage-300",
  calistenia: "text-bone-100",
  potencia: "text-terra-300",
  recuperacion: "text-sage-200",
  "calistenia-avanzada": "text-bone-100",
  descanso: "text-bone-400",
};

export function TodayFocus() {
  const td = useTData();
  const [today, setToday] = useState<WeekDay | null>(null);

  useEffect(() => {
    setToday(currentWeekDay());
  }, []);

  if (!today) {
    return (
      <Card className="mx-5">
        <p className="text-bone-400 text-sm">Cargando…</p>
      </Card>
    );
  }

  const plan = WEEK_PLAN.find((d) => d.day === today);
  if (!plan) return null;

  return (
    <Link
      href="/hipertrofia"
      className="block mx-5 group"
      aria-label={`Ver entrenamiento de ${WEEK_LABELS[today]}`}
    >
      <Card className="group-hover:border-sage-700">
        <div className="flex items-start justify-between mb-3">
          <div>
            <CardEyebrow accent>{td(WEEK_LABELS[today])}</CardEyebrow>
            <CardTitle className="mt-1">{td(plan.focusLabel)}</CardTitle>
          </div>
          <span
            className={`numeral text-5xl ${FOCUS_COLOR[plan.focus] ?? "text-bone-400"}`}
            aria-hidden
          >
            {String(WEEK_PLAN.findIndex((d) => d.day === today) + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="text-sm text-bone-300 leading-relaxed">
          {plan.description}
        </p>

        {plan.sport && (
          <div className="mt-4 pt-4 border-t border-ink-800 flex items-center justify-between">
            <span className="eyebrow text-terra-300">
              {plan.sport.emoji} {td(plan.sport.label)}
            </span>
            <span className="font-mono text-xs tabular text-bone-300">
              {plan.sport.start} – {plan.sport.end}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-xs text-bone-400">
            {plan.exercises.length} ejercicios
          </span>
          <span className="font-mono text-xs text-sage-300 group-hover:translate-x-1 transition-transform">
            Abrir →
          </span>
        </div>
      </Card>
    </Link>
  );
}
