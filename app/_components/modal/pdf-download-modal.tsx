import CustomCheckboxField from "@/components/shared/form/custom-checkbox-field";
import CustomEmailField from "@/components/shared/form/custom-email-field";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRef } from "react";
import { X } from "lucide-react";
import CustomFileUploadField from "@/components/shared/form/custom-file-upload-field";
import { usePostPdfDownload } from "@/hooks/pdf-download/use-post-pdf-download";

interface PdfDownloadModalProps {
  onClickClose: () => void;
}

const PdfDownloadModal = ({ onClickClose }: PdfDownloadModalProps) => {
  const { form, onSubmit } = usePostPdfDownload();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden bg-black/70 px-5 py-[20px] web:py-[51px]">
      <div className="w-full max-w-[1200px] overflow-hidden rounded-[20px] bg-white">
        <div className="relative">
          {/* 닫기 버튼 */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-50 size-8 rounded-full hover:bg-accent"
            onClick={onClickClose}
          >
            <X className="size-5" />
          </Button>

          <div className="max-h-[calc(100vh-40px)] overflow-y-auto web:max-h-[calc(100vh-102px)]">
            {/* 배너 */}
            <div
              className="relative h-[216px] overflow-hidden bg-cover bg-center px-[30px] py-[80px]"
              style={{ backgroundImage: `url("/images/bg-white.webp")` }}
            >
              <div className="absolute inset-0 z-0 bg-white opacity-[0.21]" />

              <div className="relative z-10 flex gap-[8px]">
                <div className="size-[16px] rounded-full bg-[#70D5B2]" />

                <div className="gibson-heading-2">
                  Global No.1
                  <br />
                  Digital Twin Platform
                </div>
              </div>
            </div>

            {/* 폼 영역 */}
            <div className="p-5 web:p-[40px]">
              <Form {...form}>
                <form
                  onSubmit={onSubmit}
                  ref={formRef}
                  className="flex flex-col gap-[32px]"
                >
                  {/* 파일 업로드 */}
                  <CustomFileUploadField label="다운로드 파일명" />

                  {/* 성함 */}
                  <CustomInputField
                    form={form}
                    name="name"
                    placeholder="성함을 입력해주세요."
                    label="성함"
                    isEssential={true}
                  />

                  {/* 직함 */}
                  <CustomInputField
                    form={form}
                    name="position"
                    placeholder="직함을 입력해주세요."
                    label="직함"
                    isEssential={true}
                  />

                  {/* 회사명/기관명 */}
                  <CustomInputField
                    form={form}
                    name="company"
                    placeholder="회사명 또는 기관명을 입력해주세요."
                    label="회사명/기관명"
                    isEssential={true}
                  />

                  {/* 부서/팀 */}
                  <CustomInputField
                    form={form}
                    name="department"
                    placeholder="부서 또는 팀명을 입력해주세요."
                    label="부서/팀"
                    isEssential={true}
                  />

                  {/* 연락처 */}
                  <CustomInputField
                    form={form}
                    name="phone"
                    placeholder="연락처를 입력해주세요."
                    label="연락처"
                    isEssential={true}
                  />

                  {/* 이메일 */}
                  <CustomEmailField
                    form={form}
                    name="email"
                    placeholder="이메일"
                    label="이메일"
                    isEssential={true}
                  />

                  {/* 개인정보 수집 동의 */}
                  <CustomCheckboxField
                    form={form}
                    name="agreeToPrivacyPolicy"
                    label={
                      <span className="pretendard-body-3">
                        <span className="font-bold text-primary">
                          [필수] 개인정보 수집 동의
                        </span>
                        <span>
                          : 개인정보 수집 및 이용약관을 확인하였으며, 이에
                          동의합니다.
                        </span>
                      </span>
                    }
                    isEssential={true}
                    type="square"
                  />

                  {/* 다운로드 버튼 */}
                  <Button type="submit" shape="round">
                    다운로드
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PdfDownloadModal;
