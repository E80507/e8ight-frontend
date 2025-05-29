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
          "relative subtitle-2 p-0 px-[9px] text-center subtitle-2 focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-[#FF6668] [&:has([aria-selected])]:text-white",
          props.mode === "range"
            ? "[&:has(>.day-range-start)]:rounded-l-full [&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-middle)]:bg-[#FF6668] [&:has(>.day-range-middle)]:text-white"
            : "[&:has([aria-selected])]:rounded-full",
        ),
        day: cn("size-[30px] p-0 font-normal aria-selected:opacity-100"),
        day_range_start: "day-range-start bg-[#FF6668] rounded-full text-white",
        day_range_end: "day-range-end bg-[#FF6668] rounded-full text-white",
        day_selected: "text-primary-foreground hover:text-primary-foreground",
        day_today: "border border-black rounded-[2px] text-accent-foreground",
        day_outside: "day-outside text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "day-range-middle bg-[#FF6668] text-white",
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
