import { Domain } from "@/app/api/dto/s3";
import { postS3PresignedUrl, uploadS3File } from "@/app/api/s3";
import { useState } from "react";

// s3 presigned url 요청 후 파일 업로드
export const usePostS3PresignedUrl = (domain: Domain) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPostS3PresignedUrl = async (files: File[]) => {
    setLoading(true);
    try {
      const data = {
        fileName: files.map((file) => file.name),
        domain,
      };
      const res = await postS3PresignedUrl(data);
      const allUploadS3Files = res.urls.map((url, index) => {
        return uploadS3File(url.presignedUrl, files[index]);
      });

      await Promise.all(allUploadS3Files);

      const uploadedFileUrls = res.urls.map((url) => url.fileUrl);
      return uploadedFileUrls;
    } catch (error) {
      console.error(error);
      throw new Error("파일 업로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { onPostS3PresignedUrl, loading, postS3PresignedUrl };
};
