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
    }) => {
      const { name, position, company, department, phone, email } = data;

      const values = [
        formatDate(),
        name || "-",
        position || "-",
        company || "-",
        department || "-",
        phone || "-",
        email || "-",
      ];

      try {
        await fetch("/api/google-spread", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ values }),
        });
      } catch (error) {
        console.error("스프레드시트 저장 실패", error);
      }
    },
    [],
  );

  return { sendToSheet };
}
