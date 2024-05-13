"use client";

import { Category } from "@/features/categories/types";
import { Form } from "@/features/ui/form";
import React, { useEffect } from "react";
import { ProductFormFields } from "../form";
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
      <form onSubmit={handleSubmit}>
        <ProductFormFields
          categories={categories}
          form={form}
          loading={loading}
        />
      </form>
    </Form>
  );
};
