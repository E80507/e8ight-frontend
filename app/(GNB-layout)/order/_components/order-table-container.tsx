import Pagination from "@/app/_components/pagination";
import { OrderTable } from "./order-table";
import OrderTableSummaryBox from "./order-table-summary-box";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { OrderRes } from "@/app/api/dto/order";

interface OrderTableContainerProps {
  totalData: OrderRes[];
  currentData: OrderRes[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const OrderTableContainer = ({
  totalData,
  currentData,
  currentPage,
  setCurrentPage,
  totalPages,
  selectedIds,
  setSelectedIds,
}: OrderTableContainerProps) => {
  const prev = useSearchParams().get("prev");

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage]);
  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <OrderTableSummaryBox
        selectedIds={selectedIds}
        currentDataLen={currentData.length}
        totalData={totalData}
      />
      <OrderTable
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        data={currentData}
        currentPage={currentPage}
        totalData={totalData}
        totalDataLength={totalData.length}
      />
      {totalData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
export default OrderTableContainer;
