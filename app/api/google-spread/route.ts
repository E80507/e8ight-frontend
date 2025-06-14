// Node.js OpenSSL 설정
if (process.env.NODE_ENV === "production") {
  process.env.NODE_OPTIONS = "--openssl-legacy-provider";
}

import { GoogleAuth } from "google-auth-library";
import { NextResponse } from "next/server";

interface GoogleSheetsError {
  response?: {
    status?: number;
    statusText?: string;
    data?: unknown;
  };
  message: string;
}

interface GoogleSheetsResponse {
  data: {
    values?: string[][];
  };
}

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
const privateKey = process.env.SPREADSHEET_PRIVATE_KEY as string;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(
      "[구글 스프레드시트 API] 요청 데이터:",
      JSON.stringify(data, null, 2),
    );
    const { type = "contact", values } = data;
    console.log("[구글 스프레드시트 API] 처리 중인 요청 타입:", type);
    console.log(
      "[구글 스프레드시트 API] 데이터 값:",
      JSON.stringify(values, null, 2),
    );

    if (
      !process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_EMAIL ||
      !privateKey ||
      !process.env.NEXT_PUBLIC_SPREADSHEET_ID
    ) {
      console.error("[구글 스프레드시트 API] 환경 변수 누락:", {
        hasEmail: !!process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_EMAIL,
        hasKey: !!privateKey,
        hasSheetId: !!process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      });
      throw new Error("필수 환경 변수가 설정되지 않았습니다.");
    }

    // 시트 이름 결정
    const sheetName = encodeURIComponent(
      process.env.NEXT_PUBLIC_SHEET_NAME || "",
    );
    console.log(
      "[구글 스프레드시트 API] 선택된 시트 이름:",
      process.env.NEXT_PUBLIC_SHEET_NAME,
    );

    if (!sheetName) {
      throw new Error("시트 이름이 설정되지 않았습니다.");
    }

    console.log("[구글 스프레드시트 API] 구글 인증 초기화 중...");
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: SCOPES,
    });

    console.log("[구글 스프레드시트 API] 인증 클라이언트 생성 중...");
    const client = await auth.getClient();

    try {
      let url;
      if (type === "contact") {
        // K열의 데이터를 먼저 확인
        const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/values/${sheetName}!K:K`;
        const checkResponse = (await client.request({
          url: checkUrl,
          method: "GET",
        })) as GoogleSheetsResponse;

        // J열의 마지막 데이터 위치 + 1 을 시작점으로 사용
        const lastRow = checkResponse.data.values
          ? checkResponse.data.values.length
          : 0;
        url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/values/${sheetName}!K${lastRow + 1}:append`;
      } else {
        url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/values/${sheetName}!A1:append`;
      }

      const result = await client.request({
        url,
        method: "POST",
        data: {
          values: [values],
        },
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          valueInputOption: "USER_ENTERED",
        },
      });
      console.log("[구글 스프레드시트 API] API 응답 상태:", result.status);
      console.log(
        "[구글 스프레드시트 API] API 응답 데이터:",
        JSON.stringify(result.data, null, 2),
      );

      return NextResponse.json({ success: true, data: result.data });
    } catch (apiError: unknown) {
      const error = apiError as GoogleSheetsError;
      console.error("[구글 스프레드시트 API] API 호출 오류:", {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: error.message,
      });
      return NextResponse.json(
        {
          error: "구글 스프레드시트 API 호출 실패",
          details: {
            message: error.message,
            response: error?.response?.data,
          },
        },
        { status: error?.response?.status || 500 },
      );
    }
  } catch (error: unknown) {
    const err = error as Error & {
      code?: string;
      library?: string;
      reason?: string;
      opensslErrorStack?: string[];
    };

    console.error("[구글 스프레드시트 API] 예외 발생:", err);
    console.error("[구글 스프레드시트 API] 오류 상세 정보:", {
      이름: err.name,
      메시지: err.message,
      스택: err.stack,
      코드: err.code,
      라이브러리: err.library,
      원인: err.reason,
      OpenSSL_오류스택: err.opensslErrorStack,
    });

    return NextResponse.json(
      {
        error: "구글 스프레드시트 API 처리 중 오류가 발생했습니다.",
        details: {
          message: err.message,
          code: err.code,
          library: err.library,
          reason: err.reason,
        },
      },
      { status: 500 },
    );
  }
}
