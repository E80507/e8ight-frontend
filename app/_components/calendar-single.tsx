"use client";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
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
  className?: string;
};

const CalendarDouble = ({ date, setDate, className }: CalendarDoubleProps) => {
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
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-[400px] rounded-sm border relative h-[48px] text-[15px] px-3 items-center justify-between text-left",
            className,
          )}
        >
          <span className="flex gap-3 pretendar-body-2">
            <input
              type="text"
              readOnly
              value={
                range && range.from
                  ? formattedDate(range.from, "INPUT_DATE")
                  : "연도. 월. 일"
              }
              placeholder="Start date"
              className="max-w-[80px] bg-transparent focus:outline-none"
            />
            <span>~</span>
            <input
              type="text"
              readOnly
              value={
                range && range.to
                  ? formattedDate(range.to, "INPUT_DATE")
                  : "연도. 월. 일"
              }
              placeholder="End date"
              className="max-w-[80px] bg-transparent focus:outline-none"
            />
          </span>
          <CalendarIcon className="absolute inset-y-0 right-0 my-auto ml-auto mr-3 size-[19px] text-black" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[999]" align="start">
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
