"use client";
import DailyControllerAndFilterBoxContainer from "./_components/daily-controller-and-filter-box-container";
import Loading from "@/components/shared/loading/loading";

const OrderPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <Loading>
        <DailyControllerAndFilterBoxContainer />
      </Loading>
    </div>
  );
};
export default OrderPage;
