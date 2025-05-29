import { ArtworkDetailRes } from "@/app/api/dto/artwork";
import formattedDate from "@/util/date";
import { handleArtworkStatusKRText } from "@/util/string";
import FilterName from "@/app/_components/table/filter-name";
import ShortRow from "@/app/_components/table/short-row";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { artworkPatchSchema } from "@/schema/artwork";

interface ArtworkStatusInfoProps {
  data: ArtworkDetailRes;
  form: UseFormReturn<z.infer<typeof artworkPatchSchema>>;
}

const ArtworkStatusInfo = ({ data, form }: ArtworkStatusInfoProps) => {
  // 상태 처리 진행일 텍스트
  const statusUpdatedAt = data.statusUpdatedAt
    ? `${formattedDate(data.statusUpdatedAt, "INPUT_DATE")} / ${formattedDate(data.statusUpdatedAt)}`
    : "-";
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="heading-4">작품 상태 정보</p>
      <div className="w-full shrink-0">
        <ShortRow size="md" label="작품 상태" value={""}>
          <div className="flex items-center gap-3">
            <p>{handleArtworkStatusKRText(data.status)}</p>
            {data.deletedAt && (
              <p className="flex items-center gap-3">
                <span>
                  {`(${formattedDate(data.deletedAt, "SHORTENED_YEAR_DEFAULT_FULL")}`}
                </span>
                <span>{`${formattedDate(data.deletedAt)})`}</span>
              </p>
            )}
          </div>
        </ShortRow>
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
export default ArtworkStatusInfo;
