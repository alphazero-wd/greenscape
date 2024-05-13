import { Category } from "@/features/categories/types";
import { UseFormReturn } from "react-hook-form";
import { ProductFormDto } from "../types";
import { CategoriesSelect } from "./categories-select";
import { ProductOverview } from "./overview";

interface ProductFormFieldsProps {
  form: UseFormReturn<ProductFormDto, any, undefined>;
  categories: Category[];
  loading: boolean;
}

export const ProductFormFields = ({
  form,
  loading,
  categories,
}: ProductFormFieldsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
        <ProductOverview form={form} loading={loading} />
        <CategoriesSelect
          form={form}
          categories={categories}
          loading={loading}
        />
      </div>
    </div>
  );
};
