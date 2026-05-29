"use client";

import { useState } from "react";
import { useProtocolStore } from "@/lib/store";
import { ACTIVITIES } from "@/lib/utils";
import { useT } from "@/lib/i18n/useT";
import { cn } from "@/lib/utils";
import type { Activity, ActivityShift, SelectedActivity } from "@/lib/types";

/**
 * Selector de actividad(es) del día: el usuario puede elegir varios
 * deportes y, para cada uno, indicar si será por la mañana o por la tarde.
 *
 * Capas:
 *   1) Resumen plegado: chips de lo seleccionado + botón "Editar".
 *   2) Editor expandido: rejilla de deportes (toggle); cada uno
 *      seleccionado muestra dos sub-botones de turno (mañana/tarde).
 */
export function ActivitySelector({
  date,
  compact = false,
}: {
  date: string;
  compact?: boolean;
}) {
  const t = useT();
  const list = useProtocolStore((s) => s.activities[date] ?? []);
  const setDayActivities = useProtocolStore((s) => s.setDayActivities);
  const [open, setOpen] = useState(false);

  const selectable = ACTIVITIES.filter((a) => a.value !== "none");

  const toggleActivity = (value: Exclude<Activity, "none">) => {
    const exists = list.find((a) => a.value === value);
    if (exists) {
      setDayActivities(date, list.filter((a) => a.value !== value));
    } else {
      setDayActivities(date, [...list, { value, shift: null }]);
    }
  };

  const setShift = (value: Exclude<Activity, "none">, shift: ActivityShift) => {
    setDayActivities(
      date,
      list.map((a) =>
        a.value === value ? { ...a, shift: a.shift === shift ? null : shift } : a,
      ),
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", compact && "text-xs")}>
      {/* Cabecera con resumen */}
      <div className="flex items-center gap-2">
        {!compact && (
          <span className="font-mono text-[10px] tracking-widest uppercase text-bone-300 shrink-0">
            {t("diet.activity")}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          {list.length === 0 ? (
            <span className="text-[12px] text-bone-400 italic">{t("activity.none")}</span>
          ) : (
            list.map((a) => {
              const meta = ACTIVITIES.find((x) => x.value === a.value);
              if (!meta) return null;
              return (
                <span
                  key={a.value}
                  className="inline-flex items-center gap-1 rounded-full bg-sage-900/40 border border-sage-300/30 text-bone-100 px-2 py-0.5 text-[11px]"
                >
                  <span aria-hidden>{meta.emoji}</span>
                  <span>{meta.label}</span>
                  {a.shift && (
                    <span className="font-mono text-[9px] tracking-wider uppercase text-sage-300">
                      {a.shift === "morning" ? t("activity.morning") : t("activity.afternoon")}
                    </span>
                  )}
                </span>
              );
            })
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="font-mono text-[10px] tracking-widest uppercase text-sage-300 hover:text-sage-200 transition-colors shrink-0"
        >
          {open ? t("common.close") : t("common.edit")}
        </button>
      </div>

      {/* Editor */}
      {open && (
        <div className="rounded-xl border border-ink-800 bg-ink-900/40 p-3 animate-fade-up">
          <div className="grid grid-cols-3 gap-1.5">
            {selectable.map((a) => {
              const sel = list.find((x) => x.value === a.value);
              const isOn = !!sel;
              return (
                <div key={a.value} className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => toggleActivity(a.value as Exclude<Activity, "none">)}
                    aria-pressed={isOn}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 transition-colors text-[12px]",
                      isOn
                        ? "border-sage-300 bg-sage-900/40 text-bone-50"
                        : "border-ink-700 bg-transparent text-bone-300 hover:border-ink-600",
                    )}
                  >
                    <span aria-hidden>{a.emoji}</span>
                    <span className="truncate">{a.label}</span>
                  </button>
                  {isOn && (
                    <div className="grid grid-cols-2 gap-1 animate-fade-up">
                      <button
                        type="button"
                        onClick={() => setShift(a.value as Exclude<Activity, "none">, "morning")}
                        aria-pressed={sel?.shift === "morning"}
                        className={cn(
                          "rounded-md border px-1.5 py-1 font-mono text-[9px] tracking-wider uppercase transition-colors",
                          sel?.shift === "morning"
                            ? "border-terra-300 bg-terra-300/15 text-terra-300"
                            : "border-ink-700 text-bone-400 hover:border-ink-600",
                        )}
                      >
                        {t("activity.morningShort")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShift(a.value as Exclude<Activity, "none">, "afternoon")}
                        aria-pressed={sel?.shift === "afternoon"}
                        className={cn(
                          "rounded-md border px-1.5 py-1 font-mono text-[9px] tracking-wider uppercase transition-colors",
                          sel?.shift === "afternoon"
                            ? "border-terra-300 bg-terra-300/15 text-terra-300"
                            : "border-ink-700 text-bone-400 hover:border-ink-600",
                        )}
                      >
                        {t("activity.afternoonShort")}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
