"use client";

import {
  TECH_INSIGHTS_PAGE,
  TECH_LIBRARY_PAGE,
  DOWNLOADS_PAGE,
} from "@/constants/path";
import { SERVICE_NAME } from "@/constants/service";
import { GNB_EXTERNAL_LINKS } from "@/constants/service";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import useGetUserInfo from "@/hooks/auth/use-get-admin-info";

const GlobalNavBar = () => {
  // const admin = useGetUserInfo();
  const path = usePathname();

  const menuArray = [
    {
      label: "Tech Library",
      path: `${TECH_LIBRARY_PAGE}?prev=1`,
    },
    {
      label: "Tech Insight",
      path: `${TECH_INSIGHTS_PAGE}?prev=1`,
    },
    {
      label: "Downloads",
      path: `${DOWNLOADS_PAGE}?prev=1`,
    },
  ];

  return (
    <div className="fixed inset-x-0 hidden h-[139px] w-full flex-col gap-3 gap-y-4 bg-red-300 px-[120px] py-4 font-pretendard web:flex">
      <div className="flex items-center justify-between">
        <Link prefetch={false} href="/">
          <Image
            src="/svg/logo.svg" // 수정 필요
            alt={SERVICE_NAME} // 수정 필요
            width={64}
            height={43}
          />
        </Link>
        <div className="flex items-center gap-x-10 text-label-alternative body-3">
          {GNB_EXTERNAL_LINKS.map((link) => (
            <Link key={link.label} href={link.href} target={link.target}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[59px]">
          {menuArray.map((menu) => (
            <Link
              prefetch={false}
              key={menu.path}
              className={`flex items-center gap-3 title-l hover:underline ${path === menu.path ? "bg-[#353434]" : ""}`}
              href={menu.path}
            >
              {menu.label}
            </Link>
          ))}
        </div>
        {/* 문의 버튼 */}
      </div>
    </div>
  );
};
export default GlobalNavBar;
