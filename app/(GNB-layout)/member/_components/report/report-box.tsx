import { usePagination } from "@/hooks/use-pagination";
import Pagination from "@/app/_components/pagination";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { ReportTable } from "./report-table";
import { useGetUserReportList } from "@/hooks/member/use-get-user-report-list";

interface ReportBoxProps {
  id: string; // 회원 ID
  isArtist: boolean; // 작가 여부
}
const ReportBox = ({ id, isArtist }: ReportBoxProps) => {
  const { data } = useGetUserReportList(id, isArtist);
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
        <ReportTable
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
export default ReportBox;
