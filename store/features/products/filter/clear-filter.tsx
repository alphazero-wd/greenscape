import { Button } from "@/features/ui/button";
import { useQueryStore } from "../hooks";

export const ClearFilterButton = () => {
  const { maxPrice, minPrice, outOfStockIncluded, selectedCategory, reset } =
    useQueryStore();
  if (!minPrice && !maxPrice && outOfStockIncluded && !selectedCategory)
    return null;
  return (
    <Button variant="destructive" onClick={reset} size="sm">
      Clear filter
    </Button>
  );
};
