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

  phone: z
    .string({ required_error: "연락처를 입력해주세요." })
    .min(12, { message: "올바른 연락처 형식이 아닙니다." })
    .max(13, { message: "올바른 연락처 형식이 아닙니다." })
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, {
      message: "올바른 연락처 형식이 아닙니다.",
    }),

  email: z
    .string({ required_error: "이메일을 입력해주세요." })
    .email({ message: "유효한 이메일 주소를 입력해주세요." }),

  inquiryType: z
    .string({ required_error: "문의 유형을 선택해주세요." })
    .refine(
      (val) => ["일반 문의", "구매 문의", "기술 문의", "기타"].includes(val),
      {
        message: "문의 유형을 선택해주세요.",
      },
    ),

  otherInquiryType: z.string().optional(),

  industry: z
    .string({ required_error: "산업 분야를 선택해주세요." })
    .min(2, { message: "한글, 최소 2자 이상 입력해주세요." }),

  interestedProduct: z
    .array(z.string())
    .min(1, { message: "관심 있는 제품을 한 개 이상 선택해주세요." }),

  pix4dProduct: z.string().optional(),
  otherProduct: z.string().optional(),

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
