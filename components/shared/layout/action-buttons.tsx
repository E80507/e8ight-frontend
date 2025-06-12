"use client";

import SubscriptionModal from "@/app/_components/modal/subscription-modal";
import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/path";
import Link from "next/link";
import useTrackEvent from "@/hooks/amplitude/use-track-event";
import {
  AMPLITUDE_EVENT_DISPLAY_NAME,
  AMPLITUDE_EVENT_LOG_NAME,
} from "@/constants/amplitude";

interface ActionButtonsProps {
  className?: string;
  onClick?: () => void;
  isSubscriptionModalOpen?: boolean;
  setIsSubscriptionModalOpen?: (open: boolean) => void;
}

const ActionButtons = ({
  className,
  onClick,
  isSubscriptionModalOpen,
  setIsSubscriptionModalOpen,
}: ActionButtonsProps) => {
  const { handleTrackEvent } = useTrackEvent();

  const onClickContact = async () => {
    onClick?.();

    // 앰플리튜드 이벤트
    handleTrackEvent(
      AMPLITUDE_EVENT_LOG_NAME.CTA_BUTTON_CLICK,
      AMPLITUDE_EVENT_DISPLAY_NAME.CTA_BUTTON_CLICK,
      { button_name: "1:1 상담" },
    );
  };
  const onClickSubscription = async () => {
    if (setIsSubscriptionModalOpen) {
      setIsSubscriptionModalOpen(true);
    }
    onClick?.();

    //앰플리튜드 이벤트
    handleTrackEvent(
      AMPLITUDE_EVENT_LOG_NAME.CTA_BUTTON_CLICK,
      AMPLITUDE_EVENT_DISPLAY_NAME.CTA_BUTTON_CLICK,
      { button_name: "뉴스 레터 구독 신청" },
    );
  };

  return (
    <div className="flex gap-x-3">
      <Link href={CONTACT_PAGE} prefetch>
        <Button
          size="lg"
          shape="round"
          className={`border web:w-[160px] ${className}`}
          onClick={onClickContact}
        >
          1:1 상담
        </Button>
      </Link>

      <Button
        size="lg"
        shape="round"
        onClick={onClickSubscription}
        className={`border web:w-[160px] ${className}`}
      >
        뉴스레터 구독
      </Button>

      {isSubscriptionModalOpen && (
        <SubscriptionModal
          onClickClose={() => setIsSubscriptionModalOpen?.(false)}
        />
      )}
    </div>
  );
};

export default ActionButtons;
