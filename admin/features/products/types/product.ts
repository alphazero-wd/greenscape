import { Category } from "@/features/categories/types";

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: "Active" | "Draft";
  inStock: number;
  category: Category;
  images: { id: number }[];
}

export interface CreateProductDto {
  name: string;
  desc: string;
  price: number;
  inStock: number;
  status: "Active" | "Draft";
  categoryId: number;
}

export interface UpdateProductDto extends CreateProductDto {}
