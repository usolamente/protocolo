/**
 * Ilustraciones SVG (estilo figura de palo) para los 12 ejercicios de la
 * rutina de cuidado de espalda. Contenido propio, sin dependencias externas
 * ni problemas de derechos. Se renderizan dentro de la ficha desplegable de
 * cada ejercicio.
 *
 * Convención de color (funciona en claro y oscuro):
 *   azul  #378ADD → ejercicios tumbado boca arriba (fase 1)
 *   verde #1D9E75 → movilidad en cuadrupedia / prono (fase 2)
 *   ocre  #BA7517 → core / fortalecimiento (fase 3)
 *   morado #7F77DD → postura de pie / sentado (fase 4)
 *   terracota #D85A30 → SIEMPRE la flecha del movimiento clave
 * El suelo se dibuja gris (#888780). La columna se marca con línea punteada.
 */

const A = "#D85A30"; // flecha movimiento
const FLOOR = "#888780";

const wrap = (inner: string, h = 200) =>
  `<svg width="100%" viewBox="0 0 320 ${h}" role="img" xmlns="http://www.w3.org/2000/svg"><defs><marker id="bk-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>${inner}</svg>`;

// Cada figura de palo: trazo grueso redondeado, articulaciones como puntos.
export const BACK_ILLUSTRATIONS: Record<string, string> = {
  "Respiración diafragmática": wrap(
    `<line x1="20" y1="150" x2="300" y2="150" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#378ADD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="60" cy="132" r="10" fill="#378ADD" stroke="none"/>
       <line x1="72" y1="138" x2="180" y2="140"/>
       <line x1="180" y1="140" x2="215" y2="104"/>
       <line x1="215" y1="104" x2="232" y2="146"/>
       <line x1="110" y1="139" x2="140" y2="120"/>
     </g>
     <circle cx="150" cy="128" r="16" fill="none" stroke="${A}" stroke-width="2.5" stroke-dasharray="3 4"/>
     <path d="M150 112 v-14" stroke="${A}" stroke-width="2.5" fill="none" marker-end="url(#bk-arrow)"/>
     <text x="150" y="86" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">inflar el abdomen</text>`,
  ),

  "Báscula pélvica": wrap(
    `<line x1="20" y1="150" x2="300" y2="150" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#378ADD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="58" cy="134" r="10" fill="#378ADD" stroke="none"/>
       <line x1="70" y1="139" x2="180" y2="142"/>
       <line x1="180" y1="142" x2="214" y2="104"/>
       <line x1="214" y1="104" x2="230" y2="146"/>
       <line x1="104" y1="140" x2="134" y2="122"/>
     </g>
     <path d="M92 145 L178 147" stroke="#042C53" stroke-width="2" stroke-dasharray="2 3" fill="none"/>
     <path d="M196 134 A 18 18 0 0 1 182 116" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <text x="150" y="96" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">ombligo adentro, glúteos firmes</text>`,
  ),

  "Rodillas al pecho": wrap(
    `<line x1="20" y1="160" x2="300" y2="160" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#378ADD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="70" cy="146" r="10" fill="#378ADD" stroke="none"/>
       <line x1="82" y1="150" x2="170" y2="152"/>
       <line x1="170" y1="152" x2="150" y2="108"/>
       <line x1="150" y1="108" x2="120" y2="120"/>
       <line x1="118" y1="150" x2="150" y2="118"/>
     </g>
     <path d="M176 130 q-16 -14 -34 -10" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <text x="160" y="92" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">rodilla hacia el pecho</text>`,
  ),

  "Gato-camello": wrap(
    `<line x1="20" y1="172" x2="300" y2="172" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <text x="90" y="40" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">gato · exhala</text>
     <g fill="none" stroke="#1D9E75" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <path d="M50 110 Q90 66 134 110"/>
       <line x1="56" y1="110" x2="60" y2="170"/>
       <line x1="128" y1="110" x2="132" y2="170"/>
       <circle cx="46" cy="122" r="8" fill="#1D9E75" stroke="none"/>
     </g>
     <path d="M90 80 v-16" stroke="${A}" stroke-width="2.5" fill="none" marker-end="url(#bk-arrow)"/>
     <text x="232" y="40" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#5F5E5A">camello · inhala</text>
     <g fill="none" stroke="#1D9E75" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <path d="M188 96 Q232 140 276 96"/>
       <line x1="194" y1="98" x2="190" y2="170"/>
       <line x1="270" y1="98" x2="274" y2="170"/>
       <circle cx="282" cy="90" r="8" fill="#1D9E75" stroke="none"/>
     </g>
     <path d="M232 120 v16" stroke="${A}" stroke-width="2.5" fill="none" marker-end="url(#bk-arrow)"/>`,
    200,
  ),

  "Postura de descanso": wrap(
    `<line x1="20" y1="155" x2="300" y2="155" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#1D9E75" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <line x1="70" y1="150" x2="150" y2="150"/>
       <line x1="150" y1="150" x2="210" y2="120"/>
       <line x1="210" y1="120" x2="270" y2="150"/>
       <circle cx="64" cy="148" r="8" fill="#1D9E75" stroke="none"/>
     </g>
     <path d="M120 138 h-40" stroke="${A}" stroke-width="2.5" fill="none" marker-end="url(#bk-arrow)"/>
     <text x="180" y="90" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">glúteos a los talones</text>`,
  ),

  "Esfinge (extensión McKenzie)": wrap(
    `<line x1="20" y1="155" x2="300" y2="155" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#1D9E75" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <line x1="120" y1="152" x2="250" y2="152"/>
       <path d="M120 152 Q96 120 72 92"/>
       <line x1="100" y1="138" x2="100" y2="152"/>
       <circle cx="66" cy="84" r="9" fill="#1D9E75" stroke="none"/>
     </g>
     <path d="M84 96 q14 -16 30 -10" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <text x="150" y="60" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">eleva el pecho, cadera en el suelo</text>`,
  ),

  "Puente de glúteo": wrap(
    `<line x1="20" y1="160" x2="300" y2="160" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#BA7517" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="58" cy="150" r="9" fill="#BA7517" stroke="none"/>
       <line x1="68" y1="153" x2="120" y2="150"/>
       <line x1="120" y1="150" x2="180" y2="112"/>
       <line x1="180" y1="112" x2="214" y2="126"/>
       <line x1="214" y1="126" x2="214" y2="158"/>
     </g>
     <path d="M150 132 v-22" stroke="${A}" stroke-width="2.5" fill="none" marker-end="url(#bk-arrow)"/>
     <text x="160" y="86" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">eleva la pelvis, línea recta</text>`,
  ),

  "Bird-dog": wrap(
    `<line x1="20" y1="165" x2="300" y2="165" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#BA7517" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <line x1="120" y1="110" x2="200" y2="110"/>
       <line x1="120" y1="110" x2="118" y2="162"/>
       <line x1="200" y1="110" x2="232" y2="162"/>
       <line x1="120" y1="110" x2="60" y2="92"/>
       <line x1="200" y1="110" x2="270" y2="92"/>
       <circle cx="52" cy="90" r="8" fill="#BA7517" stroke="none"/>
     </g>
     <path d="M70 84 h-16" stroke="${A}" stroke-width="2.5" fill="none" marker-end="url(#bk-arrow)"/>
     <path d="M256 84 h16" stroke="${A}" stroke-width="2.5" fill="none" marker-end="url(#bk-arrow)"/>
     <text x="160" y="56" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">brazo y pierna opuestos en línea</text>`,
  ),

  "Plancha lateral modificada": wrap(
    `<line x1="20" y1="160" x2="300" y2="160" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#BA7517" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="80" cy="96" r="9" fill="#BA7517" stroke="none"/>
       <line x1="88" y1="102" x2="170" y2="140"/>
       <line x1="170" y1="140" x2="210" y2="156"/>
       <line x1="92" y1="104" x2="92" y2="150"/>
     </g>
     <path d="M150 150 q4 -20 -2 -34" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <text x="170" y="74" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">sube la cadera, tronco firme</text>`,
  ),

  "Retracción de escápulas": wrap(
    `<g fill="none" stroke="#7F77DD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="150" cy="56" r="11" fill="#7F77DD" stroke="none"/>
       <line x1="150" y1="67" x2="150" y2="138"/>
       <line x1="150" y1="84" x2="120" y2="108"/>
       <line x1="150" y1="84" x2="180" y2="108"/>
       <line x1="150" y1="138" x2="132" y2="180"/>
       <line x1="150" y1="138" x2="168" y2="180"/>
     </g>
     <path d="M150 80 v74" stroke="#26215C" stroke-width="2" stroke-dasharray="2 3" fill="none"/>
     <path d="M124 104 q-22 0 -28 16" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <path d="M176 104 q22 0 28 16" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <text x="150" y="36" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">hombros atrás, junta omóplatos</text>`,
  ),

  "Estiramiento pectoral, manos en nuca": wrap(
    `<g fill="none" stroke="#7F77DD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="150" cy="58" r="11" fill="#7F77DD" stroke="none"/>
       <line x1="150" y1="69" x2="150" y2="140"/>
       <path d="M150 86 L120 74 L104 92"/>
       <path d="M150 86 L180 74 L196 92"/>
       <line x1="150" y1="140" x2="134" y2="184"/>
       <line x1="150" y1="140" x2="166" y2="184"/>
     </g>
     <path d="M108 88 q-16 4 -18 18" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <path d="M192 88 q16 4 18 18" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <text x="150" y="36" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">codos atrás, abre el pecho</text>`,
  ),

  "Rectificación contra la pared": wrap(
    `<line x1="92" y1="30" x2="92" y2="185" stroke="${FLOOR}" stroke-width="2" stroke-linecap="round"/>
     <g fill="none" stroke="#7F77DD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="108" cy="56" r="11" fill="#7F77DD" stroke="none"/>
       <line x1="104" y1="67" x2="104" y2="140"/>
       <line x1="104" y1="86" x2="128" y2="104"/>
       <line x1="104" y1="140" x2="104" y2="182"/>
     </g>
     <path d="M104 80 v56" stroke="#26215C" stroke-width="2" stroke-dasharray="2 3" fill="none"/>
     <path d="M124 110 q-18 0 -20 -14" fill="none" stroke="${A}" stroke-width="2.5" marker-end="url(#bk-arrow)"/>
     <text x="190" y="100" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">lumbar y nuca</text>
     <text x="190" y="116" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${A}">contra la pared</text>`,
  ),
};

export function getBackIllustration(name: string): string | null {
  return BACK_ILLUSTRATIONS[name] ?? null;
}
