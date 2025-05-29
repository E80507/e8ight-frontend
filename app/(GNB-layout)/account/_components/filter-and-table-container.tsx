import { usePagination } from "@/hooks/use-pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AccountRes } from "@/app/api/dto/account";
import AccountSearchBox from "./account-search-box";
import { AccountTable } from "./account-table";

interface FilterAndTableContainerProps {
  data: AccountRes[];
}

const FilterAndTableContainer = ({ data }: FilterAndTableContainerProps) => {
  const prev = useSearchParams().get("prev");
  const [filteredData, setFilteredData] = useState(data);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: filteredData, itemsPerPage: 10 });

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage, filteredData]);

  return (
    <>
      <AccountSearchBox data={data} setFilteredData={setFilteredData} />
      <AccountTable
        data={currentData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalDataLength={data.length}
      />
    </>
  );
};
export default FilterAndTableContainer;
