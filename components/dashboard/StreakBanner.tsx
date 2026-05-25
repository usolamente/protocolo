"use client";

import { useEffect, useState } from "react";
import { useProtocolStore } from "@/lib/store";

export function StreakBanner() {
  const getStreak = useProtocolStore((s) => s.getStreak);
  // Releer cuando cambie cualquier cosa que afecte a la racha.
  const log = useProtocolStore((s) => s.log);
  const mealStatus = useProtocolStore((s) => s.mealStatus);
  const [streak, setStreak] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStreak(getStreak());
    setHydrated(true);
  }, [getStreak, log, mealStatus]);

  if (!hydrated || streak === 0) return null;

  return (
    <section className="px-5 pt-2">
      <div className="flex items-center gap-3 rounded-2xl border border-terra-300/30 bg-terra-300/5 px-4 py-3">
        <span className="text-2xl" aria-hidden>
          🔥
        </span>
        <div>
          <p className="numeral text-2xl text-terra-300 tabular leading-none">
            {streak}
            <span className="text-sm text-bone-300 ml-1.5 font-sans not-italic">
              {streak === 1 ? "día" : "días"} seguidos
            </span>
          </p>
          <p className="text-[11px] text-bone-400 mt-1">
            Racha de adherencia · sigue así
          </p>
        </div>
      </div>
    </section>
  );
}
