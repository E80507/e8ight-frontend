"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { IconButton, Button } from "@/components/ui/button";
import {
  TECH_INSIGHT_PAGE,
  TECH_LIBRARY_PAGE,
  DOWNLOADS_PAGE,
  CONTACT_PAGE,
  ADMIN_PAGE,
} from "@/constants/path";
import { SERVICE_NAME } from "@/constants/service";
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
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<NodeJS.Timeout>();
  const clickTimeRef = useRef<number>(0);

  useEffect(() => {
    if (clickCount === 1) {
      router.push("/");
    } else if (clickCount >= 5) {
      router.push(ADMIN_PAGE);
      setClickCount(0);
    }
  }, [clickCount, router]);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (now - clickTimeRef.current > 2000) {
        setClickCount(1);
      } else {
        setClickCount((prev) => prev + 1);
      }

      clickTimeRef.current = now;

      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }

      clickTimer.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    },
    [clickCount],
  );

  const isHome = path === "/";
  const isDetailPage = path?.includes("/detail/");

  return (
    <>
      {/* 홈페이지 데스크톱 GNB */}
      <header
        className={`fixed z-[100] hidden w-full web:flex bg-white/[0.8] backdrop-blur-sm`}
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
        className={`pointer-events-auto fixed inset-x-0 top-0 z-[100] flex w-full items-center justify-between tablet:px-[30px] px-4 py-3 web:hidden bg-white/[0.8] backdrop-blur-sm ${isHome ? "h-[67px]" : "h-12"}`}
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
