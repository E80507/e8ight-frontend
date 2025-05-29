import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { artworkPatchSchema } from "@/schema/artwork";
import { patchNoticeStatus } from "@/app/api/notice";

export const usePatchNotice = (id: string, isBlocked: boolean) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof artworkPatchSchema>>({
    resolver: zodResolver(artworkPatchSchema),
    defaultValues: {
      isBlocked: String(isBlocked),
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (String(isBlocked) === String(data.isBlocked)) {
      return alert("변경된 정보가 없어요");
    }
    setLoading(true);
    try {
      // 0.4초 대기w
      await new Promise((resolve) => setTimeout(resolve, 400));
      await patchNoticeStatus(id);
      alert("작품 공개 상태가 변경되었어요");
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

  return { onSubmit, form, loading };
};
