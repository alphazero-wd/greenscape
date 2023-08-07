"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dropzone,
} from "@/features/ui";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCreateBillboardModal } from "./use-create-billboard-modal";

interface CreateBillboardModalProps {
  storeId: string;
}

const loading = false;
export const CreateBillboardModal: React.FC<CreateBillboardModalProps> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const dropzoneState = useDropzone({
    maxSize: Math.pow(1024, 2) * 2,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const { isOpen, onClose } = useCreateBillboardModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create billboard</DialogTitle>
          <DialogDescription>
            Create new billboard to promote your brand and products
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <div className="flex items-center gap-x-4">
            <Button
              onClick={onClose}
              disabled={loading}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
