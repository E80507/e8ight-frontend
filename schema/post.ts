import { z } from "zod";

// File 타입을 안전하게 처리하기 위한 커스텀 검증
const fileSchema = z.custom<File>((value) => {
  // SSR 환경에서는 검증 스킵
  if (typeof window === "undefined") return true;
  return value instanceof File;
}, "파일을 업로드해주세요.");

export const PostFormSchema = z.object({
  title: z.string({ required_error: "제목을 입력해주세요." }),

  category: z.string({ required_error: "카테고리 입력해주세요." }),

  content: z.string({ required_error: "내용을 입력해주세요." }),

  thumbnail: fileSchema,

  author: z.string({ required_error: "저자를 입력해주세요." }),

  mainImage: z.string({ required_error: "메인 이미지를 입력해주세요." }),

  tags: z.array(z.string({ required_error: "태그를 입력해주세요." })),
});
