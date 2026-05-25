"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { useProtocolStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface SessionPoint {
  date: string;
  topWeight: number; // peso máximo levantado ese día
  topReps: number; // reps en esa serie tope
}

export function StrengthHistory() {
  const log = useProtocolStore((s) => s.log);
  const [open, setOpen] = useState(false);

  // Agrupa por ejercicio: para cada día, la serie de mayor peso.
  const byExercise = new Map<
    string,
    { name: string; points: SessionPoint[] }
  >();

  // log ordenado por fecha ascendente
  const ordered = [...log].sort((a, b) => a.date.localeCompare(b.date));
  for (const entry of ordered) {
    for (const ex of entry.exercises) {
      if (ex.sets.length === 0) continue;
      const top = ex.sets.reduce((best, s) =>
        s.weight > best.weight ? s : best,
      );
      if (!byExercise.has(ex.id)) {
        byExercise.set(ex.id, { name: ex.name, points: [] });
      }
      byExercise.get(ex.id)!.points.push({
        date: entry.date,
        topWeight: top.weight,
        topReps: top.reps,
      });
    }
  }

  const exercises = Array.from(byExercise.values()).filter(
    (e) => e.points.length > 0,
  );

  return (
    <Card as="section">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <div>
          <p className="eyebrow text-sage-300">Progresión</p>
          <h2 className="font-display text-2xl font-light text-bone-50 mt-1 leading-tight">
            Historial de cargas
          </h2>
        </div>
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "w-5 h-5 text-bone-400 transition-transform shrink-0",
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
        <div className="mt-4 animate-fade-up">
          {exercises.length === 0 ? (
            <p className="text-sm text-bone-400 leading-relaxed">
              Aún no hay registros. A medida que apuntes series en tus
              entrenamientos, aquí verás cómo evoluciona el peso de cada
              ejercicio.
            </p>
          ) : (
            <ul className="space-y-5">
              {exercises.map((ex) => (
                <ExerciseProgress key={ex.name} {...ex} />
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
}

function ExerciseProgress({
  name,
  points,
}: {
  name: string;
  points: SessionPoint[];
}) {
  const max = Math.max(...points.map((p) => p.topWeight), 1);
  const first = points[0].topWeight;
  const last = points[points.length - 1].topWeight;
  const delta = last - first;
  // Solo los últimos 12 puntos para no saturar.
  const shown = points.slice(-12);

  return (
    <li>
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <p className="text-sm text-bone-100">{name}</p>
        <span
          className={cn(
            "font-mono text-[11px] tabular",
            delta > 0
              ? "text-sage-300"
              : delta < 0
                ? "text-clay-400"
                : "text-bone-400",
          )}
        >
          {delta > 0 ? "+" : ""}
          {delta} kg
        </span>
      </div>

      {/* Mini gráfico de barras */}
      <div className="flex items-end gap-1 h-16">
        {shown.map((p, i) => {
          const h = Math.max(8, Math.round((p.topWeight / max) * 100));
          const isLast = i === shown.length - 1;
          return (
            <div
              key={p.date + i}
              className="flex-1 flex flex-col items-center justify-end h-full"
              title={`${p.date}: ${p.topWeight} kg × ${p.topReps}`}
            >
              <span
                className={cn(
                  "w-full rounded-t-sm transition-colors",
                  isLast ? "bg-sage-400" : "bg-ink-700",
                )}
                style={{ height: `${h}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-mono text-[10px] text-bone-400 tabular">
          {first} kg
        </span>
        <span className="font-mono text-[10px] text-sage-300 tabular">
          {last} kg · hoy
        </span>
      </div>
    </li>
  );
}
