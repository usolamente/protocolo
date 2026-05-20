/**
 * Mapeo de los ejercicios del plan (weekPlan) a ilustraciones de demostración
 * de free-exercise-db (https://github.com/yuhonas/free-exercise-db),
 * un dataset de DOMINIO PÚBLICO. Las imágenes se enlazan directamente desde
 * GitHub (raw) — no se empaquetan en la app — y el service worker las cachea
 * tras la primera carga con conexión.
 *
 * Cada entrada tiene 1-2 frames (posición inicial / final) que la ficha
 * alterna para simular el movimiento, como un gif.
 *
 * Algunos ejercicios del plan no son movimientos con demostración estándar
 * (yoga, sauna, meditación, retos compuestos): esos quedan sin imagen y la
 * ficha muestra solo el texto.
 */

const BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

const frames = (id: string, n = 2): string[] =>
  Array.from({ length: n }, (_, i) => `${BASE}/${id}/${i}.jpg`);

export interface ExerciseGif {
  /** Nombre del ejercicio de referencia en la base de datos (informativo). */
  ref: string;
  /** Frames a alternar (1-2 imágenes). */
  images: string[];
}

/** id del plan → ilustración. Si no está, no hay imagen para ese ejercicio. */
export const EXERCISE_GIFS: Record<string, ExerciseGif> = {
  // ── Lunes · empuje ──
  "mon-bench": { ref: "Barbell Bench Press", images: frames("Barbell_Bench_Press_-_Medium_Grip") },
  "mon-ohp-uni": { ref: "Standing Dumbbell Press", images: frames("Standing_Dumbbell_Press") },
  "mon-pushup-challenge": { ref: "Pushups", images: frames("Pushups") },
  "mon-cable-lat": { ref: "Cable Lateral Raise", images: frames("Side_Lateral_Raise") },
  // mon-mcgill: tríada compuesta, sin demostración única

  // ── Martes · tracción ──
  "tue-pullover": { ref: "Dumbbell Pullover", images: frames("Bent-Arm_Dumbbell_Pullover") },
  "tue-chinups": { ref: "Chin-Up", images: frames("Chin-Up") },
  "tue-db-row": { ref: "One-Arm Dumbbell Row", images: frames("One-Arm_Dumbbell_Row") },
  "tue-face-pulls": { ref: "Face Pull", images: frames("Face_Pull") },
  "tue-band-curl": { ref: "Band Curl", images: frames("Standing_Biceps_Cable_Curl") },

  // ── Miércoles · calistenia ──
  "wed-plank-challenge": { ref: "Plank", images: frames("Plank", 1) },
  "wed-aus-pullups": { ref: "Inverted Row", images: frames("Inverted_Row") },
  "wed-pike-pushups": { ref: "Pike Pushup", images: frames("Pushups_-_Close_Triceps_Position") },
  "wed-cossack": { ref: "Cossack Squat / Side Lunge", images: frames("Side_Lunge") },

  // ── Jueves · potencia ──
  "thu-weighted-pullups": { ref: "Weighted Pull-Up", images: frames("Pullups") },
  "thu-mil-press": { ref: "Standing Military Press", images: frames("Standing_Military_Press") },
  "thu-inverted-rows": { ref: "Inverted Row", images: frames("Inverted_Row") },
  "thu-front-raise": { ref: "Front Dumbbell Raise", images: frames("Front_Dumbbell_Raise") },

  // ── Viernes · recuperación ──
  // fri-yoga, fri-sauna-pool: sin demostración de fuerza
  "fri-tri-extension": { ref: "Triceps Pushdown", images: frames("Triceps_Pushdown") },
  "fri-scott-curl": { ref: "Preacher Curl", images: frames("Preacher_Curl") },

  // ── Sábado · calistenia avanzada ──
  "sat-dips": { ref: "Dips - Triceps", images: frames("Dips_-_Triceps_Version") },
  "sat-muscle-ups": { ref: "Muscle Up", images: frames("Muscle_Up") },
  "sat-pushup-acc": { ref: "Pushups", images: frames("Pushups") },
  "sat-lsit": { ref: "Hanging Leg Raise (L-Sit)", images: frames("Hanging_Leg_Raise") },

  // sun-*: meditación / estiramiento, sin demostración
};

export function getExerciseGif(id: string): ExerciseGif | null {
  return EXERCISE_GIFS[id] ?? null;
}
