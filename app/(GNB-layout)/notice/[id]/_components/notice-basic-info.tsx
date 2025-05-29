import ShortRow from "@/app/_components/table/short-row";
import { NoticeDetailRes } from "@/app/api/dto/notice";
import formattedDate from "@/util/date";
import { handleCommaPrice } from "@/util/price";

interface NoticeBasicInfoProps {
  data: NoticeDetailRes;
}

const NoticeBasicInfo = ({ data }: NoticeBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">공지 기본 정보</p>
      <div>
        <ShortRow size="md" label="공지 번호" value={data.noticeNo} />
        <ShortRow size="md" label="공지 등록일" value={""}>
          <div className="flex gap-2">
            <span>{formattedDate(data.createdAt, "DEFAULT_FULL")}</span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.createdAt)}
            </span>
          </div>
        </ShortRow>
        <ShortRow size="md" label="작가 ID" value={data.artistId} />
        <ShortRow size="md" label="작가 닉네임" value={data.nickname} />
        <ShortRow
          size="md"
          label="좋아요"
          value={handleCommaPrice(data.likeCount, "개")}
        />
        <ShortRow
          isLastRow
          size="md"
          label="누적 신고횟수"
          value={handleCommaPrice(data.reportCount, "회")}
        />
      </div>
    </div>
  );
};
export default NoticeBasicInfo;
