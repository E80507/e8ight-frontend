import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportPatchSchema } from "@/schema/report";
import { patchReportStatus } from "@/app/api/report";
import { PatchReportStatus } from "@/app/api/dto/report";

// 신고 상태 변경 요청 훅
export const usePatchReportStatus = (id: string, status: string) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof reportPatchSchema>>({
    resolver: zodResolver(reportPatchSchema),
    defaultValues: {
      resolution: status,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const savedStatus = status;
    if (savedStatus === data.resolution) {
      if (savedStatus === null) {
        return alert("처리 상태를 선택해주세요");
      } else {
        return alert("변경된 정보가 없어요");
      }
    }
    setLoading(true);
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await patchReportStatus(id, data as PatchReportStatus);
      alert("신고 상태가 변경되었어요");
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
