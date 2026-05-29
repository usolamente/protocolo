"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ActivitySelector } from "@/components/dashboard/ActivitySelector";
import { MealTags } from "@/components/dashboard/MealTags";
import { MorningTimeline } from "@/components/dashboard/MorningTimeline";
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
import { useT } from "@/lib/i18n/useT";
import { useTData } from "@/lib/i18n/useTData";
import { SOMATOTYPE_MAP } from "@/lib/data/config";
import type { Meal, WeekDay } from "@/lib/types";

export function DietToday() {
  const td = useTData();
  const [today, setToday] = useState<WeekDay | null>(null);
  const [iso, setIso] = useState<string>("");
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    const now = new Date();
    setToday(currentWeekDay(now));
    setIso(toISODate(now));
    setVariant(weekOfMonthIndex(now));
  }, []);

  // Suscríbete al objeto activities (referencia estable) y calcula
  // la primaria FUERA del selector. Si llamáramos a
  // getDayPrimaryActivity dentro del selector devolveríamos un
  // objeto nuevo en cada render y entraríamos en bucle infinito.
  const activitiesMap = useProtocolStore((s) => s.activities);
  const getPrimary = useProtocolStore((s) => s.getDayPrimaryActivity);
  const primaryActivity = iso ? getPrimary(iso) : null;
  // referencia muda para que el linter sepa que usamos activitiesMap
  void activitiesMap;
  const somatotype = useProtocolStore((s) => s.config.somatotype);
  const soma = SOMATOTYPE_MAP[somatotype];

  if (!today || !iso) {
    return (
      <Card className="mx-5">
        <p className="text-bone-400 text-sm">Cargando dieta…</p>
      </Card>
    );
  }

  const meals: Meal[] = [PRE_WORKOUT, POST_WORKOUT, ...getWeekDiet()[today]];
  const fuel = primaryActivity ? getActivityFuel(primaryActivity.value) : null;

  return (
    <section className="px-5 py-2">
      <div className="flex items-baseline justify-between mb-1">
        <p className="eyebrow text-bone-300">Dieta de hoy · 5 comidas + batidos</p>
        <span className="font-mono text-[10px] text-bone-400">
          {meals.length} tomas
        </span>
      </div>
      <p className="font-mono text-[10px] tracking-widest uppercase text-sage-300 mb-3">
        {td(WEEK_VARIANT_LABELS[variant])}
      </p>

      {/* Ajuste por somatotipo */}
      <Card className="p-4 mb-3 border-sage-300/30 bg-sage-900/20">
        <p className="font-mono text-[10px] tracking-widest uppercase text-sage-300">
          {soma.label} · carbohidrato {soma.carbBias}
        </p>
        <p className="text-[12px] text-bone-200 leading-snug mt-1.5">
          {soma.dietNote}
        </p>
      </Card>

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
        {/* Batido pre-entreno */}
        <MealRow meal={meals[0]} iso={iso} />

        {/* Cronología matutina: ocurre entre el batido pre y el post */}
        <li className="!list-none">
          <MorningTimeline />
        </li>

        {/* Batido post-entreno */}
        <MealRow meal={meals[1]} iso={iso} />

        {/* Resto de comidas del día */}
        {meals.slice(2).map((meal, i) => (
          <MealRow key={`${meal.slot}-${i}`} meal={meal} iso={iso} />
        ))}
      </ol>

      <p className="mt-4 text-[11px] text-bone-400 italic leading-relaxed">
        {DIET_DISCLAIMER}
      </p>
    </section>
  );
}

function MealRow({ meal, iso }: { meal: Meal; iso: string }) {
  const t = useT();
  const td = useTData();
  const isShake = meal.kind === "shake";
  const status = useProtocolStore((s) => s.mealStatus[`${iso}:${meal.slot}`] ?? null);
  const setMealStatus = useProtocolStore((s) => s.setMealStatus);
  return (
    <li>
      <Card
        className={`p-4 transition-opacity ${
          status === "skipped" ? "opacity-50" : ""
        }`}
      >
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
                {td(meal.title)}
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
                {td(meal.note)}
              </p>
            )}

            {!isShake && <MealTags items={meal.items} />}

            {!isShake && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => setMealStatus(iso, meal.slot, "done")}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-mono tracking-wide transition-colors ${
                    status === "done"
                      ? "border-sage-400 text-sage-300 bg-sage-900/30"
                      : "border-ink-700 text-bone-400 hover:border-sage-400 hover:text-sage-300"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  {t("common.done")}
                </button>
                <button
                  onClick={() => setMealStatus(iso, meal.slot, "skipped")}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-mono tracking-wide transition-colors ${
                    status === "skipped"
                      ? "border-clay-400 text-clay-400 bg-clay-400/10"
                      : "border-ink-700 text-bone-400 hover:border-clay-400 hover:text-clay-400"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  {t("common.skipped")}
                </button>
              </div>
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
