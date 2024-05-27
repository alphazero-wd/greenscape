import { CategoriesCheckboxMenu } from "@/features/categories/menu";
import { Category } from "@/features/categories/types";
import { Badge } from "@/features/ui/badge";
import { Button } from "@/features/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/ui/card";
import { FormField } from "@/features/ui/form";
import { Separator } from "@/features/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { searchCategory } from "../../categories/utils";
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
              onChange={(newValues) => {
                const categoryIdsWithParents = new Set<number>();
                for (const value of newValues) {
                  const [path] = searchCategory(categories, value, "id");
                  path.forEach((category) => {
                    if (!categoryIdsWithParents.has(category.id))
                      categoryIdsWithParents.add(category.id);
                  });
                }

                form.setValue(
                  "categoryIds",
                  Array.from(categoryIdsWithParents),
                );
              }}
              field="id"
            />
          )}
        />
      </CardContent>
    </Card>
  );
};
