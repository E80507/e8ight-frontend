import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { PointChargePaginationRes } from "@/app/api/dto/point";
import { PointChargeTable } from "./point-charge-table";
import ChargeFilterSearchBox from "./charge-filter-search-box";
import { LoadIcon } from "@/components/shared/loading/loading";
import { useGetPointChargeSalesList } from "@/hooks/point/use-get-point-charge-sales-list";

interface FilterAndTableContainerProps {
  data: PointChargePaginationRes;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  setRechargeStatus: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<
    SetStateAction<{ start?: Date; end?: Date } | undefined>
  >;
}

const FilterAndTableContainer = ({
  data,
  keyword,
  setKeyword,
  setRechargeStatus,
  setDuration,
}: FilterAndTableContainerProps) => {
  const prev = useSearchParams().get("prev");
  const [totalChargeAmount, setTotalChargeAmount] = useState<null | number>(
    null,
  );
  const [filteredData, setFilteredData] = useState(data.items);
  const [currentPage, setCurrentPage] = useState(prev ? Number(prev) : 1);
  const [isLoading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState<
    { start?: Date; end?: Date } | undefined
  >(undefined);

  const { totalSales } = useGetPointChargeSalesList(
    selectedDuration?.start?.toISOString() || "",
    selectedDuration?.end?.toISOString() || "",
  );

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage, filteredData]);

  useEffect(() => {
    setFilteredData(data.items);
  }, [data]);

  // currentPage가 변경될 때만 URL 업데이트
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("prev", currentPage.toString());
    window.history.replaceState({}, "", url.toString());
  }, [currentPage]);

  // 필터링 된 데이터를 기반으로 합계 금액 업데이트
  // useEffect(() => {
  //   let totalAmount = 0;
  //   filteredData.forEach((item) => (totalAmount += item.amount));
  //   setTotalChargeAmount(totalAmount);
  // }, [filteredData]);

  useEffect(() => {
    if (totalSales > 0) {
      setTotalChargeAmount(totalSales);
    }
  }, [totalSales]);

  if (totalChargeAmount === null) return null;
  return (
    <>
      <ChargeFilterSearchBox
        data={filteredData}
        setCurrentPage={setCurrentPage}
        setLoading={setLoading}
        setFilteredData={setFilteredData}
        setKeyword={setKeyword}
        setRechargeStatus={setRechargeStatus}
        setDuration={(duration) => {
          setDuration(duration);
          setSelectedDuration(duration);
        }}
        keyword={keyword}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <PointChargeTable
          data={filteredData}
          totalChargeAmount={totalChargeAmount}
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
