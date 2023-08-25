"use client";

import { ChangeEventHandler, useEffect } from "react";
import { DropzoneState, ErrorCode } from "react-dropzone";
import { toast } from "react-hot-toast";

interface DropzoneProps {
  children: React.ReactNode;
  state: DropzoneState;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  children,
  state: { fileRejections, getRootProps, getInputProps, inputRef },
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
    <section className="container">
      <div
        {...getRootProps()}
        className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
        <input ref={inputRef} {...getInputProps()} />
        {children}
      </div>
    </section>
  );
};
