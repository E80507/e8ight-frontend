import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@/schema/contact";

export const usePostContact = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  
  console.log('ContactSchema:', ContactSchema);
  
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      agreeToPrivacyPolicy: false,
      agreeToReceiveMarketing: false,
      interestedProduct: [],
    },
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
  });

  // 폼 상태 변경 감지
  console.log('Form State:', {
    values: form.getValues(),
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      console.log('Form Submission Started - Valid Data:', data);
      setLoading(true);
      
      // Form validation succeeded, data contains the form values
      console.log('Form data:', data);
      
      // 0.4초 대기 (API 호출 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      toast({
        title: "문의가 성공적으로 접수되었습니다.",
      });
      
      // Reset form after successful submission
      form.reset();
      
    } catch (err: unknown) {
      console.error('Form Submission Error:', err);
      toast({
        title: "문의 접수 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, (errors) => {
    console.error('Form Validation Failed:', {
      errors,
      currentValues: form.getValues(),
      formState: form.formState,
    });
    toast({
      title: "입력 내용을 확인해주세요.",
      variant: "destructive",
    });
  });

  return { onSubmit, form, loading };
};
