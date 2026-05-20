import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { ShoppingList } from "@/components/week/ShoppingList";
import { DayDietPeek } from "@/components/week/DayDietPeek";
import { WEEK_PLAN, WORK_BLOCKS, SPORT_BLOCKS } from "@/lib/data/weekPlan";
import { WEEK_LABELS, num } from "@/lib/utils";

export default function CalendarioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Microciclo"
        title="Semana"
        subtitle="Tu mapa semanal: entrenamiento, deporte, dieta de cada día y la compra."
        numeral="01"
      />

      <div className="px-5 py-6 space-y-5">
        {/* Lista de la compra de la semana */}
        <ShoppingList />

        {WEEK_PLAN.map((day, i) => {
          const work = WORK_BLOCKS.find((w) => w.day === day.day);
          const sport = SPORT_BLOCKS.find((s) => s.day === day.day);

          return (
            <Card key={day.day} as="article" className="relative">
              <a id={day.day} className="absolute -top-20" aria-hidden />

              <div className="flex items-start justify-between mb-3">
                <div>
                  <CardEyebrow>{WEEK_LABELS[day.day]}</CardEyebrow>
                  <h2 className="font-display text-2xl font-light text-bone-50 mt-1 leading-tight">
                    {day.focusLabel}
                  </h2>
                </div>
                <span className="numeral text-4xl text-ink-700" aria-hidden>
                  {num(i + 1)}
                </span>
              </div>

              <p className="text-sm text-bone-300 leading-relaxed">
                {day.description}
              </p>

              {/* Bloques no editables */}
              {(work || sport) && (
                <div className="mt-4 space-y-2">
                  {work && (
                    <BlockBadge
                      tone="work"
                      label="Trabajo"
                      time={`${work.start} – ${work.end}`}
                      icon="briefcase"
                    />
                  )}
                  {sport && (
                    <BlockBadge
                      tone="sport"
                      label={sport.label}
                      time={`${sport.start} – ${sport.end}`}
                      icon={sport.emoji}
                    />
                  )}
                </div>
              )}

              {/* Ejercicios */}
              <ul className="mt-5 space-y-3 border-t border-ink-800 pt-4">
                {day.exercises.map((ex) => (
                  <li key={ex.id} className="flex items-baseline gap-3">
                    <span className="numeral text-base text-bone-400 w-5 shrink-0 tabular">
                      {String(day.exercises.indexOf(ex) + 1).padStart(2, "0")}
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

              {/* Dieta del día */}
              <DayDietPeek day={day.day} />
            </Card>
          );
        })}
      </div>
    </>
  );
}

function BlockBadge({
  tone,
  label,
  time,
  icon,
}: {
  tone: "work" | "sport";
  label: string;
  time: string;
  icon: string;
}) {
  const palette =
    tone === "work"
      ? "border-clay-400/30 bg-clay-400/5 text-clay-400"
      : "border-terra-300/30 bg-terra-300/5 text-terra-300";
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 border rounded-lg ${palette}`}
    >
      <span className="font-mono text-xs tracking-widest uppercase flex items-center gap-2">
        {icon === "briefcase" ? <BriefcaseIcon /> : <span>{icon}</span>}
        {label}
      </span>
      <span className="font-mono text-xs tabular">{time}</span>
    </div>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3.5 h-3.5"
    >
      <rect x="3" y="7" width="18" height="13" rx="1" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
