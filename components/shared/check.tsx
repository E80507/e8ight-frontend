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
        `${rounded} flex tablet:size-[24px] size-[20px] items-center justify-center transition-all`,
        isChecked ? "bg-primary border-primary" : "bg-white border-gray-300"
      )}
    >
      <Image
        className={cn(
          "transition-opacity duration-200 w-[20px] h-[20px] tablet:w-[24px] tablet:h-[24px]",
          isChecked ? "opacity-0" : "opacity-100"
        )}
        src="/svg/icon/check-white.svg"
        alt="체크 아이콘"
        width={24}
        height={24}
      />

      <Image
        className={cn(
          "absolute transition-opacity duration-200 w-[20px] h-[20px] tablet:w-[24px] tablet:h-[24px]",
          isChecked ? "opacity-100" : "opacity-0"
        )}
        src="/svg/icon/check.svg"
        alt="체크 아이콘"
        width={24}
        height={24}
      />
    </div>
  );
};

export default Check;
