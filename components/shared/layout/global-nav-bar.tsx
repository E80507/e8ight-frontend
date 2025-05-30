"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { IconButton } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
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
  { label: "Tech Library", path: `${TECH_LIBRARY_PAGE}` },
  { label: "Tech Insight", path: `${TECH_INSIGHTS_PAGE}` },
  { label: "Downloads", path: `${DOWNLOADS_PAGE}` },
];

const GlobalNavBar = () => {
  const path = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isContactPage = path === CONTACT_PAGE;

  return (
    <>
      {/* 데스크톱 GNB */}
      <div
        className={`font-pretendard web:flex hidden w-full flex-col px-[120px] py-4 ${isContactPage ? "bg-[#FBFBFC]" : "bg-transparent"}`}
      >
        <div className="flex items-center justify-between">
          <Link prefetch={false} href="/">
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
                prefetch={false}
                href={href}
                className={`title-l flex items-center gap-3 hover:underline ${
                  path === href ? "bg-[#353434]" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Button
            size="lg"
            shape="round"
            onClick={() => router.push(CONTACT_PAGE)}
          >
            상담 문의
          </Button>
        </div>
      </div>

      {/* 모바일 GNB */}
      <div
        className={`web:hidden z-50 flex h-[67px] w-full items-center justify-between px-4 py-3 ${isContactPage ? "bg-[#FBFBFC]" : "bg-transparent"}`}
      >
        <Link prefetch={false} href="/">
          <Image
            src="/svg/logo.svg"
            alt={SERVICE_NAME}
            width={64}
            height={43}
            priority
          />
        </Link>
        <IconButton
          src={isMobileMenuOpen ? "/svg/icon/x.svg" : "/svg/icon/menu.svg"}
          width={24}
          height={24}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          variant="normal"
          size="sm"
        />
      </div>

      {/* 모바일 메뉴 Drawer */}
      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className="font-pretendard flex flex-col items-center justify-center gap-y-[59px] bg-white">
          {NAV_LINKS.map(({ label, path: href }) => (
            <Link
              key={href}
              prefetch={false}
              href={href}
              className={`h1-m flex items-center gap-3 ${
                path === href ? "bg-[#353434]" : ""
              }`}
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
