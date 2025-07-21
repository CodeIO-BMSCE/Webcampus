"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils"; // Adjust path based on your setup

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground hover:text-foreground",
        underline:
          "border-b-2 border-transparent hover:border-muted-foreground data-[state=active]:border-foreground text-muted-foreground data-[state=active]:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Tabs = TabsPrimitive.Root;
const TabsList = TabsPrimitive.List;

const TabsTrigger = ({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>) => (
  <TabsPrimitive.Trigger
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
);

const TabsContent = TabsPrimitive.Content;

export { Tabs, TabsList, TabsTrigger, TabsContent };
