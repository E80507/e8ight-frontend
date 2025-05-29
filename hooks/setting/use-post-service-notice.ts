import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { serviceNoticeSchema } from "@/schema/service-notice";
import { postServiceNotice } from "@/app/api/setting";
import { ServiceNoticePostReq } from "@/app/api/dto/setting";

export const usePostServiceNotice = (onSuccess: () => void) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof serviceNoticeSchema>>({
    resolver: zodResolver(serviceNoticeSchema),
  });
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ANNOUNCEMENT);

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true); // 로딩 시작
    let newData: ServiceNoticePostReq;
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (data.file) {
        const fileArray = await onPostS3PresignedUrl([data.file]);
        const newImage = fileArray[0];
        newData = {
          ...data,
          file: newImage,
        };
        await postServiceNotice(newData);
      } else if (data.file === undefined) {
        newData = data as ServiceNoticePostReq;
        await postServiceNotice(newData);
      }
      alert("공지가 등록되었습니다");
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false); // 로딩 종료
    }
  });

  return { onSubmit, form, loading };
};
