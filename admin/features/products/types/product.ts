import { Category } from "@/features/categories/types";
import { Color } from "@/features/colors/types";
import { Size } from "@/features/sizes/types";
import { Variant } from "./variant";

export interface Product {
  id: number;
  name: string;
  desc: string;
  sizeCharts?: string;
  sizes: Size[];
  colors: Color[];
  priceRange: [number, number];
  category: Category;
  variants: Variant[];
}
