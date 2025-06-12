import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LoadIcon } from "../shared/loading/loading";
import Image from "next/image";

const buttonVariants = cva(
  "flex w-full items-center justify-center whitespace-nowrap rounded-[100px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:text-black/40",
  {
    variants: {
      variant: {
        default: "bg-primary text-white disabled:bg-primary/10",
        pink: "bg-[#FF6668] text-white",
        destructive: "bg-destructive text-destructive-foreground",
        outline:
          "border bg-white text-black disabled:bg-component-natural disabled:text-label-alternative",
        "outline-black": "border border-black disabled:border-gray-300",
        outlineGray:
          "border bg-white text-black disabled:bg-component-natural disabled:text-label-alternative hover:bg-[#F7F8FA] active:bg-label-disabled",
      },
      size: {
        default: "h-12 px-[15px] pretendard-title-s",
        sm: "h-[30px] max-w-max px-3 py-1 subtitle-3",
        md: "h-[37px] w-[80px] px-4 py-2 title-s",
        lg: "h-[48px] w-[120px] px-6 py-3 title-s",
        cta: "h-[59px] w-[240px] title-s",
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
    {
      className,
      variant,
      size,
      shape,
      loading,
      loadColor,
      asChild = false,
      ...props
    },
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
const iconButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        normal: "",
        outline:
          "rounded-full border border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-50",
        fill: "rounded-full bg-white hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-50",
      },
      size: {
        xs: "size-[18px]",
        sm: "size-[24px]",
        md: "size-[40px]",
      },
    },
    defaultVariants: {
      variant: "normal",
      size: "md",
    },
  },
);
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  src: string;
  width: number;
  height: number;
  badgeContent?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      src,
      width,
      height,
      asChild = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="inline-flex">
        <Comp
          className={cn(iconButtonVariants({ variant, size }), className)}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          <Image
            src={src}
            alt={`${src}-icon`}
            width={width}
            height={height}
            className={`${disabled ? "opacity-20" : "opacity-100"} `}
            style={{ width: width, height: height }}
          />
        </Comp>
      </div>
    );
  },
);
IconButton.displayName = "IconButton";

export { Button, buttonVariants, IconButton };
