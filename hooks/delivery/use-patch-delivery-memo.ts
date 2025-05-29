import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatchDeliveryDetailReq } from "@/app/api/dto/delivery";
import { deliveryPatchSchema } from "@/schema/delivery";
import { patchDeliveryDetail } from "@/app/api/delivery";

export const usePatchDeliveryMemo = (id: string, memo: string) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof deliveryPatchSchema>>({
    resolver: zodResolver(deliveryPatchSchema),
    defaultValues: {
      memo: memo ?? undefined,
    },
  });

  const handlePatchMemo = form.handleSubmit(async (data) => {
    if (data.memo === undefined || memo === data.memo) {
      return alert("변경된 정보가 없습니다.");
    }
    setLoading(true);
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await patchDeliveryDetail(id, data as PatchDeliveryDetailReq);
      // alert("배송 정보가 변경되었어요");
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
  });

  return { handlePatchMemo, form, loading };
};
