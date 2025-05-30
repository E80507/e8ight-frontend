import ShortRow from "@/app/_components/table/short-row";
import { ReportRes } from "@/app/api/dto/report";
import { Textarea } from "@/components/ui/textarea";
import { handleReportReasonKRText } from "@/util/string";

interface ReportDetailInfoProps {
  data: ReportRes;
}

const ReportDetailInfo = ({ data }: ReportDetailInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">신고 등록 정보</p>
      <div>
        <ShortRow
          size="md"
          label="신고 유형"
          value={handleReportReasonKRText(data.reportReason)}
        />
        <ShortRow isLastRow size="md" label="신고 내용" value={""}>
          <div className="w-full py-4">
            <Textarea value={data.description} disabled />
          </div>
        </ShortRow>
      </div>
    </div>
  );
};
export default ReportDetailInfo;
