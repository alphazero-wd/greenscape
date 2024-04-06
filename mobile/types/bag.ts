import { Category } from "./category";
import { Product } from "./product";

export interface BagItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
  inStock: number;
  category: Product["category"];
}
