import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { PointUsagePaginationRes } from "@/app/api/dto/point";
import UsageFilterSearchBox from "./usage-filter-search-box";
import { PointUsageTable } from "./point-usage-table";
import { LoadIcon } from "@/components/shared/loading/loading";

interface FilterAndTableContainerProps {
  data: PointUsagePaginationRes;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setPurpose: Dispatch<SetStateAction<string>>;
  setUsageStatus: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
}

const FilterAndTableContainer = ({
  data,
  keyword,
  setKeyword,
  setPurpose,
  setUsageStatus,
  setDuration,
}: FilterAndTableContainerProps) => {
  const prev = useSearchParams().get("prev");
  const [filteredData, setFilteredData] = useState(data.items);
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [isLoading, setLoading] = useState(true); // 기간 필터링이 적용되었는지에 따라 변경되는 로딩 상태

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage, filteredData]);

  useEffect(() => {
    setFilteredData(data.items);
  }, [data]);

  return (
    <>
      <UsageFilterSearchBox
        data={filteredData}
        setCurrentPage={setCurrentPage}
        setLoading={setLoading}
        setFilteredData={setFilteredData}
        setKeyword={setKeyword}
        setPurpose={setPurpose}
        setUsageStatus={setUsageStatus}
        setDuration={setDuration}
        keyword={keyword}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <PointUsageTable
          data={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data.totalPages}
          totalDataLength={data.total}
        />
      )}
    </>
  );
};
export default FilterAndTableContainer;
