import { useState } from "react";
import { AdminRes } from "@/app/api/dto/admin";
import TableContainer from "./table-container";
import FilterSearchBox from "./filter-search-box";
import { usePagination } from "@/hooks/use-pagination";

interface FilterAndTableContainerProps {
  data: AdminRes[];
}

const FilterAndTableContainer = ({ data }: FilterAndTableContainerProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: filteredData, itemsPerPage: 10 });
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 아이디 배열

  return (
    <>
      <FilterSearchBox
        setCurrentPage={setCurrentPage}
        data={data}
        setFilteredData={setFilteredData}
        setSelectedIds={setSelectedIds}
      />

      <TableContainer
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        totalData={filteredData}
        currentData={currentData}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default FilterAndTableContainer;
