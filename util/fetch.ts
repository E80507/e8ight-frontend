export class CustomError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = "CustomError";
  }
}

export const apiFetch = async (
  url: string,
  options: RequestInit = {},
  responseType: "json" | "blob" = "json", // 기본 응답 타입
) => {
  const baseUrl = "api"; //process.env.NEXT_PUBLIC_SERVER_URL;
  const fullUrl = `${baseUrl}${url}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new CustomError(
        response.status,
        errorMessage || "API 호출 중 오류 발생",
      );
    }

    // 응답 타입에 따라 처리
    return responseType === "blob"
      ? await response.blob()
      : response.headers.get("Content-Type")?.includes("application/json")
        ? await response.json()
        : null;
  } catch (error) {
    console.error("Fetch error:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, "API 호출 중 알 수 없는 오류가 발생했습니다.");
  }
};
