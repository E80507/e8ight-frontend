import Pagination from "@/app/_components/pagination";
import { AdminTable } from "./admin-table";
import TableSummaryBox from "./table-summary-box";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AdminRes } from "@/app/api/dto/admin";

interface TableContainerProps {
  totalData: AdminRes[];
  currentData: AdminRes[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const TableContainer = ({
  totalData,
  currentData,
  currentPage,
  setCurrentPage,
  totalPages,
  selectedIds,
  setSelectedIds,
}: TableContainerProps) => {
  const prev = useSearchParams().get("prev");

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage]);

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryBox
        currentDataLen={currentData.length}
        totalData={totalData}
      />

      <AdminTable
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        data={currentData}
        // currentPage={currentPage}
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
export default TableContainer;
