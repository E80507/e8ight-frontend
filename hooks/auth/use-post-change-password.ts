import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordChangeSchema } from "@/schema/auth";
import { postChangePassword } from "@/app/api/auth";
import { CustomError } from "@/util/fetch";

// 비밀번호 변경 훅
export const usePostChangePassword = (onSuccess: () => void) => {
  const form = useForm<z.infer<typeof PasswordChangeSchema>>({
    resolver: zodResolver(PasswordChangeSchema),
  });
  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true); // 로딩 시작
    if (data.newPassword.length < 4) {
      return alert("새로운 비밀번호는 4자리 이상으로 설정해주세요");
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 400)); // 0.4초 대기
      await postChangePassword(data);
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        switch (err.statusCode) {
          case 400:
            alert("잘못된 요청입니다. 입력 내용을 확인해주세요.");
            break;
          case 401:
            alert("현재 비밀번호가 일치하지 않아요");
            break;
          case 403:
            alert("권한이 없습니다.");
            break;
          case 422:
            alert("새 비밀번호와 비밀번호 확인이 일치하지 않아요");
            break;
          default:
            alert(err.message || "알 수 없는 오류가 발생했습니다.");
        }
      } else {
        // 예상치 못한 오류 처리
        alert("잠시 후 다시 시도해주세요");
        console.error(err);
      }
    } finally {
      setLoading(false); // 로딩 종료
    }
  });

  return { form, onSubmit, loading };
};
