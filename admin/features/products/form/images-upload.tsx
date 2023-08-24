import { Dropzone, Label } from "@/features/ui";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { DropzoneState } from "react-dropzone";
import { FormSection } from "./form-section";

interface ImagesUploadProps {
  dropzoneState: DropzoneState;
}

export const ImagesUpload: React.FC<ImagesUploadProps> = ({
  dropzoneState,
}) => {
  return (
    <FormSection
      heading="Images"
      description="Upload some high-quality images of the product"
    >
      <div className="col-span-full">
        <Dropzone state={dropzoneState}>
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex items-center text-sm leading-6 text-gray-600">
              <Label>Upload a file</Label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </Dropzone>
      </div>
    </FormSection>
  );
};
