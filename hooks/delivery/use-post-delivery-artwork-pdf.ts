import { useState } from "react";
import { toast } from "../use-toast";
import { postDeliveryArtworkPDF } from "@/app/api/delivery";

export const usePostDeliveryArtworkPDF = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태

  const onSubmit = async (data: string[]) => {
    setLoading(true); // 로딩 시작
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      const artworkData = {
        purchasedArtworkIds: data,
      };

      const res = await postDeliveryArtworkPDF(artworkData);

      // blobUrl 생성
      const response = await fetch(res.pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // PDF 파일 다운로드
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `delivery_artwork_${data[0]}.pdf`;
      document.body.appendChild(link);
      link.click();

      // 다운로드 후 Blob URL 해제 및 링크 제거
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);

      alert("pdf가 다운로드 되었어요");
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return { onSubmit, loading };
};
