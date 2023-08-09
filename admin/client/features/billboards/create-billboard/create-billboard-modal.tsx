"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FeaturedSwitch, ImageUpload } from "../form";
import { useCreateBillboard } from "./use-create-billboard";
import { useCreateBillboardModal } from "./use-create-billboard-modal";

export const CreateBillboardModal = () => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [isFeatured, setIsFeatured] = useState(true);
  const { isOpen, onClose } = useCreateBillboardModal();
  const { loading, createBillboard } = useCreateBillboard({
    image: files[0] as File,
    isFeatured,
  });

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
    if (!isOpen) setFiles([]);
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create billboard</DialogTitle>
          <DialogDescription>
            Create new billboard to promote your brand and products
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createBillboard} className="space-y-4">
          <ImageUpload dropzoneState={dropzoneState} files={files} />
          <FeaturedSwitch
            isFeatured={isFeatured}
            onCheckedChange={setIsFeatured}
          />

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
        </form>
      </DialogContent>
    </Dialog>
  );
};
