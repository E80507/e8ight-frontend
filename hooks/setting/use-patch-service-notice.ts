import { patchServiceNotice } from "@/app/api/setting";
import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceNoticePatchSchema } from "@/schema/service-notice";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { ServiceNoticePatchReq, ServiceNoticeRes } from "@/app/api/dto/setting";
import { Domain } from "@/app/api/dto/s3";

export const usePatchServiceNotice = (
  id: string,
  data: ServiceNoticeRes,
  onSuccess: () => void,
) => {
  const [loading, setLoading] = useState(false); // 로딩 상태
  const form = useForm<z.infer<typeof serviceNoticePatchSchema>>({
    resolver: zodResolver(serviceNoticePatchSchema),
    defaultValues: {
      title: data.title,
      content: data.content,
      file: data.file,
      isVisible: String(data.isVisible),
      link: data.link,
    },
  });
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ANNOUNCEMENT);

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));
      const trimmedData = {
        ...data,
        isVisible: data.isVisible === "true" ? true : false,
      };
      if (
        data.file &&
        typeof data.file !== "string" &&
        (data.file as File) instanceof File
      ) {
        const imageArray = await onPostS3PresignedUrl([data.file]);
        const newImage = imageArray[0];

        const newData = {
          ...trimmedData,
          file: newImage,
        };

        await patchServiceNotice(id, newData);
      } else {
        await patchServiceNotice(id, trimmedData as ServiceNoticePatchReq);
      }
      alert("공지가 변경되었어요");
      onSuccess();
    } catch (err: unknown) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false);
    }
  });

  return { onSubmit, form, loading };
};
