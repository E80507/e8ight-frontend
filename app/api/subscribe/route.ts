import { GoogleAuth } from "google-auth-library";
import { NextResponse } from "next/server";

const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
const privateKey = process.env.SPREADSHEET_PRIVATE_KEY as string;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 현재 날짜 및 시간 포맷팅
    const now = new Date();
    const formatDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SPREADSHEET_ID}/values/뉴스레터!A1:append`;

    const result = await client.request({
      url,
      method: "POST",
      data: {
        values: [[formatDate, email]],
      },
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        valueInputOption: "USER_ENTERED",
      },
    });

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 },
    );
  }
} 