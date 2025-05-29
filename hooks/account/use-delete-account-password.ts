import { useState } from "react";
import { toast } from "../use-toast";
import { deleteAccount } from "@/app/api/account";

export const useDeleteAccount = (id: string) => {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = async (onSuccess: () => void) => {
    setLoading(true);
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await deleteAccount(id);
      onSuccess();
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

  return { onSubmit, loading };
};
