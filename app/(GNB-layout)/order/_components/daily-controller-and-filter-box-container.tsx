import { useGetOrderList } from "@/hooks/order/use-get-order-list";
import { useState } from "react";
import DayController from "./daily-controller";
import Loading from "@/components/shared/loading/loading";
import FilterAndTableContainer from "./filter-and-table-container";

const DailyControllerAndFilterBoxContainer = () => {
  const [date, setDate] = useState(new Date());
  const { data } = useGetOrderList(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  if (!data) return null;
  return (
    <div className="flex flex-col gap-10">
      <DayController date={date} setDate={setDate} />
      <Loading>
        <FilterAndTableContainer data={data} />
      </Loading>
    </div>
  );
};
export default DailyControllerAndFilterBoxContainer;
