"use client";

import { useEffect } from "react";
import type { SpartanExercise } from "@/lib/types";
import { num } from "@/lib/utils";
import { useT } from "@/lib/i18n/useT";
import { useTData } from "@/lib/i18n/useTData";

interface Props {
  exercise: SpartanExercise | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ExerciseDetailModal({
  exercise,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const t = useT();
  const td = useTData();
  useEffect(() => {
    if (!exercise) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    document.body.classList.add("no-scroll");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [exercise, onClose, onPrev, onNext]);

  if (!exercise) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={td(exercise.nameEs)}
    >
      {/* Backdrop */}
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md mx-auto bg-ink-900 border border-ink-700 rounded-t-2xl sm:rounded-2xl shadow-pop animate-pop-in overflow-hidden">
        {/* Asa de arrastre */}
        <div className="sm:hidden flex justify-center pt-3">
          <span className="h-1 w-10 rounded-full bg-ink-700" />
        </div>

        <div className="px-5 pt-4 pb-2 flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-terra-300">
              {t("spartan.exerciseOf").replace("{n}", num(exercise.index))}
            </p>
            <h3 className="mt-1 font-display text-2xl font-light text-bone-50 leading-tight">
              {td(exercise.nameEs)}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-full border border-ink-700 text-bone-300 hover:text-bone-100 hover:border-ink-600"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Ilustración */}
        <div className="mx-5 mt-1 rounded-xl overflow-hidden bg-[#f4f1ea] border border-ink-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={exercise.image}
            alt={td(exercise.nameEs)}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Datos */}
        <div className="px-5 py-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 rounded-xl bg-ink-850 border border-ink-800 px-4 py-3">
              <p className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                Objetivo / ronda
              </p>
              <p className="numeral text-3xl text-terra-300 tabular mt-0.5">
                {exercise.reps}
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-ink-850 border border-ink-800 px-4 py-3">
              <p className="font-mono text-[10px] tracking-widest uppercase text-bone-400">
                Intervalo
              </p>
              <p className="numeral text-3xl text-sage-300 tabular mt-0.5">
                {exercise.duration}s
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-bone-400 mb-1">
              {t("common.technique")}
            </p>
            <p className="text-sm text-bone-200 leading-relaxed">
              {td(exercise.cue)}
            </p>
          </div>
        </div>

        {/* Navegación entre ejercicios */}
        <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            className="btn btn-secondary flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <button
            onClick={onNext}
            disabled={!onNext}
            className="btn btn-secondary flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
