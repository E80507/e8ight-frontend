"use client";

import HeroSection from "@/app/main/hero-section";
import ArchiveSection from "@/app/main/archive-section";
import SubscriptionSection from "../main/subscription-section";
import HistorySection from "../main/history-section";
import SimulationSection from "../main/simulation.section";
import Image from "next/image";

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
      <div className="absolute left-0 top-[-67px] -z-10 h-screen w-full web:top-[-139px]">
        <Image
          src="/gif/hero.gif"
          alt="Global No.1 Digital Twin Platform"
          fill
          unoptimized
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
