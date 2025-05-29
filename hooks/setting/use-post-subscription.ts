import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../use-toast";
import { z } from "zod";
import { subscriptionSchema } from "@/schema/subscription";

export const usePostSubscription = () => {
  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
  });

  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true); // 로딩 시작
    
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));

    } catch (err: unknown) {
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
        icon: "light",
      });
    } finally {
      setLoading(false); // 로딩 종료
    }
  });

  return { form, onSubmit, loading };
};
