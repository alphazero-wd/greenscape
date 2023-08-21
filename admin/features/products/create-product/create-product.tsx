"use client";

import { Category } from "@/features/categories/types";
import { Color } from "@/features/colors/types";
import { Size } from "@/features/sizes/types";
import { Button, Form } from "@/features/ui";
import React, { useState } from "react";
import { ProductCatalogs, ProductOverview } from "../form";
import { steps } from "../utils";
import { Steps } from "./steps";
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
  const [curStep, setCurStep] = useState(0);
  const { loading, form, handleSubmit } = useCreateProduct();

  let stepForm = null;

  if (curStep === 0)
    stepForm = <ProductOverview loading={loading} form={form} />;

  if (curStep === 1)
    stepForm = (
      <ProductCatalogs
        sizes={sizes}
        form={form}
        colors={colors}
        categories={categories}
      />
    );

  return (
    <>
      <Steps curStep={curStep} />
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          {stepForm}
          <div className="mt-3 space-x-3">
            <Button
              onClick={() => setCurStep(curStep - 1)}
              type="button"
              variant="secondary"
              disabled={curStep == 0}
            >
              Back
            </Button>
            {curStep === steps.length - 1 ? (
              <Button type="submit">Create</Button>
            ) : (
              <Button onClick={() => setCurStep(curStep + 1)} type="button">
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
