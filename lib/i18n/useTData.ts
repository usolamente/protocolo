"use client";

import { useProtocolStore } from "@/lib/store";
import { translateData } from "./dataDictionary";

/**
 * Hook de traducción de CONTENIDO (fuente: castellano).
 *   const td = useTData();
 *   <p>{td(exercise.cue)}</p>
 */
export function useTData() {
  const lang = useProtocolStore((s) => s.config.language);
  return (esText: string) => translateData(lang, esText);
}
