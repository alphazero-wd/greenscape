import { Category } from "@/features/products/types";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
  inStock: number;
  category: Category;
}
