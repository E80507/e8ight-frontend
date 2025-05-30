import Image from "next/image";
import { cn } from "@/lib/utils";

interface CheckProps {
  type: "circle" | "square";
  isChecked?: boolean;
}

const Check = ({ type, isChecked = false }: CheckProps) => {
  const rounded = type === "circle" ? "rounded-full" : "rounded-[2px]";

  return (
    <div
      className={cn(
        `${rounded} flex size-[18px] items-center justify-center transition-all`,
        isChecked ? "bg-primary border-primary" : "bg-white border-gray-300",
      )}
    >
      <Image
        className={cn(
          "transition-opacity duration-200",
          isChecked ? "opacity-0" : "opacity-100",
        )}
        src="/svg/icon/check-white.svg"
        alt="체크 아이콘"
        width={20}
        height={20}
      />
      <Image
        className={cn(
          "absolute transition-opacity duration-200",
          isChecked ? "opacity-100" : "opacity-0",
        )}
        src="/svg/icon/check.svg"
        alt="체크 아이콘"
        width={20}
        height={20}
      />
    </div>
  );
};

export default Check;
