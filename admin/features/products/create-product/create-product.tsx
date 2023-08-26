"use client";

import { Category } from "@/features/categories/types";
import { Button, Form } from "@/features/ui";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  FormSection,
  ImagesUpload,
  ProductCategory,
  ProductFinal,
  ProductOverview,
} from "../form";
import { useCreateProduct } from "./use-create-product";

interface CreateProductProps {
  categories: Category[];
}

export const CreateProduct: React.FC<CreateProductProps> = ({ categories }) => {
  const { loading, form, handleSubmit, files, dropzoneState } =
    useCreateProduct();

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
        <FormSection
          heading="Images"
          description="Upload some high-quality images of the product"
        >
          <ImagesUpload files={files} dropzoneState={dropzoneState} />
          <div className="relative col-span-full grid grid-cols-2 gap-4 lg:grid-cols-4">
            {files.map((file) => (
              <Image
                key={file.webkitRelativePath}
                alt="Preview images"
                src={file?.preview || ""}
                width={0}
                height={0}
                className="h-auto w-full rounded object-contain"
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file?.preview || "");
                }}
              />
            ))}
          </div>
        </FormSection>
        <ProductFinal form={form} />
        <Button disabled={loading} className="mt-8" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};
