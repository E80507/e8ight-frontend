"use client";

import HeroSection from "@/app/main/hero-section";
import ArchiveSection from "@/app/main/archive-section";
import SubscriptionSection from "../main/subscription-section";
import HistorySection from "../main/history-section";
import SimulationSection from "../main/simulation.section";
import BackgroundSection from "../main/background-section";

const Home = () => {
  return (
    <div>
      {/* 백그라운드 섹션 */}
      <BackgroundSection />
      {/* 히어로 섹션 */}
      <HeroSection />
      {/* 역사 섹션 */}
      <HistorySection />
      {/* 시뮬레이션 섹션 */}
      <SimulationSection />
      {/* 아카이브 섹션 */}
      <ArchiveSection />
      {/* 구독 섹션 */}
      <SubscriptionSection />
    </div>
  );
};

export default Home;
