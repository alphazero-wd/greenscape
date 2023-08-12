"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { DropzoneState, ErrorCode } from "react-dropzone";
import { toast } from "react-hot-toast";

interface DropzoneProps {
  children: React.ReactNode;
  state: DropzoneState;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  children,
  state: {
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    inputRef,
  },
}) => {
  useEffect(() => {
    if (fileRejections.length > 0) {
      const errors = fileRejections.map((r) => r.errors).flat();
      const errorCodes = Array.from(new Set(errors.map((e) => e.code)));
      toast.error(
        <ul>
          {errorCodes.map((code) => {
            switch (code) {
              case ErrorCode.FileTooLarge:
                return <li>Image sizes are too large</li>;
              case ErrorCode.FileInvalidType:
                return <li>Image types are invalid</li>;
              default:
                return <></>;
            }
          })}
        </ul>,
      );
    }
  }, [fileRejections]);

  return (
    <section className="container">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-4 text-gray-700 shadow-sm",
          (isFocused || isDragActive) &&
            "border-dashed border-gray-900 bg-gray-100",
        )}
      >
        <input ref={inputRef} {...getInputProps()} />
        {children}
      </div>
    </section>
  );
};
