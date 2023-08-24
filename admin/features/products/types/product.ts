import { Category } from "@/features/categories/types";

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: "Active" | "Draft";
  category: Category;
}
