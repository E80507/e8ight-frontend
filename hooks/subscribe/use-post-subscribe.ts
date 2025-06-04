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

  const [loading, setLoading] = useState(false);

  const onSubmit = form.handleSubmit(async () => {
    setLoading(true);
    try {
      const email = form.getValues("email");
      await new Promise((resolve) => setTimeout(resolve, 400));
      const response = await postSubscribe(email);
      console.log("Response message:", response.message);

      if (response.message === "뉴스레터가 성공적으로 구독되었습니다.") {
        console.log("Calling onSuccess callback");
        onSuccess?.();
      } else {
        toast({
          title: response.message || "구독 처리 중 문제가 발생했습니다",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        const errorData = JSON.parse(err.message);
        if (errorData?.statusCode === 409) {
          toast({
            title: "이미 구독 중인 이메일입니다.",
          });
        } else {
          toast({
            title: errorData?.message || "구독 처리 중 문제가 발생했습니다.",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  });

  return { form, onSubmit, loading };
};
