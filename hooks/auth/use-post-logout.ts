import { postLogout } from "@/app/api/auth";
import { toast } from "../use-toast";

// 로그아웃 훅
export const usePostLogout = () => {
  const onSubmit = async (onSuccess: () => void) => {
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      const refreshToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("refreshToken="))
        ?.split("=")[1];
      const data = { refreshToken };
      await postLogout(data);
      toast({ title: `로그아웃 되었어요` });
      await new Promise((resolve) => setTimeout(resolve, 600));
      onSuccess();
    } catch (err: unknown) {
      if (!err) return;
      toast({ title: `잠시 후 다시 시도해주세요` });
    } finally {
      localStorage.removeItem("user");
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  };

  return { onSubmit };
};
