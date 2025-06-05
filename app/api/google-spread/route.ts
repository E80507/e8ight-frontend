import { GoogleAuth } from "google-auth-library";
import { NextResponse } from "next/server";

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const privateKey = process.env.SPREADSHEET_PRIVATE_KEY as string;
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/values/테스트!A1:append`;

    const result = await client.request({
      url,
      method: "POST",
      data: {
        values: [data.values],
      },
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        valueInputOption: "USER_ENTERED", // 문자열을 구글 시트의 수식, 날짜 또는 숫자로 파싱하는 옵션
      },
    });

    // 응답이 성공적으로 완료되지 않은 경우
    if (result.status !== 200) {
      console.error(
        `Google Sheets API Error: ${result.status} ${result.statusText}`,
      );
      return NextResponse.json(
        {
          error: `Google Sheets API Error: ${result.status} ${result.statusText}`,
        },
        { status: result.status },
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}