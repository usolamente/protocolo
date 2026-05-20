"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChallengeDayRow } from "@/components/challenge/ChallengeDayRow";
import { Card } from "@/components/ui/Card";
import { ModuleRole } from "@/components/layout/ModuleRole";
import { useProtocolStore } from "@/lib/store";
import { CHALLENGE_PLAN } from "@/lib/data/challengePlan";

export default function RetoPage() {
  const [mounted, setMounted] = useState(false);
  const startDate = useProtocolStore((s) => s.challengeStartDate);
  const start = useProtocolStore((s) => s.startChallenge);
  const reset = useProtocolStore((s) => s.resetChallenge);
  const challenge = useProtocolStore((s) => s.challenge);

  useEffect(() => setMounted(true), []);

  // Calcular día actual del reto
  let currentDay: number | null = null;
  if (mounted && startDate) {
    const diff = Math.floor(
      (Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
    );
    currentDay = Math.min(30, diff + 1);
  }

  // Conteo de check-ins globales (sin contar días de descanso)
  const totalSlots = CHALLENGE_PLAN.filter((d) => !d.rest).length * 4;
  const completedSlots = Object.entries(challenge).reduce((acc, [, exMap]) => {
    return acc + Object.values(exMap).filter(Boolean).length;
  }, 0);
  const progressPct = totalSlots > 0 ? (completedSlots / totalSlots) * 100 : 0;

  return (
    <>
      <PageHeader
        eyebrow="Calistenia"
        title="Reto 30 días"
        subtitle="Sentadillas, plancha, flexiones y abdominales. Descansos obligatorios cada cierto tramo."
        numeral="30"
      />

      <div className="px-5 py-6 space-y-5">
        <ModuleRole
          accent="sage"
          role="El reto diario de calistenia"
          text="Un añadido de volumen progresivo que sumas cada día, al margen del foco de pesas que veas en Hoy y Semana. Marca aquí las series a medida que las completas; los días de descanso del reto son obligatorios."
        />

        {/* Panel de progreso */}
        <Card>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="eyebrow text-bone-300">Progreso global</p>
              <p className="font-display text-3xl text-bone-50 mt-1 leading-none">
                {completedSlots}
                <span className="text-bone-400 text-lg">/{totalSlots}</span>
              </p>
            </div>
            <p className="font-mono text-sm tabular text-sage-300">
              {progressPct.toFixed(0)}%
            </p>
          </div>
          <div className="h-1 bg-ink-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sage-300 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {!startDate ? (
              <button onClick={start} className="btn btn-primary">
                Iniciar reto hoy
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-xs text-bone-300">
                  Día <span className="text-sage-300 font-mono tabular">{currentDay}</span> de 30
                </p>
                <button
                  onClick={() => {
                    if (confirm("¿Reiniciar todo el reto? Esto borra el progreso.")) {
                      reset();
                    }
                  }}
                  className="btn btn-ghost text-[10px]"
                >
                  Reiniciar
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Matriz */}
        <ol className="space-y-2.5">
          {CHALLENGE_PLAN.map((target) => (
            <li key={target.day}>
              <ChallengeDayRow
                target={target}
                isToday={mounted && currentDay === target.day}
              />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
