import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PdfDownloadSchema } from "@/schema/pdf-download";

export const usePostPdfDownload = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const form = useForm<z.infer<typeof PdfDownloadSchema>>({
    resolver: zodResolver(PdfDownloadSchema),
  });

  const onSubmit = form.handleSubmit(
    async (data) => {
      try {
        setLoading(true);

        // 0.4초 대기 (API 호출 시뮬레이션)
        await new Promise((resolve) => setTimeout(resolve, 400));

        toast({
          title: "문의가 성공적으로 접수되었습니다.",
        });

        // Reset form after successful submission
        form.reset();
      } catch (err: unknown) {
        console.error("Form Submission Error:", err);
        toast({
          title: "문의 접수 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    (errors) => {
      console.error("Form Validation Failed:", {
        errors,
        currentValues: form.getValues(),
        formState: form.formState,
      });
      toast({
        title: "입력 내용을 확인해주세요.",
        variant: "destructive",
      });
    },
  );

  return { onSubmit, form, loading };
};
