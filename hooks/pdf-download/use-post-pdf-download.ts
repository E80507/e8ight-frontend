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

        console.log("[PDF 다운로드] 시작:", JSON.stringify(data, null, 2));

        try {
          await sendToSheet({
            name: data.name,
            position: data.position,
            company: data.company,
            department: data.department,
            phone: data.phone,
            email: data.email,
            fileNames: data.fileNames,
          });

          console.log("[PDF 다운로드] 스프레드시트 저장 성공");
          toast({
            title: "PDF 다운로드가 완료되었습니다.",
          });

          setTimeout(() => {
            form.reset();
          }, 1000);
        } catch (sheetError) {
          console.error("[PDF 다운로드] 스프레드시트 저장 실패:", sheetError);
          throw sheetError;
        }
      } catch (err: unknown) {
        console.error("[PDF 다운로드] 오류 발생:", err);
        if (err instanceof Error) {
          console.error("[PDF 다운로드] 에러 상세:", {
            name: err.name,
            message: err.message,
            stack: err.stack,
          });
        }
        toast({
          title:
            err instanceof Error
              ? err.message
              : "PDF 다운로드 중 오류가 발생했습니다.",
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
