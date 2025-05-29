import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LoadIcon } from "../shared/loading/loading";

const buttonVariants = cva(
  "flex w-full items-center justify-center whitespace-nowrap rounded-[100px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:text-black/40",
  {
    variants: {
      variant: {
        default: "bg-primary text-white disabled:bg-primary/10",
        pink: "bg-[#FF6668] text-white",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border bg-white text-black disabled:bg-gray-100",
        "outline-black": "border border-black disabled:border-gray-300",
      },
      size: {
        default: "h-12 px-[15px] heading-4",
        sm: "h-[30px] max-w-max px-3 py-1 subtitle-3",
        md: "w-[80px] h-[37px] px-4 py-2 title-s",
        lg: "w-[120px] lg:w-[160px] h-[48px] px-6 py-3 title-s",
        cta: "w-[240px] h-[59px] title-s",
        icon: "size-9",
      },
      shape: {
        round: "rounded-[100px]",
        square: "rounded-[8px]",
      },
    },
    defaultVariants: {
      shape: "square",
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean; // 로딩 중인지 여부
  "data-state"?: "on" | "off" | "closed";
  loadColor?: "red" | "white";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, shape, loading, loadColor, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <>
        {loading ? (
          <Comp
            disabled={loading}
            className={cn(
              buttonVariants({ variant, size, shape, className }),
              "relative",
              loadColor === "white" ? "disabled:border-primary/400" : "",
            )}
            ref={ref}
            {...props}
          >
            <LoadIcon type="button" color={loadColor ?? "red"} />
          </Comp>
        ) : (
          <Comp
            className={cn(buttonVariants({ variant, size, shape, className }))}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  },
);
Button.displayName = "Button";
export { Button, buttonVariants };
