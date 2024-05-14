import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MAX_FILES } from "../constants";
import { FilePreview } from "../types";

export const useImagesUpload = (numberOfExistingFiles = 0) => {
  const [files, setFiles] = useState<FilePreview[]>([]);

  const dropzoneState = useDropzone({
    multiple: true,
    maxSize: Math.pow(1024, 2) * 5, // 5MB
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles
          .slice(0, MAX_FILES - numberOfExistingFiles - files.length)
          .map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
      ]);
    },
  });

  const clearFiles = () => {
    setFiles([]);
  };

  const createFilesFormData = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    return formData;
  };

  const deleteFile = (url: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.preview !== url));
  };

  return { dropzoneState, files, clearFiles, createFilesFormData, deleteFile };
};
