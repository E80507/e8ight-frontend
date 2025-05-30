import Loading from "@/components/shared/loading/loading";
import GlobalNavBar from "@/components/shared/layout/global-nav-bar";
// import { Toaster } from "@/components/ui/toaster";
import GlobalFooter from "@/components/shared/layout/global-footer";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  return (
    <>
      <Loading>
        <div className="w-screen overflow-x-hidden">
          <GlobalNavBar />
          <div className="relative">{children}</div>
          <GlobalFooter />
        </div>
      </Loading>
      {/* <Toaster /> */}
    </>
  );
};
export default GlobalNavBarLayout;
