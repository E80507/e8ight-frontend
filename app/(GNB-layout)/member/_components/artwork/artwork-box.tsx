import { usePagination } from "@/hooks/use-pagination";
import Pagination from "@/app/_components/pagination";
import { ArtworkTable } from "./artwork-table";
import { useGetUserArtworkList } from "@/hooks/member/artwork/use-get-user-artwork";
import TableSummaryText from "@/app/_components/table/table-summary-text";

interface ArtworkBoxProps {
  id: string; // 회원 ID
}
const ArtworkBox = ({ id }: ArtworkBoxProps) => {
  const { data } = useGetUserArtworkList(id);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: data, itemsPerPage: 3 });

  if (!data) return;
  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        currentDataLen={currentData.length}
        totalDataLen={data.length}
      />
      <ArtworkTable
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
export default ArtworkBox;
