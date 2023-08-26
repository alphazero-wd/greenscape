import { Category } from "@/features/categories/types";
import { FormControl, FormField, FormItem, FormMessage } from "@/features/ui";
import { UseFormReturn } from "react-hook-form";
import { CategoriesSelect } from "../components";
import { ProductFormDto } from "../types";
import { FormSection } from "./form-section";

interface ProductCategoryProps {
  form: UseFormReturn<ProductFormDto, any, undefined>;
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
        name="categoryId"
        render={() => (
          <FormItem className="sm:col-span-3">
            <FormControl>
              <CategoriesSelect
                onSelect={(id) => form.setValue("categoryId", id)}
                categoryId={form.getValues("categoryId")}
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
