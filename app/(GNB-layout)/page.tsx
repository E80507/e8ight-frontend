"use client";

import HeroSection from "@/app/main/hero-section";
import ArchiveSection from "@/app/main/archive-section";
import SubscriptionSection from "../main/subscription-section";
import HistorySection from "../main/history-section";
import SimulationSection from "../main/simulation.section";
import LazyLoad from "@/hooks/main/lazy-loading";
import { useEffect, useState } from "react";
import Loading from "@/components/shared/loading/loading";
import BackgroundSection from "../main/background-section";
import {
  AMPLITUDE_EVENT_DISPLAY_NAME,
  AMPLITUDE_EVENT_LOG_NAME,
} from "@/constants/amplitude";
import useTrackPageView from "@/hooks/amplitude/ust-track-page-view-with-UTM";

const Home = () => {
  const { trackPageView } = useTrackPageView();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    trackPageView(
      AMPLITUDE_EVENT_LOG_NAME.LANDING_PAGE_VIEW,
      AMPLITUDE_EVENT_DISPLAY_NAME.LANDING_PAGE_VIEW,
    );
  }, [trackPageView]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* 백그라운드 섹션 */}
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
      )}
    </>
  );
};

export default Home;
