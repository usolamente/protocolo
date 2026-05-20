"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "in" | "out";

export function BreathingTimer() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycleCount, setCycleCount] = useState(0);
  const phaseRef = useRef<Phase>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ciclo: 3s inhalar → 6s exhalar
  useEffect(() => {
    phaseRef.current = phase;
    if (phase === "idle") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const duration = phase === "in" ? 3000 : 6000;
    timeoutRef.current = setTimeout(() => {
      if (phaseRef.current === "in") {
        setPhase("out");
      } else if (phaseRef.current === "out") {
        setCycleCount((c) => c + 1);
        setPhase("in");
      }
    }, duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phase]);

  const start = () => {
    setCycleCount(0);
    setPhase("in");
  };

  const stop = () => {
    setPhase("idle");
  };

  const label = phase === "in" ? "Inhala" : phase === "out" ? "Exhala" : "Listo";
  const seconds = phase === "in" ? 3 : phase === "out" ? 6 : null;

  return (
    <div className="flex flex-col items-center py-8">
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Anillos guía */}
        <span
          className="absolute inset-0 rounded-full border border-ink-700"
          aria-hidden
        />
        <span
          className="absolute inset-6 rounded-full border border-ink-800"
          aria-hidden
        />

        {/* Círculo respiratorio */}
        <span
          className={cn(
            "absolute rounded-full bg-sage-400/15 border border-sage-300",
            phase === "in" && "animate-breath-in",
            phase === "out" && "animate-breath-out",
          )}
          style={{
            width: "85%",
            height: "85%",
            transform: phase === "idle" ? "scale(0.55)" : undefined,
            opacity: phase === "idle" ? 0.55 : undefined,
          }}
          aria-hidden
        />

        <div className="relative text-center">
          <p className="font-display text-3xl font-light text-bone-50 italic">
            {label}
          </p>
          {seconds && (
            <p className="font-mono text-sm tabular text-sage-300 mt-1">
              {seconds} s
            </p>
          )}
        </div>
      </div>

      <p className="font-mono text-[10px] tracking-widest uppercase text-bone-400 mt-6">
        Ciclos completados
        <span className="text-sage-300 ml-2 tabular">
          {String(cycleCount).padStart(2, "0")}
        </span>
      </p>

      <div className="flex gap-2 mt-6 w-full">
        {phase === "idle" ? (
          <button onClick={start} className="btn btn-primary flex-1">
            Empezar 3-6
          </button>
        ) : (
          <button onClick={stop} className="btn btn-secondary flex-1">
            Detener
          </button>
        )}
      </div>
    </div>
  );
}
