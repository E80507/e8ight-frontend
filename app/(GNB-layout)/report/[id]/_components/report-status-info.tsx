import formattedDate from "@/util/date";
import FilterName from "@/app/_components/table/filter-name";
import ShortRow from "@/app/_components/table/short-row";
import { ReportRes, ReportResolution } from "@/app/api/dto/report";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { reportPatchSchema } from "@/schema/report";

interface ReportStatusInfoProps {
  data: ReportRes;
  form: UseFormReturn<z.infer<typeof reportPatchSchema>>;
}

const ReportStatusInfo = ({ data, form }: ReportStatusInfoProps) => {
  // 상태 처리 진행일 텍스트
  const statusUpdatedAt = data.resolvedAt
    ? `${formattedDate(data.resolvedAt, "INPUT_DATE")} / ${formattedDate(data.resolvedAt)}`
    : "-";
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">신고 상태 정보</p>
      <div className="w-full shrink-0">
        <ShortRow
          size="md"
          label="신고 상태"
          value={data.isResolved ? "처리" : "접수"}
        />
        <div className={`flex border-x border-t`}>
          <FilterName size="md" name={"처리 상태"} />
          <div className="flex items-center px-5 text-black">
            <CustomRadioField
              defaultValue={data.resolution}
              form={form}
              name="resolution"
              radioValue={[
                {
                  value: ReportResolution.HIDE,
                  text: "비공개",
                },
                {
                  value: ReportResolution.NOT_APPLICABLE,
                  text: "해당없음",
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
export default ReportStatusInfo;
