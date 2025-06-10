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
import SocialLinks from "@/app/(GNB-layout)/detail/[id]/_components/social-links";
import { usePathname } from "next/navigation";
import {
  TECH_INSIGHT_PAGE,
  TECH_LIBRARY_PAGE,
  DOWNLOADS_PAGE,
} from "@/constants/path";

const GlobalFooter = () => {
  const pathname = usePathname();
  const isDashboard =
    pathname === TECH_INSIGHT_PAGE ||
    pathname === TECH_LIBRARY_PAGE ||
    pathname === DOWNLOADS_PAGE;

  return (
    <footer
      className={`${isDashboard ? "bg-background-alternative" : "bg-toast-bg"} px-4 py-10 font-pretendard text-label-alternative caption2-400 tablet:px-6 tablet:py-[30px] web:px-[120px] web:py-6`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-6 flex justify-between web:items-center web:gap-y-0">
          <div className="flex items-center gap-x-1">
            <Image
              src={
                isDashboard
                  ? "/svg/footer-logo-white.svg"
                  : "/svg/logo-with-text.svg"
              }
              alt="logo"
              width={isDashboard ? 40 : 110}
              height={isDashboard ? 25 : 37}
              style={{
                width: isDashboard ? 40 : 110,
                height: isDashboard ? 25 : 37,
              }}
            />
            {isDashboard && (
              <Image
                src="/svg/footer-logo-text-white.svg"
                alt="logo"
                width={59}
                height={26}
                style={{ width: 59, height: 26 }}
              />
            )}
          </div>
          <SocialLinks withTitle={false} inFooter />
        </div>
        <ActionButtons className="mb-6 border-white bg-transparent text-white" />
        <p className="mb-1 mt-[14px] web:mt-0">{COMPANY_NAME}</p>
        <div className="flex flex-col">
          <p>
            {PRIVACY_OFFICER.title} : {PRIVACY_OFFICER.name} | 개인정보처리방침
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
      </div>
    </footer>
  );
};

export default GlobalFooter;
