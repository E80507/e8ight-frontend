import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReportRes } from "@/app/api/dto/report";
import ReportFilterSearchBox from "./report-filter-search-box";
import { ReportTable } from "./report-table";
import { LoadIcon } from "@/components/shared/loading/loading";

interface FilterAndTableContainerProps {
  data: ReportRes[];
}

const FilterAndTableContainer = ({ data }: FilterAndTableContainerProps) => {
  const prev = useSearchParams().get("prev");
  const [filteredData, setFilteredData] = useState(data);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: filteredData, itemsPerPage: 10 });
  const [isLoading, setLoading] = useState(true); // 기간 필터링이 적용되었는지에 따라 변경되는 로딩 상태

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage, filteredData]);

  return (
    <>
      <ReportFilterSearchBox
        setCurrentPage={setCurrentPage}
        setLoading={setLoading}
        data={data}
        setFilteredData={setFilteredData}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <ReportTable
          data={currentData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalDataLength={filteredData.length}
        />
      )}
    </>
  );
};
export default FilterAndTableContainer;
