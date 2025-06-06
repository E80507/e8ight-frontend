import { apiFetch } from "@/util/fetch";
import {
  S3PostPresignedUrlReq,
  S3PostPresignedUrlRes,
  S3FileMetadata,
  UploadS3MetadataResponse,
  GetPresignedUrlReq,
  GetPresignedUrlRes,
} from "./dto/s3";

// s3 presigned url 요청
export const postS3PresignedUrl = async (
  req: S3PostPresignedUrlReq,
): Promise<S3PostPresignedUrlRes> => {
  try {
    const res = await apiFetch("/s3/upload/presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY as string,
      },
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

//s3 파일 업로드 완료후 메타데이터 저장
export const uploadS3FileMetadata = async (
  req: S3FileMetadata,
): Promise<UploadS3MetadataResponse> => {
  try {
    const res = await apiFetch("/s3/upload/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_ADMIN_KEY as string,
      },
      body: JSON.stringify(req),
    });
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// s3 파일 다운로드 요청
export const getPresignedUrls = async (
  data: GetPresignedUrlReq,
): Promise<GetPresignedUrlRes> => {
  return apiFetch("/s3/download/presigned-url", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
