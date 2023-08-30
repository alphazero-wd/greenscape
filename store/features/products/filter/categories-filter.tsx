import { Button, Checkbox, Label } from "@/features/ui";
import { Category, CategoryGroup } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

interface CategoriesFilterProps {
  categories: Category[];
  categoryGroups: CategoryGroup[];
}
export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categoryGroups,
  categories,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const countProductsInCategory = (cid: number) =>
    categoryGroups.find((group) => group.categoryId === cid);

  useEffect(() => {
    const categoryIds = searchParams.get("categoryIds");
    if (categoryIds)
      setSelectedCategoryIds(categoryIds.split(",").map((id) => +id));
  }, [searchParams.get("categoryIds")]);

  useEffect(() => {
    const currentQuery = qs.parse(searchParams.toString());
    if (selectedCategoryIds.length > 0)
      currentQuery.categoryIds = selectedCategoryIds.join(",");
    else delete currentQuery.categoryIds;
    const urlWithStatusQuery = qs.stringifyUrl({
      url: "/products",
      query: currentQuery,
    });
    router.push(urlWithStatusQuery);
  }, [selectedCategoryIds, router, searchParams.toString()]);

  return (
    <div>
      <Label>Categories</Label>
      <div className="mt-6 space-y-5">
        {categories.map((c) => (
          <div key={c.id} className="flex justify-between items-center">
            <div className="flex items-center gap-x-3">
              <Checkbox
                checked={selectedCategoryIds.includes(c.id)}
                onCheckedChange={() =>
                  setSelectedCategoryIds(
                    !selectedCategoryIds.includes(c.id)
                      ? [...selectedCategoryIds, c.id]
                      : selectedCategoryIds.filter((cid) => cid !== c.id)
                  )
                }
              />
              <Label className="font-normal text-gray-600">{c.name}</Label>
            </div>

            {countProductsInCategory(c.id)?._count && (
              <span className="text-gray-500 text-xs">
                {countProductsInCategory(c.id)?._count.id}
              </span>
            )}
          </div>
        ))}
        {selectedCategoryIds.length > 0 && (
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => setSelectedCategoryIds([])}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
