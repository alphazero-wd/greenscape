import { Dropzone } from "@/features/common/components";
import { Upload } from "lucide-react";
import { DropzoneState } from "react-dropzone";

interface ImageDropzoneProps {
  dropzoneState: DropzoneState;
}

export const ImageDropzone = ({ dropzoneState }: ImageDropzoneProps) => {
  return (
    <Dropzone state={dropzoneState}>
      <Upload className="h-4 w-4 text-muted-foreground" />
      <span className="sr-only">Upload</span>
    </Dropzone>
  );
};
