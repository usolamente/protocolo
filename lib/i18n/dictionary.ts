import type { Language } from "../types";

/**
 * Diccionario de interfaz. Idioma fuente: INGLÉS (eng).
 * - eng: fuente de verdad y respaldo del sistema.
 * - cast: relleno (es como se redactó la app originalmente).
 * - cat: plantilla (cae a eng hasta traducirse).
 *
 * Estructura por secciones separadas con punto en la clave:
 *   nav.*        navegación inferior
 *   common.*     botones y palabras transversales
 *   onboarding.* pantalla de bienvenida
 *   home.*       pestaña Hoy
 *   week.*       pestaña Semana
 *   challenge.*  pestaña Reto
 *   spartan.*    pestaña Spartan
 *   weights.*    pestaña Pesas
 *   care.*       pestaña Cuidado
 *   diet.*       textos de dieta (interfaz, no el contenido de menús)
 *
 * El CONTENIDO de datos (menús, ejercicios, técnicas) se migra en una
 * segunda capa con su propio diccionario; aquí va la interfaz.
 */

type Dict = Record<string, string>;

const en: Dict = {
  // Navegación
  "nav.home": "Today",
  "nav.week": "Week",
  "nav.challenge": "Challenge",
  "nav.spartan": "Spartan",
  "nav.weights": "Weights",
  "nav.care": "Care",

  // Comunes
  "common.back": "Back",
  "common.next": "Next",
  "common.start": "Start",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.done": "Done",
  "common.skipped": "Skipped",
  "common.reset": "Reset",
  "common.close": "Close",
  "common.export": "Export",
  "common.import": "Import",
  "common.reconfigure": "Reconfigure",
  "common.day": "day",
  "common.days": "days",
  "common.sets": "sets",
  "common.rounds": "rounds",
  "common.technique": "Technique",
  "common.previous": "Previous",
  "common.exit": "Exit",

  // Onboarding
  "onboarding.hello": "Hello",
  "onboarding.body": "Your body",
  "onboarding.rhythm": "Your rhythm",
  "onboarding.langIntro": "Let's set up the app for you. Start by choosing a language.",
  "onboarding.bodyIntro": "Pick the somatotype that best describes you. We'll tune diet and training.",
  "onboarding.rhythmIntro": "How strictly do you want to follow the plan? You can change it anytime.",
  "onboarding.langNote": "The app currently ships fully in Spanish; Catalan and English arrive progressively. Your choice is saved.",
  "onboarding.begin": "Get started",

  // Hoy
  "home.eyebrow": "Protocol",
  "home.title": "Today",
  "home.subtitle": "Your daily plan: training focus, sport, diet and recovery.",
  "home.streak": "Adherence streak · keep it up",
  "home.streakInARow": "in a row",
  "home.howItWorks": "How does the app work?",
  "home.dietToday": "Today's diet · 5 meals + shakes",
  "home.antiInflammatory": "Anti-inflammatory focus",
  "home.morningWindow": "Morning window",

  // Semana
  "week.eyebrow": "Microcycle",
  "week.title": "Week",
  "week.subtitle": "Tap each day or the shopping list to expand them.",
  "week.shopping": "Shopping list",
  "week.shoppingSub": "This week's ingredients",
  "week.dayDiet": "Day's diet",

  // Reto
  "challenge.eyebrow": "Calisthenics",
  "challenge.title": "30-day challenge",
  "challenge.subtitle": "Squats, plank, push-ups and crunches. Mandatory rest every few days.",
  "challenge.role": "The daily calisthenics challenge",

  // Spartan
  "spartan.eyebrow": "J.E.D. Circuit",
  "spartan.title": "Spartan",
  "spartan.subtitle": "15-exercise HIIT. Tap any to see the illustration and technique.",
  "spartan.intensity": "Starting intensity",
  "spartan.sequence": "Sequence · tap for detail",
  "spartan.role": "The metabolic finisher",

  // Pesas
  "weights.eyebrow": "Hypertrophy",
  "weights.title": "Logbook",
  "weights.subtitle": "Log sets, reps and weight. Progressive overload week after week.",
  "weights.role": "The day's strength log",
  "weights.history": "Load history",
  "weights.progression": "Progression",
  "weights.noRecords": "No records yet. As you log sets in your workouts, you'll see how each exercise's weight evolves here.",

  // Cuidado
  "care.eyebrow": "Body · Mind · Recovery",
  "care.title": "Care",
  "care.subtitle": "Breathing and journaling before effort, heat after, and a routine to care for your back.",
  "care.role": "Your self-care space",
  "care.backTitle": "Back care",
  "care.postureHabits": "Postural hygiene · habits",
  "care.dataTitle": "Backup",
  "care.configTitle": "How the app is set",

  // Dieta (interfaz)
  "diet.disclaimer": "Indicative hypertrophy template, not medical advice. The menu rotates each week of the month; adjust amounts to your weight and daily activity.",
  "diet.activity": "Activity",
  "diet.before": "Before",
  "diet.after": "After",

  // Datos / configuración
  "data.yourConfig": "Your setup",
  "data.yourData": "Your data",
  "data.backupIntro": "Your progress is saved only on this phone. Export a copy to a file to keep in Files or Drive, and re-import it if you change device or reinstall.",
  "data.importReplaces": "Importing replaces current progress with the file's.",
  "data.exportOk": "Backup exported successfully.",
  "data.exportErr": "Could not export.",
  "data.importOk": "Data imported. Reload if you don't see changes.",
  "data.importErr": "Invalid file.",
  "data.readErr": "Could not read the file.",
  "config.language": "Language",
  "config.somatotype": "Somatotype",
  "config.mode": "Mode",
  "config.explanations": "Explanations",
  "config.guided": "Guided",
  "config.direct": "Direct",
  "config.reconfigureConfirm": "Go back to the welcome screen to reconfigure? Your progress is not deleted.",
  "challenge.roleText": "Progressive volume you add every day, on top of the weights focus you see in Today and Week. Mark the sets here as you complete them; the challenge's rest days are mandatory.",
  "weights.roleText": "It's the weights training shown as the focus in Today and Week (5\u00d75 MFQH plan). Log sets, reps and weight of each exercise here to ensure progressive overload week after week.",
  "spartan.roleText": "Your explosive conditioning session. It appears on power and recovery days in Today; it mirrors the cardiovascular demand of football and padel without trashing your legs for matches.",
  "care.roleText": "Brings together the morning routine (3-6 breathing and stoic journaling), thermal recovery (sauna and pool) and postural back care. It closes the protocol's circle of calm and recovery.",
  "howItWorks.title": "How does the app work?",
  "howItWorks.intro": "Today and Week are your map: what each day calls for (weights focus, sport, diet). The other four tabs are the tools you execute:",
  "howItWorks.challenge": "The 30-day calisthenics challenge (squats, plank, push-ups, crunches). A daily dose of progressive volume, independent of the day's focus.",
  "howItWorks.spartan": "The 15-exercise HIIT circuit. Your metabolic finisher on power days and to keep your base for padel and football.",
  "howItWorks.weights": "The log of the day's strength training (the one you see in Today and Week). Record sets, reps and weight to ensure progressive 5\u00d75 overload.",
  "howItWorks.care": "Your self-care: 3-6 breathing, stoic journaling, thermotherapy (sauna and pool) and a back routine. It closes the circle of recovery and calm.",
  "spartan.startCircuit": "Start circuit",
  "spartan.completed": "Completed.",
  "spartan.anotherRound": "Another round",
  "spartan.round": "Round",
  "spartan.rest": "Rest",
  "spartan.active": "Active",
  "spartan.catchBreath": "Catch your breath",
  "spartan.next": "Next",
  "spartan.startsRound": "Round starts",
  "spartan.resume": "Resume",
  "spartan.pause": "Pause",
};

// Castellano — relleno (redacción original de la app).
const es: Dict = {
  "nav.home": "Hoy",
  "nav.week": "Semana",
  "nav.challenge": "Reto",
  "nav.spartan": "Spartan",
  "nav.weights": "Pesas",
  "nav.care": "Cuidado",

  "common.back": "Atrás",
  "common.next": "Siguiente",
  "common.start": "Iniciar",
  "common.save": "Guardar",
  "common.cancel": "Cancelar",
  "common.done": "Hecha",
  "common.skipped": "Saltada",
  "common.reset": "Reiniciar",
  "common.close": "Cerrar",
  "common.export": "Exportar",
  "common.import": "Importar",
  "common.reconfigure": "Reconfigurar",
  "common.day": "día",
  "common.days": "días",
  "common.sets": "rondas",
  "common.rounds": "rondas",
  "common.technique": "Técnica",
  "common.previous": "Anterior",
  "common.exit": "Salir",

  "onboarding.hello": "Hola",
  "onboarding.body": "Tu cuerpo",
  "onboarding.rhythm": "Tu ritmo",
  "onboarding.langIntro": "Vamos a configurar la app a tu medida. Empecemos por el idioma.",
  "onboarding.bodyIntro": "Elige el somatotipo que mejor te describe. Ajustaremos la dieta y el entrenamiento.",
  "onboarding.rhythmIntro": "¿Con cuánta disciplina quieres seguir el plan? Podrás cambiarlo cuando quieras.",
  "onboarding.langNote": "De momento la app está en castellano. El catalán y el inglés llegarán progresivamente; tu elección se guardará.",
  "onboarding.begin": "Empezar",

  "home.eyebrow": "Protocolo",
  "home.title": "Hoy",
  "home.subtitle": "Tu plan del día: foco de entrenamiento, deporte, dieta y recuperación.",
  "home.streak": "Racha de adherencia · sigue así",
  "home.streakInARow": "seguidos",
  "home.howItWorks": "¿Cómo funciona la app?",
  "home.dietToday": "Dieta de hoy · 5 comidas + batidos",
  "home.antiInflammatory": "Enfoque antiinflamatorio",
  "home.morningWindow": "Ventana matutina",

  "week.eyebrow": "Microciclo",
  "week.title": "Semana",
  "week.subtitle": "Toca cada día o la compra para desplegarlos.",
  "week.shopping": "Lista de la compra",
  "week.shoppingSub": "Ingredientes de la semana",
  "week.dayDiet": "Dieta del día",

  "challenge.eyebrow": "Calistenia",
  "challenge.title": "Reto 30 días",
  "challenge.subtitle": "Sentadillas, plancha, flexiones y abdominales. Descansos obligatorios cada cierto tramo.",
  "challenge.role": "El reto diario de calistenia",

  "spartan.eyebrow": "Circuito J.E.D.",
  "spartan.title": "Spartan",
  "spartan.subtitle": "HIIT de 15 ejercicios. Toca cualquiera para ver la ilustración y la técnica.",
  "spartan.intensity": "Intensidad inicial",
  "spartan.sequence": "Secuencia · toca para el detalle",
  "spartan.role": "El finalizador metabólico",

  "weights.eyebrow": "Hipertrofia",
  "weights.title": "Logbook",
  "weights.subtitle": "Registra series, repeticiones y peso. Sobrecarga progresiva semana a semana.",
  "weights.role": "El registro de fuerza del día",
  "weights.history": "Historial de cargas",
  "weights.progression": "Progresión",
  "weights.noRecords": "Aún no hay registros. A medida que apuntes series en tus entrenamientos, aquí verás cómo evoluciona el peso de cada ejercicio.",

  "care.eyebrow": "Cuerpo · Mente · Recuperación",
  "care.title": "Cuidado",
  "care.subtitle": "Respiración y diario antes del esfuerzo, calor después, y una rutina para cuidar la espalda.",
  "care.role": "Tu espacio de autocuidado",
  "care.backTitle": "Cuidado de espalda",
  "care.postureHabits": "Higiene postural · hábitos",
  "care.dataTitle": "Copia de seguridad",
  "care.configTitle": "Cómo está la app",

  "diet.disclaimer": "Plantilla orientativa de hipertrofia, no una pauta médica. El menú rota cada semana del mes; ajusta cantidades a tu peso y a la actividad de cada día.",
  "diet.activity": "Actividad",
  "diet.before": "Antes",
  "diet.after": "Después",

  "data.yourConfig": "Tu configuración",
  "data.yourData": "Tus datos",
  "data.backupIntro": "Tu progreso se guarda solo en este teléfono. Exporta una copia en un archivo para guardarla en Archivos o Drive, y reimpórtala si cambias de dispositivo o reinstalas.",
  "data.importReplaces": "Importar sustituye el progreso actual por el del archivo.",
  "data.exportOk": "Copia exportada correctamente.",
  "data.exportErr": "No se pudo exportar.",
  "data.importOk": "Datos importados. Recarga si no ves los cambios.",
  "data.importErr": "Archivo no válido.",
  "data.readErr": "No se pudo leer el archivo.",
  "config.language": "Idioma",
  "config.somatotype": "Somatotipo",
  "config.mode": "Modo",
  "config.explanations": "Explicaciones",
  "config.guided": "Guiado",
  "config.direct": "Directo",
  "config.reconfigureConfirm": "¿Volver a la pantalla de bienvenida para reconfigurar? Tu progreso no se borra.",
  "challenge.roleText": "Un añadido de volumen progresivo que sumas cada día, al margen del foco de pesas que veas en Hoy y Semana. Marca aquí las series a medida que las completas; los días de descanso del reto son obligatorios.",
  "weights.roleText": "Es el entrenamiento de pesas que aparece como foco en Hoy y Semana (plan 5×5 MFQH). Aquí apuntas series, repeticiones y peso de cada ejercicio para asegurar la sobrecarga progresiva semana a semana.",
  "spartan.roleText": "Es tu sesión de acondicionamiento explosivo. En la pestaña Hoy aparece los días de potencia y recuperación; replica la demanda cardiovascular del fútbol y el pádel sin castigar las piernas para los partidos.",
  "care.roleText": "Reúne la rutina matutina (respiración 3-6 y diario estoico), la recuperación termal (sauna y piscina) y el cuidado postural de la espalda. Cierra el círculo de serenidad y recuperación del protocolo.",
  "howItWorks.title": "¿Cómo funciona la app?",
  "howItWorks.intro": "Hoy y Semana son tu mapa: qué toca cada día (foco de pesas, deporte, dieta). Las otras cuatro pestañas son las herramientas que ejecutas:",
  "howItWorks.challenge": "El reto de 30 días de calistenia (sentadillas, plancha, flexiones, abdominales). Es un añadido diario de volumen progresivo, independiente del foco del día.",
  "howItWorks.spartan": "El circuito HIIT de 15 ejercicios. Es tu finalizador metabólico los días de potencia y para mantener el fondo de cara a pádel y fútbol.",
  "howItWorks.weights": "El registro del entrenamiento de fuerza del día (el que ves en Hoy y Semana). Apuntas series, repes y peso para asegurar la sobrecarga progresiva 5×5.",
  "howItWorks.care": "Tu autocuidado: respiración 3-6, diario estoico, termoterapia (sauna y piscina) y una rutina para la espalda. Cierra el círculo de recuperación y serenidad.",
  "spartan.startCircuit": "Iniciar circuito",
  "spartan.completed": "Completado.",
  "spartan.anotherRound": "Otra ronda",
  "spartan.round": "Ronda",
  "spartan.rest": "Descanso",
  "spartan.active": "Activo",
  "spartan.catchBreath": "Recupera la respiración",
  "spartan.next": "Siguiente",
  "spartan.startsRound": "Comienza ronda",
  "spartan.resume": "Reanudar",
  "spartan.pause": "Pausar",
};

// Catalán — plantilla (cae a inglés hasta traducir). Se rellena vía CSV.
const ca: Dict = {};

const DICTS: Record<Language, Dict> = { eng: en, cast: es, cat: ca };

/** Resuelve una clave en el idioma dado, con respaldo a inglés (fuente). */
export function translate(lang: Language, key: string): string {
  return DICTS[lang]?.[key] ?? DICTS.eng[key] ?? key;
}

export const DICTIONARY = DICTS;
export const I18N_KEYS = Object.keys(en);
