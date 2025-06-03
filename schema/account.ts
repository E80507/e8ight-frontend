import { AdminRole } from "@/app/api/dto/auth";
import { z } from "zod";

// 관리자 계정 생성 스키마
export const accountPostSchema = z.object({
  loginId: z.string({ required_error: "아이디를 입력해주세요" }).min(2),
  role: z.enum([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]),
  name: z.string({ required_error: "이름을 입력해주세요" }).min(1),
});

export const adminAuthSchema = z.object({
  code: z.string().min(1, "올바른 인증 코드를 입력해주세요."),
});
