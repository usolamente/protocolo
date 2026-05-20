import type { SpartanExercise, SpartanLevel } from "../types";

/**
 * Circuito Spartan J.E.D. — 15 ejercicios secuenciales (HIIT).
 * Duración por intervalo: 30 s · Descanso entre rondas: hasta 120 s.
 * Las ilustraciones (public/spartan/ex-NN.jpg) están recortadas del
 * póster original del circuito, una por ejercicio.
 */

export const SPARTAN_CIRCUIT: SpartanExercise[] = [
  {
    index: 1,
    name: "High knees",
    nameEs: "Rodillas altas",
    reps: "30",
    cue: "Corre en el sitio llevando las rodillas a la altura de la cadera, ritmo alto y brazos activos.",
    image: "/spartan/ex-01.jpg",
    duration: 30,
  },
  {
    index: 2,
    name: "Alt plank leg/arm raises",
    nameEs: "Plancha con elevación alterna",
    reps: "10",
    cue: "En plancha, eleva a la vez un brazo y la pierna contraria sin rotar la cadera. Alterna lados.",
    image: "/spartan/ex-02.jpg",
    duration: 30,
  },
  {
    index: 3,
    name: "Rocket jumps",
    nameEs: "Saltos cohete",
    reps: "15",
    cue: "Desde media sentadilla, salta explosivo estirando todo el cuerpo y los brazos hacia arriba.",
    image: "/spartan/ex-03.jpg",
    duration: 30,
  },
  {
    index: 4,
    name: "Spiderman push-ups",
    nameEs: "Flexiones Spiderman",
    reps: "6",
    cue: "Flexión llevando la rodilla hacia el codo del mismo lado en la bajada. Alterna en cada repetición.",
    image: "/spartan/ex-04.jpg",
    duration: 30,
  },
  {
    index: 5,
    name: "Jump knee tucks",
    nameEs: "Saltos rodillas al pecho",
    reps: "15",
    cue: "Salta llevando ambas rodillas al pecho y aterriza suave, amortiguando con las piernas.",
    image: "/spartan/ex-05.jpg",
    duration: 30,
  },
  {
    index: 6,
    name: "Push-ups",
    nameEs: "Flexiones",
    reps: "5",
    cue: "Flexión clásica: cuerpo recto en línea, baja hasta casi tocar el suelo, codos cerca del torso.",
    image: "/spartan/ex-06.jpg",
    duration: 30,
  },
  {
    index: 7,
    name: "Squats",
    nameEs: "Sentadillas",
    reps: "15",
    cue: "Sentadilla a profundidad, pecho alto, rodillas siguiendo la punta del pie, peso en los talones.",
    image: "/spartan/ex-07.jpg",
    duration: 30,
  },
  {
    index: 8,
    name: "Climbers",
    nameEs: "Escaladores",
    reps: "10",
    cue: "En plancha, lleva las rodillas al pecho alternando rápido, manteniendo la cadera baja.",
    image: "/spartan/ex-08.jpg",
    duration: 30,
  },
  {
    index: 9,
    name: "Plank jump-ins",
    nameEs: "Plancha con salto a cuclillas",
    reps: "10",
    cue: "Desde plancha, salta llevando los pies junto a las manos y vuelve atrás de un salto.",
    image: "/spartan/ex-09.jpg",
    duration: 30,
  },
  {
    index: 10,
    name: "Front kicks",
    nameEs: "Patadas frontales",
    reps: "20",
    cue: "Patada frontal alternando piernas, core firme y guardia arriba. Recoge la pierna al bajar.",
    image: "/spartan/ex-10.jpg",
    duration: 30,
  },
  {
    index: 11,
    name: "Punches",
    nameEs: "Puñetazos",
    reps: "40",
    cue: "Puñetazos rectos alternos a ritmo de boxeo, rota ligeramente el tronco y mantén la guardia.",
    image: "/spartan/ex-11.jpg",
    duration: 30,
  },
  {
    index: 12,
    name: "Side kicks",
    nameEs: "Patadas laterales",
    reps: "20",
    cue: "Patada lateral alternando piernas, mantén el equilibrio y el abdomen activo.",
    image: "/spartan/ex-12.jpg",
    duration: 30,
  },
  {
    index: 13,
    name: "Knee crunches",
    nameEs: "Crunch de rodilla",
    reps: "20",
    cue: "Tumbado, lleva rodillas y tronco al centro contrayendo el abdomen; baja con control.",
    image: "/spartan/ex-13.jpg",
    duration: 30,
  },
  {
    index: 14,
    name: "Knee-to-elbow",
    nameEs: "Rodilla al codo",
    reps: "40",
    cue: "De pie, lleva la rodilla al codo contrario alternando; trabaja los oblicuos con ritmo.",
    image: "/spartan/ex-14.jpg",
    duration: 30,
  },
  {
    index: 15,
    name: "Reverse plank kicks",
    nameEs: "Patadas en plancha invertida",
    reps: "10",
    cue: "En plancha invertida (mirando arriba), patea una pierna hacia el techo alternando. Cadera alta.",
    image: "/spartan/ex-15.jpg",
    duration: 30,
  },
];

export const SPARTAN_LEVELS: Record<
  SpartanLevel,
  { label: string; sets: number; note: string }
> = {
  1: {
    label: "Nivel I",
    sets: 2,
    note: "Iniciación · 2 rondas completas del circuito",
  },
  2: {
    label: "Nivel II",
    sets: 3,
    note: "Intermedio · 3 rondas",
  },
  3: {
    label: "Nivel III",
    sets: 4,
    note: "Avanzado · 4 rondas",
  },
};

export const SPARTAN_REST_MAX = 120; // segundos
