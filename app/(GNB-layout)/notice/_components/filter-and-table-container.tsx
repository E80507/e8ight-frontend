import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NoticeRes } from "@/app/api/dto/notice";
import { NoticeTable } from "./notice-table";
import NoticeFilterSearchBox from "./notice-filter-search-box";
import { LoadIcon } from "@/components/shared/loading/loading";

interface FilterAndTableContainerProps {
  data: NoticeRes[];
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
      <NoticeFilterSearchBox
        setCurrentPage={setCurrentPage}
        setLoading={setLoading}
        data={data}
        setFilteredData={setFilteredData}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <NoticeTable
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
