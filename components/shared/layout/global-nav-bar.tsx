"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IconButton, Button } from "@/components/ui/button";
import {
  TECH_INSIGHTS_PAGE,
  TECH_LIBRARY_PAGE,
  DOWNLOADS_PAGE,
  CONTACT_PAGE,
} from "@/constants/path";
import { SERVICE_NAME } from "@/constants/service";
import ExternalLinksNav from "@/components/shared/layout/external-links-nav";
import ActionButtons from "@/components/shared/layout/action-buttons";

const NAV_LINKS = [
  { label: "Tech Library", path: TECH_LIBRARY_PAGE },
  { label: "Tech Insight", path: TECH_INSIGHTS_PAGE },
  { label: "Downloads", path: DOWNLOADS_PAGE },
];

const GlobalNavBar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isContactPage = path === CONTACT_PAGE;
  const isHome = path === "/";

  return (
    <>
      {/* 홈페이지 데스크톱 GNB */}
      <header
        className={`relative z-[999] hidden w-full flex-col px-[120px] py-4 font-pretendard web:flex ${
          isContactPage
            ? "bg-[#FBFBFC]"
            : "mx-auto max-w-[1440px] bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/svg/logo.svg"
              alt={SERVICE_NAME}
              width={64}
              height={43}
              priority
            />
          </Link>
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
        className={`pointer-events-auto relative z-[999] flex w-full items-center justify-between px-4 py-3 web:hidden ${
          isContactPage ? "bg-[#FBFBFC]" : "bg-transparent"
        } ${isHome ? "h-[67px]" : "h-12"}`}
      >
        {isHome ? (
          <Link href="/">
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
          className={`flex flex-col items-center justify-center gap-y-[59px] bg-white font-pretendard`}
        >
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
