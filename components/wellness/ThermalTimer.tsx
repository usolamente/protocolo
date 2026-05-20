"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatTime } from "@/lib/utils";

interface Props {
  title: string;
  subtitle: string;
  defaultSeconds: number;
  minSeconds: number;
  maxSeconds: number;
  step: number;
  accent: "sauna" | "pool";
}

const ACCENT_CLASS = {
  sauna: {
    text: "text-terra-300",
    ring: "stroke-terra-300",
    bg: "bg-terra-300/10",
    border: "border-terra-300/30",
  },
  pool: {
    text: "text-sage-300",
    ring: "stroke-sage-300",
    bg: "bg-sage-300/10",
    border: "border-sage-300/30",
  },
};

export function ThermalTimer({
  title,
  subtitle,
  defaultSeconds,
  minSeconds,
  maxSeconds,
  step,
  accent,
}: Props) {
  const palette = ACCENT_CLASS[accent];
  const [target, setTarget] = useState(defaultSeconds);
  const [remaining, setRemaining] = useState(defaultSeconds);
  const [running, setRunning] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      if (tick.current) clearInterval(tick.current);
      return;
    }
    tick.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          // Beep visual: silencio + flashing manejado en CSS
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [running]);

  const adjust = (delta: number) => {
    if (running) return;
    const next = Math.max(minSeconds, Math.min(maxSeconds, target + delta));
    setTarget(next);
    setRemaining(next);
  };

  const start = () => {
    if (remaining === 0) setRemaining(target);
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(target);
  };

  const progress = ((target - remaining) / target) * 100;
  const done = remaining === 0 && !running;

  return (
    <div className={cn("border rounded-sm overflow-hidden", palette.border)}>
      <header className={cn("px-4 py-3", palette.bg)}>
        <p className={cn("eyebrow", palette.text)}>{title}</p>
        <p className="text-xs text-bone-300 mt-1 leading-relaxed">{subtitle}</p>
      </header>

      <div className="p-5 flex items-center gap-5">
        {/* Anillo */}
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className="stroke-ink-800"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className={palette.ring}
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className={cn(
                "font-mono text-base tabular",
                done ? palette.text + " animate-pulse" : "text-bone-100",
              )}
            >
              {formatTime(remaining)}
            </p>
          </div>
        </div>

        {/* Controles */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => adjust(-step)}
              disabled={running || target <= minSeconds}
              className="w-8 h-8 border border-ink-700 rounded-sm text-bone-300 hover:border-ink-600 disabled:opacity-30"
              aria-label="Restar"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <p className="font-mono text-xs tabular text-bone-300">
                {formatTime(target)}
              </p>
            </div>
            <button
              onClick={() => adjust(step)}
              disabled={running || target >= maxSeconds}
              className="w-8 h-8 border border-ink-700 rounded-sm text-bone-300 hover:border-ink-600 disabled:opacity-30"
              aria-label="Sumar"
            >
              +
            </button>
          </div>
          <div className="flex gap-2">
            {!running ? (
              <button
                onClick={start}
                className={cn(
                  "flex-1 py-2 rounded-sm font-mono text-xs uppercase tracking-widest",
                  palette.bg,
                  palette.text,
                  "border",
                  palette.border,
                )}
              >
                {done ? "Reiniciar" : "Iniciar"}
              </button>
            ) : (
              <button
                onClick={pause}
                className="flex-1 py-2 rounded-sm font-mono text-xs uppercase tracking-widest border border-ink-700 text-bone-200"
              >
                Pausar
              </button>
            )}
            <button
              onClick={reset}
              className="px-3 py-2 rounded-sm font-mono text-xs uppercase tracking-widest text-bone-400 hover:text-bone-200"
            >
              ↻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
