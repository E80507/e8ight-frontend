import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceNoticeRes } from "@/app/api/dto/setting";
import ServiceNoticeTableAndButtons from "./service-notice-table-and-buttons";
import SettingFilterBox from "./setting-filter-box";
import { LoadIcon } from "@/components/shared/loading/loading";

interface FilterAndTableContainerProps {
  data: ServiceNoticeRes[];
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
      <SettingFilterBox
        setCurrentPage={setCurrentPage}
        setLoading={setLoading}
        data={data}
        setFilteredData={setFilteredData}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <ServiceNoticeTableAndButtons
          totalData={data}
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
