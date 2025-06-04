"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import ActionButtons from "@/components/shared/layout/action-buttons";

const NAV_LINKS = [
  { label: "Tech Library", path: TECH_LIBRARY_PAGE },
  { label: "Tech Insight", path: TECH_INSIGHT_PAGE },
  { label: "Downloads", path: DOWNLOADS_PAGE },
];

const GlobalNavBar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

      console.log(clickCount);
    },
    [clickCount],
  );

  const isContactPage = path === CONTACT_PAGE;
  const isHome = path === "/";

  return (
    <>
      {/* 홈페이지 데스크톱 GNB */}
      <header
        className={`relative z-[100] hidden w-full flex-col px-[120px] py-4 font-pretendard web:flex ${
          isContactPage
            ? "bg-[#FBFBFC]"
            : "mx-auto max-w-[1440px] bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleLogoClick}>
            <Image
              src="/svg/logo.svg"
              alt={SERVICE_NAME}
              width={64}
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
      </header>

      {/* 홈페이지 모바일 GNB */}
      <header
        className={`pointer-events-auto relative z-[100] flex w-full items-center justify-between px-4 py-3 web:hidden ${
          isContactPage ? "bg-[#FBFBFC]" : "bg-transparent"
        } ${isHome ? "h-[67px]" : "h-12"}`}
      >
        {isHome ? (
          <Link href="/" onClick={handleLogoClick}>
            <Image
              src="/svg/logo.svg"
              alt={SERVICE_NAME}
              width={64}
              height={43}
              priority
            />
          </Link>
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
        <IconButton
          src={isMobileMenuOpen ? "/svg/icon/x.svg" : "/svg/icon/menu.svg"}
          width={24}
          height={24}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          variant="normal"
          size="sm"
        />
      </header>

      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerTitle className="sr-only">메뉴 열기</DrawerTitle>
        <DrawerContent
          className={`flex min-h-screen flex-col items-center bg-white ${isHome ? "pt-[67px]" : "pt-12"} font-pretendard`}
        >
          <div className="flex flex-1 flex-col items-center justify-center gap-y-[59px]">
            {NAV_LINKS.map(({ label, path: href }) => (
              <Link
                key={href}
                prefetch={false}
                href={href}
                className="h1-m"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <DrawerFooter className="flex flex-col py-10">
            <ActionButtons />
            <ExternalLinksNav />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default GlobalNavBar;
