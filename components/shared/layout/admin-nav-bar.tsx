"use client";

import Image from "next/image";
import Link from "next/link";
import { SERVICE_NAME } from "@/constants/service";
import { Button, IconButton } from "@/components/ui/button";
import { ADMIN_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import AdminGNBDrawer from "@/app/admin/_components/drawer";
import { useState } from "react";
import { HOME_PAGE } from "@/constants/path";

interface AdminNavBarProps {
  isEditMode?: boolean;
}

const AdminNavBar = ({ isEditMode = false }: AdminNavBarProps) => {
  const router = useRouter();
  const path = usePathname();
  const isCreatePage = path === "/admin/create-post";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = path === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full bg-white font-pretendard`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between p-4 web:h-[96px] web:px-[120px]">
        {/* 왼쪽 영역 */}
        <div className="flex items-center">
          {/* 모바일 뒤로가기 */}
          <IconButton
            src="/svg/icon/chevron-left.svg"
            width={24}
            height={24}
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push(ADMIN_PAGE);
              }
            }}
            variant="normal"
            size="sm"
            className="flex web:hidden"
          />

          {/* 데스크톱 로고 */}
          <Link
            href={ADMIN_PAGE}
            className="hidden items-center gap-2 web:flex"
            prefetch
          >
            <Image
              src="/svg/logo.svg"
              alt={SERVICE_NAME}
              width={45}
              height={43}
              priority
            />
            <span className="font-gibson font-semibold">E8 Admin</span>
          </Link>
        </div>

        {/* 가운데 타이틀 (모바일 전용) */}
        <p className="flex-1 text-center pretendard-title-m web:hidden">
          {isEditMode ? "컨텐츠 수정" : isCreatePage ? "컨텐츠 추가" : ""}
        </p>

        {/* 오른쪽 영역 */}
        <div className="mobile:gap-4 flex items-center web:gap-0">
          <Link href={HOME_PAGE} prefetch>
            <Button
              variant="outline"
              size="lg"
              shape="round"
              className="hidden web:flex"
            >
              Back to Main
            </Button>
          </Link>

          <IconButton
            src="/svg/icon/menu.svg"
            width={24}
            height={24}
            variant="normal"
            size="sm"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`flex web:hidden ${isCreatePage ? "hidden" : ""}`}
          />
        </div>
      </div>

      <AdminGNBDrawer
        open={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        isHome={isHome}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </header>
  );
};

export default AdminNavBar;
