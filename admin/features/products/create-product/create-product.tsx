"use client";

import { Category } from "@/features/categories/types";
import { Button, Form } from "@/features/ui";
import React from "react";
import { useDropzone } from "react-dropzone";
import { ImagesUpload, ProductCategory, ProductOverview } from "../form";
import { useCreateProduct } from "./use-create-product";

interface CreateProductProps {
  categories: Category[];
}

export const CreateProduct: React.FC<CreateProductProps> = ({ categories }) => {
  const { loading, form, handleSubmit } = useCreateProduct();
  const state = useDropzone({
    multiple: true,
    maxFiles: 5,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-12">
          <ProductOverview loading={loading} form={form} />
          <ProductCategory form={form} categories={categories} />
          <ImagesUpload dropzoneState={state} />
          <Button className="mt-8" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};
