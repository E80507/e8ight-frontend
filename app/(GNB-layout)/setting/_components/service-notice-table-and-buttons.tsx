import TableSummaryText from "@/app/_components/table/table-summary-text";
import { ServiceNoticeRes } from "@/app/api/dto/setting";
import { ServiceNoticeTable } from "./service-notice-table";
import Pagination from "@/app/_components/pagination";
import NoticeSettingButtonBox from "./notice-setting-button-box";
import { useState } from "react";

interface ServiceNoticeTableAndButtonsProps {
  data: ServiceNoticeRes[];
  totalData: ServiceNoticeRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function ServiceNoticeTableAndButtons({
  data,
  totalData,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: ServiceNoticeTableAndButtonsProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 id 배열
  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
        <NoticeSettingButtonBox
          totalData={totalData}
          selectedIds={selectedIds}
        />
      </div>
      <ServiceNoticeTable
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedIds={setSelectedIds}
        selectedIds={selectedIds}
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
export default ServiceNoticeTableAndButtons;
