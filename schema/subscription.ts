import { z } from "zod";

export const subscriptionSchema = z
  .object({
   email: z
    .string({ required_error: "항목을 입력해주세요." })
    .email({ message: "유효한 이메일 주소를 입력해주세요." }),
  })
