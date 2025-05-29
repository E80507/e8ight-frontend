"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  height?: string;
}

export default function QuillEditor({
  value = "",
  onChange,
  placeholder = "내용을 입력하세요...",
  height = "300px",
}: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Quill 인스턴스 초기화 (한 번만 실행)
  useEffect(() => {
    if (!isMounted || !editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    // 텍스트 변경 이벤트 리스너
    quillRef.current.on("text-change", () => {
      if (quillRef.current && onChange) {
        const content = quillRef.current.root.innerHTML;
        onChange(content);
      }
    });

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
      }
    };
  }, [isMounted, placeholder, onChange]);

  // 값 변경 처리 (별도 useEffect)
  useEffect(() => {
    if (!quillRef.current || !value) return;

    const currentContent = quillRef.current.root.innerHTML;
    if (currentContent !== value) {
      const selection = quillRef.current.getSelection();
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
      if (selection) {
        quillRef.current.setSelection(selection);
      }
    }
  }, [value]);

  if (!isMounted) {
    return (
      <div className="rounded-md border border-gray-300" style={{ height }}>
        <div className="flex h-full items-center justify-center text-gray-500">
          에디터 로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="quill-editor-container">
      <div
        ref={editorRef}
        style={{ height }}
        className="rounded-md border border-gray-300"
      />
    </div>
  );
}
