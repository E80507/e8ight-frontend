import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DeliveryDetailRes,
  PatchDeliveryDetailReq,
} from "@/app/api/dto/delivery";
import { deliveryPatchSchema } from "@/schema/delivery";
import { patchDeliveryDetail } from "@/app/api/delivery";

export const usePatchDelivery = (id: string, savedData: DeliveryDetailRes) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof deliveryPatchSchema>>({
    resolver: zodResolver(deliveryPatchSchema),
    defaultValues: {
      recipientName: savedData.recipientName ?? "",
      recipientPhone: savedData.recipientPhone ?? "",
      deliveryAddress: savedData.deliveryAddress ?? "",
      deliveryAddressDetail: savedData.deliveryAddressDetail ?? "",
      postalCode: savedData.postalCode ?? "",
    },
  });

  const handlePatchDelivery = async (formValues: z.infer<typeof deliveryPatchSchema>) => {
    if (
      (formValues.deliveryAddress === undefined ||
        savedData.deliveryAddress === formValues.deliveryAddress) &&
      (formValues.deliveryAddressDetail === undefined ||
        savedData.deliveryAddressDetail === formValues.deliveryAddressDetail) &&
      (formValues.recipientName === undefined ||
        savedData.recipientName === formValues.recipientName) &&
      (formValues.recipientPhone === undefined ||
        savedData.recipientPhone === formValues.recipientPhone) &&
      (formValues.postalCode === undefined ||
        savedData.postalCode === formValues.postalCode)
    ) {
      return;
      // return alert("변경된 정보가 없습니다.");
    }
    setLoading(true);
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await patchDeliveryDetail(id, formValues as PatchDeliveryDetailReq);
      window.location.reload();
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handlePatchDelivery, form, loading };
};
