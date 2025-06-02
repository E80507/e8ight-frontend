import { z } from "zod";

export const PostFormSchema = z.object({
  title: z.string({ required_error: "제목을 입력해주세요." }),

  category: z.string({ required_error: "카테고리 입력해주세요." }),

  content: z.string({ required_error: "내용을 입력해주세요." }),

  thumbnail: z.instanceof(File),

  author: z.string({ required_error: "저자를 입력해주세요." }),

  mainImage: z.string({ required_error: "메인 이미지를 입력해주세요." }),

  tags: z.array(z.string({ required_error: "태그를 입력해주세요." })),
});
