"use client";

import SubscriptionModal from "@/app/_components/modal/subscription-modal";
import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons = ({ className }: ActionButtonsProps) => {
  const router = useRouter();
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  return (
    <div className={className || "mb-[26px] flex gap-x-3"}>
      <Button
        size="lg"
        shape="round"
        className="bg-black web:w-[160px]"
        onClick={() => router.push(CONTACT_PAGE)}
      >
        상담문의
      </Button>

      <Button
        size="lg"
        shape="round"
        onClick={() => setIsSubscriptionModalOpen(true)} //뉴스 레터 모달 띄우기
        className="bg-primary-alternative text-black web:w-[160px]"
      >
        뉴스레터 구독
      </Button>

      {isSubscriptionModalOpen && (
        <SubscriptionModal
          onClickClose={() => setIsSubscriptionModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ActionButtons;
