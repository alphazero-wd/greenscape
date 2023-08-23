import { Color } from "@/features/colors/types";
import { Size } from "@/features/sizes/types";
import React, { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProductDto } from "../types";
import { groupVariants } from "../utils";
import { ColorsInput } from "./colors-input";
import { FormSection } from "./form-section";
import { ProductVariant } from "./product-variant";
import { SizesInput } from "./sizes-input";

interface ProductVariantsProps {
  form: UseFormReturn<CreateProductDto>;
  colors: Color[];
  sizes: Size[];
}
export const ProductVariants: React.FC<ProductVariantsProps> = ({
  colors,
  sizes,
  form,
}) => {
  const [colorIds, setColorIds] = useState<number[]>([]);
  const [sizeIds, setSizeIds] = useState<number[]>([]);
  const variants = form.watch("variants");
  const groupedVariants = useMemo(() => groupVariants(variants), [variants]);

  useEffect(() => {
    if (colorIds.length === 0 && sizeIds.length === 0)
      form.setValue("variants", [
        { colorId: undefined, sizeId: undefined, price: 0.0, inStock: 0 },
      ]);
    if (colorIds.length === 0 && sizeIds.length > 0)
      form.setValue(
        "variants",
        sizeIds.map((id) => ({
          sizeId: id,
          colorId: undefined,
          price: 0.0,
          inStock: 0,
        })),
      );

    if (sizeIds.length === 0 && colorIds.length > 0)
      form.setValue(
        "variants",
        colorIds.map((id) => ({
          colorId: id,
          sizeId: undefined,
          price: 0.0,
          inStock: 0,
        })),
      );
    if (sizeIds.length > 0 && colorIds.length > 0) {
      const variants = [];
      for (let colorId of colorIds)
        for (let sizeId of sizeIds) {
          variants.push({ colorId, sizeId, price: 0.0, inStock: 0 });
        }
      form.setValue("variants", variants);
    }
  }, [colorIds, sizeIds]);

  return (
    <FormSection
      heading="Variants"
      description="Diversify the options the product has"
    >
      <div className="sm:col-span-3">
        <ColorsInput
          colors={colors}
          colorIds={colorIds}
          onSelect={(ids) => setColorIds(ids)}
        />
      </div>
      <div className="sm:col-span-3">
        <SizesInput
          sizes={sizes}
          sizeIds={sizeIds}
          onSelect={(ids) => setSizeIds(ids)}
        />
      </div>
      <ul className="col-span-full w-full space-y-4">
        {Object.entries(groupedVariants).map(([colorId, variants]) => (
          <ProductVariant
            key={colorId}
            sizes={sizes}
            colorId={colorId}
            variants={variants}
            color={colors.find((color) => color.id === +colorId)}
          />
        ))}
      </ul>
    </FormSection>
  );
};
