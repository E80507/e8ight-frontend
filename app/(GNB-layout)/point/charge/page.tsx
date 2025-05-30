"use client";
import PageCrumble from "@/app/_components/page-crumble";
import ChargeContainer from "./_components/charge-container";
import Loading from "@/components/shared/loading/loading";

const PointChargePage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{
          icon: "credit",
          type: "original",
          path: "결제 관리",
          detailPath: "포인트 충전 목록",
        }}
      />
      <Loading>
        <ChargeContainer />
      </Loading>
    </div>
  );
};
export default PointChargePage;
