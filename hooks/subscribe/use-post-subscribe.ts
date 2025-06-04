import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../use-toast";
import { z } from "zod";
import { subsscribeSchema } from "@/schema/subscribe";
import { postSubscribe } from "@/api/subscribe";

export const usePostSubscribe = (onSuccess?: () => void) => {
  const form = useForm<z.infer<typeof subsscribeSchema>>({
    resolver: zodResolver(subsscribeSchema),
  });

  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = form.handleSubmit(async () => {
    setLoading(true); // 로딩 시작

    try {
      const email = form.getValues("email");
      
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      const response = await postSubscribe(email);
      onSuccess?.();
    } catch (err: unknown) {
      if (!err) return;
      console.error("Subscribe error:", err);
      toast({
        title: "잠시 후 다시 시도해주세요",
        // icon: "light",
      });
    } finally {
      setLoading(false); // 로딩 종료
    }
  });

  return { form, onSubmit, loading };
};
