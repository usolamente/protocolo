"use client";

import { useProtocolStore } from "@/lib/store";

export function VerbosityToggle({ className = "" }: { className?: string }) {
  const verbosity = useProtocolStore((s) => s.config.verbosity);
  const toggle = useProtocolStore((s) => s.toggleVerbosity);
  const isVerbose = verbosity === "verbose";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isVerbose ? "Modo directo (ocultar explicaciones)" : "Modo guiado (mostrar explicaciones)"
      }
      title={isVerbose ? "Explicaciones visibles" : "Explicaciones ocultas"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-700 bg-ink-850 text-bone-200 transition-colors hover:border-sage-400 hover:text-sage-300 ${className}`}
    >
      {isVerbose ? (
        // Bombilla — guiado
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-4 10.5c.5.5 1 1.2 1 2.5h6c0-1.3.5-2 1-2.5A6 6 0 0 0 12 3z" />
        </svg>
      ) : (
        // Rayo — directo
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      )}
    </button>
  );
}
