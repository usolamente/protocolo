"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { getWeeklyShopping, WEEK_VARIANT_LABELS, weekOfMonthIndex } from "@/lib/data/diet";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "protocolo-shopping";

export function ShoppingList() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    setVariant(weekOfMonthIndex());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  const shopping = getWeeklyShopping();

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  };

  const reset = () => {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  };

  const total = shopping.reduce((n, c) => n + c.items.length, 0);
  const done = hydrated
    ? Object.values(checked).filter(Boolean).length
    : 0;

  return (
    <Card as="section">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="eyebrow text-sage-300">Lista de la compra</p>
          <h2 className="font-display text-2xl font-light text-bone-50 mt-1 leading-tight">
            Ingredientes de la semana
          </h2>
          <p className="font-mono text-[10px] tracking-widest uppercase text-bone-400 mt-1.5">
            {WEEK_VARIANT_LABELS[variant]}
          </p>
        </div>
        <span className="numeral text-4xl text-ink-700" aria-hidden>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] text-bone-400 tabular">
          {done}/{total} marcados
        </p>
        {done > 0 && (
          <button
            onClick={reset}
            className="font-mono text-[11px] text-bone-400 hover:text-bone-200"
          >
            Reiniciar
          </button>
        )}
      </div>

      <div className="space-y-5">
        {shopping.map((cat) => (
          <div key={cat.category}>
            <p className="font-mono text-[11px] tracking-widest uppercase text-bone-300 mb-2">
              {cat.category}
            </p>
            <ul className="space-y-1">
              {cat.items.map((it) => {
                const key = `${cat.category}:${it.name}`;
                const isChecked = !!checked[key];
                return (
                  <li key={key}>
                    <label className="flex items-center gap-3 py-1.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="check !w-5 !h-5"
                        checked={isChecked}
                        onChange={() => toggle(key)}
                        aria-label={it.name}
                      />
                      <span
                        className={cn(
                          "flex-1 text-sm transition-all",
                          isChecked
                            ? "text-bone-400 line-through"
                            : "text-bone-100",
                        )}
                      >
                        {it.name}
                      </span>
                      <span className="font-mono text-[11px] tabular text-bone-400">
                        {it.qty}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
