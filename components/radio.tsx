import Image from "next/image";
import { cn } from "@/lib/utils";

interface RadioProps {
  isChecked?: boolean;
}

const Radio = ({ isChecked = false }: RadioProps) => {
  return (
    <div
      className={cn(
        `rounded-full flex size-[18px] items-center justify-center transition-all`,
        isChecked ? "bg-primary border-primary" : "bg-white border-gray-300",
      )}
    >
      <Image
        className={cn(
          "transition-opacity duration-200",
          isChecked ? "opacity-0" : "opacity-100",
        )}
        src="/svg/icon/radio-white.svg"
        alt="라디오 아이콘"
        width={20}
        height={20}
      />
      <Image
        className={cn(
          "absolute transition-opacity duration-200",
          isChecked ? "opacity-100" : "opacity-0",
        )}
        src="/svg/icon/radio.svg"
        alt="라디오 아이콘"
        width={20}
        height={20}
      />
    </div>
  );
};

export default Radio;
