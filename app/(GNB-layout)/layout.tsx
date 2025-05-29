import Loading from "@/components/shared/loading/loading";
import GlobalNavBar from "../_components/global-nav-bar";
import { Toaster } from "@/components/ui/toaster";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  return (
    <>
      <Loading>
        <div className="w-screen overflow-x-hidden pl-[280px]">
          <GlobalNavBar />
          <div className="relative min-h-screen">{children}</div>
        </div>
      </Loading>
      <Toaster />
    </>
  );
};
export default GlobalNavBarLayout;
