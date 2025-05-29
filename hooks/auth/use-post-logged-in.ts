import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schema/auth";
import { postLoggedIn } from "@/app/api/auth";

// 로그인 훅
export const usePostLoggedIn = (
  onSuccess: (isPasswordChangeRequired: boolean) => void,
  onFail: (val: string) => void,
) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true); // 로딩 시작
    try {
      await new Promise((resolve) => setTimeout(resolve, 400)); // 0.4초 대기
      const res = await postLoggedIn(data); // 작품 생성
      const { admin } = res;
      document.cookie = `accessToken=${res.accessToken}; path=/;`;
      document.cookie = `refreshToken=${res.refreshToken}; path=/;`;
      localStorage.setItem("admin", JSON.stringify(admin));
      onSuccess(admin.isPasswordChangeRequired);
    } catch (err: unknown) {
      onFail("아이디 또는 비밀번호를 확인해주세요.");
      console.error(err);
    } finally {
      setLoading(false); // 로딩 종료
    }
  });

  return { form, onSubmit, loading };
};
