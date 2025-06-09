"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

interface QuillViewerProps {
  content?: string;
  className?: string;
}

export default function QuillViewer({
  content = "",
  className = "",
}: QuillViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current && content) {
      viewerRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div
      ref={viewerRef}
      className={`quill-viewer ql-editor prose max-w-none ${className}`}
    />
  );
}
