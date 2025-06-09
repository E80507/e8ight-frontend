"use client";

import HeroSection from "@/app/main/hero-section";
import ArchiveSection from "@/app/main/archive-section";
import SubscriptionSection from "../main/subscription-section";
import HistorySection from "../main/history-section";
import SimulationSection from "../main/simulation.section";
import LazyLoad from "@/hooks/main/lazy-loading";
// import {
//       AMPLITUDE_EVENT_DISPLAY_NAME,
//       AMPLITUDE_EVENT_LOG_NAME,
// } from "@/constant/amplitude";

const Home = () => {
  // todo: amplitude 추가 후 사용
  // const { trackPageView } = useTrackPageViewWithUTM();

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   trackPageView(
  //     AMPLITUDE_EVENT_LOG_NAME.MAIN_PAGE_VIEW,
  //     AMPLITUDE_EVENT_DISPLAY_NAME.MAIN_PAGE_VIEW,
  //   );
  // }, [trackPageView]);

  return (
    <>
      {/* 히어로 섹션 */}
      <HeroSection />

      <LazyLoad>
        {/* 역사 섹션 */}
        <HistorySection />

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

export default Home;
