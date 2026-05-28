"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ModuleRole } from "@/components/layout/ModuleRole";
import { Collapsible } from "@/components/ui/Collapsible";
import { WeightsSection } from "@/components/training/WeightsSection";
import { SpartanSection } from "@/components/training/SpartanSection";
import { getDayPlan } from "@/lib/data/weekPlan";
import { currentWeekDay } from "@/lib/utils";
import { useT } from "@/lib/i18n/useT";
import type { LoadKind } from "@/lib/types";

function TrainingBody() {
  const t = useT();
  const params = useSearchParams();
  const sectionParam = params.get("section"); // "weights" | "spartan" | null
  const [openSection, setOpenSection] = useState<"weights" | "spartan" | null>(
    null,
  );

  useEffect(() => {
    // Si la URL pide una sección concreta, abre esa.
    if (sectionParam === "weights" || sectionParam === "spartan") {
      setOpenSection(sectionParam);
      return;
    }
    // Si no, abre la que toca según el plan del día.
    const plan = getDayPlan(currentWeekDay());
    const kind: LoadKind = plan?.loadKind ?? "rest";
    if (kind === "weights" || kind === "spartan") {
      setOpenSection(kind);
    } else {
      // Día de descanso: ambas plegadas, el usuario elige.
      setOpenSection(null);
    }
  }, [sectionParam]);

  return (
    <div className="px-5 py-6 space-y-5">
      <ModuleRole
        accent="sage"
        roleKey="training.role"
        textKey="training.roleText"
      />

      {/* Sección Pesas */}
      <Collapsible
        title={t("training.weightsSection")}
        subtitle={t("weights.subtitle")}
        accent="sage"
        defaultOpen={openSection === "weights"}
        // re-monta cuando cambia openSection para reflejar el estado deseado
        key={`weights-${openSection}`}
      >
        <WeightsSection />
      </Collapsible>

      {/* Sección Spartan */}
      <Collapsible
        title={t("training.spartanSection")}
        subtitle={t("spartan.subtitle")}
        accent="terra"
        defaultOpen={openSection === "spartan"}
        key={`spartan-${openSection}`}
      >
        <SpartanSection />
      </Collapsible>
    </div>
  );
}

export default function EntrenoPage() {
  return (
    <>
      <PageHeader
        eyebrowKey="training.eyebrow"
        titleKey="training.title"
        subtitleKey="training.subtitle"
        numeral="◐"
      />
      <Suspense fallback={null}>
        <TrainingBody />
      </Suspense>
    </>
  );
}
