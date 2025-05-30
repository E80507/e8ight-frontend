"use client";
import PageCrumble from "@/app/_components/page-crumble";
import Loading from "@/components/shared/loading/loading";
import DeliveryContainer from "./_components/delivery-container";

const DeliveryPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble
        props={{
          icon: "delivery",
          type: "original",
          path: "주문 관리",
          detailPath: "배송 목록",
        }}
      />
      <Loading>
        <DeliveryContainer />
      </Loading>
    </div>
  );
};
export default DeliveryPage;
