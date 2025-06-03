"use client";

import { useState, useEffect } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default function AdminAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("adminAuth");
    if (stored === "true") {
      setIsAuthed(true);
    }
  }, []);

  const handleSubmit = () => {
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      setIsAuthed(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  if (!isAuthed) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="비밀번호 입력"
          className="rounded border p-2"
        />
        <button
          onClick={handleSubmit}
          className="mt-2 rounded bg-black px-4 py-2 text-white"
        >
          확인
        </button>
      </div>
    );
  }

  // 인증된 경우 children(어드민 페이지) 노출
  return <>{children}</>;
}
