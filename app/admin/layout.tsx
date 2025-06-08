"use client";

import Loading from "@/components/shared/loading/loading";
import AdminNavBar from "@/components/shared/layout/admin-nav-bar";
// import { Toaster } from "@/components/ui/toaster";
import AdminAuthGate from "./_components/admin-auth-gate";
import { useSearchParams } from "next/navigation";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: GlobalNavBarLayoutProps) => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const isEditMode = !!postId;

  return (
    <>
      <Loading>
        <div className="w-screen overflow-x-hidden">
          <AdminAuthGate>
            <AdminNavBar isEditMode={isEditMode} />
            <div className="relative mt-14 min-h-screen web:mt-0 web:bg-background-alternative">
              {children}
            </div>
          </AdminAuthGate>
        </div>
      </Loading>
      {/* <Toaster /> */}
    </>
  );
};

export default AdminLayout;
