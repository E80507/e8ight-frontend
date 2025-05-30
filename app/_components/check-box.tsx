import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FilterName from "./table/filter-name";

interface CheckBoxProps {
  noBottomBorder?: string; // 하단 보더 여부
  conditions: {
    value: string;
    label: string;
  }[]; // 체크박스 조건
  label?: string; // 라벨 이름
  checkboxClass?: string; // 추가 CSS 클래스
  handleChangeValue: (data: string) => void; // 값 변경 핸들러
}

const CheckBox = ({
  noBottomBorder,
  checkboxClass,
  conditions,
  label,
  handleChangeValue,
}: CheckBoxProps) => {
  return (
    <div
      className={`flex h-[72px] ${
        noBottomBorder ? "border-x" : "border-x border-b"
      } ${checkboxClass}`}
    >
      {label && <FilterName name={label} />}
      <div className="flex pl-5">
        <ToggleGroup
          defaultValue={conditions[0]?.value}
          onValueChange={handleChangeValue} // 값 변경 핸들러 연결
          type="single"
          className="gap-[24px]"
        >
          {conditions.map((condition) => (
            <ToggleGroupItem
              key={condition.value}
              hasIcon
              checkType="circle"
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
