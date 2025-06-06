"use client";
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "heading-4",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "default" }),
          "size-10 bg-transparent p-0  text-black",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "px-[9px] flex gap-[18px]",
        head_cell:
          "text-muted-foreground rounded-md w-[30px] font-normal text-[0.8rem]",
        row: "flex my-[10px] w-full",
        cell: cn(
          "relative subtitle-2 text-center subtitle-2 focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-start)]:rounded-l-[8px] [&:has(>.day-range-end)]:rounded-r-[8px] [&:has(>.day-range-middle)]:bg-[#F2EDFD] [&:has(>.day-range-middle)]:text-white [&:has(>.day-range-start)]:pl-0 [&:has(>.day-range-start)]:ml-[9px] [&:has(>.day-range-start)]:pr-[9px] [&:has(>.day-range-end)]:px-0 [&:has(>.day-range-end)]:mr-[9px] [&:has(>.day-range-end)]:pl-[9px] [&:not(:has(>.day-range-start)):not(:has(>.day-range-end))]:px-[9px]"
            : "[&:has([aria-selected])]:rounded-[8px] px-[9px]",
          "[&:has([aria-selected])]:bg-[#F2EDFD] [&:has([aria-selected])]:text-white",
        ),
        day: cn("size-[30px] p-0 font-normal aria-selected:opacity-100"),
        day_range_start:
          "day-range-start bg-[#6025E1] rounded-[8px] text-white",
        day_range_end: "day-range-end bg-[#6025E1] rounded-[8px] text-white",
        day_selected: "text-primary-foreground hover:text-primary-foreground",
        day_today: "border border-black rounded-[8px] text-accent-foreground",
        day_outside: "day-outside text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "day-range-middle bg-[#F2EDFD] text-black",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({}) => <ChevronLeftIcon className="size-4 text-black" />,
        IconRight: ({}) => <ChevronRightIcon className="size-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
