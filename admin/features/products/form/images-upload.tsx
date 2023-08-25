import { FilePreview } from "@/features/types";
import { Dropzone, Label } from "@/features/ui";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { DropzoneState } from "react-dropzone";
import { FormSection } from "./form-section";

interface ImagesUploadProps {
  dropzoneState: DropzoneState;
  files: FilePreview[];
}

export const ImagesUpload: React.FC<ImagesUploadProps> = ({
  dropzoneState,
  files,
}) => {
  return (
    <FormSection
      heading="Images"
      description="Upload some high-quality images of the product"
    >
      <div className="col-span-full space-y-3">
        <Dropzone state={dropzoneState}>
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
              <Label>Upload images</Label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              Only 4 images at max. Accept PNG, JPG up to 5MB
            </p>
          </div>
        </Dropzone>
        <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
          {files.map((file) => (
            <Image
              alt="Preview images"
              src={file?.preview || ""}
              width={0}
              height={0}
              className="aspect-square h-auto w-full rounded object-cover"
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file?.preview || "");
              }}
            />
          ))}
        </div>
      </div>
    </FormSection>
  );
};
