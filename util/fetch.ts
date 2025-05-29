import { LOGIN_PAGE } from "@/constants/path";

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

// postRefresh 함수는 새로운 accessToken을 받아오는 함수
const postRefresh = async () => {
  try {
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="))
      ?.split("=")[1];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!response.ok) {
      throw new CustomError(response.status, "토큰 재발급에 실패했습니다.");
    }

    const data = await response.json();
    document.cookie = `accessToken=${data.accessToken}; path=/`; // 새 토큰을 쿠키에 저장
    return data.accessToken;
  } catch (error) {
    // 쿠키 만료 시키기
    document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    // 로컬 스토리지 유저 정보 삭제
    localStorage.removeItem("user");
    window.location.href = LOGIN_PAGE;
    throw error instanceof CustomError
      ? error
      : new CustomError(500, "토큰 재발급 중 알 수 없는 오류가 발생했습니다.");
  }
};

// apiFetch 함수에 responseType 추가
export const apiFetch = async (
  url: string,
  options: RequestInit = {},
  responseType: "json" | "blob" = "json", // 기본값을 'json'으로 설정
  noOption?: boolean,
  noRedirect?: boolean,
) => {
  const getAccessTokenFromCookie = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
  };

  let token = getAccessTokenFromCookie();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const fullUrl = `${baseUrl}${url}`;

  const fetchWithToken = async (token: string | undefined) => {
    const headers = noOption
      ? {
          Authorization: `Bearer ${token}`,
          ...options.headers,
        }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        };
    const fetchOptions = { ...options, headers };
    return fetch(fullUrl, fetchOptions);
  };

  try {
    let response = await fetchWithToken(token);

    // 401 Unauthorized 처리
    if (response.status === 401 && !noRedirect) {
      try {
        token = await postRefresh(); // 새 토큰 발급 시도
        response = await fetchWithToken(token); // 새 토큰으로 재시도
      } catch (refreshError) {
        throw refreshError; // postRefresh 내에서 처리됨
      }
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new CustomError(
        response.status,
        errorMessage || "API 호출 중 오류 발생",
      );
    }

    // 응답을 'json' 또는 'blob'으로 처리
    return responseType === "blob"
      ? await response.blob()
      : response && response.ok
        ? response.headers.get("Content-Type")?.includes("application/json")
          ? await response.json()
          : null
        : null;
  } catch (error) {
    console.error("Fetch error:", error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, "API 호출 중 알 수 없는 오류가 발생했습니다.");
  }
};
