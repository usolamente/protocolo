"use client";

import { Collapsible } from "@/components/ui/Collapsible";
import { DayDietPeek } from "@/components/week/DayDietPeek";
import { WEEK_PLAN } from "@/lib/data/weekPlan";
import { WEEK_LABELS, num } from "@/lib/utils";
import { useTData } from "@/lib/i18n/useTData";

export function WeekDayList() {
  const td = useTData();
  return (
    <>
      {WEEK_PLAN.map((day, i) => (
        <Collapsible
          key={day.day}
          title={td(WEEK_LABELS[day.day])}
          subtitle={td(day.focusLabel)}
          numeral={num(i + 1)}
        >
          {/* Ejercicios de pesas */}
          <ul className="space-y-3">
            {day.exercises.map((ex, idx) => (
              <li key={ex.id} className="flex items-baseline gap-3">
                <span className="numeral text-base text-bone-400 w-5 shrink-0 tabular">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-bone-100 leading-snug">
                    {td(ex.name)}
                  </p>
                  <p className="text-[11px] font-mono text-bone-400 tabular mt-0.5">
                    {ex.sets}
                    {ex.load && ` · ${ex.load}`}
                  </p>
                  {ex.note && (
                    <p className="text-[11px] text-bone-400 italic mt-0.5 leading-snug">
                      {td(ex.note)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Actividad + dieta del día */}
          <DayDietPeek day={day.day} />
        </Collapsible>
      ))}
    </>
  );
}
