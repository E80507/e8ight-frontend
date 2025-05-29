import { usePagination } from "@/hooks/use-pagination";
import Pagination from "@/app/_components/pagination";
import { PointUseTable } from "./point-use-table";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { useGetUserPointUseList } from "@/hooks/member/use-get-user-point-use-list";

interface PointUseBoxProps {
  id: string; // 회원 ID
}
const PointUseBox = ({ id }: PointUseBoxProps) => {
  const { data } = useGetUserPointUseList(id);
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
        <PointUseTable
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
export default PointUseBox;
