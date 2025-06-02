"use client";

import HeroSection from "@/app/main/hero-section";
import ArchiveSection from "@/app/main/archive-section";
import SubscriptionSection from "../main/subscription-section";
import HistorySection from "../main/history-section";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      {/* 히어로 세션 */}
      <HeroSection />
      {/* 역사 세션 */}
      <HistorySection />
      {/* 아카이브 세션 */}
      <ArchiveSection />
      {/* 구독 세션 */}
      <SubscriptionSection />

      <Link href="/admin">관리자 페이지</Link>
    </div>
  );
};

export default Home;
