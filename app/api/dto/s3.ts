export enum Domain {
  ANNOUNCEMENT = "ANNOUNCEMENT",
}

export interface S3PostPresignedUrlReq {
  domain: Domain;
  fileName: string[];
}

export interface S3PostPresignedUrlRes {
  urls: {
    presignedUrl: string;
    fileUrl: string;
  }[];
}
