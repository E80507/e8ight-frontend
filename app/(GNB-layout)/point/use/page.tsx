"use client";
import PageCrumble from "@/app/_components/page-crumble";
import UsageContainer from "./_components/usage-container";
import Loading from "@/components/shared/loading/loading";

const PointUsePage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{
          icon: "credit",
          type: "original",
          path: "결제 관리",
          detailPath: "포인트 사용 목록",
        }}
      />
      <Loading>
        <UsageContainer />
      </Loading>
    </div>
  );
};
export default PointUsePage;
