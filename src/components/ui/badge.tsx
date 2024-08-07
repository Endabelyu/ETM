import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-6 py-0.5 text-xs font-semibold  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ",
  {
    variants: {
      variant: {
        default: "border-transparent text-primary-foreground ",
        priorityLow:
          "border-transparent bg-priorityLow text-priorityLow-foreground hover:bg-priorityLow/80",
        priorityMedium:
          "border-transparent bg-priorityMedium text-priorityMedium-foreground hover:bg-priorityMedium/80",
        priorityHigh:
          "border-transparent bg-priorityHigh text-priorityHigh-foreground hover:bg-priorityHigh/80",
        statusTodo:
          "border-transparent bg-statusTodo text-statusTodo-foreground hover:bg-statusTodo/80",
        statusDoing:
          "border-transparent bg-statusDoing text-statusDoing-foreground hover:bg-statusDoing/80",
        statusDone:
          "border-transparent bg-statusDone text-statusDone-foreground hover:bg-statusDone/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
