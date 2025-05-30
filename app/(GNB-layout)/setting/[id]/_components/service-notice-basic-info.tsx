import ShortRow from "@/app/_components/table/short-row";
import { ServiceNoticeRes } from "@/app/api/dto/setting";
import formattedDate from "@/util/date";

interface ServiceNoticeBasicInfoProps {
  data: ServiceNoticeRes;
}

const ServiceNoticeBasicInfo = ({ data }: ServiceNoticeBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">서비스 공지 기본 정보</p>
      <div>
        <ShortRow
          size="md"
          label="서비스 공지 번호"
          value={data.announcementNo}
        />
        <ShortRow isLastRow size="md" label="서비스 공지 등록일" value={""}>
          <div className="flex gap-2">
            <span>{formattedDate(data.createdAt, "DEFAULT_FULL")}</span>
            <span className="text-[#2A67FF]">
              {formattedDate(data.createdAt)}
            </span>
          </div>
        </ShortRow>
      </div>
    </div>
  );
};
export default ServiceNoticeBasicInfo;
