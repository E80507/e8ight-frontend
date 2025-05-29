import { apiFetch } from "@/util/fetch";
import { S3PostPresignedUrlReq, S3PostPresignedUrlRes } from "./dto/s3";

// s3 presigned url 요청
export const postS3PresignedUrl = async (
  req: S3PostPresignedUrlReq,
): Promise<S3PostPresignedUrlRes> => {
  try {
    const res = await apiFetch("/s3/upload/presigned-url", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// s3 파일 업로드
export const uploadS3File = async (
  presignedUrl: string,
  file: File,
): Promise<void> => {
  try {
    await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
