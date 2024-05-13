import { Category } from "@/features/categories/types";

export type Status = "Active" | "Draft" | "Archived";

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: Status;
  inStock: number;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  images: ProductImage[];
  _count: { orders: number };
}
export interface ProductImage {
  file: {
    id: string;
    url: string;
  };
}
export interface ProductFormDto {
  name: string;
  desc: string;
  price: number;
  inStock: number;
  status: Status;
  categoryIds: number[];
}

export interface StatusGroup {
  _count: { id: number };
  status: Status;
}

export interface InStockGroup {
  _count: { id: number };
  inStock: number;
}
