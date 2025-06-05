// 파일 타입을 검사하는 함수
export const checkFileType = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function (event) {
      if (event.target && event.target.readyState === FileReader.DONE) {
        const arrayBuffer = event.target.result;
        if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
          const bytes = new Uint8Array(arrayBuffer);
          const header = bytes.reduce(
            (acc, byte) => acc + byte.toString(16).padStart(2, "0"),
            "",
          );
          switch (header) {
            case "89504e47": // PNG 파일 시그니처
              resolve("image/png");
              break;
            case "25504446": // PDF 파일 시그니처
              resolve("application/pdf");
              break;
            case "66747970": // AVIF 또는 기타 ISO 기반 형식
              resolve("image/avif or similar");
              break;
            case "ffd8ffe0": // JPG 파일 시그니처
            case "ffd8ffe1": // JPG 파일 시그니처
            case "ffd8ffe2": // JPG 파일 시그니처
              resolve("image/jpeg");
              break;
            // 필요한 경우 다른 파일 형식에 대한 시그니처 추가
            default:
              resolve("Unknown file type");
          }
        } else {
          reject(new Error("파일을 읽는 데 실패했습니다"));
        }
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(0, 4)); // 처음 4바이트만 읽기
  });
};

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
