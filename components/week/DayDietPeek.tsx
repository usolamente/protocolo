"use client";

import { useEffect, useState } from "react";
import { getWeekDiet, PRE_WORKOUT, POST_WORKOUT } from "@/lib/data/diet";
import { currentWeekDates } from "@/lib/utils";
import { ActivitySelector } from "@/components/dashboard/ActivitySelector";
import { MealTags } from "@/components/dashboard/MealTags";
import { useTData } from "@/lib/i18n/useTData";
import type { WeekDay } from "@/lib/types";

export function DayDietPeek({ day }: { day: WeekDay }) {
  const td = useTData();
  const [open, setOpen] = useState(false);
  const [iso, setIso] = useState<string>("");

  useEffect(() => {
    setIso(currentWeekDates()[day]);
  }, [day]);

  const meals = [PRE_WORKOUT, POST_WORKOUT, ...getWeekDiet()[day]];

  return (
    <div className="mt-4 border-t border-ink-800 pt-3">
      {/* Selector de actividad del día — siempre visible */}
      {iso && (
        <div className="mb-3">
          <ActivitySelector date={iso} />
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] tracking-widest uppercase text-sage-300">
          Dieta del día · {meals.length} tomas
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-bone-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="mt-3 space-y-2 animate-fade-up">
          {meals.map((m, i) => (
            <li key={`${m.slot}-${i}`} className="flex gap-3">
              <span className="font-mono text-[11px] tabular text-bone-400 w-11 shrink-0">
                {m.time}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-[12px] leading-tight ${
                    m.kind === "shake" ? "text-terra-300" : "text-bone-100"
                  }`}
                >
                  {td(m.title)}
                </p>
                <p className="text-[11px] text-bone-400 leading-snug">
                  {m.items.join(" · ")}
                </p>
                {m.kind !== "shake" && <MealTags items={m.items} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
