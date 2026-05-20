"use client";

import { useEffect, useState } from "react";
import { useProtocolStore } from "@/lib/store";

const SERENITY_PROMPT =
  "Concédeme serenidad para aceptar lo que no puedo cambiar, coraje para cambiar lo que sí puedo, y sabiduría para reconocer la diferencia.";

const STOIC_PROMPT =
  "Premeditatio malorum — ¿qué obstáculos pueden surgir hoy? ¿Cómo responderé sin perder el centro?";

export function StoicJournal() {
  const today = useProtocolStore((s) => s.getTodayJournal());
  const save = useProtocolStore((s) => s.saveJournal);

  const [stoic, setStoic] = useState("");
  const [serenity, setSerenity] = useState("");
  const [mounted, setMounted] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStoic(today?.stoic ?? "");
    setSerenity(today?.serenity ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    save({ stoic, serenity });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-5">
      {/* Oración de la Serenidad */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="eyebrow text-sage-300">Oración de la Serenidad</p>
        </div>
        <blockquote className="font-display italic text-bone-200 text-sm leading-relaxed border-l border-sage-700 pl-3 mb-3">
          {SERENITY_PROMPT}
        </blockquote>
        <textarea
          value={serenity}
          onChange={(e) => setSerenity(e.target.value)}
          rows={3}
          placeholder="Lo que sí controlo hoy…"
          className="resize-none !text-sm leading-relaxed"
        />
      </div>

      <div className="rule" aria-hidden />

      {/* Diario estoico */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="eyebrow text-terra-300">Diario estoico</p>
        </div>
        <p className="text-xs text-bone-400 italic leading-relaxed mb-3">
          {STOIC_PROMPT}
        </p>
        <textarea
          value={stoic}
          onChange={(e) => setStoic(e.target.value)}
          rows={5}
          placeholder="Premeditatio malorum…"
          className="resize-none !text-sm leading-relaxed"
        />
      </div>

      <button onClick={handleSave} className="btn btn-primary w-full">
        {savedFlash ? "✓ Guardado" : "Guardar entrada de hoy"}
      </button>
    </div>
  );
}
