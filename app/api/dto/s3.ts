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

export interface S3FileMetadata {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType?: string;
}

export interface UploadS3MetadataResponse {
  savedFile: { id: string };
}

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
