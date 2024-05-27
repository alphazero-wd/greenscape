"use client";
import { Category } from "@/features/categories/types";
import { CategoriesFilter } from "./categories-filter";
import { InStockFilter } from "./in-stock-filter";
import { PriceFilter } from "./price-filter";
import { ClearFilterButton } from "./clear-filter";

interface FilterProps {
  categories: Category[];
}

export const DesktopFilter: React.FC<FilterProps> = ({ categories }) => {
  return (
    <aside className="lg:block top-6 h-fit w-[300px] min-h-0 sticky hidden space-y-6 divide-y divide-gray-200 bg-white">
      <CategoriesFilter categories={categories} />
      <PriceFilter />
      <InStockFilter />
      <ClearFilterButton />
    </aside>
  );
};
