"use client";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface CopyButtonProps {
  text: string;
  content: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, content }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>{text}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(content);
              setIsCopied(true);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5" />
            ) : (
              <ClipboardIcon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
