import { PageHeader } from "@/components/layout/PageHeader";
import { StreakBanner } from "@/components/dashboard/StreakBanner";
import { TodayFocus } from "@/components/dashboard/TodayFocus";
import { WeekOverview } from "@/components/dashboard/WeekOverview";
import { MorningTimeline } from "@/components/dashboard/MorningTimeline";
import { DietToday } from "@/components/dashboard/DietToday";
import { AntiInflammatory } from "@/components/dashboard/AntiInflammatory";
import { HowItWorks } from "@/components/dashboard/HowItWorks";

export default function HomePage() {
  return (
    <>
      <PageHeader
        eyebrowKey="home.eyebrow"
        titleKey="home.title"
        subtitleKey="home.subtitle"
        numeral="—"
      />
      <StreakBanner />
      <TodayFocus />
      <WeekOverview />
      <HowItWorks />
      <div className="rule mx-5 my-2" aria-hidden />
      <DietToday />
      <AntiInflammatory />
      <div className="rule mx-5 my-2" aria-hidden />
      <MorningTimeline />
    </>
  );
}
