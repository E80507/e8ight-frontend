import CustomCheckboxField from "@/components/shared/form/custom-checkbox-field";
import CustomEmailField from "@/components/shared/form/custom-email-field";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostContact } from "@/hooks/contact/use-post-contact";
import { useRef } from "react";
import { X } from "lucide-react";

interface PdfDownloadModalProps {
  onClickClose: () => void;
}

const PdfDownloadModal = ({ onClickClose }: PdfDownloadModalProps) => {
  const { form, onSubmit } = usePostContact();
  const formRef = useRef<HTMLFormElement>(null);

  // 폼 제출 이벤트 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form Submit Triggered');
    console.log('Current Form Values:', form.getValues());
    console.log('Form Validation State:', form.formState);
    await onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden bg-black/70 px-5 py-[20px] web:py-[51px]">
      <div className="w-full max-w-[1200px] overflow-hidden rounded-[20px] bg-white">
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-50 h-8 w-8 rounded-full hover:bg-accent"
            onClick={onClickClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="max-h-[calc(100vh-40px)] overflow-y-auto web:max-h-[calc(100vh-102px)]">
            {/* 배너 */}
            <div
              className="relative h-[216px] overflow-hidden bg-cover bg-center py-[80px] px-[30px]"
              style={{ backgroundImage: `url("/images/bg-contact.webp")` }}
            >
              <div className="absolute inset-0 z-0 bg-white opacity-[0.21]" />

              <div className="relative z-10 flex gap-[8px]">
                <div className="h-[16px] w-[16px] rounded-full bg-[#70D5B2]" />
                
                <div className="h1-l text-[32px]">Global No.1<br/>Digital Twin Platform</div>
              </div>
            </div>

            {/* 폼 영역 */}
            <div className="p-5 web:p-[40px]">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="flex flex-col gap-[32px]"
                >
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
                    label={<span><span className="text-primary font-bold">[필수] 개인정보 수집 동의</span>: 개인정보 수집 및 이용약관을 확인하였으며, 이에 동의합니다.</span>}
                    isEssential={true}
                  />

                  {/* 다운로드 버튼 */}
                  <Button type="submit" shape="round">다운로드</Button>
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
