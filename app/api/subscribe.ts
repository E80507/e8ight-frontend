import { apiFetch } from "@/util/fetch";
import { SubscribeResponse } from "./dto/subscribe";

// 구독 신청
export const postSubscribe = async (
  email: string,
): Promise<SubscribeResponse> => {
  console.log("[뉴스레터 구독] 시작");

  try {
    const response = await apiFetch("/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    console.log(
      "[뉴스레터 구독] 성공 응답:",
      JSON.stringify(response, null, 2),
    );
    return response;
  } catch (error) {
    console.error("[뉴스레터 구독] 실패:", error);
    if (error instanceof Error) {
      console.error("[뉴스레터 구독] 에러 상세:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};
