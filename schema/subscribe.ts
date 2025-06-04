import { z } from "zod";

export const subsscribeSchema = z.object({
  email: z
    .string({ required_error: "이메일을 입력해주세요." })
    .email({ message: "유효한 이메일 주소를 입력해주세요." }),
});
