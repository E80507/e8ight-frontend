export interface GetPresignedUrlReq {
  fileUrls: string[];
}

export interface PresignedUrlInfo {
  presignedUrl: string;
  fileUrl: string;
}

export interface GetPresignedUrlRes {
  urls: PresignedUrlInfo[];
}
