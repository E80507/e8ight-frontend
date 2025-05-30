import { UseFormReturn } from "react-hook-form";
import { PatchUserInfoReq } from "@/app/api/dto/member";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";

interface MemoBoxProps {
  form: UseFormReturn<PatchUserInfoReq>;
}
const MemoBox = ({ form }: MemoBoxProps) => {
  return (
    <>
      <div className="px-px pb-px">
        <CustomTextareaField
          textAreaClass="min-h-[550px]"
          form={form}
          name="memo"
          placeholder="회원 및 배송에 대한 메모를 작성해주세요"
        />
      </div>
    </>
  );
};
export default MemoBox;
