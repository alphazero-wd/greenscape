import { Category } from "@/features/products/types";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageId: number;
  inStock: number;
  category: Category;
}
