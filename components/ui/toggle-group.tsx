"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";
import Radio from "../radio";

type ToggleSize = "default" | "sm" | "lg";
type ToggleVariant = "default" | "outline";

interface ToggleGroupContextValue {
  size: ToggleSize;
  variant?: ToggleVariant;
  value?: string;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
});

type BaseToggleGroupProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
  "type" | "value" | "onValueChange" | "defaultValue"
> &
  VariantProps<typeof toggleVariants>;

interface SingleToggleGroupProps extends BaseToggleGroupProps {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  SingleToggleGroupProps
>(
  (
    {
      className,
      variant,
      size = "default",
      value,
      onValueChange,
      defaultValue,
      children,
      ...props
    },
    ref,
  ) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn("flex items-center p-0 justify-center gap-3", className)}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{
          size: size as ToggleSize,
          variant: variant as ToggleVariant | undefined,
          value,
        }}
      >
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
  const isChecked = context.value === value;

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        toggleVariants({
          variant: (context.variant || variant || "default") as ToggleVariant,
          size: (context.size || size || "default") as ToggleSize,
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
