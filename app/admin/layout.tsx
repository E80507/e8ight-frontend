import Loading from "@/components/shared/loading/loading";
import AdminNavBar from "@/components/shared/layout/admin-nav-bar";
// import { Toaster } from "@/components/ui/toaster";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  return (
    <>
      <Loading>
        <div className="w-screen overflow-x-hidden">
          <AdminNavBar />
          <div className="relative min-h-screen bg-background-alternative">
            {children}
          </div>
        </div>
      </Loading>
      {/* <Toaster /> */}
    </>
  );
};
export default GlobalNavBarLayout;
