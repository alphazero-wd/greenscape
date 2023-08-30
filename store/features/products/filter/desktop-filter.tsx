"use client";
import { Category, CategoryGroup } from "../types";
import { CategoriesFilter } from "./categories-filter";
import { InStockFilter } from "./in-stock-filter";
import { PriceFilter } from "./price-filter";

interface FilterProps {
  categories: Category[];
  categoryGroups: CategoryGroup[];
}

export const DesktopFilter: React.FC<FilterProps> = ({
  categories,
  categoryGroups,
}) => {
  return (
    <aside className="lg:block top-6 h-fit max-w-[300px] min-w-[300px] min-h-0 sticky hidden space-y-6 divide-y divide-gray-200 bg-white">
      <CategoriesFilter
        categories={categories}
        categoryGroups={categoryGroups}
      />
      <PriceFilter />
      <InStockFilter />
    </aside>
  );
};
