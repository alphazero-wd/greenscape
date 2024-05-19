import { Category } from "@/features/categories/types";

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  inStock: number;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  images: { file: { id: string; url: string } }[];
}
