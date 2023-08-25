import { cn } from "@/lib/utils";
import React from "react";

interface FormSectionProps {
  children: React.ReactNode;
  heading: string;
  description: string;
  isLast?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  children,
  heading,
  description,
  isLast = false,
}) => {
  return (
    <div className={cn("pb-12", !isLast && "border-b border-gray-900/10")}>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {heading}
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {children}
      </div>
    </div>
  );
};
