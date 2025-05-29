"use client";

import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  className?: string;
}

const ActionButtons = ({ className }: ActionButtonsProps) => {
  const router = useRouter();

  return (
    <div className={className || "mb-[26px] flex gap-x-3"}>
      <Button
        size="lg"
        shape="round"
        className="bg-black"
        onClick={() => router.push(CONTACT_PAGE)}
      >
        상담문의
      </Button>
      <Button
        size="lg"
        shape="round"
        className="bg-primary-alternative text-black"
        //뉴스 레터 모달 띄우기
      >
        뉴스레터 구독
      </Button>
    </div>
  );
};

export default ActionButtons;
