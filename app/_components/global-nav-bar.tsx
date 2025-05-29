"use client";

import {
  ADMIN_ACCOUNT_PAGE,
  ARTWORK_PAGE,
  DELIVERY_PAGE,
  LOGIN_PAGE,
  MEMBER_PAGE,
  NOTICE_PAGE,
  ORDER_PAGE,
  PASSWORD_RESET_PAGE,
  POINT_CHARGE_PAGE,
  POINT_USE_PAGE,
  REPORT_PAGE,
  SETTING_PAGE,
} from "@/constants/path";
import { SERVICE_NAME } from "@/constants/service";
import useGetUserInfo from "@/hooks/auth/use-get-admin-info";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuAccordion, { DepthMenu } from "./menu-accordion";
import { usePostLogout } from "@/hooks/auth/use-post-logout";

const GlobalNavBar = () => {
  const admin = useGetUserInfo();
  const path = usePathname();
  const router = useRouter();
  const { onSubmit } = usePostLogout();

  // 로그아웃 성공 핸들러
  const handleSuccessLogOut = () => {
    router.replace(LOGIN_PAGE);
  };

  const menuArray = [
    {
      label: "회원 관리",
      icon: "member",
      path: `${MEMBER_PAGE}?prev=1`,
    },
    {
      label: "피드 관리",
      icon: "feed",
      path: [
        {
          label: "작품 목록",
          path: `${ARTWORK_PAGE}?prev=1`,
        },
        {
          label: "공지 목록",
          path: `${NOTICE_PAGE}?prev=1`,
        },
        {
          label: "신고 목록",
          path: `${REPORT_PAGE}?prev=1`,
        },
      ],
    },
    {
      label: "결제 관리",
      icon: "credit",
      path: [
        {
          label: "포인트 충전 목록",
          path: `${POINT_CHARGE_PAGE}?prev=1`,
        },
        {
          label: "포인트 사용 목록",
          path: `${POINT_USE_PAGE}?prev=1`,
        },
      ],
    },
    {
      label: "주문 관리",
      icon: "delivery",
      path: [
        {
          label: "배송 목록",
          path: `${DELIVERY_PAGE}?prev=1`,
        },
        {
          label: "주문 출력",
          path: `${ORDER_PAGE}`,
        },
      ],
    },
    {
      label: "기본 관리",
      icon: "setting",
      path: `${SETTING_PAGE}?prev=1`,
    },
  ];

  const adminArray = [
    {
      label: "관리자 계정 관리",
      icon: "account",
      path: ADMIN_ACCOUNT_PAGE,
    },
    {
      label: "비밀번호 변경",
      icon: "password",
      path: PASSWORD_RESET_PAGE,
    },
    {
      label: "로그아웃",
      icon: "logout",
      onClick: () => onSubmit(handleSuccessLogOut),
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 flex w-full max-w-[280px] flex-col gap-3 bg-primary px-5 pb-10 pt-5 text-white">
      <div className="relative">
        <Link
          prefetch={false}
          className="relative block py-6 pl-3"
          href={MEMBER_PAGE}
        >
          <Image
            src="/svg/logo.svg"
            alt={SERVICE_NAME}
            width={106}
            height={24}
          />
        </Link>
        <div className="">
          <div className="h-[53px] px-3">
            {admin ? (
              <div className="flex justify-between">
                <p>
                  <span className="heading-4">{admin.name}</span>
                  <span className="body-1">님 안녕하세요</span>
                </p>
                <p className="rounded-sm bg-white px-2 py-[2px] text-black subtitle-3">
                  {admin.role === "ADMIN" ? "일반" : "마스터"}
                </p>
              </div>
            ) : (
              <LoaderIcon className={`animate-spin text-white duration-1000`} />
            )}
          </div>
          <div className="max-h-[calc(100vh-141px)] overflow-y-auto hide-scroll-bar">
            <div className="flex h-full min-h-[calc(100vh-141px)] flex-col justify-between gap-10 pb-10">
              <div>
                {menuArray.map((menu) => {
                  if (typeof menu.path === "string") {
                    return (
                      <Link
                        prefetch={false}
                        key={menu.path}
                        className={`flex items-center gap-3 rounded-md px-3 py-4 subtitle-2 hover:underline ${path === menu.path ? "bg-[#353434]" : ""}`}
                        href={menu.path}
                      >
                        <Image
                          src={`/svg/${menu.icon}.svg`}
                          alt={menu.label}
                          width={24}
                          height={24}
                          sizes="size-6"
                          className="-mt-px"
                        />
                        {menu.label}
                      </Link>
                    );
                  } else {
                    return (
                      <MenuAccordion
                        currentPath={path}
                        menu={menu as DepthMenu}
                        key={menu.label}
                      />
                    );
                  }
                })}
              </div>
              <div className="">
                <div>
                  {adminArray.map((menu) => {
                    if (menu.path) {
                      return (
                        <Link
                          prefetch={false}
                          key={menu.path}
                          className={`flex items-center gap-3 rounded-md px-3 py-4 subtitle-2 hover:underline ${path === menu.path ? "bg-[#353434]" : ""}`}
                          href={menu.path}
                        >
                          <Image
                            src={`/svg/${menu.icon}.svg`}
                            alt={menu.label}
                            width={24}
                            height={24}
                            sizes="size-6"
                            className="-mt-px"
                          />
                          {menu.label}
                        </Link>
                      );
                    } else {
                      return (
                        <button
                          key={menu.label}
                          onClick={menu.onClick}
                          className={`flex items-center gap-3 rounded-md px-3 py-4 subtitle-2 hover:underline ${path === menu.path ? "bg-[#353434]" : ""}`}
                        >
                          <Image
                            src={`/svg/${menu.icon}.svg`}
                            alt={menu.label}
                            width={24}
                            height={24}
                            sizes="size-6"
                            className="-mt-px"
                          />
                          {menu.label}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GlobalNavBar;
