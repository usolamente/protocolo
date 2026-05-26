"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/system/ThemeToggle";
import { VerbosityToggle } from "@/components/system/VerbosityToggle";
import { useT } from "@/lib/i18n/useT";

interface PageHeaderProps {
  // Texto plano (compatibilidad) o clave i18n. Si se pasa *Key, tiene prioridad.
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  eyebrowKey?: string;
  titleKey?: string;
  subtitleKey?: string;
  numeral?: string;
  className?: string;
  hideToggle?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  eyebrowKey,
  titleKey,
  subtitleKey,
  numeral,
  className,
  hideToggle,
}: PageHeaderProps) {
  const t = useT();
  const eb = eyebrowKey ? t(eyebrowKey) : eyebrow;
  const ti = titleKey ? t(titleKey) : title;
  const sub = subtitleKey ? t(subtitleKey) : subtitle;

  return (
    <header
      className={cn("pt-10 pb-6 px-5 border-b border-ink-800 relative", className)}
    >
      {!hideToggle && (
        <div className="absolute right-4 top-8 z-10 flex items-center gap-2">
          <VerbosityToggle />
          <ThemeToggle />
        </div>
      )}
      {numeral && (
        <span
          className="absolute right-28 top-7 numeral text-7xl text-ink-800 select-none pointer-events-none"
          aria-hidden
        >
          {numeral}
        </span>
      )}
      {eb && <p className="eyebrow text-sage-300">{eb}</p>}
      <h1 className="mt-2 font-display text-3xl font-light text-bone-50 leading-[1.1] tracking-tight">
        {ti}
      </h1>
      {sub && (
        <p className="mt-3 text-sm text-bone-300 leading-relaxed max-w-[30ch]">
          {sub}
        </p>
      )}
    </header>
  );
}
