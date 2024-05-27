"use client";

import { Category } from "@/features/categories/types";
import { Form } from "@/features/ui/form";
import React, { useEffect } from "react";
import {
  ProductFormFields,
  ProductFormHeader,
  ProductFormSubmit,
} from "../form";
import { Product } from "../types";
import { useEditProduct } from "./use-edit-product";

interface EditProductProps {
  categories: Category[];
  product: Product;
}

export const EditProduct: React.FC<EditProductProps> = ({
  categories,
  product,
}) => {
  const {
    loading,
    form,
    handleSubmit,
    files,
    dropzoneState,
    prevImages,
    deleteFile,
  } = useEditProduct(product);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) => URL.revokeObjectURL(file?.preview || ""));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <ProductFormHeader
            loading={loading}
            heading={product.name || "Edit product"}
          />
          <ProductFormFields
            deleteImage={deleteFile}
            files={files}
            categories={categories}
            form={form}
            loading={loading}
            dropzoneState={dropzoneState}
            existingImages={prevImages}
          />
          <ProductFormSubmit
            loading={loading}
            className="flex justify-center md:hidden"
          />
        </div>
      </form>
    </Form>
  );
};
