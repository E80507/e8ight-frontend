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
} from "@/constants/service";

export default function GlobalFooter() {
  return (
    <footer className="bg-background-alternative px-4 py-10 font-pretendard text-label-alternative caption2-400 web:px-[120px] web:py-[60px]">
      <div className="flex flex-col justify-between gap-y-6 web:flex-row web:items-center web:gap-y-0">
        <Image
          src="/svg/logo-with-text.svg"
          alt="logo"
          width={110}
          height={37}
        />
        <ActionButtons />
      </div>
      <p className="mb-1 mt-[14px] web:mt-0">{COMPANY_NAME}</p>
      <div className="flex flex-col">
        <p>
          {PRIVACY_OFFICER.title} : {PRIVACY_OFFICER.name} | 개인정보처리방침{" "}
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
    </footer>
  );
}
