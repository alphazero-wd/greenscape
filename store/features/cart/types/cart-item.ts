import { Category } from "@/features/categories/types";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
  inStock: number;
  category: Category;
}
