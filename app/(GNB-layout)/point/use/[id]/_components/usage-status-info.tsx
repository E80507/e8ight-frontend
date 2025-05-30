import formattedDate from "@/util/date";
import { handlePointChargeStatusText } from "@/util/string";
import ShortRow from "@/app/_components/table/short-row";
import { PointUsageRes } from "@/app/api/dto/point";

interface UsageStatusInfoProps {
  data: PointUsageRes;
}

const UsageStatusInfo = ({ data }: UsageStatusInfoProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">사용 상태 정보</p>
      <div className="w-full shrink-0">
        <ShortRow
          size="md"
          label="사용 상태"
          value={handlePointChargeStatusText(data.status, true)}
        />
        <ShortRow size="md" isLastRow label="처리 진행일" value={""}>
          <p className="flex items-center gap-2">
            <span>{formattedDate(data.transactionDate, "DEFAULT_FULL")}</span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.transactionDate)}
            </span>
          </p>
        </ShortRow>
      </div>
    </div>
  );
};
export default UsageStatusInfo;
