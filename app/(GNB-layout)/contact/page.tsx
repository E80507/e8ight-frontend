"use client";

import { useRef } from "react";
import { Form } from "@/components/ui/form";
import { usePostContact } from "@/hooks/contact/use-post-contact";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import CustomEmailField from "@/components/shared/form/custom-email-field";
import CustomCheckboxField from "@/components/shared/form/custom-checkbox-field";
import CustomCheckboxGroupField from "@/components/shared/form/custom-checkbox-group-field";

const ContactPage = () => {
  const { form, onSubmit } = usePostContact();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="web:px-[120px] web:py-[40px] tablet:px-[30px] tablet:py-[40px] bg-[#FBFBFC]">
      <div className="max-w-[1200px] mx-auto tablet:rounded-[20px] overflow-hidden">
        {/* 배너 */}
        <div
          className="flex items-center relative overflow-hidden bg-cover bg-center bg-cover bg-center"
          style={{ backgroundImage: `url("/images/bg-contact.webp")` }}
        >
          <div className="flex flex-col web:pt-[80px] web:pb-[40px] tablet:px-[40px] tablet:pt-[60px] tablet:pb-[40px] tablet:h-auto h-[229px] pt-[60px] px-[16px] pb-[24px]">
            <div className="flex flex-col gap-[8px] mt-auto tablet:mt-0">
              <div className="tablet:gibson-h1-m gibson-h1-s">
                Global No.1
                <br />
                Digital Twin Platform
              </div>
              <div className="web:pretendard-body-1 tablet:pretendard-body-2 pretendard-body-3">
                문의를 주시면 자세한 상담이 가능합니다.
              </div>
            </div>
          </div>
        </div>

        {/* 폼 영역 */}
        <div className="pt-[16px] pb-[24px] px-[16px] tablet:p-[24px] bg-white">
          <Form {...form}>
            <form
              onSubmit={onSubmit}
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
              <CustomSelectField
                form={form}
                name="inquiryType"
                placeholder="문의 유형을 선택해주세요."
                label="문의 유형"
                selectValue={[
                  { value: "문의", text: "문의" },
                  { value: "제품 문의", text: "제품 문의" },
                  { value: "기타", text: "기타" },
                ]}
                isEssential={true}
              />

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
              />

              {/* 개인정보 수집 동의 */}
              <CustomCheckboxField
                form={form}
                name="agreeToPrivacyPolicy"
                label={
                  <>
                    <span className="text-primary pretendard-title-s pb-[0.1562rem]">
                      [필수] 개인정보 수집 동의
                    </span>
                    <span className="pretendard-body-3 pb-[0.1562rem]">
                      : 개인정보 수집 및 이용약관을 확인하였으며, 이에
                      동의합니다.
                    </span>
                  </>
                }
                isEssential={true}
              />

              {/* 마케팅 수신 동의 */}
              <CustomCheckboxField
                form={form}
                name="agreeToReceiveMarketing"
                label={
                  <span className="pretendard-body-3 pb-[0.1562rem]">
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
