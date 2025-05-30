"use client";

import DailyControllerAndFilterBoxContainer from "@/app/admin/table/_components/daily-controller-and-filter-box-container";
import Loading from "@/components/shared/loading/loading";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10 max-w-[1200px] mx-auto">
      <Loading>
        <DailyControllerAndFilterBoxContainer />
      </Loading>
    </div>
  );
};
export default AdminPage;
