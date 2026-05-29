import type { DayPlan, SportBlock, WorkBlock } from "../types";

// ─────────────────────────────────────────────────────────
// Bloques laborales y deportivos (no editables)
// ─────────────────────────────────────────────────────────

export const WORK_BLOCKS: WorkBlock[] = [
  { day: "lunes", start: "09:00", end: "14:00" },
  { day: "martes", start: "15:00", end: "21:00" },
];

export const SPORT_BLOCKS: SportBlock[] = [
  {
    day: "miercoles",
    start: "19:00",
    end: "20:30",
    label: "Pádel",
    emoji: "🎾",
  },
  {
    day: "jueves",
    start: "21:00",
    end: "22:00",
    label: "Fútbol",
    emoji: "⚽",
  },
];

// ─────────────────────────────────────────────────────────
// Plan semanal — datos extraídos íntegramente del PDF
// ─────────────────────────────────────────────────────────

export const WEEK_PLAN: DayPlan[] = [
  // ── LUNES ──────────────────────────────────────────────
  {
    day: "lunes",
    label: "Lunes",
    focus: "push",
    focusLabel: "Empuje · Pectoral · Core",
    loadKind: "weights",
    description:
      "SNC fresco tras el domingo. Fuerza absoluta con press de banca 5×5, después estímulo metabólico con flexiones y aislamiento del deltoides medial.",
    exercises: [
      {
        id: "mon-bench",
        name: "Press de Banca con Barra",
        sets: "5 × 5",
        load: "18–22 kg/lado",
        note: "Fuerza absoluta, fibras tipo II",
      },
      {
        id: "mon-ohp-uni",
        name: "Press de Hombro Unilateral (DB)",
        sets: "3 × 6–8",
        load: "16–20 kg",
        note: "Estabilización antirotacional del core",
      },
      {
        id: "mon-pushup-challenge",
        name: "Reto de Flexiones (estándar · diamante · inclinada)",
        sets: "4 × 15–25",
        load: "Peso corporal",
        note: "Acumulación volumétrica · hipertrofia sarcoplásmica",
      },
      {
        id: "mon-cable-lat",
        name: "Elevaciones Laterales en Polea",
        sets: "3 × 15–20",
        load: "3–7.5 kg",
        note: "Tensión continua sobre deltoides medial",
      },
      {
        id: "mon-mcgill",
        name: 'Tríada "Big 3" de McGill',
        sets: "3 series",
        load: "Bird Dog · Plancha Lateral · Curl-up modificado",
        note: "Rigidez isométrica del core",
      },
    ],
  },

  // ── MARTES ─────────────────────────────────────────────
  {
    day: "martes",
    label: "Martes",
    focus: "pull",
    focusLabel: "Tracción · Espalda · Bíceps",
    loadKind: "weights",
    description:
      "Margen amplio antes del turno (15:00). Protocolo Yates/Huberman: bajo volumen, intensidad máxima al fallo. Pre-agotamiento dorsal antes de las dominadas.",
    exercises: [
      {
        id: "tue-pullover",
        name: "Pullover (DB) o Lat Pulldown",
        sets: "3 × 8–10",
        load: "25–32 kg",
        note: "Pre-agotamiento del dorsal sin bíceps",
      },
      {
        id: "tue-chinups",
        name: "Dominadas Supinadas",
        sets: "3 × 8–12",
        load: "Peso corporal (lastre opcional)",
        note: "Tracción vertical principal",
      },
      {
        id: "tue-db-row",
        name: "Remo con Mancuerna Unilateral",
        sets: "3 × 6–8",
        load: "28–32 kg (al fallo)",
        note: "Densidad muscular sin estrés espinal",
      },
      {
        id: "tue-face-pulls",
        name: "Face Pulls en Polea",
        sets: "3 × 15–25",
        load: "12–21 kg",
        note: "Rotación externa escapular, postura",
      },
      {
        id: "tue-band-curl",
        name: "Curl de Bíceps con Banda",
        sets: "3 × 12–15",
        load: "Resistencia media-alta",
        note: "Aislamiento distal con pico de contracción",
      },
    ],
  },

  // ── MIÉRCOLES ──────────────────────────────────────────
  {
    day: "miercoles",
    label: "Miércoles",
    focus: "calistenia",
    focusLabel: "Calistenia · Core · Movilidad",
    loadKind: "spartan",
    description:
      "Bisagra fisiológica para una tarde activa. Sin cargas pesadas: agilidad, resistencia relativa, movilidad de cadera y aductores.",
    exercises: [
      {
        id: "wed-plank-challenge",
        name: "Reto de Plancha (estándar · lateral · con toques)",
        sets: "4 × 60+ seg",
        load: "Peso corporal",
        note: "Transverso abdominal · torque rotacional",
      },
      {
        id: "wed-aus-pullups",
        name: "Dominadas Australianas",
        sets: "4 × 8–12",
        load: "Peso corporal · ajuste de ángulo",
        note: "Romboides y espalda media sin carga axial",
      },
      {
        id: "wed-pike-pushups",
        name: "Flexiones Pica (Pike Push-ups)",
        sets: "4 × 8–12",
        load: "Pies elevados",
        note: "Base para fuerza sobre la cabeza",
      },
      {
        id: "wed-cossack",
        name: "Sentadillas Cosaco / Zancadas Laterales",
        sets: "3 × 8–12",
        load: "Peso corporal a 16 kg",
        note: "Apertura mecánica de aductores",
      },
    ],
  },

  // ── JUEVES ─────────────────────────────────────────────
  {
    day: "jueves",
    label: "Jueves",
    focus: "potencia",
    focusLabel: "Potencia superior total",
    loadKind: "weights",
    description:
      "Fuerza bruta del tren superior. Cero trabajo de cuádriceps: el glucógeno de las piernas queda intacto por si toca deporte vespertino exigente.",
    exercises: [
      {
        id: "thu-weighted-pullups",
        name: "Dominadas Lastradas",
        sets: "4 × 5 · 1 × 8",
        load: "Hasta 8 kg de lastre",
        note: "Fibras de contracción rápida · dorsal",
      },
      {
        id: "thu-mil-press",
        name: "Press Militar de Pie con Barra",
        sets: "5 × 5",
        load: "14–22 kg",
        note: "Estabilidad anterior bajo carga",
      },
      {
        id: "thu-inverted-rows",
        name: "Remos Invertidos en Anillas / Barra baja",
        sets: "4 × 8–12",
        load: "Peso corporal",
        note: "Estabiliza escápula · protege manguito",
      },
      {
        id: "thu-front-raise",
        name: "Elevaciones Frontales y Press Sentado (DB)",
        sets: "3 × 8–10",
        load: "6–18 kg",
        note: "Contorno del hombro (Tennyson)",
      },
    ],
  },

  // ── VIERNES ────────────────────────────────────────────
  {
    day: "viernes",
    label: "Viernes",
    focus: "recuperacion",
    focusLabel: "Recuperación activa · Termoterapia",
    loadKind: "rest",
    description:
      "Día de microtrauma alto. Cero excéntricos pesados. Yoga extenso, aislamiento ligero de brazos y sauna prolongada.",
    exercises: [
      {
        id: "fri-yoga",
        name: "Flujo de Yoga Extenso",
        sets: "25 min",
        load: "Postura del Mono · Psoas profundo · asanas de suelo",
        note: "Restaura longitud de sarcómero",
      },
      {
        id: "fri-tri-extension",
        name: "Extensión de Tríceps en Polea",
        sets: "3 × 12–15",
        load: "Carga ligera-moderada",
        note: "Aislamiento sin estrés neural",
      },
      {
        id: "fri-scott-curl",
        name: "Curl de Bíceps Predicador (Press Scott)",
        sets: "3 × 12–15",
        load: "7 kg a fallo relativo",
        note: "Bíceps en posición elongada",
      },
      {
        id: "fri-sauna-pool",
        name: "Sesión Extendida Sauna + Piscina",
        sets: "25–30 min",
        load: "Terapia de contraste suave",
        note: "Proteínas de choque térmico (HSPs)",
      },
    ],
  },

  // ── SÁBADO ─────────────────────────────────────────────
  {
    day: "sabado",
    label: "Sábado",
    focus: "calistenia-avanzada",
    focusLabel: "Dominio anatómico calisténico",
    loadKind: "spartan",
    description:
      "SNC receptivo a volúmenes altos. Fondos, muscle-ups, retención isométrica. Finalizador acumulativo del reto.",
    exercises: [
      {
        id: "sat-dips",
        name: "Fondos (Dips) Lastrados o Libres",
        sets: "4 × 8–12",
        load: "Lastre progresivo",
        note: "Pectoral inferior + tríceps en masa",
      },
      {
        id: "sat-muscle-ups",
        name: "Muscle-Ups (o Negativas Controladas)",
        sets: "4 × 4–6",
        load: "Explosividad pura",
        note: "Transición tracción → empuje máximo",
      },
      {
        id: "sat-pushup-acc",
        name: "Reto 30 Días · Flexiones Acumulativas",
        sets: "100 reps totales",
        load: "Ej. 4 × 25",
        note: "Adaptación volumétrica extrema",
      },
      {
        id: "sat-lsit",
        name: "L-Sit (Retención Isométrica)",
        sets: "4 × 15 seg",
        load: "Barra o paralelas",
        note: "Compresión de cadera, abdomen inferior",
      },
    ],
  },

  // ── DOMINGO ────────────────────────────────────────────
  {
    day: "domingo",
    label: "Domingo",
    focus: "descanso",
    focusLabel: "Calibración mental · Supercompensación",
    loadKind: "rest",
    description:
      "Día de síntesis proteica. Prohibido hipertrofia o resistencia. Solo meditación profunda (escaneo corporal, 30 min) y estiramiento suave.",
    exercises: [
      {
        id: "sun-meditation",
        name: "Escaneo corporal · meditación profunda",
        sets: "30 min",
        load: "Sentado o tumbado",
        note: "Activación parasimpática completa",
      },
      {
        id: "sun-stretch",
        name: "Estiramiento suave global",
        sets: "15 min",
        load: "Identificar rigideces acumuladas",
        note: "Lectura del estado del microciclo",
      },
    ],
  },
];

/** Helper para encontrar el día actual del plan. */
export function getDayPlan(day: string) {
  return WEEK_PLAN.find((d) => d.day === day);
}
