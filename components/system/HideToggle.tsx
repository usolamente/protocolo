"use client";

import { useProtocolStore } from "@/lib/store";
import { ADHERENCE_MAP } from "@/lib/data/config";

/**
 * Botón para ocultar/mostrar una rutina. Su disponibilidad depende del modo
 * de adherencia:
 *  - disciplina: no se muestra (no se puede ocultar nada).
 *  - equilibrio: hasta `hideLimit` ocultos por grupo.
 *  - flujo: sin límite.
 *
 * `groupKeys` son las claves de todos los elementos del mismo grupo (p. ej.
 * los ejercicios de un día) para poder contar cuántos hay ya ocultos.
 */
export function HideToggle({
  itemKey,
  groupKeys,
}: {
  itemKey: string;
  groupKeys: string[];
}) {
  const adherence = useProtocolStore((s) => s.config.adherence);
  const hiddenItems = useProtocolStore((s) => s.hiddenItems);
  const toggleHidden = useProtocolStore((s) => s.toggleHidden);

  const profile = ADHERENCE_MAP[adherence];
  if (profile.hideLimit === 0) return null; // disciplina

  const hidden = !!hiddenItems[itemKey];
  const hiddenCount = groupKeys.filter((k) => hiddenItems[k]).length;
  const atLimit = hiddenCount >= profile.hideLimit;

  // Si ya está oculto, siempre puede volver a mostrarse. Si no, solo si no
  // se ha alcanzado el límite del modo.
  const disabled = !hidden && atLimit;

  return (
    <button
      onClick={() => !disabled && toggleHidden(itemKey)}
      disabled={disabled}
      aria-label={hidden ? "Mostrar de nuevo" : "Ocultar esta rutina"}
      title={
        disabled
          ? `Límite de ${profile.hideLimit} ocultos en modo ${profile.label}`
          : hidden
            ? "Mostrar"
            : "Ocultar"
      }
      className={`shrink-0 h-7 w-7 inline-flex items-center justify-center rounded-full border transition-colors ${
        disabled
          ? "border-ink-800 text-ink-700 cursor-not-allowed"
          : hidden
            ? "border-terra-300/40 text-terra-300 hover:bg-terra-300/10"
            : "border-ink-700 text-bone-400 hover:text-bone-200 hover:border-ink-600"
      }`}
    >
      {hidden ? (
        // Ojo tachado → está oculto
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.9 4.2A9 9 0 0 1 12 4c5 0 9 5 9 8a13 13 0 0 1-1.7 2.6M6.3 6.3A13 13 0 0 0 3 12c0 3 4 8 9 8a9 9 0 0 0 3.7-.8" />
          <path d="M3 3l18 18" />
        </svg>
      ) : (
        // Ojo → visible (toca para ocultar)
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}
