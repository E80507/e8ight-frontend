import { Textarea } from "@/components/ui/textarea";
import ShortRow from "@/app/_components/table/short-row";
import { NoticeDetailRes } from "@/app/api/dto/notice";

interface NoticeDetailInfoProps {
  data: NoticeDetailRes;
}

const NoticeDetailInfo = ({ data }: NoticeDetailInfoProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">공지 등록 정보</p>
      <ShortRow isLastRow size="md" label="공지 내용" value={""}>
        <div className="w-full py-4">
          <Textarea className="min-h-[150px]" value={data.content} disabled />
        </div>
      </ShortRow>
    </div>
  );
};
export default NoticeDetailInfo;
