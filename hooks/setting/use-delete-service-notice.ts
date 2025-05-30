import { useState } from "react";
import { toast } from "../use-toast";
import { deleteServiceNotice } from "@/app/api/setting";

export const useDeleteServiceNotice = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const onDelete = async (data: string[], onSuccess: () => void) => {
    setLoading(true); // 로딩 시작
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await deleteServiceNotice(data);
      alert("공지가 삭제 되었어요");
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return { onDelete, deleteLoading: loading };
};
