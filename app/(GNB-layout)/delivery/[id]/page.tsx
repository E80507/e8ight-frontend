"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import PageCrumble from "@/app/_components/page-crumble";
import DeliveryDetailContainer from "./_components/delivery-detail-container";

const DeliveryDetailPage = () => {
  const id = usePathname().split("/")[2];
  const prev = useSearchParams().get("prev");

  if (!id || !prev) return null;
  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble props={{ type: "second", path: "배송 정보 상세" }} />
      <Loading>
        <DeliveryDetailContainer id={id} prev={prev} />
      </Loading>
    </div>
  );
};
export default DeliveryDetailPage;
