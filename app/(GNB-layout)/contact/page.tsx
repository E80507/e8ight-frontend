"use client";

import { useRef, useState } from "react";
import { Form } from "@/components/ui/form";
import { usePostContact } from "@/hooks/contact/use-post-contact";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import CustomEmailField from "@/components/shared/form/custom-email-field";
import CustomCheckboxField from "@/components/shared/form/custom-checkbox-field";
import CustomCheckboxGroupField from "@/components/shared/form/custom-checkbox-group-field";
import {
  AMPLITUDE_EVENT_DISPLAY_NAME,
  AMPLITUDE_EVENT_LOG_NAME,
} from "@/constants/amplitude";
import useTrackEvent from "@/hooks/amplitude/use-track-event";

const ContactPage = () => {
  const { form, onSubmit } = usePostContact();
  const formRef = useRef<HTMLFormElement>(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const { handleTrackEvent } = useTrackEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    onSubmit(e);

    // 앰플리튜드 이벤트
    handleTrackEvent(
      AMPLITUDE_EVENT_LOG_NAME.CTA_BUTTON_CLICK,
      AMPLITUDE_EVENT_DISPLAY_NAME.CTA_BUTTON_CLICK,
      { button_name: "문의하기" },
    );
  };
  return (
    <div className="bg-[#FBFBFC] tablet:px-[30px] tablet:pb-[40px] tablet:pt-[88px] web:px-[120px] web:pt-[179px]">
      <div className="mx-auto max-w-[1200px] overflow-hidden tablet:rounded-[20px]">
        {/* 배너 */}
        <div
          className="relative flex items-center overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url("/images/bg-contact.webp")` }}
        >
          <div className="flex h-[229px] flex-col px-[16px] pb-[24px] pt-[60px] tablet:h-auto tablet:px-[40px] tablet:pb-[40px] tablet:pt-[60px] web:pb-[40px] web:pt-[80px]">
            <div className="mt-auto flex flex-col gap-[8px] tablet:mt-0">
              <div className="gibson-h1-s tablet:gibson-h1-m">
                Global No.1
                <br />
                Digital Twin Platform
              </div>
              <div className="pretendard-body-3 tablet:pretendard-body-2 web:pretendard-body-1">
                문의를 주시면 자세한 상담이 가능합니다.
              </div>
            </div>
          </div>
        </div>

        {/* 폼 영역 */}
        <div className="bg-white px-[16px] pb-[24px] pt-[16px] tablet:p-[24px]">
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

              {/* 문의 유형 */}
              <div className="flex flex-col gap-y-[4px]">
                <CustomSelectField
                  selectValue={[
                    { value: "일반 문의", text: "일반 문의" },
                    { value: "구매 문의", text: "구매 문의" },
                    { value: "기술 문의", text: "기술 문의" },
                    { value: "기타", text: "기타" },
                  ]}
                  form={form}
                  name="inquiryType"
                  placeholder="문의 유형을 선택해주세요."
                  label="문의 유형"
                  isEssential
                  onChange={(value) => {
                    setShowOtherInput(value === "기타");
                  }}
                  className="placeholder:text-[#BBBDC6]"
                />

                {/* 기타 인풋 */}
                {showOtherInput && (
                  <CustomInputField
                    form={form}
                    name="otherInquiryType"
                    placeholder="내용을 입력해주세요."
                    isEssential
                    noIcon
                  />
                )}
              </div>

              {/* 산업 분야 */}
              <CustomInputField
                form={form}
                name="industry"
                placeholder="산업 분야를 선택해주세요."
                label="산업 분야"
                isEssential={true}
              />

              {/* 관심 제품 */}
              <CustomCheckboxGroupField
                form={form}
                name="interestedProduct"
                label="관심 제품"
                isEssential={true}
                options={[
                  { label: "NDX PRO", value: "ndx-pro" },
                  { label: "NFLOW", value: "nflow" },
                  {
                    label: "PIX4D",
                    value: "pix4d",
                    additionalField: {
                      type: "select",
                      placeholder: "제품을 선택해주세요",
                      fieldName: "pix4dProduct",
                      selectOptions: [
                        { value: "PIX4Dmatic", text: "PIX4Dmatic" },
                        { value: "PIX4Dfields", text: "PIX4Dfields" },
                        { value: "PIX4Dreact", text: "PIX4Dreact" },
                        { value: "PIX4Dengine", text: "PIX4Dengine" },
                        { value: "PIX4Dcloud", text: "PIX4Dcloud" },
                        { value: "PIX4Dsurvey", text: "PIX4Dsurvey" },
                        { value: "PIX4Dcapture", text: "PIX4Dcapture Pro" },
                        { value: "PIX4Dcatch", text: "PIX4Dcatch" },
                        { value: "Emlid RTK Device", text: "Emlid RTK Device" },
                      ],
                    },
                  },
                  {
                    label: "기타",
                    value: "other",
                    additionalField: {
                      type: "input",
                      placeholder: "내용을 입력해주세요",
                      fieldName: "otherProduct",
                    },
                  },
                ]}
              />

              {/* 문의 내용 */}
              <CustomTextareaField
                form={form}
                name="message"
                placeholder="문의 내용을 입력해주세요."
                label="문의 내용"
                isEssential={true}
                textAreaClass="h-[180px]"
                maxLength={300}
              />

              {/* 개인정보 수집 동의 */}
              <CustomCheckboxField
                form={form}
                name="agreeToPrivacyPolicy"
                label={
                  <span className="pb-[0.1562rem] pt-[20px] pretendard-body-3 tablet:pt-0">
                    <span className="text-primary pretendard-title-s">
                      [필수] 개인정보 수집 동의
                    </span>
                    : 개인정보 수집 및 이용약관을 확인하였으며, 이에 동의합니다.
                  </span>
                }
              />

              {/* 마케팅 수신 동의 */}
              <CustomCheckboxField
                form={form}
                name="agreeToReceiveMarketing"
                label={
                  <span className="pb-[0.1562rem] pretendard-body-3">
                    [선택] 이에이트 뉴스레터 수신에 동의합니다.
                  </span>
                }
              />

              {/* 문의하기 버튼 */}
              <Button type="submit" shape="round">
                문의하기
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
