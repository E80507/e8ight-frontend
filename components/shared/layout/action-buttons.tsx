"use client";

import SubscriptionModal from "@/app/_components/modal/subscription-modal";
import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/path";
import { useState } from "react";
import Link from "next/link";

interface ActionButtonsProps {
  className?: string;
  onClick?: () => void;
}

const ActionButtons = ({ className, onClick }: ActionButtonsProps) => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  return (
    <div className="flex gap-x-3">
      <Link href={CONTACT_PAGE} prefetch>
        <Button
          size="lg"
          shape="round"
          className={`border web:w-[160px] ${className}`}
          onClick={onClick}
        >
          1:1 상담
        </Button>
      </Link>

      <Button
        size="lg"
        shape="round"
        onClick={() => {
          setIsSubscriptionModalOpen(true);
        }}
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
