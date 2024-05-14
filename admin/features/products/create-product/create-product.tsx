"use client";

import { Category } from "@/features/categories/types";
import { Form } from "@/features/ui/form";
import React, { useEffect } from "react";
import {
  ProductFormFields,
  ProductFormHeader,
  ProductFormSubmit,
} from "../form";
import { useCreateProduct } from "./use-create-product";

interface CreateProductProps {
  categories: Category[];
}

export const CreateProduct: React.FC<CreateProductProps> = ({ categories }) => {
  const { loading, form, handleSubmit, files, dropzoneState, deleteFile } =
    useCreateProduct();

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) => URL.revokeObjectURL(file?.preview || ""));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <ProductFormHeader heading="Create new product" />
          <ProductFormFields
            deleteImage={deleteFile}
            files={files}
            categories={categories}
            form={form}
            loading={loading}
            dropzoneState={dropzoneState}
          />
          <ProductFormSubmit className="flex justify-center md:hidden" />
        </div>
      </form>
    </Form>
  );
};
