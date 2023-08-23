"use client";

import { Category } from "@/features/categories/types";
import { Color } from "@/features/colors/types";
import { Size } from "@/features/sizes/types";
import { Button, Form } from "@/features/ui";
import React from "react";
import { ProductCategory, ProductOverview, ProductVariants } from "../form";
import { useCreateProduct } from "./use-create-product";

interface CreateProductProps {
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

export const CreateProduct: React.FC<CreateProductProps> = ({
  categories,
  colors,
  sizes,
}) => {
  const { loading, form, handleSubmit } = useCreateProduct();

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-12">
          <ProductOverview loading={loading} form={form} />
          <ProductCategory form={form} categories={categories} />
          <ProductVariants form={form} colors={colors} sizes={sizes} />
          <Button className="mt-8" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};
