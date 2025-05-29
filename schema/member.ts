import { z } from "zod";

// 회원 정보 변경 스키마
export const userPatchSchema = z.object({
  memo: z.string().optional(),
  isBlocked: z.union([z.boolean(), z.string()]).optional(),
});
