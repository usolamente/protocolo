// ─────────────────────────────────────────────────────────
// Tipos compartidos
// ─────────────────────────────────────────────────────────

export type WeekDay =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

export type FocusType =
  | "push"
  | "pull"
  | "calistenia"
  | "potencia"
  | "recuperacion"
  | "calistenia-avanzada"
  | "descanso";

export interface MorningPhase {
  start: string; // "06:50"
  end: string; // "07:00"
  label: string;
  detail: string;
  kind: "neuro" | "yoga" | "transit" | "lift" | "transition" | "sauna" | "pool";
}

export interface SportBlock {
  day: WeekDay;
  start: string;
  end: string;
  label: string;
  emoji: string;
}

export interface WorkBlock {
  day: WeekDay;
  start: string;
  end: string;
}

export type LoadKind = "weights" | "spartan" | "rest";

export interface DayPlan {
  day: WeekDay;
  label: string;
  focus: FocusType;
  focusLabel: string;
  description: string;
  /** Tipo de carga del día: indica qué se abre por defecto en la pestaña Entreno. */
  loadKind: LoadKind;
  exercises: ExerciseSpec[];
  sport?: SportBlock;
}

export interface ExerciseSpec {
  id: string;
  name: string;
  sets: string; // "5 x 5" o "3 x 8-12"
  load?: string; // "18-22 kg" o "Peso corporal"
  note?: string;
}

// ─────────────────────────────────────────────────────────
// Reto 30 días
// ─────────────────────────────────────────────────────────

export type ChallengeExercise = "squats" | "plank" | "pushups" | "crunches";

export interface ChallengeDayTarget {
  day: number;
  rest: boolean;
  squats: number;
  plank: number; // segundos
  pushups: number;
  crunches: number;
}

export type ChallengeProgress = Record<
  number,
  Partial<Record<ChallengeExercise, boolean>>
>;

// ─────────────────────────────────────────────────────────
// Spartan
// ─────────────────────────────────────────────────────────

export type SpartanLevel = 1 | 2 | 3;

export interface SpartanExercise {
  index: number;
  name: string; // nombre original (póster)
  nameEs: string; // nombre en español
  reps: string; // objetivo por ronda según póster (p.ej. "30", "6")
  cue: string; // indicación técnica breve
  image: string; // ruta a la ilustración recortada del póster
  duration: number; // segundos por intervalo
}

// ─────────────────────────────────────────────────────────
// Hipertrofia (logbook)
// ─────────────────────────────────────────────────────────

export interface LoggedSet {
  reps: number;
  weight: number; // kg
}

export interface LoggedExercise {
  id: string; // exerciseSpec.id
  name: string;
  sets: LoggedSet[];
}

export interface LogEntry {
  date: string; // ISO yyyy-mm-dd
  day: WeekDay;
  exercises: LoggedExercise[];
}

// ─────────────────────────────────────────────────────────
// Bienestar
// ─────────────────────────────────────────────────────────

export interface JournalEntry {
  date: string; // ISO yyyy-mm-dd
  stoic: string;
  serenity: string;
}

// ─────────────────────────────────────────────────────────
// Dieta
// ─────────────────────────────────────────────────────────

export type MealSlot =
  | "pre"
  | "post"
  | "desayuno"
  | "almuerzo"
  | "comida"
  | "merienda"
  | "cena";

export interface Meal {
  slot: MealSlot;
  time: string; // "06:40"
  title: string;
  items: string[];
  kind: "shake" | "meal";
  note?: string;
}

export interface ShoppingCategory {
  category: string;
  items: { name: string; qty: string }[];
}

// ─────────────────────────────────────────────────────────
// Actividad complementaria (registrada por día)
// ─────────────────────────────────────────────────────────

export type Activity =
  | "none"
  | "correr"
  | "futbol"
  | "basket"
  | "escalar"
  | "varios";

// ─────────────────────────────────────────────────────────
// Configuración del usuario (pantalla de bienvenida)
// ─────────────────────────────────────────────────────────

/** Idioma de la interfaz. (Traducciones reales en una fase posterior.) */
export type Language = "cat" | "cast" | "eng";

/**
 * Somatotipo (clasificación de Sheldon), reducido a tres perfiles que
 * ajustan dieta y entrenamiento:
 *  - ectomorfo: metabolismo rápido, le cuesta ganar → más carbohidrato/calorías.
 *  - mesomorfo: equilibrado → plan base.
 *  - endomorfo: tiende a acumular grasa → control de carbohidrato, más cardio.
 */
export type Somatotype = "ectomorfo" | "mesomorfo" | "endomorfo";

/**
 * Modo de adherencia:
 *  - disciplina: todo a rajatabla (app completa, sin ocultar nada).
 *  - equilibrio: puedes ocultar algunas rutinas y saltarte comidas.
 *  - flujo: ocultas/editas lo que quieras, sin presión.
 */
export type Adherence = "disciplina" | "equilibrio" | "flujo";

/** Densidad de explicaciones: verboso (guiado) o sintético (directo). */
export type Verbosity = "verbose" | "synthetic";

export interface UserConfig {
  configured: boolean;
  language: Language;
  somatotype: Somatotype;
  adherence: Adherence;
  verbosity: Verbosity;
}
