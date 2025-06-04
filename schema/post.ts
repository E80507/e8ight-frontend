import { z } from "zod";

export const PostFormSchema = z.object({
  title: z
    .string({ required_error: "제목을 입력해주세요." })
    .min(1, { message: "제목은 최소 1자 이상이어야 합니다." }),

  category: z
    .string({ required_error: "카테고리를 입력해주세요." })
    .min(1, { message: "카테고리는 최소 1자 이상이어야 합니다." }),

  content: z.string().optional(),

  // 썸네일을 필수로 설정 (File 또는 유효한 URL)
  thumbnail: z
    .union([
      z.instanceof(File, { message: "썸네일 이미지를 업로드해주세요." }),
      z.string().url({ message: "유효한 URL 형식의 썸네일을 입력해주세요." }),
    ])
    .refine((val) => val !== undefined && val !== null, {
      message: "썸네일을 반드시 입력해주세요.",
    }),

  author: z
    .string({ required_error: "저자를 입력해주세요." })
    .min(1, { message: "저자는 최소 1자 이상이어야 합니다." }),

  mainImage: z.string().optional(),

  // tags, keywords는 검사에서 제외
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});
