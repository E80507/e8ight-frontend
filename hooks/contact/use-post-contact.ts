import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@/schema/contact";
import useAddCellForLead from "./use-add-cell-for-lead";
import { postSubscribe } from "@/api/subscribe";

export const usePostContact = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      interestedProduct: [],
      agreeToReceiveMarketing: false,
      pix4dProduct: "",
      otherProduct: "",
    },
  });

  const { sendToSheet } = useAddCellForLead();

  const onSubmit = form.handleSubmit(
    async (data) => {
      try {
        setLoading(true);

        // 0.4초 대기 (API 호출 시뮬레이션)
        await new Promise((resolve) => setTimeout(resolve, 400));

        console.log("문의 데이터:", data); // 데이터 확인용 로그

        // 관심 제품 처리
        const processedInterestedProducts = data.interestedProduct.map(
          (product) => {
            if (product === "pix4d" && data.pix4dProduct) {
              return `PIX4D - ${data.pix4dProduct}`;
            }
            if (product === "other" && data.otherProduct) {
              return `기타 - ${data.otherProduct}`;
            }
            return product;
          },
        );

        // 뉴스레터 구독 동의한 경우 이메일 전송
        if (data.agreeToReceiveMarketing) {
          try {
            const response = await postSubscribe(data.email);
            console.log("Response message:", response.message);

            if (response.message === "뉴스레터가 성공적으로 구독되었습니다.") {
              console.log("Calling onSuccess callback");
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
                  title:
                    errorData?.message || "구독 처리 중 문제가 발생했습니다.",
                });
              }
            }
          }
        }

        toast({
          title: "문의가 성공적으로 접수되었습니다.",
        });

        // 구글 스프레드 시트 데이터 추가
        sendToSheet({
          name: data.name,
          position: data.position,
          company: data.company,
          department: data.department,
          phone: data.phone,
          email: data.email,
          inquiryType: data.inquiryType,
          industry: data.industry,
          interestedProduct: processedInterestedProducts.join(", "),
          message: data.message,
        }),
          setTimeout(() => {
            form.reset(); // 로그 확인 후 폼 리셋
          }, 1000);

        alert("문의가 성공적으로 접수되었습니다.");
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
