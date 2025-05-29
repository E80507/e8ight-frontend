import { useGetDeliveryList } from "@/hooks/delivery/use-get-delivery-list";
import FilterAndTableContainer from "./filter-and-table-container";
import {
  DeliveryStatus,
  PrintStatus,
  DeliveryPaginationRes,
} from "@/app/api/dto/delivery";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
const DeliveryContainer = () => {
  const prev = useSearchParams().get("prev");
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [keyword, setKeyword] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [printStatus, setPrintStatus] = useState("");
  const [duration, setDuration] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined);
  const [filteredData, setFilteredData] =
    useState<DeliveryPaginationRes | null>(null);
  const { data } = useGetDeliveryList({
    page: currentPage,
    limit: 10,
    keyword,
    deliveryStatus: deliveryStatus as DeliveryStatus,
    printStatus: printStatus as PrintStatus,
    startDate: duration?.start
      ? duration.start.toISOString().split("T")[0]
      : undefined,
    endDate: duration?.end
      ? duration.end.toISOString().split("T")[0]
      : undefined,
  });
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage]);

  if (!filteredData) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer
        data={filteredData}
        keyword={keyword}
        setKeyword={setKeyword}
        setDeliveryStatus={setDeliveryStatus}
        setPrintStatus={setPrintStatus}
        setDuration={setDuration}
      />
    </div>
  );
};
export default DeliveryContainer;
