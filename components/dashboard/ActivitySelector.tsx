"use client";

import { useProtocolStore } from "@/lib/store";
import { ACTIVITIES } from "@/lib/utils";
import type { Activity } from "@/lib/types";

export function ActivitySelector({
  date,
  compact = false,
}: {
  date: string;
  compact?: boolean;
}) {
  const activity = useProtocolStore((s) => s.activities[date] ?? "none");
  const setActivity = useProtocolStore((s) => s.setActivity);

  return (
    <label className="flex items-center gap-2">
      {!compact && (
        <span className="font-mono text-[10px] tracking-widest uppercase text-bone-300 shrink-0">
          Actividad
        </span>
      )}
      <select
        value={activity}
        onChange={(e) => setActivity(date, e.target.value as Activity)}
        aria-label="Actividad complementaria del día"
        className="flex-1 !py-2 !px-3 text-sm cursor-pointer"
      >
        {ACTIVITIES.map((a) => (
          <option key={a.value} value={a.value}>
            {a.emoji === "—" ? "" : `${a.emoji} `}
            {a.label}
          </option>
        ))}
      </select>
    </label>
  );
}
