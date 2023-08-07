"use client";
import { Dropzone, Label } from "@/features/ui";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { DropzoneState } from "react-dropzone";

interface ImageUploadProps {
  dropzoneState: DropzoneState;
  files: (File & { preview: string })[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  dropzoneState,
  files,
}) => {
  return (
    <>
      <Label>Billboard image</Label>
      <Dropzone state={dropzoneState}>
        <PhotoIcon className="mx-auto mb-4 h-12 w-12 text-gray-500" />
        <p>
          <span className="font-bold">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-gray-600">
          We support PNGs, JPEGs under 2MB
        </p>
        {files.map((file) => (
          <Image
            src={file.preview}
            alt={file.name}
            fill
            className="absolute inset-0 aspect-square rounded-lg object-cover"
            onLoad={() => URL.revokeObjectURL(file.preview)}
          />
        ))}
      </Dropzone>
    </>
  );
};
