import { getPresignedUrls } from "@/api/s3";

export const useDownloadFiles = () => {
  const downloadFiles = async (fileUrls: string[]) => {
    try {
      const { urls } = await getPresignedUrls({ fileUrls });
      
      // 각 파일에 대해 presigned URL로 다운로드 실행
      await Promise.all(
        urls.map(async ({ presignedUrl, fileUrl }) => {
          const response = await fetch(presignedUrl);
          if (!response.ok) {
            throw new Error(`Failed to download file: ${fileUrl}`);
          }

          const contentType = response.headers.get("Content-Type");
          const blob = await response.blob();
          
          // 파일 이름 추출 (URL의 마지막 부분)
          const fileName = decodeURIComponent(fileUrl.split("/").pop() || "download");
          
          // 다운로드 링크 생성 및 클릭
          const link = document.createElement("a");
          const blobUrl = window.URL.createObjectURL(
            new Blob([blob], { type: contentType || "application/octet-stream" })
          );
          link.href = blobUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl); // 메모리 해제
        }),
      );

      return true;
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
      return false;
    }
  };

  return { downloadFiles };
}; 