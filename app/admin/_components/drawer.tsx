"use client";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ADMIN_PAGE, CREATE_POST_PAGE } from "@/constants/path";

const AdminGNBDrawer = ({
  open,
  onOpenChange,
  isHome,
  setIsMobileMenuOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isHome: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => {
  const router = useRouter();

  // 메인 페이지로 이동
  const handleBackToMain = () => {
    router.push(ADMIN_PAGE);
    setIsMobileMenuOpen(false);
  };

  // 컨텐츠 추가 페이지로 이동
  const handleCreatePost = () => {
    router.push(CREATE_POST_PAGE);
    setIsMobileMenuOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTitle className="sr-only">메뉴 열기</DrawerTitle>

      <DrawerContent
        className={`flex h-full flex-col items-center bg-white ${isHome ? "pt-[67px]" : "pt-12"} font-pretendard`}
      >
        <div className="mt-[180px] flex flex-col items-center gap-[24px]">
          {/* 로고 */}
          <Image
            src="/svg/logo-with-text.svg"
            alt="logo"
            width={144}
            height={49}
          />

          <div className="flex flex-col gap-[12px]">
            {/* Back to Main 버튼 */}
            <Button
              type="button"
              variant="outline"
              shape="round"
              className="h-[48px] w-[240px]"
              onClick={handleBackToMain}
            >
              Back to Main
            </Button>

            {/* 추가하기 버튼 */}
            <Button
              type="button"
              shape="round"
              className="h-[48px] w-[240px]"
              onClick={handleCreatePost}
            >
              추가하기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminGNBDrawer;
