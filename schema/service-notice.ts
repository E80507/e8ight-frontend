import { z } from "zod";

// 서비스 공지 생성 스키마
export const serviceNoticeSchema = z.object({
  title: z.string({ required_error: "제목을 입력해주세요" }).min(1, {
    message: "제목을 입력해주세요",
  }),
  content: z.string({ required_error: "내용을 입력해주세요" }).min(1, {
    message: "내용을 입력해주세요",
  }),
  link: z.string().optional(),
  file: z.instanceof(File, { message: "이미지를 업로드해주세요" }).optional(),
});

// 서비스 공지 변경 스키마
export const serviceNoticePatchSchema = z.object({
  title: z.string({ required_error: "제목을 입력해주세요" }).min(1, {
    message: "제목을 입력해주세요",
  }),
  content: z.string({ required_error: "내용을 입력해주세요" }).min(1, {
    message: "내용을 입력해주세요",
  }),
  link: z.string().optional(),
  file: z
    .union([
      z.instanceof(File, { message: "이미지를 업로드해주세요" }),
      z.string({ required_error: "이미지를 업로드해주세요" }),
    ])
    .optional(),
  isVisible: z.union([
    z.boolean({ required_error: "노출 여부를 선택해주세요" }),
    z.string({ required_error: "노출 여부를 선택해주세요" }),
  ]),
});
