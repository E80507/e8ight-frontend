import FilterName from "@/app/_components/table/filter-name";
import { useState, useEffect } from "react";

interface InputShortRowProps {
  label: string; // 행 제목
  value: string | number; // 행 값
  isLastRow?: boolean; // 마지막 행 여부
  size?: "sm" | "md";
  rowClass?: string;
  noBorder?: boolean;
  buttonText?: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const InputShortRow = ({
  label,
  value,
  size,
  isLastRow,
  rowClass,
  noBorder,
  onChange,
  disabled,
}: InputShortRowProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
    // console.log("value", value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={`flex ${isLastRow ? "border-b" : ""} ${noBorder ? "" : "border-x border-t"} ${rowClass}`}
    >
      <FilterName size={size ?? "sm"} name={label} />
      <div
        className={`flex w-full items-center truncate px-3 ${size === "sm" ? "caption" : "body-2"}`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="w-full rounded-md border bg-transparent p-2 disabled:bg-gray-100"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
export default InputShortRow;
