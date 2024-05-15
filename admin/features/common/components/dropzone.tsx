"use client";

import { cn } from "@/lib/utils";
import { ChangeEventHandler, useEffect } from "react";
import { DropzoneState, ErrorCode } from "react-dropzone";
import { toast } from "react-hot-toast";

interface DropzoneProps {
  children: React.ReactNode;
  state: DropzoneState;
  loading?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  children,
  state: { fileRejections, getRootProps, getInputProps, inputRef },
  className,
  loading = false,
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
              case ErrorCode.TooManyFiles:
                return <li>Too many files uploaded</li>;
              default:
                return <></>;
            }
          })}
        </ul>,
      );
    }
  }, [fileRejections]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-md border border-dashed",
        loading && "cursor-not-allowed bg-gray-100",
        className,
      )}
    >
      <input disabled={loading} ref={inputRef} {...getInputProps()} />
      {children}
    </div>
  );
};
