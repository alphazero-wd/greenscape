"use client";
import React, { useState } from "react";
import { Label } from "@/features/ui";
import { cn } from "@/lib/utils";

export const CollapsibleDesc = ({ desc }: { desc: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="mt-6">
      <Label>Description</Label>
      <p
        className={cn(
          !isExpanded && "line-clamp-6",
          "whitespace-pre-wrap text-sm leading-[1.7142857] text-gray-500"
        )}
      >
        {desc}
      </p>
      <span
        className="block cursor-pointer text-sm hover:underline font-medium text-blue-500 hover:text-blue-400"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Read more"}
      </span>
    </div>
  );
};
