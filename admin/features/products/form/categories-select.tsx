import { CategoriesCheckboxMenu } from "@/features/categories/menu";
import { Category } from "@/features/categories/types";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import { FormField } from "@/features/ui/form";
import { Separator } from "@/features/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { ProductFormDto } from "../types";

interface CategoriesSelectProps {
  form: UseFormReturn<ProductFormDto, any, undefined>;
  categories: Category[];
  loading: boolean;
}

export const CategoriesSelect = ({
  form,
  categories,
  loading,
}: CategoriesSelectProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="categoryIds"
          render={({ field }) => (
            <CategoriesCheckboxMenu
              trigger={
                <Button
                  variant="outline"
                  type="button"
                  disabled={loading}
                  className="gap-2"
                >
                  Select categories
                  <Separator orientation="vertical" />
                  <Badge variant="secondary" className="rounded-sm">
                    {field.value.length} selected
                  </Badge>
                </Button>
              }
              categories={categories}
              selectedCategories={field.value}
              onChange={(newValues) =>
                form.setValue("categoryIds", newValues as number[])
              }
              field="id"
            />
          )}
        />
      </CardContent>
    </Card>
  );
};
