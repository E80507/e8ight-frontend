import { GetPresignedUrlReq, GetPresignedUrlRes } from "./dto/s3";
import { apiFetch } from "@/util/fetch";

export const getPresignedUrls = async (
  data: GetPresignedUrlReq,
): Promise<GetPresignedUrlRes> => {
  return apiFetch("/s3/download/presigned-url", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
