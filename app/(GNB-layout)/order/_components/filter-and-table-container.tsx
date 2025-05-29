import { useState } from "react";
import { OrderRes } from "@/app/api/dto/order";
import OrderTableContainer from "./order-table-container";
import OrderFilterSearchBox from "./order-filter-search-box";
import { usePagination } from "@/hooks/use-pagination";

interface FilterAndTableContainerProps {
  data: OrderRes[];
}

const FilterAndTableContainer = ({ data }: FilterAndTableContainerProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: filteredData, itemsPerPage: 10 });
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 아이디 배열

  return (
    <>
      <OrderFilterSearchBox
        setCurrentPage={setCurrentPage}
        data={data}
        setFilteredData={setFilteredData}
        setSelectedIds={setSelectedIds}
      />
      <OrderTableContainer
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
