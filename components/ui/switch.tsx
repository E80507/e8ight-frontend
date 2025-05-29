"use client";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    isChecked: boolean;
  }
>(({ className, isChecked, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex w-[78px] h-[31px] shrink-0 cursor-pointer py-[2px] px-[1px] items-center rounded-full duration-200 border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#FF6668] data-[state=unchecked]:bg-gray-300",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-[27px] rounded-full bg-white shadow-lg ring-0 duration-200 ease-in transition-all data-[state=checked]:translate-x-[45px] data-[state=unchecked]:translate-x-0",
      )}
    />
    <p
      className={cn(
        "absolute transform heading-6 opacity-0 transition-all duration-500",
        isChecked
          ? "pl-4 left-0 text-white opacity-100"
          : "right-0 pr-4 text-black opacity-100",
      )}
    >
      {isChecked ? "작가" : "일반"}
    </p>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
