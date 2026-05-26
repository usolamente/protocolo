"use client";

import { cn } from "@/lib/utils";
import { useProtocolStore } from "@/lib/store";
import { useT } from "@/lib/i18n/useT";
import type { ReactNode } from "react";

type Accent = "sage" | "terra" | "clay";

const ACCENT: Record<
  Accent,
  { ring: string; bg: string; text: string; dot: string }
> = {
  sage: {
    ring: "border-sage-300/40",
    bg: "bg-sage-900/20",
    text: "text-sage-300",
    dot: "bg-sage-300",
  },
  terra: {
    ring: "border-terra-300/40",
    bg: "bg-terra-300/10",
    text: "text-terra-300",
    dot: "bg-terra-300",
  },
  clay: {
    ring: "border-clay-400/40",
    bg: "bg-clay-400/10",
    text: "text-clay-400",
    dot: "bg-clay-400",
  },
};

/**
 * Bloque "qué es esto y cómo se conecta" que aparece en la cabecera de
 * cada módulo (Reto, Spartan, Pesas, Mente) para dejar claro su papel
 * dentro de las pestañas Hoy y Semana.
 */
export function ModuleRole({
  role,
  text,
  roleKey,
  textKey,
  accent = "sage",
  children,
}: {
  role?: string;
  text?: string;
  roleKey?: string;
  textKey?: string;
  accent?: Accent;
  children?: ReactNode;
}) {
  const a = ACCENT[accent];
  const t = useT();
  const verbosity = useProtocolStore((s) => s.config.verbosity);
  if (verbosity === "synthetic") return null;
  const roleText = roleKey ? t(roleKey) : role;
  const bodyText = textKey ? t(textKey) : text;
  return (
    <div className={cn("rounded-xl border p-4", a.ring, a.bg)}>
      <div className="flex items-center gap-2">
        <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} aria-hidden />
        <p
          className={cn(
            "font-mono text-[10px] tracking-widest uppercase",
            a.text,
          )}
        >
          {roleText}
        </p>
      </div>
      <p className="mt-2 text-sm text-bone-200 leading-relaxed">{bodyText}</p>
      {children}
    </div>
  );
}
