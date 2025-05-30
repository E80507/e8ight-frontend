import { useGetPointChargeList } from "@/hooks/point/use-get-point-charge-list";
import FilterAndTableContainer from "./filter-and-table-container";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  PointChargePaginationRes,
  PointChargeStatus,
} from "@/app/api/dto/point";
const ChargeContainer = () => {
  const prev = useSearchParams().get("prev");
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [keyword, setKeyword] = useState("");
  const [rechargeStatus, setRechargeStatus] = useState("");
  const [duration, setDuration] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined);
  const [filteredData, setFilteredData] =
    useState<PointChargePaginationRes | null>(null);
  const { data } = useGetPointChargeList({
    page: currentPage,
    limit: 10,
    keyword,
    rechargeStatus: rechargeStatus as PointChargeStatus,
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
        setRechargeStatus={setRechargeStatus}
        setDuration={setDuration}
      />
    </div>
  );
};

export default ChargeContainer;
