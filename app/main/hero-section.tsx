"use client";

import ActionButtons from "@/components/shared/layout/action-buttons";
import { useState } from "react";
import SubscriptionModal from "../_components/modal/subscription-modal";

const HeroSection = () => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-[1440px] items-center justify-center px-4 tablet:px-[30px] web:h-[calc(100vh-139px)] web:px-[120px] web:pt-[100px]">
      <div className=" flex flex-col items-center gap-x-2 text-center text-white">
        <h1 className="mb-8 !leading-[140%] text-white gibson-h1-m web:gibson-h1-l">
          Global No.1
          <br />
          Digital Twin Platform
        </h1>

        <ActionButtons
          className="border-black-1 bg-white text-black hover:border-primary hover:bg-primary"
          isSubscriptionModalOpen={isSubscriptionModalOpen}
          setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
        />

        {isSubscriptionModalOpen && (
          <SubscriptionModal
            onClickClose={() => setIsSubscriptionModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
