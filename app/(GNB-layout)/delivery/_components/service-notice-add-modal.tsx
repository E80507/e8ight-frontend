import TwoButtonBar from "@/app/_components/button/two-button-bar";
import ShortRow from "@/app/_components/table/short-row";
import CustomInputField from "@/components/shared/form/custom-input-field";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";
import { Form } from "@/components/ui/form";
import { usePostServiceNotice } from "@/hooks/setting/use-post-service-notice";
import ImageUploader from "./image-uploader";
import { SETTING_PAGE } from "@/constants/path";

interface ServiceNoticeAddModalProps {
  setModal: (data: boolean) => void; // 모달 노출 상태 수정 함수
}

const ServiceNoticeAddModal = ({ setModal }: ServiceNoticeAddModalProps) => {
  const onSuccess = () => {
    window.location.href = SETTING_PAGE;
  };
  const { form, onSubmit } = usePostServiceNotice(onSuccess);
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/70 px-5 py-[51px]">
      <div className="size-full max-w-[1100px] overflow-y-auto rounded-[20px] bg-white p-10 hide-scroll-bar">
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex justify-between">
              <p className="heading-3">서비스 공지 등록</p>
              <TwoButtonBar
                size="md"
                firstBtnTxt="취소"
                secondBtnTxt="등록"
                secondBtnVariant="default"
                onClickFirstBtn={() => setModal(false)}
                onClickSecondBtn={onSubmit}
              />
            </div>
            <div>
              <ShortRow size="md" label="공지 제목" value={""}>
                <div className="w-full py-4">
                  <CustomInputField
                    form={form}
                    name="title"
                    placeholder="공지 제목을 입력하세요"
                  />
                </div>
              </ShortRow>
              <ShortRow size="md" label="공지 내용" value={""}>
                <div className="w-full py-4">
                  <CustomTextareaField
                    form={form}
                    name="content"
                    placeholder="공지 내용을 입력하세요"
                    textAreaClass="min-h-[200px]"
                  />
                </div>
              </ShortRow>
              <ShortRow isLastRow size="md" label="공지 이미지" value={""}>
                <div className="py-4">
                  <ImageUploader form={form} name="file" />
                </div>
              </ShortRow>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ServiceNoticeAddModal;
