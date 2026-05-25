"use client";

import { useState } from "react";
import { tagsForMeal } from "@/lib/data/antiInflammatory";

/**
 * Muestra, bajo una comida, los sellos antiinflamatorios de sus ingredientes.
 * Compacto: una fila de etiquetas; al tocar una, despliega el porqué.
 */
export function MealTags({ items }: { items: string[] }) {
  const tags = tagsForMeal(items);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (tags.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <button
            key={tag.label}
            onClick={() => setOpenIdx((cur) => (cur === i ? null : i))}
            className={`rounded-full border px-2 py-0.5 text-[10px] font-mono tracking-wide transition-colors ${
              openIdx === i
                ? "border-terra-300 text-terra-300 bg-terra-300/10"
                : "border-ink-700 text-bone-400 hover:border-terra-300/50 hover:text-terra-300"
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
      {openIdx !== null && tags[openIdx] && (
        <p className="text-[11px] text-terra-300/90 italic leading-snug mt-1.5 animate-fade-up">
          {tags[openIdx].why}
        </p>
      )}
    </div>
  );
}
