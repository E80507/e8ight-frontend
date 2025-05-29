import TableSummaryText from "@/app/_components/table/table-summary-text";
import { Button } from "@/components/ui/button";

interface PointChargeTableHeaderProps {
  currentDataLen: number; // 현재 페이지의 데이터 수
  totalDataLen: number; // 총 데이터 수
  type: "charge" | "use";
}
const PointTableHeader = ({
  currentDataLen,
  totalDataLen,
  type,
}: PointChargeTableHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <TableSummaryText
        currentDataLen={currentDataLen}
        totalDataLen={totalDataLen}
      />
      {type === "charge" ? (
        <Button className="mx-0" size={"sm"} variant={"outline"}>
          포인트 지급
        </Button>
      ) : (
        <Button className="mx-0" size={"sm"} variant={"outline"}>
          포인트 차감
        </Button>
      )}
    </div>
  );
};
export default PointTableHeader;
