"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/features/ui/sheet";
import { CategoriesFilter } from "./categories-filter";
import { Button } from "@/features/ui/button";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { PriceFilter } from "./price-filter";
import { InStockFilter } from "./in-stock-filter";
import { Category } from "@/features/categories/types";
import { ClearFilterButton } from "./clear-filter";

interface FilterProps {
  categories: Category[];
  slug?: string;
}

export const MobileFilter: React.FC<FilterProps> = ({ categories, slug }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <FunnelIcon className="mr-2 w-5 h-5 text-muted-foreground" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:hidden max-w-[300px] sm:max-w-[300px]">
        <SheetHeader>
          <SheetTitle>Filter products</SheetTitle>
        </SheetHeader>
        <aside className="pb-24 space-y-6 divide-y divide-gray-200 pt-6 bg-white">
          <CategoriesFilter categories={categories} />
          <PriceFilter />
          <InStockFilter />
          <ClearFilterButton />
        </aside>
      </SheetContent>
    </Sheet>
  );
};
