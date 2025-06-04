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
  const [range, setRange] = useState<DateRange | undefined>({
    from: date?.start,
    to: date?.end,
  });
  const [isOpen, setIsOpen] = useState(false);

  // 현재 날짜
  const currentDate = new Date();

  // 날짜 변경 핸들러
  const onSelectRange = (newRange: DateRange | undefined) => {
    if (!newRange) return;

    const { from, to } = newRange;
    setRange(newRange);

    // 시작일과 종료일이 모두 선택된 경우에만 상태 업데이트하고 팝오버 닫기
    if (from && to) {
      setDate({
        start: from,
        end: to,
      });
      setIsOpen(false);
    } else if (from) {
      // 시작일만 선택된 경우 팝오버 유지
      setDate({
        start: from,
        end: undefined,
      });
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-[400px] rounded-sm border relative h-[48px] text-[15px] px-3 items-center justify-between text-left",
            className,
          )}
        >
          <span className="flex gap-3 pretendard-body-2">
            <input
              type="text"
              readOnly
              value={
                range?.from
                  ? formattedDate(range.from, "INPUT_DATE")
                  : "연도-월-일"
              }
              placeholder="Start date"
              className="max-w-[100px] bg-transparent focus:outline-none"
            />
            <span>~</span>
            <input
              type="text"
              readOnly
              value={
                range?.to ? formattedDate(range.to, "INPUT_DATE") : "연도-월-일"
              }
              placeholder="End date"
              className="max-w-[100px] bg-transparent focus:outline-none"
            />
          </span>
          <CalendarIcon className="absolute inset-y-0 right-0 my-auto ml-auto mr-3 size-[19px] text-black" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[999]" align="start">
        <Calendar
          formatters={{ formatCaption, formatWeekdayName }}
          mode="range"
          disabled={(date) => date > currentDate}
          selected={range}
          onSelect={onSelectRange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarDouble;
