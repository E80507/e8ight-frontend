"use client";

import GlobalNavBar from "@/components/shared/layout/global-nav-bar";
import GlobalFooter from "@/components/shared/layout/global-footer";
import BackgroundSection from "../main/background-section";
import { usePathname } from "next/navigation";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  const pathname = usePathname();
  const isMain = pathname === "/";
  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <GlobalNavBar />
        {/* 백그라운드 섹션 */}
        {isMain && <BackgroundSection />}

        <div className="relative min-h-screen">{children}</div>
        <GlobalFooter />
      </div>
    </>
  );
};
export default GlobalNavBarLayout;
