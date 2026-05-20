"use client";

import { useEffect, useRef, useState } from "react";
import {
  SPARTAN_CIRCUIT,
  SPARTAN_LEVELS,
  SPARTAN_REST_MAX,
} from "@/lib/data/spartanCircuit";
import type { SpartanLevel } from "@/lib/types";
import { useProtocolStore } from "@/lib/store";
import { cn, formatTime, num } from "@/lib/utils";

type Phase = "idle" | "exercise" | "rest" | "done";

interface RunnerState {
  phase: Phase;
  setIndex: number; // 0..(level.sets - 1)
  exIndex: number; // 0..14
  remaining: number; // segundos
}

const INITIAL: RunnerState = {
  phase: "idle",
  setIndex: 0,
  exIndex: 0,
  remaining: 0,
};

export function SpartanRunner({ level }: { level: SpartanLevel }) {
  const cfg = SPARTAN_LEVELS[level];
  const [state, setState] = useState<RunnerState>(INITIAL);
  const [paused, setPaused] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const registerSession = useProtocolStore((s) => s.registerSpartanSession);

  // Loop
  useEffect(() => {
    if (state.phase === "idle" || state.phase === "done" || paused) {
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }

    tickRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.remaining > 1) {
          return { ...prev, remaining: prev.remaining - 1 };
        }
        // Transición
        return advance(prev, cfg.sets);
      });
    }, 1000);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state.phase, paused, cfg.sets]);

  // Cuando entra en done, registrar sesión
  useEffect(() => {
    if (state.phase === "done") {
      registerSession();
    }
  }, [state.phase, registerSession]);

  const start = () => {
    setState({
      phase: "exercise",
      setIndex: 0,
      exIndex: 0,
      remaining: SPARTAN_CIRCUIT[0].duration,
    });
    setPaused(false);
  };

  const reset = () => {
    setState(INITIAL);
    setPaused(false);
  };

  const skip = () => {
    setState((prev) => advance(prev, cfg.sets));
  };

  // ─── Render ─────────────────────────────────────────
  if (state.phase === "idle") {
    return (
      <div className="text-center">
        <p className="eyebrow text-bone-300 mb-2">Nivel seleccionado</p>
        <p className="font-display text-5xl font-light text-bone-50">
          {cfg.label}
        </p>
        <p className="text-sm text-bone-400 mt-2">{cfg.note}</p>
        <p className="mt-6 text-xs text-bone-400 max-w-xs mx-auto leading-relaxed">
          15 ejercicios · 30 s cada uno · descanso automático de hasta {SPARTAN_REST_MAX}s entre rondas
        </p>
        <button onClick={start} className="btn btn-primary mt-8 w-full">
          Iniciar circuito
        </button>
      </div>
    );
  }

  if (state.phase === "done") {
    return (
      <div className="text-center py-8">
        <p className="font-display italic text-bone-50 text-4xl">Completado.</p>
        <div className="rule my-8 max-w-[12rem] mx-auto" aria-hidden />
        <p className="text-sm text-bone-300">
          {cfg.sets} rondas · {SPARTAN_CIRCUIT.length} ejercicios cada una
        </p>
        <p className="text-xs text-bone-400 mt-1">Sesión registrada · hidrátate</p>
        <button onClick={reset} className="btn btn-secondary mt-8 w-full">
          Otra ronda
        </button>
      </div>
    );
  }

  const isRest = state.phase === "rest";
  const totalDuration = isRest
    ? SPARTAN_REST_MAX
    : SPARTAN_CIRCUIT[state.exIndex].duration;
  const progress = ((totalDuration - state.remaining) / totalDuration) * 100;

  const currentEx = SPARTAN_CIRCUIT[state.exIndex];
  const nextExIndex = state.exIndex < SPARTAN_CIRCUIT.length - 1 ? state.exIndex + 1 : null;
  const nextEx = nextExIndex !== null ? SPARTAN_CIRCUIT[nextExIndex] : null;

  return (
    <div>
      {/* Cabecera de ronda */}
      <div className="flex items-baseline justify-between mb-6">
        <span className="eyebrow text-bone-300">
          Ronda {state.setIndex + 1}<span className="text-bone-400"> / {cfg.sets}</span>
        </span>
        <span className="font-mono text-xs tabular text-bone-400">
          {num(state.exIndex + 1)} / 15
        </span>
      </div>

      {/* Visual gigante */}
      <div className="relative aspect-square max-w-[18rem] mx-auto mb-8">
        {/* Anillo de progreso */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#1c2229"
            strokeWidth="1.5"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={isRest ? "#C4724A" : "#7C8B6C"}
            strokeWidth="1.5"
            strokeDasharray={`${2 * Math.PI * 46}`}
            strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="eyebrow text-bone-400">{isRest ? "Descanso" : "Activo"}</p>
          <p
            className={cn(
              "font-display font-light tabular text-7xl mt-2",
              isRest ? "text-terra-300" : "text-sage-300",
            )}
          >
            {formatTime(state.remaining)}
          </p>
        </div>
      </div>

      {/* Ejercicio actual */}
      <div className="text-center mb-2">
        <p className="numeral text-3xl text-ink-700 tabular">
          {isRest ? "—" : num(currentEx.index)}
        </p>
        <p className="font-display text-3xl font-light text-bone-50 leading-tight mt-1">
          {isRest ? "Recupera la respiración" : currentEx.name}
        </p>
      </div>

      {/* Siguiente */}
      {!isRest && nextEx && (
        <p className="text-center text-xs text-bone-400 mt-3 font-mono uppercase tracking-widest">
          Siguiente · {nextEx.name}
        </p>
      )}
      {isRest && (
        <p className="text-center text-xs text-bone-400 mt-3 font-mono uppercase tracking-widest">
          Comienza ronda {state.setIndex + 2}
        </p>
      )}

      {/* Controles */}
      <div className="flex gap-2 mt-10">
        <button
          onClick={() => setPaused((p) => !p)}
          className="btn btn-secondary flex-1"
        >
          {paused ? "Reanudar" : "Pausar"}
        </button>
        <button onClick={skip} className="btn btn-ghost flex-1">
          Saltar →
        </button>
        <button onClick={reset} className="btn btn-ghost">
          ×
        </button>
      </div>
    </div>
  );
}

// ─── Lógica de transición ─────────────────────────────
function advance(prev: RunnerState, setsTotal: number): RunnerState {
  if (prev.phase === "exercise") {
    // ¿Era el último ejercicio?
    if (prev.exIndex < SPARTAN_CIRCUIT.length - 1) {
      return {
        ...prev,
        exIndex: prev.exIndex + 1,
        remaining: SPARTAN_CIRCUIT[prev.exIndex + 1].duration,
      };
    }
    // Fin de la ronda
    if (prev.setIndex < setsTotal - 1) {
      return {
        phase: "rest",
        setIndex: prev.setIndex,
        exIndex: prev.exIndex,
        remaining: SPARTAN_REST_MAX,
      };
    }
    // Fin del entrenamiento
    return { ...prev, phase: "done", remaining: 0 };
  }

  if (prev.phase === "rest") {
    return {
      phase: "exercise",
      setIndex: prev.setIndex + 1,
      exIndex: 0,
      remaining: SPARTAN_CIRCUIT[0].duration,
    };
  }

  return prev;
}
