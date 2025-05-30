import { PatchUserInfoReq, UserDetailRes } from "@/app/api/dto/member";
import formattedDate from "@/util/date";
import { handleStatusKRText } from "@/util/member";
import FilterName from "@/app/_components/table/filter-name";
import ShortRow from "@/app/_components/table/short-row";
import { UseFormReturn } from "react-hook-form";
import CustomRadioField from "@/components/shared/form/custom-radio-field";

interface UserDetailInfoProps {
  data: UserDetailRes;
  form: UseFormReturn<PatchUserInfoReq>;
}
const UserDetailInfo = ({ data, form }: UserDetailInfoProps) => {
  // 상태 처리 진행일 텍스트
  const statusUpdatedAt = data.statusUpdatedAt
    ? `${formattedDate(data.statusUpdatedAt, "INPUT_DATE")} / ${formattedDate(data.statusUpdatedAt)}`
    : "-";
  return (
    <div className="flex flex-col gap-2">
      <p className="heading-5">회원 상태 정보</p>
      <div className="w-full max-w-[385px]">
        <ShortRow
          label="계정 상태"
          value={handleStatusKRText(data.userStatus, true)}
        />
        <div className={`flex border-x border-t`}>
          <FilterName size="sm" name={"처리 상태"} />
          <div className="flex items-center px-5 text-black">
            <CustomRadioField
              defaultValue={String(data.isBlocked)}
              form={form}
              name="isBlocked"
              radioValue={[
                {
                  value: "false",
                  text: "정상",
                },
                {
                  value: "true",
                  text: "차단",
                },
              ]}
              direction="horizontal"
            />
          </div>
        </div>
        <ShortRow isLastRow label="처리 진행일" value={statusUpdatedAt} />
      </div>
    </div>
  );
};
export default UserDetailInfo;
