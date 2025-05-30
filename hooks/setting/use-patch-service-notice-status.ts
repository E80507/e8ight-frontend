import { patchServiceNoticeStatus } from "@/app/api/setting";
import { ServiceNoticeStatusPostReq } from "@/app/api/dto/setting";
import { useState } from "react";
import { toast } from "../use-toast";

export const usePatchServiceNoticeStatus = () => {
  const [loading, setLoading] = useState(false); // 비노출 상태 변경 cta 로딩 상태
  const [visibleLoading, setVisibleLoading] = useState(false); // 노출 상태 변경 cta 로딩 상태

  const onSubmit = async (
    isVisible: boolean,
    ids: string[],
    onSuccess: () => void,
  ) => {
    if (isVisible) {
      setVisibleLoading(true);
    } else {
      setLoading(true);
    }

    try {
      const newData: ServiceNoticeStatusPostReq = {
        isVisible,
        ids,
      };
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      await patchServiceNoticeStatus(newData);
      alert("공지 노출 상태가 변경되었어요");
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      if (isVisible) {
        setVisibleLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  return { onSubmit, loading, visibleLoading };
};
