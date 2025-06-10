import { useCallback } from "react";

// 구글 스프레드 시트에 리드 데이터 추가하는 훅
export default function useAddCellForLead() {
  const formatDate = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  };

  const sendToSheet = useCallback(
    async (data: {
      name: string;
      position: string;
      company: string;
      department?: string;
      phone?: string;
      email: string;
      inquiryType: string;
      otherInquiryType?: string;
      industry?: string;
      interestedProduct?: string;
      message?: string;
    }) => {
      const {
        name,
        position,
        company,
        department,
        phone,
        email,
        inquiryType,
        otherInquiryType,
        industry,
        interestedProduct,
        message,
      } = data;

      const values = [
        formatDate(),
        name || "-",
        position || "-",
        company || "-",
        department || "-",
        phone || "-",
        email || "-",
        inquiryType === "기타"
          ? `${inquiryType} - ${otherInquiryType}`
          : inquiryType || "-",
        industry || "-",
        interestedProduct || "-",
        message || "-",
      ];

      try {
        console.log("[문의하기 스프레드시트 저장] 시도:", {
          type: "contact",
          values,
        });

        const response = await fetch("/api/google-spread", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            values,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("[문의하기 스프레드시트 저장] 실패 응답:", {
            status: response.status,
            statusText: response.statusText,
            errorData,
          });
          throw new Error(errorData.error || "문의 내용 저장에 실패했습니다.");
        }

        const result = await response.json();
        console.log("[문의하기 스프레드시트 저장] 성공:", result);
        return result;
      } catch (error) {
        console.error("[문의하기 스프레드시트 저장] 실패:", error);
        if (error instanceof Error) {
          console.error("[문의하기 스프레드시트 저장] 에러 상세:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
          });
        }
        throw error;
      }
    },
    [],
  );

  return { sendToSheet };
}
