"use client";

import { useEffect, useState } from "react";
import { useProtocolStore } from "@/lib/store";
import { Onboarding } from "./Onboarding";

export function OnboardingGate() {
  const configured = useProtocolStore((s) => s.config.configured);
  const [hydrated, setHydrated] = useState(false);

  // Espera a que zustand/persist rehidrate desde localStorage para no
  // mostrar el onboarding por un instante a usuarios ya configurados.
  useEffect(() => {
    const unsub = useProtocolStore.persist?.onFinishHydration?.(() =>
      setHydrated(true),
    );
    if (useProtocolStore.persist?.hasHydrated?.()) setHydrated(true);
    return () => {
      unsub?.();
    };
  }, []);

  if (!hydrated) return null;
  if (configured) return null;
  return <Onboarding />;
}
