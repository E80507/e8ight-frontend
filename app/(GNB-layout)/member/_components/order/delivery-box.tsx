import { usePagination } from "@/hooks/use-pagination";
import Pagination from "@/app/_components/pagination";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { DeliveryTable } from "./delivery-table";
import { useGetUserDeliveryList } from "@/hooks/member/use-get-user-delivery-list";

interface DeliveryBoxProps {
  id: string; // 회원 ID
}
const DeliveryBox = ({ id }: DeliveryBoxProps) => {
  const { data } = useGetUserDeliveryList(id);
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
        <DeliveryTable
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
export default DeliveryBox;
