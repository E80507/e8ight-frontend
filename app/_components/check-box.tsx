"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FilterName from "./table/filter-name";

interface CheckBoxProps {
  noBottomBorder?: string;
  conditions: {
    value: string;
    label: string;
  }[];
  label?: string;
  checkboxClass?: string;
  handleChangeValue: (data: string) => void;
}

const CheckBox = ({
  noBottomBorder,
  checkboxClass,
  conditions,
  label,
  handleChangeValue,
}: CheckBoxProps) => {
  const [selected, setSelected] = useState(conditions[0]?.value ?? "");

  const onChange = (val: string) => {
    if (!val) return; // 빈 문자열로 선택 해제되는 경우 방지
    setSelected(val);
    handleChangeValue(val);
  };

  return (
    <div
      className={`flex h-[72px] ${
        noBottomBorder ? "border-x" : "border-x border-b"
      } ${checkboxClass}`}
    >
      {label && <FilterName name={label} />}
      <div className="flex pl-5">
        <ToggleGroup
          value={selected}
          onValueChange={onChange}
          type="single"
          className="gap-[24px]"
        >
          {conditions.map((condition) => (
            <ToggleGroupItem
              key={condition.value}
              hasIcon
              value={condition.value}
              aria-label={condition.value}
            >
              <p className="mt-px subtitle-m">{condition.label}</p>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default CheckBox;
