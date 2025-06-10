import GlobalNavBar from "@/components/shared/layout/global-nav-bar";
import GlobalFooter from "@/components/shared/layout/global-footer";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <GlobalNavBar />
        <div className="relative min-h-screen">{children}</div>
        <GlobalFooter />
      </div>
    </>
  );
};
export default GlobalNavBarLayout;
