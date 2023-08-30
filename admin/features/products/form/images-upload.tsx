import { FilePreview } from "@/features/types";
import { Dropzone, Label } from "@/features/ui";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { DropzoneState } from "react-dropzone";

interface ImagesUploadProps {
  dropzoneState: DropzoneState;
  files: FilePreview[];
}

export const ImagesUpload: React.FC<ImagesUploadProps> = ({
  dropzoneState,
}) => {
  return (
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
            Accept PNG, JPG up to 5MB with aspect ratio of 1 / 1
          </p>
        </div>
      </Dropzone>
    </div>
  );
};
