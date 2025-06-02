import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  SERVICE_DESCRIPTION,
  SERVICE_NAME,
  SERVICE_URL,
} from "@/constants/service";

const FAVICON_URL = "/favicon.ico";
const OG_IMAGE_URL = "/png/metadata/og.png";

const gibson = localFont({
  src: [
    {
      path: "./fonts/Gibson-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Gibson.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Gibson-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Gibson-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gibson",
});

const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL(SERVICE_URL),
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  icons: {
    icon: FAVICON_URL,
    shortcut: FAVICON_URL,
    apple: FAVICON_URL,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SERVICE_URL,
    siteName: SERVICE_NAME,
    title: SERVICE_NAME,
    description: SERVICE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 800,
        height: 600,
        alt: SERVICE_NAME,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${gibson.variable} ${pretendard.variable} w-screen min-w-full overflow-x-hidden bg-white font-gibson antialiased`}
      >
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
