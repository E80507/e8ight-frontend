import { z } from "zod";

export const PostFormSchema = z.object({
  title: z
    .string({ required_error: "제목을 입력해주세요." })
    .min(1, { message: "제목은 최소 1자 이상이어야 합니다." }),

  category: z
    .string({ required_error: "카테고리를 입력해주세요." })
    .min(1, { message: "카테고리는 최소 1자 이상이어야 합니다." }),

  content: z
    .string({ required_error: "내용을 입력해주세요." })
    .min(1, { message: "내용은 최소 1자 이상이어야 합니다." }),

  // thumbnail은 File 또는 string (URL) 둘 다 가능하도록 union 사용
  thumbnail: z.union([
    z.instanceof(File),
    z.string().min(1, { message: "썸네일을 입력해주세요." }),
  ]),

  author: z
    .string({ required_error: "저자를 입력해주세요." })
    .min(1, { message: "저자는 최소 1자 이상이어야 합니다." }),

  mainImage: z
    .string({ required_error: "메인 이미지를 입력해주세요." })
    .min(1, { message: "메인 이미지를 선택해주세요." }),

  // tags, keywords는 검사에서 제외
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});
