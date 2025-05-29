import { usePagination } from "@/hooks/use-pagination";
import { NoticeTable } from "./notice-table";
import Pagination from "@/app/_components/pagination";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { useGetArtistNotice } from "@/hooks/member/notice/use-get-artist-notice";

interface NoticeBoxProps {
  artistId: string; // 작가 ID
}
const NoticeBox = ({ artistId }: NoticeBoxProps) => {
  const { data } = useGetArtistNotice(artistId);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: data, itemsPerPage: 8 });

  if (!data) return;
  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        currentDataLen={data.length}
        totalDataLen={data.length}
      />
      <NoticeTable
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
    </div>
  );
};
export default NoticeBox;
