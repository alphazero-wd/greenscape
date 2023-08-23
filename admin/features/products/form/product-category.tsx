import { Category } from "@/features/categories/types";
import { FormControl, FormField, FormItem, FormMessage } from "@/features/ui";
import { UseFormReturn } from "react-hook-form";
import { CreateProductDto } from "../types";
import { CategoriesInput } from "./categories-input";
import { FormSection } from "./form-section";

interface ProductCategoryProps {
  form: UseFormReturn<CreateProductDto, any, undefined>;
  categories: Category[];
}

export const ProductCategory: React.FC<ProductCategoryProps> = ({
  form,
  categories,
}) => {
  return (
    <FormSection
      heading="Category"
      description="Classify the product for filter purposes"
    >
      <FormField
        control={form.control}
        name="categoryIds"
        render={() => (
          <FormItem className="sm:col-span-3">
            <FormControl>
              <CategoriesInput
                onSelect={(ids) => form.setValue("categoryIds", ids)}
                categoryIds={form.getValues("categoryIds")}
                categories={categories}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  );
};
