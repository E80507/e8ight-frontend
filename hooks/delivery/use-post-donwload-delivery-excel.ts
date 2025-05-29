import { useState } from "react";
import { toast } from "../use-toast";
import { postDownloadDeliveryExcel } from "@/app/api/delivery";
import formattedDate from "@/util/date";

export const usePostDownloadDeliveryExcel = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const date = formattedDate(new Date(), "DEFAULT_FULL");

  const onSubmit = async (data: string[]) => {
    setLoading(true); // 로딩 시작
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      const deliveryData = {
        deliveryIds: data,
      };
      const blob = await postDownloadDeliveryExcel(deliveryData);
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `delivery-${date}.xlsx`; // 다운로드될 파일 이름
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 메모리 누수 방지를 위해 Blob URL 해제
      URL.revokeObjectURL(downloadUrl);
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
