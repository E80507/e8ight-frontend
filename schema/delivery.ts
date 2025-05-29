import { z } from "zod";

// 배송 상세 정보 변경 스키마
export const deliveryPatchSchema = z.object({
  ordererName: z.string().optional(),
  ordererPhone: z.string().optional(),
  email: z.string().optional(),
  recipientName: z.string().optional(),
  recipientPhone: z.string().optional(),
  deliveryAddress: z.string().optional(),
  deliveryAddressDetail: z.string().optional(),
  postalCode: z.string().optional(),
  memo: z.string().optional(),
});
