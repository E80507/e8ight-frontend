"use client";

import CustomCheckboxField from "@/components/shared/form/custom-checkbox-field";
import CustomEmailField from "@/components/shared/form/custom-email-field";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { usePostPdfDownload } from "@/hooks/pdf-download/use-post-pdf-download";
import CustomFileUploadField from "@/components/shared/form/custom-file-upload-field";
import { usePostDetail } from "@/hooks/post/use-post-detail";
import { useDownloadFiles } from "@/hooks/s3/use-download-files";
import {
  AMPLITUDE_EVENT_DISPLAY_NAME,
  AMPLITUDE_EVENT_LOG_NAME,
} from "@/constants/amplitude";
import useTrackEvent from "@/hooks/amplitude/use-track-event";

interface PdfDownloadModalProps {
  postId: string;
  onClickClose: () => void;
}

const PdfDownloadModal = ({ postId, onClickClose }: PdfDownloadModalProps) => {
  const { form, onSubmit } = usePostPdfDownload();
  const formRef = useRef<HTMLFormElement>(null);
  const { post } = usePostDetail(postId);
  const { downloadFiles } = useDownloadFiles();

  const { handleTrackEvent } = useTrackEvent();

  // 파일명을 폼에 설정
  useEffect(() => {
    if (post?.files) {
      const fileNames = post.files.map((file) => file.fileName);
      form.setValue("fileNames", fileNames);
    }
  }, [post?.files, form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 폼 유효성 검사
    const isValid = await form.trigger();
    if (!isValid) return;

    // 앰플리튜드 이벤트
    handleTrackEvent(
      AMPLITUDE_EVENT_LOG_NAME.CTA_BUTTON_CLICK,
      AMPLITUDE_EVENT_DISPLAY_NAME.CTA_BUTTON_CLICK,
      { button_name: "PDF 다운로드" },
    );

    // 파일 URL 추출
    const fileUrls = post?.files?.map((file) => file.fileUrl) || [];
    if (fileUrls.length === 0) {
      alert("다운로드할 파일이 없습니다.");
      return;
    }

    // 파일 다운로드 실행
    const success = await downloadFiles(fileUrls);
    if (success) {
      alert("파일 다운로드가 완료되었습니다.");
      onClickClose();
    } else {
      alert("파일 다운로드 중 오류가 발생했습니다.");
    }

    // 폼 데이터 제출
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black/70 p-[16px] web:py-[51px]">
      <div className="w-full max-w-[1200px] overflow-hidden rounded-[20px] bg-white">
        <div className="relative">
          {/* 닫기 버튼 */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-50 border-none bg-transparent"
            onClick={onClickClose}
          >
            <X className="size-[24px] text-[#A7A9B4]" />
          </Button>

          <div className="max-h-[calc(100vh-40px)] overflow-y-auto web:max-h-[calc(100vh-102px)]">
            {/* 배너 */}
            <div
              className="relative flex h-[204px] flex-col overflow-hidden bg-cover bg-center px-[16px] py-[24px] tablet:h-auto tablet:px-[40px] tablet:pb-[40px] tablet:pt-[80px]"
              style={{ backgroundImage: `url("/images/bg-contact.webp")` }}
            >
              <div className="mt-auto pretendard-h1-m tablet:gibson-h1-m">
                Global No.1
                <br />
                Digital Twin Platform
              </div>
            </div>

            {/* 폼 영역 */}
            <div className="px-[16px] py-[40px] tablet:p-5 web:p-[40px]">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="flex flex-col gap-[32px]"
                >
                  {/* 파일 업로드 */}
                  <CustomFileUploadField
                    label="다운로드 파일명"
                    files={post?.files}
                  />

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
                    type="tel"
                    maxLength={13}
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
                      <span className="pb-[0.1562rem] pretendard-body-3">
                        <span className="text-primary pretendard-title-s">
                          [필수] 개인정보 수집 동의
                        </span>
                        : 개인정보 수집 및 이용약관을 확인하였으며, 이에
                        동의합니다.
                      </span>
                    }
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
