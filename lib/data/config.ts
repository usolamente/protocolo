import type {
  Adherence,
  Language,
  Somatotype,
  Verbosity,
} from "../types";

// ─────────────────────────────────────────────────────────
// Idiomas
// ─────────────────────────────────────────────────────────
export const LANGUAGES: {
  value: Language;
  label: string;
  native: string;
  flag: string;
}[] = [
  { value: "cat", label: "Català", native: "Català", flag: "Cat" },
  { value: "cast", label: "Castellano", native: "Castellano", flag: "Cast" },
  { value: "eng", label: "English", native: "English", flag: "Eng" },
];

// ─────────────────────────────────────────────────────────
// Somatotipos (Sheldon) — ajustan dieta y entrenamiento
// ─────────────────────────────────────────────────────────
export interface SomatotypeProfile {
  value: Somatotype;
  label: string;
  tagline: string;
  description: string;
  /** Multiplicador conceptual de carbohidrato en la dieta. */
  carbBias: "alto" | "medio" | "bajo";
  /** Nota de dieta que se muestra en la pestaña Hoy. */
  dietNote: string;
  /** Nota de entrenamiento que se muestra en Pesas/Spartan. */
  trainingNote: string;
}

export const SOMATOTYPES: SomatotypeProfile[] = [
  {
    value: "ectomorfo",
    label: "Ectomorfo",
    tagline: "Metabolismo rápido · le cuesta ganar",
    description:
      "Complexión delgada, extremidades largas, poca grasa. Quema calorías rápido y le cuesta ganar masa.",
    carbBias: "alto",
    dietNote:
      "Superávit calórico: raciones generosas de carbohidrato complejo (avena, arroz, boniato) y comidas frecuentes. No temas las calorías densas.",
    trainingNote:
      "Prioriza fuerza pesada con rangos de 5–8 repeticiones y descansos largos. Limita el cardio para no quemar el superávit.",
  },
  {
    value: "mesomorfo",
    label: "Mesomorfo",
    tagline: "Equilibrado · gana músculo con facilidad",
    description:
      "Complexión atlética, hombros anchos, metabolismo de ritmo normal. Responde bien a casi cualquier estímulo.",
    carbBias: "medio",
    dietNote:
      "Dieta equilibrada: proteína alta, carbohidrato moderado alrededor del entreno y grasas saludables. El plan base te encaja tal cual.",
    trainingNote:
      "El plan 5×5 y el circuito tal cual. Alterna fuerza e hipertrofia y mantén algo de cardio para el fondo deportivo.",
  },
  {
    value: "endomorfo",
    label: "Endomorfo",
    tagline: "Acumula grasa · gana fuerza fácil",
    description:
      "Complexión robusta, estructura ancha. Gana fuerza con facilidad pero tiende a acumular grasa.",
    carbBias: "bajo",
    dietNote:
      "Control del carbohidrato: concéntralo alrededor del entreno y los partidos. Más proteína magra, verdura y grasas saludables; vigila las raciones densas.",
    trainingNote:
      "Añade densidad metabólica: circuitos, supersets y más cardio regular junto a la fuerza para maximizar el gasto calórico.",
  },
];

export const SOMATOTYPE_MAP: Record<Somatotype, SomatotypeProfile> =
  Object.fromEntries(SOMATOTYPES.map((s) => [s.value, s])) as Record<
    Somatotype,
    SomatotypeProfile
  >;

// ─────────────────────────────────────────────────────────
// Modos de adherencia
// ─────────────────────────────────────────────────────────
export interface AdherenceProfile {
  value: Adherence;
  label: string;
  tagline: string;
  description: string;
  /** Cuántas rutinas puede ocultar por día. Infinity = sin límite. */
  hideLimit: number;
  /** Permite marcar comidas/series como saltadas sin romper rachas. */
  allowSkip: boolean;
  /** El reto perdona días sin completar. */
  forgiving: boolean;
}

export const ADHERENCES: AdherenceProfile[] = [
  {
    value: "disciplina",
    label: "Disciplina",
    tagline: "Todo a rajatabla",
    description:
      "Sigues el protocolo al completo. Nada se oculta, el reto no perdona días y cada recomendación está a la vista. Máxima exigencia.",
    hideLimit: 0,
    allowSkip: false,
    forgiving: false,
  },
  {
    value: "equilibrio",
    label: "Equilibrio",
    tagline: "Sigues, pero con margen",
    description:
      "Cumples la mayoría, con flexibilidad. Puedes ocultar alguna rutina que no encaje y saltarte comidas puntuales sin culpa. El reto te perdona algún día.",
    hideLimit: 2,
    allowSkip: true,
    forgiving: true,
  },
  {
    value: "flujo",
    label: "Flujo",
    tagline: "Tú marcas el ritmo",
    description:
      "Haces lo que te apetece del plan. Ocultas y reordenas lo que quieras, sin presión ni recordatorios. La app es una sugerencia, no una obligación.",
    hideLimit: Infinity,
    allowSkip: true,
    forgiving: true,
  },
];

export const ADHERENCE_MAP: Record<Adherence, AdherenceProfile> =
  Object.fromEntries(ADHERENCES.map((a) => [a.value, a])) as Record<
    Adherence,
    AdherenceProfile
  >;

// ─────────────────────────────────────────────────────────
// Verbosidad
// ─────────────────────────────────────────────────────────
export const VERBOSITY_LABELS: Record<Verbosity, string> = {
  verbose: "Guiado",
  synthetic: "Directo",
};
