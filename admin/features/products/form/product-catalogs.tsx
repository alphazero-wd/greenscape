import { Category } from "@/features/categories/types";
import { Color } from "@/features/colors/types";
import { Size } from "@/features/sizes/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui";
import { UseFormReturn } from "react-hook-form";
import { CreateProductDto } from "../types";
import { CategoriesInput } from "./categories-input";
import { ColorsInput } from "./colors-input";
import { SizesInput } from "./sizes-input";

interface ProductCatalogsProps {
  form: UseFormReturn<CreateProductDto, any, undefined>;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

export const ProductCatalogs: React.FC<ProductCatalogsProps> = ({
  form,
  categories,
  colors,
  sizes,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="categoryIds"
        render={() => (
          <FormItem className="py-4">
            <FormLabel className="flex-1">Product category</FormLabel>
            <FormControl>
              <CategoriesInput form={form} categories={categories} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="colorIds"
        render={() => (
          <FormItem className="py-4">
            <FormLabel className="block flex-1">Product colors</FormLabel>
            <FormControl>
              <ColorsInput colors={colors} form={form} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sizeIds"
        render={() => (
          <FormItem className="py-4">
            <FormLabel className="block flex-1">Product sizes</FormLabel>
            <FormControl>
              <SizesInput sizes={sizes} form={form} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
