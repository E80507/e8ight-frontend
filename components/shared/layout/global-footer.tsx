"use client";

import Image from "next/image";
import ActionButtons from "@/components/shared/layout/action-buttons";
import {
  COMPANY_ADDRESS,
  CONTACT_INFO,
  COMPANY_NAME,
  COPYRIGHT,
  CEO_INFO,
  PRIVACY_OFFICER,
  BUSINESS_NUMBER,
  SERVICE_MAIN_URL,
} from "@/constants/service";
import SocialLinks from "@/app/(GNB-layout)/detail/[id]/_components/social-links";
import SubscriptionModal from "@/app/_components/modal/subscription-modal";
import { useState } from "react";
import Link from "next/link";

const GlobalFooter = () => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  return (
    <footer className="bg-toast-bg px-4 py-10 font-pretendard text-label-alternative caption2-400 tablet:px-6 tablet:py-[30px] web:px-[120px] web:py-6">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="web:mb-6 mb-[32px] flex justify-between web:items-center web:gap-y-0">
          <Link
            className="flex items-center gap-x-[4px]"
            href={SERVICE_MAIN_URL}
            target="_blank"
          >
            <Image
              src="/svg/footer-logo.svg"
              alt="logo"
              width={40}
              height={25}
              style={{ width: 40, height: 25 }}
            />
            <Image
              src="/svg/footer-logo-text.svg"
              alt="logo"
              width={59}
              height={26}
              style={{ width: 59, height: 26 }}
            />
          </Link>
          <SocialLinks withTitle={false} inFooter />
        </div>

        {isSubscriptionModalOpen && (
          <SubscriptionModal
            onClickClose={() => setIsSubscriptionModalOpen(false)}
          />
        )}

        <div className="flex web:flex-row flex-col web:items-end justify-between">
          <div className="flex flex-col">
            <p className="mb-[4px]">{COMPANY_NAME}</p>
            <p>
              {PRIVACY_OFFICER.title} : {PRIVACY_OFFICER.name} |
              개인정보처리방침
            </p>
            <p>
              {CEO_INFO.title} : {CEO_INFO.name} | 사업자등록번호 :{" "}
              {BUSINESS_NUMBER}
            </p>
            <div>
              문의하기 :{" "}
              <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              <span> | </span>
              고객지원 :{" "}
              <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a>
            </div>
            <p>{COMPANY_ADDRESS.fullAddress}</p>
            <p className="mt-4">{COPYRIGHT}</p>
          </div>

          <div className="web:ml-0 ml-auto">
            <ActionButtons
              className="web:mt-0 mt-[32px] border-white bg-transparent text-white"
              isSubscriptionModalOpen={isSubscriptionModalOpen}
              setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
