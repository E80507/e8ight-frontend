"use client";

import Loading from "@/components/shared/loading/loading";
import AdminNavBar from "@/components/shared/layout/admin-nav-bar";
import AdminAuthGate from "./_components/admin-auth-gate";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

const AdminLayout = ({ children, params }: GlobalNavBarLayoutProps) => {
  const { id: postId } = params;
  const isEditMode = !!postId;

  return (
    <>
      <Loading>
        <div className="w-screen overflow-x-hidden">
          <AdminAuthGate>
            <AdminNavBar isEditMode={isEditMode} />
            <div className="relative web:pt-[96px] pt-[56px] min-h-screen web:bg-background-alternative">
              {children}
            </div>
          </AdminAuthGate>
        </div>
      </Loading>
    </>
  );
};

export default AdminLayout;
