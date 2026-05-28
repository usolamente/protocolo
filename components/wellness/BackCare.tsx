"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { BACK_ROUTINE, BACK_DISCLAIMER, POSTURE_HABITS } from "@/lib/data/backRoutine";
import { getBackIllustration } from "@/lib/data/backIllustrations";
import { useProtocolStore } from "@/lib/store";
import { useTData } from "@/lib/i18n/useTData";
import { cn } from "@/lib/utils";
import type { BackExercise, BackPhase } from "@/lib/data/backRoutine";

export function BackCare() {
  const td = useTData();
  const verbosity = useProtocolStore((s) => s.config.verbosity);
  const verbose = verbosity === "verbose";
  const [openPhase, setOpenPhase] = useState<string | null>("respiracion");
  const [showHabits, setShowHabits] = useState(false);

  return (
    <Card as="section">
      <header className="mb-4">
        <p className="eyebrow text-sage-300">Salud postural</p>
        <h2 className="font-display text-2xl font-light text-bone-50 mt-1 leading-tight">
          Cuidado de espalda
        </h2>
        {verbose && (
          <p className="text-xs text-bone-300 mt-2 leading-relaxed">
            Rutina progresiva en cuatro fases: despierta el control pélvico,
            moviliza, refuerza el core con la lógica de McGill y corrige la
            postura dorsal. Hazla entera o por fases sueltas.
          </p>
        )}
      </header>

      <div className="space-y-2.5">
        {BACK_ROUTINE.map((phase) => (
          <PhaseBlock
            key={phase.id}
            phase={phase}
            open={openPhase === phase.id}
            onToggle={() =>
              setOpenPhase((p) => (p === phase.id ? null : phase.id))
            }
            verbose={verbose}
          />
        ))}
      </div>

      {/* Higiene postural */}
      <div className="mt-5 border-t border-ink-800 pt-4">
        <button
          onClick={() => setShowHabits((v) => !v)}
          className="w-full flex items-center justify-between"
          aria-expanded={showHabits}
        >
          <span className="font-mono text-[11px] tracking-widest uppercase text-sage-300">
            Higiene postural · hábitos
          </span>
          <svg
            viewBox="0 0 24 24"
            className={cn(
              "w-4 h-4 text-bone-400 transition-transform",
              showHabits && "rotate-180",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {showHabits && (
          <ul className="mt-3 space-y-3 animate-fade-up">
            {POSTURE_HABITS.map((h) => (
              <li key={h.title}>
                <p className="text-sm text-bone-100 font-medium">{td(h.title)}</p>
                <p className="text-[12px] text-bone-300 leading-snug mt-0.5">
                  {td(h.text)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-4 text-[11px] text-bone-400 italic leading-relaxed">
        {td(BACK_DISCLAIMER)}
      </p>
    </Card>
  );
}

function PhaseBlock({
  phase,
  open,
  onToggle,
  verbose,
}: {
  phase: BackPhase;
  open: boolean;
  onToggle: () => void;
  verbose: boolean;
}) {
  const td = useTData();
  return (
    <div className="rounded-xl border border-ink-800 overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-3.5 text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] tracking-widest uppercase text-sage-300">
            {td(phase.label)}
          </p>
          <p className="text-sm text-bone-100 mt-0.5">{td(phase.tagline)}</p>
        </div>
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "w-4 h-4 text-bone-400 transition-transform shrink-0",
            open && "rotate-180",
          )}
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
        <div className="px-3.5 pb-3.5 animate-fade-up">
          <p className="text-[11px] font-mono text-bone-400 mb-3">
            {td(phase.position)}
          </p>
          <ol className="space-y-3">
            {phase.exercises.map((ex, i) => (
              <ExerciseRow key={i} exercise={ex} verbose={verbose} />
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function ExerciseRow({
  exercise,
  verbose,
}: {
  exercise: BackExercise;
  verbose: boolean;
}) {
  const td = useTData();
  const [open, setOpen] = useState(false);
  const illustration = getBackIllustration(exercise.name);

  return (
    <li className="border-t border-ink-800/60 pt-3 first:border-0 first:pt-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-baseline justify-between gap-2 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm text-bone-50 group-hover:text-sage-300 transition-colors">
            {td(exercise.name)}
          </span>
          {illustration && (
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "w-3.5 h-3.5 text-sage-300 shrink-0 transition-transform",
                open && "rotate-180",
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </span>
        <span className="font-mono text-[11px] tabular text-sage-300 shrink-0">
          {td(exercise.dose)}
        </span>
      </button>

      {verbose && (
        <p className="text-[12px] text-bone-300 leading-snug mt-1">
          {td(exercise.how)}
        </p>
      )}

      {/* Ficha desplegable con la ilustración */}
      {open && illustration && (
        <div className="mt-2 rounded-xl border border-ink-800 bg-ink-850 p-3 animate-fade-up">
          <div
            className="w-full max-w-[280px] mx-auto"
            dangerouslySetInnerHTML={{ __html: illustration }}
          />
        </div>
      )}

      {exercise.timer && <MiniTimer seconds={exercise.timer} />}
    </li>
  );
}

function MiniTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            if (ref.current) clearInterval(ref.current);
            setRunning(false);
            return seconds;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [running, seconds]);

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;

  return (
    <button
      onClick={() => setRunning((v) => !v)}
      className={cn(
        "mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors",
        running
          ? "border-terra-300/50 text-terra-300 bg-terra-300/10"
          : "border-ink-700 text-bone-300 hover:border-sage-400 hover:text-sage-300",
      )}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {running ? <><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></> : <path d="M6 4l14 8-14 8V4z" />}
      </svg>
      <span className="font-mono text-[12px] tabular">
        {mm > 0 ? `${mm}:${String(ss).padStart(2, "0")}` : `${ss}s`}
      </span>
    </button>
  );
}
