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
