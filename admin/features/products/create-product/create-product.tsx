"use client";

import { Category } from "@/features/categories/types";
import { FilePreview } from "@/features/types";
import { Button, Form } from "@/features/ui";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  ImagesUpload,
  ProductCategory,
  ProductOverview,
  ProductPreview,
} from "../form";
import { useCreateProduct } from "./use-create-product";

interface CreateProductProps {
  categories: Category[];
}

export const CreateProduct: React.FC<CreateProductProps> = ({ categories }) => {
  const { loading, form, handleSubmit } = useCreateProduct();
  const [files, setFiles] = useState<FilePreview[]>([]);
  const state = useDropzone({
    multiple: true,
    maxFiles: 4,
    maxSize: Math.pow(1024, 2) * 5, // 5MB
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
    return () =>
      files.forEach((file) => URL.revokeObjectURL(file?.preview || ""));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-12">
        <ProductOverview loading={loading} form={form} />
        <ProductCategory form={form} categories={categories} />
        <ImagesUpload files={files} dropzoneState={state} />
        <ProductPreview form={form} />
        <Button className="mt-8" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};
