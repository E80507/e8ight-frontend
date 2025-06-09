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
      const icons = Quill.import("ui/icons") as Record<string, string>;
      icons["image"] =
        `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.4258 20.3203L19.4648 13.7812C18.9375 13.3125 18.3281 13.0547 17.6953 13.0547C17.0508 13.0547 16.4766 13.2773 15.9375 13.7578L10.6406 18.4922L8.47266 16.5352C7.98047 16.0898 7.44141 15.8672 6.89062 15.8672C6.36328 15.8672 5.87109 16.0781 5.37891 16.5234L0.914062 20.5547C0.984375 22.6758 1.85156 23.7539 3.59766 23.7539H23.2383C25.3594 23.7539 26.4258 22.5703 26.4258 20.3203ZM8.73047 13.8984C10.2422 13.8984 11.4844 12.6562 11.4844 11.1328C11.4844 9.62109 10.2422 8.36719 8.73047 8.36719C7.20703 8.36719 5.96484 9.62109 5.96484 11.1328C5.96484 12.6562 7.20703 13.8984 8.73047 13.8984ZM3.67969 24.5742H23.9531C26.4141 24.5742 27.6328 23.3672 27.6328 20.9531V6.63281C27.6328 4.21875 26.4141 3 23.9531 3H3.67969C1.23047 3 0 4.21875 0 6.63281V20.9531C0 23.3672 1.23047 24.5742 3.67969 24.5742ZM3.70312 22.6875C2.53125 22.6875 1.88672 22.0664 1.88672 20.8477V6.73828C1.88672 5.51953 2.53125 4.88672 3.70312 4.88672H23.9297C25.0898 4.88672 25.7461 5.51953 25.7461 6.73828V20.8477C25.7461 22.0664 25.0898 22.6875 23.9297 22.6875H3.70312Z" fill="#A7A9B4"/>
        </svg>
      `;
      icons["bold"] =
        `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.98047 22.7578H15.0859C18.6719 22.7578 20.9336 20.8711 20.9336 17.9766C20.9336 15.6914 19.2812 14.0391 16.9023 13.9102V13.8164C18.8477 13.5469 20.1719 12.082 20.1719 10.2188C20.1719 7.60547 18.168 6 14.9219 6H8.98047C7.72656 6 7 6.73828 7 8.02734V20.7422C7 22.0195 7.72656 22.7578 8.98047 22.7578ZM10.8672 20.0508V15.3984H13.8086C15.8594 15.3984 17.0078 16.1953 17.0078 17.6953C17.0078 19.2305 15.9062 20.0508 13.8906 20.0508H10.8672ZM10.8672 12.9609V8.75391H13.75C15.3906 8.75391 16.3633 9.50391 16.3633 10.793C16.3633 12.1523 15.2852 12.9609 13.457 12.9609H10.8672Z" fill="#A7A9B4"/>
        </svg>
        `;
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
      <div ref={editorRef} style={{ height }} className="rounded-b-md" />
    </div>
  );
}
