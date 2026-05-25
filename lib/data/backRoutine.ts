/**
 * Rutina de cuidado de espalda — destilada de protocolos de corrección
 * postural (báscula pélvica, McKenzie, McGill Big 3, retracción escapular).
 * Contenido propio, redactado como guía accionable. NO sustituye criterio
 * médico: ante dolor agudo o irradiado, detener y consultar.
 *
 * Estructura en 4 fases progresivas que replican una sesión completa:
 *  1. Respiración + conciencia pélvica (decúbito supino)
 *  2. Movilidad articular (cuadrupedia y prono)
 *  3. Fortalecimiento del core (puente, bird-dog)
 *  4. Columna dorsal y postura (escápulas, pared)
 */

export type BackPhaseId = "respiracion" | "movilidad" | "core" | "postura";

export interface BackExercise {
  name: string;
  /** Pauta breve: series/reps o tiempo. */
  dose: string;
  /** Ejecución en una o dos frases. */
  how: string;
  /** Segundos de temporizador si aplica (isométricos/estáticos). */
  timer?: number;
}

export interface BackPhase {
  id: BackPhaseId;
  label: string;
  tagline: string;
  position: string;
  exercises: BackExercise[];
}

export const BACK_ROUTINE: BackPhase[] = [
  {
    id: "respiracion",
    label: "Fase 1 · Respiración y pelvis",
    tagline: "Despertar neuromotor",
    position: "Tumbado boca arriba, rodillas flexionadas",
    exercises: [
      {
        name: "Respiración diafragmática",
        dose: "10 ciclos",
        how: "Manos sobre el vientre. Inspira por la nariz inflando el abdomen; exhala lento por la boca hundiendo el ombligo. Relaja el psoas y baja el estrés simpático.",
        timer: 90,
      },
      {
        name: "Báscula pélvica",
        dose: "10 repeticiones · 5-10 s",
        how: "Al exhalar, lleva el ombligo hacia dentro y aplana la curva lumbar contra el suelo, contrayendo glúteos. Mantén sin bloquear la respiración y relaja.",
      },
      {
        name: "Rodillas al pecho",
        dose: "20-30 s por lado",
        how: "Atrae una rodilla al pecho con las manos, respiración relajada; alterna y termina con ambas rodillas. Abre los espacios vertebrales y libera la fascia lumbar.",
        timer: 30,
      },
    ],
  },
  {
    id: "movilidad",
    label: "Fase 2 · Movilidad",
    tagline: "Nutrir y lubricar",
    position: "Cuadrupedia y boca abajo",
    exercises: [
      {
        name: "Gato-camello",
        dose: "5-10 ciclos",
        how: "En cuadrupedia, arquea la espalda hacia el techo (barbilla al pecho) y luego deja caer el abdomen mirando al frente. Movimiento fluido, sin dolor: bombea líquido a las articulaciones.",
      },
      {
        name: "Postura de descanso",
        dose: "20-30 s",
        how: "Desde cuadrupedia, lleva los glúteos hacia los talones y deja caer el torso, brazos estirados al frente. Tracción suave de toda la zona lumbodorsal.",
        timer: 30,
      },
      {
        name: "Esfinge (extensión McKenzie)",
        dose: "ciclos de 20 s",
        how: "Boca abajo sobre los antebrazos, caderas y piernas relajadas en el suelo. Eleva el tronco induciendo una lordosis suave. Ideal si el dolor mejora con la extensión.",
        timer: 20,
      },
    ],
  },
  {
    id: "core",
    label: "Fase 3 · Core",
    tagline: "Rigidez protectora (McGill)",
    position: "Suelo, control isométrico",
    exercises: [
      {
        name: "Puente de glúteo",
        dose: "3 × 10",
        how: "Boca arriba, rodillas flexionadas. Pre-contrae el glúteo y eleva la pelvis vértebra a vértebra hasta una línea recta rodilla-cadera-hombro. Sin hiperextender la lumbar.",
      },
      {
        name: "Bird-dog",
        dose: "6-10 reps · 6-30 s",
        how: "En cuadrupedia, extiende un brazo y la pierna contraria en línea con el tronco, ombligo hundido, sin rotar la pelvis. Co-contracción antirrotación. Alterna lados.",
        timer: 10,
      },
      {
        name: "Plancha lateral modificada",
        dose: "2-3 × 10-20 s por lado",
        how: "Apoyo sobre antebrazo y rodillas flexionadas. Sube la cadera y mantén el tronco firme. Activa cuadrado lumbar y oblicuos sin cargar la columna.",
        timer: 15,
      },
    ],
  },
  {
    id: "postura",
    label: "Fase 4 · Postura",
    tagline: "Columna dorsal y escápulas",
    position: "Sentado o de pie",
    exercises: [
      {
        name: "Retracción de escápulas",
        dose: "10 reps · 3-5 s",
        how: "Erguido, lleva los hombros atrás juntando los omóplatos como si sujetaras algo entre ellos. Reeduca contra la chepa postural. Puedes hacerlo en la silla de oficina.",
      },
      {
        name: "Estiramiento pectoral, manos en nuca",
        dose: "5 reps · 5-10 s",
        how: "Manos entrelazadas tras la nuca, lleva los codos atrás abriendo el pecho y juntando escápulas. Libera la retracción pectoral del trabajo de pantalla.",
        timer: 10,
      },
      {
        name: "Rectificación contra la pared",
        dose: "5-8 reps",
        how: "Talones, glúteos, espalda y nuca contra la pared. Exhala aplanando la lumbar contra el muro y empuja la nuca atrás sin levantar la barbilla. Avanzado: desliza a sentadilla.",
      },
    ],
  },
];

/** Aviso clínico (siempre visible en el módulo). */
export const BACK_DISCLAIMER =
  "Guía educativa de higiene postural, no un diagnóstico médico. Detén cualquier ejercicio que provoque dolor agudo o irradiado y consulta a un fisioterapeuta si el dolor persiste.";

/** Hábitos de higiene postural (recordatorios breves de la fase teórica). */
export const POSTURE_HABITS: { title: string; text: string }[] = [
  {
    title: "Escritorio",
    text: "Pantalla a la altura de los ojos, espalda apoyada en el respaldo con soporte lumbar, pies apoyados. Evita cruzar las piernas.",
  },
  {
    title: "Regla visual 20/20",
    text: "Cada 20 minutos frente a la pantalla, mira un punto lejano 20 segundos. Evita adelantar la cabeza por fatiga visual.",
  },
  {
    title: "Levantar peso",
    text: "Dobla rodillas y caderas, columna vertical y abdomen firme. Empuja con piernas y glúteos, carga pegada al cuerpo, sin girar el tronco.",
  },
  {
    title: "Dormir",
    text: "Evita boca abajo. Boca arriba con un cojín bajo las rodillas, o de lado con un cojín entre las rodillas. Al levantarte, gira de lado primero.",
  },
];
