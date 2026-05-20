import type { Meal, ShoppingCategory, WeekDay } from "../types";

/**
 * Propuesta dietética orientada a hipertrofia con demanda concurrente
 * (pesas matutinas + deportes intermitentes por la tarde).
 *
 * Fundamentos extraídos del protocolo:
 *  · Proteína 1,6–2,0 g/kg/día de alto valor biológico.
 *  · Carbohidratos de bajo índice glucémico como base (avena, quinoa,
 *    arroz integral, boniato); carga media-alta en los 60' post-entreno
 *    y antes de los partidos vespertinos (miércoles pádel, jueves fútbol).
 *  · Grasas saludables (AOVE, aguacate, frutos secos) para el eje endocrino.
 *  · Mañana en semi-ayuno asistido: batido de avena + café antes de entrenar;
 *    ventana anabólica con batido de proteína + creatina al terminar.
 *
 * Es una plantilla flexible de referencia, no una pauta médica. Ajusta las
 * cantidades a tu peso, hambre y objetivo (un dietista puede afinar macros).
 */

// Batidos constantes alrededor del entrenamiento matutino
export const PRE_WORKOUT: Meal = {
  slot: "pre",
  time: "06:40",
  title: "Pre-entreno · Batido de avena",
  kind: "shake",
  items: [
    "40 g copos de avena finos",
    "1 plátano",
    "250 ml leche o bebida de avena",
    "1 cda mantequilla de cacahuete + canela",
    "Café expreso",
  ],
  note: "Energía de asimilación media sin sobrecargar la digestión antes de entrenar.",
};

export const POST_WORKOUT: Meal = {
  slot: "post",
  time: "08:30",
  title: "Post-entreno · Proteína + creatina",
  kind: "shake",
  items: [
    "1 cazo (≈30 g) proteína de suero",
    "5 g creatina monohidrato",
    "300 ml agua o leche",
    "Opcional: 1 plátano o dátiles",
  ],
  note: "Ventana anabólica: corta el catabolismo tras la termoterapia.",
};

// Comidas reales por día (desayuno · almuerzo · comida · merienda · cena)
const M = (
  slot: Meal["slot"],
  time: string,
  title: string,
  items: string[],
  note?: string,
): Meal => ({ slot, time, title, items, kind: "meal", note });

export const WEEK_DIET: Record<WeekDay, Meal[]> = {
  lunes: [
    M("desayuno", "09:15", "Desayuno", [
      "Tortilla de 3 huevos con espinacas",
      "2 tostadas de pan integral con aguacate",
      "Té verde o café",
    ]),
    M("almuerzo", "11:30", "Almuerzo", [
      "Yogur griego natural",
      "Puñado de nueces y arándanos",
    ]),
    M("comida", "14:00", "Comida", [
      "Pechuga de pollo a la plancha (180 g)",
      "Quinoa con verduras salteadas",
      "Ensalada con AOVE",
    ]),
    M("merienda", "17:30", "Merienda", [
      "Requesón o queso fresco batido",
      "1 manzana + 4 nueces",
    ]),
    M("cena", "21:00", "Cena", [
      "Salmón al horno (150 g)",
      "Boniato asado",
      "Brócoli al vapor con AOVE",
    ]),
  ],
  martes: [
    M("desayuno", "09:15", "Desayuno", [
      "Bowl de yogur griego con avena",
      "Fresas, semillas de chía y miel",
      "Café",
    ]),
    M("almuerzo", "11:30", "Almuerzo", [
      "Tostada integral con pavo y tomate",
      "Un puñado de almendras",
    ]),
    M("comida", "14:00", "Comida", [
      "Lomo de atún o bonito (180 g)",
      "Arroz integral",
      "Pimientos y calabacín al horno",
    ]),
    M("merienda", "17:30", "Merienda", [
      "Batido casero: leche, plátano y canela",
      "2 tortitas de arroz con crema de cacahuete",
    ]),
    M("cena", "21:00", "Cena", [
      "Revuelto de huevos y gambas",
      "Ensalada de garbanzos",
      "Aguacate",
    ]),
  ],
  miercoles: [
    // Día de pádel (19:00) — carga de carbohidratos a mediodía/merienda
    M("desayuno", "09:15", "Desayuno", [
      "Porridge de avena con leche",
      "Plátano, nueces y canela",
      "Café",
    ]),
    M("almuerzo", "11:30", "Almuerzo", [
      "Yogur griego con miel",
      "Puñado de pasas y anacardos",
    ]),
    M("comida", "14:00", "Comida · pre-pádel", [
      "Pollo (180 g) con arroz integral generoso",
      "Verduras salteadas",
      "Plátano de postre",
    ], "Más carbohidrato para cebar la glucólisis del partido."),
    M("merienda", "17:45", "Merienda · pre-pádel", [
      "Tostadas integrales con pavo",
      "1 plátano o dátiles",
    ], "Energía rápida 1 h antes de jugar."),
    M("cena", "21:30", "Cena post-pádel", [
      "Tortilla francesa de 3 huevos",
      "Quinoa con verduras",
      "Yogur griego",
    ], "Recarga de glucógeno y proteína tras el esfuerzo."),
  ],
  jueves: [
    // Día de fútbol (21:00) — carga de carbohidratos por la tarde
    M("desayuno", "09:15", "Desayuno", [
      "Tortilla de 3 huevos",
      "2 tostadas integrales con tomate y AOVE",
      "Café",
    ]),
    M("almuerzo", "11:30", "Almuerzo", [
      "Yogur griego",
      "Manzana + almendras",
    ]),
    M("comida", "14:00", "Comida", [
      "Pavo o ternera magra (180 g)",
      "Boniato y arroz integral",
      "Ensalada con AOVE",
    ]),
    M("merienda", "18:30", "Merienda · pre-fútbol", [
      "Bocadillo integral de pavo y queso",
      "1 plátano",
      "Café opcional",
    ], "Comida principal de carbohidratos antes del partido de las 21:00."),
    M("cena", "22:30", "Cena post-fútbol", [
      "Batido de proteína + plátano (rápido)",
      "Pasta integral con atún y tomate",
    ], "Cena tardía: prioriza recarga rápida tras el partido."),
  ],
  viernes: [
    // Recuperación — perfil antiinflamatorio (omega-3)
    M("desayuno", "09:15", "Desayuno", [
      "Yogur griego con avena y semillas de lino",
      "Frutos rojos",
      "Té verde",
    ]),
    M("almuerzo", "11:30", "Almuerzo", [
      "Tostada de aguacate y huevo poché",
    ]),
    M("comida", "14:00", "Comida", [
      "Salmón o sardinas (160 g)",
      "Quinoa",
      "Ensalada verde abundante con AOVE",
    ], "Omega-3 para modular la inflamación de la semana."),
    M("merienda", "17:30", "Merienda", [
      "Requesón con nueces y miel",
    ]),
    M("cena", "21:00", "Cena", [
      "Crema de verduras",
      "Tortilla de champiñones",
      "Lentejas templadas",
    ]),
  ],
  sabado: [
    M("desayuno", "09:30", "Desayuno", [
      "Huevos revueltos con aguacate",
      "Pan integral",
      "Café",
    ]),
    M("almuerzo", "12:00", "Almuerzo", [
      "Yogur griego con fruta y nueces",
    ]),
    M("comida", "14:30", "Comida", [
      "Poké bowl: salmón o atún, arroz, edamame",
      "Aguacate, alga y sésamo",
    ], "Estructura tipo Aloha Poké: doble fuente proteica, fácil de armar."),
    M("merienda", "18:00", "Merienda", [
      "Tostadas con crema de cacahuete y plátano",
    ]),
    M("cena", "21:00", "Cena", [
      "Pollo al horno con especias",
      "Verduras asadas",
      "Boniato",
    ]),
  ],
  domingo: [
    // Descanso — menos carbohidrato, más verdura
    M("desayuno", "09:45", "Desayuno", [
      "Tortilla de 3 huevos con verduras",
      "1 tostada integral con aguacate",
      "Café",
    ]),
    M("almuerzo", "12:00", "Almuerzo", [
      "Yogur griego con frutos secos",
    ]),
    M("comida", "14:30", "Comida", [
      "Ternera o pollo (180 g)",
      "Ensalada grande de hoja, tomate y aguacate",
      "Ración moderada de quinoa",
    ]),
    M("merienda", "18:00", "Merienda", [
      "Fruta + un puñado de almendras",
    ]),
    M("cena", "21:00", "Cena", [
      "Pescado blanco a la plancha",
      "Verduras al vapor",
      "Hummus con crudités",
    ]),
  ],
};

// Lista de la compra semanal — agregada del menú de 7 días.
// Cantidades orientativas para 1 persona / semana.
export const WEEKLY_SHOPPING: ShoppingCategory[] = [
  {
    category: "Proteína",
    items: [
      { name: "Huevos", qty: "2 docenas" },
      { name: "Pechuga de pollo", qty: "≈900 g" },
      { name: "Salmón fresco", qty: "≈450 g" },
      { name: "Atún / bonito fresco", qty: "≈360 g" },
      { name: "Pavo (fiambre y filetes)", qty: "≈400 g" },
      { name: "Ternera magra", qty: "≈350 g" },
      { name: "Pescado blanco", qty: "≈300 g" },
      { name: "Sardinas (fresca o lata)", qty: "1–2 latas" },
      { name: "Gambas / langostinos", qty: "≈200 g" },
      { name: "Atún en lata", qty: "3 latas" },
    ],
  },
  {
    category: "Lácteos",
    items: [
      { name: "Yogur griego natural", qty: "1 kg" },
      { name: "Requesón / queso fresco batido", qty: "500 g" },
      { name: "Leche o bebida de avena", qty: "2 L" },
      { name: "Queso en lonchas", qty: "1 paquete" },
    ],
  },
  {
    category: "Carbohidratos",
    items: [
      { name: "Copos de avena", qty: "500 g" },
      { name: "Quinoa", qty: "500 g" },
      { name: "Arroz integral", qty: "1 kg" },
      { name: "Boniato", qty: "≈1 kg" },
      { name: "Pan integral", qty: "1–2 hogazas" },
      { name: "Pasta integral", qty: "500 g" },
      { name: "Tortitas de arroz", qty: "1 paquete" },
      { name: "Lentejas / garbanzos", qty: "2 botes" },
      { name: "Edamame", qty: "1 bolsa" },
    ],
  },
  {
    category: "Fruta y verdura",
    items: [
      { name: "Plátanos", qty: "10–12" },
      { name: "Manzanas", qty: "4" },
      { name: "Frutos rojos / fresas", qty: "2 tarrinas" },
      { name: "Espinacas", qty: "1 bolsa" },
      { name: "Brócoli", qty: "2 piezas" },
      { name: "Calabacín", qty: "3" },
      { name: "Pimientos", qty: "4" },
      { name: "Tomates", qty: "6–8" },
      { name: "Aguacates", qty: "5–6" },
      { name: "Champiñones", qty: "1 bandeja" },
      { name: "Ensalada de hoja", qty: "2 bolsas" },
      { name: "Verduras para crema/asar", qty: "surtido" },
    ],
  },
  {
    category: "Grasas y despensa",
    items: [
      { name: "Aceite de oliva virgen extra", qty: "1 botella" },
      { name: "Nueces", qty: "250 g" },
      { name: "Almendras", qty: "250 g" },
      { name: "Anacardos / pasas", qty: "150 g" },
      { name: "Crema de cacahuete", qty: "1 bote" },
      { name: "Semillas (chía, lino, sésamo)", qty: "1 paquete c/u" },
      { name: "Miel", qty: "1 bote" },
      { name: "Hummus", qty: "1 tarrina" },
      { name: "Alga nori / wakame", qty: "1 paquete" },
      { name: "Dátiles", qty: "1 paquete" },
      { name: "Café", qty: "según consumo" },
      { name: "Especias y canela", qty: "—" },
    ],
  },
  {
    category: "Suplementos",
    items: [
      { name: "Proteína de suero (whey)", qty: "≈1 bote/mes" },
      { name: "Creatina monohidrato", qty: "5 g/día" },
    ],
  },
];

export const DIET_DISCLAIMER =
  "Plantilla orientativa de hipertrofia, no una pauta médica. Ajusta cantidades a tu peso y objetivo; un dietista puede afinar los macros.";
