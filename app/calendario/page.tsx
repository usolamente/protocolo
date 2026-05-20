import { PageHeader } from "@/components/layout/PageHeader";
import { Collapsible } from "@/components/ui/Collapsible";
import { ShoppingList } from "@/components/week/ShoppingList";
import { DayDietPeek } from "@/components/week/DayDietPeek";
import { WEEK_PLAN } from "@/lib/data/weekPlan";
import { WEEK_LABELS, num } from "@/lib/utils";

export default function CalendarioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Microciclo"
        title="Semana"
        subtitle="Toca cada día o la compra para desplegarlos."
        numeral="01"
      />

      <div className="px-5 py-6 space-y-3">
        {/* Lista de la compra — colapsable */}
        <Collapsible
          title="Lista de la compra"
          subtitle="Ingredientes de la semana"
          accent="sage"
        >
          <ShoppingList embedded />
        </Collapsible>

        {/* Días — cada uno colapsable */}
        {WEEK_PLAN.map((day, i) => (
          <Collapsible
            key={day.day}
            title={WEEK_LABELS[day.day]}
            subtitle={day.focusLabel}
            numeral={num(i + 1)}
          >
            <p className="text-sm text-bone-300 leading-relaxed">
              {day.description}
            </p>

            {/* Ejercicios de pesas */}
            <ul className="mt-5 space-y-3 border-t border-ink-800 pt-4">
              {day.exercises.map((ex, idx) => (
                <li key={ex.id} className="flex items-baseline gap-3">
                  <span className="numeral text-base text-bone-400 w-5 shrink-0 tabular">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-bone-100 leading-snug">
                      {ex.name}
                    </p>
                    <p className="text-[11px] font-mono text-bone-400 tabular mt-0.5">
                      {ex.sets}
                      {ex.load && ` · ${ex.load}`}
                    </p>
                    {ex.note && (
                      <p className="text-[11px] text-bone-400 italic mt-0.5 leading-snug">
                        {ex.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Actividad + dieta del día */}
            <DayDietPeek day={day.day} />
          </Collapsible>
        ))}
      </div>
    </>
  );
}
