import { postDeliveryCancel } from "@/app/api/delivery";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface UsePostDeliveryCancelReturn {
  onSubmit: (ids: string[]) => Promise<void>;
  loading: boolean;
}

export const usePostDeliveryCancel = (): UsePostDeliveryCancelReturn => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (ids: string[]) => {
    try {
      setLoading(true);
      await postDeliveryCancel({ deliveryIds: ids });
    } catch (error) {
      console.error(error);
      toast({
        title: "배송 취소에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};
