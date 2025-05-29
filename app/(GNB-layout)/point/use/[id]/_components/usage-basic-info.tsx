import ShortRow from "@/app/_components/table/short-row";
import { PointUsageRes } from "@/app/api/dto/point";
import formattedDate from "@/util/date";
import { handlePointUsageTypeText } from "@/util/string";

interface UsageBasicInfoProps {
  data: PointUsageRes;
}

const UsageBasicInfo = ({ data }: UsageBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">사용 기본 정보</p>
      <div>
        <ShortRow
          size="md"
          label="포인트 사용 번호"
          value={data.transactionNo}
        />
        <ShortRow size="md" label="포인트 사용일" value={""}>
          <div className="flex gap-2">
            <span>{formattedDate(data.transactionDate, "DEFAULT_FULL")}</span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.transactionDate)}
            </span>
          </div>
        </ShortRow>
        <ShortRow
          size="md"
          label="사용 유형"
          value={handlePointUsageTypeText(data.transactionType)}
        />
        <ShortRow
          isLastRow
          size="md"
          label="사용한 회원 이메일"
          value={data.email}
        />
      </div>
    </div>
  );
};
export default UsageBasicInfo;
