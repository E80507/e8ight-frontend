import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  SERVICE_DESCRIPTION,
  SERVICE_NAME,
  SERVICE_URL,
} from "@/constants/service";

const FAVICON_URL = "/svg/icon/favicon.svg";
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
      path: "./fonts/Gibson-Semibold.woff2",
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
        className={`${gibson.variable} w-screen min-w-full overflow-x-hidden bg-white font-gibson antialiased`}
      >
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
