"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";
import Radio from "../radio";

const ToggleGroupContext = React.createContext<{
  size: "default" | "sm" | "lg";
}>({
  size: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(
  (
    { className, variant, size, value, onValueChange, children, ...props },
    ref,
  ) => (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      onValueChange={onValueChange}
      ref={ref}
      className={cn("flex items-center p-0 justify-center gap-3", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, value }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  ),
);

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants> & {
      hasIcon?: boolean;
    }
>(({ className, children, value, hasIcon, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const isChecked = context.value === value; // ✅ value만 사용

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-full justify-start min-w-max p-0 subtitle-2 items-center flex gap-3 relative",
        className,
      )}
      {...props}
    >
      {hasIcon && <Radio isChecked={isChecked} />}
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
