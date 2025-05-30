import { usePagination } from "@/hooks/use-pagination";
import Pagination from "@/app/_components/pagination";
import { PointChargeTable } from "./point-charge-table";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { useGetUserPointChargeList } from "@/hooks/member/use-get-user-point-charge-list";

interface PointChargeBoxProps {
  id: string; // 회원 ID
}
const PointChargeBox = ({ id }: PointChargeBoxProps) => {
  const { data } = useGetUserPointChargeList(id);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: data, itemsPerPage: 8 });

  if (!data) return;
  return (
    <div className="flex flex-col gap-3 overflow-x-auto">
      <TableSummaryText
        currentDataLen={currentData.length}
        totalDataLen={data.length}
      />
      <>
        <PointChargeTable
          data={currentData}
          currentPage={currentPage}
          totalDataLength={data.length}
        />
        {data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </>
    </div>
  );
};
export default PointChargeBox;
