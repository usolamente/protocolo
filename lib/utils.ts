import type { WeekDay, Activity } from "./types";

/** Combinador clsx-style mínimo, sin dependencias. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const WEEK_DAYS: WeekDay[] = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

export const WEEK_LABELS: Record<WeekDay, string> = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
  domingo: "Domingo",
};

export const WEEK_SHORT: Record<WeekDay, string> = {
  lunes: "L",
  martes: "M",
  miercoles: "X",
  jueves: "J",
  viernes: "V",
  sabado: "S",
  domingo: "D",
};

/** Devuelve el día semana actual en clave interna (lunes-domingo). */
export function currentWeekDay(date = new Date()): WeekDay {
  const map: WeekDay[] = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];
  return map[date.getDay()];
}

/** ISO yyyy-mm-dd en zona local. */
export function toISODate(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Formatea segundos como mm:ss. */
export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

/** Padding numérico bonito para tipografía editorial. */
export function num(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

/** Catálogo de actividades complementarias. */
export const ACTIVITIES: { value: Activity; label: string; emoji: string }[] = [
  { value: "none", label: "Sin actividad", emoji: "—" },
  { value: "correr", label: "Correr", emoji: "🏃" },
  { value: "futbol", label: "Fútbol", emoji: "⚽" },
  { value: "basket", label: "Básket", emoji: "🏀" },
  { value: "escalar", label: "Escalar", emoji: "🧗" },
  { value: "varios", label: "Deportes varios", emoji: "🤸" },
];

export const ACTIVITY_META: Record<Activity, { label: string; emoji: string }> =
  Object.fromEntries(
    ACTIVITIES.map((a) => [a.value, { label: a.label, emoji: a.emoji }]),
  ) as Record<Activity, { label: string; emoji: string }>;

/** Mapea cada día de la semana actual (lunes-domingo) a su fecha ISO. */
export function currentWeekDates(ref = new Date()): Record<WeekDay, string> {
  const d = new Date(ref);
  // getDay(): 0=domingo … 6=sábado. Queremos lunes como inicio.
  const dow = (d.getDay() + 6) % 7; // 0=lunes … 6=domingo
  const monday = new Date(d);
  monday.setDate(d.getDate() - dow);
  const result = {} as Record<WeekDay, string>;
  WEEK_DAYS.forEach((day, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    result[day] = toISODate(date);
  });
  return result;
}
