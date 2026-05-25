/**
 * Capa antiinflamatoria de la dieta — destilada del protocolo de nutrición
 * antiinflamatoria para el atleta máster (35-45 años). Contenido propio y
 * accionable; no sustituye una pauta de un dietista colegiado.
 *
 * Dos piezas:
 *  1. PRINCIPIOS: los pilares constantes (valen todos los días).
 *  2. SELLOS: por qué un ingrediente concreto del menú suma (omega-3,
 *     almidón resistente, polifenoles…), para marcarlo en cada comida.
 */

export interface AntiInflPrinciple {
  title: string;
  text: string;
}

export const ANTIINFLAMMATORY_PRINCIPLES: AntiInflPrinciple[] = [
  {
    title: "Equilibrio omega-3 / omega-6",
    text: "Prioriza pescado azul pequeño (sardina, caballa, anchoa), AOVE, aguacate y semillas de lino o chía. Reduce aceites de semillas refinados y ultraprocesados, que disparan la inflamación.",
  },
  {
    title: "Glucosa estable, menos AGEs",
    text: "Carbohidrato de bajo índice glucémico (avena, quinoa, boniato) y nada de azúcar libre fuera del peri-entreno. Cocina al vapor, hervido o bajas temperaturas; evita lo carbonizado y las frituras.",
  },
  {
    title: "Especias que modulan",
    text: "Cúrcuma (siempre con pimienta negra y una grasa para absorberla), jengibre y ajo crudo bajan la señal inflamatoria de las articulaciones tras los impactos.",
  },
  {
    title: "Eje intestino-músculo",
    text: "Fermentados vivos (kéfir, yogur, chucrut) y fibra prebiótica (verdura, legumbre, ajo, cebolla) cuidan la barrera intestinal y aceleran la recuperación.",
  },
  {
    title: "Almidón resistente",
    text: "Cocer y enfriar 24 h patata, boniato o arroz crea almidón resistente: estabiliza la insulina y alimenta tu microbiota. Recalienta suave o tómalo frío.",
  },
  {
    title: "Antioxidantes periodizados",
    text: "No abuses de megadosis de antioxidantes justo tras la fuerza matutina: cierta inflamación es la señal que dispara la hipertrofia. Reserva la carga antiinflamatoria fuerte para los días de partido o fatiga alta.",
  },
];

export const ANTIINFLAMMATORY_INTRO =
  "Sobre la dieta base se aplica un enfoque antiinflamatorio: resolver la inflamación residual del entrenamiento concurrente sin apagar la señal que hace crecer el músculo.";

/**
 * Sellos por ingrediente: si una comida contiene una de estas claves,
 * mostramos su beneficio antiinflamatorio. Clave = subcadena en minúsculas
 * que se busca dentro de los items del menú.
 */
export interface AntiInflTag {
  match: string[]; // subcadenas a detectar (en minúsculas)
  label: string; // nombre corto del beneficio
  why: string; // por qué suma
}

export const ANTIINFLAMMATORY_TAGS: AntiInflTag[] = [
  {
    match: ["salmón", "caballa", "sardina", "boqueron", "trucha", "atún", "bonito"],
    label: "Omega-3 EPA/DHA",
    why: "Pescado azul: genera resolvinas que apagan la inflamación post-esfuerzo.",
  },
  {
    match: ["aceite de oliva", "aove", "aguacate"],
    label: "Grasa monoinsaturada",
    why: "AOVE y aguacate: protegen la membrana celular y el endotelio.",
  },
  {
    match: ["lino", "chía", "chia", "nueces"],
    label: "Omega-3 vegetal",
    why: "Lino, chía y nueces aportan ácido alfa-linolénico antiinflamatorio.",
  },
  {
    match: ["cúrcuma", "curcuma", "jengibre", "ajo"],
    label: "Especia moduladora",
    why: "Cúrcuma, jengibre y ajo frenan la señal de citoquinas en las articulaciones.",
  },
  {
    match: ["yogur", "kéfir", "kefir", "chucrut", "kimchi"],
    label: "Probiótico",
    why: "Fermentados vivos: refuerzan la barrera intestinal y la recuperación.",
  },
  {
    match: ["arándano", "arandano", "fresa", "frutos rojos", "frutos del bosque"],
    label: "Polifenoles",
    why: "Frutos rojos: antioxidantes que combaten el estrés oxidativo del ejercicio.",
  },
  {
    match: ["boniato", "quinoa", "avena", "lenteja", "garbanzo", "arroz integral"],
    label: "Carbohidrato de bajo IG",
    why: "Libera glucosa lento: evita picos de insulina y glicación.",
  },
  {
    match: ["espinaca", "brócoli", "brocoli", "verduras", "ensalada", "crucíferas"],
    label: "Verdura antioxidante",
    why: "Hoja verde y crucíferas: fibra prebiótica y micronutrientes antiinflamatorios.",
  },
];

/** Devuelve los sellos antiinflamatorios presentes en los items de una comida. */
export function tagsForMeal(items: string[]): AntiInflTag[] {
  const hay = items.join(" ").toLowerCase();
  const found: AntiInflTag[] = [];
  for (const tag of ANTIINFLAMMATORY_TAGS) {
    if (tag.match.some((m) => hay.includes(m))) found.push(tag);
  }
  return found;
}
