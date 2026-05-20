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

  // DATOS · exportar / importar
  exportData: () => string;
  importData: (json: string) => boolean;
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
          }));
          return true;
        } catch {
          return false;
        }
      },
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
