import FilterName from "@/app/_components/table/filter-name";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
interface ShortRowProps {
  label: string; // 행 제목
  value: string | number; // 행 값
  isLastRow?: boolean; // 마지막 행 여부
  size?: "sm" | "md";
  children?: ReactNode;
  rowClass?: string;
  noBorder?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const ShortRow = ({
  label,
  value,
  size,
  isLastRow,
  children,
  rowClass,
  noBorder,
  buttonText,
  onClick,
}: ShortRowProps) => {
  return (
    <div
      className={`flex ${isLastRow ? "border-b" : ""} ${noBorder ? "" : "border-x border-t"} ${rowClass}`}
    >
      <FilterName size={size ?? "sm"} name={label} />
      <div
        className={`flex w-full items-center truncate px-5 ${size === "sm" ? "caption" : "body-2"}`}
      >
        {children ?? value}
        {buttonText === "배송 취소" && (
          <Button
            type="button"
            variant="outline-black"
            size="sm"
            className="ml-2 rounded px-2 py-1"
            onClick={onClick}
          >
            배송 취소
          </Button>
        )}
      </div>
    </div>
  );
};
export default ShortRow;
