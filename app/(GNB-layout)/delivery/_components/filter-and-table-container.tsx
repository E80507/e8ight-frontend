import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { DeliveryPaginationRes } from "@/app/api/dto/delivery";
import DeliveryFilterBox from "./delivery-filter-box";
import DeliveryTableAndButtons from "./delivery-table-and-buttons";
import { LoadIcon } from "@/components/shared/loading/loading";

interface FilterAndTableContainerProps {
  data: DeliveryPaginationRes;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setDeliveryStatus: Dispatch<SetStateAction<string>>;
  setPrintStatus: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
}

const FilterAndTableContainer = ({
  data,
  keyword,
  setKeyword,
  setDeliveryStatus,
  setPrintStatus,
  setDuration,
}: FilterAndTableContainerProps) => {
  const prev = useSearchParams().get("prev"); // 이전 페이지 정보
  const [filteredData, setFilteredData] = useState(data.items);
  const [isLoading, setLoading] = useState(true); // 기간 필터링이 적용되었는지에 따라 변경되는 로딩 상태
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 id 배열
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  // prev(이전 페이지 정보)가 있을 경우 해당 페이지로 이동
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
      <DeliveryFilterBox
        setSelectedIds={setSelectedIds}
        setCurrentPage={setCurrentPage}
        setLoading={setLoading}
        data={filteredData}
        setFilteredData={setFilteredData}
        setKeyword={setKeyword}
        setDeliveryStatus={setDeliveryStatus}
        setPrintStatus={setPrintStatus}
        setDuration={setDuration}
        keyword={keyword}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <DeliveryTableAndButtons
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
          totalData={filteredData}
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
