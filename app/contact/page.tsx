"use client";

import { useRef, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { usePostContact } from "@/hooks/contact/use-post-contact";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { Button } from "@/components/ui/button";

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
          className="relative overflow-hidden bg-cover bg-center px-[40px] py-[80px] h-[357px] bg-cover bg-center"
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
                required={true}
              />

              {/* 직함 */}
              <CustomInputField
                form={form}
                name="position"
                placeholder="직함을 입력해주세요."
                label="직함"
                required={true}
              />

              {/* 회사명 */}
              <CustomInputField
                form={form}
                name="company"
                placeholder="회사명 또는 기관명을 입력해주세요."
                label="회사명"
                required={true}
              />

              {/* 부서 */}
              <CustomInputField
                form={form}
                name="department"
                placeholder="부서 또는 팀명을 입력해주세요."
                label="부서"
                required={true}
              />

              {/* 연락처 */}
              <CustomInputField
                form={form}
                name="phone"
                placeholder="연락처를 입력해주세요."
                label="연락처"
                required={true}
              />

              {/* 이메일 */}
              <CustomInputField
                form={form}
                name="email"
                placeholder="이메일 주소를 입력해주세요."
                label="이메일"
                type="email"
                required={true}
              />

              {/* 문의 유형 */}
              <CustomInputField
                form={form}
                name="inquiryType"
                placeholder="문의 유형을 선택해주세요."
                label="문의 유형"
                required={true}
              />

              {/* 산업 분야 */}
              <CustomInputField
                form={form}
                name="industry"
                placeholder="산업 분야를 선택해주세요."
                label="산업 분야"
                required={true}
              />

              {/* 관심 제품 */}
              <CustomInputField
                form={form}
                name="interestedProduct"
                placeholder="관심 있는 제품을 선택해주세요."
                label="관심 제품"
                required={true}
              />

              {/* 문의 내용 */}
              <CustomInputField
                form={form}
                name="message"
                placeholder="문의 내용을 입력해주세요."
                label="문의 내용"
                required={true}
              />

              {/* 개인정보 수집 동의 */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...form.register("agreeToPrivacyPolicy")}
                  id="agreeToPrivacyPolicy"
                />
                <label htmlFor="agreeToPrivacyPolicy">
                  
                </label>
              </div>

              {/* 마케팅 수신 동의 */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...form.register("agreeToReceiveMarketing")}
                  id="agreeToReceiveMarketing"
                />
                <label htmlFor="agreeToReceiveMarketing">
                  
                </label>
              </div>

              <Button type="submit" shape="round">문의하기</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
