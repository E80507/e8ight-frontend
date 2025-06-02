import { cn } from "@/lib/utils";

export type BadgeColor = "green" | "blue" | "red" | "yellow";

interface BadgeProps {
  text: string;
  color: BadgeColor;
  className?: string;
}

const colorVariants = {
  green: "bg-[#C3E9E4]",
  blue: "bg-[#BDCDF4]",
  red: "bg-[#F4BDBD]",
  yellow: "bg-[#FFE9A0]",
};

const Badge = ({ text, color, className }: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center py-[4px] px-[8px] rounded-[8px] pretendard-subtitle-s",
        colorVariants[color],
        className,
      )}
    >
      {text}
    </div>
  );
};

export default Badge;
