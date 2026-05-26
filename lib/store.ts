"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ChallengeExercise,
  ChallengeProgress,
  JournalEntry,
  LogEntry,
  LoggedExercise,
  LoggedSet,
  WeekDay,
  Activity,
  UserConfig,
} from "./types";
import { toISODate } from "./utils";

// ─────────────────────────────────────────────────────────
// Estado y acciones
// ─────────────────────────────────────────────────────────

interface ProtocolState {
  // RETO 30 DÍAS
  challenge: ChallengeProgress;
  challengeStartDate: string | null;
  toggleChallenge: (day: number, exercise: ChallengeExercise) => void;
  resetChallenge: () => void;
  startChallenge: () => void;

  // SPARTAN
  spartanCompletedSessions: string[]; // ISO dates
  registerSpartanSession: () => void;

  // LOGBOOK
  log: LogEntry[];
  logSet: (
    day: WeekDay,
    exerciseId: string,
    exerciseName: string,
    set: LoggedSet,
  ) => void;
  removeLastSet: (day: WeekDay, exerciseId: string) => void;
  getTodayLog: () => LogEntry | undefined;

  // BIENESTAR
  journal: JournalEntry[];
  saveJournal: (entry: Omit<JournalEntry, "date">) => void;
  getTodayJournal: () => JournalEntry | undefined;

  // ACTIVIDADES COMPLEMENTARIAS (por fecha ISO)
  activities: Record<string, Activity>;
  setActivity: (date: string, activity: Activity) => void;
  getActivity: (date: string) => Activity;

  // ESTADO DE COMIDAS (por fecha + slot: "hecha" / "saltada")
  mealStatus: Record<string, "done" | "skipped">; // clave "YYYY-MM-DD:slot"
  setMealStatus: (date: string, slot: string, status: "done" | "skipped") => void;
  getMealStatus: (date: string, slot: string) => "done" | "skipped" | null;

  // RACHA DE ADHERENCIA (derivada)
  getStreak: () => number;
  hasActivityOn: (date: string) => boolean;

  // DATOS · exportar / importar
  exportData: () => string;
  importData: (json: string) => boolean;

  // CONFIGURACIÓN (pantalla de bienvenida)
  config: UserConfig;
  setConfig: (patch: Partial<UserConfig>) => void;
  completeOnboarding: (config: Omit<UserConfig, "configured">) => void;
  resetOnboarding: () => void;
  toggleVerbosity: () => void;

  // RUTINAS OCULTAS (según modo de adherencia)
  hiddenItems: Record<string, true>; // claves "tipo:id"
  toggleHidden: (key: string) => void;
  isHidden: (key: string) => boolean;
  clearHidden: () => void;
}

export const useProtocolStore = create<ProtocolState>()(
  persist(
    (set, get) => ({
      // ── Reto 30 días ───────────────────────────────────
      challenge: {},
      challengeStartDate: null,

      toggleChallenge: (day, exercise) =>
        set((state) => {
          const dayProgress = state.challenge[day] ?? {};
          return {
            challenge: {
              ...state.challenge,
              [day]: {
                ...dayProgress,
                [exercise]: !dayProgress[exercise],
              },
            },
          };
        }),

      resetChallenge: () =>
        set({ challenge: {}, challengeStartDate: null }),

      startChallenge: () =>
        set((state) =>
          state.challengeStartDate
            ? state
            : { challengeStartDate: toISODate() },
        ),

      // ── Spartan ────────────────────────────────────────
      spartanCompletedSessions: [],

      registerSpartanSession: () =>
        set((state) => ({
          spartanCompletedSessions: [
            ...state.spartanCompletedSessions,
            toISODate(),
          ],
        })),

      // ── Logbook ────────────────────────────────────────
      log: [],

      logSet: (day, exerciseId, exerciseName, newSet) =>
        set((state) => {
          const date = toISODate();
          const existing = state.log.find((e) => e.date === date);

          if (!existing) {
            const entry: LogEntry = {
              date,
              day,
              exercises: [
                { id: exerciseId, name: exerciseName, sets: [newSet] },
              ],
            };
            return { log: [...state.log, entry] };
          }

          const exIndex = existing.exercises.findIndex((e) => e.id === exerciseId);
          const updatedExercises: LoggedExercise[] =
            exIndex === -1
              ? [
                  ...existing.exercises,
                  { id: exerciseId, name: exerciseName, sets: [newSet] },
                ]
              : existing.exercises.map((e, i) =>
                  i === exIndex ? { ...e, sets: [...e.sets, newSet] } : e,
                );

          const updatedEntry: LogEntry = {
            ...existing,
            day,
            exercises: updatedExercises,
          };

          return {
            log: state.log.map((e) => (e.date === date ? updatedEntry : e)),
          };
        }),

      removeLastSet: (day, exerciseId) =>
        set((state) => {
          const date = toISODate();
          const entry = state.log.find((e) => e.date === date);
          if (!entry) return state;

          const exercises = entry.exercises
            .map((e) =>
              e.id === exerciseId ? { ...e, sets: e.sets.slice(0, -1) } : e,
            )
            .filter((e) => e.sets.length > 0);

          if (exercises.length === 0) {
            return { log: state.log.filter((e) => e.date !== date) };
          }

          return {
            log: state.log.map((e) =>
              e.date === date ? { ...entry, day, exercises } : e,
            ),
          };
        }),

      getTodayLog: () => {
        const date = toISODate();
        return get().log.find((e) => e.date === date);
      },

      // ── Bienestar ──────────────────────────────────────
      journal: [],

      saveJournal: (entry) =>
        set((state) => {
          const date = toISODate();
          const existing = state.journal.find((e) => e.date === date);
          if (existing) {
            return {
              journal: state.journal.map((e) =>
                e.date === date ? { ...e, ...entry, date } : e,
              ),
            };
          }
          return {
            journal: [...state.journal, { date, ...entry }],
          };
        }),

      getTodayJournal: () => {
        const date = toISODate();
        return get().journal.find((e) => e.date === date);
      },

      // ── Actividades complementarias ────────────────────
      activities: {},

      setActivity: (date, activity) =>
        set((state) => {
          const next = { ...state.activities };
          if (activity === "none") {
            delete next[date];
          } else {
            next[date] = activity;
          }
          return { activities: next };
        }),

      getActivity: (date) => get().activities[date] ?? "none",

      // ── Estado de comidas ──────────────────────────────
      mealStatus: {},

      setMealStatus: (date, slot, status) =>
        set((state) => {
          const key = `${date}:${slot}`;
          const next = { ...state.mealStatus };
          // Tocar el mismo estado lo desmarca (toggle).
          if (next[key] === status) {
            delete next[key];
          } else {
            next[key] = status;
          }
          return { mealStatus: next };
        }),

      getMealStatus: (date, slot) =>
        get().mealStatus[`${date}:${slot}`] ?? null,

      // ── Racha de adherencia ────────────────────────────
      // Un día "cuenta" si hay registro de pesas, progreso del reto o al
      // menos una comida marcada como hecha ese día.
      hasActivityOn: (date) => {
        const s = get();
        const hasLog = s.log.some(
          (e) => e.date === date && e.exercises.length > 0,
        );
        const hasChallenge = Object.values(s.challenge).some((day) =>
          Object.values(day ?? {}).some(Boolean),
        );
        const hasMeal = Object.entries(s.mealStatus).some(
          ([k, v]) => k.startsWith(`${date}:`) && v === "done",
        );
        // challenge no guarda fecha por día, así que solo cuenta si hay
        // progreso global y, además, registro o comida del propio día.
        return hasLog || hasMeal || (hasChallenge && (hasLog || hasMeal));
      },

      getStreak: () => {
        const s = get();
        // Recorre hacia atrás desde hoy contando días consecutivos con actividad.
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 400; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const iso = toISODate(d);
          const hasLog = s.log.some(
            (e) => e.date === iso && e.exercises.length > 0,
          );
          const hasMeal = Object.entries(s.mealStatus).some(
            ([k, v]) => k.startsWith(`${iso}:`) && v === "done",
          );
          if (hasLog || hasMeal) {
            streak++;
          } else if (i === 0) {
            // Hoy aún sin actividad: no rompe la racha previa, sigue contando ayer.
            continue;
          } else {
            break;
          }
        }
        return streak;
      },

      // ── Exportar / importar ────────────────────────────
      exportData: () => {
        const s = get();
        const payload = {
          app: "protocolo",
          version: 1,
          exportedAt: new Date().toISOString(),
          data: {
            challenge: s.challenge,
            challengeStartDate: s.challengeStartDate,
            spartanCompletedSessions: s.spartanCompletedSessions,
            log: s.log,
            journal: s.journal,
            activities: s.activities,
            mealStatus: s.mealStatus,
            config: s.config,
            hiddenItems: s.hiddenItems,
          },
        };
        return JSON.stringify(payload, null, 2);
      },

      importData: (json) => {
        try {
          const parsed = JSON.parse(json);
          const d = parsed?.data ?? parsed;
          if (typeof d !== "object" || d === null) return false;
          set((state) => ({
            challenge: d.challenge ?? state.challenge,
            challengeStartDate:
              d.challengeStartDate ?? state.challengeStartDate,
            spartanCompletedSessions:
              d.spartanCompletedSessions ?? state.spartanCompletedSessions,
            log: Array.isArray(d.log) ? d.log : state.log,
            journal: Array.isArray(d.journal) ? d.journal : state.journal,
            activities: d.activities ?? state.activities,
            mealStatus: d.mealStatus ?? state.mealStatus,
            config: d.config ?? state.config,
            hiddenItems: d.hiddenItems ?? state.hiddenItems,
          }));
          return true;
        } catch {
          return false;
        }
      },

      // ── Configuración / bienvenida ─────────────────────
      config: {
        configured: false,
        language: "eng",
        somatotype: "mesomorfo",
        adherence: "disciplina",
        verbosity: "verbose",
      },

      setConfig: (patch) =>
        set((state) => ({ config: { ...state.config, ...patch } })),

      completeOnboarding: (cfg) =>
        set(() => ({ config: { ...cfg, configured: true } })),

      resetOnboarding: () =>
        set((state) => ({ config: { ...state.config, configured: false } })),

      toggleVerbosity: () =>
        set((state) => ({
          config: {
            ...state.config,
            verbosity:
              state.config.verbosity === "verbose" ? "synthetic" : "verbose",
          },
        })),

      // ── Rutinas ocultas (adherencia) ───────────────────
      hiddenItems: {},

      toggleHidden: (key) =>
        set((state) => {
          const next = { ...state.hiddenItems };
          if (next[key]) {
            delete next[key];
          } else {
            next[key] = true;
          }
          return { hiddenItems: next };
        }),

      isHidden: (key) => !!get().hiddenItems[key],

      clearHidden: () => set(() => ({ hiddenItems: {} })),
    }),
    {
      name: "protocolo-store",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          // SSR fallback no-op
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return window.localStorage;
      }),
    },
  ),
);
