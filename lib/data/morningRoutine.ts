import type { MorningPhase } from "../types";

/**
 * Rutina matutina extraída del Protocolo Integral.
 * Ventana 06:50 – 08:30. Capítulo "Análisis de la Secuencia Temporal Matutina Estándar".
 */
export const MORNING_PHASES: MorningPhase[] = [
  {
    start: "06:50",
    end: "07:00",
    label: "Neurocognitivo",
    detail:
      "Diario estoico, visualización, respiración 3-6. Regulación del cortisol al despertar.",
    kind: "neuro",
  },
  {
    start: "07:00",
    end: "07:15",
    label: "Elasticidad y Yoga",
    detail:
      "Gato-Vaca, estiramiento lateral, Prasarita Padottanasana, movilidad articular.",
    kind: "yoga",
  },
  {
    start: "07:15",
    end: "07:20",
    label: "Tránsito",
    detail: "Caminata al gimnasio (5 minutos). Capilarización periférica.",
    kind: "transit",
  },
  {
    start: "07:20",
    end: "08:05",
    label: "Hipertrofia",
    detail:
      "Resistencia y calistenia según división del día. Tensión mecánica + estrés metabólico.",
    kind: "lift",
  },
  {
    start: "08:05",
    end: "08:10",
    label: "Transición Neural",
    detail: "Hidratación sistémica, desaceleración cardíaca antes del calor.",
    kind: "transition",
  },
  {
    start: "08:10",
    end: "08:25",
    label: "Sauna Seca",
    detail:
      "12–15 min · 80-100 °C. Pico de HGH, proteínas de choque térmico, reparación tisular.",
    kind: "sauna",
  },
  {
    start: "08:25",
    end: "08:30",
    label: "Piscina templada",
    detail:
      "22–26 °C. Presión hidrostática para retorno linfático. Sin frío severo (preserva mTOR).",
    kind: "pool",
  },
];
