import { Category } from "@/features/categories/types";
import { Variant } from "./variant";

export interface Product {
  id: number;
  name: string;
  desc: string;
  sizeCharts?: string;
  priceRange: [number, number];
  status: "Active" | "Draft";
  category: Category;
  variants: Variant[];
}

export interface CreateProductDto {
  name: string;
  desc: string;
  categoryIds: number[];
  variants: {
    colorId?: number;
    sizeId?: number;
    price: number;
    inStock: number;
  }[];
}
