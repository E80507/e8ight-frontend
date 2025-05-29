"use client";

import { useRef, useEffect } from "react";
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

  // 폼 상태 변경 감지
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('Form Values Changed:', value);
      console.log('Current Errors:', form.formState.errors);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // 폼 제출 이벤트 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form Submit Triggered');
    console.log('Current Form Values:', form.getValues());
    console.log('Form Validation State:', form.formState);
    await onSubmit(e);
  };

  return (
    <div className="px-[120px] py-[40px] bg-[#FBFBFC]">
      <div className="max-w-[1200px] mx-auto rounded-[20px] overflow-hidden">
        {/* 배너 */}
        <div
          className="flex items-center relative overflow-hidden bg-cover bg-center px-[40px] py-[80px] h-[357px] bg-cover bg-center"
          style={{ backgroundImage: `url("/images/bg-contact.webp")` }}
        >
          <div className="absolute inset-0 bg-white opacity-[0.21] z-0" />

          <div className="flex gap-[8px] relative z-10 ">
            <div className="w-[16px] h-[16px] bg-[#70D5B2] rounded-full" />
            
            <div className="flex flex-col gap-[16px]">
              <div className="h1-l">Global No.1<br/>Digital Twin Platform</div>
              <div className="body-1">문의를 주시면 자세한 상담이 가능합니다.</div>
            </div>
          </div>
        </div>

        {/* 폼 영역 */}
        <div className="p-[40px] bg-white">
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

              {/* 문의 유형 */}
              <CustomSelectField
                form={form}
                name="inquiryType"
                placeholder="문의 유형을 선택해주세요."
                label="문의 유형"
                selectValue={[{value: '1', text: '문의'}, {value: '2', text: '제품 문의'}, {value: '3', text: '기타'}]}
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
                  { label: "PIX4D", value: "pix4d" },
                  { label: "기타", value: "other" }
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
                label={<span><span className="text-primary font-bold">[필수] 개인정보 수집 동의</span>: 개인정보 수집 및 이용약관을 확인하였으며, 이에 동의합니다.</span>}
                isEssential={true}
              />

              {/* 마케팅 수신 동의 */}
              <CustomCheckboxField
                form={form}
                name="agreeToReceiveMarketing"
                label="[선택] 이에이트 뉴스레터 수신에 동의합니다."
              />

              {/* 문의하기 버튼 */}
              <Button type="submit" shape="round">문의하기</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
