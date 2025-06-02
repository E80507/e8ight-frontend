import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "bottom-border";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant = "default", ...props }, ref) => {
    const baseClass =
      "flex w-full transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-black focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:text-black/40";

    const variants = {
      default:
        "border rounded-md border-black/10 px-4 py-3 pretendard-body-2  placeholder:text-[#8B909C] ",
      "bottom-border":
        "border-b border-gray-strong py-4 pl-10 placeholder:text-label-alternative font-pretendard body-1",
    };

    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex border rounded-md w-full border-black/10 px-4 py-3 pretendard-body-2 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#8B909C] focus-visible:border-black focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:text-black/40 placeholder:text-[#C8C9D0]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
