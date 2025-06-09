"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
// import QuillEditor from "@/components/QuillEditor";
const QuillEditor = dynamic(() => import("@/components/quill-editor"), {
  ssr: false,
});

export default function QuillTestPage() {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");

  const handleSave = () => {
    setSavedContent(content);
    alert("내용이 저장되었습니다!");
  };

  const handleClear = () => {
    setContent("");
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Quill 에디터 테스트
        </h1>
      </div>

      <div className="space-y-6">
        {/* 에디터 섹션 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">에디터</h2>
          <QuillEditor
            value={content}
            onChange={setContent}
            placeholder="여기에 내용을 입력하세요..."
            height="400px"
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSave}
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              저장
            </button>
            <button
              onClick={handleClear}
              className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
            >
              지우기
            </button>
          </div>
        </div>

        {/* 실시간 미리보기 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">실시간 HTML 출력</h2>
          <div className="rounded-md bg-gray-100 p-4">
            <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-gray-800">
              {content || "내용이 없습니다."}
            </pre>
          </div>
        </div>

        {/* 렌더링된 미리보기 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">렌더링된 미리보기</h2>
          <div
            className="prose min-h-[100px] max-w-none rounded-md border border-gray-200 p-4"
            dangerouslySetInnerHTML={{
              __html:
                content || '<p class="text-gray-500">내용이 없습니다.</p>',
            }}
          />
        </div>

        {/* 저장된 내용 */}
        {savedContent && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">저장된 내용</h2>
            <div
              className="prose max-w-none rounded-md border border-green-200 bg-green-50 p-4"
              dangerouslySetInnerHTML={{ __html: savedContent }}
            />
          </div>
        )}

        {/* 기능 설명 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">지원되는 기능</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium">텍스트 서식</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 헤더 (H1, H2, H3)</li>
                <li>• 굵게, 기울임, 밑줄, 취소선</li>
                <li>• 텍스트 색상 및 배경색</li>
                <li>• 정렬 (좌, 중앙, 우, 양쪽)</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-medium">구조 요소</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 순서있는/없는 목록</li>
                <li>• 인용구</li>
                <li>• 코드 블록</li>
                <li>• 링크 및 이미지</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
