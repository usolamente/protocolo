"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ModuleRole } from "@/components/layout/ModuleRole";
import { ExerciseLogger } from "@/components/hypertrophy/ExerciseLogger";
import { StrengthHistory } from "@/components/hypertrophy/StrengthHistory";
import { WEEK_PLAN, getDayPlan } from "@/lib/data/weekPlan";
import {
  cn,
  currentWeekDay,
  WEEK_LABELS,
  WEEK_SHORT,
} from "@/lib/utils";
import type { WeekDay } from "@/lib/types";
import { useTData } from "@/lib/i18n/useTData";

export default function HipertrofiaPage() {
  const td = useTData();
  const [selected, setSelected] = useState<WeekDay>("lunes");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSelected(currentWeekDay());
  }, []);

  const plan = getDayPlan(selected);
  if (!plan) return null;

  return (
    <>
      <PageHeader
        eyebrowKey="weights.eyebrow"
        titleKey="weights.title"
        subtitleKey="weights.subtitle"
        numeral="5×5"
      />

      <div className="px-5 py-6 space-y-5">
        <ModuleRole
          accent="sage"
          roleKey="weights.role"
          textKey="weights.roleText"
        />

        {/* Selector de día */}
        <div className="grid grid-cols-7 gap-1.5">
          {WEEK_PLAN.map((d) => {
            const isToday = mounted && currentWeekDay() === d.day;
            const isSelected = selected === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelected(d.day)}
                className={cn(
                  "py-3 rounded-sm border transition-colors",
                  isSelected
                    ? "border-sage-300 bg-sage-900/40 text-bone-50"
                    : "border-ink-800 bg-ink-900/40 text-bone-300 hover:border-ink-600",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-widest block",
                    isToday && !isSelected && "text-sage-300",
                  )}
                >
                  {WEEK_SHORT[d.day]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cabecera del día */}
        <Card>
          <p className="eyebrow text-sage-300">{td(WEEK_LABELS[plan.day])}</p>
          <h2 className="font-display text-2xl font-light text-bone-50 mt-1 leading-tight">
            {td(plan.focusLabel)}
          </h2>
          <p className="text-sm text-bone-300 mt-2 leading-relaxed">
            {plan.description}
          </p>
        </Card>

        {/* Ejercicios */}
        <div className="space-y-3">
          {plan.exercises.map((ex, i) => (
            <ExerciseLogger
              key={ex.id}
              exercise={ex}
              day={plan.day}
              ordinal={i + 1}
              groupKeys={plan.exercises.map((e) => `pesas:${e.id}`)}
            />
          ))}
        </div>

        <StrengthHistory />
      </div>
    </>
  );
}
