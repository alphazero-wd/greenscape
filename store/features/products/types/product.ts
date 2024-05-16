import { Category } from "../../categories/types";

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  inStock: number;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  images: { id: string; url: string }[];
}

export interface InStockGroup {
  _count: { id: number };
  inStock: number;
}
