"use client";

import LazyLoad from "@/hooks/main/lazy-loading";
import BackgroundSection from "../main/background-section";
import HeroSection from "../main/hero-section";
import HistorySection from "../main/history-section";
import SimulationSection from "../main/simulation.section";
import ArchiveSection from "../main/archive-section";
import SubscriptionSection from "../main/subscription-section";
import useMain from "@/hooks/main/use-main";
import Loading from "@/components/shared/loading/loading";

const HomeClient = () => {
  const { loading } = useMain();

  if (loading) return <Loading />;

  return (
    <>
      <BackgroundSection />

      {/* 히어로 섹션 */}
      <HeroSection />
      {/* 역사 섹션 */}
      <HistorySection />

      <LazyLoad>
        {/* 시뮬레이션 섹션 */}
        <SimulationSection />

        {/* 아카이브 섹션 */}
        <ArchiveSection />

        {/* 구독 섹션 */}
        <SubscriptionSection />
      </LazyLoad>
    </>
  );
};

export default HomeClient;
