"use client";

import HeroSection from "@/app/main/hero-section";
import ArchiveSection from "@/app/main/archive-section";
import SubscriptionSection from "../main/subscription-section";
import HistorySection from "../main/history-section";
import SimulationSection from "../main/simulation.section";

const Home = () => {
  return (
    <div>
      {/* 히어로 세션 */}
      <HeroSection />
      {/* 역사 세션 */}
      <HistorySection />
      {/* 시뮬레이션 세션 */}
      <SimulationSection />
      {/* 아카이브 세션 */}
      <ArchiveSection />
      {/* 구독 세션 */}
      <SubscriptionSection />
    </div>
  );
};

export default Home;
