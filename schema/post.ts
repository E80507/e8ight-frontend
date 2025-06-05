import { z } from "zod";

export const PostLibraryInsightFormSchema = z.object({
  title: z
    .string({ required_error: "제목을 입력해주세요." })
    .min(1, { message: "제목은 최소 1자 이상이어야 합니다." }),

  category: z
    .string({ required_error: "카테고리를 입력해주세요." })
    .min(1, { message: "카테고리는 최소 1자 이상이어야 합니다." }),

  content: z.string().min(1, { message: "내용을 입력해주세요." }),

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
  linkUrl: z.string().optional(),
  file: z.array(z.string()).optional(),
});

export const PostDXFormSchema = z.object({
  title: z
    .string({ required_error: "제목을 입력해주세요." })
    .min(1, { message: "제목은 최소 1자 이상이어야 합니다." }),

  category: z
    .string({ required_error: "카테고리를 입력해주세요." })
    .min(1, { message: "카테고리는 최소 1자 이상이어야 합니다." }),

  thumbnail: z
    .union([
      z.instanceof(File, { message: "썸네일 이미지를 업로드해주세요." }),
      z.string().url({ message: "유효한 URL 형식의 썸네일을 입력해주세요." }),
    ])
    .refine((val) => val !== undefined && val !== null, {
      message: "썸네일을 반드시 입력해주세요.",
    }),
  linkUrl: z.string().min(1, { message: "링크를 입력해주세요." }),
  content: z.string().optional(),
  file: z.array(z.string()).optional(),
});

export const PostDownloadsFormSchema = z.object({
  title: z
    .string({ required_error: "제목을 입력해주세요." })
    .min(1, { message: "제목은 최소 1자 이상이어야 합니다." }),

  category: z
    .string({ required_error: "카테고리를 입력해주세요." })
    .min(1, { message: "카테고리는 최소 1자 이상이어야 합니다." }),
  thumbnail: z
    .union([
      z.instanceof(File, { message: "썸네일 이미지를 업로드해주세요." }),
      z.string().url({ message: "유효한 URL 형식의 썸네일을 입력해주세요." }),
    ])
    .refine((val) => val !== undefined && val !== null, {
      message: "썸네일을 반드시 입력해주세요.",
    }),
  file: z.array(z.string()),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  linkUrl: z.string().optional(),
  content: z.string().optional(),
});
