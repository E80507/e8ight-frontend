"use client";
import PageCrumble from "@/app/_components/page-crumble";

import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import ChargeDetailContainer from "./_components/charge-detail-container";

const PointChargeDetailPage = () => {
  const id = usePathname().split("/")[3];
  const prev = useSearchParams().get("prev");

  if (!id || !prev) return null;
  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble props={{ type: "second", path: "포인트 충전 정보 상세" }} />
      <Loading>
        <ChargeDetailContainer id={id} prev={prev} />
      </Loading>
    </div>
  );
};
export default PointChargeDetailPage;
