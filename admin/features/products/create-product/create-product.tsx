"use client";

import { Category } from "@/features/categories/types";
import { Button, Form } from "@/features/ui";
import React, { useEffect } from "react";
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
        <ImagesUpload files={files} dropzoneState={dropzoneState} />
        <ProductPreview form={form} />
        <Button className="mt-8" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};
