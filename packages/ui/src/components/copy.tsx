"use client";

import { Check, Clipboard } from "lucide-react";
import React from "react";
import { Tooltip, TooltipTrigger } from "./tooltip";

interface CopyProps {
  text: string;
}

export const Copy = ({ text }: CopyProps) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopy = async (value: string) => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    }
  };

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger
        onClick={() => handleCopy(text)}
        className="hover:bg-muted/50 pointer-events-auto flex cursor-pointer items-center justify-center rounded-md p-1.5 transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-600" />
        ) : (
          <Clipboard className="text-muted-foreground hover:text-foreground h-3.5 w-3.5" />
        )}
      </TooltipTrigger>
    </Tooltip>
  );
};
