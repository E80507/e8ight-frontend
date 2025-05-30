import ShortRow from "@/app/_components/table/short-row";
import { ServiceNoticePatchReq, ServiceNoticeRes } from "@/app/api/dto/setting";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { UseFormReturn } from "react-hook-form";
import ImageUploader from "../../_components/image-uploader";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";

interface ServiceNoticeDetailInfoProps {
  form: UseFormReturn<ServiceNoticePatchReq>;
  data: ServiceNoticeRes;
}

const ServiceNoticeDetailInfo = ({
  form,
  data,
}: ServiceNoticeDetailInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="heading-4">서비스 공지 등록 정보</p>
      <div>
        <ShortRow size="md" label="공지 제목" value={""}>
          <div className="w-full py-4">
            <CustomInputField
              form={form}
              name="title"
              placeholder="공지 제목을 입력해주세요"
            />
          </div>
        </ShortRow>
        <ShortRow size="md" label="공지 내용" value={""}>
          <div className="w-full py-4">
            <CustomTextareaField
              textAreaClass="min-h-[230px]"
              form={form}
              name="content"
              placeholder="공지 내용을 입력해주세요"
            />
          </div>
        </ShortRow>
        <ShortRow size="md" label="공지 링크" value={""}>
          <div className="w-full py-4">
            <CustomInputField
              form={form}
              name="link"
              placeholder="공지 링크를 입력해주세요"
            />
          </div>
        </ShortRow>
        <ShortRow isLastRow size="md" label="공지 이미지" value={""}>
          <div className="py-4">
            <ImageUploader savedFile={data.file} form={form} name="file" />
          </div>
        </ShortRow>
      </div>
    </div>
  );
};
export default ServiceNoticeDetailInfo;
