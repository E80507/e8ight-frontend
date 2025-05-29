import { usePagination } from "@/hooks/use-pagination";
import { ProfitTable } from "./profit-table";
import Pagination from "@/app/_components/pagination";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { useGetArtistProfitList } from "@/hooks/member/profit/use-get-artist-profit";

interface ProfitBoxProps {
  id: string;
}
const ProfitBox = ({ id }: ProfitBoxProps) => {
  const { data } = useGetArtistProfitList(id);
  const { currentData, currentPage, setCurrentPage, totalPages } =
    usePagination({ data: data, itemsPerPage: 8 });

  if (!data) return;
  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        currentDataLen={data.length}
        totalDataLen={data.length}
      />
      <ProfitTable
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
export default ProfitBox;
