import { Category } from "@/features/categories/types";

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: "Active" | "Draft";
  category: Category;
}

export interface CreateProductDto {
  name: string;
  desc: string;
  price: number;
  inStock: number;
  status: "Active" | "Draft";
  categoryId: number;
}
