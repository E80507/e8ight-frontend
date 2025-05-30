import TableSummaryText from "@/app/_components/table/table-summary-text";
import { AdminRes } from "@/app/api/dto/admin";
import { Button } from "@/components/ui/button";

interface TableSummaryBoxProps {
  currentDataLen: number;
  totalData: AdminRes[];
}

const TableSummaryBox = ({
  currentDataLen,
  totalData,
}: TableSummaryBoxProps) => {
  return (
    <div className="flex items-center justify-between">
      <TableSummaryText
        currentDataLen={currentDataLen}
        totalDataLen={totalData.length}
        showCurrentDataLen={false}
      />

      <div className="flex items-center gap-[8px]">
        <Button variant={"outline"} size={"lg"} className="w-[97px]">
          삭제하기
        </Button>

        <Button size={"lg"} className="w-[97px]">
          추가하기
        </Button>
      </div>
    </div>
  );
};
export default TableSummaryBox;
