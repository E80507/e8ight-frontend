import TableSummaryText from "@/app/_components/table/table-summary-text";
import Pagination from "@/app/_components/pagination";
import { Dispatch, SetStateAction } from "react";
import { DeliveryTable } from "./delivery-table";
import DeliverySettingButtonBox from "./delivery-setting-button-box";
import { DeliveryRes } from "@/app/api/dto/delivery";

interface DeliveryTableAndButtonsProps {
  data: DeliveryRes[];
  totalData: DeliveryRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
  selectedIds: string[]; // 선택된 아이디 배열
  setSelectedIds: Dispatch<SetStateAction<string[]>>; // 선택된 아이디 배열 상태 변경 함수
}

export function DeliveryTableAndButtons({
  data,
  totalData,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  selectedIds,
  setSelectedIds,
}: DeliveryTableAndButtonsProps) {
  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
        <DeliverySettingButtonBox
          totalData={totalData}
          selectedIds={selectedIds}
        />
      </div>
      <DeliveryTable
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedIds={setSelectedIds}
        selectedIds={selectedIds}
        totalDataLength={totalDataLength}
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
}
export default DeliveryTableAndButtons;
