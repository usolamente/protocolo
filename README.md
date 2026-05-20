# Protocolo

PWA mobile-first para gestionar entrenamiento concurrente (hipertrofia + calistenia + deportes multidireccionales), bienestar mental y recuperación termal. Construida sobre el documento *Protocolo Integral de Periodización para Hipertrofia, Serenidad Mental y Optimización Atlética*.

## Stack

- **Next.js 15** (App Router)
- **TypeScript** estricto
- **Tailwind CSS** con paleta `sage / terra / bone / ink`
- **Zustand** con persistencia en `localStorage`
- Tipografías: **Fraunces** (display), **Inter** (UI), **JetBrains Mono** (datos)
- PWA completa: `manifest.json`, iconos PNG + SVG, splash screens iOS, service worker offline-first

## Arranque

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000` desde el navegador del móvil (o emular dispositivo en DevTools, anchura mínima 320 px).

## Instalación en iPhone (PWA)

1. Hacer build de producción y servir:
   ```bash
   npm run build && npm start
   ```
2. Exponer al móvil con la IP local (`http://192.168.x.x:3000`) o vía túnel (`ngrok http 3000`).
3. Abrir esa URL en **Safari** (no Chrome — iOS solo permite instalar PWAs desde Safari).
4. Botón compartir → **Añadir a pantalla de inicio**.
5. El icono aparece como app nativa, con su splash screen y sin barra de navegación.

El service worker (`public/sw.js`) solo se registra en producción para no interferir con HMR. Una vez instalada, la app abre offline y cachea rutas y assets automáticamente. Subir `CACHE_VERSION` en `sw.js` invalida la caché tras un deploy.

> Para llevarla a App Store o ganar acceso a HealthKit / notificaciones push reales / background timers, ver "Capacitor" abajo.

## Módulos

| Ruta | Pantalla | Función |
|---|---|---|
| `/` | Hoy | Foco del día, microciclo, timeline 06:50–08:30 |
| `/calendario` | Semana | Detalle semanal con bloques laborales/deportivos |
| `/reto` | Reto 30 días | Matriz interactiva 30×4 con descansos obligatorios (días 3, 7, 12, 18, 25) |
| `/spartan` | Circuito J.E.D. | HIIT guiado · 15 ejercicios · 3 niveles · descanso automático 120 s |
| `/hipertrofia` | Logbook | Registro de series, reps y peso por ejercicio del plan |
| `/bienestar` | Mente y termo | Respiración 3-6, Diario estoico, Oración de la Serenidad, Sauna, Piscina |

## Arquitectura

```
app/
  layout.tsx          # Fuentes, metadatos PWA, BottomNav fija
  page.tsx            # Dashboard
  calendario/         # Semana
  reto/               # 30 días
  spartan/            # HIIT
  hipertrofia/        # Logbook
  bienestar/          # Mindfulness + termo

components/
  layout/             # BottomNav, PageHeader
  ui/                 # Card y primitivas
  dashboard/          # TodayFocus, WeekOverview, MorningTimeline
  challenge/          # ChallengeDayRow
  spartan/            # SpartanRunner (máquina de estados con timer)
  hypertrophy/        # ExerciseLogger
  wellness/           # BreathingTimer, StoicJournal, ThermalTimer

lib/
  store.ts            # Zustand + persist middleware
  types.ts            # Tipos compartidos
  utils.ts            # Helpers (fechas, formato, día semana)
  data/
    morningRoutine.ts # 06:50 – 08:30
    weekPlan.ts       # 7 días completos del PDF
    challengePlan.ts  # Progresión 30 días
    spartanCircuit.ts # 15 ejercicios + 3 niveles
```

## Persistencia

Todo se guarda en `localStorage` bajo la clave `protocolo-store`:

- Progreso del reto 30 días (por día y ejercicio)
- Sesiones Spartan completadas
- Logbook de gimnasio (por fecha)
- Entradas de diario estoico (por fecha)
- Fecha de inicio del reto

Sin backend. Sin auth. Datos locales al dispositivo.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `ink-950` | `#0A0D0F` | Fondo profundo |
| `ink-900` | `#10141A` | Surface cards |
| `sage-300` | `#94A37D` | Acento sereno (foco, hoy) |
| `sage-400` | `#7C8B6C` | Acento primario |
| `terra-300` | `#C4724A` | Acento energético (deporte, sauna, push) |
| `bone-50` | `#F4F1EA` | Texto principal cálido |
| `clay-400` | `#9B7D63` | Aviso suave (descanso, trabajo) |

## Notas

- Modo oscuro siempre activo (decisión de diseño, no togglable).
- Bloques laborales y deportivos del calendario son no editables (definidos en `lib/data/weekPlan.ts`).
- La rutina matutina del dashboard detecta la hora real del dispositivo y marca la fase activa.
- El selector de día en `/hipertrofia` arranca en el día actual.
- El módulo Spartan registra cada sesión completada (fecha ISO) pero no expone aún historial — está listo para añadir una pestaña de estadísticas.

## Capacitor (camino a iOS nativo)

Cuando la PWA se quede corta (notificaciones push de verdad, HealthKit, background timers, App Store), envolver con Capacitor sin reescribir:

```bash
npm install @capacitor/core @capacitor/ios @capacitor/local-notifications @capacitor/haptics
npx cap init protocolo com.sergio.protocolo
# Configurar next.config.mjs: output: 'export'
npm run build
npx cap add ios
npx cap open ios
```

Requiere Mac + Xcode. La app es 100% client-side (Zustand + localStorage), así que `output: 'export'` no rompe nada. Buen sitio para empezar a usar APIs nativas: `SpartanRunner` (haptics + notificación al terminar descanso) y dashboard (notificación local a las 06:50).
