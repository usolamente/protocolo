"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ActivitySelector } from "@/components/dashboard/ActivitySelector";
import {
  PRE_WORKOUT,
  POST_WORKOUT,
  getWeekDiet,
  getActivityFuel,
  WEEK_VARIANT_LABELS,
  weekOfMonthIndex,
  DIET_DISCLAIMER,
} from "@/lib/data/diet";
import { currentWeekDay, toISODate } from "@/lib/utils";
import { useProtocolStore } from "@/lib/store";
import type { Meal, WeekDay } from "@/lib/types";

export function DietToday() {
  const [today, setToday] = useState<WeekDay | null>(null);
  const [iso, setIso] = useState<string>("");
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    const now = new Date();
    setToday(currentWeekDay(now));
    setIso(toISODate(now));
    setVariant(weekOfMonthIndex(now));
  }, []);

  const activity = useProtocolStore((s) => (iso ? s.activities[iso] : "none"));

  if (!today || !iso) {
    return (
      <Card className="mx-5">
        <p className="text-bone-400 text-sm">Cargando dieta…</p>
      </Card>
    );
  }

  const meals: Meal[] = [PRE_WORKOUT, POST_WORKOUT, ...getWeekDiet()[today]];
  const fuel = getActivityFuel(activity ?? "none");

  return (
    <section className="px-5 py-2">
      <div className="flex items-baseline justify-between mb-1">
        <p className="eyebrow text-bone-300">Dieta de hoy · 5 comidas + batidos</p>
        <span className="font-mono text-[10px] text-bone-400">
          {meals.length} tomas
        </span>
      </div>
      <p className="font-mono text-[10px] tracking-widest uppercase text-sage-300 mb-3">
        {WEEK_VARIANT_LABELS[variant]}
      </p>

      {/* Selector de actividad del día */}
      <Card className="p-4 mb-3">
        <ActivitySelector date={iso} />
        {fuel && (
          <div className="mt-3 space-y-1.5 animate-fade-up">
            <p className="text-[12px] text-bone-200 leading-snug">
              <span className="text-terra-300 font-medium">Antes · </span>
              {fuel.pre}
            </p>
            <p className="text-[12px] text-bone-200 leading-snug">
              <span className="text-sage-300 font-medium">Después · </span>
              {fuel.post}
            </p>
            <p className="text-[11px] text-bone-400 italic leading-snug pt-0.5">
              {fuel.note}
            </p>
          </div>
        )}
      </Card>

      <ol className="space-y-2.5">
        {meals.map((meal, i) => (
          <MealRow key={`${meal.slot}-${i}`} meal={meal} />
        ))}
      </ol>

      <p className="mt-4 text-[11px] text-bone-400 italic leading-relaxed">
        {DIET_DISCLAIMER}
      </p>
    </section>
  );
}

function MealRow({ meal }: { meal: Meal }) {
  const isShake = meal.kind === "shake";
  return (
    <li>
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`shrink-0 h-9 w-9 rounded-xl flex items-center justify-center ${
              isShake
                ? "bg-terra-300/15 text-terra-300"
                : "bg-sage-900/40 text-sage-300"
            }`}
            aria-hidden
          >
            {isShake ? <ShakeIcon /> : <PlateIcon />}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium text-bone-100 leading-tight">
                {meal.title}
              </p>
              <span className="font-mono text-[11px] tabular text-bone-400 shrink-0">
                {meal.time}
              </span>
            </div>

            <ul className="mt-1.5 space-y-0.5">
              {meal.items.map((it, idx) => (
                <li
                  key={idx}
                  className="text-[13px] text-bone-300 leading-snug flex gap-2"
                >
                  <span className="text-bone-400" aria-hidden>
                    ·
                  </span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            {meal.note && (
              <p
                className={`mt-2 text-[11px] italic leading-snug ${
                  isShake ? "text-terra-300/90" : "text-sage-300/90"
                }`}
              >
                {meal.note}
              </p>
            )}
          </div>
        </div>
      </Card>
    </li>
  );
}

function ShakeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8h10l-1 11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 8z" />
      <path d="M7.5 8 9 3h6l1.5 5" />
      <path d="M8 12h8" />
    </svg>
  );
}

function PlateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}
