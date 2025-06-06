"use client";

import SubscriptionModal from "@/app/_components/modal/subscription-modal";
import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/path";
import { useState } from "react";
import Link from "next/link";

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons = ({ className }: ActionButtonsProps) => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  return (
    <div className="flex gap-x-3">
      <Link href={CONTACT_PAGE} prefetch>
        <Button
          size="lg"
          shape="round"
          className={`border web:w-[160px] ${className}`}
        >
          1:1 상담
        </Button>
      </Link>

      <Button
        size="lg"
        shape="round"
        onClick={() => setIsSubscriptionModalOpen(true)} //뉴스 레터 모달 띄우기
        className={`border web:w-[160px] ${className}`}
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
