import { z } from "zod";

// 신고 상태 변경 스키마
export const reportPatchSchema = z.object({
  resolution: z
    .string({ required_error: "신고 상태를 선택해주세요" })
    .nullable(),
});
