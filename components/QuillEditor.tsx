"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
  height?: string;
}

export default function QuillEditor({
  value = "",
  onChange,
  placeholder = "내용",
  onImageUpload,
  height = "300px",
}: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const lastContentRef = useRef<string>(value);
  const [isMounted, setIsMounted] = useState(false);

  // 컴포넌트가 마운트되었을 때만 Quill 초기화
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // value prop이 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (quillRef.current && value !== lastContentRef.current) {
      lastContentRef.current = value;
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  useEffect(() => {
    if (!isMounted || !editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: {
          container: [["image"], ["bold"], [{ align: [] }]],
          handlers: {
            image: async () => {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.click();

              input.onchange = async () => {
                const file = input.files?.[0];
                if (file && onImageUpload) {
                  try {
                    const imageUrl = await onImageUpload(file);
                    const range = quillRef.current?.getSelection(true);

                    if (range && imageUrl) {
                      quillRef.current?.insertEmbed(
                        range.index,
                        "image",
                        imageUrl,
                      );
                      quillRef.current?.setSelection(range.index + 1);
                    }
                  } catch (err) {
                    console.error("이미지 업로드 실패", err);
                  }
                }
              };
            },
          },
        },
      },
    });

    // 초기 내용 설정
    if (value) {
      quillRef.current.root.innerHTML = value;
      lastContentRef.current = value;
    }

    // 텍스트 변경 이벤트 리스너
    quillRef.current.on("text-change", () => {
      if (!quillRef.current || !onChange) return;

      const html = quillRef.current.root.innerHTML;
      const content = html === "<p><br></p>" ? "" : html;

      if (content !== lastContentRef.current) {
        lastContentRef.current = content;
        onChange(content);
      }
    });
  }, [isMounted, placeholder, onChange, onImageUpload, value]);

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
    <div>
      <div
        ref={editorRef}
        style={{ height }}
        className="rounded-b-md border border-line-normal"
      />
    </div>
  );
}
