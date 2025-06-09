import { apiFetch } from "@/util/fetch";
import { SubscribeResponse } from "./dto/subscribe";

// 구독 신청
export const postSubscribe = async (
  email: string,
): Promise<SubscribeResponse> => {
  const now = new Date();
  const formatDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  console.log("[뉴스레터 구독] 시작");
  const requestData = {
    type: "newsletter",
    values: [formatDate, email],
  };
  console.log(
    "[뉴스레터 구독] 요청 데이터:",
    JSON.stringify(requestData, null, 2),
  );

  try {
    const response = await apiFetch("/api/google-spread", {
      method: "POST",
      body: JSON.stringify(requestData),
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
