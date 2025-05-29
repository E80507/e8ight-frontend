import { useState } from "react";
import { toast } from "../use-toast";
import { patchAccountPassword } from "@/app/api/account";

export const usePatchAccountPassword = (id: string) => {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = async () => {
    setLoading(true);
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await patchAccountPassword(id);
      alert("비밀번호가 00000000으로 초기화 되었어요");
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
