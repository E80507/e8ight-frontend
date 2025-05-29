"use client";

import ArchiveSection from "./main/archive-section";
import SubscriptionSection from "./main/subscription-section";

const Home = () => {
  return (
    <div>
      {/* 아카이브 세션 */}
      <ArchiveSection />

      {/* 구독 세션 */}
      <SubscriptionSection />
    </div>
  );
};

export default Home;
