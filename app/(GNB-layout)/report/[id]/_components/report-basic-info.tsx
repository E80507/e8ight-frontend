import ShortRow from "@/app/_components/table/short-row";
import { ReportRes, ReportTarget } from "@/app/api/dto/report";
import formattedDate from "@/util/date";

interface ReportBasicInfoProps {
  data: ReportRes;
}

const ReportBasicInfo = ({ data }: ReportBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">신고 기본 정보</p>
      <div>
        <ShortRow size="md" label="신고 번호" value={data.reportNo} />
        <ShortRow size="md" label="신고 등록일" value={""}>
          <div className="flex gap-2">
            <span>{formattedDate(data.createdAt, "DEFAULT_FULL")}</span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.createdAt)}
            </span>
          </div>
        </ShortRow>
        <ShortRow size="md" label="신고한 회원 이메일" value={data.userEmail} />
        <ShortRow
          size="md"
          label="신고 대상"
          value={data.target === ReportTarget.ARTIST ? "작가" : "게시글"}
        />
        <ShortRow size="md" label="신고된 작가 ID" value={data.artistId} />
        <ShortRow
          isLastRow
          size="md"
          label="신고된 피드 번호"
          value={data.targetNo ?? "-"}
        />
      </div>
    </div>
  );
};
export default ReportBasicInfo;
