"use client";

import { Collapsible } from "@/components/ui/Collapsible";
import { ShoppingList } from "@/components/week/ShoppingList";
import { useT } from "@/lib/i18n/useT";

export function ShoppingCollapsible() {
  const t = useT();
  return (
    <Collapsible
      title={t("week.shopping")}
      subtitle={t("week.shoppingSub")}
      accent="sage"
    >
      <ShoppingList embedded />
    </Collapsible>
  );
}
