"use client";

import { useProtocolStore } from "@/lib/store";
import { translate } from "./dictionary";

/**
 * Hook de traducción. Devuelve `t(key)` en el idioma activo del usuario,
 * con respaldo automático a inglés (idioma fuente) y, si falta, a la clave.
 *
 * Uso:
 *   const t = useT();
 *   <h1>{t("home.title")}</h1>
 */
export function useT() {
  const lang = useProtocolStore((s) => s.config.language);
  return (key: string) => translate(lang, key);
}
