import { z } from "zod";

// 작품 공개 여부 변경 스키마
export const artworkPatchSchema = z.object({
  isBlocked: z.union([
    z.boolean({ required_error: "작품 공개 여부를 선택해주세요" }),
    z.string({ required_error: "작품 공개 여부를 선택해주세요" }),
  ]),
});
