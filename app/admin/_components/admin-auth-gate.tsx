"use client";

import { Button } from "@/components/ui/button";
import { SERVICE_NAME } from "@/constants/service";
import { useState, useEffect } from "react";
import { z } from "zod";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_KEY;
import Image from "next/image";
import { adminAuthSchema } from "@/schema/auth";

export default function AdminAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 이미 인증된 경우 건너뛰기
  useEffect(() => {
    const stored = localStorage.getItem("adminAuth");

    if (stored === "true") {
      setIsAuthed(true);
    }
  }, []);

  // 인증 코드 입력 후 로그인 버튼 클릭 시 실행
  const handleSubmit = () => {
    try {
      adminAuthSchema.parse({ code: input });
      setError(null);

      if (input === ADMIN_PASSWORD) {
        localStorage.setItem("adminAuth", "true");
        setIsAuthed(true);
      } else {
        setError("올바른 인증코드를 입력해주세요.");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  // 인증 코드 입력 후 엔터 키 입력 시 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (!isAuthed) {
    return (
      <div className="fixed inset-0 z-[102] flex items-center justify-center bg-black/60 px-5">
        <div className="flex w-full max-w-[350px] flex-col rounded-[12px] bg-white shadow-custom-gray">      
          <div className="flex flex-col justify-center gap-[8px] px-[16px] pt-[24px] pb-[16px]">
            {/* 로고 */}
            <Image
              src="/svg/logo.svg"
              alt={SERVICE_NAME}
              width={64}
              height={43}
              priority
              className="mx-auto"
            />

            {/* 인증 코드 입력 안내 문구 */}
            <p className="pretendard-title-l text-center">인증 코드를 입력해주세요</p>
          
            <div className="flex flex-col gap-[8px]">
              {/* 인증 코드 입력 필드 */}
              <input
                type="password"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="인증코드"
                className={`rounded-[8px] h-[48px] px-[16px] border w-full pretendard-body-2 ${error ? "border-[#D11111]" : "border-[#D6D6D6]"}`}
              />

              {/* 에러 메시지 */}
              {error && <p className="pretendard-subtitle-s text-[#D11111]">{error}</p>}
            </div>
          </div>

          {/* 로그인 버튼 */}
          <div className="px-4 pb-4">
            <Button onClick={handleSubmit} className="w-full h-[48px]">
              로그인
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 인증된 경우 children(어드민 페이지) 노출
  return <>{children}</>;
}