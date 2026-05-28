import type { Language } from "../types";

/**
 * Diccionario de CONTENIDO DE DATOS (menús, ejercicios, técnicas…).
 *
 * A diferencia del diccionario de interfaz (inglés fuente), aquí la fuente es
 * el CASTELLANO, porque todo el contenido se redactó originalmente en español.
 * La clave es el propio texto en castellano; el valor son sus traducciones.
 *
 *   td("Rodillas altas")  →  "High knees" / "Genolls alts" / "Rodillas altas"
 *
 * Si falta una traducción, cae al castellano (la propia clave). Así la app
 * nunca muestra huecos.
 *
 * Estas tablas se rellenan vía el CSV/JSON de traducción. Cada sub-tanda de
 * migración añade su bloque (spartan, dieta, espalda, antiinflamatorio…).
 */

type DataDict = Record<string, { en?: string; ca?: string }>;

// ── SPARTAN · técnicas (cue) ────────────────────────────────
// El nombre del ejercicio ya vive como name/nameEs en spartanCircuit.ts;
// aquí van las técnicas y los nombres en catalán que faltaban.
const SPARTAN_DATA: DataDict = {
  // Nombres (castellano fuente → inglés; catalán vía CSV)
  "Rodillas altas": { en: "High knees" , ca: "Genolls amunt" },
  "Plancha con elevación alterna": { en: "Alternating plank raises" , ca: "Planxa amb elevació alterna" },
  "Saltos cohete": { en: "Rocket jumps" , ca: "Salts coet" },
  "Flexiones Spiderman": { en: "Spiderman push-ups" , ca: "Flexions Spiderman" },
  "Saltos rodillas al pecho": { en: "Jump knee tucks" , ca: "Salts amb genolls al pit" },
  "Flexiones": { en: "Push-ups" , ca: "Flexions" },
  "Sentadillas": { en: "Squats" , ca: "Esquats" },
  "Escaladores": { en: "Mountain climbers" , ca: "Escaladors" },
  "Plancha con salto a cuclillas": { en: "Plank to squat jump" , ca: "Planxa amb salt a la gatzara" },
  "Patadas frontales": { en: "Front kicks" , ca: "Cops de peu frontals" },
  "Puñetazos": { en: "Punches" , ca: "Cops de puny" },
  "Patadas laterales": { en: "Side kicks" , ca: "Cops de peu laterals" },
  "Crunch de rodilla": { en: "Knee crunch" , ca: "Crunch de genoll" },
  "Rodilla al codo": { en: "Knee to elbow" , ca: "Genoll al colze" },
  "Patadas en plancha invertida": { en: "Reverse plank kicks" , ca: "Cops de peu en planxa invertida" },

  // Técnicas (cue)
  "Corre en el sitio llevando las rodillas a la altura de la cadera, ritmo alto y brazos activos.": { en: "Run in place driving your knees to hip height, fast pace and active arms.", ca: "Corre al lloc portant els genolls a l'altura del maluc, ritme alt i braços actius." },
  "En plancha, eleva a la vez un brazo y la pierna contraria sin rotar la cadera. Alterna lados.": { en: "In a plank, raise one arm and the opposite leg at once without rotating the hips. Alternate sides.", ca: "En planxa, eleva alhora un braç i la cama contrària sense rotar el maluc. Alterna els costats." },
  "Desde media sentadilla, salta explosivo estirando todo el cuerpo y los brazos hacia arriba.": { en: "From a half squat, jump explosively extending your whole body and arms upward.", ca: "Des de mig esquat, salta de manera explosiva estirant tot el cos i els braços cap amunt." },
  "Flexión llevando la rodilla hacia el codo del mismo lado en la bajada. Alterna en cada repetición.": { en: "Push-up bringing your knee toward the same-side elbow on the way down. Alternate each rep.", ca: "Flexió portant el genoll cap al colze del mateix costat durant la baixada. Alterna a cada repetició." },
  "Salta llevando ambas rodillas al pecho y aterriza suave, amortiguando con las piernas.": { en: "Jump bringing both knees to your chest and land softly, cushioning with your legs.", ca: "Salta portant els dos genolls al pit i aterra suau, esmorteint amb les cames." },
  "Flexión clásica: cuerpo recto en línea, baja hasta casi tocar el suelo, codos cerca del torso.": { en: "Classic push-up: body in a straight line, lower until almost touching the floor, elbows close to the torso.", ca: "Flexió clàssica: cos recte en línia, baixa fins gairebé tocar a terra, colzes a prop del tors." },
  "Sentadilla a profundidad, pecho alto, rodillas siguiendo la punta del pie, peso en los talones.": { en: "Deep squat, chest up, knees tracking over the toes, weight on the heels.", ca: "Esquat profund, pit alt, genolls seguint la punta del peu, pes als talons." },
  "En plancha, lleva las rodillas al pecho alternando rápido, manteniendo la cadera baja.": { en: "In a plank, drive your knees to your chest alternating quickly, keeping the hips low.", ca: "En planxa, porta els genolls al pit alternant ràpidament, mantenint el maluc baix." },
  "Desde plancha, salta llevando los pies junto a las manos y vuelve atrás de un salto.": { en: "From a plank, jump your feet next to your hands and jump back again.", ca: "Des de planxa, salta portant els peus al costat de les mans i torna enrere d'un salt." },
  "Patada frontal alternando piernas, core firme y guardia arriba. Recoge la pierna al bajar.": { en: "Front kick alternating legs, firm core and guard up. Pull the leg back as you lower.", ca: "Cop de peu frontal alternant cames, core ferm i guàrdia amunt. Recull la cama en baixar." },
  "Puñetazos rectos alternos a ritmo de boxeo, rota ligeramente el tronco y mantén la guardia.": { en: "Alternating straight punches at boxing pace, rotate the torso slightly and keep your guard.", ca: "Cops de puny rectes alterns a ritme de boxa, rota lleugerament el tronc i mantén la guàrdia." },
  "Patada lateral alternando piernas, mantén el equilibrio y el abdomen activo.": { en: "Side kick alternating legs, keep your balance and your core active.", ca: "Cop de peu lateral alternant cames, mantén l'equilibri i l'abdomen actiu." },
  "Tumbado, lleva rodillas y tronco al centro contrayendo el abdomen; baja con control.": { en: "Lying down, bring knees and torso to the center contracting your abs; lower with control.", ca: "Estirat, porta genolls i tronc al centre contraient l'abdomen; baixa amb control." },
  "De pie, lleva la rodilla al codo contrario alternando; trabaja los oblicuos con ritmo.": { en: "Standing, bring your knee to the opposite elbow alternating; work the obliques rhythmically.", ca: "Dret, porta el genoll al colze contrari alternant; treballa els oblics amb ritme." },
  "En plancha invertida (mirando arriba), patea una pierna hacia el techo alternando. Cadera alta.": { en: "In a reverse plank (facing up), kick one leg toward the ceiling alternating. Hips high.", ca: "En planxa invertida (mirant amunt), fes un cop de peu cap al sostre alternant. Maluc alt." },
};

// Las demás tablas (dieta, espalda, antiinflamatorio) se añaden en sus tandas.
const DIET_DATA: DataDict = {
  // Títulos de comida
  "Desayuno": { en: "Breakfast" , ca: "Esmorzar" },
  "Almuerzo": { en: "Mid-morning" , ca: "Mig matí" },
  "Comida": { en: "Lunch" , ca: "Dinar" },
  "Merienda": { en: "Afternoon snack" , ca: "Berenar" },
  "Cena": { en: "Dinner" , ca: "Sopar" },
  // Títulos de comida con sufijo de actividad (los que aparecen en menús especiales)
  "Comida · pre-pádel": { en: "Lunch · pre-padel" , ca: "Dinar · pre-Pádel" },
  "Merienda · pre-pádel": { en: "Snack · pre-padel" , ca: "Berenar · pre-Pádel" },
  "Cena post-pádel": { en: "Dinner · post-padel" , ca: "Sopar post-Pádel" },
  "Merienda · pre-fútbol": { en: "Snack · pre-football" , ca: "Berenar · pre-futbol" },
  "Cena post-fútbol": { en: "Dinner · post-football" , ca: "Sopar post-futbol" },
  // Batidos
  "Pre-entreno · Batido de avena": { en: "Pre-workout · Oat shake" , ca: "Preentrenament · Batut de civada" },
  "Post-entreno · Proteína + creatina": { en: "Post-workout · Protein + creatine" , ca: "Postentrenament · Proteïna + creatina" },
  // Notas de batido y actividad
  "Energía media sin sobrecargar la digestión antes de entrenar.": { en: "Moderate energy without overloading digestion before training.", ca: "Energia mitjana sense sobrecarregar la digestió abans d'entrenar." },
  "Ventana anabólica: corta el catabolismo tras la termoterapia.": { en: "Anabolic window: stops catabolism after thermotherapy.", ca: "Finestra anabòlica: talla el catabolisme després de la termoteràpia." },
  "Omega-3 antiinflamatorio.": { en: "Anti-inflammatory omega-3." , ca: "Omega-3 antiinflamatori." },
  "Omega-3 para modular la inflamación de la semana.": { en: "Omega-3 to modulate the week's inflammation.", ca: "Omega-3 per modular la inflamació de la setmana." },
  "Cardio: hidrátate bien y añade un extra de carbohidrato si el rodaje es largo.": { en: "Cardio: hydrate well and add extra carbs if the run is long.", ca: "Cardio: hidrata't bé i afegeix un extra de carbohidrat si el rodatge és llarg." },
  "Esfuerzo intermitente intenso: prioriza carga de hidratos y electrolitos.": { en: "Intense intermittent effort: prioritize carb load and electrolytes.", ca: "Esforç intermitent intens: prioritza la càrrega d'hidrats i electròlits." },
  "Alta demanda anaeróbica y de impacto: hidratos y sodio.": { en: "High anaerobic and impact demand: carbs and sodium.", ca: "Alta demanda anaeròbica i d'impacte: hidrats i sodi." },
  "Fuerza-resistencia y agarre: proteína suficiente, hidratos moderados.": { en: "Strength-endurance and grip: enough protein, moderate carbs.", ca: "Força-resistència i agafada: proteïna suficient, hidrats moderats." },
  "Ajusta la carga de hidratos a cómo de exigente haya sido.": { en: "Adjust the carb load to how demanding it was.", ca: "Ajusta la càrrega d'hidrats a com d'exigent hagi estat." },
  // Variantes semanales
  "Semana 1 · Mediterránea clásica": { en: "Week 1 · Classic Mediterranean" , ca: "Setmana 1 · Mediterrània clàssica" },
  "Semana 2 · Pescado azul y legumbres": { en: "Week 2 · Oily fish and legumes" , ca: "Setmana 2 · Peix blau i llegums" },
  "Semana 3 · Carnes magras y aves": { en: "Week 3 · Lean meats and poultry" , ca: "Setmana 3 · Carns magres i aus" },
  "Semana 4 · Marisco y proteína vegetal": { en: "Week 4 · Seafood and plant protein" , ca: "Setmana 4 · Marisc i proteïna vegetal" },
  // Categorías de la compra
  "Proteína": { en: "Protein" , ca: "Proteïna" },
  "Lácteos": { en: "Dairy" , ca: "Lactis" },
  "Carbohidratos": { en: "Carbohydrates" , ca: "Carbohidrats" },
  "Fruta y verdura": { en: "Fruit and vegetables" , ca: "Fruita i verdura" },
  "Grasas y despensa": { en: "Fats and pantry" , ca: "Greixos i rebost" },
  "Suplementos": { en: "Supplements" , ca: "Suplements" },
};

// ── ESPALDA · fases, ejercicios, hábitos ────────────────────
const BACK_DATA: DataDict = {
  // Fases
  "Fase 1 · Respiración y pelvis": { en: "Phase 1 · Breathing and pelvis" , ca: "Fase 1 · Respiració i pelvis" },
  "Despertar neuromotor": { en: "Neuromotor wake-up" , ca: "Despertar neuromotor" },
  "Tumbado boca arriba, rodillas flexionadas": { en: "Lying on your back, knees bent" , ca: "Estirat de panxa enlaire, genolls flexionats" },
  "Fase 2 · Movilidad": { en: "Phase 2 · Mobility" , ca: "Fase 2 · Mobilitat" },
  "Nutrir y lubricar": { en: "Nourish and lubricate" , ca: "Nodrir i lubricar" },
  "Cuadrupedia y boca abajo": { en: "On all fours and face down" , ca: "Quadrupèdia i de bocaterrosa" },
  "Fase 3 · Core": { en: "Phase 3 · Core" , ca: "Fase 3 · Core" },
  "Rigidez protectora (McGill)": { en: "Protective stiffness (McGill)" , ca: "Rigidesa protectora (McGill)" },
  "Suelo, control isométrico": { en: "Floor, isometric control" , ca: "Terra, control isomètric" },
  "Fase 4 · Postura": { en: "Phase 4 · Posture" , ca: "Fase 4 · Postura" },
  "Columna dorsal y escápulas": { en: "Thoracic spine and shoulder blades" , ca: "Columna dorsal i escàpules" },
  "Sentado o de pie": { en: "Seated or standing" , ca: "Assegut o dret" },
  // Nombres de ejercicio
  "Respiración diafragmática": { en: "Diaphragmatic breathing" , ca: "Respiració diafragmàtica" },
  "Báscula pélvica": { en: "Pelvic tilt" , ca: "Bàscula pelviana" },
  "Rodillas al pecho": { en: "Knees to chest" , ca: "Genolls al pit" },
  "Gato-camello": { en: "Cat-camel" , ca: "Gat-camell" },
  "Postura de descanso": { en: "Resting pose" , ca: "Postura de descans" },
  "Esfinge (extensión McKenzie)": { en: "Sphinx (McKenzie extension)" , ca: "Esfinx (extensió McKenzie)" },
  "Puente de glúteo": { en: "Glute bridge" , ca: "Pont de gluti" },
  "Bird-dog": { en: "Bird-dog" , ca: "Bird-dog" },
  "Plancha lateral modificada": { en: "Modified side plank" , ca: "Planxa lateral modificada" },
  "Retracción de escápulas": { en: "Scapular retraction" , ca: "Retracció d'escàpules" },
  "Estiramiento pectoral, manos en nuca": { en: "Chest stretch, hands behind head" , ca: "Estirament pectoral, mans al clatell" },
  "Rectificación contra la pared": { en: "Wall posture alignment" , ca: "Rectificació contra la paret" },
  // Dosis con texto traducible
  "10 ciclos": { en: "10 cycles" , ca: "10 cicles" },
  "10 repeticiones · 5-10 s": { en: "10 reps · 5-10 s" , ca: "10 repeticions · 5-10 s" },
  "20-30 s por lado": { en: "20-30 s per side" , ca: "20-30 s per costat" },
  "5-10 ciclos": { en: "5-10 cycles" , ca: "5-10 cicles" },
  "20-30 s": { en: "20-30 s" , ca: "20-30 s" },
  "ciclos de 20 s": { en: "20 s cycles" , ca: "cicles de 20 s" },
  "6-10 reps · 6-30 s": { en: "6-10 reps · 6-30 s" , ca: "6-10 reps · 6-30 s" },
  "2-3 × 10-20 s por lado": { en: "2-3 × 10-20 s per side" , ca: "2-3 × 10-20 s per costat" },
  "10 reps · 3-5 s": { en: "10 reps · 3-5 s" , ca: "10 reps · 3-5 s" },
  "5 reps · 5-10 s": { en: "5 reps · 5-10 s" , ca: "5 reps · 5-10 s" },
  "5-8 reps": { en: "5-8 reps" , ca: "5-8 reps" },
  // Ejecución (how)
  "Manos sobre el vientre. Inspira por la nariz inflando el abdomen; exhala lento por la boca hundiendo el ombligo. Relaja el psoas y baja el estrés simpático.": { en: "Hands on your belly. Breathe in through the nose inflating the abdomen; breathe out slowly through the mouth drawing the navel in. Relaxes the psoas and lowers sympathetic stress.", ca: "Mans sobre el ventre. Inspira pel nas inflant l'abdomen; exhala lentament per la boca enfonsant el llombrígol. Relaxa el psoes i redueix l'estrès simpàtic." },
  "Al exhalar, lleva el ombligo hacia dentro y aplana la curva lumbar contra el suelo, contrayendo glúteos. Mantén sin bloquear la respiración y relaja.": { en: "As you exhale, draw the navel in and flatten the lumbar curve against the floor, squeezing your glutes. Hold without holding your breath, then relax.", ca: "En exhalar, porta el llombrígol cap endins i aplana la corba lumbar contra terra, contraient els glutis. Mantén sense bloquejar la respiració i relaxa." },
  "Atrae una rodilla al pecho con las manos, respiración relajada; alterna y termina con ambas rodillas. Abre los espacios vertebrales y libera la fascia lumbar.": { en: "Pull one knee to your chest with your hands, breathing relaxed; alternate and finish with both knees. Opens the vertebral spaces and releases the lumbar fascia.", ca: "Atreu un genoll al pit amb les mans, respiració relaxada; alterna i acaba amb tots dos genolls. Obre els espais vertebrals i allibera la fàscia lumbar." },
  "En cuadrupedia, arquea la espalda hacia el techo (barbilla al pecho) y luego deja caer el abdomen mirando al frente. Movimiento fluido, sin dolor: bombea líquido a las articulaciones.": { en: "On all fours, arch your back to the ceiling (chin to chest), then let your abdomen drop looking forward. Smooth, pain-free movement: it pumps fluid into the joints.", ca: "En quadrupèdia, arqueja l'esquena cap al sostre (barbeta al pit) i després deixa caure l'abdomen mirant endavant. Moviment fluid, sense dolor: bombeja líquid a les articulacions." },
  "Desde cuadrupedia, lleva los glúteos hacia los talones y deja caer el torso, brazos estirados al frente. Tracción suave de toda la zona lumbodorsal.": { en: "From all fours, bring your glutes toward your heels and let your torso drop, arms stretched forward. Gentle traction of the whole lower-back area.", ca: "Des de quadrupèdia, porta els glutis cap als talons i deixa caure el tors, braços estirats endavant. Tracció suau de tota la zona lumbodorsal." },
  "Boca abajo sobre los antebrazos, caderas y piernas relajadas en el suelo. Eleva el tronco induciendo una lordosis suave. Ideal si el dolor mejora con la extensión.": { en: "Face down on your forearms, hips and legs relaxed on the floor. Lift your trunk inducing a gentle lordosis. Ideal if pain improves with extension.", ca: "De bocaterrosa sobre els avantbraços, malucs i cames relaxats a terra. Eleva el tronc induint una lordosi suau. Ideal si el dolor millora amb l'extensió." },
  "Boca arriba, rodillas flexionadas. Pre-contrae el glúteo y eleva la pelvis vértebra a vértebra hasta una línea recta rodilla-cadera-hombro. Sin hiperextender la lumbar.": { en: "On your back, knees bent. Pre-contract the glute and lift the pelvis vertebra by vertebra to a straight knee-hip-shoulder line. Without hyperextending the lower back.", ca: "De panxa enlaire, genolls flexionats. Precontrau el gluti i eleva la pelvis vèrtebra a vèrtebra fins a una línia recta genoll-maluc-espatlla. Sense hiperextendre la lumbar." },
  "En cuadrupedia, extiende un brazo y la pierna contraria en línea con el tronco, ombligo hundido, sin rotar la pelvis. Co-contracción antirrotación. Alterna lados.": { en: "On all fours, extend one arm and the opposite leg in line with the trunk, navel drawn in, without rotating the pelvis. Anti-rotation co-contraction. Alternate sides.", ca: "En quadrupèdia, estén un braç i la cama contrària en línia amb el tronc, llombrígol enfonsat, sense rotar la pelvis. Cocontracció antirotació. Alterna els costats." },
  "Apoyo sobre antebrazo y rodillas flexionadas. Sube la cadera y mantén el tronco firme. Activa cuadrado lumbar y oblicuos sin cargar la columna.": { en: "Resting on your forearm and bent knees. Lift the hip and keep the trunk firm. Activates the quadratus lumborum and obliques without loading the spine.", ca: "Recolzament sobre l'avantbraç i genolls flexionats. Puja el maluc i mantén el tronc ferm. Activa el quadrat lumbar i els oblics sense carregar la columna." },
  "Erguido, lleva los hombros atrás juntando los omóplatos como si sujetaras algo entre ellos. Reeduca contra la chepa postural. Puedes hacerlo en la silla de oficina.": { en: "Upright, draw your shoulders back squeezing the shoulder blades together as if holding something between them. Re-educates against postural hunching. You can do it in your office chair.", ca: "Dret, porta les espatlles enrere ajuntant els omòplats com si subjectessis alguna cosa entre ells. Reeduca contra la gepa postural. Pots fer-ho a la cadira de l'oficina." },
  "Manos entrelazadas tras la nuca, lleva los codos atrás abriendo el pecho y juntando escápulas. Libera la retracción pectoral del trabajo de pantalla.": { en: "Hands clasped behind your head, draw your elbows back opening the chest and bringing the shoulder blades together. Releases the chest tightness from screen work.", ca: "Mans entrellaçades al clatell, porta els colzes enrere obrint el pit i ajuntant escàpules. Allibera la retracció pectoral del treball de pantalla." },
  "Talones, glúteos, espalda y nuca contra la pared. Exhala aplanando la lumbar contra el muro y empuja la nuca atrás sin levantar la barbilla. Avanzado: desliza a sentadilla.": { en: "Heels, glutes, back and neck against the wall. Exhale flattening the lower back against the wall and push the neck back without raising your chin. Advanced: slide into a squat.", ca: "Talons, glutis, esquena i clatell contra la paret. Exhala aplanant la lumbar contra el mur i empeny el clatell enrere sense aixecar la barbeta. Avançat: llisca cap a un esquat." },
  // Hábitos posturales (título + texto)
  "Escritorio": { en: "Desk" , ca: "Escriptori" },
  "Pantalla a la altura de los ojos, espalda apoyada en el respaldo con soporte lumbar, pies apoyados. Evita cruzar las piernas.": { en: "Screen at eye level, back against the chair with lumbar support, feet flat. Avoid crossing your legs.", ca: "Pantalla a l'altura dels ulls, esquena recolzada al respatller amb suport lumbar, peus recolzats. Evita creuar les cames." },
  "Regla visual 20/20": { en: "20/20 vision rule" , ca: "Regla visual 20/20" },
  "Cada 20 minutos frente a la pantalla, mira un punto lejano 20 segundos. Evita adelantar la cabeza por fatiga visual.": { en: "Every 20 minutes at the screen, look at a distant point for 20 seconds. Avoid pushing your head forward from eye strain.", ca: "Cada 20 minuts davant de la pantalla, mira un punt llunyà durant 20 segons. Evita avançar el cap per fatiga visual." },
  "Levantar peso": { en: "Lifting weight" , ca: "Aixecar pes" },
  "Dobla rodillas y caderas, columna vertical y abdomen firme. Empuja con piernas y glúteos, carga pegada al cuerpo, sin girar el tronco.": { en: "Bend your knees and hips, spine vertical and core firm. Push with legs and glutes, load close to your body, without twisting the trunk.", ca: "Doblega genolls i malucs, columna vertical i abdomen ferm. Empeny amb cames i glutis, càrrega enganxada al cos, sense girar el tronc." },
  "Dormir": { en: "Sleeping" , ca: "Dormir" },
  "Evita boca abajo. Boca arriba con un cojín bajo las rodillas, o de lado con un cojín entre las rodillas. Al levantarte, gira de lado primero.": { en: "Avoid sleeping face down. On your back with a cushion under the knees, or on your side with a cushion between the knees. To get up, roll onto your side first.", ca: "Evita dormir de bocaterrosa. De panxa enlaire amb un coixí sota els genolls, o de costat amb un coixí entre els genolls. En llevar-te, gira't de costat primer." },
  // Disclaimer de espalda
  "Guía educativa de higiene postural, no un diagnóstico médico. Detén cualquier ejercicio que provoque dolor agudo o irradiado y consulta a un fisioterapeuta si el dolor persiste.": { en: "Educational postural-hygiene guide, not a medical diagnosis. Stop any exercise that causes sharp or radiating pain and see a physiotherapist if pain persists.", ca: "Guia educativa d'higiene postural, no un diagnòstic mèdic. Atura qualsevol exercici que provoqui dolor agut o irradiat i consulta un fisioterapeuta si el dolor persisteix." },
};

// ── ANTIINFLAMATORIO · principios y sellos ──────────────────
const ANTIINFLAMMATORY_DATA: DataDict = {
  // Intro
  "Sobre la dieta base se aplica un enfoque antiinflamatorio: resolver la inflamación residual del entrenamiento concurrente sin apagar la señal que hace crecer el músculo.": {
    en: "An anti-inflammatory layer is applied over the base diet: resolving residual inflammation from concurrent training without switching off the signal that builds muscle.",
    ca: "Sobre la dieta base s'aplica un enfocament antiinflamatori: resoldre la inflamació residual de l'entrenament concurrent sense apagar el senyal que fa créixer el múscul.",
  },
  // Principios (título + texto)
  "Equilibrio omega-3 / omega-6": { en: "Omega-3 / omega-6 balance" , ca: "Equilibri omega-3 / omega-6" },
  "Prioriza pescado azul pequeño (sardina, caballa, anchoa), AOVE, aguacate y semillas de lino o chía. Reduce aceites de semillas refinados y ultraprocesados, que disparan la inflamación.": { en: "Prioritize small oily fish (sardine, mackerel, anchovy), EVOO, avocado and flax or chia seeds. Cut refined seed oils and ultra-processed foods, which drive inflammation.", ca: "Prioritza peix blau petit (sardina, verat, anxova), EVOO, alvocat i llavors de lli o xia. Redueix olis de llavors refinats i ultraprocessats, que disparen la inflamació." },
  "Glucosa estable, menos AGEs": { en: "Stable glucose, fewer AGEs" , ca: "Glucosa estable, menys AGEs" },
  "Carbohidrato de bajo índice glucémico (avena, quinoa, boniato) y nada de azúcar libre fuera del peri-entreno. Cocina al vapor, hervido o bajas temperaturas; evita lo carbonizado y las frituras.": { en: "Low-glycemic-index carbs (oats, quinoa, sweet potato) and no free sugar outside the peri-workout window. Steam, boil or cook at low temperatures; avoid charring and frying.", ca: "Carbohidrat de baix índex glucèmic (civada, quinoa, moniato) i gens de sucre lliure fora del pre/postentrenament. Cuina al vapor, bullit o a baixes temperatures; evita el carbonitzat i els fregits." },
  "Especias que modulan": { en: "Spices that modulate" , ca: "Espècies que modulen" },
  "Cúrcuma (siempre con pimienta negra y una grasa para absorberla), jengibre y ajo crudo bajan la señal inflamatoria de las articulaciones tras los impactos.": { en: "Turmeric (always with black pepper and a fat to absorb it), ginger and raw garlic lower the joints' inflammatory signal after impacts.", ca: "Cúrcuma (sempre amb pebre negre i un greix per absorbir-la), gingebre i all cru baixen el senyal inflamatori de les articulacions després dels impactes." },
  "Eje intestino-músculo": { en: "Gut-muscle axis" , ca: "Eix intestí-múscul" },
  "Fermentados vivos (kéfir, yogur, chucrut) y fibra prebiótica (verdura, legumbre, ajo, cebolla) cuidan la barrera intestinal y aceleran la recuperación.": { en: "Live ferments (kefir, yogurt, sauerkraut) and prebiotic fiber (vegetables, legumes, garlic, onion) protect the gut barrier and speed recovery.", ca: "Fermentats vius (quèfir, iogurt, xucrut) i fibra prebiòtica (verdura, llegum, all, ceba) cuiden la barrera intestinal i acceleren la recuperació." },
  "Almidón resistente": { en: "Resistant starch" , ca: "Midó resistent" },
  "Cocer y enfriar 24 h patata, boniato o arroz crea almidón resistente: estabiliza la insulina y alimenta tu microbiota. Recalienta suave o tómalo frío.": { en: "Cooking and cooling potato, sweet potato or rice for 24 h creates resistant starch: it stabilizes insulin and feeds your microbiota. Reheat gently or eat cold.", ca: "Coure i refredar 24 h patata, moniato o arròs crea midó resistent: estabilitza la insulina i alimenta la teva microbiota. Reescalfa-ho suau o pren-ho fred." },
  "Antioxidantes periodizados": { en: "Periodized antioxidants" , ca: "Antioxidants perioditzats" },
  "No abuses de megadosis de antioxidantes justo tras la fuerza matutina: cierta inflamación es la señal que dispara la hipertrofia. Reserva la carga antiinflamatoria fuerte para los días de partido o fatiga alta.": { en: "Don't overdo antioxidant megadoses right after morning strength work: some inflammation is the signal that triggers hypertrophy. Save the strong anti-inflammatory load for match days or high fatigue.", ca: "No abusis de megadosis d'antioxidants just després de la força matinal: certa inflamació és el senyal que dispara la hipertròfia. Reserva la càrrega antiinflamatòria forta per als dies de partit o fatiga alta." },
  // Sellos por ingrediente (label + why)
  "Omega-3 EPA/DHA": { en: "Omega-3 EPA/DHA" , ca: "Omega-3 EPA/DHA" },
  "Pescado azul: genera resolvinas que apagan la inflamación post-esfuerzo.": { en: "Oily fish: generates resolvins that switch off post-exercise inflammation.", ca: "Peix blau: genera resolvines que apaguen la inflamació postesforç." },
  "Grasa monoinsaturada": { en: "Monounsaturated fat" , ca: "Greix monoinsaturat" },
  "AOVE y aguacate: protegen la membrana celular y el endotelio.": { en: "EVOO and avocado: protect the cell membrane and the endothelium.", ca: "EVOO i alvocat: protegeixen la membrana cel·lular i l'endoteli." },
  "Omega-3 vegetal": { en: "Plant omega-3" , ca: "Omega-3 vegetal" },
  "Lino, chía y nueces aportan ácido alfa-linolénico antiinflamatorio.": { en: "Flax, chia and walnuts provide anti-inflammatory alpha-linolenic acid.", ca: "Lli, xia i nous aporten àcid alfalinolènic antiinflamatori." },
  "Especia moduladora": { en: "Modulating spice" , ca: "Espècia moduladora" },
  "Cúrcuma, jengibre y ajo frenan la señal de citoquinas en las articulaciones.": { en: "Turmeric, ginger and garlic curb the cytokine signal in the joints.", ca: "Cúrcuma, gingebre i all frenen el senyal de citocines a les articulacions." },
  "Probiótico": { en: "Probiotic" , ca: "Probiòtic" },
  "Fermentados vivos: refuerzan la barrera intestinal y la recuperación.": { en: "Live ferments: reinforce the gut barrier and recovery.", ca: "Fermentats vius: reforcen la barrera intestinal i la recuperació." },
  "Polifenoles": { en: "Polyphenols" , ca: "Polifenols" },
  "Frutos rojos: antioxidantes que combaten el estrés oxidativo del ejercicio.": { en: "Berries: antioxidants that fight the oxidative stress of exercise.", ca: "Fruits vermells: antioxidants que combaten l'estrès oxidatiu de l'exercici." },
  "Carbohidrato de bajo IG": { en: "Low-GI carb" , ca: "Carbohidrat de baix IG" },
  "Libera glucosa lento: evita picos de insulina y glicación.": { en: "Releases glucose slowly: avoids insulin spikes and glycation.", ca: "Allibera glucosa lentament: evita pics d'insulina i glicació." },
  "Verdura antioxidante": { en: "Antioxidant vegetable" , ca: "Verdura antioxidant" },
  "Hoja verde y crucíferas: fibra prebiótica y micronutrientes antiinflamatorios.": { en: "Leafy greens and crucifers: prebiotic fiber and anti-inflammatory micronutrients.", ca: "Fulla verda i crucíferes: fibra prebiòtica i micronutrients antiinflamatoris." },
};

// ── PLAN SEMANAL · pesas (focus, ejercicios, notas) ─────────
const WEEKPLAN_DATA: DataDict = {
  // Labels de día visibles
  "Lunes": { en: "Monday" , ca: "Dilluns" },
  "Martes": { en: "Tuesday" , ca: "Dimarts" },
  "Miércoles": { en: "Wednesday" , ca: "Dimecres" },
  "Jueves": { en: "Thursday" , ca: "Dijous" },
  "Viernes": { en: "Friday" , ca: "Divendres" },
  "Sábado": { en: "Saturday" , ca: "Dissabte" },
  "Domingo": { en: "Sunday" , ca: "Diumenge" },
  // Deportes
  "Pádel": { en: "Padel" , ca: "Pádel" },
  "Fútbol": { en: "Football" , ca: "Futbol" },
  // Focus del día
  "Empuje · Pectoral · Core": { en: "Push · Chest · Core" , ca: "Empenta · Pectoral · Core" },
  "Tracción · Espalda · Bíceps": { en: "Pull · Back · Biceps" , ca: "Tracció · Esquena · Bíceps" },
  "Potencia superior total": { en: "Total upper-body power" , ca: "Potència superior total" },
  "Dominio anatómico calisténico": { en: "Calisthenic body mastery" , ca: "Domini anatòmic calistènic" },
  "Calistenia · Core · Movilidad": { en: "Calisthenics · Core · Mobility" , ca: "Calistènia · Core · Mobilitat" },
  "Recuperación activa · Termoterapia": { en: "Active recovery · Thermotherapy" , ca: "Recuperació activa · Termoteràpia" },
  "Calibración mental · Supercompensación": { en: "Mental calibration · Supercompensation" , ca: "Calibratge mental · Supercompensació" },
  // Nombres de ejercicio
  "Press de Banca con Barra": { en: "Barbell Bench Press" , ca: "Press de Banca amb Barra" },
  "Press Militar de Pie con Barra": { en: "Standing Barbell Overhead Press" , ca: "Press Militar Dret amb Barra" },
  "Fondos (Dips) Lastrados o Libres": { en: "Weighted or Bodyweight Dips" , ca: "Fons (Dips) Llastrats o Lliures" },
  "Extensión de Tríceps en Polea": { en: "Cable Triceps Extension" , ca: "Extensió de Tríceps en Politja" },
  "Dominadas Lastradas": { en: "Weighted Pull-ups" , ca: "Dominades Llastrades" },
  "Dominadas Supinadas": { en: "Chin-ups" , ca: "Dominades Supinades" },
  "Remo con Mancuerna Unilateral": { en: "Single-arm Dumbbell Row" , ca: "Rem amb Manuella Unilateral" },
  "Pullover (DB) o Lat Pulldown": { en: "Dumbbell Pullover or Lat Pulldown" , ca: "Pullover (DB) o Lat Pulldown" },
  "Curl de Bíceps Predicador (Press Scott)": { en: "Preacher Curl" , ca: "Curl de Bíceps Predicador (Press Scott)" },
  "Press de Hombro Unilateral (DB)": { en: "Single-arm Dumbbell Shoulder Press" , ca: "Press d'Espatlla Unilateral (DB)" },
  "Elevaciones Laterales en Polea": { en: "Cable Lateral Raises" , ca: "Elevacions Laterals en Politja" },
  "Elevaciones Frontales y Press Sentado (DB)": { en: "Front Raises and Seated Press (DB)" , ca: "Elevacions Frontals i Press Assegut (DB)" },
  "Face Pulls en Polea": { en: "Cable Face Pulls" , ca: "Face Pulls en Politja" },
  "Curl de Bíceps con Banda": { en: "Band Biceps Curl" , ca: "Curl de Bíceps amb Banda" },
  "Muscle-Ups (o Negativas Controladas)": { en: "Muscle-Ups (or Controlled Negatives)" , ca: "Muscle-Ups (o Negatives Controlades)" },
  "Dominadas Australianas": { en: "Australian Pull-ups" , ca: "Dominades Australianes" },
  "Flexiones Pica (Pike Push-ups)": { en: "Pike Push-ups" , ca: "Flexions Pica (Pike Push-ups)" },
  "Fondos (Dips) Lastrados o Libres ": { en: "Weighted or Bodyweight Dips" , ca: "Fons (Dips) Llastrats o Lliures" },
  "L-Sit (Retención Isométrica)": { en: "L-Sit (Isometric Hold)" , ca: "L-Sit (Retenció Isomètrica)" },
  "Remos Invertidos en Anillas / Barra baja": { en: "Inverted Rows on Rings / Low Bar" , ca: "Rems Invertits en Anelles / Barra baixa" },
  "Sentadillas Cosaco / Zancadas Laterales": { en: "Cossack Squats / Lateral Lunges" , ca: "Esquats Cosac / Gambades Laterals" },
  "Reto 30 Días · Flexiones Acumulativas": { en: "30-Day Challenge · Cumulative Push-ups" , ca: "Repte 30 Dies · Flexions Acumulatives" },
  "Reto de Flexiones (estándar · diamante · inclinada)": { en: "Push-up Challenge (standard · diamond · incline)" , ca: "Repte de Flexions (estàndard · diamant · inclinada)" },
  "Reto de Plancha (estándar · lateral · con toques)": { en: "Plank Challenge (standard · side · with taps)" , ca: "Repte de Planxa (estàndard · lateral · amb tocs)" },
  "Flujo de Yoga Extenso": { en: "Extended Yoga Flow" , ca: "Flux de Ioga Extens" },
  "Estiramiento suave global": { en: "Gentle full-body stretch" , ca: "Estirament suau global" },
  "Sesión Extendida Sauna + Piscina": { en: "Extended Sauna + Pool Session" , ca: "Sessió Estesa Sauna + Piscina" },
  "Escaneo corporal · meditación profunda": { en: "Body scan · deep meditation" , ca: "Escaneig corporal · meditació profunda" },
  // Notas
  "Fuerza absoluta, fibras tipo II": { en: "Absolute strength, type II fibers" , ca: "Força absoluta, fibres tipus II" },
  "Base para fuerza sobre la cabeza": { en: "Base for overhead strength" , ca: "Base per a força sobre el cap" },
  "Pectoral inferior + tríceps en masa": { en: "Lower chest + triceps mass" , ca: "Pectoral inferior + tríceps en massa" },
  "Densidad muscular sin estrés espinal": { en: "Muscle density without spinal stress" , ca: "Densitat muscular sense estrès espinal" },
  "Tracción vertical principal": { en: "Main vertical pull" , ca: "Tracció vertical principal" },
  "Fibras de contracción rápida · dorsal": { en: "Fast-twitch fibers · lats" , ca: "Fibres de contracció ràpida · dorsal" },
  "Romboides y espalda media sin carga axial": { en: "Rhomboids and mid-back without axial load" , ca: "Romboides i esquena mitjana sense càrrega axial" },
  "Pre-agotamiento del dorsal sin bíceps": { en: "Lat pre-exhaustion without biceps" , ca: "Preesgotament del dorsal sense bíceps" },
  "Aislamiento distal con pico de contracción": { en: "Distal isolation with peak contraction" , ca: "Aïllament distal amb pic de contracció" },
  "Transición tracción → empuje máximo": { en: "Transition pull → max push" , ca: "Transició tracció → empenta màxima" },
  "Tensión continua sobre deltoides medial": { en: "Continuous tension on the medial deltoid" , ca: "Tensió contínua sobre deltoide medial" },
  "Contorno del hombro (Tennyson)": { en: "Shoulder contour (Tennyson)" , ca: "Contorn de l'espatlla (Tennyson)" },
  "Estabiliza escápula · protege manguito": { en: "Stabilizes the scapula · protects the cuff" , ca: "Estabilitza l'escàpula · protegeix el manegot" },
  "Bíceps en posición elongada": { en: "Biceps in a lengthened position" , ca: "Bíceps en posició elongada" },
  "Transición tracción → empuje máximo ": { en: "Transition pull → max push" , ca: "Transició tracció → empenta màxima" },
  "Adaptación volumétrica extrema": { en: "Extreme volume adaptation" , ca: "Adaptació volumètrica extrema" },
  "Densidad muscular sin estrés espinal ": { en: "Muscle density without spinal stress" , ca: "Densitat muscular sense estrès espinal" },
  "Base para fuerza sobre la cabeza ": { en: "Base for overhead strength" , ca: "Base per a força sobre el cap" },
  "Compresión de cadera, abdomen inferior": { en: "Hip compression, lower abs" , ca: "Compressió de maluc, abdomen inferior" },
  "Rigidez isométrica del core": { en: "Isometric core stiffness" , ca: "Rigidesa isomètrica del core" },
  "Romboides y espalda media sin carga axial ": { en: "Rhomboids and mid-back without axial load" , ca: "Romboides i esquena mitjana sense càrrega axial" },
  "Apertura mecánica de aductores": { en: "Mechanical opening of the adductors" , ca: "Obertura mecànica d'adductors" },
  "Acumulación volumétrica · hipertrofia sarcoplásmica": { en: "Volume accumulation · sarcoplasmic hypertrophy" , ca: "Acumulació volumètrica · hipertròfia sarcoplasmàtica" },
  "Estabilización antirotacional del core": { en: "Anti-rotation core stabilization" , ca: "Estabilització antirotacional del core" },
  "Estabilidad anterior bajo carga": { en: "Anterior stability under load" , ca: "Estabilitat anterior sota càrrega" },
  "Transverso abdominal · torque rotacional pádel": { en: "Transverse abdominis · padel rotational torque" , ca: "Transvers abdominal · torque rotacional Pádel" },
  "Restaura longitud de sarcómero": { en: "Restores sarcomere length" , ca: "Restaura longitud de sarcòmer" },
  "Rotación externa escapular, postura": { en: "Scapular external rotation, posture" , ca: "Rotació externa escapular, postura" },
  "Proteínas de choque térmico (HSPs)": { en: "Heat-shock proteins (HSPs)" , ca: "Proteïnes de xoc tèrmic (HSPs)" },
  "Activación parasimpática completa": { en: "Full parasympathetic activation" , ca: "Activació parasimpàtica completa" },
  "Aislamiento sin estrés neural": { en: "Isolation without neural stress" , ca: "Aïllament sense estrès neural" },
  "Lectura del estado del microciclo": { en: "Reading the microcycle's state" , ca: "Lectura de l'estat del microcicle" },
  "Restaura longitud de sarcómero ": { en: "Restores sarcomere length" , ca: "Restaura longitud de sarcòmer" },
};

// ── RUTINA MATUTINA ─────────────────────────────────────────
const MORNING_DATA: DataDict = {
  // Labels de fase
  "Tránsito": { en: "Transit" , ca: "Trànsit" },
  "Neurocognitivo": { en: "Neurocognitive" , ca: "Neurocognitiu" },
  "Hipertrofia": { en: "Hypertrophy" , ca: "Hipertròfia" },
  "Transición Neural": { en: "Neural transition" , ca: "Transició Neural" },
  "Sauna Seca": { en: "Dry sauna" , ca: "Sauna Seca" },
  "Piscina templada": { en: "Warm pool" , ca: "Piscina temperada" },
  "Elasticidad y Yoga": { en: "Elasticity and Yoga" , ca: "Elasticitat i Ioga" },
  // Descripciones
  "Caminata al gimnasio (5 minutos). Capilarización periférica.": { en: "Walk to the gym (5 minutes). Peripheral capillarization.", ca: "Caminada al gimnàs (5 minuts). Capil·larització perifèrica." },
  "Diario estoico, visualización, respiración 3-6. Regulación del cortisol al despertar.": { en: "Stoic journaling, visualization, 3-6 breathing. Regulates the cortisol awakening response.", ca: "Diari estoic, visualització, respiració 3-6. Regulació del cortisol en despertar." },
  "Resistencia y calistenia según división del día. Tensión mecánica + estrés metabólico.": { en: "Resistance and calisthenics per the day's split. Mechanical tension + metabolic stress.", ca: "Resistència i calistènia segons divisió del dia. Tensió mecànica + estrès metabòlic." },
  "Hidratación sistémica, desaceleración cardíaca antes del calor.": { en: "Systemic hydration, cardiac slowdown before the heat.", ca: "Hidratació sistèmica, desacceleració cardíaca abans de la calor." },
  "12–15 min · 80-100 °C. Pico de HGH, proteínas de choque térmico, reparación tisular.": { en: "12–15 min · 80-100 °C. HGH peak, heat-shock proteins, tissue repair.", ca: "12–15 min · 80-100 °C. Pic de HGH, proteïnes de xoc tèrmic, reparació tissular." },
  "22–26 °C. Presión hidrostática para retorno linfático. Sin frío severo (preserva mTOR).": { en: "22–26 °C. Hydrostatic pressure for lymphatic return. No severe cold (preserves mTOR).", ca: "22–26 °C. Pressió hidrostàtica per al retorn limfàtic. Sense fred sever (preserva mTOR)." },
  "Gato-Vaca, estiramiento lateral, Prasarita Padottanasana, movilidad articular.": { en: "Cat-Cow, lateral stretch, Prasarita Padottanasana, joint mobility.", ca: "Gat-Vaca, estirament lateral, Prasarita Padottanasana, mobilitat articular." },
};

const DATA: DataDict = {
  ...SPARTAN_DATA,
  ...DIET_DATA,
  ...BACK_DATA,
  ...ANTIINFLAMMATORY_DATA,
  ...WEEKPLAN_DATA,
  ...MORNING_DATA,
};

/** Traduce un texto de contenido al idioma activo (fuente: castellano). */
export function translateData(lang: Language, esText: string): string {
  if (lang === "cast") return esText;
  const entry = DATA[esText];
  if (!entry) return esText; // sin traducción → cae a castellano
  if (lang === "eng") return entry.en ?? esText;
  if (lang === "cat") return entry.ca ?? entry.en ?? esText;
  return esText;
}

export const DATA_DICTIONARY = DATA;
export const DATA_SOURCE_KEYS = Object.keys(DATA);
