"use client";

import { useState } from "react";
import { useProtocolStore } from "@/lib/store";
import { getExerciseGif } from "@/lib/data/exerciseGifs";
import { ExerciseAnimation } from "@/components/hypertrophy/ExerciseAnimation";
import { HideToggle } from "@/components/system/HideToggle";
import type { ExerciseSpec, WeekDay } from "@/lib/types";
import { cn, num } from "@/lib/utils";

interface Props {
  exercise: ExerciseSpec;
  day: WeekDay;
  ordinal: number;
  groupKeys?: string[];
}

export function ExerciseLogger({ exercise, day, ordinal, groupKeys = [] }: Props) {
  const log = useProtocolStore((s) => s.getTodayLog());
  const logSet = useProtocolStore((s) => s.logSet);
  const removeLast = useProtocolStore((s) => s.removeLastSet);
  const gif = getExerciseGif(exercise.id);
  const [showGif, setShowGif] = useState(false);
  const hideKey = `pesas:${exercise.id}`;
  const hidden = useProtocolStore((s) => !!s.hiddenItems[hideKey]);

  const loggedExercise = log?.exercises.find((e) => e.id === exercise.id);
  const sets = loggedExercise?.sets ?? [];

  // Defaults inteligentes: tomar el último set logueado si existe
  const lastSet = sets[sets.length - 1];
  const [reps, setReps] = useState<string>(lastSet ? String(lastSet.reps) : "");
  const [weight, setWeight] = useState<string>(
    lastSet ? String(lastSet.weight) : "",
  );

  const add = () => {
    const r = parseInt(reps, 10);
    const w = parseFloat(weight);
    if (isNaN(r) || r <= 0) return;
    if (isNaN(w) || w < 0) return;
    logSet(day, exercise.id, exercise.name, { reps: r, weight: w });
  };

  // Estado oculto (modos equilibrio/flujo): fila mínima con opción de mostrar.
  if (hidden) {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-dashed border-ink-700 bg-ink-900/20">
        <span className="numeral text-sm text-bone-400 tabular w-5">
          {num(ordinal)}
        </span>
        <span className="flex-1 text-sm text-bone-400 line-through truncate">
          {exercise.name}
        </span>
        <HideToggle itemKey={hideKey} groupKeys={groupKeys} />
      </div>
    );
  }

  return (
    <article className="border border-ink-800 rounded-sm overflow-hidden">
      <header className="px-4 py-3 bg-ink-900/40">
        <div className="flex items-baseline gap-3">
          <span className="numeral text-base text-bone-400 tabular w-5">
            {num(ordinal)}
          </span>
          <div className="flex-1 min-w-0">
            {gif ? (
              <button
                onClick={() => setShowGif((v) => !v)}
                className="text-left group/title flex items-center gap-1.5"
              >
                <h3 className="text-sm text-bone-50 leading-snug group-hover/title:text-sage-300 transition-colors">
                  {exercise.name}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  className={cn(
                    "w-3.5 h-3.5 text-sage-300 shrink-0 transition-transform",
                    showGif && "rotate-180",
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            ) : (
              <h3 className="text-sm text-bone-50 leading-snug">
                {exercise.name}
              </h3>
            )}
            <p className="text-[11px] font-mono text-bone-400 tabular mt-0.5">
              {exercise.sets}
              {exercise.load && ` · ${exercise.load}`}
            </p>
          </div>
          {sets.length > 0 && (
            <span className="font-mono text-xs tabular text-sage-300 shrink-0">
              {sets.length} ●
            </span>
          )}
          <HideToggle itemKey={hideKey} groupKeys={groupKeys} />
        </div>
        {exercise.note && (
          <p className="text-[11px] text-bone-400 italic mt-1.5 leading-snug pl-8">
            {exercise.note}
          </p>
        )}
      </header>

      {/* Animación del ejercicio (free-exercise-db, dominio público) */}
      {gif && showGif && (
        <div className="border-t border-ink-800 bg-[#f4f1ea] animate-fade-up">
          <ExerciseAnimation
            images={gif.images}
            alt={exercise.name}
            className="w-full max-w-[280px] mx-auto"
          />
          <p className="text-center text-[10px] font-mono text-ink-600 pb-2">
            {gif.ref} · demostración
          </p>
        </div>
      )}

      {/* Sets registrados */}
      {sets.length > 0 && (
        <ul className="border-t border-ink-800 divide-y divide-ink-800">
          {sets.map((s, i) => (
            <li
              key={i}
              className="flex items-center px-4 py-2 font-mono text-xs tabular"
            >
              <span className="text-bone-400 w-12">SET {num(i + 1)}</span>
              <span className="text-bone-100 flex-1">
                {s.reps} reps <span className="text-bone-400">·</span> {s.weight} kg
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Input para añadir */}
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-4 py-3 border-t border-ink-800 bg-ink-900/20">
        <div>
          <label className="font-mono text-[10px] text-bone-400 tracking-widest uppercase block mb-1">
            Reps
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="0"
            className="!py-1.5 !text-sm tabular"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] text-bone-400 tracking-widest uppercase block mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            inputMode="decimal"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="0"
            className="!py-1.5 !text-sm tabular"
          />
        </div>
        <button
          onClick={add}
          disabled={!reps || !weight}
          className={cn(
            "self-end px-3 py-1.5 rounded-sm font-mono text-xs uppercase tracking-widest transition",
            !reps || !weight
              ? "bg-ink-800 text-bone-400 cursor-not-allowed"
              : "bg-sage-400 text-ink-950 hover:bg-sage-300",
          )}
        >
          + Set
        </button>
      </div>

      {sets.length > 0 && (
        <button
          onClick={() => removeLast(day, exercise.id)}
          className="w-full py-1.5 text-[10px] font-mono tracking-widest uppercase text-bone-400 hover:text-terra-300 border-t border-ink-800"
        >
          ↶ Deshacer último set
        </button>
      )}
    </article>
  );
}
