import { useGetPointUsageList } from "@/hooks/point/use-get-point-usage-list";
import FilterAndTableContainer from "./filter-and-table-container";
import { useSearchParams } from "next/navigation";
import {
  PointUsagePaginationRes,
  PointUsageTransactionType,
  PointChargeStatus,
} from "@/app/api/dto/point";
import { useState, useEffect } from "react";
const UsageContainer = () => {
  const prev = useSearchParams().get("prev");
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [keyword, setKeyword] = useState("");
  const [purpose, setPurpose] = useState("");
  const [usageStatus, setUsageStatus] = useState("");
  const [duration, setDuration] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined);
  const [filteredData, setFilteredData] =
    useState<PointUsagePaginationRes | null>(null);
  const { data } = useGetPointUsageList({
    page: currentPage,
    limit: 10,
    keyword,
    purpose: purpose as PointUsageTransactionType,
    usageStatus: usageStatus as PointChargeStatus,
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
        setPurpose={setPurpose}
        setUsageStatus={setUsageStatus}
        setDuration={setDuration}
      />
    </div>
  );
};
export default UsageContainer;
