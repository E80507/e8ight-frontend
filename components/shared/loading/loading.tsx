"use client";

import { AlertCircleIcon, LoaderIcon } from "lucide-react";
import { ReactNode, Suspense } from "react";
import ErrorBoundary from "../error-boundary";

export const LoadIcon = ({
  type,
  color,
}: {
  type?: "button";
  color?: "red" | "white";
}) => {
  return (
    <div
      className={`absolute inset-0 flex size-full items-center justify-center`}
    >
      {type === "button" ? (
        <LoaderIcon
          className={`animate-spin duration-1000 ${
            type === "button"
              ? color === "red"
                ? "size-5 text-white web:size-6"
                : "size-5 text-primary web:size-6"
              : "text-primary"
          }`}
        />
      ) : (
        <LoaderIcon
          className={`size-[30px] animate-spin text-primary duration-1000`}
        />
      )}
    </div>
  );
};

const Loading = ({ children }: { children?: ReactNode }) => {
  if (children) {
    return (
      <ErrorBoundary
        fallback={
          <div className="absolute inset-0 flex items-center justify-center overflow-x-hidden text-black/50">
            <span className="px-1">
              <AlertCircleIcon />
            </span>
            <span>정보를 받아오지 못했어요</span>
          </div>
        }
      >
        <Suspense fallback={<LoadIcon />}>{children}</Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <LoadIcon />
    </div>
  );
};

export default Loading;
