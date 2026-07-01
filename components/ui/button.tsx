"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-ink-900 text-paper hover:bg-flame-500 hover:shadow-[0_8px_30px_-12px_rgba(255,77,46,0.6)]",
        flame:
          "bg-flame-500 text-paper hover:bg-flame-600 hover:shadow-[0_8px_30px_-12px_rgba(255,77,46,0.8)]",
        ghost:
          "border border-ink-900/15 text-ink-900 hover:bg-ink-900/5",
        outline:
          "border border-input bg-background text-ink-900 hover:bg-accent hover:text-accent-foreground",
        link:
          "text-ink-900 underline-offset-4 hover:text-flame-500 hover:underline px-0",
        // shadcn variants used by the design editor
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-7 py-3.5 text-base",
        xl: "px-9 py-4 text-base",
        default: "h-10 px-4 py-2 text-sm",
        icon: "h-8 w-8 shrink-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
