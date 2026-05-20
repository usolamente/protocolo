"use client";

import { useProtocolStore } from "@/lib/store";
import type { ChallengeDayTarget, ChallengeExercise } from "@/lib/types";
import { cn, num } from "@/lib/utils";

interface Props {
  target: ChallengeDayTarget;
  isToday: boolean;
}

const LABELS: Record<ChallengeExercise, string> = {
  squats: "Sentadillas",
  plank: "Plancha",
  pushups: "Flexiones",
  crunches: "Abdominales",
};

function formatTarget(ex: ChallengeExercise, t: ChallengeDayTarget): string {
  switch (ex) {
    case "squats":
      return `${t.squats}`;
    case "plank":
      return t.plank >= 60
        ? `${Math.floor(t.plank / 60)}:${String(t.plank % 60).padStart(2, "0")}`
        : `${t.plank}s`;
    case "pushups":
      return `${t.pushups}`;
    case "crunches":
      return `${t.crunches}`;
  }
}

export function ChallengeDayRow({ target, isToday }: Props) {
  const dayProgress = useProtocolStore((s) => s.challenge[target.day]);
  const toggle = useProtocolStore((s) => s.toggleChallenge);
  const progress = dayProgress ?? {};

  if (target.rest) {
    return (
      <div
        className={cn(
          "flex items-center gap-4 py-4 px-4 border rounded-sm",
          isToday
            ? "border-sage-700 bg-sage-900/20"
            : "border-ink-800 bg-ink-900/30",
        )}
      >
        <span className="numeral text-2xl text-bone-400 tabular w-9">
          {num(target.day)}
        </span>
        <div className="flex-1">
          <p className="font-mono text-xs tracking-widest uppercase text-clay-400">
            Descanso obligatorio
          </p>
          <p className="text-xs text-bone-400 mt-0.5 italic">
            Supercompensación · sin volumen
          </p>
        </div>
        <RestIcon className="w-4 h-4 text-clay-400" />
      </div>
    );
  }

  const exercises: ChallengeExercise[] = ["squats", "plank", "pushups", "crunches"];
  const completed = exercises.filter((e) => progress[e]).length;

  return (
    <div
      className={cn(
        "border rounded-sm overflow-hidden transition-colors",
        isToday
          ? "border-sage-300 bg-sage-900/10"
          : "border-ink-800 bg-ink-900/30",
      )}
    >
      <div className="flex items-center gap-4 py-3 px-4 border-b border-ink-800">
        <span
          className={cn(
            "numeral text-2xl tabular w-9",
            isToday ? "text-sage-300" : "text-bone-200",
          )}
        >
          {num(target.day)}
        </span>
        <p className="flex-1 text-sm text-bone-200">
          {isToday ? "Hoy" : `Día ${target.day}`}
        </p>
        <span className="font-mono text-xs tabular text-bone-400">
          {completed}/4
        </span>
      </div>

      <ul className="divide-y divide-ink-800">
        {exercises.map((ex) => {
          const done = !!progress[ex];
          return (
            <li key={ex}>
              <label className="flex items-center gap-3 py-2.5 px-4 cursor-pointer hover:bg-ink-900/50">
                <input
                  type="checkbox"
                  className="check"
                  checked={done}
                  onChange={() => toggle(target.day, ex)}
                  aria-label={`Marcar ${LABELS[ex]} día ${target.day}`}
                />
                <span
                  className={cn(
                    "flex-1 text-sm transition-all",
                    done ? "text-bone-400 line-through" : "text-bone-100",
                  )}
                >
                  {LABELS[ex]}
                </span>
                <span
                  className={cn(
                    "font-mono text-sm tabular",
                    done ? "text-sage-300" : "text-bone-300",
                  )}
                >
                  {formatTarget(ex, target)}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" />
    </svg>
  );
}
