import { PageHeader } from "@/components/layout/PageHeader";
import { ShoppingCollapsible } from "@/components/week/ShoppingCollapsible";
import { WeekDayList } from "@/components/week/WeekDayList";

export default function CalendarioPage() {
  return (
    <>
      <PageHeader
        eyebrowKey="week.eyebrow"
        titleKey="week.title"
        subtitleKey="week.subtitle"
        numeral="01"
      />

      <div className="px-5 py-6 space-y-3">
        <ShoppingCollapsible />
        <WeekDayList />
      </div>
    </>
  );
}
