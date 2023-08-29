"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/features/ui";
import { CategoryGroup, Category } from "../types";
import { CategoriesFilter } from "./categories-filter";
import { Button } from "@/features/ui";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { PriceFilter } from "./price-filter";
import { InStockFilter } from "./in-stock-filter";

interface FilterProps {
  categories: Category[];
  categoryGroups: CategoryGroup[];
}

export const MobileFilter: React.FC<FilterProps> = ({
  categories,
  categoryGroups,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <FunnelIcon className="mr-2 w-5 h-5 text-gray-500" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent
        className="lg:hidden max-w-[300px] sm:max-w-[300px]"
        side="left"
      >
        <SheetHeader>
          <SheetTitle>Filter products</SheetTitle>
        </SheetHeader>
        <aside className="pb-24 space-y-6 divide-y divide-gray-200 pt-6 bg-white">
          <CategoriesFilter
            categories={categories}
            categoryGroups={categoryGroups}
          />
          <PriceFilter />
          <InStockFilter />
        </aside>
      </SheetContent>
    </Sheet>
  );
};
