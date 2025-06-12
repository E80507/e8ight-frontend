"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { IconButton, Button } from "@/components/ui/button";
import {
  TECH_INSIGHT_PAGE,
  TECH_LIBRARY_PAGE,
  DOWNLOADS_PAGE,
  CONTACT_PAGE,
  ADMIN_PAGE,
} from "@/constants/path";
import { SERVICE_MAIN_URL, SERVICE_NAME } from "@/constants/service";
import ExternalLinksNav from "@/components/shared/layout/external-links-nav";
import GNBDrawer from "@/app/(GNB-layout)/_components/drawer";
import { Share2Icon } from "lucide-react";
import { shareUrl } from "@/utils/share";
import SubscriptionModal from "@/app/_components/modal/subscription-modal";

const NAV_LINKS = [
  { label: "Tech Library", path: TECH_LIBRARY_PAGE },
  { label: "Tech Insight", path: TECH_INSIGHT_PAGE },
  { label: "Downloads", path: DOWNLOADS_PAGE },
];

const GlobalNavBar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const clickTimeRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);
  const clickTimer = useRef<NodeJS.Timeout>();

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const now = Date.now();
      const timeDiff = now - clickTimeRef.current;

      if (timeDiff > 2000) {
        clickCountRef.current = 1;
      } else {
        clickCountRef.current += 1;
      }

      clickTimeRef.current = now;

      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      // 5번 누르면 바로 관리자 페이지 이동
      if (clickCountRef.current >= 5) {
        clickCountRef.current = 0;
        return router.push(ADMIN_PAGE);
      }

      // 2초 후에 단일 클릭만 있으면 메인 페이지 열기
      clickTimer.current = setTimeout(() => {
        if (clickCountRef.current === 1) {
          window.open(SERVICE_MAIN_URL, "_blank");
        }
        clickCountRef.current = 0;
      }, 2000);
    },
    [router],
  );

  const isHome = path === "/";
  const isDetailPage = path?.includes("/detail/");

  return (
    <>
      {/* 홈페이지 데스크톱 GNB */}
      <header
        className={`fixed z-[100] hidden w-full bg-white/[0.8] backdrop-blur-sm web:flex`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-[120px] py-4 font-pretendard">
          <div className="flex items-center justify-between">
            <button type="button" onClick={handleLogoClick}>
              <Image
                src="/svg/logo.svg"
                alt={SERVICE_NAME}
                width={45}
                height={43}
                priority
              />
            </button>
            <ExternalLinksNav />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <nav className="flex items-center gap-x-[59px]">
              {NAV_LINKS.map(({ label, path: href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 title-l"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <Link href={CONTACT_PAGE} prefetch>
              <Button
                size="lg"
                shape="round"
                className="w-[160px]"
                onClick={() => router.push(CONTACT_PAGE)}
              >
                상담문의
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 홈페이지 모바일 GNB */}
      <header
        className={`pointer-events-auto fixed inset-x-0 top-0 z-[100] flex w-full items-center justify-between bg-white/[0.8] px-4 py-3 backdrop-blur-sm tablet:px-[30px] web:hidden ${isHome ? "h-[67px]" : "h-12"}`}
      >
        {isHome ? (
          <div className="relative h-[43px] w-[45px]">
            <object
              data="/svg/logo.svg"
              type="image/svg+xml"
              width="45"
              height="43"
            />
            <button
              type="button"
              onClick={handleLogoClick}
              className="absolute inset-0 z-10"
              aria-label="홈으로 이동"
            ></button>
          </div>
        ) : (
          <IconButton
            src="/svg/icon/chevron-left.svg"
            width={24}
            height={24}
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            variant="normal"
            size="sm"
          />
        )}

        <div className="flex items-center gap-[24px]">
          {/* 공유하기 */}
          {isDetailPage && (
            <button
              type="button"
              onClick={() => shareUrl(window.location.href)}
            >
              <Share2Icon />
            </button>
          )}

          <IconButton
            src={isMobileMenuOpen ? "/svg/icon/x.svg" : "/svg/icon/menu.svg"}
            width={24}
            height={24}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            variant="normal"
            size="sm"
          />
        </div>
      </header>
      <GNBDrawer
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        isHome={isHome}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        NAV_LINKS={NAV_LINKS}
        isSubscriptionModalOpen={isSubscriptionModalOpen}
        setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
      />
      {isSubscriptionModalOpen && (
        <SubscriptionModal
          onClickClose={() => setIsSubscriptionModalOpen(false)}
        />
      )}
    </>
  );
};

export default GlobalNavBar;
