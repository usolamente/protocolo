import type { Meal, ShoppingCategory, WeekDay, Activity } from "../types";

/**
 * Dieta orientada a hipertrofia con demanda concurrente.
 * Fundamentos (del protocolo): proteína 1,6–2,0 g/kg/día, carbohidratos de
 * bajo índice glucémico de base, grasas saludables, semi-ayuno matutino
 * asistido por batido + ventana anabólica post-entreno.
 *
 * · El MENÚ BASE rota cada semana del mes (4 variantes) para dar variedad.
 * · La CARGA por deporte ya no se fija a días concretos: se añade según la
 *   actividad que registres cada día (correr, fútbol, básket, escalar…).
 *
 * Plantilla orientativa, no una pauta médica.
 */

// ── Batidos constantes del entrenamiento matutino ──
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
  note: "Energía media sin sobrecargar la digestión antes de entrenar.",
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

const M = (
  slot: Meal["slot"],
  time: string,
  title: string,
  items: string[],
  note?: string,
): Meal => ({ slot, time, title, items, kind: "meal", note });

// ═════════════════════════════════════════════════════════
// SEMANA 1 · Mediterránea clásica (pollo · salmón · atún)
// ═════════════════════════════════════════════════════════
const WEEK_1: Record<WeekDay, Meal[]> = {
  lunes: [
    M("desayuno", "09:15", "Desayuno", ["Tortilla de 3 huevos con espinacas", "2 tostadas integrales con aguacate", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego natural", "Nueces y arándanos"]),
    M("comida", "14:00", "Comida", ["Pechuga de pollo a la plancha (180 g)", "Quinoa con verduras", "Ensalada con AOVE"]),
    M("merienda", "17:30", "Merienda", ["Requesón batido", "1 manzana + 4 nueces"]),
    M("cena", "21:00", "Cena", ["Salmón al horno (150 g)", "Boniato asado", "Brócoli al vapor con AOVE"]),
  ],
  martes: [
    M("desayuno", "09:15", "Desayuno", ["Bowl de yogur griego con avena", "Fresas, chía y miel", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Tostada integral con pavo y tomate", "Almendras"]),
    M("comida", "14:00", "Comida", ["Lomo de atún o bonito (180 g)", "Arroz integral", "Pimientos y calabacín al horno"]),
    M("merienda", "17:30", "Merienda", ["Batido: leche, plátano y canela", "2 tortitas de arroz con crema de cacahuete"]),
    M("cena", "21:00", "Cena", ["Revuelto de huevos y gambas", "Ensalada de garbanzos", "Aguacate"]),
  ],
  miercoles: [
    M("desayuno", "09:15", "Desayuno", ["Porridge de avena con leche", "Plátano, nueces y canela", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego con miel", "Pasas y anacardos"]),
    M("comida", "14:00", "Comida", ["Pollo (180 g) con arroz integral", "Verduras salteadas"]),
    M("merienda", "17:30", "Merienda", ["Tostadas integrales con pavo", "1 plátano"]),
    M("cena", "21:00", "Cena", ["Tortilla francesa de 3 huevos", "Quinoa con verduras", "Yogur griego"]),
  ],
  jueves: [
    M("desayuno", "09:15", "Desayuno", ["Tortilla de 3 huevos", "2 tostadas con tomate y AOVE", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Manzana + almendras"]),
    M("comida", "14:00", "Comida", ["Pavo o ternera magra (180 g)", "Boniato y arroz integral", "Ensalada con AOVE"]),
    M("merienda", "17:30", "Merienda", ["Bocadillo integral de pavo y queso", "1 plátano"]),
    M("cena", "21:00", "Cena", ["Pasta integral con atún y tomate", "Ensalada verde"]),
  ],
  viernes: [
    M("desayuno", "09:15", "Desayuno", ["Yogur griego con avena y lino", "Frutos rojos", "Té verde"]),
    M("almuerzo", "11:30", "Almuerzo", ["Tostada de aguacate y huevo poché"]),
    M("comida", "14:00", "Comida", ["Salmón o sardinas (160 g)", "Quinoa", "Ensalada verde con AOVE"], "Omega-3 para modular la inflamación de la semana."),
    M("merienda", "17:30", "Merienda", ["Requesón con nueces y miel"]),
    M("cena", "21:00", "Cena", ["Crema de verduras", "Tortilla de champiñones", "Lentejas templadas"]),
  ],
  sabado: [
    M("desayuno", "09:30", "Desayuno", ["Huevos revueltos con aguacate", "Pan integral", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur griego con fruta y nueces"]),
    M("comida", "14:30", "Comida", ["Poké bowl: salmón o atún, arroz, edamame", "Aguacate, alga y sésamo"]),
    M("merienda", "18:00", "Merienda", ["Tostadas con crema de cacahuete y plátano"]),
    M("cena", "21:00", "Cena", ["Pollo al horno con especias", "Verduras asadas", "Boniato"]),
  ],
  domingo: [
    M("desayuno", "09:45", "Desayuno", ["Tortilla de 3 huevos con verduras", "1 tostada con aguacate", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur griego con frutos secos"]),
    M("comida", "14:30", "Comida", ["Ternera o pollo (180 g)", "Ensalada grande con aguacate", "Quinoa moderada"]),
    M("merienda", "18:00", "Merienda", ["Fruta + almendras"]),
    M("cena", "21:00", "Cena", ["Pescado blanco a la plancha", "Verduras al vapor", "Hummus con crudités"]),
  ],
};

// ═════════════════════════════════════════════════════════
// SEMANA 2 · Pescado azul y legumbres (caballa · trucha · lentejas)
// ═════════════════════════════════════════════════════════
const WEEK_2: Record<WeekDay, Meal[]> = {
  lunes: [
    M("desayuno", "09:15", "Desayuno", ["Avena cocida con leche y manzana", "2 huevos cocidos", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Kéfir o yogur griego", "Avellanas"]),
    M("comida", "14:00", "Comida", ["Trucha o caballa al horno (170 g)", "Cuscús integral con verduras", "Ensalada"]),
    M("merienda", "17:30", "Merienda", ["Tostada integral con hummus", "1 pera"]),
    M("cena", "21:00", "Cena", ["Lentejas con verduras y huevo duro", "Yogur griego"]),
  ],
  martes: [
    M("desayuno", "09:15", "Desayuno", ["Yogur griego con copos de avena y nueces", "Kiwi", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Tostada de aguacate y huevo"]),
    M("comida", "14:00", "Comida", ["Pollo al curry suave (180 g)", "Arroz basmati integral", "Verduras"]),
    M("merienda", "17:30", "Merienda", ["Requesón con miel y semillas"]),
    M("cena", "21:00", "Cena", ["Garbanzos salteados con espinacas", "Huevo a la plancha", "Aguacate"]),
  ],
  miercoles: [
    M("desayuno", "09:15", "Desayuno", ["Porridge con plátano y crema de almendra", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Dátiles y nueces"]),
    M("comida", "14:00", "Comida", ["Salmón a la plancha (170 g)", "Patata cocida y judías verdes"]),
    M("merienda", "17:30", "Merienda", ["Bocadillo integral de atún"]),
    M("cena", "21:00", "Cena", ["Sopa de miso o caldo", "Tortilla de patata ligera", "Ensalada"]),
  ],
  jueves: [
    M("desayuno", "09:15", "Desayuno", ["Tortilla de 3 huevos con tomate", "Pan integral", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Plátano"]),
    M("comida", "14:00", "Comida", ["Pavo guisado (180 g)", "Arroz integral y boniato", "Ensalada"]),
    M("merienda", "17:30", "Merienda", ["Tostadas con queso fresco y pavo", "1 plátano"]),
    M("cena", "21:00", "Cena", ["Quinoa con verduras y caballa", "Yogur"]),
  ],
  viernes: [
    M("desayuno", "09:15", "Desayuno", ["Yogur con avena, lino y arándanos", "Té verde"]),
    M("almuerzo", "11:30", "Almuerzo", ["Tostada integral con aguacate"]),
    M("comida", "14:00", "Comida", ["Sardinas o boquerones (160 g)", "Quinoa", "Ensalada con AOVE"], "Omega-3 antiinflamatorio."),
    M("merienda", "17:30", "Merienda", ["Requesón con nueces"]),
    M("cena", "21:00", "Cena", ["Crema de calabaza", "Revuelto de setas y huevo", "Lentejas"]),
  ],
  sabado: [
    M("desayuno", "09:30", "Desayuno", ["Huevos revueltos con aguacate y tomate", "Pan integral", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur griego con fruta"]),
    M("comida", "14:30", "Comida", ["Bowl de trucha ahumada, arroz y edamame", "Aguacate y sésamo"]),
    M("merienda", "18:00", "Merienda", ["Tostadas con crema de cacahuete y plátano"]),
    M("cena", "21:00", "Cena", ["Pollo al limón al horno", "Verduras asadas", "Patata"]),
  ],
  domingo: [
    M("desayuno", "09:45", "Desayuno", ["Tortilla de verduras", "1 tostada con aguacate", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur con frutos secos"]),
    M("comida", "14:30", "Comida", ["Estofado de garbanzos con bacalao", "Ensalada"]),
    M("merienda", "18:00", "Merienda", ["Fruta + avellanas"]),
    M("cena", "21:00", "Cena", ["Pescado blanco al horno", "Verduras al vapor", "Hummus"]),
  ],
};

// ═════════════════════════════════════════════════════════
// SEMANA 3 · Carnes magras y aves variadas (ternera · conejo · pavo)
// ═════════════════════════════════════════════════════════
const WEEK_3: Record<WeekDay, Meal[]> = {
  lunes: [
    M("desayuno", "09:15", "Desayuno", ["Tortilla de 3 huevos con queso", "2 tostadas con tomate", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Nueces y manzana"]),
    M("comida", "14:00", "Comida", ["Solomillo de ternera magra (170 g)", "Arroz integral", "Verduras salteadas"]),
    M("merienda", "17:30", "Merienda", ["Requesón con frutos rojos"]),
    M("cena", "21:00", "Cena", ["Pechuga de pollo al horno", "Boniato", "Ensalada con AOVE"]),
  ],
  martes: [
    M("desayuno", "09:15", "Desayuno", ["Porridge con manzana y canela", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Tostada con pavo y aguacate"]),
    M("comida", "14:00", "Comida", ["Conejo o pollo al ajillo (180 g)", "Patata y judías verdes"]),
    M("merienda", "17:30", "Merienda", ["Yogur griego con miel y nueces"]),
    M("cena", "21:00", "Cena", ["Revuelto de huevos con espárragos", "Ensalada de garbanzos"]),
  ],
  miercoles: [
    M("desayuno", "09:15", "Desayuno", ["Avena con leche, plátano y cacao", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Dátiles y almendras"]),
    M("comida", "14:00", "Comida", ["Ternera magra salteada (180 g)", "Arroz integral", "Pimientos"]),
    M("merienda", "17:30", "Merienda", ["Bocadillo integral de pavo"]),
    M("cena", "21:00", "Cena", ["Tortilla de patata ligera", "Ensalada", "Yogur"]),
  ],
  jueves: [
    M("desayuno", "09:15", "Desayuno", ["Tortilla de 3 huevos", "Pan integral con AOVE", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Plátano + almendras"]),
    M("comida", "14:00", "Comida", ["Pavo a la plancha (180 g)", "Boniato y arroz", "Ensalada"]),
    M("merienda", "17:30", "Merienda", ["Tostadas con queso fresco y miel", "1 plátano"]),
    M("cena", "21:00", "Cena", ["Pasta integral con boloñesa de pavo", "Ensalada"]),
  ],
  viernes: [
    M("desayuno", "09:15", "Desayuno", ["Yogur con avena, lino y frutos rojos", "Té verde"]),
    M("almuerzo", "11:30", "Almuerzo", ["Tostada de aguacate y huevo"]),
    M("comida", "14:00", "Comida", ["Salmón al horno (160 g)", "Quinoa", "Brócoli con AOVE"], "Omega-3 antiinflamatorio."),
    M("merienda", "17:30", "Merienda", ["Requesón con nueces y miel"]),
    M("cena", "21:00", "Cena", ["Crema de verduras", "Tortilla de setas", "Lentejas"]),
  ],
  sabado: [
    M("desayuno", "09:30", "Desayuno", ["Huevos revueltos con aguacate", "Pan integral", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur griego con fruta y nueces"]),
    M("comida", "14:30", "Comida", ["Hamburguesa casera de ternera magra", "Patata al horno", "Ensalada"]),
    M("merienda", "18:00", "Merienda", ["Tostadas con crema de cacahuete y plátano"]),
    M("cena", "21:00", "Cena", ["Pollo al curry", "Arroz basmati integral", "Verduras"]),
  ],
  domingo: [
    M("desayuno", "09:45", "Desayuno", ["Tortilla de verduras", "1 tostada con aguacate", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur con frutos secos"]),
    M("comida", "14:30", "Comida", ["Pollo asado (180 g)", "Ensalada grande con aguacate", "Quinoa moderada"]),
    M("merienda", "18:00", "Merienda", ["Fruta + nueces"]),
    M("cena", "21:00", "Cena", ["Pescado blanco a la plancha", "Verduras al vapor", "Hummus"]),
  ],
};

// ═════════════════════════════════════════════════════════
// SEMANA 4 · Marisco, bowls y proteína vegetal (langostinos · tofu · quinoa)
// ═════════════════════════════════════════════════════════
const WEEK_4: Record<WeekDay, Meal[]> = {
  lunes: [
    M("desayuno", "09:15", "Desayuno", ["Yogur griego con granola casera y plátano", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["2 huevos cocidos", "Manzana"]),
    M("comida", "14:00", "Comida", ["Langostinos salteados con verduras", "Arroz integral", "Aguacate"]),
    M("merienda", "17:30", "Merienda", ["Requesón con miel y nueces"]),
    M("cena", "21:00", "Cena", ["Tofu o tempeh a la plancha", "Quinoa con verduras", "Edamame"]),
  ],
  martes: [
    M("desayuno", "09:15", "Desayuno", ["Tortilla de 3 huevos con espinacas", "Tostada con aguacate", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Almendras"]),
    M("comida", "14:00", "Comida", ["Pollo teriyaki (180 g)", "Arroz integral", "Verduras al wok"]),
    M("merienda", "17:30", "Merienda", ["Batido: leche, plátano y crema de cacahuete"]),
    M("cena", "21:00", "Cena", ["Ensalada de lentejas con atún", "Huevo duro", "Aguacate"]),
  ],
  miercoles: [
    M("desayuno", "09:15", "Desayuno", ["Porridge con frutos rojos y semillas", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Dátiles y anacardos"]),
    M("comida", "14:00", "Comida", ["Sepia o calamar a la plancha (180 g)", "Arroz integral", "Pimientos"]),
    M("merienda", "17:30", "Merienda", ["Tostadas integrales con hummus", "1 plátano"]),
    M("cena", "21:00", "Cena", ["Tortilla francesa", "Quinoa con verduras", "Yogur"]),
  ],
  jueves: [
    M("desayuno", "09:15", "Desayuno", ["Tortilla de 3 huevos", "Pan integral con tomate", "Café"]),
    M("almuerzo", "11:30", "Almuerzo", ["Yogur griego", "Plátano"]),
    M("comida", "14:00", "Comida", ["Pollo (180 g) con boniato y arroz", "Ensalada"]),
    M("merienda", "17:30", "Merienda", ["Bocadillo integral de pavo y queso", "1 plátano"]),
    M("cena", "21:00", "Cena", ["Noodles integrales con langostinos y verduras"]),
  ],
  viernes: [
    M("desayuno", "09:15", "Desayuno", ["Yogur con avena, lino y arándanos", "Té verde"]),
    M("almuerzo", "11:30", "Almuerzo", ["Tostada de aguacate y huevo poché"]),
    M("comida", "14:00", "Comida", ["Salmón o caballa (160 g)", "Quinoa", "Ensalada verde con AOVE"], "Omega-3 antiinflamatorio."),
    M("merienda", "17:30", "Merienda", ["Requesón con nueces"]),
    M("cena", "21:00", "Cena", ["Crema de verduras", "Tofu salteado", "Lentejas"]),
  ],
  sabado: [
    M("desayuno", "09:30", "Desayuno", ["Huevos revueltos con aguacate", "Pan integral", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur griego con fruta y nueces"]),
    M("comida", "14:30", "Comida", ["Poké bowl: atún, arroz, edamame, mango", "Aguacate y sésamo"]),
    M("merienda", "18:00", "Merienda", ["Tostadas con crema de cacahuete y plátano"]),
    M("cena", "21:00", "Cena", ["Mejillones o almejas al vapor", "Pan integral", "Ensalada"]),
  ],
  domingo: [
    M("desayuno", "09:45", "Desayuno", ["Tortilla de verduras", "1 tostada con aguacate", "Café"]),
    M("almuerzo", "12:00", "Almuerzo", ["Yogur con frutos secos"]),
    M("comida", "14:30", "Comida", ["Garbanzos con langostinos y verduras", "Ensalada"]),
    M("merienda", "18:00", "Merienda", ["Fruta + almendras"]),
    M("cena", "21:00", "Cena", ["Pescado blanco al horno", "Verduras al vapor", "Hummus con crudités"]),
  ],
};

const WEEK_VARIANTS: Record<WeekDay, Meal[]>[] = [WEEK_1, WEEK_2, WEEK_3, WEEK_4];

export const WEEK_VARIANT_LABELS = [
  "Semana 1 · Mediterránea clásica",
  "Semana 2 · Pescado azul y legumbres",
  "Semana 3 · Carnes magras y aves",
  "Semana 4 · Marisco y proteína vegetal",
];

/** Índice de variante (0–3) según la semana del mes. */
export function weekOfMonthIndex(date = new Date()): number {
  return Math.floor((date.getDate() - 1) / 7) % 4;
}

/** Menú base de la semana del mes correspondiente a la fecha. */
export function getWeekDiet(date = new Date()): Record<WeekDay, Meal[]> {
  return WEEK_VARIANTS[weekOfMonthIndex(date)];
}

// ─────────────────────────────────────────────────────────
// Combustible por actividad complementaria (carga dinámica)
// ─────────────────────────────────────────────────────────

export interface ActivityFuel {
  pre: string;
  post: string;
  note: string;
}

export const ACTIVITY_FUEL: Record<Exclude<Activity, "none">, ActivityFuel> = {
  correr: {
    pre: "Plátano o tostada con miel 45–60 min antes.",
    post: "Batido de proteína + fruta para reponer.",
    note: "Cardio: hidrátate bien y añade un extra de carbohidrato si el rodaje es largo.",
  },
  futbol: {
    pre: "Comida rica en carbohidratos 2–3 h antes (pasta/arroz) + plátano 1 h antes.",
    post: "Recarga de glucógeno: arroz o pasta + proteína magra.",
    note: "Esfuerzo intermitente intenso: prioriza carga de hidratos y electrolitos.",
  },
  basket: {
    pre: "Carbohidrato de fácil digestión 1–2 h antes + buena hidratación.",
    post: "Recarga rápida: fruta + batido o cena con arroz/pasta.",
    note: "Alta demanda anaeróbica y de impacto: hidratos y sodio.",
  },
  escalar: {
    pre: "Carbohidrato moderado + café 60 min antes.",
    post: "Proteína para antebrazos y espalda; magnesio si hay calambres.",
    note: "Fuerza-resistencia y agarre: proteína suficiente, hidratos moderados.",
  },
  varios: {
    pre: "Snack ligero de carbohidrato si la sesión supera 45 min.",
    post: "Proteína + algo de fruta según intensidad.",
    note: "Ajusta la carga de hidratos a cómo de exigente haya sido.",
  },
};

export function getActivityFuel(activity: Activity): ActivityFuel | null {
  if (activity === "none") return null;
  return ACTIVITY_FUEL[activity];
}

// ─────────────────────────────────────────────────────────
// Lista de la compra · una variante por semana del mes
// ─────────────────────────────────────────────────────────

const SHOPPING_VARIANTS: ShoppingCategory[][] = [
  // Semana 1
  [
    { category: "Proteína", items: [
      { name: "Huevos", qty: "2 docenas" },
      { name: "Pechuga de pollo", qty: "≈900 g" },
      { name: "Salmón fresco", qty: "≈450 g" },
      { name: "Atún / bonito", qty: "≈360 g" },
      { name: "Pavo (fiambre y filetes)", qty: "≈400 g" },
      { name: "Ternera magra", qty: "≈300 g" },
      { name: "Gambas", qty: "≈200 g" },
      { name: "Atún en lata", qty: "3 latas" },
    ]},
    { category: "Lácteos", items: [
      { name: "Yogur griego", qty: "1 kg" },
      { name: "Requesón", qty: "500 g" },
      { name: "Leche o bebida de avena", qty: "2 L" },
      { name: "Queso en lonchas", qty: "1 paquete" },
    ]},
    { category: "Carbohidratos", items: [
      { name: "Copos de avena", qty: "500 g" },
      { name: "Quinoa", qty: "500 g" },
      { name: "Arroz integral", qty: "1 kg" },
      { name: "Boniato", qty: "≈1 kg" },
      { name: "Pan integral", qty: "1–2 hogazas" },
      { name: "Pasta integral", qty: "500 g" },
      { name: "Garbanzos / lentejas", qty: "2 botes" },
    ]},
    { category: "Fruta y verdura", items: [
      { name: "Plátanos", qty: "10–12" },
      { name: "Manzanas", qty: "4" },
      { name: "Frutos rojos", qty: "2 tarrinas" },
      { name: "Espinacas", qty: "1 bolsa" },
      { name: "Brócoli", qty: "2 piezas" },
      { name: "Calabacín y pimientos", qty: "surtido" },
      { name: "Tomates", qty: "6–8" },
      { name: "Aguacates", qty: "5–6" },
      { name: "Champiñones", qty: "1 bandeja" },
      { name: "Ensalada de hoja", qty: "2 bolsas" },
    ]},
    { category: "Grasas y despensa", items: [
      { name: "AOVE", qty: "1 botella" },
      { name: "Nueces y almendras", qty: "250 g c/u" },
      { name: "Crema de cacahuete", qty: "1 bote" },
      { name: "Semillas (chía, lino)", qty: "1 paquete" },
      { name: "Miel y hummus", qty: "1 c/u" },
      { name: "Alga nori", qty: "1 paquete" },
      { name: "Café y especias", qty: "—" },
    ]},
    { category: "Suplementos", items: [
      { name: "Proteína de suero", qty: "≈1 bote/mes" },
      { name: "Creatina monohidrato", qty: "5 g/día" },
    ]},
  ],
  // Semana 2
  [
    { category: "Proteína", items: [
      { name: "Huevos", qty: "2 docenas" },
      { name: "Caballa / trucha", qty: "≈450 g" },
      { name: "Sardinas o boquerones", qty: "≈300 g" },
      { name: "Bacalao", qty: "≈300 g" },
      { name: "Pollo", qty: "≈700 g" },
      { name: "Pavo", qty: "≈350 g" },
      { name: "Atún en lata", qty: "3 latas" },
    ]},
    { category: "Lácteos", items: [
      { name: "Yogur griego", qty: "1 kg" },
      { name: "Kéfir", qty: "500 ml" },
      { name: "Requesón / queso fresco", qty: "500 g" },
      { name: "Leche o bebida de avena", qty: "2 L" },
    ]},
    { category: "Carbohidratos", items: [
      { name: "Copos de avena", qty: "500 g" },
      { name: "Cuscús integral", qty: "500 g" },
      { name: "Arroz basmati integral", qty: "1 kg" },
      { name: "Patata", qty: "≈1 kg" },
      { name: "Lentejas", qty: "2 botes" },
      { name: "Garbanzos", qty: "2 botes" },
      { name: "Pan integral", qty: "1–2 hogazas" },
    ]},
    { category: "Fruta y verdura", items: [
      { name: "Plátanos", qty: "8–10" },
      { name: "Manzanas y peras", qty: "5" },
      { name: "Kiwis", qty: "4" },
      { name: "Arándanos", qty: "1 tarrina" },
      { name: "Espinacas", qty: "1 bolsa" },
      { name: "Judías verdes", qty: "500 g" },
      { name: "Calabaza", qty: "1 trozo" },
      { name: "Setas", qty: "1 bandeja" },
      { name: "Tomates y aguacates", qty: "surtido" },
      { name: "Ensalada de hoja", qty: "2 bolsas" },
    ]},
    { category: "Grasas y despensa", items: [
      { name: "AOVE", qty: "1 botella" },
      { name: "Avellanas y nueces", qty: "250 g c/u" },
      { name: "Crema de almendra", qty: "1 bote" },
      { name: "Semillas (lino, sésamo)", qty: "1 paquete" },
      { name: "Miel y hummus", qty: "1 c/u" },
      { name: "Pasta de miso", qty: "1 bote" },
      { name: "Dátiles", qty: "1 paquete" },
      { name: "Café y especias", qty: "—" },
    ]},
    { category: "Suplementos", items: [
      { name: "Proteína de suero", qty: "≈1 bote/mes" },
      { name: "Creatina monohidrato", qty: "5 g/día" },
    ]},
  ],
  // Semana 3
  [
    { category: "Proteína", items: [
      { name: "Huevos", qty: "2 docenas" },
      { name: "Ternera magra / solomillo", qty: "≈500 g" },
      { name: "Pollo", qty: "≈700 g" },
      { name: "Conejo", qty: "≈400 g" },
      { name: "Pavo (picado y filetes)", qty: "≈500 g" },
      { name: "Salmón", qty: "≈350 g" },
    ]},
    { category: "Lácteos", items: [
      { name: "Yogur griego", qty: "1 kg" },
      { name: "Requesón", qty: "500 g" },
      { name: "Queso fresco / lonchas", qty: "1 paquete" },
      { name: "Leche o bebida de avena", qty: "2 L" },
    ]},
    { category: "Carbohidratos", items: [
      { name: "Copos de avena", qty: "500 g" },
      { name: "Arroz integral", qty: "1 kg" },
      { name: "Quinoa", qty: "400 g" },
      { name: "Boniato y patata", qty: "≈1,5 kg" },
      { name: "Pasta integral", qty: "500 g" },
      { name: "Pan integral", qty: "1–2 hogazas" },
      { name: "Lentejas", qty: "2 botes" },
    ]},
    { category: "Fruta y verdura", items: [
      { name: "Plátanos", qty: "8–10" },
      { name: "Manzanas", qty: "4" },
      { name: "Frutos rojos", qty: "2 tarrinas" },
      { name: "Espárragos", qty: "1 manojo" },
      { name: "Judías verdes y brócoli", qty: "surtido" },
      { name: "Pimientos", qty: "4" },
      { name: "Setas", qty: "1 bandeja" },
      { name: "Tomates y aguacates", qty: "surtido" },
      { name: "Ensalada de hoja", qty: "2 bolsas" },
    ]},
    { category: "Grasas y despensa", items: [
      { name: "AOVE", qty: "1 botella" },
      { name: "Nueces y almendras", qty: "250 g c/u" },
      { name: "Crema de cacahuete", qty: "1 bote" },
      { name: "Semillas (lino)", qty: "1 paquete" },
      { name: "Miel y hummus", qty: "1 c/u" },
      { name: "Cacao puro", qty: "1 paquete" },
      { name: "Café y especias", qty: "—" },
    ]},
    { category: "Suplementos", items: [
      { name: "Proteína de suero", qty: "≈1 bote/mes" },
      { name: "Creatina monohidrato", qty: "5 g/día" },
    ]},
  ],
  // Semana 4
  [
    { category: "Proteína", items: [
      { name: "Huevos", qty: "2 docenas" },
      { name: "Langostinos / gambas", qty: "≈450 g" },
      { name: "Sepia o calamar", qty: "≈400 g" },
      { name: "Mejillones o almejas", qty: "1 kg" },
      { name: "Atún fresco", qty: "≈300 g" },
      { name: "Pollo", qty: "≈600 g" },
      { name: "Tofu / tempeh", qty: "≈400 g" },
      { name: "Atún en lata", qty: "2 latas" },
    ]},
    { category: "Lácteos", items: [
      { name: "Yogur griego", qty: "1 kg" },
      { name: "Requesón", qty: "500 g" },
      { name: "Leche o bebida de avena", qty: "2 L" },
      { name: "Queso en lonchas", qty: "1 paquete" },
    ]},
    { category: "Carbohidratos", items: [
      { name: "Copos de avena / granola", qty: "500 g" },
      { name: "Arroz integral", qty: "1 kg" },
      { name: "Quinoa", qty: "500 g" },
      { name: "Boniato", qty: "≈800 g" },
      { name: "Noodles integrales", qty: "1 paquete" },
      { name: "Pan integral", qty: "1–2 hogazas" },
      { name: "Garbanzos / lentejas", qty: "2 botes" },
      { name: "Edamame", qty: "1 bolsa" },
    ]},
    { category: "Fruta y verdura", items: [
      { name: "Plátanos", qty: "8–10" },
      { name: "Mango", qty: "1" },
      { name: "Manzanas", qty: "4" },
      { name: "Frutos rojos", qty: "1 tarrina" },
      { name: "Espinacas", qty: "1 bolsa" },
      { name: "Verduras para wok", qty: "surtido" },
      { name: "Pimientos", qty: "4" },
      { name: "Tomates y aguacates", qty: "surtido" },
      { name: "Ensalada de hoja", qty: "2 bolsas" },
    ]},
    { category: "Grasas y despensa", items: [
      { name: "AOVE", qty: "1 botella" },
      { name: "Almendras y anacardos", qty: "250 g c/u" },
      { name: "Crema de cacahuete", qty: "1 bote" },
      { name: "Sésamo y semillas", qty: "1 paquete" },
      { name: "Salsa teriyaki / soja", qty: "1 bote" },
      { name: "Alga nori", qty: "1 paquete" },
      { name: "Miel, hummus y dátiles", qty: "1 c/u" },
      { name: "Café y especias", qty: "—" },
    ]},
    { category: "Suplementos", items: [
      { name: "Proteína de suero", qty: "≈1 bote/mes" },
      { name: "Creatina monohidrato", qty: "5 g/día" },
    ]},
  ],
];

export function getWeeklyShopping(date = new Date()): ShoppingCategory[] {
  return SHOPPING_VARIANTS[weekOfMonthIndex(date)];
}

export const DIET_DISCLAIMER =
  "Plantilla orientativa de hipertrofia, no una pauta médica. El menú rota cada semana del mes; ajusta cantidades a tu peso y a la actividad de cada día.";
