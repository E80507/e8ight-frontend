import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FilterName from "./table/filter-name";
import { subDays } from "date-fns";
import CalendarSingle, { searchDate } from "./calendar-single";
import { useState, useEffect } from "react";

interface DurationBoxProps {
  noBottomBorder?: boolean;
  handleFilterChange: (start?: Date, end?: Date) => void; // Updated handler type
}

const conditions = [
  { label: "15일", value: "half-month" },
  { label: "1개월", value: "month" },
  { label: "3개월", value: "three-month" },
  { label: "선택", value: "custom" },
];

const DurationBox = ({
  noBottomBorder,
  handleFilterChange,
}: DurationBoxProps) => {
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });
  const [selectedCondition, setSelectedCondition] = useState<string>(
    conditions[0].value,
  );

  useEffect(() => {
    if (date && selectedCondition === "custom" && date.start && date.end) {
      // 'date.end'에 하루를 더한 값으로 업데이트
      const newEndDate = new Date(date.end);
      newEndDate.setDate(newEndDate.getDate() + 1); // 하루 더하기

      handleFilterChange(date.start, newEndDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedCondition]);

  const handleConditionChange = (value: string) => {
    setSelectedCondition(value);
    if (value === "half-month") {
      handleFilterChange(subDays(new Date(), 15), new Date());
    } else if (value === "month") {
      handleFilterChange(subDays(new Date(), 30), new Date());
    } else if (value === "three-month") {
      handleFilterChange(subDays(new Date(), 90), new Date());
    } else {
      handleFilterChange(undefined, undefined); // Reset if "선택"
    }
  };

  // 기본값을 15일로 초기화
  useEffect(() => {
    handleConditionChange("half-month");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex h-[54px] ${noBottomBorder ? "border-x" : "border-x border-b"}`}
    >
      <FilterName name="기간 검색" />
      <ToggleGroup
        defaultValue={conditions[0].value}
        type="single"
        className="gap-2 pl-5"
        onValueChange={handleConditionChange}
      >
        {conditions.map((condition) => (
          <ToggleGroupItem
            className="flex h-[30px] w-[55px] items-center justify-center border button-s [&[data-state='on']]:border-black"
            key={condition.value}
            value={condition.value}
            aria-label={condition.value}
          >
            <p className="mt-px">{condition.label}</p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="ml-2 flex shrink-0 items-center gap-2">
        {selectedCondition === "custom" && date && (
          <CalendarSingle date={date} setDate={setDate} />
        )}
      </div>
    </div>
  );
};

export default DurationBox;
