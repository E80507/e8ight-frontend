import { useCallback } from "react";
import { toast } from "../use-toast";
import { apiFetch } from "@/util/fetch";

// 파일 업로드 요청 훅
export const useUploadExcel = () => {
  return useCallback(async (formData: FormData) => {
    try {
      await apiFetch(
        "/admin/deliveries/excel/upload",
        {
          method: "POST",
          body: formData,
        },
        "json",
        true,
      );

      alert("파일이 업로드 되었어요");
    } catch (error) {
      // 오류 처리
      console.error(error);
      toast({ title: "업로드 중 오류가 발생했어요" });
    }
  }, []);
};
