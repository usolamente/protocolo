"use client";

import { useState } from "react";
import { useProtocolStore } from "@/lib/store";
import {
  LANGUAGES,
  SOMATOTYPES,
  ADHERENCES,
} from "@/lib/data/config";
import type { Language, Somatotype, Adherence } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Onboarding() {
  const complete = useProtocolStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState<Language>("cast");
  const [somatotype, setSomatotype] = useState<Somatotype | null>(null);
  const [adherence, setAdherence] = useState<Adherence | null>(null);

  const canNext =
    (step === 0 && !!language) ||
    (step === 1 && !!somatotype) ||
    (step === 2 && !!adherence);

  const finish = () => {
    if (!somatotype || !adherence) return;
    complete({
      language,
      somatotype,
      adherence,
      verbosity: "verbose",
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-ink-950 overflow-y-auto">
      <div className="mx-auto max-w-md px-6 py-10 min-h-dvh flex flex-col">
        {/* Cabecera */}
        <div className="mb-8">
          <p className="eyebrow text-sage-300">Protocolo</p>
          <h1 className="font-display text-4xl font-light text-bone-50 mt-2 leading-tight">
            {step === 0 && "Hola"}
            {step === 1 && "Tu cuerpo"}
            {step === 2 && "Tu ritmo"}
          </h1>
          <p className="text-sm text-bone-300 mt-2 leading-relaxed">
            {step === 0 && "Vamos a configurar la app a tu medida. Empecemos por el idioma."}
            {step === 1 && "Elige el somatotipo que mejor te describe. Ajustaremos la dieta y el entrenamiento."}
            {step === 2 && "¿Con cuánta disciplina quieres seguir el plan? Podrás cambiarlo cuando quieras."}
          </p>
        </div>

        {/* Indicador de pasos */}
        <div className="flex gap-1.5 mb-8">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= step ? "bg-sage-400" : "bg-ink-700",
              )}
            />
          ))}
        </div>

        {/* Contenido del paso */}
        <div className="flex-1">
          {step === 0 && (
            <div className="space-y-3">
              {LANGUAGES.map((l) => (
                <OptionCard
                  key={l.value}
                  selected={language === l.value}
                  onClick={() => setLanguage(l.value)}
                  title={l.native}
                  badge={l.flag}
                />
              ))}
              <p className="text-[11px] text-bone-400 italic mt-3 leading-relaxed">
                De momento la app está en castellano. El catalán y el inglés
                llegarán en una próxima actualización; tu elección se guardará.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {SOMATOTYPES.map((s) => (
                <OptionCard
                  key={s.value}
                  selected={somatotype === s.value}
                  onClick={() => setSomatotype(s.value)}
                  title={s.label}
                  subtitle={s.tagline}
                  description={s.description}
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {ADHERENCES.map((a) => (
                <OptionCard
                  key={a.value}
                  selected={adherence === a.value}
                  onClick={() => setAdherence(a.value)}
                  title={a.label}
                  subtitle={a.tagline}
                  description={a.description}
                />
              ))}
            </div>
          )}
        </div>

        {/* Navegación */}
        <div className="flex gap-3 pt-8">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-secondary"
            >
              Atrás
            </button>
          )}
          {step < 2 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="btn btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={!canNext}
              className="btn btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Empezar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  subtitle,
  description,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-2xl border p-4 transition-all",
        selected
          ? "border-sage-400 bg-sage-900/30"
          : "border-ink-700 bg-ink-900/40 hover:border-ink-600",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-bone-50 font-medium">{title}</p>
          {subtitle && (
            <p
              className={cn(
                "text-[12px] font-mono tracking-wide mt-0.5",
                selected ? "text-sage-300" : "text-bone-400",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <span
          className={cn(
            "shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
            selected ? "border-sage-400 bg-sage-400" : "border-ink-600",
          )}
          aria-hidden
        >
          {selected && (
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 text-ink-950"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </div>
      {description && (
        <p className="text-[13px] text-bone-300 leading-snug mt-2">
          {description}
        </p>
      )}
      {badge && !description && (
        <span className="sr-only">{badge}</span>
      )}
    </button>
  );
}
