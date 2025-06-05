import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PdfDownloadSchema } from "@/schema/pdf-download";
import useAddCellForLead from "./use-add-cell-for-lead";

export const usePostPdfDownload = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const form = useForm<z.infer<typeof PdfDownloadSchema>>({
    resolver: zodResolver(PdfDownloadSchema),
  });

  const { sendToSheet } = useAddCellForLead();

  const onSubmit = form.handleSubmit(
    async (data) => {
      try {
        setLoading(true);

        // 0.4초 대기 (API 호출 시뮬레이션)
        await new Promise((resolve) => setTimeout(resolve, 400));

        toast({
          title: "PDF 다운로드가 성공적으로 접수되었습니다.",
        });

        console.log("PDF 다운로드 데이터:", JSON.stringify(data));

        sendToSheet({
          name: data.name,
          position: data.position,
          company: data.company,
          department: data.department,
          email: data.email,
        }),
          setTimeout(() => {
            form.reset(); // 로그 확인 후 폼 리셋
          }, 1000);

        alert("PDF 다운로드가 성공적으로 접수되었습니다.");
      } catch (err: unknown) {
        console.error("Form Submission Error:", err);
        toast({
          title: "PDF 다운로드 중 오류가 발생했습니다.",
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
