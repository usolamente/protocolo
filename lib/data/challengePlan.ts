import type { ChallengeDayTarget } from "../types";

/**
 * Reto 30 Días — 4 ejercicios diarios con progresión lineal.
 * Descanso obligatorio: 3, 7, 12, 18, 25 (especificados explícitamente).
 *
 * Progresión final (día 30):
 *   • Squats:   10 → 100
 *   • Plank:    20 s → 240 s (4 min)
 *   • Push-ups:  5 → 50  (alineado con la mención del PDF: 100 reps acumulativas en sábado)
 *   • Crunches: 15 → 75
 */

const REST_DAYS = new Set([3, 7, 12, 18, 25]);

function lerp(start: number, end: number, t: number): number {
  return Math.round(start + (end - start) * t);
}

function buildProgression(): ChallengeDayTarget[] {
  const days: ChallengeDayTarget[] = [];
  // Días activos del 1..30 excluyendo los de descanso
  const activeIndices: number[] = [];
  for (let i = 1; i <= 30; i++) {
    if (!REST_DAYS.has(i)) activeIndices.push(i);
  }
  const total = activeIndices.length - 1;

  for (let i = 1; i <= 30; i++) {
    if (REST_DAYS.has(i)) {
      days.push({
        day: i,
        rest: true,
        squats: 0,
        plank: 0,
        pushups: 0,
        crunches: 0,
      });
      continue;
    }
    const pos = activeIndices.indexOf(i);
    const t = pos / total; // 0..1
    days.push({
      day: i,
      rest: false,
      squats: lerp(10, 100, t),
      plank: lerp(20, 240, t),
      pushups: lerp(5, 50, t),
      crunches: lerp(15, 75, t),
    });
  }
  return days;
}

export const CHALLENGE_PLAN: ChallengeDayTarget[] = buildProgression();
