import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ModuleRole } from "@/components/layout/ModuleRole";
import { BreathingTimer } from "@/components/wellness/BreathingTimer";
import { StoicJournal } from "@/components/wellness/StoicJournal";
import { ThermalTimer } from "@/components/wellness/ThermalTimer";
import { BackCare } from "@/components/wellness/BackCare";
import { DataManager } from "@/components/wellness/DataManager";

export default function BienestarPage() {
  return (
    <>
      <PageHeader
        eyebrowKey="care.eyebrow"
        titleKey="care.title"
        subtitleKey="care.subtitle"
        numeral="∞"
      />

      <div className="px-5 py-6 space-y-5">
        <ModuleRole
          accent="sage"
          roleKey="care.role"
          textKey="care.roleText"
        />

        {/* Respiración 3-6 */}
        <Card>
          <header className="mb-2">
            <p className="eyebrow text-sage-300">Respiración 3-6</p>
            <h2 className="font-display text-xl font-light text-bone-50 mt-1">
              Tono vagal · activación parasimpática
            </h2>
            <p className="text-xs text-bone-300 mt-2 leading-relaxed">
              Inhala 3 segundos, exhala 6. Reduce la frecuencia cardíaca en reposo y limpia la inercia del sueño antes del entrenamiento.
            </p>
          </header>
          <BreathingTimer />
        </Card>

        {/* Diario estoico */}
        <Card>
          <header className="mb-4">
            <p className="eyebrow text-bone-300">Encuadre cognitivo</p>
            <h2 className="font-display text-xl font-light text-bone-50 mt-1">
              Diario y serenidad
            </h2>
          </header>
          <StoicJournal />
        </Card>

        {/* Termoterapia */}
        <Card>
          <header className="mb-4">
            <p className="eyebrow text-terra-300">Termoterapia</p>
            <h2 className="font-display text-xl font-light text-bone-50 mt-1">
              Calor seco · presión hidrostática
            </h2>
            <p className="text-xs text-bone-300 mt-2 leading-relaxed">
              Sauna libera HGH y proteínas de choque térmico. Piscina templada (no fría) preserva la vía mTOR de la hipertrofia.
            </p>
          </header>
          <div className="space-y-3">
            <ThermalTimer
              title="Sauna seca"
              subtitle="12 – 15 minutos · 80–100 °C"
              defaultSeconds={13 * 60}
              minSeconds={5 * 60}
              maxSeconds={20 * 60}
              step={60}
              accent="sauna"
            />
            <ThermalTimer
              title="Piscina templada"
              subtitle="22 – 26 °C · presión hidrostática suave"
              defaultSeconds={5 * 60}
              minSeconds={60}
              maxSeconds={15 * 60}
              step={60}
              accent="pool"
            />
          </div>
        </Card>

        <BackCare />

        <DataManager />
      </div>
    </>
  );
}
