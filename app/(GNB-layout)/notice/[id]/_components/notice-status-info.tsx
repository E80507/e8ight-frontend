import formattedDate from "@/util/date";
import { handleNoticeExposureStatusKRText } from "@/util/string";
import FilterName from "@/app/_components/table/filter-name";
import ShortRow from "@/app/_components/table/short-row";
import { NoticeDetailRes } from "@/app/api/dto/notice";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import { UseFormReturn } from "react-hook-form";
import { artworkPatchSchema } from "@/schema/artwork";
import { z } from "zod";

interface NoticeStatusInfoProps {
  data: NoticeDetailRes;
  form: UseFormReturn<z.infer<typeof artworkPatchSchema>>;
}

const NoticeStatusInfo = ({ data, form }: NoticeStatusInfoProps) => {
  // 상태 처리 진행일 텍스트
  const statusUpdatedAt = data.isBlocked
    ? `${formattedDate(data.blockedAt, "INPUT_DATE")} / ${formattedDate(data.blockedAt)}`
    : "-";

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">공지 상태 정보</p>
      <div className="w-full shrink-0">
        <ShortRow
          size="md"
          label="공지 상태"
          value={handleNoticeExposureStatusKRText(data.status)}
        />
        <div className={`flex border-x border-t`}>
          <FilterName size="md" name={"처리 상태"} />
          <div className="flex items-center px-5 text-black">
            <CustomRadioField
              defaultValue={String(data.isBlocked)}
              form={form}
              name="isBlocked"
              radioValue={[
                {
                  value: "false",
                  text: "공개",
                },
                {
                  value: "true",
                  text: "비공개",
                },
              ]}
              direction="horizontal"
            />
          </div>
        </div>
        <ShortRow
          size="md"
          isLastRow
          label="처리 진행일"
          value={statusUpdatedAt}
        />
      </div>
    </div>
  );
};
export default NoticeStatusInfo;
