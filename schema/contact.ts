import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string({ required_error: "성함을 입력해주세요." }),

  position: z
    .string({ required_error: "직함을 입력해주세요." })
    .min(2, { message: "한글, 최소 2자 이상 입력해주세요." }),

  company: z
    .string({ required_error: "회사명/기관명을 입력해주세요." })
    .min(2, { message: "한글, 최소 2자 이상 입력해주세요." }),

  department: z
    .string({ required_error: "부서/팀을 입력해주세요." })
    .min(2, { message: "한글, 최소 2자 이상 입력해주세요." }),

  phone: z.number({
    required_error: "연락처를 입력해주세요.",
    invalid_type_error: "숫자만 입력해주세요.",
  }),

  email: z
    .string({ required_error: "이메일을 입력해주세요." })
    .email({ message: "유효한 이메일 주소를 입력해주세요." }),

  inquiryType: z
    .string({ required_error: "문의 유형을 선택해주세요." })
    .min(1, { message: "문의 유형을 선택해주세요." }),

  industry: z
    .string({ required_error: "산업 분야를 선택해주세요." })
    .min(2, { message: "한글, 최소 2자 이상 입력해주세요." }),

  interestedProduct: z
    .array(z.string())
    .min(1, { message: "관심 있는 제품을 한 개 이상 선택해주세요." }),

  message: z
    .string({ required_error: "문의 내용을 입력해주세요." })
    .min(2, { message: "한글, 최소 2자 이상 입력해주세요." }),

  agreeToPrivacyPolicy: z.literal(true, {
    errorMap: () => ({
      message: "개인정보 수집 및 이용에 동의해주세요.",
    }),
  }),

  agreeToReceiveMarketing: z.boolean().optional(),
});
