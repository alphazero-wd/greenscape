import { FilePreview, ProductImage } from "@/features/products/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/ui/card";
import { memo } from "react";
import { DropzoneState } from "react-dropzone";
import { MAX_FILES } from "../constants";
import { ImageDropzone } from "./image-dropzone";
import { PreviewImage } from "./preview-image";

interface ImagesUploadProps {
  dropzoneState: DropzoneState;
  files: FilePreview[];
  existingImages?: ProductImage[];
  deleteImage: (url: string) => void;
}

export const ImagesUpload: React.FC<ImagesUploadProps> = memo(
  ({ dropzoneState, files, existingImages = [], deleteImage }) => {
    return (
      <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>
            Upload 4 images displaying the product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {existingImages.length > 0 ? (
              <PreviewImage
                deleteImage={deleteImage}
                url={existingImages[0].file.url}
                size="lg"
              />
            ) : files.length > 0 ? (
              <PreviewImage
                deleteImage={deleteImage}
                url={files[0].preview}
                size="lg"
              />
            ) : (
              <ImageDropzone dropzoneState={dropzoneState} />
            )}
            <div className="grid grid-cols-3 gap-2">
              {existingImages.slice(1).map((image) => (
                <PreviewImage
                  deleteImage={deleteImage}
                  key={image.file.id}
                  size="sm"
                  url={image.file.url}
                />
              ))}
              {files.slice(1).map((file) => (
                <PreviewImage
                  deleteImage={deleteImage}
                  key={file.preview}
                  size="sm"
                  url={file.preview}
                />
              ))}

              {(files.length > 0 || existingImages.length > 0) &&
                files.length + existingImages.length < MAX_FILES && (
                  <ImageDropzone dropzoneState={dropzoneState} />
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);
