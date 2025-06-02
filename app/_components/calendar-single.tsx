"use client";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import {
  formatCaption,
  formatWeekdayName,
} from "@/components/ui/date-formatter";
import formattedDate from "@/util/date";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export type searchDate =
  | { start: Date | undefined; end: Date | undefined }
  | undefined;

type CalendarDoubleProps = {
  date: searchDate;
  setDate: (data: searchDate) => void;
};

const CalendarDouble = ({ date, setDate }: CalendarDoubleProps) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<
    | {
        from: Date | undefined;
        to: Date | undefined;
      }
    | undefined
    | DateRange
  >({
    from: date?.start,
    to: date?.end,
  });

  // 현재 날짜
  const currentDate = new Date();

  // 날짜 변경 핸들러
  const onSelectRange = (newRange: undefined | DateRange) => {
    if (newRange) {
      const { from, to } = newRange;
      setRange({ from, to });
      setDate({ start: from, end: to });

      // 시작일과 종료일이 모두 선택되었을 때 팝업을 닫습니다
      if (from && to) {
        setOpen(false);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "w-[400px] rounded-sm border relative h-[48px] text-[15px] px-3 flex items-center justify-between cursor-pointer",
          )}
        >
          <span className="flex gap-[1px] subtitle-3">
            <input
              type="text"
              readOnly
              value={
                range && range.from
                  ? `${formattedDate(range.from, "YEAR")}/${formattedDate(range.from, "MONTH")}/${formattedDate(range.from, "DAY")}`
                  : "연도/월/일"
              }
              placeholder="Start date"
              className="max-w-[80px] bg-transparent focus:outline-none cursor-pointer"
            />
            <span>~</span>
            <input
              type="text"
              readOnly
              value={
                range && range.to
                  ? `${formattedDate(range.to, "YEAR")}/${formattedDate(range.to, "MONTH")}/${formattedDate(range.to, "DAY")}`
                  : "연도/월/일"
              }
              placeholder="End date"
              className="max-w-[80px] bg-transparent focus:outline-none cursor-pointer"
            />
          </span>
          <CalendarDays className="absolute inset-y-0 right-0 my-auto ml-auto mr-3 size-[19px] text-black" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          formatters={{ formatCaption, formatWeekdayName }}
          mode="range"
          disabled={(date) => date > currentDate} // 현재 날짜 이후는 선택 불가
          selected={range}
          onSelect={onSelectRange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarDouble;
